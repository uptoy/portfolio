package handler

import (
	"backend/model"
	"backend/model/apperrors"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func (h *Handler) WishlistGet(c *gin.Context) {
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
	ctx := c.Request.Context()
	w, err := h.WishlistService.WishlistGet(ctx, uid)
	if err != nil {
		log.Printf("Unable to find wishlist: %v", err)
		e := apperrors.NewNotFound("wishlist", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"jsons": w,
	})
}
func (h *Handler) WishlistCreate(c *gin.Context) {
	var json model.Product
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	json = model.Product{
		ProductId:     json.ProductId,
		ProductName:   json.ProductName,
		Slug:          json.Slug,
		ProductImage:  json.ProductImage,
		Brand:         json.Brand,
		Price:         json.Price,
		CategoryId:    json.CategoryId,
		CountInStock:  json.CountInStock,
		Description:   json.Description,
		AverageRating: json.AverageRating,
	}
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
	productId := json.ProductId
	ctx := c.Request.Context()
	w, err := h.WishlistService.WishlistCreate(ctx, uid, productId)
	if err != nil {
		log.Printf("Unable to find wishlist: %v", err)
		e := apperrors.NewNotFound("wishlist", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"jsons": w,
	})
}
func (h *Handler) WishlistDelete(c *gin.Context) {
	type wishlistReq struct {
		ProductId int64 `json:"product_id" binding:"omitempty,"`
	}
	var req wishlistReq
	productId := req.ProductId
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
	ctx := c.Request.Context()
	w, err := h.WishlistService.WishlistDelete(ctx, uid, productId)
	if err != nil {
		log.Printf("Unable to find wishlist: %v", err)
		e := apperrors.NewNotFound("wishlist", "err")
		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"jsons": w,
	})
}
func (h *Handler) WishlistClear(c *gin.Context) {
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
	ctx := c.Request.Context()
	err := h.WishlistService.WishlistClear(ctx, uid)
	if err != nil {
		log.Printf("Unable to find wishlist: %v", err)
		e := apperrors.NewNotFound("wishlist", "err")
		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"jsons": "OK",
	})
}
