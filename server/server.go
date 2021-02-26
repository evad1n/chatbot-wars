package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

func createServer() (Server, error) {
	s := Server{
		Controllers: make(map[string]Controller),
		Timeout:     5000,
	}

	var err error
	if s.DB, err = connectDB(); err != nil {
		return s, fmt.Errorf("connecting to db: %v", err)
	}

	// Register controllers
	log.Println("REGISTERED CONTROLLERS")
	s.registerController("bots", initBotsController, "bots")
	fmt.Println()

	// Default has logger and debug mode
	s.Router = gin.Default()

	// Register routes
	s.registerRoutes()

	return s, nil
}

// Initializes and registers a controller with a collection to the server
func (s *Server) registerController(name string, initFunc ControllerInitFunction, collectionName string) {
	c := initFunc(
		s,
		s.DB.Collection(collectionName),
		log.New(os.Stdout, fmt.Sprintf("%s CONTROLLER: ", strings.ToUpper(name)), log.Lshortfile|log.Ltime),
	)
	s.Controllers[name] = c
	log.Printf("Registered [%s] controller with collection [%s]\n", name, collectionName)
}

// All the defined routes for the server
func (s *Server) registerRoutes() {
	s.Router.GET("/bots", s.Controllers["bots"].GetAll(s))
	s.Router.GET("/bots/:id", s.Controllers["bots"].GetOne(s))
	s.Router.POST("/bots", s.Controllers["bots"].PostOne(s))
	s.Router.PUT("/bots/:id", s.Controllers["bots"].UpdateOne(s))
	s.Router.DELETE("/bots/:id", s.Controllers["bots"].DeleteOne(s))
}

// Returns a timeout context using the request context handler and the server timeout
func (s *Server) timeoutCtx(c *gin.Context) (context.Context, context.CancelFunc) {
	return context.WithTimeout(c.Request.Context(), time.Duration(s.Timeout)*time.Millisecond)
}
