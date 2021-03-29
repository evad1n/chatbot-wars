package lines

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/evad1n/chatbot-wars/auth"
	"github.com/evad1n/chatbot-wars/common"
	"github.com/evad1n/chatbot-wars/db"
	"github.com/evad1n/chatbot-wars/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

var lineTypes = map[string]struct{}{
	"greetings": {},
	"questions": {},
	"responses": {},
}

func validLineType(lineType string) error {
	if _, ok := lineTypes[lineType]; !ok {
		return errors.New("not a valid line type")
	}
	return nil
}

func PostOne(c *gin.Context) {
	ctx, cancel := common.TimeoutCtx(c)
	defer cancel()

	lineType := c.Param("lineType")
	// First verify line type
	if err := validLineType(lineType); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
		return
	}

	userID := auth.GetUserID(c)
	botID := c.Param("id")

	bot, allowed := auth.IsAllowedBot(c, botID, userID)
	if !allowed {
		return
	}

	// Bind request body
	var line models.Line
	if err := common.BindWithErrors(c, &line); err != nil {
		return
	}

	filter := bson.M{"_id": bot.ID}

	// Add to line array
	update := bson.M{
		"$push": bson.M{
			lineType: line,
		},
	}

	if _, err := db.Bots.UpdateOne(ctx, filter, update); err != nil {
		log.Printf("Line post: updating: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusOK)
}

func DeleteOne(c *gin.Context) {
	ctx, cancel := common.TimeoutCtx(c)
	defer cancel()

	lineType := c.Param("lineType")
	// First verify line type
	if err := validLineType(lineType); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
		return
	}

	index, err := strconv.Atoi(c.Param("index"))
	if err != nil {
		c.String(http.StatusUnprocessableEntity, "index value must be a number")
		return
	}

	userID := auth.GetUserID(c)
	botID := c.Param("id")

	bot, allowed := auth.IsAllowedBot(c, botID, userID)
	if !allowed {
		return
	}

	filter := bson.M{"_id": bot.ID}

	// Stupid workaround to delete by index
	// First set line at index to nil
	update := bson.M{
		"$unset": bson.M{
			fmt.Sprintf("%s.%d", lineType, index): nil,
		},
	}
	if _, err := db.Bots.UpdateOne(ctx, filter, update); err != nil {
		log.Printf("Line update: unsetting: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Now remove it with nil filter
	update = bson.M{
		"$pull": bson.M{
			lineType: nil,
		},
	}
	if _, err := db.Bots.UpdateOne(ctx, filter, update); err != nil {
		log.Printf("Line update: pulling: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusOK)
}
