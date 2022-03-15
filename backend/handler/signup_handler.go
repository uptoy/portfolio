package handler

import (
	"log"
	"net/http"

	"backend/model"
	"backend/model/apperrors"
	"github.com/gin-gonic/gin"
)

// type signupReq struct {
// 	Email           string `json:"email" binding:"required,email"`
// 	Password        string `json:"password" binding:"required,gte=6,lte=30"`
// 	PasswordConfirm string `json:"password_confirm" binding:"required,gte=6,lte=30"`
// }

// Signup handler
func (h *Handler) Signup(c *gin.Context) {
	// define a variable to which we'll bind incoming
	// json body, {email, password}
	var data map[string]string

	// Bind incoming json to struct and check for validation errors
	if ok := bindData(c, &data); !ok {
		return
	}

	if data["password"] != data["password_confirm"] {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "password do not match",
		})
	}

	u := &model.User{
		Email:    data["email"],
		Password: data["password"],
		IsAdmin:  false,
	}

	ctx := c.Request.Context()
	err := h.UserService.Signup(ctx, u)

	if err != nil {
		log.Printf("Failed to sign up user: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}

	// create token pair as strings
	tokens, err := h.TokenService.NewPairFromUser(ctx, u, "")

	if err != nil {
		log.Printf("Failed to create tokens for user: %v\n", err.Error())

		// may eventually implement rollback logic here
		// meaning, if we fail to create tokens after creating a user,
		// we make sure to clear/delete the created user in the database

		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"tokens": tokens,
	})
}
