package middleware

import (
	"log"
	"net/http"

	"github.com/evad1n/chatbot-wars/auth"
	"github.com/evad1n/chatbot-wars/common"
	"github.com/evad1n/chatbot-wars/db"
	"github.com/evad1n/chatbot-wars/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

// Verifies the bot in the request is owned by the authenticated user
// Bot is avaible with the key "bot" in the context
func RequireOwnershipBot(c *gin.Context) {
	ctx, cancel := common.TimeoutCtx(c)
	defer cancel()

	userID := auth.GetUserID(c)
	botIDHex := c.Param("id")

	// Decode to mongoDB ObjectID
	botID, err := db.ToMongoID(botIDHex)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"message": err.Error()})
		return
	}
	filter := bson.M{"_id": botID}

	res := db.Bots.FindOne(ctx, filter)
	// If no doc is found
	if res.Err() != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"message": "no bot found with specified id"})
		return
	}

	var bot models.Bot
	if err := res.Decode(&bot); err != nil {
		log.Printf("Checking user privileges: decoding: %v\n", err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if bot.UID != userID {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	// Set bot as variable in local context
	c.Set("bot", &bot)
}

var lineTypes = map[string]struct{}{
	"greetings": {},
	"questions": {},
	"responses": {},
}

// Verifies valid line type in path. Aborts with 404 if not valid.
func ValidLineType(c *gin.Context) {
	lineType := c.Param("lineType")

	if _, ok := lineTypes[lineType]; !ok {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{
			"error": "not a valid line type",
		})
		return
	}
}
