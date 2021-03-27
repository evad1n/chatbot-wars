package main

import (
	"context"
	"fmt"
	"log"

	"github.com/evad1n/chatbot-wars/db"
	"github.com/evad1n/chatbot-wars/models"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func init() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {
	db.ConnectDB()

	bots := getOrphanBots()

	for _, bot := range bots {
		if bot.UID == primitive.NilObjectID {
			fmt.Println(bot.UID)
		}
	}

	user := getUser("old")
	fmt.Println(user)

	reparentBots(bots, user)
}

func getUser(username string) models.User {
	ctx := context.Background()

	var user models.User
	filter := bson.M{"username": username}

	res := db.Users.FindOne(ctx, filter)
	// If no doc is found
	if res.Err() != nil {
		log.Fatalf("getUser: no user found with username '%s'\n", username)
	}

	if err := res.Decode(&user); err != nil {
		log.Fatalf("getUser: decoding: %v\n", err)
	}

	return user
}

func getOrphanBots() []models.Bot {
	ctx := context.Background()

	bots := []models.Bot{}
	cur, err := db.Bots.Find(ctx, bson.M{})
	if err != nil {
		log.Fatalf("GetAll: finding: %v\n", err)
	}
	// Iterate and decode
	defer cur.Close(ctx)
	for cur.Next(ctx) {
		var bot models.Bot
		err := cur.Decode(&bot)
		if err != nil {
			log.Fatalf("GetAll: decoding: %v\n", err)
		}
		if bot.UID == primitive.NilObjectID {
			bots = append(bots, bot)
		}
	}
	if err := cur.Err(); err != nil {
		log.Fatalf("GetAll: cursor error: %v\n", err)
	}

	return bots
}

func reparentBots(bots []models.Bot, user models.User) {
	ctx := context.Background()

	for _, bot := range bots {
		filter := bson.M{"_id": bot.ID}
		update := bson.M{
			"$set": bson.M{
				"_uid": user.ID,
			},
		}

		if _, err := db.Bots.UpdateOne(ctx, filter, update); err != nil {
			log.Fatalf("Reparenting bots: setting: %v\n", err)
		}
	}

}
