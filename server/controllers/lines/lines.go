package lines

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"strconv"

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

	// Decode to mongoDB ObjectID
	id, err := db.ToMongoID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
		return
	}
	filter := bson.M{"_id": id}

	// Check if bot exists before even parsing data (404 > 400)
	if db.Bots.FindOne(ctx, filter).Err() != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "no bot found with specified id"})
		return
	}

	// Bind request body
	var line models.Line
	if err := common.BindWithErrors(c, &line); err != nil {
		return
	}

	// Stupid workaround to delete by index
	update := bson.M{"$push": bson.M{fmt.Sprintf("%s", lineType): line}}
	_, err = db.Bots.UpdateOne(ctx, filter, update)
	if err != nil {
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

	// Decode to mongoDB ObjectID
	id, err := db.ToMongoID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
		return
	}
	filter := bson.M{"_id": id}

	// Check if bot exists before even parsing data (404 > 400)
	if db.Bots.FindOne(ctx, filter).Err() != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "no bot found with specified id"})
		return
	}

	index, err := strconv.Atoi(c.Param("index"))
	if err != nil {
		c.String(http.StatusUnprocessableEntity, "index value must be a number")
	}

	// Stupid workaround to delete by index
	// First set at index to nil
	update := bson.M{"$unset": bson.M{fmt.Sprintf("%s.%d", lineType, index): nil}}
	_, err = db.Bots.UpdateOne(ctx, filter, update)
	if err != nil {
		log.Printf("Line update: unsetting: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// Now remove it with nil filter
	update = bson.M{"$pull": bson.M{lineType: nil}}
	_, err = db.Bots.UpdateOne(ctx, filter, update)
	if err != nil {
		log.Printf("Line update: pulling: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusOK)
}
