package handler

import (
	// "fmt"
	"log"
	"net/http"
	"os"

	"backend/model"
	"backend/model/apperrors"

	"github.com/gin-gonic/gin"
)

// signupReq is not exported, hence the lowercase name
// it is used for validation and json marshalling
type signupReq struct {
	Username string `json:"username" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,gte=6,lte=30"`
}

// Signup handler
func (h *Handler) Signup(c *gin.Context) {
	// define a variable to which we'll bind incoming
	// json body, {email, password}
	var req signupReq
	// Bind incoming json to struct and check for validation errors
	if ok := bindData(c, &req); !ok {
		return
	}

	u := &model.User{
		Username: req.Username,
		Email:    req.Email,
		Password: req.Password,
	}

	ctx := c.Request.Context()
	user, err := h.UserService.Signup(ctx, u)

	if err != nil {
		log.Printf("Failed to sign up user: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	tokens, err := h.TokenService.NewPairFromUser(ctx, u, "")
	if err != nil {
		log.Printf("Failed to create tokens for user: %v\n", err.Error())

		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	accessToken := tokens.IDToken.SS
	refreshToken := tokens.RefreshToken.SS
	//   maxAge: 60 * 60 * 24, // 1 day
	//   maxAge: 60 * 60 * 24 * 30, // 1 Month
	c.SetSameSite(http.SameSiteStrictMode)
	// ローカルの場合
	if os.Getenv("ENV") == "local" {
		c.SetCookie("token", accessToken, 60*60*24, "/", "localhost", false, true)
		c.SetCookie("refreshToken", refreshToken, 60*60*24*30, "/", "localhost", false, true)
	}
	// 本番環境の場合
	if os.Getenv("ENV") == "production" {
		c.SetCookie("token", accessToken, 60*60*24, "/", "https://backend-kighwilmrq-an.a.run.app", false, true)
		c.SetCookie("refreshToken", refreshToken, 60*60*24*30, "/", "https://backend-kighwilmrq-an.a.run.app", false, true)
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Success SignIn",
		"user":    user,
	})
}
