package handler

import (
	"backend/mailer"
	"backend/model"
	"backend/model/apperrors"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

type forgotPasswordReq struct {
	Email string `json:"email" binding:"required"`
	Token string `json:"token" binding:"required"`
}

func (h *Handler) ForgotPassword(c *gin.Context) {
	var req forgotPasswordReq
	if ok := bindData(c, &req); !ok {
		return
	}
	forgot := &model.ResetPassword{
		Email: req.Email,
		Token: req.Token,
	}
	ctx := c.Request.Context()
	resetDetails, err := h.AuthService.ForgotPassword(ctx, forgot)
	if err != nil {
		log.Printf("Failed to reset password: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	res, err := mailer.SendMail.SendResetPassword(resetDetails.Email, os.Getenv("SENDGRID_FROM"), resetDetails.Token, os.Getenv("SENDGRID_API_KEY"), os.Getenv("APP_ENV"))
	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": res.RespBody,
	})
}

type resetPasswordReq struct {
	Email       string `json:"email" binding:"required"`
	NewPassword string `json:"new_password" binding:"required"`
	Token       string `json:"token" binding:"required"`
}

func (h *Handler) ResetPassword(c *gin.Context) {
	var req resetPasswordReq
	ctx := c.Request.Context()
	if ok := bindData(c, &req); !ok {
		return
	}
	reset := &model.ResetPassword{
		Email:       req.Email,
		NewPassword: req.NewPassword,
		Token:       req.Token,
	}
	err := h.AuthService.ResetPassword(ctx, reset)
	if err != nil {
		log.Printf("Failed to reset password: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"status": http.StatusNotFound,
			"error":  apperrors.Status(err),
		})
		c.JSON(http.StatusOK, gin.H{
			"status":   http.StatusOK,
			"response": "Success",
		})
	}
}
