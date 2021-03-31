package server

import (
	"github.com/evad1n/chatbot-wars/controllers/bots"
	"github.com/evad1n/chatbot-wars/controllers/lines"
	"github.com/evad1n/chatbot-wars/controllers/rooms"
	"github.com/evad1n/chatbot-wars/controllers/users"
)

// All the defined routes for the server
func (s *Server) registerRoutes() {

	api := s.Router.Group("/api")
	{
		// Sessions
		api.POST("/sessions", s.Auth.Login)
		// Users
		api.POST("/users", users.PostOne)
		// Bots
		api.GET("/bots", bots.GetAll)

		// Auth required endpoints
		authorized := api.Group("")
		authorized.Use(s.Auth.MiddlewareFunc())
		{
			// Sessions
			authorized.GET("/me", s.Auth.Me)
			// Bots
			authorized.GET("/users/bots", bots.GetUserBots)
			authorized.GET("/bots/:id", bots.GetOne)
			authorized.POST("/bots", bots.PostOne)
			authorized.PUT("/bots/:id", bots.UpdateOne)
			authorized.DELETE("/bots/:id", bots.DeleteOne)
			// Modify lines
			authorized.POST("/bots/:id/:lineType", lines.PostOne)
			authorized.DELETE("/bots/:id/:lineType/:index", lines.DeleteOne)
		}

		// Rooms socket
		api.GET("/rooms", rooms.ListenRoom)

		// Other
		api.GET("/unique/users/:username", users.UniqueName)
		api.GET("/unique/bots/:name", bots.UniqueName)
	}
}
