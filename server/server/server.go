package server

import (
	"errors"
	"fmt"
	"os"

	"github.com/evad1n/chatbot-wars/auth"
	"github.com/evad1n/chatbot-wars/common"
	"github.com/evad1n/chatbot-wars/db"
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

type (
	// Server contains all the high level data for the server
	Server struct {
		Router *gin.Engine
		Auth   *auth.AuthMiddleware
	}
)

func CreateServer() (Server, error) {
	server := Server{}

	var err error
	if err = db.ConnectDB(); err != nil {
		return server, fmt.Errorf("connecting to db: %v", err)
	}

	// Default has logger and debug mode
	server.Router = gin.Default()

	// Using hashMode history so I don't have to use my brain
	server.Router.Use(static.ServeRoot("/", "./public"))
	// server.Router.Use(static.ServeRoot("/", "./test"))

	// CORS
	server.Router.Use(cors.Default())

	// Auth
	secret := os.Getenv("JWT_KEY")
	if secret == "" {
		return server, errors.New("no JWT secret key found in environment variables")
	}

	server.Auth = auth.New([]byte(secret))

	common.SetValidateJSONTags()

	// Register routes
	server.registerRoutes()

	return server, nil
}
