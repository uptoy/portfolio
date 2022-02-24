package handler

import (
// 	"log"
// 	"net/http"

// 	"backend/model"
// 	"backend/model/apperrors"
// 	"errors"

	"github.com/gin-gonic/gin"
)

func (h *Handler) AddCartItem(c *gin.Context) {
}
func (h *Handler) RemoveCartItem(c *gin.Context) {
}
func (h *Handler) GetCartItem(c *gin.Context) {
}

func (h *Handler) UpdateCartItem(c *gin.Context) {
}
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


// //TODO CART
// func (h *Handler) GetCartItem(c *gin.Context) {
// 	fmt.Println("get cart product")
// }

// func (h *Handler) RemoveCartItem(c *gin.Context) {
// 	fmt.Println("remove cart product")
	// productId := c.Query("id")
	// if productId == "" {
	// 	log.Panicln("product id is empty")
	// 	_ = c.AbortWithError(http.StatusBadRequest, errors.New("product id is empty"))
	// 	return
	// }

	// if userId == "" {
	// 	log.Panicln("user id is empty")
	// 	_ = c.AbortWithError(http.StatusBadRequest, errors.New("user id is empty"))
	// 	return
	// }
	// // productId,err := getID
	// if err != nil {
	// 	log.Println(err)
	// 	c.AbortWithStatus(http.StatusInternalServerError)
	// 	return
	// }
	// ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
	// defer cancel()
	// err := database.RemoveCartItem(ctx, productId, userId)
	// if err != nil {
	// 	c.IndentedJSON(http.StatusInternalServerError, err)
	// }
	// c.IndentedJSON(200, "Successfully removed item from cart")

// }

// func (h *Handler) AddCartItem(c *gin.Context) {
	// 	fmt.Println("add cart product")
	// productId := c.Query("id")
	// if productId == "" {
	// 	log.Panicln("product id is empty")
	// 	_ = c.AbortWithError(http.StatusBadRequest, errors.New("product id is empty"))
	// 	return
	// }

	// if userId == "" {
	// 	log.Panicln("user id is empty")
	// 	_ = c.AbortWithError(http.StatusBadRequest, errors.New("user id is empty"))
	// 	return
	// }
	// // productId,err := getID
	// if err != nil {
	// 	log.Println(err)
	// 	c.AbortWithStatus(http.StatusInternalServerError)
	// 	return
	// }
	// ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
	// defer cancel()
	// err := database.RemoveCartItem(ctx, productId, userId)
	// if err != nil {
	// 	c.IndentedJSON(http.StatusInternalServerError, err)
	// }
	// c.IndentedJSON(200, "Successfully removed item from cart")

// }

// func (h *Handler) BuyFromCart(c *gin.Context) {
// 	fmt.Println("buy from cart ")

// }
