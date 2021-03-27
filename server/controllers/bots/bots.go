package bots

import (
	"log"
	"net/http"

	"github.com/evad1n/chatbot-wars/auth"
	"github.com/evad1n/chatbot-wars/common"
	"github.com/evad1n/chatbot-wars/db"
	"github.com/evad1n/chatbot-wars/models"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
)

func GetOne(c *gin.Context) {
	_, cancel := common.TimeoutCtx(c)
	defer cancel()

	userID := auth.GetUserID(c)
	botID := c.Param("id")

	bot, allowed := auth.IsAllowedBot(c, botID, userID)
	if !allowed {
		return
	}

	c.JSON(http.StatusOK, bot)
}

func GetAll(c *gin.Context) {
	ctx, cancel := common.TimeoutCtx(c)
	defer cancel()

	bots := []models.Bot{}
	cur, err := db.Bots.Find(ctx, bson.M{})
	if err != nil {
		log.Printf("GetAll: finding: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// Iterate and decode
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
	if err := common.BindWithErrors(c, &bot); err != nil {
		return
	}

	userID := auth.GetUserID(c)

	bot.UID = userID

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

	userID := auth.GetUserID(c)
	botID := c.Param("id")
	bot, allowed := auth.IsAllowedBot(c, botID, userID)
	if !allowed {
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

	// Preserve UserID
	updatedBot.UID = userID

	filter := bson.M{"_id": bot.ID}

	// Full replace to simplify things
	if _, err := db.Bots.ReplaceOne(ctx, filter, updatedBot); err != nil {
		log.Printf("UpdateOne: updating: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusOK)
}

func DeleteOne(c *gin.Context) {
	ctx, cancel := common.TimeoutCtx(c)
	defer cancel()

	userID := auth.GetUserID(c)
	botID := c.Param("id")
	bot, allowed := auth.IsAllowedBot(c, botID, userID)
	if !allowed {
		return
	}

	filter := bson.M{"_id": bot.ID}

	if _, err := db.Bots.DeleteOne(ctx, filter); err != nil {
		log.Printf("DeleteOne: deleting: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusOK)
}

func GetUserBots(c *gin.Context) {
	ctx, cancel := common.TimeoutCtx(c)
	defer cancel()

	userID := auth.GetUserID(c)

	bots := []models.Bot{}

	cur, err := db.Bots.Find(ctx, bson.M{"_uid": userID})
	if err != nil {
		log.Printf("GetUserBots: finding: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	defer cur.Close(ctx)
	for cur.Next(ctx) {
		var bot models.Bot
		err := cur.Decode(&bot)
		if err != nil {
			log.Printf("GetUserBots: decoding: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		bots = append(bots, bot)
	}
	if err := cur.Err(); err != nil {
		log.Printf("GetUserBots: cursor error: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, bots)
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
