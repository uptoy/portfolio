package handler

import (
	"backend/model"
	"fmt"
	"log"
	"strconv"
	"backend/model/apperrors"
	"net/http"
	"github.com/gin-gonic/gin"
)

func (h *Handler) ReviewList(c *gin.Context) {
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
	productId := int64(1)
	result, err := h.ReviewService.ReviewList(ctx, productId, userId)
	if err != nil {
		log.Printf("Unable to find reviews: %v", err)
		e := apperrors.NewNotFound("reviews", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"jsons": result,
	})
}

func (h *Handler) ReviewCreate(c *gin.Context) {
	var json model.Review
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
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
	review := &model.Review{
		Title:   json.Title,
		Comment: json.Comment,
		Rating:  json.Rating,
	}
	result, _ := h.ReviewService.ReviewCreate(ctx, userId, review)

	c.JSON(http.StatusOK, gin.H{
		"review": result,
	})
}

func (h *Handler) ReviewUpdate(c *gin.Context) {
	ctx := c.Request.Context()
	var json model.Review
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	id := c.Param("id")
	reviewId, err := strconv.ParseInt(id, 0, 64)
	if err != nil {
		log.Fatal("err", err)
		fmt.Println("err", err)
		return
	}
	review := &model.Review{
		Title:   json.Title,
		Comment: json.Comment,
		Rating:  json.Rating,
	}
	result, err := h.ReviewService.ReviewUpdate(ctx, reviewId, review)
	if err != nil {
		log.Printf("Unable to update review: %v", err)
		e := apperrors.NewNotFound("review", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"review": result,
	})
}

func (h *Handler) ReviewDelete(c *gin.Context) {
	ctx := c.Request.Context()
	id := c.Param("id")
	reviewId, err := strconv.ParseInt(id, 0, 64)
	if err != nil {
		log.Fatal("err", err)
		fmt.Println("err", err)
		return
	}
	result, err := h.ReviewService.ReviewDelete(ctx, reviewId)
	if err != nil {
		log.Printf("Unable to delete review: %v", err)
		e := apperrors.NewNotFound("review", "err")
		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"review": result,
	})
}
