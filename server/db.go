package main

type (
	// Chatbot represents a bot with all its data and settings
	Chatbot struct {
		name   string
		config Config
		data   Data
	}

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
