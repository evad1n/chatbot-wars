package main

// All the defined routes for the server
func (s *Server) registerRoutes() {

	api := s.Router.Group("/api")
	{
		api.GET("/bots", s.Controllers["bots"].GetAll(s))
		api.GET("/bots/:id", s.Controllers["bots"].GetOne(s))
		api.POST("/bots", s.Controllers["bots"].PostOne(s))
		api.PUT("/bots/:id", s.Controllers["bots"].UpdateOne(s))
		api.DELETE("/bots/:id", s.Controllers["bots"].DeleteOne(s))
		// Modify lines
		api.POST("/bots/:id/:lineType", s.Controllers["lines"].PostOne(s))
		api.DELETE("/bots/:id/:lineType/:index", s.Controllers["lines"].DeleteOne(s))
		// Fight rooms
		api.POST("/rooms", s.Controllers["rooms"].PostOne(s))
		api.GET("/rooms/:roomHash", s.Controllers["rooms"].GetOne(s))
		api.PUT("/rooms/:roomHash/:botID", s.Controllers["rooms"].UpdateOne(s))
		api.DELETE("/rooms/:roomHash", s.Controllers["rooms"].DeleteOne(s))
	}
}
