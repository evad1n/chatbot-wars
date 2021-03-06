package bots

import (
	"log"
	"net/http"

	"github.com/evad1n/chatbot-wars/auth"
	"github.com/evad1n/chatbot-wars/common"
	"github.com/evad1n/chatbot-wars/db"
	"github.com/evad1n/chatbot-wars/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type (
	BotOverview struct {
		ID   primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
		Name string             `json:"name" binding:"required,min=3,max=30"`
	}
)

func GetOne(c *gin.Context) {
	_, cancel := common.TimeoutCtx(c)
	defer cancel()

	val, exists := c.Get("bot")
	if !exists {
		c.Status(http.StatusInternalServerError)
		return
	}
	bot := val.(*models.Bot)

	c.JSON(http.StatusOK, bot)
}

func GetAll(c *gin.Context) {
	ctx, cancel := common.TimeoutCtx(c)
	defer cancel()

	bots := []BotOverview{}
	// Only get name and id
	fields := bson.M{"name": 1}
	cur, err := db.Bots.Find(ctx, bson.M{}, options.Find().SetProjection(fields))
	if err != nil {
		log.Printf("GetAll: finding: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// Iterate and decode
	defer cur.Close(ctx)
	for cur.Next(ctx) {
		var bot BotOverview
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

	// Enforce unique bot names
	filter := bson.M{"name": bot.Name}
	// Check if exists
	if db.Bots.FindOne(ctx, filter).Err() == nil {
		c.JSON(http.StatusConflict, gin.H{"message": "that bot name is already taken"})
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

	val, exists := c.Get("bot")
	if !exists {
		c.Status(http.StatusInternalServerError)
		return
	}
	bot := val.(*models.Bot)

	// Bind request body
	var updatedBot models.Bot
	if err := common.BindWithErrors(c, &updatedBot); err != nil {
		return
	}

	// Enforce unique bot names
	if bot.Name != updatedBot.Name {
		filter := bson.M{"name": updatedBot.Name}
		// Check if exists
		if db.Bots.FindOne(ctx, filter).Err() == nil {
			c.JSON(http.StatusConflict, gin.H{"message": "that bot name is already taken"})
			return
		}
	}

	// Preserve UserID
	updatedBot.UID = bot.UID

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

	val, exists := c.Get("bot")
	if !exists {
		c.Status(http.StatusInternalServerError)
		return
	}
	bot := val.(*models.Bot)

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

	bots := []BotOverview{}

	// Only get name and id
	fields := bson.M{"name": 1}
	cur, err := db.Bots.Find(ctx, bson.M{"_uid": userID}, options.Find().SetProjection(fields))
	if err != nil {
		log.Printf("GetUserBots: finding: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	defer cur.Close(ctx)
	for cur.Next(ctx) {
		var bot BotOverview
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
