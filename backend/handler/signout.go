package handler

import (
	"log"
	"net/http"
	"os"

	"backend/model"
	"backend/model/apperrors"
	"github.com/gin-gonic/gin"
)

// Signout handler
func (h *Handler) Signout(c *gin.Context) {
	user := c.MustGet("user")

	ctx := c.Request.Context()
	if err := h.TokenService.Signout(ctx, user.(*model.User).UID); err != nil {
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}

	// cookie clear
	c.SetSameSite(http.SameSiteStrictMode)
	if os.Getenv("ENV") == "local" {
		log.Println("cookieをセットする")
		c.SetCookie("token", "", -1, "/", "localhost", true, true)
	}
	// 本番環境の場合(accessToken)
	if os.Getenv("ENV") == "production" {
		log.Println("productionでcookieをセットする")
		c.SetCookie("token", "", -1, "/", "https://frontend-kighwilmrq-an.a.run.app", true, true)
	}

	// ローカルの場合(refreshToken)
	if os.Getenv("ENV") == "local" {
		log.Println("cookieをセットする")
		c.SetCookie("refreshToken", "", -1, "/", "localhost", true, true)
	}
	// 本番環境の場合(refreshToken)
	if os.Getenv("ENV") == "production" {
		log.Println("productionでcookieをセットする")
		c.SetCookie("refreshToken", "", -1, "/", "https://frontend-kighwilmrq-an.a.run.app", true, true)
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "user signed out successfully!",
	})
}

// Name:     name,
// Value:    url.QueryEscape(value),
// MaxAge:   maxAge,
// Path:     path,
// Domain:   domain,
// SameSite: c.sameSite,
// Secure:   secure,
// HttpOnly: httpOnly,
