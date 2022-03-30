package handler

import (
	"backend/model"
	"fmt"
	"log"

	"backend/model/apperrors"
	"net/http"
	// // "fmt"

	"github.com/gin-gonic/gin"
)

func (h *Handler) AddressList(c *gin.Context) {
	ctx := c.Request.Context()
	user, exists := c.Get("user")
	if !exists {
		log.Printf("Unable to extract user from request context for unknown reason: %v\n", c)
		err := apperrors.NewInternal()
		c.JSON(err.Status(), gin.H{
			"error": err,
		})
		return
	}
	userId := user.(*model.User).UserId
	addresslist, err := h.AddressService.AddressList(ctx, userId)
	if err != nil {
		log.Printf("Unable to find addresslist: %v", err)
		e := apperrors.NewNotFound("addresslist", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"jsons": addresslist,
	})

}
func (h *Handler) AddressCreate(c *gin.Context) {
	ctx := c.Request.Context()
	user, exists := c.Get("user")
	if !exists {
		log.Printf("Unable to extract user from request context for unknown reason: %v\n", c)
		err := apperrors.NewInternal()
		c.JSON(err.Status(), gin.H{
			"error": err,
		})
		return
	}
	userId := user.(*model.User).UserId
	var json model.Address
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	json = model.Address{
		Line1:     json.Line1,
		Line2:     json.Line2,
		City:      json.City,
		Country:   json.Country,
		State:     json.State,
		ZIP:       json.ZIP,
		Latitude:  json.Latitude,
		Longitude: json.Longitude,
		Phone:     json.Phone,
	}
	address, _ := h.AddressService.AddressCreate(ctx, userId, &json)

	c.JSON(http.StatusOK, gin.H{
		"address": address,
	})

}
func (h *Handler) AddressFindByID(c *gin.Context) {
	ctx := c.Request.Context()
	user, exists := c.Get("user")
	if !exists {
		log.Printf("Unable to extract user from request context for unknown reason: %v\n", c)
		err := apperrors.NewInternal()
		c.JSON(err.Status(), gin.H{
			"error": err,
		})

		return
	}
	addressId := user.(*model.Address).ID
	address, err := h.AddressService.AddressFindByID(ctx, addressId)
	if err != nil {
		log.Fatal("err", err)
		fmt.Println("err", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"address": address,
	})

}
func (h *Handler) AddressUpdate(c *gin.Context) {
	ctx := c.Request.Context()
	user, exists := c.Get("user")
	if !exists {
		log.Printf("Unable to extract user from request context for unknown reason: %v\n", c)
		err := apperrors.NewInternal()
		c.JSON(err.Status(), gin.H{
			"error": err,
		})

		return
	}
	addressId := user.(*model.Address).ID
	var json model.Address
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	json = model.Address{
		Line1:     json.Line1,
		Line2:     json.Line2,
		City:      json.City,
		Country:   json.Country,
		State:     json.State,
		ZIP:       json.ZIP,
		Latitude:  json.Latitude,
		Longitude: json.Longitude,
		Phone:     json.Phone,
	}
	address, err := h.AddressService.AddressUpdate(ctx, addressId, &json)
	if err != nil {
		log.Fatal("err", err)
		fmt.Println("err", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"address": address,
	})
}
func (h *Handler) AddressDelete(c *gin.Context) {
	ctx := c.Request.Context()
	user, exists := c.Get("user")
	if !exists {
		log.Printf("Unable to extract user from request context for unknown reason: %v\n", c)
		err := apperrors.NewInternal()
		c.JSON(err.Status(), gin.H{
			"error": err,
		})

		return
	}
	addressId := user.(*model.Address).ID
	address, err := h.AddressService.AddressDelete(ctx, addressId)
	if err != nil {
		log.Fatal("err", err)
		fmt.Println("err", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"address": address,
	})
}
