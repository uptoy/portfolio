package handler

import (
	"github.com/gin-gonic/gin"
)


func (h *Handler)VerifyUserEmail(c *gin.Context){}
func (h *Handler)SendVerificationEmail(c *gin.Context){}
func (h *Handler)ResetPassword(c *gin.Context){}
func (h *Handler)SendPasswordResetEmail(c *gin.Context){}
