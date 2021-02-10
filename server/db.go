package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	collection = "chatbot-wars"
)

// Load env variables
func init() {
	if err := godotenv.Load(".env"); err != nil {
		log.Printf("error loading env variables: %v\n", err)
	}
}

func connectDB() {
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
	defer client.Disconnect(ctx)
}
