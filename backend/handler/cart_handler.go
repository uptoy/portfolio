package handler

import (
	// 	"log"
	// "bytes"
	"context"
	"net/http"
	"time"

	"backend/model"
	"backend/model/apperrors"
	// "errors"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func (h *Handler) AddCartItem(c *gin.Context) {
	ctx := c.Request.Context()
	authUser := c.MustGet("user").(*model.User)
	userId := authUser.UID
	cartId, err := h.CartService.CartGetId(ctx, userId)
	if err != nil {
		log.Printf("Failed to get cart id: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	var json model.CartItem
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	json = model.CartItem{
		CartId:    cartId,
		ProductId: json.ProductId,
		Quantity:  json.Quantity,
	}
	cart, err := h.CartService.CartAddItem(ctx, &json)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, err)
	}
	c.IndentedJSON(http.StatusAccepted, cart)
}
func (h *Handler) RemoveCartItem(c *gin.Context) {
	authUser := c.MustGet("user").(*model.User)
	userId := authUser.UID
	// authUser := c.MustGet("user").(*model.User)
	// userId := authUser.UID
	// productId := c.Query("id")
	var productId uuid.UUID
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()
	cart, err := h.CartService.C(ctx, userId, productId)
	// err := h.CartService.RemoveCartItem(ctx, productId, userId)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, err)
	}
	c.IndentedJSON(200, cart)
}

func (h *Handler) GetCartItem(c *gin.Context) {
	authUser := c.MustGet("user").(*model.User)
	userId := authUser.UID
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()
	cartItems, err := h.CartService.GetCartItemList(ctx, userId)
	if err != nil {
		log.Printf("Failed to update user: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusAccepted, gin.H{
		"cartItems": cartItems,
	})
}

// if userId == "" {
// 	log.Println("user id is empty")
// 	_ = c.AbortWithError(http.StatusBadRequest, errors.New("user id is empty"))
// 	return
// }
// var ctx, cancel = context.WithTimeout(context.Background(), 5*time.Second)
// defer cancel()
