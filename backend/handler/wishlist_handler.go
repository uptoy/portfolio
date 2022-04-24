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
	wishlist, err := h.WishlistService.WishlistGet(ctx, uid)
	fmt.Println("wishlist", wishlist)
	if err != nil {
		log.Printf("Unable to find wishlist: %v", err)
		e := apperrors.NewNotFound("wishlist", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": wishlist,
	})
}

// func (h *Handler) WishlistAddItem(c *gin.Context) {
// 	var json model.Product
// 	if err := c.ShouldBindJSON(&json); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	json = model.Product{
// 		Id:           json.Id,
// 		ProductName:  json.ProductName,
// 		Slug:         json.Slug,
// 		Brand:        json.Brand,
// 		Price:        json.Price,
// 		CategoryId:   json.CategoryId,
// 		CountInStock: json.CountInStock,
// 		Description:  json.Description,
// 	}
// 	user, exists := c.Get("user")
// 	if !exists {
// 		log.Printf("Unable to extract user from request context for unknown reason: %v\n", c)
// 		err := apperrors.NewInternal()
// 		c.JSON(err.Status(), gin.H{
// 			"error": err,
// 		})

// 		return
// 	}
// 	uid := user.(*model.User).UID
// 	productId := json.Id
// 	ctx := c.Request.Context()
// 	w, err := h.WishlistService.WishlistAddItem(ctx, uid, productId)
// 	if err != nil {
// 		log.Printf("Unable to find wishlist: %v", err)
// 		e := apperrors.NewNotFound("wishlist", "err")

// 		c.JSON(e.Status(), gin.H{
// 			"error": e,
// 		})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{
// 		"data": w,
// 	})
// }
// func (h *Handler) WishlistDeleteItem(c *gin.Context) {
// 	type wishlistReq struct {
// 		ProductId int64 `json:"product_id" binding:"omitempty,"`
// 	}
// 	var req wishlistReq
// 	productId := req.ProductId
// 	user, exists := c.Get("user")
// 	if !exists {
// 		log.Printf("Unable to extract user from request context for unknown reason: %v\n", c)
// 		err := apperrors.NewInternal()
// 		c.JSON(err.Status(), gin.H{
// 			"error": err,
// 		})
// 		return
// 	}
// 	uid := user.(*model.User).UID
// 	ctx := c.Request.Context()
// 	w, err := h.WishlistService.WishlistDeleteItem(ctx, uid, productId)
// 	if err != nil {
// 		log.Printf("Unable to find wishlist: %v", err)
// 		e := apperrors.NewNotFound("wishlist", "err")
// 		c.JSON(e.Status(), gin.H{
// 			"error": e,
// 		})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{
// 		"data": w,
// 	})
// }
// func (h *Handler) WishlistClear(c *gin.Context) {
// 	user, exists := c.Get("user")
// 	if !exists {
// 		log.Printf("Unable to extract user from request context for unknown reason: %v\n", c)
// 		err := apperrors.NewInternal()
// 		c.JSON(err.Status(), gin.H{
// 			"error": err,
// 		})
// 		return
// 	}
// 	uid := user.(*model.User).UID
// 	ctx := c.Request.Context()
// 	err := h.WishlistService.WishlistClear(ctx, uid)
// 	if err != nil {
// 		log.Printf("Unable to find wishlist: %v", err)
// 		e := apperrors.NewNotFound("wishlist", "err")
// 		c.JSON(e.Status(), gin.H{
// 			"error": e,
// 		})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{
// 		"data": "OK",
// 	})
// }

func (h *Handler) WishlistCreate(c *gin.Context) {
	fmt.Println("Handler WishlistCreate")

	var json model.Product
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	productId := json.Id
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
	wishlist, err := h.WishlistService.WishlistCreate(ctx, uid, productId)
	if err != nil {
		log.Printf("Unable to find wishlist: %v", err)
		e := apperrors.NewNotFound("wishlist", "err")
		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": wishlist,
	})
}

// wishlist.POST("/create", middleware.AuthUser(h.TokenService), h.WishlistCreate)
// wishlist.GET("", middleware.AuthUser(h.TokenService), h.WishlistGet)
// wishlist.DELETE("/:id", middleware.AuthUser(h.TokenService), h.WishlistDelete)
func (h *Handler) WishlistDelete(c *gin.Context) {
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
	productId, _ := strconv.ParseInt(c.Param("id"), 0, 64)
	ctx := c.Request.Context()
	wishlist, err := h.WishlistService.WishlistDelete(ctx, uid, productId)
	if err != nil {
		log.Printf("Unable to find wishlist: %v", err)
		e := apperrors.NewNotFound("wishlist", "err")
		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": wishlist,
	})
}
