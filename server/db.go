package main

type (
	chatbot struct {
		name   string
		config config
		data
	}

	config struct {
	}

	data struct {
		greetings []greeting
		questions []question
		responses []response
	}

	mood int

	question struct {
		text string
	}

	response struct {
		text string
	}

	greeting struct {
		text string
	}
)

const (
	anger mood = iota
	enthusiastic
	sadness
	dubious
)
