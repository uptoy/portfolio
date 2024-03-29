package handler

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"backend/model/apperrors"
)

type tokensReq struct {
	RefreshToken string `json:"refreshToken" binding:"required"`
}

// Tokens handler
func (h *Handler) Tokens(c *gin.Context) {
	// bind JSON to req of type tokensRew
	var req tokensReq

	if ok := bindData(c, &req); !ok {
		return
	}

	ctx := c.Request.Context()

	// verify refresh JWT
	refreshToken, err := h.TokenService.ValidateRefreshToken(req.RefreshToken)

	if err != nil {
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}

	// get up-to-date user
	u, err := h.UserService.Get(ctx, refreshToken.UID)

	if err != nil {
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}

	// create fresh pair of tokens
	tokens, err := h.TokenService.NewPairFromUser(ctx, u, refreshToken.ID.String())

	if err != nil {
		log.Printf("Failed to create tokens for user: %+v. Error: %v\n", u, err.Error())

		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	accessTokenNew := tokens.IDToken.SS
	refreshTokenNew := tokens.RefreshToken.SS
	//   maxAge: 60 * 60 * 24, // 1 day
	//   maxAge: 60 * 60 * 24 * 30, // 1 Month
	c.SetSameSite(http.SameSiteStrictMode)
	c.SetCookie("token", accessTokenNew, 60*60*24, "/", "localhost", false, true)
	c.SetCookie("refreshToken", refreshTokenNew, 60*60*24*30, "/", "localhost", false, true)

	c.JSON(http.StatusOK, gin.H{
		"tokens": tokens,
	})
}
