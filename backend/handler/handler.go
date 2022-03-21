package handler

import (
	"time"

	"backend/handler/middleware"
	"backend/model"
	"backend/model/apperrors"
	"github.com/gin-gonic/gin"
)

// Handler struct holds required services for handler to function
type Handler struct {
	ProductService model.ProductService
	UserService    model.UserService
	TokenService   model.TokenService
	MaxBodyBytes   int64
}

// Config will hold services that will eventually be injected into this
// handler layer on handler initialization
type Config struct {
	R               *gin.Engine
	ProductService  model.ProductService
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
		UserService:  c.UserService,
		TokenService: c.TokenService,
		MaxBodyBytes: c.MaxBodyBytes,
	} // currently has no properties

	// Create an api group
	g := c.R.Group(c.BaseURL)

	if gin.Mode() != gin.TestMode {
		g.Use(middleware.Timeout(c.TimeoutDuration, apperrors.NewServiceUnavailable()))
		g.GET("/me", middleware.AuthUser(h.TokenService), h.Me)
		g.POST("/signout", middleware.AuthUser(h.TokenService), h.Signout)
		g.PUT("/user", middleware.AuthUser(h.TokenService), h.UpdateUser)
		g.POST("/image", middleware.AuthUser(h.TokenService), h.Image)
		g.DELETE("/image", middleware.AuthUser(h.TokenService), h.DeleteImage)
		g.POST("/products", h.ProductCreate)
		g.GET("/products", h.ProductList)
		g.GET("/products/:productId", h.ProductFindByID)
		g.GET("/products/:productName", h.ProductFindByName)
		g.PUT("/products/:productName", h.ProductUpdate)
		g.DELETE("/products/:productName", h.ProductDelete)
	} else {
		g.GET("/me", h.Me)
		g.POST("/signout", h.Signout)
		g.PUT("/user", h.UpdateUser)
		g.POST("/image", h.Image)
		g.DELETE("/image", h.DeleteImage)
	}

	g.POST("/signup", h.Signup)
	g.POST("/signin", h.Signin)
	g.POST("/tokens", h.Tokens)
}

// id := c.Param("id")

// Query string parameters are parsed using the existing underlying request object.
// The request responds to a url matching:  /welcome?firstname=Jane&lastname=Doe
// router.GET("/welcome", func(c *gin.Context) {
// 	firstname := c.DefaultQuery("firstname", "Guest")
// 	lastname := c.Query("lastname") // shortcut for c.Request.URL.Query().Get("lastname")

// 	c.String(http.StatusOK, "Hello %s %s", firstname, lastname)
// })
// Hello Jane Doe

// POST /post?id=1234&page=1 HTTP/1.1
// Content-Type: application/x-www-form-urlencoded
// name=manu&message=this_is_great

// router.POST("/", func(c *gin.Context) {
// 	message := c.PostForm("message")
// 	nick := c.DefaultPostForm("nick", "anonymous")

// 	c.JSON(200, gin.H{
// 		"status":  "posted",
// 		"message": message,
// 		"nick":    nick,
// 	})
// })
