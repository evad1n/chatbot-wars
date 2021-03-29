package users

import (
	"log"
	"net/http"

	"github.com/evad1n/chatbot-wars/common"
	"github.com/evad1n/chatbot-wars/db"
	"github.com/evad1n/chatbot-wars/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

func PostOne(c *gin.Context) {
	ctx, cancel := common.TimeoutCtx(c)
	defer cancel()

	// Bind request body
	var user models.User
	if err := common.BindWithErrors(c, &user); err != nil {
		return
	}

	// Check if exists
	filter := bson.M{"username": user.Username}
	if db.Users.FindOne(ctx, filter).Err() == nil {
		c.JSON(http.StatusConflict, gin.H{"message": "That username is taken"})
		return
	}

	// Encrypt
	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.MinCost)
	if err != nil {
		log.Printf("error hashing: %v", err)
	}
	encryptedPassword := string(hash)

	user.Password = encryptedPassword

	// Now insert it
	res, err := db.Users.InsertOne(ctx, user)
	if err != nil {
		log.Printf("PostOne: inserting: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"id": res.InsertedID,
	})
}

// A query to ask if a username is taken
func UniqueName(c *gin.Context) {
	ctx, cancel := common.TimeoutCtx(c)
	defer cancel()

	username := c.Param("username")

	if len(username) == 0 {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"message": "username cannot be empty"})
		return
	}

	filter := bson.M{"username": username}
	// Check if exists
	if db.Users.FindOne(ctx, filter).Err() != nil {
		c.JSON(http.StatusOK, gin.H{"valid": true})
	} else {
		c.JSON(http.StatusOK, gin.H{"valid": false})
	}
}
