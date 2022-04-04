package handler

import (
	"log"
	"net/http"

	"backend/model"
	"backend/model/apperrors"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/smtp"
)

func (h *Handler) ForgotPassword(c *gin.Context) {
	type reqForgot struct {
		Email string
	}
	var forgot reqForgot
	if c.ShouldBind(&forgot) == nil {
		log.Println(forgot.Email)
	}
	email := forgot.Email
	fmt.Println("email", email)
	ctx := c.Request.Context()
	token, err := h.TokenService.ForgotPasswordToken(ctx, email, "")
	// fmt.Println("token", token)

	// token := "token"
	if err != nil {
		log.Printf("Failed to create tokens for user: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	passwordReset := model.PasswordReset{
		Email: email,
		Token: token,
	}
	fmt.Println("passwordReset", passwordReset)

	err1 := h.AuthService.ForgotPassword(ctx, &passwordReset)
	if err1 != nil {
		log.Printf("Failed to forgot password: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	from := "admin@example.com"
	to := []string{
		email,
	}
	url := "http://localhost:3000/reset/" + token
	message := []byte("Click <a href=\"" + url + "\">here</a> to reset your password")
	err2 := smtp.SendMail("0.0.0.0:1025", nil, from, to, message)
	if err2 != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Failed to send mail",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Check your mail",
	})
}

func (h *Handler) ResetPassword(c *gin.Context) {
	type reqReset struct {
		Token           string `json:"token"`
		Email           string `json:"email"`
		Password        string `json:"password"`
		PasswordConfirm string `json:"password_confirm"`
	}
	// token := c.Param(":token")

	var reset reqReset
	if c.ShouldBind(&reset) == nil {
		log.Println(reset.Email)
	}
	token := reset.Token
	email := reset.Email
	password := reset.Password
	passwordConfirm := reset.PasswordConfirm
	fmt.Println("password", password)
	fmt.Println("passwordConfirm", passwordConfirm)
	// token := reset.Token
	fmt.Println("reset", reset)
	fmt.Println("token", token)
	if password != passwordConfirm {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Passwords do not match",
		})
		return
	}
	ctx := c.Request.Context()
	passwordReset := model.PasswordReset{
		Email: email,
		Token: token,
	}
	fmt.Println("passwordReset", passwordReset)
	err := h.AuthService.ResetPassword(ctx, password, &passwordReset)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Failed to reset password",
			"status":  http.StatusBadRequest,
		})
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "success",
		"status":  http.StatusOK,
	})
}

// StatusOK                   = 200 // RFC 7231, 6.3.1
// StatusCreated              = 201 // RFC 7231, 6.3.2
// StatusAccepted             = 202 // RFC 7231, 6.3.3
// StatusNoContent            = 204 // RFC 7231, 6.3.5
// StatusBadRequest                   = 400 // RFC 7231, 6.5.1
// StatusUnauthorized                 = 401 // RFC 7235, 3.1
// StatusPaymentRequired              = 402 // RFC 7231, 6.5.2
// StatusNotFound                     = 404 // RFC 7231, 6.5.4
// StatusInternalServerError           = 500 // RFC 7231, 6.6.1
