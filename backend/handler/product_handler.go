package handler

import (
	"backend/model"
	"fmt"
	"log"
	"strconv"

	"backend/model/apperrors"
	"github.com/google/uuid"
	"net/http"
	"path/filepath"

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
		Brand:         json.Brand,
		Price:         json.Price,
		CategoryId:    json.CategoryId,
		CountInStock:  json.CountInStock,
		Description:   json.Description,
		AverageRating: json.AverageRating,
	}
	//image
	form, _ := c.MultipartForm()
	images := form.File["images[]"]

	filepaths := make([]string, 0)
	for _, file := range images {
		log.Println(file.Filename)
		filename := uuid.New().String() + filepath.Ext(file.Filename)
		filepath := "./images/" + filename
		c.SaveUploadedFile(file, filepath)
		filepaths = append(filepaths, filename)
		fmt.Println("names", filepaths)
	}
	ctx := c.Request.Context()
	product, err := h.ProductService.ProductCreate(ctx, &json, filepaths)
	if err != nil {
		log.Printf("Failed to create product: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"product": product,
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
		Brand:         json.Brand,
		Price:         json.Price,
		CategoryId:    json.CategoryId,
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

func (h *Handler) ProductBulkDelete(c *gin.Context) {
	ctx := c.Request.Context()
	p, err := h.ProductService.BulkDelete(ctx)
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

func (h *Handler) ProductBulkInsert(c *gin.Context) {
	var jsons []model.Product
	if err := c.ShouldBindJSON(&jsons); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	products := []model.Product{}
	for _, json := range jsons {
		products = append(products, model.Product{
			ProductName:   json.ProductName,
			Slug:          json.Slug,
			Brand:         json.Brand,
			Price:         json.Price,
			CategoryId:    json.CategoryId,
			CountInStock:  json.CountInStock,
			Description:   json.Description,
			AverageRating: json.AverageRating,
		},
		)
	}
	ctx := c.Request.Context()
	result, err := h.ProductService.BulkInsert(ctx, products)
	if err != nil {
		log.Printf("Failed to create products: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"products": result,
	})
}

func (h *Handler) ProductJoin(c *gin.Context) {
	id := c.Param("id")
	uid, _ := strconv.ParseInt(id, 0, 64)
	ctx := c.Request.Context()
	p, err := h.ProductService.ProductFindByIDJoin(ctx, uid)
	if err != nil {
		log.Fatal("err", err)
		fmt.Println("err", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"product": p,
	})
}

func (h *Handler) ProductCount(c *gin.Context) {
	ctx := c.Request.Context()
	result, err := h.ProductService.ProductCount(ctx)
	if err != nil {
		log.Fatal("err", err)
		fmt.Println("err", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"product count": result,
	})
}
