package auth

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/evad1n/chatbot-wars/controllers"
	"github.com/evad1n/chatbot-wars/validation"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
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

func GenerateToken(user controllers.User, secret []byte) (string, string) {
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

func GetJWTClaims(c *gin.Context) *AuthClaims {
	claims, _ := c.Get("claims")
	return claims.(*AuthClaims)
}

func New(userCollection *mongo.Collection, secret []byte) *AuthMiddleware {
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
		if err := c.ShouldBind(&info); err != nil {
			if errs, ok := err.(validator.ValidationErrors); ok {
				c.JSON(http.StatusUnprocessableEntity, gin.H{"errors": validation.ValidationErrorMessages(errs)})
			} else {
				c.String(http.StatusUnprocessableEntity, err.Error())
			}
			return
		}

		// Find user
		filter := bson.M{"username": info.Username}
		res := userCollection.FindOne(c.Request.Context(), filter)
		// If no doc is found
		if res.Err() != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"message": "invalid username or password",
			})
			return
		}

		var user controllers.User
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
			"token":   token,
			"expires": expires,
		})
	}

	auth.Logout = func(c *gin.Context) {
		c.Status(http.StatusOK)
	}

	auth.Me = func(c *gin.Context) {
		claims := GetJWTClaims(c)
		c.JSON(http.StatusOK, gin.H{
			"uid":      claims.UID,
			"username": claims.Username,
		})
	}

	return &auth
}
