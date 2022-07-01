package handler

import (
	"backend/model"
	"backend/model/apperrors"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (h *Handler) ReviewCreate(c *gin.Context) {
	ctx := c.Request.Context()
	id := c.Param("id")
	productId, _ := strconv.ParseInt(id, 0, 64)
	var json model.ProductReview
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
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
	review := model.ProductReview{
		UserID:    uid,
		ProductID: productId,
		Rating:    json.Rating,
		Title:     json.Title,
		Comment:   json.Comment,
	}
	result, err := h.ReviewService.ReviewCreate(ctx, &review)
	if err != nil {
		log.Printf("Unable to find reviews: %v", err)
		e := apperrors.NewNotFound("reviews", "err")
		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": result,
	})
}
func (h *Handler) ReviewGet(c *gin.Context) {
	ctx := c.Request.Context()
	pid := c.Param("id")
	rid := c.Param("rid")
	product_id, _ := strconv.ParseInt(pid, 0, 64)
	review_id, _ := strconv.ParseInt(rid, 0, 64)
	result, err := h.ReviewService.Get(ctx, product_id, review_id)
	if err != nil {
		log.Printf("Unable to find reviews: %v", err)
		e := apperrors.NewNotFound("reviews", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": result,
	})
}
func (h *Handler) ReviewGetAll(c *gin.Context) {
	ctx := c.Request.Context()
	pid := c.Param("id")
	product_id, _ := strconv.ParseInt(pid, 0, 64)
	result, err := h.ReviewService.GetAll(ctx, product_id)
	if err != nil {
		log.Printf("Unable to find reviews: %v", err)
		e := apperrors.NewNotFound("reviews", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": result,
	})
}
func (h *Handler) ReviewUpdate(c *gin.Context) {
	ctx := c.Request.Context()
	pid := c.Param("id")
	rid := c.Param("rid")
	product_id, _ := strconv.ParseInt(pid, 0, 64)
	review_id, _ := strconv.ParseInt(rid, 0, 64)
	review := model.ProductReview{}
	result, err := h.ReviewService.Update(ctx, product_id, review_id, &review)
	if err != nil {
		log.Printf("Unable to find reviews: %v", err)
		e := apperrors.NewNotFound("reviews", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": result,
	})

}
func (h *Handler) ReviewDelete(c *gin.Context) {
	ctx := c.Request.Context()
	pid := c.Param("id")
	rid := c.Param("rid")
	product_id, _ := strconv.ParseInt(pid, 0, 64)
	review_id, _ := strconv.ParseInt(rid, 0, 64)
	result, err := h.ReviewService.Delete(ctx, product_id, review_id)
	if err != nil {
		log.Printf("Unable to find reviews: %v", err)
		e := apperrors.NewNotFound("reviews", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": result,
	})
}
func (h *Handler) ReviewBulkDelete(c *gin.Context) {
	ctx := c.Request.Context()
	pid := c.Param("id")
	product_id, _ := strconv.ParseInt(pid, 0, 64)
	ids := []int{1, 2, 3}
	result, err := h.ReviewService.BulkDelete(ctx, product_id, ids)
	if err != nil {
		log.Printf("Unable to find reviews: %v", err)
		e := apperrors.NewNotFound("reviews", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": result,
	})
}

func (h *Handler) ReviewCount(c *gin.Context) {
	ctx := c.Request.Context()
	pid := c.Param("id")
	productId, _ := strconv.ParseInt(pid, 0, 64)
	result, err := h.ReviewService.Count(ctx, productId)
	count := strconv.Itoa(result)
	reviews := "reviews count " + count

	if err != nil {
		log.Printf("Unable to find reviews: %v", err)
		e := apperrors.NewNotFound("reviews", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": reviews,
	})
}
