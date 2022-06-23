package handler

import (
	"log"
	"net/http"
	"os"

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
	// ローカルの場合(accessToken)
	if os.Getenv("ENV") == "local" {
		log.Println("cookieをセットする")
		c.SetCookie("token", accessToken, 60*60*24, "/", "localhost", true, true)
	}
	// 本番環境の場合(accessToken)
	if os.Getenv("ENV") == "production" {
		log.Println("productionでcookieをセットする")
		c.SetCookie("token", accessToken, 60*60*24, "/", "https://frontend-kighwilmrq-an.a.run.app", true, true)
	}

	// ローカルの場合(refreshToken)
	if os.Getenv("ENV") == "local" {
		log.Println("cookieをセットする")
		c.SetCookie("refreshToken", refreshToken, 60*60*24*30, "/", "localhost", true, true)
	}
	// 本番環境の場合(refreshToken)
	if os.Getenv("ENV") == "production" {
		log.Println("productionでcookieをセットする")
		c.SetCookie("refreshToken", refreshToken, 60*60*24*30, "/", "https://frontend-kighwilmrq-an.a.run.app", true, true)
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Success SignIn",
		"user":    user,
	})
}
