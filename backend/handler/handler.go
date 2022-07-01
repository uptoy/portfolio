package handler

import (
	"backend/handler/middleware"
	"backend/model"
	"backend/model/apperrors"
	"github.com/gin-gonic/gin"
	"time"
)

// Handler struct holds required services for handler to function
type Handler struct {
	AddressService  model.AddressService
	AuthService     model.AuthService
	CartService     model.CartService
	CategoryService model.CategoryService
	// ChatService     model.ChatService
	OrderService    model.OrderService
	PaymentService  model.PaymentService
	ProductService  model.ProductService
	ReviewService   model.ReviewService
	TokenService    model.TokenService
	UserService     model.UserService
	WishlistService model.WishlistService

	MaxBodyBytes int64
}

type Config struct {
	R               *gin.Engine
	SampleService   model.SampleService
	AddressService  model.AddressService
	AuthService     model.AuthService
	CartService     model.CartService
	CategoryService model.CategoryService
	// ChatService     model.ChatService
	// ImageService    model.ImageService
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
		// ChatService:     c.ChatService,
		OrderService:    c.OrderService,
		PaymentService:  c.PaymentService,
		ProductService:  c.ProductService,
		ReviewService:   c.ReviewService,
		TokenService:    c.TokenService,
		UserService:     c.UserService,
		WishlistService: c.WishlistService,
		MaxBodyBytes:    c.MaxBodyBytes,
	} // currently has no properties

	// Create an account group
	api := c.R.Group(c.BaseURL)
	api.Use(middleware.Timeout(c.TimeoutDuration, apperrors.NewServiceUnavailable()))
	api.Static("images", "./images")
	api.PUT("/details", middleware.AuthUser(h.TokenService), h.Details)
	auth := api.Group("/auth")
	{
		auth.POST("/signup", h.Signup)
		auth.POST("/signin", h.Signin)
		auth.POST("/signout", middleware.AuthUser(h.TokenService), h.Signout)
		auth.GET("/me", middleware.AuthUser(h.TokenService), h.Me)
		auth.POST("/tokens", h.Tokens)
	}
	users := api.Group("/users")
	{
		users.GET("", h.UserList)
	}
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
		products.DELETE("/:id/reviews/delete", h.ReviewBulkDelete)
		products.POST("/:id/reviews", middleware.AuthUser(h.TokenService), h.ReviewCreate)
		products.GET("/:id/reviews", h.ReviewGetAll)
		products.GET("/:id/reviews/count", h.ReviewCount)
		products.GET("/:id/reviews/:rid", h.ReviewGet)
		products.PUT("/:id/reviews/:rid", h.ReviewUpdate)
		products.DELETE("/:id/reviews/:rid", h.ReviewDelete)
	}
	category := api.Group("/categories")
	{
		category.GET("", h.CategoryList)
		category.POST("", h.CategoryCreate)
		category.GET("/:id", h.CategoryFindByID)
		category.PUT("/:id", h.CategoryUpdate)
		category.DELETE("/:id", h.CategoryDelete)
		category.GET("/search/:name", h.CategoryFindByName)
		category.DELETE("/delete", h.CategoryBulkDelete)
		category.POST("/insert", h.CategoryBulkInsert)
		category.GET("/count", h.CategoryCount)
	}
	wishlist := api.Group("/wishlist")
	{
		wishlist.POST("", middleware.AuthUser(h.TokenService), h.WishlistCreate)
		wishlist.GET("", middleware.AuthUser(h.TokenService), h.WishlistGet)
		wishlist.DELETE("/:id", middleware.AuthUser(h.TokenService), h.WishlistDelete)
	}
	cart := api.Group("/cart")
	{
		cart.GET("", middleware.AuthUser(h.TokenService), h.CartGet)
		cart.POST("", middleware.AuthUser(h.TokenService), h.CartAddItem)
		cart.DELETE("/:id", middleware.AuthUser(h.TokenService), h.CartDeleteItem)
		cart.PUT("/inc/:id", middleware.AuthUser(h.TokenService), h.CartIncrementItem)
		cart.PUT("/dec/:id", middleware.AuthUser(h.TokenService), h.CartDecrementItem)
	}
	api.POST("/payment", h.Payment)
	order := api.Group("/orders")
	{
		order.POST("", middleware.AuthUser(h.TokenService), h.OrderCreate)
		order.GET("", middleware.AuthUser(h.TokenService), h.OrderList)
		order.GET("/:id", middleware.AuthUser(h.TokenService), h.OrderFindByID)
		order.GET("/:id/detail", middleware.AuthUser(h.TokenService), h.OrderGetDetails)
		order.GET("/count", middleware.AuthUser(h.TokenService), h.OrderCount)
	}
	address := api.Group("/address")
	{
		address.POST("", middleware.AuthUser(h.TokenService), h.AddressUserCreate)
		address.GET("", middleware.AuthUser(h.TokenService), h.AddressListUserGet)
		address.GET("/:id", middleware.AuthUser(h.TokenService), h.AddressUserGet)
		address.PUT("/:id", middleware.AuthUser(h.TokenService), h.AddressUserUpdate)
		address.DELETE("/:id", middleware.AuthUser(h.TokenService), h.AddressUserDelete)
	}
}
