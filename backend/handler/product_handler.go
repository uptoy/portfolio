package handler

import (
	"backend/model"
	"backend/model/apperrors"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type productReq struct {
	ProductName   string `db:"product_name" json:"product_name"`
	Slug          string `db:"slug" json:"slug"`
	ProductImage  string `db:"product_image" json:"product_image"`
	Brand         string `db:"brand" json:"brand"`
	Price         int    `db:"price" json:"price"`
	CategoryName  string `db:"category_name" json:"category_name"`
	CountInStock  int    `db:"count_in_stock" json:"count_in_stock"`
	Description   string `db:"description" json:"description"`
	AverageRating int    `db:"average_rating" json:"average_rating"`
}

func (h *Handler) ProductCreate(c *gin.Context) {
	var req productReq
	if ok := bindData(c, &req); !ok {
		return
	}
	p := &model.Product{
		ProductName:   req.ProductName,
		Slug:          req.Slug,
		ProductImage:  req.ProductImage,
		Brand:         req.Brand,
		Price:         req.Price,
		CategoryName:  req.CategoryName,
		CountInStock:  req.CountInStock,
		Description:   req.Description,
		AverageRating: req.AverageRating,
	}
	ctx := c.Request.Context()
	product, err := h.ProductService.ProductCreate(ctx, p)
	if err != nil {
		log.Printf("Failed to create in product handler: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"product": product,
	})
}

func (h *Handler) ProductList(c *gin.Context) {
	ctx := c.Request.Context()
	products, err := h.ProductService.ProductList(ctx)
	if err != nil {
		log.Printf("Failed to list in product handler: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"products": products,
	})
}

func (h *Handler) ProductDetail(c *gin.Context) {
	id := c.Param("prodctId")
	uid, err := uuid.Parse(id)
	if err != nil {
		log.Printf("Failed get uid with produt detail: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	ctx := c.Request.Context()
	product, err := h.ProductService.ProductFindByID(ctx, uid)
	if err != nil {
		log.Printf("Failed to detail in product handler: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"products": product,
	})
}

func (h *Handler) ProductUpdate(c *gin.Context) {
	var req productReq
	id := c.Param("prodctId")
	uid, err := uuid.Parse(id)
	if err != nil {
		log.Printf("Failed get uid with produt update: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	if ok := bindData(c, &req); !ok {
		return
	}
	p := &model.Product{
		ProductName:   req.ProductName,
		Slug:          req.Slug,
		ProductImage:  req.ProductImage,
		Brand:         req.Brand,
		Price:         req.Price,
		CategoryName:  req.CategoryName,
		CountInStock:  req.CountInStock,
		Description:   req.Description,
		AverageRating: req.AverageRating,
	}
	ctx := c.Request.Context()
	product, err := h.ProductService.ProductUpdate(ctx, uid, p)
	if err != nil {
		log.Printf("Failed to update in product handler: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"product": product,
	})
}
func (h *Handler) ProductDelete(c *gin.Context) {
	id := c.Param("prodctId")
	uid, err := uuid.Parse(id)
	if err != nil {
		log.Printf("Failed get uid with produt delete: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	ctx := c.Request.Context()
	product, err := h.ProductService.ProductDelete(ctx, uid)
	if err != nil {
		log.Printf("Failed to delete in product handler: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"product": product,
	})
}

func (h *Handler) ProductSearch(c *gin.Context) {
	name := c.Param("slug")
	ctx := c.Request.Context()
	product, err := h.ProductService.ProductFindByName(ctx, name)
	if err != nil {
		log.Printf("Failed to delete in product handler: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"product": product,
	})
}
