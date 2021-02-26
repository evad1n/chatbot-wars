package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func createServer() (Server, error) {
	var s Server

	var err error
	if s.db, err = connectDB(); err != nil {
		return s, fmt.Errorf("connecting to db: %v", err)
	}

	// Default has logger and debug mode
	s.router = gin.Default()

	// Register controller collections
	s.registerController(BotsController, "bots")

	// Register routes
	s.registerRoutes()

	return s, nil
}

// Assigns a collection to a controller
func (s *Server) registerController(c Controller, collectionName string) {
	c.Collection = s.db.Collection(collectionName)
}

// All the defined routes for the server
func (s *Server) registerRoutes() {
	s.router.GET("/bots", BotsController.GetAll(s))
	s.router.GET("/bots/:id", BotsController.GetOne(s))
}
