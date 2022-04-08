package handler

import (
	// 	"log"
	// "bytes"
	// "context"
	"net/http"
	"strconv"
	// "time"

	"backend/model"
	"backend/model/apperrors"
	// "errors"
	"log"

	"github.com/gin-gonic/gin"
	// "github.com/google/uuid"
)

func (h *Handler) CartGet(c *gin.Context) {
	ctx := c.Request.Context()
	authUser := c.MustGet("user").(*model.User)
	userId := authUser.UID
	cart, err := h.CartService.CartGet(ctx, userId)
	if err != nil {
		log.Printf("Failed to cart delete item: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"cart": cart,
	})
}

func (h *Handler) CartAddItem(c *gin.Context) {
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

func (h *Handler) CartDeleteItem(c *gin.Context) {
	ctx := c.Request.Context()
	id := c.Param("id")
	authUser := c.MustGet("user").(*model.User)
	userId := authUser.UID
	productId, err := strconv.ParseInt(id, 0, 64)
	if err != nil {
		log.Printf("Failed to get product id: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	cartId, err := h.CartService.CartGetId(ctx, userId)
	if err != nil {
		log.Printf("Failed to get cart id: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	cart, err := h.CartService.CartDeleteItem(ctx, cartId, productId)
	if err != nil {
		log.Printf("Failed to cart delete item: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"cart": cart,
	})
}
func (h *Handler) CartIncrementItem(c *gin.Context) {
	ctx := c.Request.Context()
	id := c.Param("id")
	authUser := c.MustGet("user").(*model.User)
	userId := authUser.UID
	productId, err := strconv.ParseInt(id, 0, 64)
	if err != nil {
		log.Printf("Failed to get product id: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	cartId, err := h.CartService.CartGetId(ctx, userId)
	if err != nil {
		log.Printf("Failed to get cart id: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	cart, err := h.CartService.CartIncrementItem(ctx, cartId, productId)
	if err != nil {
		log.Printf("Failed to get cart id: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"cart": cart,
	})
}
func (h *Handler) CartDecrementItem(c *gin.Context) {
	ctx := c.Request.Context()
	id := c.Param("id")
	authUser := c.MustGet("user").(*model.User)
	userId := authUser.UID
	productId, err := strconv.ParseInt(id, 0, 64)
	if err != nil {
		log.Printf("Failed to get product id: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	cartId, err := h.CartService.CartGetId(ctx, userId)
	if err != nil {
		log.Printf("Failed to get cart id: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	cart, err := h.CartService.CartDecrementItem(ctx, cartId, productId)
	if err != nil {
		log.Printf("Failed to get cart id: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"cart": cart,
	})

}

// func (h *Handler) RemoveCartItem(c *gin.Context) {
// 	authUser := c.MustGet("user").(*model.User)
// 	userId := authUser.UID
// 	defer cancel()
// 	cart, err := h.CartService.C(ctx, userId, productId)
// 	// err := h.CartService.RemoveCartItem(ctx, productId, userId)
// 	if err != nil {
// 		c.IndentedJSON(http.StatusInternalServerError, err)
// 	}
// 	c.IndentedJSON(200, cart)
// }

// func (h *Handler) GetCartItem(c *gin.Context) {
// 	authUser := c.MustGet("user").(*model.User)
// 	userId := authUser.UID
// 	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
// 	defer cancel()
// 	cartItems, err := h.CartService.GetCartItemList(ctx, userId)
// 	if err != nil {
// 		log.Printf("Failed to update user: %v\n", err.Error())
// 		c.JSON(apperrors.Status(err), gin.H{
// 			"error": err,
// 		})
// 		return
// 	}
// 	c.JSON(http.StatusAccepted, gin.H{
// 		"cartItems": cartItems,
// 	})
// }

// if userId == "" {
// 	log.Println("user id is empty")
// 	_ = c.AbortWithError(http.StatusBadRequest, errors.New("user id is empty"))
// 	return
// }
// var ctx, cancel = context.WithTimeout(context.Background(), 5*time.Second)
// defer cancel()
