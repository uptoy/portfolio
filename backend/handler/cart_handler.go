package handler

import (
	"backend/model"
	// "fmt"
	// "fmt"
	"log"

	// "github.com/google/uuid"

	"backend/model/apperrors"
	"net/http"

	// // "fmt"

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
	ctx := c.Request.Context()
	userID := user.(*model.User).UserId
	cart, err := h.CartService.CartGet(ctx, userID)
	if err != nil {
		log.Printf("Unable to find cart: %v", err)
		e := apperrors.NewNotFound("cart", "err")
		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"items": cart,
	})
}

func (h *Handler) CartAddItem(c *gin.Context) {
	type cartReq struct {
		ProductId int64 `json:"product_id" binding:"omitempty,"`
		Quantity  int64 `json:"quantity" binding:"omitempty,"`
	}
	var req cartReq
	user, exists := c.Get("user")
	if !exists {
		log.Printf("Unable to extract user from request context for unknown reason: %v\n", c)
		err := apperrors.NewInternal()
		c.JSON(err.Status(), gin.H{
			"error": err,
		})

		return
	}
	ctx := c.Request.Context()
	cartId := user.(*model.Cart).Id
	productId := req.ProductId
	quantity := req.Quantity
	cart, err := h.CartService.CartAddItem(ctx, cartId, productId, quantity)
	if err != nil {
		log.Printf("Unable to create cart: %v", err)
		e := apperrors.NewNotFound("cart", "err")
		c.JSON(http.StatusBadRequest, gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"cart": cart,
	})
}

func (h *Handler) CartDeleteItem(c *gin.Context) {
	type cartReq struct {
		ProductId int64 `json:"product_id" binding:"omitempty,"`
		Quantity  int64 `json:"quantity" binding:"omitempty,"`
	}
	var req cartReq
	user, exists := c.Get("user")
	if !exists {
		log.Printf("Unable to extract user from request context for unknown reason: %v\n", c)
		err := apperrors.NewInternal()
		c.JSON(err.Status(), gin.H{
			"error": err,
		})

		return
	}
	ctx := c.Request.Context()
	cartId := user.(*model.Cart).Id
	productId := req.ProductId
	cart, err := h.CartService.CartDeleteItem(ctx, cartId, productId)
	if err != nil {
		log.Printf("Unable to delete cart: %v", err)
		e := apperrors.NewNotFound("cart", "err")
		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"cart": cart,
	})
}

func (h *Handler) CartIncrementItem(c *gin.Context) {
	type cartReq struct {
		ProductId int64 `json:"product_id" binding:"omitempty,"`
		Quantity  int64 `json:"quantity" binding:"omitempty,"`
	}
	var req cartReq
	user, exists := c.Get("user")
	if !exists {
		log.Printf("Unable to extract user from request context for unknown reason: %v\n", c)
		err := apperrors.NewInternal()
		c.JSON(err.Status(), gin.H{
			"error": err,
		})

		return
	}
	ctx := c.Request.Context()
	cartId := user.(*model.Cart).Id
	productId := req.ProductId
	cart, err := h.CartService.CartIncrementItem(ctx, cartId, productId)
	if err != nil {
		log.Printf("Unable to delete cart: %v", err)
		e := apperrors.NewNotFound("cart", "err")
		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"cart": cart,
	})
}

func (h *Handler) CartDecrementItem(c *gin.Context) {
	type cartReq struct {
		ProductId int64 `json:"product_id" binding:"omitempty,"`
		Quantity  int64 `json:"quantity" binding:"omitempty,"`
	}
	var req cartReq
	user, exists := c.Get("user")
	if !exists {
		log.Printf("Unable to extract user from request context for unknown reason: %v\n", c)
		err := apperrors.NewInternal()
		c.JSON(err.Status(), gin.H{
			"error": err,
		})

		return
	}
	ctx := c.Request.Context()
	cartId := user.(*model.Cart).Id
	productId := req.ProductId
	cart, err := h.CartService.CartIncrementItem(ctx, cartId, productId)
	if err != nil {
		log.Printf("Unable to delete cart: %v", err)
		e := apperrors.NewNotFound("cart", "err")
		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"cart": cart,
	})
}

// user := &model.User{
// 	UserId: userID,
// }
// cart1 := &model.Cart{
// 	Id:     1,
// 	UserId: user.UserId,
// }
// fmt.Println(cart1)
// cart_item1 := &model.CartItem{
// 	Id:        11,
// 	CartId:    1,
// 	ProductId: 5,
// 	Quantity:  4,
// }
// cart_item2 := &model.CartItem{
// 	Id:        15,
// 	CartId:    1,
// 	ProductId: 14,
// 	Quantity:  1,
// }
// cart_items := []*model.CartItem{cart_item1, cart_item2}

// fmt.Println(cart_items)

	// var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
