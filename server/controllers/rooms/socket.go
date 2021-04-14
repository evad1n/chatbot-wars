package rooms

import (
	"log"
	"net/http"

	"github.com/evad1n/chatbot-wars/models"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	// FIX: change this to something idk LOL
	CheckOrigin: func(r *http.Request) bool {
		log.Println(r.Header.Get("Origin"))
		return true
	},
}

type (
	// Message sent by a client
	ReadMessage struct {
		Type    string `json:"type"`
		Payload string `json:"payload,omitempty"`
	}
)

func ListenRoom(c *gin.Context) {
	ws, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Printf("failed to set websocket upgrade: %+v\n", err)
		c.Status(http.StatusInternalServerError)
		return
	}
	defer ws.Close()

	room := Room{
		Bots: []models.Bot{},
		Conn: ws,
	}

	// Listen for client messages
	for {
		var msg ReadMessage
		if err := ws.ReadJSON(&msg); err != nil {
			// Connection closed
			return
		}

		// Support 2 actions: start and addBot
		switch msg.Type {
		case "START_ROOM":
			if !room.Active {
				go room.Start()
			}
		case "ADD_BOT":
			room.AddBot(msg.Payload)
		case "REMOVE_BOT":
			room.RemoveBot(msg.Payload)
		}
	}
}
