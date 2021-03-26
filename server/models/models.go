package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type (
	// User can have many bots
	User struct {
		ID        primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
		FirstName string             `json:"firstName" binding:"required,gt=0"`
		LastName  string             `json:"lastName" binding:"required,gt=0"`
		Username  string             `json:"username" binding:"required,gt=0"`
		Password  string             `json:"password" binding:"required,gt=0"`
	}

	// Bot is a chatbot with a collection of lines
	Bot struct {
		ID        primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
		Name      string             `json:"name" binding:"required,min=3,max=30"`
		Greetings []Line             `json:"greetings" binding:"required,gte=1,dive"`
		Questions []Line             `json:"questions" binding:"required,gte=2,dive"`
		Responses []Line             `json:"responses" binding:"required,gte=2,dive"`
	}

	// Line is a bot response with associated data
	Line struct {
		Text string `json:"text" binding:"required"`
		Mood *Mood  `json:"mood" binding:"required,min=0,max=2"` // Should correspond to enum values
	}

	// Mood enum
	Mood int
)
