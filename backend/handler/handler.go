package handler

import (
	// "log"
	"net/http"
	"time"

	// "backend/handler/middleware"
	"backend/model"
	// "backend/model/apperrors"
	"github.com/gin-gonic/gin"
	// "strconv"
)

// Handler struct holds required services for handler to function
type Handler struct {
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
		CartService:    c.CartService,
		UserService:    c.UserService,
		ProductService: c.ProductService,
		TokenService:   c.TokenService,
		MaxBodyBytes:   c.MaxBodyBytes,
	} // currently has no properties

	// Create an account group
	g := c.R.Group(c.BaseURL)

	if gin.Mode() != gin.TestMode {
		// g.Use(middleware.Timeout(c.TimeoutDuration, apperrors.NewServiceUnavailable()))
		// g.GET("/me", middleware.AuthUser(h.TokenService), h.Me)
		g.GET("/products", h.ProductList)
		g.POST("/products", h.ProductCreate)
		g.GET("/products/:id", h.ProductFindByID)
		g.PUT("/products/:id", h.ProductUpdate)
		g.DELETE("/products/:id", h.ProductDelete)
		g.GET("/products/search/:name", h.ProductFindByName)
		g.POST("/carts", h.CartGet)
		g.POST("/carts/add", h.CartAddItem)
		g.POST("/carts/delete", h.CartDeleteItem)
		g.POST("/carts/increment", h.CartIncrementItem)
		g.POST("/carts/decrement", h.CartDecrementItem)
		// g.GET("/", h.SampleGetList)
		// g.POST("/", h.SamplePost)
		// g.GET("/:id", h.SampleGetFindByID)
		// g.PUT("/:id", h.SampleUpdate)
		// g.DELETE("/:id", h.SampleDelete)
		// g.GET("/search/:name", h.SampleGetFindByName)
		// g.PUT("/details", middleware.AuthUser(h.TokenService), h.Details)
		// g.POST("/image", middleware.AuthUser(h.TokenService), h.Image)
		// g.DELETE("/image", middleware.AuthUser(h.TokenService), h.DeleteImage)
	} else {
		// g.GET("/me", h.Me)
		g.GET("/products", h.ProductList)
		g.POST("/products", h.ProductCreate)
		g.GET("/products/:id", h.ProductFindByID)
		g.PUT("/products/:id", h.ProductUpdate)
		g.DELETE("/products/:id", h.ProductDelete)
		g.GET("/products/search/:name", h.ProductFindByName)
		// g.GET("/", h.SampleGetList)
		// g.POST("/", h.SamplePost)
		// g.GET("/:id", h.SampleGetFindByID)
		// g.PUT("/:id", h.SampleUpdate)
		// g.DELETE("/:id", h.SampleDelete)
		// g.GET("/search/:name", h.SampleGetFindByName)
		// g.POST("/signout", h.Signout)
		// g.PUT("/details", h.Details)
		// g.POST("/image", h.Image)
		// g.DELETE("/image", h.DeleteImage)
	}

	g.POST("/signup", h.Signup)
	g.POST("/signin", h.Signin)
	g.POST("/tokens", h.Tokens)
}

// func (h *Handler) Sample(c *gin.Context) {
// 	c.JSON(http.StatusOK, gin.H{
// 		"hello": "world",
// 	})
// }

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
