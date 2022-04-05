package handler

import (
	"backend/handler/middleware"
	"backend/model"
	"backend/model/apperrors"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

// Handler struct holds required services for handler to function
type Handler struct {
	AuthService    model.AuthService
	ProductService    model.ProductService
	CategoryService    model.CategoryService
	UserService    model.UserService
	TokenService   model.TokenService
	MaxBodyBytes   int64
}

// Config will hold services that will eventually be injected into this
// handler layer on handler initialization
type Config struct {
	R               *gin.Engine
	AuthService     model.AuthService
	ProductService    model.ProductService
	CategoryService    model.CategoryService
	UserService     model.UserService
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
		AuthService:    c.AuthService,
		ProductService: c.ProductService,
		CategoryService:    c.CategoryService,
		UserService:    c.UserService,
		TokenService:   c.TokenService,
		MaxBodyBytes:   c.MaxBodyBytes,
	} // currently has no properties

	// Create an account group
	api := c.R.Group(c.BaseURL)
	auth := api.Group("/auth")
	sample := api.Group("/sample")
	products := api.Group("/products")

	if gin.Mode() != gin.TestMode {
		api.Use(middleware.Timeout(c.TimeoutDuration, apperrors.NewServiceUnavailable()))
		api.GET("/me", middleware.AuthUser(h.TokenService), h.Me)
		auth.POST("/signout", middleware.AuthUser(h.TokenService), h.Signout)
		api.PUT("/details", middleware.AuthUser(h.TokenService), h.Details)
	} else {
		//こちらがテスト実行される
		api.GET("/me", h.Me)
		auth.POST("/signout", h.Signout)
		api.PUT("/details", h.Details)
	}
	//こちらがテスト実行される
	auth.POST("/signup", h.Signup)
	auth.POST("/signin", h.Signin)
	auth.POST("/tokens", h.Tokens)
	auth.POST("/forgot", h.ForgotPassword)
	auth.POST("/reset", h.ResetPassword)
	//sample
	sample.GET("/", h.SampleGetList)
	sample.POST("/", h.SamplePost)
	sample.GET("/:id", h.SampleGetFindByID)
	sample.PUT("/:id", h.SampleUpdate)
	sample.DELETE("/:id", h.SampleDelete)
	sample.GET("/search/:name", h.SampleGetFindByName)
	//product
	products.GET("/", h.ProductList)
	products.POST("/", h.ProductCreate)
	products.GET("/:id", h.ProductFindByID)
	products.PUT("/:id", h.ProductUpdate)
	products.DELETE("/:id", h.ProductDelete)
	products.GET("/search/:name", h.ProductFindByName)
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
