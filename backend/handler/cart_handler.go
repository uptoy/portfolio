package handler

// import (
// 	"log"
// 	"net/http"

// 	"backend/model"
// 	"backend/model/apperrors"
// 	"errors"

// 	"github.com/gin-gonic/gin"
// )

// func (h *Handler) AddCart(c *gin.Context) {
// 	productId := c.Query("id")
// 	if productId == "" {
// 		log.Println("product id is empty")

// 		_ = c.AbortWithError(http.StatusBadRequest, errors.New("product id is empty"))
// 		return
// 	}
// 	userId := c.Query("userID")
// 	if userId == "" {
// 		log.Println("user id is empty")

// 		_ = c.AbortWithError(http.StatusBadRequest, errors.New("user id is empty"))
// 		return
// 	}
// 	var req detailsReq

// 	if ok := bindData(c, &req); !ok {
// 		return
// 	}

// 	// Should be returned with current imageURL
// 	u := &model.User{
// 		UID:     authUser.UID,
// 		Name:    req.Name,
// 		Email:   req.Email,
// 		Website: req.Website,
// 	}

// 	ctx := c.Request.Context()
// 	err := h.UserService.UpdateDetails(ctx, u)

// 	if err != nil {
// 		log.Printf("Failed to update user: %v\n", err.Error())

// 		c.JSON(apperrors.Status(err), gin.H{
// 			"error": err,
// 		})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{
// 		"user": u,
// 	})
// }

// func (h *Handler) RemoveCart(c *gin.Context) {
// 	productId := c.Query("id")
// 	if productId == "" {
// 		log.Println("product id is empty")

// 		_ = c.AbortWithError(http.StatusBadRequest, errors.New("product id is empty"))
// 		return
// 	}
// 	userId := c.Query("userID")
// 	if userId == "" {
// 		log.Println("user id is empty")

// 		_ = c.AbortWithError(http.StatusBadRequest, errors.New("user id is empty"))
// 		return
// 	}
// 	var req detailsReq

// 	if ok := bindData(c, &req); !ok {
// 		return
// 	}

// 	// Should be returned with current imageURL
// 	u := &model.User{
// 		UID:     authUser.UID,
// 		Name:    req.Name,
// 		Email:   req.Email,
// 		Website: req.Website,
// 	}

// 	ctx := c.Request.Context()
// 	err := h.UserService.UpdateDetails(ctx, u)

// 	if err != nil {
// 		log.Printf("Failed to update user: %v\n", err.Error())

// 		c.JSON(apperrors.Status(err), gin.H{
// 			"error": err,
// 		})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{
// 		"user": u,
// 	})
// }
