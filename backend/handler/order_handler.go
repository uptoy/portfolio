package handler

import (
	"backend/model"
	"backend/model/apperrors"
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"strconv"
)

func (h *Handler) OrderList(c *gin.Context) {
	ctx := c.Request.Context()
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
	orders, err := h.OrderService.OrderList(ctx, userId)
	if err != nil {
		log.Printf("Unable to find products: %v", err)
		e := apperrors.NewNotFound("products", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"orders": orders,
	})
}
func (h *Handler) OrderCreate(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		log.Printf("Unable to extract user from request context for unknown reason: %v\n", c)
		err := apperrors.NewInternal()
		c.JSON(err.Status(), gin.H{
			"error": err,
		})

		return
	}
	uid := user.(*model.User).UID
	var json model.OrderRequestData
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	json = model.OrderRequestData{
		Items:                     json.Items,
		ShippingAddress:           json.ShippingAddress,
		SaveAddress:               json.SaveAddress,
		UseExistingBillingAddress: json.UseExistingBillingAddress,
		ShippingAddressID:         json.ShippingAddressID,
		SameShippingAsBilling:     json.SameShippingAsBilling,
	}
	ctx := c.Request.Context()
	order, _ := h.OrderService.OrderCreate(ctx, uid, &json)

	c.JSON(http.StatusOK, gin.H{
		"order": order,
	})
}

func (h *Handler) OrderFindByID(c *gin.Context) {
	id := c.Param("id")
	orderId, err := strconv.ParseInt(id, 0, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"order id": "Could not parse int orderId",
		})
	}
	ctx := c.Request.Context()
	result, err := h.OrderService.OrderFindByID(ctx, orderId)
	if err != nil {
		log.Fatal("err", err)
		fmt.Println("err", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"order": result,
	})
}

func (h *Handler) OrderGetDetails(c *gin.Context) {
	id := c.Param("id")
	orderId, err := strconv.ParseInt(id, 0, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"order id": "Could not parse int orderId",
		})
	}
	ctx := c.Request.Context()
	result, err := h.OrderService.OrderGetDetails(ctx, orderId)
	if err != nil {
		log.Fatal("err", err)
		fmt.Println("err", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"order": result,
	})
}

func (h *Handler) OrderCount(c *gin.Context) {
	ctx := c.Request.Context()
	result, err := h.OrderService.OrderCount(ctx)
	if err != nil {
		log.Fatal("err", err)
		fmt.Println("err", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"order_count": result,
	})
}
