package handler

import (
	"backend/model"
	"fmt"
	"log"
	"strconv"

	"backend/model/apperrors"
	"net/http"
	// // "fmt"

	"github.com/gin-gonic/gin"
)

func (h *Handler) ReviewList(c *gin.Context) {
	ctx := c.Request.Context()
	p, err := h.ReviewService.ReviewList(ctx)
	if err != nil {
		log.Printf("Unable to find reviews: %v", err)
		e := apperrors.NewNotFound("reviews", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"jsons": p,
	})
}

func (h *Handler) ReviewCreate(c *gin.Context) {
	var json model.Review
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	json = model.Review{
	}
	ctx := c.Request.Context()
	p, _ := h.ReviewService.ReviewCreate(ctx, &json)

	c.JSON(http.StatusOK, gin.H{
		"review": p,
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
	uid, err := strconv.ParseInt(id, 0, 64)
	if err != nil {
		log.Fatal("err", err)
		fmt.Println("err", err)
		return
	}
	p1 := &model.Review{
	}
	p, err := h.ReviewService.ReviewUpdate(ctx, uid, p1)
	if err != nil {
		log.Printf("Unable to update review: %v", err)
		e := apperrors.NewNotFound("review", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"review": p,
	})
}

func (h *Handler) ReviewDelete(c *gin.Context) {
	ctx := c.Request.Context()
	id := c.Param("id")
	uid, err := strconv.ParseInt(id, 0, 64)
	if err != nil {
		log.Fatal("err", err)
		fmt.Println("err", err)
		return
	}
	p, err := h.ReviewService.ReviewDelete(ctx, uid)
	if err != nil {
		log.Printf("Unable to delete review: %v", err)
		e := apperrors.NewNotFound("review", "err")
		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"review": p,
	})
}
