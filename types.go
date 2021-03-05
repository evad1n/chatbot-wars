package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/mongo"
)

type (
	// Server contains all the high level data for the server
	Server struct {
		DB                 *mongo.Database
		Router             *gin.Engine
		Controllers        map[string]Controller // Named registered controllers
		Rooms              map[string]*Room
		Timeout            int // How long to wait for requests (milliseconds)
		ValidationMessages func(validator.ValidationErrors) []ValidationError
	}

	// ValidationError represents a more descriptive message to be sent in the event of validation errors
	ValidationError struct {
		Field  string `json:"field"`
		Reason string `json:"reason"`
	}

	// ServerHandlerFunc is a wrapper around gin.HandlerFunc that allows access to server variables
	ServerHandlerFunc func(s *Server) gin.HandlerFunc

	// Controller is a model controller for RESTful API requests
	Controller struct {
		GetAll    ServerHandlerFunc
		GetOne    ServerHandlerFunc
		PostOne   ServerHandlerFunc
		DeleteOne ServerHandlerFunc
		UpdateOne ServerHandlerFunc
	}

	// ControllerInitFunction instantiates a controller and its handler methods
	ControllerInitFunction func(*Server, *mongo.Collection, *log.Logger) Controller
)
