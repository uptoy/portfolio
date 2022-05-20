package handler

import (
	"log"
	"net/http"

	"backend/model"
	"backend/model/apperrors"
	"github.com/gin-gonic/gin"
)

// signinReq is not exported
type signinReq struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,gte=6,lte=30"`
}

// Signin used to authenticate extant user
func (h *Handler) Signin(c *gin.Context) {
	var req signinReq

	if ok := bindData(c, &req); !ok {
		return
	}
	u := &model.User{
		Email:    req.Email,
		Password: req.Password,
	}
	ctx := c.Request.Context()
	user, err := h.UserService.Signin(ctx, u)

	if err != nil {
		log.Printf("Failed to sign in user: %v\n", err.Error())
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
	c.SetCookie("token", accessToken, 60*60*24*7, "/", "localhost", false, true)
	c.SetCookie("refreshToken", refreshToken, 60*60*24*30, "/", "localhost", false, true)

	c.JSON(http.StatusOK, gin.H{
		"message": "Success SignIn",
		"user":    user,
	})
}
