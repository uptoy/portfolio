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
	ReviewService  model.ReviewService
	OrderService   model.OrderService
	CartService    model.CartService
	UserService    model.UserService
	ProductService model.ProductService
	TokenService   model.TokenService
	MaxBodyBytes   int64
}

// Config will hold services that will eventually be injected into this
// handler layer on handler initialization
type Config struct {
	R               *gin.Engine
	ReviewService   model.ReviewService
	OrderService    model.OrderService
	CartService     model.CartService
	UserService     model.UserService
	ProductService  model.ProductService
	TokenService    model.TokenService
	BaseURL         string
	TimeoutDuration time.Duration
	MaxBodyBytes    int64
}

// NewHandler initializes the handler with required injected services along with http routes
// Does not return as it deals directly with a reference to the gin Engine
func NewHandler(c *Config) {
	// Create a handler (which will later have injected services)
	h := &Handler{
		ReviewService:  c.ReviewService,
		OrderService:   c.OrderService,
		CartService:    c.CartService,
		UserService:    c.UserService,
		ProductService: c.ProductService,
		TokenService:   c.TokenService,
		MaxBodyBytes:   c.MaxBodyBytes,
	} // currently has no properties

	// Create an account group
	api := c.R.Group(c.BaseURL)

	api.Use(middleware.Timeout(c.TimeoutDuration, apperrors.NewServiceUnavailable()))
	products := api.Group("/products")
	{
		products.GET("/", h.ProductList)
		products.POST("/", h.ProductCreate)
		products.GET("/:id", h.ProductFindByID)
		products.PUT("/:id", h.ProductUpdate)
		products.DELETE("/:id", h.ProductDelete)
		products.GET("/:id/reviews", h.ReviewList)
		products.POST("/:id/reviews", h.ReviewCreate)
		products.PUT("/:id/reviews", h.ReviewUpdate)
		products.DELETE("/:id/reviews", h.ReviewUpdate)
		products.GET("/search/:name", h.ProductFindByName)
	}
	carts := api.Group("/carts")
	{
		carts.POST("/", h.CartGet)
		carts.POST("/carts/add", h.CartAddItem)
		carts.POST("/carts/delete", h.CartDeleteItem)
		carts.POST("/carts/increment", h.CartIncrementItem)
		carts.POST("/carts/decrement", h.CartDecrementItem)
	}
	sample := api.Group("/sample")
	{
		sample.GET("/", h.SampleGetList)
		sample.POST("/", h.SamplePost)
		sample.GET("/:id", h.SampleGetFindByID)
		sample.PUT("/:id", h.SampleUpdate)
		sample.DELETE("/:id", h.SampleDelete)
		sample.GET("/search/:name", h.SampleGetFindByName)
	}
	order := api.Group("/orders")
	{
		order.POST("/create", h.OrderCreate)
		order.GET("/", h.OrderList)
		order.GET("/:id", h.OrderFindByID)
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
	// api.PUT("/details", middleware.AuthUser(h.TokenService), h.Details)
	// api.POST("/image/:filename", h.ImageAWS)
	// api.POST("/image", middleware.AuthUser(h.TokenService), h.Image)
	// api.DELETE("/image", middleware.AuthUser(h.TokenService), h.DeleteImage)
	api.GET("/me", middleware.AuthUser(h.TokenService), h.Me)
	api.POST("/signup", h.Signup)
	api.POST("/signin", h.Signin)
	api.POST("/signout", h.Signout)
	api.POST("/tokens", h.Tokens)
}

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
