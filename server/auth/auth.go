package auth

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/evad1n/chatbot-wars/common"
	"github.com/evad1n/chatbot-wars/db"
	"github.com/evad1n/chatbot-wars/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

type (
	AuthMiddleware struct {
		MiddlewareFunc func() gin.HandlerFunc
		Login          gin.HandlerFunc
		Logout         gin.HandlerFunc
		Me             gin.HandlerFunc
	}

	LoginInfo struct {
		Username string `json:"username" binding:"required,gt=0"`
		Password string `json:"password" binding:"required,gt=0"`
	}

	UserData struct {
		ID       primitive.ObjectID `json:"id"`
		Username string             `json:"username"`
	}

	AuthClaims struct {
		jwt.StandardClaims
		Username string `json:"username"`
		UID      string `json:"uid"`
	}
)

const (
	tokenTimeout = time.Hour * 48
)

func GenerateToken(user models.User, secret []byte) (string, string) {
	now := time.Now()
	claims := AuthClaims{
		Username: user.Username,
		UID:      user.ID.Hex(),
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: now.Add(tokenTimeout).Unix(),
			IssuedAt:  now.Unix(),
			Issuer:    "chatbot-wars",
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	//encoded string
	t, err := token.SignedString([]byte(secret))
	if err != nil {
		panic(err)
	}
	return t, now.Add(tokenTimeout).String()
}

func ValidateToken(tokenString string, secret []byte) (*jwt.Token, error) {
	token, err := jwt.ParseWithClaims(
		tokenString,
		&AuthClaims{},
		func(token *jwt.Token) (interface{}, error) {
			if _, valid := token.Method.(*jwt.SigningMethodHMAC); !valid {
				return nil, fmt.Errorf("unrecognized signing method: %v", token.Header["alg"])
			}
			return []byte(secret), nil
		},
	)
	if err != nil {
		return nil, fmt.Errorf("invalid token: %v", err)
	}

	if token.Valid {
		return token, nil
	} else {
		return nil, errors.New("Invalid token")
	}
}

func extractToken(c *gin.Context) string {
	authHeader := c.GetHeader("Authorization")
	authArr := strings.Split(authHeader, "Bearer ")
	if len(authArr) < 2 {
		// Bad auth headers
		return ""
	}
	return authArr[1]
}

// Returns claims. Will abort if unable to get claims
func getJWTClaims(c *gin.Context) *AuthClaims {
	claims, exists := c.Get("claims")
	if !exists {
		c.AbortWithStatus(http.StatusUnauthorized)
	}
	authClaims, ok := claims.(*AuthClaims)
	if !ok {
		c.AbortWithStatus(http.StatusUnauthorized)
	}
	return authClaims
}

func New(secret []byte) *AuthMiddleware {
	auth := AuthMiddleware{}

	auth.MiddlewareFunc = func() gin.HandlerFunc {
		return func(c *gin.Context) {
			tokenString := extractToken(c)
			if token, err := ValidateToken(tokenString, secret); err != nil {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
					"message": err.Error(),
				})
			} else {
				claims := token.Claims.(*AuthClaims)
				c.Set("claims", claims)
			}
		}
	}

	auth.Login = func(c *gin.Context) {
		var info LoginInfo
		if err := common.BindWithErrors(c, &info); err != nil {
			return
		}

		// Find user
		filter := bson.M{"username": info.Username}
		res := db.Users.FindOne(c.Request.Context(), filter)
		// If no doc is found
		if res.Err() != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"message": "invalid username or password",
			})
			return
		}

		var user models.User
		if err := res.Decode(&user); err != nil {
			log.Println("error decoding user in login")
			c.Status(http.StatusInternalServerError)
			return
		}

		// Check against password
		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(info.Password)); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"message": "invalid username or password",
			})
			return
		}

		token, expires := GenerateToken(user, secret)

		// Success
		c.JSON(http.StatusCreated, gin.H{
			"token":    token,
			"expires":  expires,
			"uid":      user.ID.Hex(),
			"username": user.Username,
		})
	}

	auth.Me = func(c *gin.Context) {
		claims := getJWTClaims(c)
		c.JSON(http.StatusOK, gin.H{
			"uid":      claims.UID,
			"username": claims.Username,
		})
	}

	return &auth
}

// Returns UserID from claims. Will abort if user ID is not valid or no claims are present
func GetUserID(c *gin.Context) primitive.ObjectID {
	claims := getJWTClaims(c)
	userID, err := db.ToMongoID(claims.UID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": fmt.Sprintf("User ID is invalid: %v", err.Error())})
	}
	return userID
}

// Returns the bot and if the user owns it. Should end handler if the the bot is not owned
func IsAllowedBot(c *gin.Context, botIDHex string, userID primitive.ObjectID) (*models.Bot, bool) {
	ctx, cancel := common.TimeoutCtx(c)
	defer cancel()

	// Decode to mongoDB ObjectID
	botID, err := db.ToMongoID(botIDHex)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
		return nil, false
	}
	filter := bson.M{"_id": botID}

	res := db.Bots.FindOne(ctx, filter)
	// If no doc is found
	if res.Err() != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "no bot found with specified id"})
		return nil, false
	}

	var bot models.Bot
	if err := res.Decode(&bot); err != nil {
		log.Printf("Checking user privileges: decoding: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return nil, false
	}

	if bot.UID != userID {
		c.Status(http.StatusForbidden)
		return nil, false
	}

	return &bot, true
}
