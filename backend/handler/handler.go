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
	AuthService  model.AuthService
	UserService  model.UserService
	TokenService model.TokenService
	MaxBodyBytes int64
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
	MaxBodyBytes    int64
}

// NewHandler initializes the handler with required injected services along with http routes
// Does not return as it deals directly with a reference to the gin Engine
func NewHandler(c *Config) {
	// Create a handler (which will later have injected services)
	h := &Handler{
		AuthService:  c.AuthService,
		UserService:  c.UserService,
		TokenService: c.TokenService,
		MaxBodyBytes: c.MaxBodyBytes,
	} // currently has no properties

	// Create an api group
	g := c.R.Group(c.BaseURL)

	g.Use(middleware.Timeout(c.TimeoutDuration, apperrors.NewServiceUnavailable()))
	g.GET("/me", h.Me)
	g.POST("/signout", h.Signout)
	g.PUT("/details", h.Details)
	g.POST("/image", h.Image)
	g.DELETE("/image", h.DeleteImage)
	g.POST("/signup", h.Signup)
	g.POST("/signin", h.Signin)
	g.POST("/tokens", h.Tokens)
	g.POST("/forgot_password", h.ForgotPassword)
	g.POST("/reset_password", h.ResetPassword)
}
