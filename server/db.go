package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	username = "web4200"      // MongoDB username
	cluster  = "demo"         // MongoDB cluster name
	dbName   = "chatbot-wars" // MongoDB database name
)

// Connect to a mongo database, uses .env file with key "MONGO_PWD" for password
func connectDB() (*mongo.Database, error) {
	// Connect to MongoDB
	mongoURI := fmt.Sprintf("mongodb+srv://%s:%s@%s.vsqii.mongodb.net/%s?retryWrites=true&w=majority", username, os.Getenv("MONGO_PWD"), cluster, dbName)

	client, err := mongo.NewClient(options.Client().ApplyURI(mongoURI))
	if err != nil {
		return nil, fmt.Errorf("creating mongo client: %v", err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Connect(ctx)
	if err != nil {
		return nil, fmt.Errorf("client connecting to mongo: %v", err)
	}
	db := client.Database(dbName)
	// Successfully connected**
	log.Printf("Successfully connected to MongoDB (database: %s)\n\n", dbName)

	return db, nil
}

// Converts a hex ID string to a bson objectID
func toMongoID(hexID string) (primitive.ObjectID, error) {
	id, err := primitive.ObjectIDFromHex(hexID)
	if err != nil {
		return id, fmt.Errorf("bad id format: %v", err)
	}
	return id, nil
}
