package handler

import (
	"log"
	"net/http"

	"backend/model"
	"backend/model/apperrors"
	"github.com/gin-gonic/gin"
)

// omitempty must be listed first (tags evaluated sequentially, it seems)
type detailsReq struct {
	Username   string `json:"username" binding:"omitempty,max=50"`
	Email      string `json:"email" binding:"required,email"`
	ProfileUrl string `json:"profile_url" binding:"omitempty,url"`
}

// Details handler
func (h *Handler) Details(c *gin.Context) {
	authUser := c.MustGet("user").(*model.User)

	var req detailsReq

	if ok := bindData(c, &req); !ok {
		return
	}

	// Should be returned with current imageURL
	u := &model.User{
		UID:        authUser.UID,
		Username:   req.Username,
		Email:      req.Email,
		ProfileUrl: req.ProfileUrl,
	}

	ctx := c.Request.Context()
	err := h.UserService.UpdateDetails(ctx, u)

	if err != nil {
		log.Printf("Failed to update user: %v\n", err.Error())

		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"user": u,
	})
}
