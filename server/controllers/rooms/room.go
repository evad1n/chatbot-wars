package rooms

import (
	"math/rand"
	"time"

	"github.com/evad1n/chatbot-wars/models"
	"github.com/gorilla/websocket"
)

type (
	// Room is where the bots fight
	Room struct {
		Hash       string
		Bots       []models.Bot
		Transcript []Message // History of messages
		LastGet    int       // For inactivity/timeout
		Active     bool
		conn       *websocket.Conn
	}

	// Message contains the line info and the bot name
	Message struct {
		Name string      `json:"name,omitempty"`
		Line models.Line `json:"line,omitempty"`
	}
)

const (
	chatInterval = 2 // Add a line every x seconds
	timeout      = 3 // timeout * chatInterval is the timeout threshold in seconds
)

var (
	rooms = make(map[string]*Room)
)

// Start the bot conversation in a room
func (r *Room) Start(cleanup func()) {
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
