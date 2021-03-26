package common

import (
	"context"
	"time"

	"github.com/gin-gonic/gin"
)

const (
	Timeout = 5000 // Context cancel timeout in milliseconds
)

// Returns a timeout context using the request context handler and the server timeout
func TimeoutCtx(c *gin.Context) (context.Context, context.CancelFunc) {
	return context.WithTimeout(c.Request.Context(), time.Duration(Timeout)*time.Millisecond)
}
