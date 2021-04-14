package rooms

import (
	"context"
	"log"
	"math/rand"
	"time"

	"github.com/evad1n/chatbot-wars/db"
	"github.com/evad1n/chatbot-wars/models"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"go.mongodb.org/mongo-driver/bson"
)

type (
	// Room is where the bots fight
	Room struct {
		Bots       []models.Bot
		Conn       *websocket.Conn
		Active     bool
		RepeatMap  map[int]LastLine
		PrevBotIdx int
	}

	// Last line for each bot
	LastLine struct {
		Type  int // The line type
		Index int // The index into the line type list
	}

	// Message contains the line info and the bot name
	Message struct {
		Name string      `json:"name"`
		Line models.Line `json:"line"`
	}
)

const (
	chatInterval = 1800 // Add a line every x milliseconds
	timeout      = 3    // timeout * chatInterval is the timeout threshold in seconds
)

var (
// rooms = make(map[string]*Room)
)

// Start the bot conversation in a room
func (r *Room) Start() {
	r.Active = true
	r.RepeatMap = make(map[int]LastLine)
	r.PrevBotIdx = -1

	ticker := time.NewTicker(time.Millisecond * chatInterval)

	// Timer for chat messages
	for range ticker.C {
		// No bots no fun
		if len(r.Bots) == 0 {
			continue
		} else {
			msg := r.GetNextMessage()
			if err := r.Conn.WriteJSON(gin.H{
				"type":    "NEW_MESSAGE",
				"message": msg,
			}); err != nil {
				return
			}
		}
	}
}

// Gets the next message according to a very advanced algorithm (NP-complete)
func (r *Room) GetNextMessage() Message {
	// Select new random bot for random message
	var botIdx int
	for {
		botIdx = rand.Intn(len(r.Bots))
		if len(r.Bots) == 1 || botIdx != r.PrevBotIdx {
			break
		}
	}
	r.PrevBotIdx = botIdx
	bot := r.Bots[botIdx]

	// Select new line type
	var lineType int
	last, exists := r.RepeatMap[botIdx]
	for {
		lineType = rand.Intn(3)
		if !exists || last.Type != lineType {
			break
		}
	}

	var lines []models.Line
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
	r.RepeatMap[botIdx] = LastLine{
		Type:  lineType,
		Index: lineIndex,
	}

	return Message{
		Name: bot.Name,
		Line: lines[lineIndex],
	}
}

// Add a bot to the room
func (r *Room) AddBot(hexID string) {
	ctx := context.Background()

	// Decode to mongoDB ObjectID
	id, err := db.ToMongoID(hexID)
	if err != nil {
		log.Println("invalid bot ID")
		return
	}

	// Don't add duplicates bots
	for _, bot := range r.Bots {
		if bot.ID == id {
			log.Println("duplicate bot")
			return
		}
	}

	filter := bson.M{"_id": id}

	res := db.Bots.FindOne(ctx, filter)
	// If no doc is found
	if res.Err() != nil {
		log.Printf("no bot found with id: %v\n", id)
		return
	}

	var bot models.Bot
	if err := res.Decode(&bot); err != nil {
		log.Printf("GetOne: decoding: %v\n", err)
		return
	}

	r.Bots = append(r.Bots, bot)

	// Handle duplicate logic here
	if err := r.Conn.WriteJSON(gin.H{
		"type": "ADD_BOT",
		"id":   bot.ID,
	}); err != nil {
		return
	}
}

func (r *Room) RemoveBot(hexID string) {
	// Decode to mongoDB ObjectID
	id, err := db.ToMongoID(hexID)
	if err != nil {
		log.Println("invalid bot ID")
		return
	}

	idx := -1
	for i, bot := range r.Bots {
		if bot.ID == id {
			idx = i
			break
		}
	}

	if idx != -1 {
		r.Bots = append(r.Bots[:idx], r.Bots[idx+1:]...)

		// Handle duplicate logic here
		if err := r.Conn.WriteJSON(gin.H{
			"type": "REMOVE_BOT",
			"id":   id,
		}); err != nil {
			return
		}
	}
}
