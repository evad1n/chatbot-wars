package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

// All the defined routes for the server
func (s *Server) registerRoutes() {
	s.Router.GET("/bots", s.Controllers["bots"].GetAll(s))
	s.Router.GET("/bots/:id", s.Controllers["bots"].GetOne(s))
	s.Router.POST("/bots", s.Controllers["bots"].PostOne(s))
	s.Router.PUT("/bots/:id", s.Controllers["bots"].UpdateOne(s))
	s.Router.DELETE("/bots/:id", s.Controllers["bots"].DeleteOne(s))
	// Modify lines
	s.Router.POST("/bots/:id/:lineType/", s.Controllers["lines"].PostOne(s))
	s.Router.DELETE("/bots/:id/:lineType/:index", s.Controllers["lines"].DeleteOne(s))
	// Delete all bots
	s.Router.DELETE("/DANGER/BAD", s.deleteAllBots())
}

// Temp funcs for developing

// Deletes all bots
func (s *Server) deleteAllBots() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := s.timeoutCtx(c)
		defer cancel()

		res, err := s.DB.Collection("bots").DeleteMany(ctx, bson.D{})
		if err != nil {
			log.Printf("deleting all bots: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"numDeleted": res.DeletedCount,
		})
	}
}
