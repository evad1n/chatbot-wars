package rooms

import (
	"log"
	"math/rand"
	"net/http"

	"github.com/evad1n/chatbot-wars/common"
	"github.com/evad1n/chatbot-wars/db"
	"github.com/evad1n/chatbot-wars/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

// Create a room
func PostOne(c *gin.Context) {
	_, cancel := common.TimeoutCtx(c)
	defer cancel()

	// Generate new unique room hash
	var hash string
	for {
		hash = randomString(10)
		if _, exists := rooms[hash]; !exists {
			break
		}
	}

	// Add room
	newRoom := &Room{
		Hash:       hash,
		Bots:       []models.Bot{},
		Transcript: []Message{},
		Active:     true,
	}
	rooms[hash] = newRoom

	// Start room thread
	go newRoom.Start(func() {
		delete(rooms, hash)
	})

	// Send room hash back
	c.JSON(http.StatusCreated, gin.H{"hash": hash})
}

func GetOne(c *gin.Context) {
	_, cancel := common.TimeoutCtx(c)
	defer cancel()

	hash := c.Param("roomHash")

	room, exists := rooms[hash]
	if !exists {
		c.Status(http.StatusNotFound)
		return
	}
	lines := room.Transcript

	// Reset timeout
	rooms[hash].LastGet = 0

	c.JSON(http.StatusOK, lines)
}

func UpdateOne(c *gin.Context) {
	ctx, cancel := common.TimeoutCtx(c)
	defer cancel()

	hash := c.Param("roomHash")
	// Decode to mongoDB ObjectID
	id, err := db.ToMongoID(c.Param("botID"))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
		return
	}

	room := rooms[hash]

	filter := bson.M{"_id": id}

	res := db.Bots.FindOne(ctx, filter)
	// If no doc is found
	if res.Err() != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "no bot found with specified id"})
		return
	}

	var bot models.Bot
	if err := res.Decode(&bot); err != nil {
		log.Printf("GetOne: decoding: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	room.Bots = append(room.Bots, bot)

	c.Status(http.StatusOK)
}

func DeleteOne(c *gin.Context) {
	_, cancel := common.TimeoutCtx(c)
	defer cancel()

	hash := c.Param("roomHash")

	// Signal shutdown
	rooms[hash].Active = false
	// Remove room
	delete(rooms, hash)

	c.Status(http.StatusOK)
}

// Returns a random string of the specified length
func randomString(length int) string {
	runes := []rune{}
	for i := 0; i < length; i++ {
		// 97-122 range of alphabet characters
		r := rand.Intn(26) + 97
		runes = append(runes, rune(r))
	}
	return string(runes)
}
