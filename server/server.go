package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func createServer() (Server, error) {
	s := Server{
		Controllers: make(map[string]Controller),
	}

	var err error
	if s.DB, err = connectDB(); err != nil {
		return s, fmt.Errorf("connecting to db: %v", err)
	}

	s.Validate = validator.New()

	// Default has logger and debug mode
	s.Router = gin.Default()

	// Register controllers
	s.registerController("bots", initBotsController, "bots")

	// Register routes
	s.registerRoutes()

	return s, nil
}

// Initializes and registers a controller with a collection to the server
func (s *Server) registerController(name string, initFunc ControllerInitFunction, collectionName string) {
	c := initFunc(s, s.DB.Collection(collectionName))
	s.Controllers[name] = c
}

// All the defined routes for the server
func (s *Server) registerRoutes() {
	s.Router.GET("/bots", s.Controllers["bots"].GetAll(s))
	s.Router.GET("/bots/:id", s.Controllers["bots"].GetOne(s))
	s.Router.POST("/bots", s.Controllers["bots"].PostOne(s))
	s.Router.PUT("/bots/:id", s.Controllers["bots"].UpdateOne(s))
	s.Router.DELETE("/bots/:id", s.Controllers["bots"].DeleteOne(s))
}
