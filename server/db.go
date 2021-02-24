package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type (

	// Config is
	Config struct {
	}

	// Data is the collection of lines
	Data struct {
		greetings []Greeting
		questions []Question
		responses []Response
	}

	// Mood enum for categorizing lines
	Mood int

	// Question is a line that desires a response
	Question struct {
		text string
	}

	// Response is a line that responds to a question
	Response struct {
		text string
	}

	// Greeting is a line said upon entering a conversation
	Greeting struct {
		text string
	}
)

const (
	anger Mood = iota
	enthusiastic
	sadness
	dubious
)

const (
	dbName         = "chatbot-wars" // MongoDB database name
	botsCollection = "bots"         // Bots collection
)

// Connect to a mongo database
func connectDB(ctx context.Context) (*mongo.Database, error) {
	// Load environment variables
	loadENV()
	// Connect to MongoDB
	mongoURI := fmt.Sprintf("mongodb+srv://web4200:%s@demo.vsqii.mongodb.net/%s?retryWrites=true&w=majority", os.Getenv("MONGO_PWD"), dbName)

	client, err := mongo.NewClient(options.Client().ApplyURI(mongoURI))
	if err != nil {
		return nil, fmt.Errorf("creating mongo client: %v", err)
	}
	err = client.Connect(ctx)
	if err != nil {
		return nil, fmt.Errorf("client connecting to mongo: %v", err)
	}
	db := client.Database(dbName)
	// Successfully connected
	log.Printf("Successfully connected to MongoDB\ndatabase: %s\n\n", dbName)

	return db, nil
}

// Load env variables
func loadENV() {
	if err := godotenv.Load(".env"); err != nil {
		log.Printf("error loading env variables: %v\n", err)
	}
}
