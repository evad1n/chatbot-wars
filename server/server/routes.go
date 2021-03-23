package server

// All the defined routes for the server
func (s *Server) registerRoutes() {

	api := s.Router.Group("/api")
	{
		// Sessions
		api.POST("/sessions", s.Auth.Login)
		// Users
		api.POST("/users", s.Controllers["users"].PostOne)
		// Bots
		api.GET("/bots", s.Controllers["bots"].GetAll)
		api.GET("/bots/:id", s.Controllers["bots"].GetOne)
		// Fight rooms
		api.POST("/rooms", s.Controllers["rooms"].PostOne)
		api.GET("/rooms/:roomHash", s.Controllers["rooms"].GetOne)
		api.PUT("/rooms/:roomHash/:botID", s.Controllers["rooms"].UpdateOne)
		api.DELETE("/rooms/:roomHash", s.Controllers["rooms"].DeleteOne)

		// Auth required endpoints
		authorized := api.Group("")
		authorized.Use(s.Auth.MiddlewareFunc())
		{
			// Sessions
			authorized.GET("/me", s.Auth.Me)
			authorized.DELETE("/sessions", s.Auth.Logout)
			// Bots
			authorized.POST("/bots", s.Controllers["bots"].PostOne)
			authorized.PUT("/bots/:id", s.Controllers["bots"].UpdateOne)
			authorized.DELETE("/bots/:id", s.Controllers["bots"].DeleteOne)
			// Modify lines
			authorized.POST("/bots/:id/:lineType", s.Controllers["lines"].PostOne)
			authorized.DELETE("/bots/:id/:lineType/:index", s.Controllers["lines"].DeleteOne)
		}
	}
}
