package main

import (
	"log"
	"math/rand"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type (
	// Room is where the bots fight
	Room struct {
		Hash       string
		Bots       []Chatbot
		Transcript []Message // History of messages
		LastGet    int       // For inactivity/timeout
		Active     bool
	}

	// Message contains the line info and the bot name
	Message struct {
		Name string `json:"name,omitempty"`
		Line Line   `json:"line,omitempty"`
	}
)

const (
	chatInterval = 1 // Add a line every x seconds
	timeout      = 3 // timeout * chatInterval is the timeout threshold in seconds
)

func initRoomsController(s *Server, collection *mongo.Collection, log *log.Logger) Controller {
	var c Controller

	// Create a room
	c.PostOne = func(s *Server) gin.HandlerFunc {
		return func(c *gin.Context) {
			_, cancel := s.timeoutCtx(c)
			defer cancel()

			// Generate new unique room hash
			var hash string
			for {
				hash = randomString(10)
				if _, exists := s.Rooms[hash]; !exists {
					break
				}
			}

			// Add room
			newRoom := &Room{
				Hash:       hash,
				Bots:       []Chatbot{},
				Transcript: []Message{},
				Active:     true,
			}
			s.Rooms[hash] = newRoom

			// Start room thread
			go newRoom.start(func() {
				delete(s.Rooms, hash)
			})

			// Send room hash back
			c.JSON(http.StatusCreated, gin.H{"hash": hash})
		}
	}

	c.GetOne = func(s *Server) gin.HandlerFunc {
		return func(c *gin.Context) {
			_, cancel := s.timeoutCtx(c)
			defer cancel()

			hash := c.Param("roomHash")

			room, exists := s.Rooms[hash]
			if !exists {
				c.Status(http.StatusNotFound)
				return
			}
			lines := room.Transcript

			// Reset timeout
			s.Rooms[hash].LastGet = 0

			c.JSON(http.StatusOK, lines)
		}
	}

	c.UpdateOne = func(s *Server) gin.HandlerFunc {
		return func(c *gin.Context) {
			ctx, cancel := s.timeoutCtx(c)
			defer cancel()

			hash := c.Param("roomHash")
			// Decode to mongoDB ObjectID
			id, err := toMongoID(c.Param("botID"))
			if err != nil {
				c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
				return
			}

			room := s.Rooms[hash]

			filter := bson.M{"_id": id}

			res := collection.FindOne(ctx, filter)
			// If no doc is found
			if res.Err() != nil {
				c.JSON(http.StatusNotFound, gin.H{"message": "no bot found with specified id"})
				return
			}

			var bot Chatbot
			if err := res.Decode(&bot); err != nil {
				log.Printf("GetOne: decoding: %v\n", err)
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			room.Bots = append(room.Bots, bot)

			c.Status(http.StatusOK)
		}
	}

	c.DeleteOne = func(s *Server) gin.HandlerFunc {
		return func(c *gin.Context) {
			_, cancel := s.timeoutCtx(c)
			defer cancel()

			hash := c.Param("roomHash")

			// Signal shutdown
			s.Rooms[hash].Active = false
			// Remove room
			delete(s.Rooms, hash)

			c.Status(http.StatusOK)
		}
	}

	return c
}

func (r *Room) start(cleanup func()) {
	defer cleanup()
	// Prevent repeats
	type lastLine struct {
		Type  int
		Index int
	}
	prevBotIdx := -1
	repeatMap := make(map[int]lastLine)
	// Timer for chat messages
	for range time.Tick(time.Second * chatInterval) {
		r.LastGet++
		if !r.Active || r.LastGet > timeout {
			return
		}
		// No bots no fun
		if len(r.Bots) == 0 {
			continue
		}
		// Select new random bot for random message
		var botIdx int
		for {
			botIdx = rand.Intn(len(r.Bots))
			if len(r.Bots) == 1 || botIdx != prevBotIdx {
				break
			}
		}
		prevBotIdx = botIdx
		bot := r.Bots[botIdx]

		// Select new line type
		var lineType int
		last, exists := repeatMap[botIdx]
		for {
			lineType = rand.Intn(3)
			if !exists || last.Type != lineType {
				break
			}
		}

		var lines []Line
		switch lineType {
		case 0:
			lines = bot.Greetings
		case 1:
			lines = bot.Questions
		case 2:
			lines = bot.Responses
		}

		// Select new line index
		var lineIndex int
		for {
			lineIndex = rand.Intn(len(lines))
			if !exists || len(lines) == 1 || last.Index != lineIndex {
				break
			}
		}
		repeatMap[botIdx] = lastLine{
			Type:  lineType,
			Index: lineIndex,
		}
		r.Transcript = append(r.Transcript, Message{
			Name: bot.Name,
			Line: lines[lineIndex],
		})
	}
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
