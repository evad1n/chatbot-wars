package main

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type (
	// Line is a Chatbot response with associated data
	Line struct {
		Text string `json:"text" binding:"required"`
		Mood *Mood  `json:"mood" binding:"required,min=0,max=2"` // Should correspond to enum values
	}

	// Mood enum
	Mood int
)

const (
	happy Mood = iota
	angry
	sad
)

var lineTypes = map[string]struct{}{
	"greetings": {},
	"questions": {},
	"responses": {},
}

func validLineType(lineType string) error {
	if _, ok := lineTypes[lineType]; !ok {
		return errors.New("not a valid line type")
	}
	return nil
}

func initLinesController(s *Server, collection *mongo.Collection, log *log.Logger) Controller {
	var c Controller

	c.PostOne = func(s *Server) gin.HandlerFunc {
		return func(c *gin.Context) {
			ctx, cancel := s.timeoutCtx(c)
			defer cancel()

			lineType := c.Param("lineType")
			// First verify line type
			if err := validLineType(lineType); err != nil {
				c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
				return
			}

			// Decode to mongoDB ObjectID
			id, err := toMongoID(c.Param("id"))
			if err != nil {
				c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
				return
			}
			filter := bson.M{"_id": id}

			// Check if bot exists before even parsing data (404 > 400)
			if collection.FindOne(ctx, filter).Err() != nil {
				c.JSON(http.StatusNotFound, gin.H{"message": "no bot found with specified id"})
				return
			}

			// Bind request body
			var line Line
			if err := c.ShouldBindJSON(&line); err != nil {
				if errs, ok := err.(validator.ValidationErrors); ok {
					c.JSON(http.StatusUnprocessableEntity, gin.H{"errors": s.ValidationMessages(errs)})
				} else {
					c.String(http.StatusUnprocessableEntity, err.Error())
				}
				return
			}

			// Stupid workaround to delete by index
			update := bson.M{"$push": bson.M{fmt.Sprintf("%s", lineType): line}}
			_, err = collection.UpdateOne(ctx, filter, update)
			if err != nil {
				log.Printf("Line post: updating: %v\n", err)
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

			lineType := c.Param("lineType")
			// First verify line type
			if err := validLineType(lineType); err != nil {
				c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
				return
			}

			// Decode to mongoDB ObjectID
			id, err := toMongoID(c.Param("id"))
			if err != nil {
				c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
				return
			}
			filter := bson.M{"_id": id}

			// Check if bot exists before even parsing data (404 > 400)
			if collection.FindOne(ctx, filter).Err() != nil {
				c.JSON(http.StatusNotFound, gin.H{"message": "no bot found with specified id"})
				return
			}

			index, err := strconv.Atoi(c.Param("index"))
			if err != nil {
				c.String(http.StatusUnprocessableEntity, "index value must be a number")
			}

			// Stupid workaround to delete by index
			// First set at index to nil
			update := bson.M{"$unset": bson.M{fmt.Sprintf("%s.%d", lineType, index): nil}}
			_, err = collection.UpdateOne(ctx, filter, update)
			if err != nil {
				log.Printf("Line update: unsetting: %v\n", err)
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			// Now remove it with nil filter
			update = bson.M{"$pull": bson.M{lineType: nil}}
			_, err = collection.UpdateOne(ctx, filter, update)
			if err != nil {
				log.Printf("Line update: pulling: %v\n", err)
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			c.Status(http.StatusOK)
		}
	}

	return c
}
