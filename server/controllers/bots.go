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
)

type (
	// Chatbot is a bot with a collection of lines
	Chatbot struct {
		ID        primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
		Name      string             `json:"name" binding:"required,min=3,max=30"`
		Greetings []Line             `json:"greetings" binding:"required,gte=1,dive"`
		Questions []Line             `json:"questions" binding:"required,gte=2,dive"`
		Responses []Line             `json:"responses" binding:"required,gte=2,dive"`
	}
)

func InitBotsController(collection *mongo.Collection, log *log.Logger) Controller {
	var c Controller

	c.GetOne = func(c *gin.Context) {
		ctx, cancel := TimeoutCtx(c)
		defer cancel()

		var bot Chatbot
		// Decode to mongoDB ObjectID
		id, err := db.ToMongoID(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
			return
		}
		filter := bson.M{"_id": id}

		res := collection.FindOne(ctx, filter)
		// If no doc is found
		if res.Err() != nil {
			c.JSON(http.StatusNotFound, gin.H{"message": "no bot found with specified id"})
			return
		}

		if err := res.Decode(&bot); err != nil {
			log.Printf("GetOne: decoding: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, bot)
	}

	c.GetAll = func(c *gin.Context) {
		ctx, cancel := TimeoutCtx(c)
		defer cancel()

		bots := []Chatbot{}
		cur, err := collection.Find(ctx, bson.D{})
		if err != nil {
			log.Printf("GetAll: finding: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer cur.Close(ctx)
		for cur.Next(ctx) {
			var bot Chatbot
			err := cur.Decode(&bot)
			if err != nil {
				log.Printf("GetAll: decoding: %v\n", err)
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			bots = append(bots, bot)
		}
		if err := cur.Err(); err != nil {
			log.Printf("GetAll: cursor error: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, bots)
	}

	c.PostOne = func(c *gin.Context) {
		ctx, cancel := TimeoutCtx(c)
		defer cancel()

		// Bind request body
		var bot Chatbot
		if err := c.ShouldBindJSON(&bot); err != nil {
			if errs, ok := err.(validator.ValidationErrors); ok {
				c.JSON(http.StatusUnprocessableEntity, gin.H{"errors": validation.ValidationErrorMessages(errs)})
			} else {
				c.String(http.StatusUnprocessableEntity, err.Error())
			}
			return
		}

		// Now insert it
		res, err := collection.InsertOne(ctx, bot)
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
				c.JSON(http.StatusUnprocessableEntity, gin.H{"errors": validator.ValidationErrors(errs)})
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
