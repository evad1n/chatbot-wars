package controllers

import (
	"log"
	"net/http"

	"github.com/evad1n/chatbot-wars/db"
	"github.com/evad1n/chatbot-wars/validation"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

type (
	// User is a bot with a collection of lines
	User struct {
		ID        primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
		FirstName string             `json:"firstName" binding:"required,gt=0"`
		LastName  string             `json:"lastName" binding:"required,gt=0"`
		Username  string             `json:"username" binding:"required,gt=2"`
		Password  string             `json:"password" binding:"required,gt=2"`
	}
)

func InitUsersController(collection *mongo.Collection, log *log.Logger) Controller {
	var c Controller

	c.PostOne = func(c *gin.Context) {
		ctx, cancel := TimeoutCtx(c)
		defer cancel()

		// Bind request body
		var user User
		if err := c.ShouldBindJSON(&user); err != nil {
			if errs, ok := err.(validator.ValidationErrors); ok {
				c.JSON(http.StatusUnprocessableEntity, gin.H{"errors": validation.ValidationErrorMessages(errs)})
			} else {
				c.String(http.StatusUnprocessableEntity, err.Error())
			}
			return
		}

		// Check if exists
		filter := bson.M{"username": user.Username}
		if collection.FindOne(ctx, filter).Err() == nil {
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
		res, err := collection.InsertOne(ctx, user)
		if err != nil {
			log.Printf("PostOne: inserting: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, gin.H{
			"id": res.InsertedID,
		})
	}

	c.UpdateOne = func(c *gin.Context) {
		ctx, cancel := TimeoutCtx(c)
		defer cancel()

		// Decode to mongoDB ObjectID
		id, err := db.ToMongoID(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
			return
		}
		filter := bson.M{"_id": id}

		// Check if exists before even parsing data (404 > 400)
		if collection.FindOne(ctx, filter).Err() != nil {
			c.JSON(http.StatusNotFound, gin.H{"message": "no bot found with specified id"})
			return
		}

		// Bind request body
		var updatedBot Chatbot
		if err := c.ShouldBindJSON(&updatedBot); err != nil {
			if errs, ok := err.(validator.ValidationErrors); ok {
				c.JSON(http.StatusUnprocessableEntity, gin.H{"errors": validation.ValidationErrorMessages(errs)})
			} else {
				c.String(http.StatusUnprocessableEntity, err.Error())
			}
			return
		}

		// Full replace to simplify things
		_, err = collection.ReplaceOne(ctx, filter, updatedBot)
		if err != nil {
			log.Printf("UpdateOne: updating: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.Status(http.StatusOK)
	}

	c.DeleteOne = func(c *gin.Context) {
		ctx, cancel := TimeoutCtx(c)
		defer cancel()

		// Decode to mongoDB ObjectID
		id, err := db.ToMongoID(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
			return
		}

		filter := bson.M{"_id": id}
		res, err := collection.DeleteOne(ctx, filter)
		if err != nil {
			log.Printf("DeleteOne: deleting: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		switch {
		case res.DeletedCount == 0:
			c.JSON(http.StatusNotFound, gin.H{
				"message": "no such bot with specified id",
			})
			return
		default:
			c.Status(http.StatusOK)
		}
	}

	return c
}
