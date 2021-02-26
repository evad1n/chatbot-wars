package main

import (
	"fmt"
	"log"

	"github.com/joho/godotenv"
)

const (
	host = ""
	port = 8080
)

func main() {
	log.SetFlags(log.Lshortfile | log.Ltime)

	// Load environment variables
	loadENV()

	// Create server
	server, err := createServer()
	if err != nil {
		log.Fatalf("creating server: %v", err)
	}

	// Listen and serve
	server.Router.Run(host + ":" + fmt.Sprint(port))
}

// Load env variables
func loadENV() {
	if err := godotenv.Load(".env"); err != nil {
		log.Printf("error loading env variables: %v\n", err)
	}
}
