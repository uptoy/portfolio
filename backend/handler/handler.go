package handler

import (
	// "backend/handler/middleware"
	"backend/model"
	// "backend/model/apperrors"
	"fmt"
	// "log"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// Handler struct holds required services for handler to function
type Handler struct {
	UserService  model.UserService
	TokenService model.TokenService
	ProductService model.ProductService
	MaxBodyBytes int64
}

// Config will hold services that will eventually be injected into this
// handler layer on handler initialization
type Config struct {
	R               *gin.Engine
	UserService     model.UserService
	TokenService    model.TokenService
	ProductService model.ProductService
	BaseURL         string
	TimeoutDuration time.Duration
	MaxBodyBytes    int64
}

// NewHandler initializes the handler with required injected services along with http routes
// Does not return as it deals directly with a reference to the gin Engine
func NewHandler(c *Config) {
	// Create a handler (which will later have injected services)
	h := &Handler{
		UserService:  c.UserService,
		TokenService: c.TokenService,
		MaxBodyBytes: c.MaxBodyBytes,
	} // currently has no properties

	// Create an account group
	g := c.R.Group(c.BaseURL)

	if gin.Mode() != gin.TestMode {
		// g.Use(middleware.Timeout(c.TimeoutDuration, apperrors.NewServiceUnavailable()))
		// g.GET("/me", middleware.AuthUser(h.TokenService), h.Me)
		// g.POST("/signout", middleware.AuthUser(h.TokenService), h.Signout)
		// g.POST("/image", middleware.AuthUser(h.TokenService), h.Image)
		// g.DELETE("/image", middleware.AuthUser(h.TokenService), h.DeleteImage)
		// g.GET("/", h.SampleGetList)
		// g.POST("/", h.SamplePost)
		// g.PUT("/:id", h.SamplePut)
		// g.GET("/:id", h.SampleGetFindById)
		// g.DELETE("/:id", h.SampleDelete)
		g.GET("/products", h.ProductList)
	} else {
		//test時
		// g.GET("/", h.SampleGetList)
		// g.POST("/", h.SamplePost)
		// g.PUT("/:id", h.SamplePut)
		// g.GET("/:id", h.SampleGetFindById)
		// g.DELETE("/:id", h.SampleDelete)
		// g.GET("/me", h.Me)
		// g.POST("/signout", h.Signout)
		// g.POST("/image", h.Image)
		// g.DELETE("/image", h.DeleteImage)
		g.GET("/products", h.ProductList)
	}

	// g.POST("/signup", h.Signup)
	// g.POST("/signin", h.Signin)
	// g.POST("/tokens", h.Tokens)
}

//ok
func (h *Handler) SampleGetList(c *gin.Context) {
	type JsonRequest struct {
		Str string `json:"str"`
		Int int    `json:"int"`
	}
	json1 := JsonRequest{Str: "str1", Int: 1}
	json2 := JsonRequest{Str: "str2", Int: 2}
	jsons := []JsonRequest{json1, json2}

	//////////////////////////////
	// var jsons *string = nil
	// if jsons == nil {
	// 	log.Printf("Failed get : %v\n", nil)
	// 	c.JSON(http.StatusOK, gin.H{
	// 		"error": "null",
	// 	})
	// 	return
	// }
	//////////////////////////////
	// arr := []string{"Golang", "Java"}
	// mapEx := map[int]JsonRequest{1: json, 2: json2}

	c.JSON(http.StatusOK, gin.H{
		"jsons": jsons,
	})
}

//ok
func (h *Handler) SamplePost(c *gin.Context) {
	type JsonRequest struct {
		Int int64  `json:"int"`
		Str string `json:"str"`
	}
	var json JsonRequest
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"int": json.Int,
		"str": json.Str,
	})
}

func (h *Handler) SamplePut(c *gin.Context) {
	id := c.Param("id")
	i, _ := strconv.ParseInt(id, 0, 64)
	fmt.Println("i", i)

	type JsonRequest struct {
		Int int64  `json:"int"`
		Str string `json:"str"`
	}
	var json JsonRequest

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"int": json.Int,
		"str": json.Str,
	})
}

func (h *Handler) SampleGetFindById(c *gin.Context) {
	id := c.Param("id")
	i, _ := strconv.ParseInt(id, 0, 64)
	fmt.Println("i", i)

	type JsonRequest struct {
		Int int64  `json:"int"`
		Str string `json:"str"`
	}
	var json JsonRequest
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"int": json.Int,
		"str": json.Str,
	})
}

func (h *Handler) SampleDelete(c *gin.Context) {
	id := c.Param("id")
	i, _ := strconv.ParseInt(id, 0, 64)
	fmt.Println("i", i)

	type JsonRequest struct {
		Int int64  `json:"int"`
		Str string `json:"str"`
	}
	var json JsonRequest
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"int": json.Int,
		"str": json.Str,
	})
}
