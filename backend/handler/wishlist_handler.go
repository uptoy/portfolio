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
	uid := user.(*model.User).UserId
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
	user, exists := c.Get("user")
	if !exists {
		log.Printf("Unable to extract user from request context for unknown reason: %v\n", c)
		err := apperrors.NewInternal()
		c.JSON(err.Status(), gin.H{
			"error": err,
		})

		return
	}
	uid := user.(*model.User).UserId
	pid := int64(1)
	ctx := c.Request.Context()
	w, err := h.WishlistService.WishlistCreate(ctx, uid, pid)
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
	user, exists := c.Get("user")
	if !exists {
		log.Printf("Unable to extract user from request context for unknown reason: %v\n", c)
		err := apperrors.NewInternal()
		c.JSON(err.Status(), gin.H{
			"error": err,
		})
		return
	}
	uid := user.(*model.User).UserId
	pid := int64(1)
	ctx := c.Request.Context()
	w, err := h.WishlistService.WishlistDelete(ctx, uid, pid)
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
	uid := user.(*model.User).UserId
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
