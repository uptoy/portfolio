package middleware

import (
	"backend/model"
	"backend/model/apperrors"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type authHeader struct {
	IDToken string `header:"Authorization"`
}

// used to help extract validation errors
type invalidArgument struct {
	Field string `json:"field"`
	Value string `json:"value"`
	Tag   string `json:"tag"`
	Param string `json:"param"`
}

// AuthUser extracts a user from the Authorization header
// which is of the form "Bearer token"
// It sets the user to the context if the user exists
func AuthUser(s model.TokenService) gin.HandlerFunc {
	return func(c *gin.Context) {
		h := authHeader{}
		// bind Authorization Header to h and check for validation errors
		if err := c.ShouldBindHeader(&h); err != nil {
			if errs, ok := err.(validator.ValidationErrors); ok {
				var invalidArgs []invalidArgument

				for _, err := range errs {
					invalidArgs = append(invalidArgs, invalidArgument{
						err.Field(),
						err.Value().(string),
						err.Tag(),
						err.Param(),
					})
				}
				err := apperrors.NewBadRequest("Invalid request parameters. See invalidArgs")

				c.JSON(err.Status(), gin.H{
					"error":       err,
					"invalidArgs": invalidArgs,
				})
				c.Abort()
				return
			}

			// otherwise error type is unknown
			err := apperrors.NewInternal()
			c.JSON(err.Status(), gin.H{
				"error": err,
			})
			c.Abort()
			return
		}
		//   maxAge: 60 * 60 * 24, // 1 day
		//   maxAge: 60 * 60 * 24 * 30, // 1 Month
		accessToken, _ := c.Cookie("token")
		refreshToken, _ := c.Cookie("token")
		// validate ID token here
		user, err := s.ValidateIDToken(accessToken)
		if err != nil {
			err := apperrors.NewAuthorization("Provided token is invalid")
			c.JSON(err.Status(), gin.H{
				"error": err,
			})
			c.Abort()
			return
		}
		c.Set("user", user)
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
		c.Next()
	}
}
