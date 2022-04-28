package handler

import (
	"log"

	"backend/model/apperrors"
	"net/http"

	// // "fmt"

	"github.com/gin-gonic/gin"
)

func (h *Handler) Payment(c *gin.Context) {
	ctx := c.Request.Context()
	type reqPayment struct {
		Email  string
		Amount int64
	}
	var json reqPayment
	amount := json.Amount
	email := json.Email
	err := h.PaymentService.Payment(ctx, amount, email)
	if err != nil {
		log.Printf("Unable to find products: %v", err)
		e := apperrors.NewNotFound("products", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": "paid",
	})

}
