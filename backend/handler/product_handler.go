package handler

import (
	"backend/model"
	"fmt"
	"log"
	"strconv"

	"backend/model/apperrors"
	"net/http"
	// // "fmt"

	"github.com/gin-gonic/gin"
)

func (h *Handler) ProductList(c *gin.Context) {
	ctx := c.Request.Context()
	p, err := h.ProductService.ProductList(ctx)
	if err != nil {
		log.Printf("Unable to find products: %v", err)
		e := apperrors.NewNotFound("products", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"jsons": p,
	})
}

func (h *Handler) ProductCreate(c *gin.Context) {
	var json model.Product
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	json = model.Product{
		ProductName:   json.ProductName,
		Slug:          json.Slug,
		ProductImage:  json.ProductImage,
		Brand:         json.Brand,
		Price:         json.Price,
		CategoryName:  json.CategoryName,
		CountInStock:  json.CountInStock,
		Description:   json.Description,
		AverageRating: json.AverageRating,
	}
	ctx := c.Request.Context()
	p, _ := h.ProductService.ProductCreate(ctx, &json)

	c.JSON(http.StatusOK, gin.H{
		"product": p,
	})
}

func (h *Handler) ProductFindByID(c *gin.Context) {
	id := c.Param("id")
	uid, _ := strconv.ParseInt(id, 0, 64)
	ctx := c.Request.Context()
	p, err := h.ProductService.ProductFindByID(ctx, uid)
	if err != nil {
	log.Fatal("err", err)
	fmt.Println("err", err)
	return
}
	c.JSON(http.StatusOK, gin.H{
		"product": p,
	})
}

func (h *Handler) ProductUpdate(c *gin.Context) {
	ctx := c.Request.Context()
	var json model.Product
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	id := c.Param("id")
	uid, err := strconv.ParseInt(id, 0, 64)
	if err != nil {
		log.Fatal("err", err)
		fmt.Println("err", err)
		return
	}
	p1 := &model.Product{
		ProductName:   json.ProductName,
		Slug:          json.Slug,
		ProductImage:  json.ProductImage,
		Brand:         json.Brand,
		Price:         json.Price,
		CategoryName:  json.CategoryName,
		CountInStock:  json.CountInStock,
		Description:   json.Description,
		AverageRating: json.AverageRating,
	}
	p, err := h.ProductService.ProductUpdate(ctx, uid, p1)
	if err != nil {
		log.Printf("Unable to update product: %v", err)
		e := apperrors.NewNotFound("product", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"product": p,
	})
}

func (h *Handler) ProductDelete(c *gin.Context) {
	ctx := c.Request.Context()
	id := c.Param("id")
	uid, err := strconv.ParseInt(id, 0, 64)
	if err != nil {
		log.Fatal("err", err)
		fmt.Println("err", err)
		return
	}
	p, err := h.ProductService.ProductDelete(ctx, uid)
	if err != nil {
		log.Printf("Unable to delete product: %v", err)
		e := apperrors.NewNotFound("product", "err")
		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"product": p,
	})
}

func (h *Handler) ProductFindByName(c *gin.Context) {
	ctx := c.Request.Context()
	name := c.Param("name")
	p, err := h.ProductService.ProductFindByName(ctx, name)
	if err != nil {
		log.Fatal(err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"product": p,
	})
}
