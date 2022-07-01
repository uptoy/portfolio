package handler

import (
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
	// ローカルの場合
	if os.Getenv("ENV") == "local" {
		c.SetCookie("token", "", -1, "/", "localhost", false, true)
		c.SetCookie("refreshToken", "", -1, "/", "localhost", false, true)
	}
	// 本番環境の場合
	if os.Getenv("ENV") == "production" {
		c.SetCookie("token", "", -1, "/", "https://backend-kighwilmrq-an.a.run.app", true, true)
		c.SetCookie("refreshToken", "", -1, "/", "https://backend-kighwilmrq-an.a.run.app", true, true)
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
