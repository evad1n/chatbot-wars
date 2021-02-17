package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	host = ""
	port = "8080"

	collection = "chatbot-wars" // MongoDB collection name
)

func main() {
	// Connect to MongoDB
	loadENV()
	mongoURI := fmt.Sprintf("mongodb+srv://web4200:%s@demo.vsqii.mongodb.net/%s?retryWrites=true&w=majority", os.Getenv("MONGO_PWD"), collection)

	client, err := mongo.NewClient(options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Successfully connected to MongoDB with collection " + collection)
	defer client.Disconnect(ctx)

	// Create router
	router := gin.Default()

	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	// This handler will match /user/john but will not match /user/ or /user
	router.GET("/user/:name", func(c *gin.Context) {
		name := c.Param("name")
		c.String(http.StatusOK, "Hello %s", name)
	})

	// However, this one will match /user/john/ and also /user/john/send
	// If no other routers match /user/john, it will redirect to /user/john/
	router.GET("/user/:name/*action", func(c *gin.Context) {
		name := c.Param("name")
		action := c.Param("action")
		message := name + " wants to" + action
		c.String(http.StatusOK, message)
	})

	// Listen and serve
	router.Run(host + ":" + port)
}

// Load env variables
func loadENV() {
	if err := godotenv.Load(".env"); err != nil {
		log.Printf("error loading env variables: %v\n", err)
	}
}
