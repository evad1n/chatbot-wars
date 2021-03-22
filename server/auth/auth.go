package auth

import (
	"log"
	"os"
	"time"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/evad1n/chatbot-wars/controllers"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

type (
	LoginInfo struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required,gt=0"`
	}

	UserData struct {
		ID       primitive.ObjectID `json:"id"`
		Username string             `json:"username"`
	}
)

const (
	identityKey = "uid"
)

func GetJWTMiddleware(userCollection *mongo.Collection) (*jwt.GinJWTMiddleware, error) {
	// the jwt middleware
	authMiddleware, err := jwt.New(&jwt.GinJWTMiddleware{
		Realm:       "Chatbot Wars",
		Key:         []byte(os.Getenv("JWT_KEY")),
		Timeout:     time.Hour,
		MaxRefresh:  time.Hour,
		IdentityKey: identityKey,
		PayloadFunc: func(data interface{}) jwt.MapClaims {
			if user, ok := data.(*controllers.User); ok {
				return jwt.MapClaims{
					identityKey: user.ID,
				}
			}
			return jwt.MapClaims{}
		},
		Authenticator: func(c *gin.Context) (interface{}, error) {
			var info LoginInfo
			if err := c.ShouldBind(&info); err != nil {
				return "", jwt.ErrMissingLoginValues
			}

			// Find user
			filter := bson.M{"username": info.Username}
			res := userCollection.FindOne(c.Request.Context(), filter)
			// If no doc is found
			if res.Err() != nil {
				return nil, jwt.ErrFailedAuthentication
			}

			var user controllers.User
			if err := res.Decode(&user); err != nil {
				log.Printf("Login: decoding: %v\n", err)
				return nil, jwt.ErrFailedAuthentication
			}

			// Check against password
			if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(info.Password)); err != nil {
				return nil, jwt.ErrFailedAuthentication
			}

			// Success
			return &UserData{
				ID:       user.ID,
				Username: user.Username,
			}, nil
		},
		Unauthorized: func(c *gin.Context, code int, message string) {
			c.JSON(code, gin.H{
				"code":    code,
				"message": message,
			})
		},
		// TokenLookup is a string in the form of "<source>:<name>" that is used
		// to extract token from the request.
		// Optional. Default value "header:Authorization".
		// Possible values:
		// - "header:<name>"
		// - "query:<name>"
		// - "cookie:<name>"
		// - "param:<name>"
		TokenLookup: "header: Authorization, query: token, cookie: jwt",
		// TokenLookup: "query:token",
		// TokenLookup: "cookie:token",

		// TokenHeadName is a string in the header. Default value is "Bearer"
		TokenHeadName: "Bearer",

		// TimeFunc provides the current time. You can override it to use another time value. This is useful for testing or if your server uses a different time zone than your tokens.
		TimeFunc: time.Now,
	})
	return authMiddleware, err
}
