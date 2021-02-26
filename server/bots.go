package main

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type (
	// Chatbot is
	Chatbot struct {
		ID        primitive.ObjectID `bson:"_id,omitempty"`
		Name      string             `bson:"name,omitempty" validate:"required,max=30"`
		Greetings []Line
		Questions []Line
		Responses []Line
	}

	// Line is a Chatbot response with associated data
	Line struct {
		Text string `json:"text,omitempty"`
		Mood Mood   `json:"mood,omitempty" validate:"required,min=0,max=2"`
	}

	// Mood enum
	Mood int
)

const (
	happy Mood = iota
	angry
	sad
)

func initBotsController(s *Server, collection *mongo.Collection) Controller {
	var c Controller

	c.GetOne = func(s *Server) gin.HandlerFunc {
		return func(c *gin.Context) {
			ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Second)
			defer cancel()
			var bot Chatbot
			id := c.Param("id")
			filter := bson.D{{Key: "_id", Value: id}}

			res := collection.FindOne(ctx, filter)
			// If no doc is found
			if res.Err() != nil {
				c.JSON(http.StatusNotFound, gin.H{"message": "no bot found with specified id"})
				return
			}

			if err := res.Decode(&bot); err != nil {
				log.Printf("GetOne: decoding: %v", err)
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			c.JSON(http.StatusOK, bot)
		}
	}

	c.GetAll = func(s *Server) gin.HandlerFunc {
		return func(c *gin.Context) {
			ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Second)
			defer cancel()
			bots := []Chatbot{}
			cur, err := collection.Find(ctx, bson.D{})
			if err != nil {
				log.Printf("GetAll: finding: %v", err)
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			defer cur.Close(ctx)
			for cur.Next(ctx) {
				log.Println("hello")
				var bot Chatbot
				err := cur.Decode(&bot)
				if err != nil {
					log.Printf("GetAll: decoding cursor: %v", err)
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return
				}
				bots = append(bots, bot)
			}
			if err := cur.Err(); err != nil {
				log.Fatal(err)
			}
			c.JSON(http.StatusOK, bots)
		}
	}

	c.PostOne = func(s *Server) gin.HandlerFunc {
		return func(c *gin.Context) {
			ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Second)
			defer cancel()

			// Bind request body
			var bot Chatbot
			if err := c.BindJSON(&bot); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			log.Printf("post bot: %v\n", bot)
			// Validation
			validationErr := s.Validate.Struct(bot)
			if validationErr != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": validationErr.Error()})
				return
			}
			// Now insert it
			res, err := collection.InsertOne(ctx, bot)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			id := res.InsertedID
			log.Printf("Bots: Inserted %s\n", res.InsertedID)

			c.JSON(http.StatusCreated, gin.H{
				"id": id,
			})
		}
	}

	c.UpdateOne = func(s *Server) gin.HandlerFunc {
		return func(c *gin.Context) {
			ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Second)
			defer cancel()
			// Bind request body
			var updatedBot Chatbot
			if err := c.BindJSON(&updatedBot); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			log.Printf("update bot: %v\n", updatedBot)
			// Validation
			validationErr := s.Validate.Struct(updatedBot)
			if validationErr != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": validationErr.Error()})
				return
			}
			id := c.Param("id")
			filter := bson.D{{Key: "_id", Value: id}}
			res, err := collection.ReplaceOne(ctx, filter, updatedBot)
			if err != nil {
				log.Printf("mongo update one: %v", err)
			}

			switch {
			case res.MatchedCount == 0:
				c.JSON(http.StatusNotFound, gin.H{
					"message": "no such bot with specified id",
				})
				return
			default:
				log.Printf("Bots: updated %d\n", res.ModifiedCount)
				c.Status(http.StatusOK)
			}
		}
	}

	c.DeleteOne = func(s *Server) gin.HandlerFunc {
		return func(c *gin.Context) {
			ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Second)
			defer cancel()
			var bot Chatbot
			id := c.Param("id")
			filter := bson.D{{Key: "_id", Value: id}}
			collection.FindOne(ctx, filter).Decode(&bot)
		}
	}

	return c
}
