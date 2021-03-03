package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

var (
	host = ""
	port string
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.SetFlags(log.Lshortfile | log.Ltime)

	// Load environment variables
	loadENV()

	// Create server
	server, err := createServer()
	if err != nil {
		log.Fatalf("creating server: %v", err)
	}

	// Listen and serve
	server.Router.Run(host + ":" + port)
}

// Load env variables
func loadENV() {
	if err := godotenv.Load(".env"); err != nil {
		log.Printf("error loading env variables: %v\n", err)
	}
}
