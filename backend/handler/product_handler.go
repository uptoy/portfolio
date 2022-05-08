package handler

import (
	"backend/model"
	"strconv"

	"backend/model/apperrors"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *Handler) ProductList(c *gin.Context) {
	ctx := c.Request.Context()
	products, err := h.ProductService.ProductList(ctx)
	if err != nil {
		log.Printf("Unable to find products: %v", err)
		e := apperrors.NewNotFound("products", "err")
		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	for _, product := range products {
		productId := product.Id
		reviews, err := h.ReviewService.GetAll(ctx, productId)
		if err != nil {
			log.Printf("Unable to find reviews: %v", err)
			e := apperrors.NewNotFound("products", "err")
			c.JSON(e.Status(), gin.H{
				"error": e,
			})
			return
		}
		product.Reviews = reviews
	}
	c.JSON(http.StatusOK, gin.H{
		"data": products,
	})
}

func (h *Handler) ProductCreate(c *gin.Context) {
	form, err := c.MultipartForm()
	if err != nil {
		c.String(http.StatusBadRequest, "get form err: %s", err.Error())
		return
	}
	files := form.File["files"]
	value := form.Value
	product_name := value["product_name"][0]
	slug := value["slug"][0]
	brand := value["brand"][0]
	price, _ := strconv.Atoi(value["price"][0])
	category_id, _ := strconv.Atoi(value["category_id"][0])
	count_in_stock, _ := strconv.Atoi(value["count_in_stock"][0])
	description := value["description"][0]

	json := model.Product{
		ProductName:  product_name,
		Slug:         slug,
		Brand:        brand,
		Price:        int64(price),
		CategoryId:   int64(category_id),
		CountInStock: int64(count_in_stock),
		Description:  description,
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
		"data": product,
	})
}

func (h *Handler) ProductFindByID(c *gin.Context) {
	id := c.Param("id")
	uid, _ := strconv.ParseInt(id, 0, 64)
	ctx := c.Request.Context()
	p, err := h.ProductService.ProductFindByID(ctx, uid)
	if err != nil {
		log.Printf("Unable to get find prodcut by id : %v", err)
		e := apperrors.NewNotFound("product", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	reviews, err := h.ReviewService.GetAll(ctx, uid)
	p.Reviews = reviews
	if err != nil {
		log.Printf("Unable to find reviews: %v", err)
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

func (h *Handler) ProductUpdate(c *gin.Context) {
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

	json := model.Product{
		ProductName:  product_name,
		Slug:         slug,
		Brand:        brand,
		Price:        int64(price),
		CategoryId:   int64(category_id),
		CountInStock: int64(count_in_stock),
		Description:  description,
	}
	ctx := c.Request.Context()
	param := c.Param("id")
	id, err := strconv.ParseInt(param, 0, 64)
	if err != nil {
		log.Fatal("err", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	p, err := h.ProductService.ProductUpdate(ctx, id, &json, files)
	if err != nil {
		log.Printf("Unable to update product: %v", err)
		e := apperrors.NewNotFound("product", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	categoryId := p.CategoryId
	category, err := h.CategoryService.CategoryFindByID(ctx, categoryId)
	if err != nil {
		log.Printf("Unable to get category: %v", err)
		e := apperrors.NewNotFound("product", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	p.Category = category
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
			ProductName:  json.ProductName,
			Slug:         json.Slug,
			Brand:        json.Brand,
			Price:        json.Price,
			CategoryId:   json.CategoryId,
			CountInStock: json.CountInStock,
			Description:  json.Description,
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
