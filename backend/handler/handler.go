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
	UserService  model.UserService
	TokenService model.TokenService
	MaxBodyBytes int64
}

// Config will hold services that will eventually be injected into this
// handler layer on handler initialization
type Config struct {
	R               *gin.Engine
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
		g.PUT("/details", middleware.AuthUser(h.TokenService), h.Details)
		g.POST("/image", middleware.AuthUser(h.TokenService), h.Image)
		g.DELETE("/image", middleware.AuthUser(h.TokenService), h.DeleteImage)
		//TODO user
		g.PUT("/users/:id", middleware.AuthUser(h.TokenService), h.UserUpdate)
		g.PUT("/password_update/:id", middleware.AuthUser(h.TokenService), h.PasswordUpdate)
		//TODO cart
		// g.POST("/cart", middleware.AuthUser(h.TokenService), h.AddCartItem)
		// g.GET("/cart/:userId", middleware.AuthUser(h.TokenService), h.GetCartItem)
		// g.DELETE("/cart/:id", middleware.AuthUser(h.TokenService), h.RemoveCartItem)
		// g.PUT("/cart/:id", middleware.AuthUser(h.TokenService), h.RemoveCartItem)
		//TODO address
		// g.POST("/address", middleware.AuthUser(h.TokenService), h.AddCartItem)
		// g.GET("/address", middleware.AuthUser(h.TokenService), h.AddCartItem)
		//TODO order
		// g.GET("/orders", middleware.AuthUser(h.TokenService), h.GetOrderList)
		// g.GET("/orders/:id", middleware.AuthUser(h.TokenService), h.GetOrder)
		// g.POST("/order"s, middleware.AuthUser(h.TokenService), h.CreateOrder)
		//TODO history
		// g.GET("/history", middleware.AuthUser(h.TokenService), h.GetHistory)
		//TODO rating
		// g.POST("/rating/:productId", middleware.AuthUser(h.TokenService), h.CreateRating)
		// g.PUT("/rating/:productId", middleware.AuthUser(h.TokenService), h.UpdateRating)
		// g.GET("/rating/:productId", middleware.AuthUser(h.TokenService), h.GetRating)
		// g.DELETE("/rating/:productId", middleware.AuthUser(h.TokenService), h.DeleteRating)
		//TODO comment
		// g.POST("/:productId/comment", middleware.AuthUser(h.TokenService), h.CreateComment)
		// g.PUT("/product/comment", middleware.AuthUser(h.TokenService), h.UpdateComment)
		// g.DELETE("/rating/:productId", middleware.AuthUser(h.TokenService), h.DeleteComment)

	} else {
		g.GET("/me", h.Me)
		g.POST("/signout", h.Signout)
		g.PUT("/details", h.Details)
		g.POST("/image", h.Image)
		g.DELETE("/image", h.DeleteImage)
		g.POST("/password_forget", h.PasswordForgot)
		g.POST("/password_reset", h.PasswordReset)
		//TODO product
		// g.GET("/products", h.ProductList)
		// g.GET("/products/:id", h.ProductDetail)
		//TODO category
		// g.GET("/categories", h.CategoryList)
		//TODO comment
		// g.GET("/:productId/comment", middleware.AuthUser(h.TokenService), h.GetCommentList)
	}
	//admin
	//TODO user
	// g.GET("/admin/users", middleware.AuthAdmin(h.TokenService),h.UserList)
	// g.GET("/admin/users/:id",middleware.AuthAdmin(h.TokenService), h.UserDetail)
	//TODO product
	// g.PUT("/admin/products/:id",middleware.AuthAdmin(h.TokenService), h.ProductUpdate)
	// g.POST("/admin/products",middleware.AuthAdmin(h.TokenService), h.ProductCreate)
	// g.DELETE("/admin/products/:id", middleware.AuthAdmin(h.TokenService),h.ProductDelete)
	//TODO category
	// g.POST("/admin/category",middleware.AuthAdmin(h.TokenService), h.CategoryCreate)
	// g.PUT("/admin/category/:id", middleware.AuthAdmin(h.TokenService),h.CategoryUpdate)
	// g.DELETE("/addmin/category/:id",middleware.AuthAdmin(h.TokenService), h.CategoryDelete)
	//TODO order
	// g.PUT("/admin/order/:id", middleware.AuthAdmin(h.TokenService), UpdateOrder)
	// g.DELETE("/addmin/order/:id", middleware.AuthAdmin(h.TokenService), DeleteOrder)
	//TODO auth
	// g.POST("/admin/signup", middleware.AuthAdmin(h.TokenService),h.Signup )
	// g.POST("/admin/signin", middleware.AuthAdmin(h.TokenService),h.Signin )
	// g.POST("/admin/signout", middleware.AuthAdmin(h.TokenService),h.Signout )
	//TODO payment
	// g.GET("/admin/payment", middleware.AuthAdmin(h.TokenService),h.GetPayment )
	// g.POST("/admin/payment", middleware.AuthAdmin(h.TokenService),h.CreatePayment )

	g.POST("/signup", h.Signup)
	g.POST("/signin", h.Signin)
	g.POST("/tokens", h.Tokens)
}
