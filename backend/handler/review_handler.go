package handler

import (
	"backend/model"
	"backend/model/apperrors"

	// "fmt"
	"log"
	"net/http"
	"strconv"

	// "fmt"
	// "mime/multipart"

	// "backend/utils"
	// "math/rand"
	// "time"

	"github.com/gin-gonic/gin"
	// "github.com/google/uuid"
	// "github.com/google/uuid"
)

func (h *Handler) ReviewBulkInsert(c *gin.Context) {
	// ctx := c.Request.Context()
	// reviews := []model.ProductReview{}
	// result, err := h.ReviewService.ReviewBulkInsert(ctx, reviews)
	// if err != nil {
	// 	log.Printf("Unable to find reviews: %v", err)
	// 	e := apperrors.NewNotFound("reviews", "err")

	// 	c.JSON(e.Status(), gin.H{
	// 		"error": e,
	// 	})
	// 	return
	// }
	c.JSON(http.StatusOK, gin.H{
		"data": "review",
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

// func (h *Handler) SeedReview(c *gin.Context) {
// 	randText := utils.RandStringRunes()
// 	rand.Seed(time.Now().UnixNano())
// 	// randInt := int64(rand.Intn(100) + 1)
// 	rating := int64(rand.Intn(5) + 1)
// 	// categoryId := int64(rand.Intn(5) + 1)
// 	// uid, _ := uuid.NewRandom()
// 	// productId := int64(rand.Intn(23) + 1)
// 	// productId := int64(25)
// 	ctx := c.Request.Context()

// 	//! User
// 	// u := &model.User{
// 	// 	Name:     randText,
// 	// 	Email:    randText,
// 	// 	Password: "password",
// 	// }
// 	result, _ := h.UserService.FindByEmail(ctx, "JaOHAe5gisomfHsntld0")
// 	userId := result.UID

// 	// result, _ := h.UserService.Signup(ctx, u)
// 	//! Category
// 	// category := &model.Category{
// 	// 	CategoryName: randText,
// 	// }
// 	// result1, _ := h.CategoryService.CategoryCreate(ctx, category)
// 	// fmt.Println(result1)
// 	// categoryId := result1.ID
// 	//! Product
// 	// product := &model.Product{
// 	// 	// Id:            productId,
// 	// 	ProductName:   randText,
// 	// 	Slug:          randText,
// 	// 	Brand:         randText,
// 	// 	Price:         randInt,
// 	// 	CategoryId:    categoryId,
// 	// 	CountInStock:  randInt,
// 	// 	Description:   randText,
// 	// 	AverageRating: rating,
// 	// }
// 	// image := utils.RandImage()
// 	// var files []*multipart.FileHeader
// 	// result2, _ := h.ProductService.ProductCreate(ctx, product, files)
// 	// fmt.Println(result2)
// 	productId := int64(25)
// 	review := &model.ProductReview{
// 		UserID:    userId,
// 		ProductID: productId,
// 		Rating:    rating,
// 		Title:     randText,
// 		Comment:   randText,
// 	}
// 	//! Review
// 	// fmt.Println("review",review)
// 	result3, _ := h.ReviewService.ReviewCreate(ctx, productId, review)
// 	result4, _ := h.ReviewService.GetAll(ctx, productId)
// 	// fmt.Println(result4)
// 	c.JSON(http.StatusOK, gin.H{
// 		"data":  result3,
// 		"data1": result4,
// 	})

// }

// func (h *Handler) ConfirmCreateReviewFlow(c *gin.Context) {
// 	ctx := c.Request.Context()

// 	// uid, _ := uuid.NewRandom()
// 	user := model.User{
// 		// UID:      uid,
// 		Email:    "email@email.com",
// 		Password: "password",
// 	}
// 	err := h.UserService.Signup(ctx, &user)
// 	if err != nil {
// 		log.Printf("Failed to sign up user: %v\n", err.Error())
// 		return
// 	}

// 	err1 := h.UserService.Signin(ctx, &user)
// 	if err1 != nil {
// 		log.Printf("Failed to sign up user: %v\n", err.Error())
// 		return
// 	}
// 	product := model.Product{
// 		Id:     1,
// 		ProductName:   "product_name1",
// 		Slug:          "product_name1",
// 		ProductImage:  "product_image",
// 		Brand:         "brand",
// 		Price:         1,
// 		CategoryId:    1,
// 		CountInStock:  1,
// 		Description:   "desc",
// 		AverageRating: 1,
// 	}
// 	result, _ := h.ProductService.ProductCreate(ctx, &product)
// 	category_id := product.CategoryId

// 	category := model.Category{
// 		ID:           category_id,
// 		CategoryName: "category_name1",
// 	}
// 	result1, _ := h.CategoryService.CategoryCreate(ctx, &category)

// 	user1, _ := c.Get("user")

// 	uuid := user1.(*model.User).UID
// 	fmt.Println("uuid", uuid)

// 	product_id := product.Id
// 	review := model.ProductReview{
// 		ID:        1,
// 		UserID:    user.UID,
// 		ProductID: product_id,
// 		Rating:    1,
// 		Title:     "title1",
// 		Comment:   "comment1",
// 	}
// 	result2, _ := h.ReviewService.ReviewCreate(ctx, product_id, &review)

// 	result3, _ := h.WishlistService.WishlistCreate(ctx, uuid, product_id)

// 	cartId, _ := h.CartService.CartGetId(ctx, uuid)

// 	cartItem := model.CartItem{
// 		CartId:    cartId,
// 		ProductId: product_id,
// 		Quantity:  8,
// 	}
// 	result4, _ := h.CartService.CartAddItem(ctx, &cartItem)
// 	// fmt.Println("product", result)
// 	// fmt.Println("category", result1)
// 	// fmt.Println("review", result2)
// 	c.JSON(http.StatusOK, gin.H{
// 		"user":     user,
// 		"user1":    user1,
// 		"product":  result,
// 		"category": result1,
// 		"review":   result2,
// 		"wishlist": result3,
// 		"cartadd":     result4,
// 	})
// }

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
// 		"data": result,
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
