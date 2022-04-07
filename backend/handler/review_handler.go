package handler

import (
	"backend/model"
	"backend/model/apperrors"
	// "fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func (h *Handler) ReviewBulkInsert(c *gin.Context) {
	ctx := c.Request.Context()
	reviews := []model.ProductReview{}
	result, err := h.ReviewService.ReviewBulkInsert(ctx, reviews)
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
	var json model.ProductReview
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	review := model.ProductReview{
		UserID:    json.UserID,
		ProductID: json.ProductID,
		Rating:    json.Rating,
		Title:     json.Title,
		Comment:   json.Title,
	}
	ctx := c.Request.Context()
	id := c.Param("id")
	product_id, _ := strconv.ParseInt(id, 0, 64)
	result, err := h.ReviewService.ReviewCreate(ctx, product_id, &review)
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
		"jsons": result,
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
		"jsons": result,
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
		"jsons": result,
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
		"jsons": result,
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
		"jsons": result,
	})
}

func (h *Handler) ConfirmInsertReview(c *gin.Context) {
	product := model.Product{
		ProductId:     1,
		ProductName:   "product_name",
		Slug:          "slug",
		ProductImage:  "product_image",
		Brand:         "brand",
		Price:         1,
		CategoryId:    1,
		CountInStock:  1,
		Description:   "desc",
		AverageRating: 1,
	}
	ctx := c.Request.Context()
	result, _ := h.ProductService.ProductCreate(ctx, &product)
	category_id := product.CategoryId

	category := model.Category{
		ID:           category_id,
		CategoryName: "category_name1",
	}
	// result1, _ := h.CategoryService.CategoryCreate(ctx, &category)

	product_id := product.ProductId
	uid, _ := uuid.NewRandom()
	review := model.ProductReview{
		ID:        1,
		UserID:    uid,
		ProductID: product_id,
		Rating:    1,
		Title:     "title1",
		Comment:   "comment1",
	}
	// id := c.Param("id")
	// product_id, _ := strconv.ParseInt(id, 0, 64)
	// result2, _ := h.ReviewService.ReviewCreate(ctx, product_id, &review)
	// fmt.Println("product", result)
	// fmt.Println("category", result1)
	// fmt.Println("review", result2)
	// "product":  result,
	// "category": result1,
	// "review":   result2,
	c.JSON(http.StatusOK, gin.H{
		"product":  result,
		"category": category,
		"review":   review,
	})

}

// func (h *Handler) ReviewList(c *gin.Context) {
// 	ctx := c.Request.Context()
// 	user, exists := c.Get("user")
// 	if !exists {
// 		log.Printf("Unable to extract user from request context for unknown reason: %v\n", c)
// 		err := apperrors.NewInternal()
// 		c.JSON(err.Status(), gin.H{
// 			"error": err,
// 		})
// 		return
// 	}
// 	userId := user.(*model.User).UID
// 	productId := int64(1)
// 	result, err := h.ReviewService.ReviewList(ctx, productId, userId)
// 	if err != nil {
// 		log.Printf("Unable to find reviews: %v", err)
// 		e := apperrors.NewNotFound("reviews", "err")

// 		c.JSON(e.Status(), gin.H{
// 			"error": e,
// 		})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{
// 		"jsons": result,
// 	})
// }

// func (h *Handler) ReviewCreate(c *gin.Context) {
// 	var json model.Review
// 	if err := c.ShouldBindJSON(&json); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	ctx := c.Request.Context()
// 	user, exists := c.Get("user")
// 	if !exists {
// 		log.Printf("Unable to extract user from request context for unknown reason: %v\n", c)
// 		err := apperrors.NewInternal()
// 		c.JSON(err.Status(), gin.H{
// 			"error": err,
// 		})

// 		return
// 	}
// 	userId := user.(*model.User).UID
// 	review := &model.Review{
// 		Title:   json.Title,
// 		Comment: json.Comment,
// 		Rating:  json.Rating,
// 	}
// 	result, _ := h.ReviewService.ReviewCreate(ctx, userId, review)

// 	c.JSON(http.StatusOK, gin.H{
// 		"review": result,
// 	})
// }

// func (h *Handler) ReviewUpdate(c *gin.Context) {
// 	ctx := c.Request.Context()
// 	var json model.Review
// 	if err := c.ShouldBindJSON(&json); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	id := c.Param("id")
// 	reviewId, err := strconv.ParseInt(id, 0, 64)
// 	if err != nil {
// 		log.Fatal("err", err)
// 		fmt.Println("err", err)
// 		return
// 	}
// 	review := &model.Review{
// 		Title:   json.Title,
// 		Comment: json.Comment,
// 		Rating:  json.Rating,
// 	}
// 	result, err := h.ReviewService.ReviewUpdate(ctx, reviewId, review)
// 	if err != nil {
// 		log.Printf("Unable to update review: %v", err)
// 		e := apperrors.NewNotFound("review", "err")

// 		c.JSON(e.Status(), gin.H{
// 			"error": e,
// 		})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{
// 		"review": result,
// 	})
// }

// func (h *Handler) ReviewDelete(c *gin.Context) {
// 	ctx := c.Request.Context()
// 	id := c.Param("id")
// 	reviewId, err := strconv.ParseInt(id, 0, 64)
// 	if err != nil {
// 		log.Fatal("err", err)
// 		fmt.Println("err", err)
// 		return
// 	}
// 	result, err := h.ReviewService.ReviewDelete(ctx, reviewId)
// 	if err != nil {
// 		log.Printf("Unable to delete review: %v", err)
// 		e := apperrors.NewNotFound("review", "err")
// 		c.JSON(e.Status(), gin.H{
// 			"error": e,
// 		})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{
// 		"review": result,
// 	})
// }
