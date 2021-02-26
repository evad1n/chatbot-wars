package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"reflect"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
)

func createServer() (Server, error) {
	s := Server{
		Controllers:        make(map[string]Controller),
		Timeout:            5000,
		ValidationMessages: validationErrorMessages,
	}

	var err error
	if s.DB, err = connectDB(); err != nil {
		return s, fmt.Errorf("connecting to db: %v", err)
	}

	// Register controllers
	log.Println("REGISTERED CONTROLLERS")
	s.registerController("bots", initBotsController, "bots")
	fmt.Println()

	// Default has logger and debug mode
	s.Router = gin.Default()

	validateJSONTags()

	// Register routes
	s.registerRoutes()

	return s, nil
}

// Initializes and registers a controller with a collection to the server
func (s *Server) registerController(name string, initFunc ControllerInitFunction, collectionName string) {
	c := initFunc(
		s,
		s.DB.Collection(collectionName),
		log.New(os.Stdout, fmt.Sprintf("%s CONTROLLER: ", strings.ToUpper(name)), log.Lshortfile|log.Ltime),
	)
	s.Controllers[name] = c
	log.Printf("Registered [%s] controller with collection [%s]\n", name, collectionName)
}

// All the defined routes for the server
func (s *Server) registerRoutes() {
	s.Router.GET("/bots", s.Controllers["bots"].GetAll(s))
	s.Router.GET("/bots/:id", s.Controllers["bots"].GetOne(s))
	s.Router.POST("/bots", s.Controllers["bots"].PostOne(s))
	s.Router.PUT("/bots/:id", s.Controllers["bots"].UpdateOne(s))
	s.Router.DELETE("/bots/:id", s.Controllers["bots"].DeleteOne(s))
}

// Returns a timeout context using the request context handler and the server timeout
func (s *Server) timeoutCtx(c *gin.Context) (context.Context, context.CancelFunc) {
	return context.WithTimeout(c.Request.Context(), time.Duration(s.Timeout)*time.Millisecond)
}

// Validation errors will print the JSON field name, not the struct field name
func validateJSONTags() {
	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		v.RegisterTagNameFunc(func(fld reflect.StructField) string {
			name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]
			if name == "-" {
				return ""
			}
			return name
		})
	}
}

// Better validation messages
func validationErrorMessages(verr validator.ValidationErrors) []ValidationError {
	errs := []ValidationError{}

	for _, fe := range verr {
		err := fe.ActualTag()
		if fe.Param() != "" {
			err = fmt.Sprintf("%s=%s", err, fe.Param())
		}
		errs = append(errs, ValidationError{Field: fmt.Sprintf("%s (%s)", fe.Field(), fe.Namespace()), Reason: err})
	}

	return errs
}
