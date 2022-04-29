package handler

import (
	"backend/model"
	"backend/model/apperrors"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (h *Handler) CartGet(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		log.Printf("Unable to extract user from request context for unknown reason: %v\n", c)
		err := apperrors.NewInternal()
		c.JSON(err.Status(), gin.H{
			"error": err,
		})
		return
	}
	userId := user.(*model.User).UID
	ctx := c.Request.Context()
	cart, err := h.CartService.CartGet(ctx, userId)
	if err != nil {
		log.Printf("Unable to find user's cart: %v\n%v", userId, err)
		e := apperrors.NewNotFound("user", userId.String())

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"cart": cart,
	})
}

func (h *Handler) CartAddItem(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		log.Printf("Unable to extract user from request context for unknown reason: %v\n", c)
		err := apperrors.NewInternal()
		c.JSON(err.Status(), gin.H{
			"error": err,
		})
		return
	}
	fmt.Println("user", user)
	userId := user.(*model.User).UID
	ctx := c.Request.Context()
	cartId, err := h.CartService.CartGetId(ctx, userId)
	if err != nil {
		log.Printf("Failed to get cart: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	fmt.Println("cartId", cartId)
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
	cartItem, err := h.CartService.CartAddItem(ctx, &json)
	if err != nil {
		log.Printf("Failed to add cart item: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": cartItem,
	})
}

func (h *Handler) CartDeleteItem(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		log.Printf("Unable to extract user from request context for unknown reason: %v\n", c)
		err := apperrors.NewInternal()
		c.JSON(err.Status(), gin.H{
			"error": err,
		})
		return
	}
	userId := user.(*model.User).UID
	ctx := c.Request.Context()
	id := c.Param("id")
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
	cartItem, err := h.CartService.CartDeleteItem(ctx, cartId, productId)
	if err != nil {
		log.Printf("Failed to cart delete item: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"item": cartItem,
	})
}
func (h *Handler) CartIncrementItem(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		log.Printf("Unable to extract user from request context for unknown reason: %v\n", c)
		err := apperrors.NewInternal()
		c.JSON(err.Status(), gin.H{
			"error": err,
		})
		return
	}
	userId := user.(*model.User).UID
	ctx := c.Request.Context()
	productId, err := strconv.ParseInt(c.Param("id"), 0, 64)
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
	cartItem, err := h.CartService.CartIncrementItem(ctx, cartId, productId)
	if err != nil {
		log.Printf("Failed to get cart id: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"item": cartItem,
	})
}
func (h *Handler) CartDecrementItem(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		log.Printf("Unable to extract user from request context for unknown reason: %v\n", c)
		err := apperrors.NewInternal()
		c.JSON(err.Status(), gin.H{
			"error": err,
		})
		return
	}
	userId := user.(*model.User).UID
	ctx := c.Request.Context()
	productId, err := strconv.ParseInt(c.Param("id"), 0, 64)
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
	cartItem, err := h.CartService.CartDecrementItem(ctx, cartId, productId)
	if err != nil {
		log.Printf("Failed to get cart id: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"item": cartItem,
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
