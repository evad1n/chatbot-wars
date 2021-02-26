package main

import (
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/mongo"
)

type (
	// Server contains all the high level data for the server
	Server struct {
		DB          *mongo.Database
		Validate    *validator.Validate
		Router      *gin.Engine
		Controllers map[string]Controller
	}

	// ServerHandlerFunc is a wrapper around gin.HandlerFunc that allows access to server variables
	ServerHandlerFunc func(s *Server) gin.HandlerFunc

	// Controller is a model controller for RESTful API requests
	Controller struct {
		Collection *mongo.Collection
		GetAll     ServerHandlerFunc
		GetOne     ServerHandlerFunc
		PostOne    ServerHandlerFunc
		DeleteOne  ServerHandlerFunc
		UpdateOne  ServerHandlerFunc
	}

	// ControllerInitFunction instantiates a controller and its handler methods
	ControllerInitFunction func(*Server, *mongo.Collection) Controller
)
