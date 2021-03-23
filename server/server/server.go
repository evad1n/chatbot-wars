package server

import (
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/evad1n/chatbot-wars/auth"
	"github.com/evad1n/chatbot-wars/controllers"
	"github.com/evad1n/chatbot-wars/db"
	"github.com/evad1n/chatbot-wars/validation"
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

type (
	// Server contains all the high level data for the server
	Server struct {
		DB          *mongo.Database
		Router      *gin.Engine
		Auth        *auth.AuthMiddleware
		Controllers map[string]controllers.Controller // Named registered controllers
		Rooms       map[string]*controllers.Room
	}

	// ServerHandlerFunc is a wrapper around gin.HandlerFunc that allows access to server variables
	ServerHandlerFunc func(s *Server) gin.HandlerFunc
)

func CreateServer() (Server, error) {
	s := Server{
		Controllers: make(map[string]controllers.Controller),
	}

	var err error
	if s.DB, err = db.ConnectDB(); err != nil {
		return s, fmt.Errorf("connecting to db: %v", err)
	}

	// Register controllers
	log.Println("REGISTERED CONTROLLERS")
	s.registerController("bots", controllers.InitBotsController, "bots")
	s.registerController("lines", controllers.InitLinesController, "bots")
	s.registerController("rooms", controllers.InitRoomsController, "bots")
	s.registerController("users", controllers.InitUsersController, "users")
	fmt.Println()

	// Default has logger and debug mode
	s.Router = gin.Default()

	// Using hashMode history so I don't have to use my brain
	s.Router.Use(static.ServeRoot("/", "./public"))

	// CORS
	s.Router.Use(cors.Default())

	// Sessions
	// store := cookie.NewStore([]byte("secret"))
	// s.Router.Use(sessions.Sessions("mysession", store))

	// Auth
	secret := os.Getenv("JWT_KEY")
	if secret == "" {
		secret = "ooga booga"
	}

	s.Auth = auth.New(s.DB.Collection("users"), []byte(secret))

	validation.SetValidateJSONTags()

	// Register routes
	s.registerRoutes()

	return s, nil
}

// Initializes and registers a controller with a collection to the server
func (s *Server) registerController(name string, initFunc controllers.ControllerInitFunction, collectionName string) {
	c := initFunc(
		s.DB.Collection(collectionName),
		log.New(os.Stdout, fmt.Sprintf("%s CONTROLLER: ", strings.ToUpper(name)), log.Lshortfile|log.Ltime),
	)
	s.Controllers[name] = c
	log.Printf("Registered [%s] controller with collection [%s]\n", name, collectionName)
}
