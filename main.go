package main

import (
	"log"
	"os"

	"github.com/evad1n/chatbot-wars/server"
	"github.com/joho/godotenv"
)

var (
	host = ""
	port string
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.SetFlags(log.Lshortfile | log.Ltime)

	// Create server
	s, err := server.CreateServer()
	if err != nil {
		log.Fatalf("creating server: %v", err)
	}

	// Listen and serve
	s.Router.Run(host + ":" + port)
}
