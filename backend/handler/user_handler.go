package handler

import (
	"net/http"
	"strconv"
	"time"

	"backend/model"
	"backend/service"
	// "backend/utils/errors"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

const (
	SecretKey = "qwe123"
)

func (h *Handler) Register(c *gin.Context) {
	var user model.User

	if err := c.ShouldBindJSON(&user); err != nil {
		// err := errors.NewBadRequestError("invalid json body")
		// c.JSON(err.Status, err)
		return
	}

	result, saveErr := service.CreateUser(user)
	if saveErr != nil {
		// c.JSON(saveErr.Status, saveErr)
		return
	}

	c.JSON(http.StatusOK, result)
}

func (h *Handler) Login(c *gin.Context) {
	var user model.User

	if err := c.ShouldBindJSON(&user); err != nil {
		// err := errors.NewBadRequestError("invalid json")
		// c.JSON(err.Status, err)
		return
	}

	result, getErr := service.GetUser(user)
	if getErr != nil {
		return
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		// Issuer:    strconv.Itoa(int(result.UID)),
		ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
	})

	token, err := claims.SignedString([]byte(SecretKey))
	if err != nil {
		// err := errors.NewInternalServerError("login failed")
		// c.JSON(err.Status, err)
		return
	}

	c.SetCookie("jwt", token, 3600, "/", "localhost", false, true)

	c.JSON(http.StatusOK, result)
}

func (h *Handler) Get(c *gin.Context) {
	cookie, err := c.Cookie("jwt")
	if err != nil {
		// getErr := errors.NewInternalServerError("could not retrieve cookie")
		// c.JSON(getErr.Status, getErr)
		return
	}

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(*jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})
	if err != nil {
		// restErr := errors.NewInternalServerError("error parsing cookie")
		// c.JSON(restErr.Status, restErr)
		return
	}

	claims := token.Claims.(*jwt.StandardClaims)
	issuer, err := strconv.ParseInt(claims.Issuer, 10, 64)
	if err != nil {
		// restErr := errors.NewBadRequestError("user id should be a number")
		// c.JSON(restErr.Status, restErr)
		return
	}

	result, restErr := service.GetUserByID(issuer)
	if restErr != nil {
		// c.JSON(restErr.Status, restErr)
		return
	}

	c.JSON(http.StatusOK, result)
}

func (h *Handler) Logout(c *gin.Context) {
	c.SetCookie("jwt", "", -1, "", "", false, true)
	c.JSON(http.StatusOK, gin.H{
		"message": "success",
	})
}
