package controllers

import (
	"context"
	"log"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

type (
	// Controller is a model controller for RESTful API requests
	Controller struct {
		GetAll    gin.HandlerFunc
		GetOne    gin.HandlerFunc
		PostOne   gin.HandlerFunc
		DeleteOne gin.HandlerFunc
		UpdateOne gin.HandlerFunc
	}

	// ControllerInitFunction instantiates a controller and its handler methods
	ControllerInitFunction func(*mongo.Collection, *log.Logger) Controller
)

const (
	Timeout = 5000 // Context cancel timeout in milliseconds
)

// Returns a timeout context using the request context handler and the server timeout
func TimeoutCtx(c *gin.Context) (context.Context, context.CancelFunc) {
	return context.WithTimeout(c.Request.Context(), time.Duration(Timeout)*time.Millisecond)
}
