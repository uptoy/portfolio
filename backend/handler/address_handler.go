package handler

import (
	"log"
	"net/http"
	"strconv"

	"backend/model"
	"backend/model/apperrors"
	"github.com/gin-gonic/gin"
)

func (h *Handler) AddressUserCreate(c *gin.Context) {
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
	uid := user.(*model.User).UID

	var json model.Address
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	json = model.Address{
		Address: json.Address,
		City:    json.City,
		State:   json.State,
		Country: json.Country,
		ZIP:     json.ZIP,
	}

	address, err := h.AddressService.AddressCreate(ctx, uid, &json)
	if err != nil {
		log.Printf("Unable to create address: %v\n%v", uid, err)
		e := apperrors.NewNotFound("user", uid.String())

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"address": address,
	})
}
func (h *Handler) AddressListUserGet(c *gin.Context) {
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
	uid := user.(*model.User).UID
	addressList, err := h.AddressService.AddressList(ctx, uid)

	if err != nil {
		log.Printf("Unable to find user: %v\n%v", uid, err)
		e := apperrors.NewNotFound("user", uid.String())

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"addresslist": addressList,
	})
}
func (h *Handler) AddressUserGet(c *gin.Context) {
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
	uid := user.(*model.User).UID
	id := c.Param("id")
	addressId, _ := strconv.ParseInt(id, 0, 64)
	address, err := h.AddressService.AddressGet(ctx, uid, addressId)

	if err != nil {
		log.Printf("Unable to find user: %v\n%v", uid, err)
		e := apperrors.NewNotFound("user", uid.String())

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"address": address,
	})
}
func (h *Handler) AddressUserUpdate(c *gin.Context) {
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
	uid := user.(*model.User).UID
	var json model.Address
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	json = model.Address{
		Address: json.Address,
		City:    json.City,
		State:   json.State,
		Country: json.Country,
		ZIP:     json.ZIP,
	}
	id := c.Param("id")
	addressId, _ := strconv.ParseInt(id, 0, 64)
	address, err := h.AddressService.AddressUpdate(ctx, addressId, &json)

	if err != nil {
		log.Printf("Unable to find user: %v\n%v", uid, err)
		e := apperrors.NewNotFound("user", uid.String())

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"address": address,
	})
}
func (h *Handler) AddressUserDelete(c *gin.Context) {
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
	uid := user.(*model.User).UID
	id := c.Param("id")
	addressId, _ := strconv.ParseInt(id, 0, 64)
	err := h.AddressService.AddressDelete(ctx, addressId)
	if err != nil {
		log.Printf("Unable to find user: %v\n%v", uid, err)
		e := apperrors.NewNotFound("user", uid.String())

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"address": "delete",
	})
}
