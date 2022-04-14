package handler

import (
	"backend/model"
	// "fmt"
	// "fmt"
	// "log"
	"strconv"

	"backend/model/apperrors"
	// "net/http"
	// "path/filepath"

	// "github.com/google/uuid"
	// "io/ioutil"
	"log"
	// "mime/multipart"
	"net/http"

	"github.com/gin-gonic/gin"
	// "os"
	// "path/filepath"
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
		"data": p,
	})
}

func (h *Handler) ProductCreate(c *gin.Context) {
	form, _ := c.MultipartForm()
	files := form.File["file"]
	value := form.Value
	product_name := value["product_name"][0]
	slug := value["slug"][0]
	brand := value["brand"][0]
	price, _ := strconv.Atoi(value["price"][0])
	category_id, _ := strconv.Atoi(value["category_id"][0])
	count_in_stock, _ := strconv.Atoi(value["category_id"][0])
	description := value["description"][0]
	average_rating, _ := strconv.Atoi(value["average_rating"][0])

	json := model.Product{
		ProductName:   product_name,
		Slug:          slug,
		Brand:         brand,
		Price:         int64(price),
		CategoryId:    int64(category_id),
		CountInStock:  int64(count_in_stock),
		Description:   description,
		AverageRating: int64(average_rating),
	}
	ctx := c.Request.Context()
	product, err := h.ProductService.ProductCreate(ctx, &json, files)
	if err != nil {
		log.Printf("Failed to create product: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"product": product,
		"form":    form,
	})
}

func (h *Handler) ProductFindByID(c *gin.Context) {
	id := c.Param("id")
	uid, _ := strconv.ParseInt(id, 0, 64)
	ctx := c.Request.Context()
	p, err := h.ProductService.ProductFindByID(ctx, uid)
	if err != nil {
		log.Fatal("err", err)
		return
	}
	categoryId := p.CategoryId
	category, err := h.CategoryService.CategoryFindByID(ctx, categoryId)
	p.Category = category
	// fmt.Println(category)
	if err != nil {
		log.Fatal("err", err)
		// fmt.Println("err", err)
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
		// fmt.Println("err", err)
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
		// fmt.Println("err", err)
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
		"data": p,
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
		// fmt.Println("err", err)
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
		// fmt.Println("err", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"product count": result,
	})
}
