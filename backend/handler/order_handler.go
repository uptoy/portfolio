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
	userId := user.(*model.User).UserId
	p, err := h.OrderService.OrderList(ctx, userId)
	if err != nil {
		log.Printf("Unable to find products: %v", err)
		e := apperrors.NewNotFound("products", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"jsons": p,
	})
}
func (h *Handler) OrderCreate(c *gin.Context) {
	var json model.Product
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	json = model.Product{
		ProductName:   json.ProductName,
		Slug:          json.Slug,
		ProductImage:  json.ProductImage,
		Brand:         json.Brand,
		Price:         json.Price,
		CategoryName:  json.CategoryName,
		CountInStock:  json.CountInStock,
		Description:   json.Description,
		AverageRating: json.AverageRating,
	}
	ctx := c.Request.Context()
	p, _ := h.ProductService.ProductCreate(ctx, &json)

	c.JSON(http.StatusOK, gin.H{
		"product": p,
	})
}

func (h *Handler) OrderFindByID(c *gin.Context) {
	id := c.Param("id")
	uid, _ := strconv.ParseInt(id, 0, 64)
	ctx := c.Request.Context()
	result, err := h.ProductService.ProductFindByID(ctx, uid)
	if err != nil {
		log.Fatal("err", err)
		fmt.Println("err", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"product": result,
	})
}
