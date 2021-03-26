package bots

import (
	"log"
	"net/http"

	"github.com/evad1n/chatbot-wars/common"
	"github.com/evad1n/chatbot-wars/db"
	"github.com/evad1n/chatbot-wars/models"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
)

func GetOne(c *gin.Context) {
	ctx, cancel := common.TimeoutCtx(c)
	defer cancel()

	var bot models.Bot
	// Decode to mongoDB ObjectID
	id, err := db.ToMongoID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
		return
	}
	filter := bson.M{"_id": id}

	res := db.Bots.FindOne(ctx, filter)
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

func GetAll(c *gin.Context) {
	ctx, cancel := common.TimeoutCtx(c)
	defer cancel()

	bots := []models.Bot{}
	cur, err := db.Bots.Find(ctx, bson.D{})
	if err != nil {
		log.Printf("GetAll: finding: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer cur.Close(ctx)
	for cur.Next(ctx) {
		var bot models.Bot
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

func PostOne(c *gin.Context) {
	ctx, cancel := common.TimeoutCtx(c)
	defer cancel()

	// Bind request body
	var bot models.Bot
	if err := c.ShouldBindJSON(&bot); err != nil {
		if errs, ok := err.(validator.ValidationErrors); ok {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"errors": common.ValidationErrorMessages(errs)})
		} else {
			c.String(http.StatusUnprocessableEntity, err.Error())
		}
		return
	}

	// Now insert it
	res, err := db.Bots.InsertOne(ctx, bot)
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
	if db.Bots.FindOne(ctx, filter).Err() != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "no bot found with specified id"})
		return
	}

	// Bind request body
	var updatedBot models.Bot
	if err := c.ShouldBindJSON(&updatedBot); err != nil {
		if errs, ok := err.(validator.ValidationErrors); ok {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"errors": validator.ValidationErrors(errs)})
		} else {
			c.String(http.StatusUnprocessableEntity, err.Error())
		}
		return
	}

	// Full replace to simplify things
	_, err = db.Bots.ReplaceOne(ctx, filter, updatedBot)
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
	res, err := db.Bots.DeleteOne(ctx, filter)
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

// A query to ask if a bot name is already in use
func UniqueName(c *gin.Context) {
	ctx, cancel := common.TimeoutCtx(c)
	defer cancel()

	name := c.Param("name")

	if len(name) == 0 {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"message": "name cannot be empty"})
	}

	filter := bson.M{"name": name}
	// Check if exists
	if db.Bots.FindOne(ctx, filter).Err() != nil {
		c.JSON(http.StatusOK, gin.H{"valid": true})
	} else {
		c.JSON(http.StatusOK, gin.H{"valid": false})
	}
}
