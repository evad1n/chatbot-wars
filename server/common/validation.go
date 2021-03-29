package common

import (
	"fmt"
	"net/http"
	"reflect"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
)

type (
	// ValidationError represents a more descriptive message to be sent in the event of validation errors
	ValidationError struct {
		Field  string `json:"field"`
		Reason string `json:"reason"`
	}
)

// Validation errors will print the JSON field name, not the struct field name
func SetValidateJSONTags() {
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
func ValidationErrorMessages(verr validator.ValidationErrors) []ValidationError {
	errs := []ValidationError{}

	for _, fe := range verr {
		err := fe.ActualTag()
		if fe.Param() != "" {
			err = fmt.Sprintf("%s=%s", err, fe.Param())
		}
		errs = append(errs, ValidationError{
			Field: fmt.Sprintf("%s (%s)", fe.Field(),
				fe.Namespace()), Reason: err,
		})
	}

	return errs
}

// Trys to bind and sets appropriate status code and error messages. Should end handler if this returns an error
func BindWithErrors(c *gin.Context, obj interface{}) error {
	if err := c.ShouldBindJSON(obj); err != nil {
		if errs, ok := err.(validator.ValidationErrors); ok {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"errors": ValidationErrorMessages(errs)})
		} else {
			c.String(http.StatusUnprocessableEntity, err.Error())
		}
		return err
	}
	return nil
}
