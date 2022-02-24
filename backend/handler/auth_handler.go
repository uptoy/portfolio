package handler

import (
	"log"
	"math/rand"
	"net/http"
	// "time"

	"net/smtp"

	"backend/model"
	"backend/model/apperrors"
	"github.com/gin-gonic/gin"
)

func (h *Handler) PasswordForgot(c *gin.Context) {
	var data map[string]string

	// Bind incoming json to struct and check for validation errors
	if ok := bindData(c, &data); !ok {
		return
	}

	token := RandStringRunes(12)
	passwordReset := &model.PasswordReset{
		Email: data["email"],
		Token: token,
	}
	ctx := c.Request.Context()

	err := h.UserService.PasswordForgot(ctx, passwordReset)
	if err != nil {
		log.Fatal(err)
	}

	from := "admin@example.com"

	to := []string{
		data["email"],
	}
	url := "http://localhost:3000/reset_password/" + token

	message := []byte("Click <a href=\"" + url + "\">here</a> to reset your password!")

	err = smtp.SendMail("0.0.0.0:1025", nil, from, to, message)

	if err != nil {
		log.Fatal(err)
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "success",
	})
}

func (h *Handler) PasswordReset(c *gin.Context) {
	var data map[string]string

	if ok := bindData(c, &data); !ok {
		return
	}
	if data["password"] != data["password_confirm"] {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Passwords do not match!",
		})
	}
	ctx := c.Request.Context()
	var passwordReset = model.PasswordReset{}
	token := data["token"]

	err := h.UserService.PasswordReset(ctx, token, &passwordReset)
	if err != nil {
		log.Printf("Failed to update user password: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"message": "user password update",
	})
}

func (h *Handler) PasswordUpdate(c *gin.Context) {
	var req map[string]string

	// Bind incoming json to struct and check for validation errors
	if ok := bindData(c, &req); !ok {
		return
	}
	if req["password"] != req["password_confirm"] {
		c.Status(400)
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "passwords do not match",
		})
	}
	ctx := c.Request.Context()
	authUser := c.MustGet("user").(*model.User)
	u := &model.User{
		UID:      authUser.UID,
		Password: req["password"],
	}
	err := h.UserService.PasswordUpdate(ctx, u)
	if err != nil {
		log.Printf("Failed to update user password: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"message": "user password update",
	})
}

func RandStringRunes(n int) string {
	var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}

// type UserToken struct {
// 	Id        uint
// 	UserId    uint
// 	Token     string
// 	CreatedAt time.Time
// 	ExpiredAt time.Time
// }
