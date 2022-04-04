package handler

import (
	"net/http"
	"time"

	"backend/handler/middleware"
	"backend/model"
	"backend/model/apperrors"
	"github.com/gin-gonic/gin"
)

// Handler struct holds required services for handler to function
type Handler struct {
	AuthService  model.AuthService
	UserService  model.UserService
	TokenService model.TokenService
}

// Config will hold services that will eventually be injected into this
// handler layer on handler initialization
type Config struct {
	R               *gin.Engine
	AuthService     model.AuthService
	UserService     model.UserService
	TokenService    model.TokenService
	BaseURL         string
	TimeoutDuration time.Duration
}

// NewHandler initializes the handler with required injected services along with http routes
// Does not return as it deals directly with a reference to the gin Engine
func NewHandler(c *Config) {
	// Create a handler (which will later have injected services)
	h := &Handler{
		AuthService:  c.AuthService,
		UserService:  c.UserService,
		TokenService: c.TokenService,
	} // currently has no properties

	// Create an account group
	api := c.R.Group(c.BaseURL)

	api.Use(middleware.Timeout(c.TimeoutDuration, apperrors.NewServiceUnavailable()))
	api.GET("/me", middleware.AuthUser(h.TokenService), h.Me)
	api.POST("/signout", middleware.AuthUser(h.TokenService), h.Signout)
	api.PUT("/details", middleware.AuthUser(h.TokenService), h.Details)
	api.POST("/forgot", h.ForgotPassword)
	api.POST("/signup", h.Signup)
	api.POST("/signin", h.Signin)
	api.POST("/reset", h.ResetPassword)
}

// Image handler
func (h *Handler) Forgot(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"hello": "it's image",
	})
}

// DeleteImage handler
func (h *Handler) DeleteImage(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"hello": "it's deleteImage",
	})
}
