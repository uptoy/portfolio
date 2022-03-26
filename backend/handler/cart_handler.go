package handler

import (
	"backend/model"
	"fmt"
	"github.com/google/uuid"
	"log"

	"backend/model/apperrors"
	"net/http"
	// // "fmt"

	"github.com/gin-gonic/gin"
)

func (h *Handler) CartList(c *gin.Context) {
	ctx := c.Request.Context()
	userID, err := uuid.NewRandom()
	if err != nil {
		log.Printf("Unable to create uuid: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	cart, err := h.CartService.CartList(ctx, userID)
	if err != nil {
		log.Printf("Unable to find cart: %v", err)
		e := apperrors.NewNotFound("cart", "err")
		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"jsons": cart,
	})
}

func (h *Handler) CartCreate(c *gin.Context) {
	var json model.Cart
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	userID, err := uuid.NewRandom()
	if err != nil {
		log.Printf("Unable to create uuid: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	product_name1 := int64(1)
	quantity1 := int64(1)
	json = model.Cart{}
	ctx := c.Request.Context()
	cart, err := h.CartService.CartAdd(ctx, userID, product_name1, quantity1)
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

func (h *Handler) CartRemove(c *gin.Context) {
	// var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	ctx := c.Request.Context()
	userID, err := uuid.NewRandom()
	if err != nil {
		log.Fatal("err", err)
		fmt.Println("err", err)
		return
	}
	product_name1 := int64(1)
	quantity1 := int64(1)
	cart, err := h.CartService.CartRemove(ctx, userID, product_name1, quantity1)
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
