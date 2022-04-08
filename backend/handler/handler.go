package handler

import (
	// "log"
	"net/http"
	"time"

	"backend/handler/middleware"
	"backend/model"
	"backend/model/apperrors"
	"github.com/gin-gonic/gin"
	// "strconv"
)

// Handler struct holds required services for handler to function
type Handler struct {
	AddressService  model.AddressService
	AuthService     model.AuthService
	CartService     model.CartService
	CategoryService model.CategoryService
	OrderService    model.OrderService
	PaymentService  model.PaymentService
	ProductService  model.ProductService
	ReviewService   model.ReviewService
	TokenService    model.TokenService
	UserService     model.UserService
	WishlistService model.WishlistService

	MaxBodyBytes int64
}

// Config will hold services that will eventually be injected into this
// handler layer on handler initialization
type Config struct {
	R               *gin.Engine
	AddressService  model.AddressService
	AuthService     model.AuthService
	CartService     model.CartService
	CategoryService model.CategoryService
	OrderService    model.OrderService
	PaymentService  model.PaymentService
	ProductService  model.ProductService
	ReviewService   model.ReviewService
	TokenService    model.TokenService
	UserService     model.UserService
	WishlistService model.WishlistService

	BaseURL         string
	TimeoutDuration time.Duration
	MaxBodyBytes    int64
}

// NewHandler initializes the handler with required injected services along with http routes
// Does not return as it deals directly with a reference to the gin Engine
func NewHandler(c *Config) {
	// Create a handler (which will later have injected services)
	h := &Handler{
		AddressService:  c.AddressService,
		AuthService:     c.AuthService,
		CartService:     c.CartService,
		CategoryService: c.CategoryService,
		OrderService:    c.OrderService,
		PaymentService:  c.PaymentService,
		ProductService:  c.ProductService,
		ReviewService:   c.ReviewService,
		TokenService:    c.TokenService,
		UserService:     c.UserService,
		WishlistService: c.WishlistService,

		MaxBodyBytes: c.MaxBodyBytes,
	} // currently has no properties

	// Create an account group
	api := c.R.Group(c.BaseURL)

	if gin.Mode() != gin.TestMode {
		//auth
		api.Use(middleware.Timeout(c.TimeoutDuration, apperrors.NewServiceUnavailable()))
		api.GET("/me", middleware.AuthUser(h.TokenService), h.Me)
		api.POST("/signout", middleware.AuthUser(h.TokenService), h.Signout)
		api.PUT("/details", middleware.AuthUser(h.TokenService), h.Details)
	} else {
		//こちらがテスト実行される
		api.GET("/me", h.Me)
		api.POST("/signout", h.Signout)
		api.PUT("/details", h.Details)
		// api.POST("/forgot", h.ForgotPassword)
	}
	//こちらがテスト実行される
	api.POST("/signup", h.Signup)
	api.POST("/signin", h.Signin)
	api.POST("/tokens", h.Tokens)
	api.POST("/forgot", h.ForgotPassword)
	api.POST("/reset", h.ResetPassword)
	products := api.Group("/products")
	{
		products.GET("", h.ProductList)
		products.POST("", h.ProductCreate)
		products.GET("/:id", h.ProductFindByID)
		products.PUT("/:id", h.ProductUpdate)
		products.DELETE("/:id", h.ProductDelete)
		products.DELETE("/delete", h.ProductBulkDelete)
		products.POST("/insert", h.ProductBulkInsert)
		products.GET("/count", h.ProductCount)

		products.GET("/search/:name", h.ProductFindByName)
		products.GET("/:id/reviews/insert", h.ReviewBulkInsert)
		products.DELETE("/:id/reviews/delete", h.ReviewBulkDelete)
		products.POST("/:id/reviews", h.ReviewCreate)
		products.GET("/:id/reviews", h.ReviewGetAll)
		products.GET("/:id/reviews/:rid", h.ReviewGet)
		products.PUT("/:id/reviews/:rid", h.ReviewUpdate)
		products.DELETE("/:id/reviews/:rid", h.ReviewDelete)
		products.POST("/confirm", h.ConfirmCreateReviewFlow)
		// products.GET("/:id/reviews", h.ReviewList)
		// products.POST("/:id/reviews", h.ReviewCreate)
		// products.PUT("/:id/reviews", h.ReviewUpdate)
		// products.DELETE("/:id/reviews", h.ReviewUpdate)
	}
	categories := api.Group("/categories")
	{
		categories.GET("", h.CategoryList)
		categories.POST("", h.CategoryCreate)
		categories.GET("/:id", h.CategoryFindByID)
		categories.PUT("/:id", h.CategoryUpdate)
		categories.DELETE("/:id", h.CategoryDelete)
		categories.GET("/search/:name", h.CategoryFindByName)
		categories.DELETE("/delete", h.CategoryBulkDelete)
		categories.POST("/insert", h.CategoryBulkInsert)
		categories.GET("/count", h.CategoryCount)
	}
	sample := api.Group("/sample")
	{
		sample.GET("", h.SampleGetList)
		sample.POST("", h.SamplePost)
		sample.GET("/:id", h.SampleGetFindByID)
		sample.PUT("/:id", h.SampleUpdate)
		sample.DELETE("/:id", h.SampleDelete)
		sample.GET("/search/:name", h.SampleGetFindByName)
	}
	auth := api.Group("/auth")
	{
		auth.GET("/me", middleware.AuthUser(h.TokenService), h.Me)
		auth.POST("/signup", h.Signup)
		auth.POST("/signin", h.Signin)
		auth.POST("/signout", h.Signout)
		auth.POST("/tokens", h.Tokens)
		auth.POST("/forgot_password", h.Sample)
		auth.POST("/reset_password", h.Sample)
	}
	wishlist := api.Group("/wishlist")
	{
		wishlist.GET("", h.WishlistGet)
		wishlist.POST("", h.WishlistCreate)
		wishlist.DELETE("/:product_id", h.WishlistDelete)
		wishlist.DELETE("/clear", h.WishlistClear)
	}
	cart := api.Group("/cart")
	{
		cart.GET("", h.CartGet)
		cart.POST("/add", h.CartAddItem)
		cart.DELETE("/:id", h.CartDeleteItem)
		cart.PUT("/inc", h.CartIncrementItem)
		cart.PUT("/dec", h.CartDecrementItem)
	}
	api.POST("/payment", h.Payment)
	order := api.Group("/orders")
	{
		order.POST("/create", h.OrderCreate)
		order.GET("", h.OrderList)
		order.GET("/:id", h.OrderFindByID)
	}
	address := api.Group("/address")
	{
		address.POST("", h.AddressUserCreate)
		address.GET("", h.AddressListUserGet)
		address.GET("/:id", h.AddressUserGet)
		address.PUT("/:id", h.AddressUserUpdate)
		address.DELETE("/:id", h.AddressUserDelete)
	}
}

// admin := api.Group("/admin")
// {
// admin.POST("/signup", h.AdminSignup)
// admin.POST("/signin", h.AdminSignin)
// admin.POST("/signout", h.AdminSignout)
// admin.PUT("/order/update", h.AdminOrderUpdate)
// admin.GET("/order/orders", h.AdminOrderList)
// }
// address := api.Group("/address")
// {
// 	admin.GET("/", h.AddressList)
// 	admin.POST("/create", h.CreateAddress)
// 	admin.GET("/:id", h.AddressFindByID)
// 	admin.PUT("/update/:id", h.AddressUpdate)
// 	admin.DELETE("/delete/:id", h.AddressDelete)
// }
func (h *Handler) Sample(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"hello": "world",
	})
}

func (h *Handler) SamplePost(c *gin.Context) {
	type JsonRequest struct {
		Int int    `json:"int"`
		Str string `json:"str"`
	}
	var json JsonRequest
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	json = JsonRequest{
		Int: json.Int,
		Str: json.Str,
	}
	c.JSON(http.StatusOK, gin.H{
		"int": json.Int,
		"str": json.Str,
	})
}

func (h *Handler) SampleGetList(c *gin.Context) {
	type JsonRequest struct {
		Int int    `json:"int"`
		Str string `json:"str"`
	}
	json1 := JsonRequest{Int: 1, Str: "str1"}
	json2 := JsonRequest{Int: 2, Str: "str2"}
	jsons := []JsonRequest{json1, json2}
	// p, _ := h.ProductService.ProductCreate(ctx, p1)
	c.JSON(http.StatusOK, gin.H{
		"jsons": jsons,
	})
}

func (h *Handler) SampleGetFindByID(c *gin.Context) {
	// p := &model.Product{ProductId: 0, ProductName: "name1"}
	type JsonRequest struct {
		Int int    `json:"int"`
		Str string `json:"str"`
	}
	json1 := JsonRequest{Int: 1, Str: "str1"}
	// json2 := JsonRequest{Int: 2, Str: "str2"}
	// jsons := []JsonRequest{json1, json2}
	// p, _ := h.ProductService.ProductCreate(ctx, p1)
	c.JSON(http.StatusOK, gin.H{
		"jsons": json1,
	})
}

func (h *Handler) SampleGetFindByName(c *gin.Context) {
	// p := &model.Product{ProductId: 0, ProductName: "name1"}
	// json1 := JsonRequest{Int: 1, Str: "str1"}
	name := c.Param("name")
	// json2 := JsonRequest{Int: 2, Str: "str2"}
	// jsons := []JsonRequest{json1, json2}
	// p, _ := h.ProductService.ProductCreate(ctx, p1)
	c.JSON(http.StatusOK, gin.H{
		"name": name,
	})
}

func (h *Handler) SampleUpdate(c *gin.Context) {
	type JsonRequest struct {
		Int int    `json:"int"`
		Str string `json:"str"`
	}
	var json JsonRequest
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	json = JsonRequest{
		Int: json.Int,
		Str: json.Str,
	}
	c.JSON(http.StatusOK, gin.H{
		"int": json.Int,
		"str": json.Str,
	})
}
func (h *Handler) SampleDelete(c *gin.Context) {
	// id := c.Param("id")
	type JsonRequest struct {
		Int int    `json:"int"`
		Str string `json:"str"`
	}
	json1 := JsonRequest{Str: "str1", Int: 1}
	// type JsonRequest struct {
	// 	Int int    `json:"int"`
	// 	Str string `json:"str"`
	// }
	// json1 := JsonRequest{Int: 1, Str: "str1"}
	// json2 := JsonRequest{Int: 2, Str: "str2"}
	// jsons := []JsonRequest{json1, json2}
	// p, _ := h.ProductService.ProductCreate(ctx, p1)
	c.JSON(http.StatusOK, gin.H{
		"int": json1.Int,
		"str": json1.Str,
	})
}
