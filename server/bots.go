package main

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type (
	// Chatbot is
	Chatbot struct {
		ID        primitive.ObjectID `bson:"_id,omitempty"`
		Name      string             `bson:"name,omitempty"`
		Greetings []Line
		Questions []Line
		Responses []Line
	}

	// Line is a Chatbot response with associated data
	Line struct {
		Text string
		Mood Mood
	}

	// Mood enum
	Mood int
)

const (
	happy Mood = iota
	angry
	sad
)

// BotsController is the model controller for chatbots
var BotsController Controller

func init() {
	BotsController.GetOne = func(s *Server) gin.HandlerFunc {
		return func(c *gin.Context) {
			ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
			defer cancel()
			var bot Chatbot
			id := c.Param("id")
			filter := bson.D{{Key: "_id", Value: id}}
			BotsController.Collection.FindOne(ctx, filter).Decode(&bot)
		}
	}

	BotsController.GetAll = func(s *Server) gin.HandlerFunc {
		return func(c *gin.Context) {
			ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
			defer cancel()
			var bots []Chatbot
			cur, err := BotsController.Collection.Find(ctx, bson.D{})
			if err != nil {
				log.Fatal(err)
			}
			defer cur.Close(ctx)
			for cur.Next(ctx) {
				var bot Chatbot
				err := cur.Decode(&bot)
				if err != nil {
					c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				}
				bots = append(bots, bot)
			}
			if err := cur.Err(); err != nil {
				log.Fatal(err)
			}
			c.JSON(200, bots)
		}
	}
}
