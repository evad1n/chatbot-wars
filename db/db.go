package db

import (
	"context"
	"errors"
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

var (
	// The connected mongo database
	DB *mongo.Database
	// Bots collection
	Bots *mongo.Collection
	// Users collection
	Users *mongo.Collection
)

// Connect to a mongo database, uses .env file with key "MONGO_PWD" for password
func ConnectDB() error {
	pwd := os.Getenv("MONGO_PWD")
	if pwd == "" {
		return errors.New("Can't find MONGO_PWD in environment variables")
	}
	// Connect to MongoDB
	mongoURI := fmt.Sprintf("mongodb+srv://%s:%s@%s.vsqii.mongodb.net/%s?retryWrites=true&w=majority", username, pwd, cluster, dbName)

	client, err := mongo.NewClient(options.Client().ApplyURI(mongoURI))
	if err != nil {
		return fmt.Errorf("creating mongo client: %v", err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Connect(ctx)
	if err != nil {
		return fmt.Errorf("client connecting to mongo: %v", err)
	}
	// Assigning variables
	DB = client.Database(dbName)
	Bots = DB.Collection("bots")
	Users = DB.Collection("users")

	// Successfully connected**
	log.Printf("Successfully connected to MongoDB (database: %s)\n\n", dbName)

	return nil
}

// Converts a hex ID string to a bson objectID
func ToMongoID(hexID string) (primitive.ObjectID, error) {
	id, err := primitive.ObjectIDFromHex(hexID)
	if err != nil {
		return id, fmt.Errorf("bad id format: %v", err)
	}
	return id, nil
}
