package main

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

const (
	host = ""
	port = "8080"
)

var ()

func main() {
	// Timeout context
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Connect to mongoDB
	db, err := connectDB(ctx)
	if err != nil {
		log.Fatalf("connecting to mongo db: %v", err)
	}

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

	// router.GET("/bots/:id", func(c *gin.Context) {
	// 	var bot Chatbot
	// 	id := c.Param("id")
	// 	filter := bson.D{{Key: "_id", Value: id}}
	// 	collection.FindOne(ctx, filter).Decode(&bot)
	// })

	router.GET("/bots", func(c *gin.Context) {
		collection := db.Collection(botsCollection)
		var bots []Chatbot
		cur, err := collection.Find(ctx, bson.D{})
		if err != nil {
			log.Fatal(err)
		}
		defer cur.Close(ctx)
		for cur.Next(ctx) {
			var result Chatbot
			err := cur.Decode(&result)
			if err != nil {
				log.Fatal(err)
			}
			// do something with result....
			bots = append(bots, result)
		}
		if err := cur.Err(); err != nil {
			log.Fatal(err)
		}
	})

	// Listen and serve
	router.Run(host + ":" + port)
}
