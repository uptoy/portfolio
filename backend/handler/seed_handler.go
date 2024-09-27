package handler

import (
	"backend/model"
	"backend/utils"
	"fmt"

	"backend/model/apperrors"
	"log"
	"math/rand"
	"time"

	"backend/utils"
	"math/rand"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func (h *Handler) SeedCategory(c *gin.Context) {
	ctx := c.Request.Context()
	// categoryList := []string{"potato", "carrots", "green pepper", "asparagus", "avocado", "kidney bean", "boiled soybean"}
	categoryNameList := []string{"Food", "Health", "Fashion", "Shoes", "Hobby", "Sports", "Book", "Electronics", "Beauty"}
	categories := make([]model.Category, 0)
	for _, category_name := range categoryNameList {
		category := model.Category{
			CategoryName: category_name,
		}
		category.PreSave()
		categories = append(categories, category)
	}
	result1, _ := h.CategoryService.BulkInsert(ctx, categories)
	c.JSON(http.StatusOK, gin.H{
		"data": result1,
	})
}

func (h *Handler) SeedProduct(c *gin.Context) {
	ctx := c.Request.Context()
	// product1 := "potato"
	product := model.Product{
		ProductName:  "Potato",
		Slug:         "potato",
		Brand:        "Make-in",
		Price:        int64(100),
		CategoryId:   int64(1),
		CountInStock: int64(100),
		Description:  "This potato is very delicious",
	}
	// product1 := "Carrots"
	product1 := model.Product{
		ProductName:  "Carrots",
		Slug:         "carrots",
		Brand:        "Fukaura",
		Price:        int64(200),
		CategoryId:   int64(1),
		CountInStock: int64(80),
		Description:  "This carrots is very delicious",
	}
	productList := []model.Product{product, product1}
	result1, _ := h.ProductService.BulkInsert(ctx, productList)
	c.JSON(http.StatusOK, gin.H{
		"data": result1,
	})
}

func (h *Handler) SeedProductImage(c *gin.Context) {
	ctx := c.Request.Context()
	//ポテト
	productImageUrlList1 := []string{
		"https://res.cloudinary.com/yutainoue/image/upload/v1650431002/portfolio/potato5_ibyib0.jpg",
		"https://res.cloudinary.com/yutainoue/image/upload/v1650431002/portfolio/potato4_d0ckzf.jpg",
		"https://res.cloudinary.com/yutainoue/image/upload/v1650431002/portfolio/potato3_gehj9a.jpg",
		"https://res.cloudinary.com/yutainoue/image/upload/v1650431002/portfolio/potato1_yonn2d.jpg",
		"https://res.cloudinary.com/yutainoue/image/upload/v1650431002/portfolio/potato2_hdznp1.jpg",
		"https://res.cloudinary.com/yutainoue/image/upload/v1650431002/portfolio/potato_dm4vc5.jpg",
	}
	productId := 1
	images1 := make([]*model.ProductImage, 0)
	for _, url := range productImageUrlList1 {
		// fmt.Print("url", url)
		images1 = append(images1, &model.ProductImage{
			ProductId: int64(productId),
			URL:       url,
		})
	}
	err := h.ProductService.ImageBulkInsert(ctx, images1)
	if err != nil {
		log.Fatal(err)
	}
	//にんじん
	productImageUrlList2 := []string{
		"https://res.cloudinary.com/yutainoue/image/upload/v1650434876/portfolio/carrots4_gjkh85.jpg",
		"https://res.cloudinary.com/yutainoue/image/upload/v1650434876/portfolio/carrots_ekrgwv.jpg",
		"https://res.cloudinary.com/yutainoue/image/upload/v1650434876/portfolio/carrots5_sgjg5q.jpg",
		"https://res.cloudinary.com/yutainoue/image/upload/v1650434876/portfolio/carrots1_ydxe3e.jpg",
		"https://res.cloudinary.com/yutainoue/image/upload/v1650434876/portfolio/carrots3_ek9avv.jpg",
		"https://res.cloudinary.com/yutainoue/image/upload/v1650434876/portfolio/carrots2_kcgdgz.jpg",
	}
	productId2 := 2
	images2 := make([]*model.ProductImage, 0)
	for _, url := range productImageUrlList2 {
		// fmt.Print("url", url)
		images2 = append(images1, &model.ProductImage{
			ProductId: int64(productId2),
			URL:       url,
		})
	}
	err2 := h.ProductService.ImageBulkInsert(ctx, images2)
	if err != nil {
		log.Fatal(err2)
	}
}

func (h *Handler) SeedReview(c *gin.Context) {
	ctx := c.Request.Context()
	randText := utils.RandStringRunes(10)
	randName := randText + "username"
	randEmail := randText + "@email.com"
	u := model.User{
		Username: randName,
		Email:    randEmail,
		Password: "password",
	}
	user, err := h.UserService.Signup(ctx, &u)
	if err != nil {
		log.Printf("Failed to create tuser: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	u1 := model.User{
		Username: user.Username,
		Email:    user.Email,
		Password: "password",
	}
	fmt.Println(u)
	user1, err1 := h.UserService.Signin(ctx, &u1)
	if err1 != nil {
		log.Printf("Failed to create tokens for user: %v\n", err.Error())

		c.JSON(apperrors.Status(err1), gin.H{
			"error": err,
		})
		return
	}
	uuid := user1.UID
	rand.Seed(time.Now().UnixNano())
	rating := int64(rand.Intn(5) + 1)
	productId := int64(rand.Intn(2) + 1)
	// // // productId := int64(rand.Intn(2) + 1)
	review := model.ProductReview{
		UserID:    uuid,
		ProductID: productId,
		Rating:    rating,
		Title:     "Delicious",
		Comment:   "It was very delicious.I could eat what you disliked.",
	}
	fmt.Println("review")
	result2, _ := h.ReviewService.ReviewCreate(ctx, &review)

	c.JSON(http.StatusAccepted, gin.H{
		"ok": result2,
	})
}

func (h *Handler) SeedWishlist(c *gin.Context) {
	ctx := c.Request.Context()
	randText := utils.RandStringRunes(10)
	randName := randText + "username"
	randEmail := randText + "@email.com"
	u := model.User{
		Username: randName,
		Email:    randEmail,
		Password: "password",
	}
	user, err := h.UserService.Signup(ctx, &u)
	if err != nil {
		log.Printf("Failed to create tuser: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	u1 := model.User{
		Username: user.Username,
		Email:    user.Email,
		Password: "password",
	}
	fmt.Println(u)
	user1, err1 := h.UserService.Signin(ctx, &u1)
	if err1 != nil {
		log.Printf("Failed to create tokens for user: %v\n", err.Error())

		c.JSON(apperrors.Status(err1), gin.H{
			"error": err,
		})
		return
	}
	uuid := user1.UID
	rand.Seed(time.Now().UnixNano())
	productId := int64(rand.Intn(2) + 1)
	result2, _ := h.WishlistService.WishlistCreate(ctx, uuid, productId)
	c.JSON(http.StatusAccepted, gin.H{
		"ok": result2,
	})
}

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
	userId := user.(*model.User).UID
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
		"data": result,
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
	userId := user.(*model.User).UID
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
