package main

import (
	"log"
	"os"
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

	// Create server
	server, err := createServer()
	if err != nil {
		log.Fatalf("creating server: %v", err)
	}

	// Listen and serve
	server.Router.Run(host + ":" + port)
}
