package main

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

type (
	// Server contains all the high level data for the server
	Server struct {
		db     *mongo.Database
		router *gin.Engine
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
)
