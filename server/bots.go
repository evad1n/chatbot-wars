package main

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type (
	// Chatbot is
	Chatbot struct {
		ID   primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
		Name string             `json:"name" binding:"required,max=30"`
		// Greetings []Line             `json:"greetings" binding:"required,gte=1"`
		// Questions []Line             `json:"questions" binding:"required,gte=2"`
		// Responses []Line             `json:"responses" binding:"required,gte=2"`
	}

	// Line is a Chatbot response with associated data
	Line struct {
		Text string `json:"text" binding:"required,gt=0"`
		Mood Mood   `json:"mood" binding:"required,min=0,max=2"`
	}

	// Mood enum
	Mood int
)

const (
	happy Mood = iota
	angry
	sad
)

func initBotsController(s *Server, collection *mongo.Collection, log *log.Logger) Controller {
	var c Controller

	c.GetOne = func(s *Server) gin.HandlerFunc {
		return func(c *gin.Context) {
			ctx, cancel := s.timeoutCtx(c)
			defer cancel()

			var bot Chatbot
			// Decode to mongoDB ObjectID
			id, err := toMongoID(c.Param("id"))
			if err != nil {
				c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
				return
			}
			filter := bson.D{{Key: "_id", Value: id}}

			res := collection.FindOne(ctx, filter)
			// If no doc is found
			if res.Err() != nil {
				c.JSON(http.StatusNotFound, gin.H{"message": "no bot found with specified id"})
				return
			}

			if err := res.Decode(&bot); err != nil {
				log.Printf("GetOne: decoding: %v\n", err)
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			c.JSON(http.StatusOK, bot)
		}
	}

	c.GetAll = func(s *Server) gin.HandlerFunc {
		return func(c *gin.Context) {
			ctx, cancel := s.timeoutCtx(c)
			defer cancel()

			bots := []Chatbot{}
			cur, err := collection.Find(ctx, bson.D{})
			if err != nil {
				log.Printf("GetAll: finding: %v\n", err)
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			defer cur.Close(ctx)
			for cur.Next(ctx) {
				var bot Chatbot
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
	}

	c.PostOne = func(s *Server) gin.HandlerFunc {
		return func(c *gin.Context) {
			ctx, cancel := s.timeoutCtx(c)
			defer cancel()

			// Bind request body
			var bot Chatbot
			if err := c.ShouldBind(&bot); err != nil {
				_, ok := err.(validator.ValidationErrors)
				if !ok {
					c.String(http.StatusBadRequest, err.Error())
				} else {
					c.JSON(http.StatusBadRequest, gin.H{"message": bot.GetError(err.(validator.ValidationErrors))})
				}
				// c.JSON(http.StatusBadRequest, gin.H{"message": })

				return
			}

			log.Printf("PostOne: post bot data: %+v\n", bot)

			// Now insert it
			res, err := collection.InsertOne(ctx, bot)
			if err != nil {
				log.Printf("PostOne: inserting: %v\n", err)
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			c.JSON(http.StatusCreated, gin.H{
				"id": res.InsertedID,
			})
		}
	}

	c.UpdateOne = func(s *Server) gin.HandlerFunc {
		return func(c *gin.Context) {
			ctx, cancel := context.WithTimeout(c.Request.Context(), time.Duration(s.Timeout)*time.Millisecond)
			defer cancel()

			// Decode to mongoDB ObjectID
			id, err := toMongoID(c.Param("id"))
			if err != nil {
				c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
				return
			}
			filter := bson.D{{Key: "_id", Value: id}}

			// Check if exists before even parsing data (404 > 400)
			if collection.FindOne(ctx, filter).Err() != nil {
				c.JSON(http.StatusNotFound, gin.H{"message": "no bot found with specified id"})
				return
			}

			// Bind request body
			var updatedBot Chatbot
			if err := c.BindJSON(&updatedBot); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			log.Printf("UpdateOne: update bot data: %v\n", updatedBot)

			// Full replace to simplify things
			_, err = collection.ReplaceOne(ctx, filter, updatedBot)
			if err != nil {
				log.Printf("UpdateOne: updating: %v\n", err)
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			c.Status(http.StatusOK)
		}
	}

	c.DeleteOne = func(s *Server) gin.HandlerFunc {
		return func(c *gin.Context) {
			ctx, cancel := s.timeoutCtx(c)
			defer cancel()

			// Decode to mongoDB ObjectID
			id, err := toMongoID(c.Param("id"))
			if err != nil {
				c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
				return
			}

			filter := bson.D{{Key: "_id", Value: id}}
			res, err := collection.DeleteOne(ctx, filter)
			if err != nil {
				log.Printf("DeleteOne: deleting: %v\n", err)
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			switch {
			case res.DeletedCount == 0:
				c.JSON(http.StatusNotFound, gin.H{
					"message": "no such bot with specified id",
				})
				return
			default:
				c.Status(http.StatusOK)
			}
		}
	}

	return c
}

// GetError test
func (b Chatbot) GetError(err validator.ValidationErrors) []string {
	errors := []string{}
	for _, err := range err {
		errors = append(errors, err.ActualTag())
	}
	return errors
	// if val, exist := err["ChatBot.Greetings"]; exist {
	// 	if val.Field == "Greetings" {
	// 		switch val.Tag {
	// 		case "required":
	// 			return "Please enter your mobile number"
	// 		}
	// 	}
	// }
	// if val, exist := err["ChatBot.Code"]; exist {
	// 	if val.Field == "Code" {
	// 		switch val.Tag {
	// 		case "required":
	// 			return "Please enter the verification code"
	// 		}
	// 	}
	// }
	// return "parameter error"
}
