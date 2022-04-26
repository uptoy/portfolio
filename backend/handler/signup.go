package handler

import (
	"fmt"
	"log"
	"net/http"

	"backend/model"
	"backend/model/apperrors"

	"github.com/gin-gonic/gin"
)

// signupReq is not exported, hence the lowercase name
// it is used for validation and json marshalling
type signupReq struct {
	Name     string `json:"name" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,gte=6,lte=30"`
}

// Signup handler
func (h *Handler) Signup(c *gin.Context) {
	token := "Shimin Li"
	c.SetCookie("name1800", token, 3600, "/", "localhost", false, true)
	// define a variable to which we'll bind incoming
	// json body, {email, password}
	var req signupReq

	// // Bind incoming json to struct and check for validation errors
	if ok := bindData(c, &req); !ok {
		return
	}

	u := &model.User{
		Name:     req.Name,
		Email:    req.Email,
		Password: req.Password,
	}

	ctx := c.Request.Context()
	result, err := h.UserService.Signup(ctx, u)

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

	accessToken := tokens.IDToken.SS
	// refreshToken := tokens.RefreshToken.SS
	fmt.Println("accessToken", accessToken)
	// fmt.Println("refreshToken", refreshToken)
	fmt.Println("tokens", tokens)
	//   maxAge: 60 * 60 * 24, // 1 day
	//   maxAge: 60 * 60 * 24 * 30, // 1 Month
	c.SetCookie("token", accessToken, 60*60*24, "/", "localhost", false, true)
	// c.SetCookie("refreshToken", refreshToken, 60*60*24*30, "/", "localhost", false, true)

	c.JSON(http.StatusCreated, gin.H{
		"message": "Success SignUp",
		"user":    result,
	})
}
