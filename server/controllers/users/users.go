package users

import (
	"log"
	"net/http"

	"github.com/evad1n/chatbot-wars/common"
	"github.com/evad1n/chatbot-wars/db"
	"github.com/evad1n/chatbot-wars/models"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

func PostOne(c *gin.Context) {
	ctx, cancel := common.TimeoutCtx(c)
	defer cancel()

	// Bind request body
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		if errs, ok := err.(validator.ValidationErrors); ok {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"errors": common.ValidationErrorMessages(errs)})
		} else {
			c.String(http.StatusUnprocessableEntity, err.Error())
		}
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

func UpdateOne(c *gin.Context) {
	ctx, cancel := common.TimeoutCtx(c)
	defer cancel()

	// Decode to mongoDB ObjectID
	id, err := db.ToMongoID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
		return
	}
	filter := bson.M{"_id": id}

	// Check if exists before even parsing data (404 > 400)
	if db.Users.FindOne(ctx, filter).Err() != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "no bot found with specified id"})
		return
	}

	// Bind request body
	var updatedBot models.Bot
	if err := c.ShouldBindJSON(&updatedBot); err != nil {
		if errs, ok := err.(validator.ValidationErrors); ok {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"errors": common.ValidationErrorMessages(errs)})
		} else {
			c.String(http.StatusUnprocessableEntity, err.Error())
		}
		return
	}

	// Full replace to simplify things
	_, err = db.Users.ReplaceOne(ctx, filter, updatedBot)
	if err != nil {
		log.Printf("UpdateOne: updating: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusOK)
}

func DeleteOne(c *gin.Context) {
	ctx, cancel := common.TimeoutCtx(c)
	defer cancel()

	// Decode to mongoDB ObjectID
	id, err := db.ToMongoID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
		return
	}

	filter := bson.M{"_id": id}
	res, err := db.Users.DeleteOne(ctx, filter)
	if err != nil {
		log.Printf("DeleteOne: deleting: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	switch {
	case res.DeletedCount == 0:
		c.JSON(http.StatusNotFound, gin.H{
			"message": "no such user with specified id",
		})
		return
	default:
		c.Status(http.StatusOK)
	}
}

// A query to ask if a username is taken
func UniqueName(c *gin.Context) {
	ctx, cancel := common.TimeoutCtx(c)
	defer cancel()

	username := c.Query("username")

	if len(username) == 0 {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"message": "username cannot be empty"})
	}

	filter := bson.M{"username": username}
	// Check if exists
	if db.Users.FindOne(ctx, filter).Err() != nil {
		c.JSON(http.StatusOK, gin.H{"valid": true})
	} else {
		c.JSON(http.StatusOK, gin.H{"valid": false})
	}
}
