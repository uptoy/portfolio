package handler

import (
	"backend/model"
	"backend/model/mocks"
	"bytes"
	"encoding/json"
	// "fmt"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"

	// "mime/multipart"
	"net/http"
	"net/http/httptest"
	"strconv"
	"testing"
	"time"
)

func TestProductList(t *testing.T) {
	gin.SetMode(gin.TestMode)

	t.Run("Success", func(t *testing.T) {
		rr := httptest.NewRecorder()
		router := gin.Default()
		mockProductService := new(mocks.MockProductService)
		NewHandler(&Config{
			R:              router,
			ProductService: mockProductService,
		})

		p1 := model.Product{
			Id:            1,
			ProductName:   "product_name1",
			Slug:          "slug1",
			Brand:         "brand1",
			Price:         1,
			CategoryId:    1,
			CountInStock:  1,
			Description:   "description1",
			CreatedAt:     time.Now(),
			UpdatedAt:     time.Now(),
		}
		p2 := model.Product{
			Id:            2,
			ProductName:   "product_name2",
			Slug:          "slug2",
			Brand:         "brand2",
			Price:         2,
			CategoryId:    2,
			CountInStock:  2,
			Description:   "description2",
			CreatedAt:     time.Now(),
			UpdatedAt:     time.Now(),
		}
		p := []model.Product{p1, p2}
		mockProductService.On("ProductList", mock.AnythingOfType("*context.emptyCtx")).Return(p, nil)
		request, err := http.NewRequest(http.MethodGet, "/products", nil)
		// fmt.Println("err", err)
		assert.NoError(t, err)
		router.ServeHTTP(rr, request)

		respBody, err := json.Marshal(gin.H{
			"data": p,
		})
		// fmt.Println("err", err)
		assert.NoError(t, err)
		assert.Equal(t, http.StatusOK, rr.Code)
		// fmt.Println("http.StatusOK", http.StatusOK)
		assert.Equal(t, respBody, rr.Body.Bytes())
		// fmt.Println(string(respBody))
		// fmt.Println(rr.Body.String())
	})
}

func TestProductCreate(t *testing.T) {
	gin.SetMode(gin.TestMode)

	t.Run("Success", func(t *testing.T) {
		rr := httptest.NewRecorder()
		router := gin.Default()
		mockProductService := new(mocks.MockProductService)
		NewHandler(&Config{
			R:              router,
			ProductService: mockProductService,
		})
		json1 := &model.Product{
			ProductName:   "p1",
			Slug:          "s1",
			Brand:         "brand",
			Price:         1,
			CategoryId:    1,
			CountInStock:  1,
			Description:   "desc",
			CreatedAt:     time.Now(),
			UpdatedAt:     time.Now(),
		}
		reqBody, err := json.Marshal(gin.H{
			"product_name":   json1.ProductName,
			"slug":           json1.Slug,
			"brand":          json1.Brand,
			"price":          json1.Price,
			"category_id":    json1.CategoryId,
			"count_in_stock": json1.CountInStock,
			"description":    json1.Description,
			"created_at":     json1.CreatedAt,
			"updated_at":     json1.UpdatedAt,
		})
		// fmt.Println("err", err)
		assert.NoError(t, err)
		mockProductService.On("ProductCreate", mock.AnythingOfType("*context.emptyCtx"), mock.AnythingOfType("*model.Product")).Return(json1, nil)
		request, err := http.NewRequest(http.MethodPost, "/products", bytes.NewBuffer(reqBody))
		// fmt.Println("err", err)
		assert.NoError(t, err)
		router.ServeHTTP(rr, request)
		respBody, err := json.Marshal(gin.H{
			"product": json1,
		})
		// fmt.Println("err", err)
		assert.NoError(t, err)

		assert.Equal(t, http.StatusOK, rr.Code)
		// fmt.Println("http.StatusOK", http.StatusOK)
		assert.Equal(t, respBody, rr.Body.Bytes())
		// fmt.Println(string(respBody))
		// fmt.Println(rr.Body.String())
	})
}

func TestProductFindByID(t *testing.T) {
	gin.SetMode(gin.TestMode)
	t.Run("Success", func(t *testing.T) {
		rr := httptest.NewRecorder()
		router := gin.Default()
		mockProductService := new(mocks.MockProductService)
		NewHandler(&Config{
			R:              router,
			ProductService: mockProductService,
		})
		json1 := &model.Product{
			Id:            1,
			ProductName:   "p1",
			Slug:          "s1",
			Brand:         "brand",
			Price:         1,
			CategoryId:    1,
			CountInStock:  1,
			Description:   "desc",
			CreatedAt:     time.Now(),
			UpdatedAt:     time.Now(),
		}
		sid := strconv.Itoa(int(json1.Id))
		mockProductService.On("ProductFindByID", mock.AnythingOfType("*context.emptyCtx"), json1.Id).Return(json1, nil)
		request, err := http.NewRequest(http.MethodGet, "/products/"+sid, nil)
		// fmt.Println("err", err)
		assert.NoError(t, err)
		router.ServeHTTP(rr, request)
		respBody, err := json.Marshal(gin.H{
			"product": json1,
		})
		// fmt.Println("err", err)
		assert.NoError(t, err)
		assert.Equal(t, http.StatusOK, rr.Code)
		// fmt.Println("http.StatusOK", http.StatusOK)
		assert.Equal(t, respBody, rr.Body.Bytes())
		// fmt.Println(string(respBody))
		// fmt.Println(rr.Body.String())
	})
}

func TestProductFindByName(t *testing.T) {
	gin.SetMode(gin.TestMode)
	t.Run("Success", func(t *testing.T) {
		rr := httptest.NewRecorder()
		router := gin.Default()
		mockProductService := new(mocks.MockProductService)
		NewHandler(&Config{
			R:              router,
			ProductService: mockProductService,
		})
		json1 := &model.Product{
			Id:            1,
			ProductName:   "p1",
			Slug:          "s1",
			Brand:         "brand",
			Price:         1,
			CategoryId:    1,
			CountInStock:  1,
			Description:   "desc",
			CreatedAt:     time.Now(),
			UpdatedAt:     time.Now(),
		}
		name := json1.ProductName
		mockProductService.On("ProductFindByName", mock.AnythingOfType("*context.emptyCtx"), json1.ProductName).Return(json1, nil)
		request, err := http.NewRequest(http.MethodGet, "/products/search/"+name, nil)
		// fmt.Println("err", err)
		assert.NoError(t, err)
		router.ServeHTTP(rr, request)
		respBody, err := json.Marshal(gin.H{
			"product": json1,
		})
		// fmt.Println("err", err)
		assert.NoError(t, err)
		assert.Equal(t, http.StatusOK, rr.Code)
		// fmt.Println("http.StatusOK", http.StatusOK)
		assert.Equal(t, respBody, rr.Body.Bytes())
		// fmt.Println(string(respBody))
		// fmt.Println(rr.Body.String())
	})
}

func TestProductUpdate(t *testing.T) {
	gin.SetMode(gin.TestMode)

	t.Run("Success", func(t *testing.T) {
		rr := httptest.NewRecorder()
		router := gin.Default()
		mockProductService := new(mocks.MockProductService)
		NewHandler(&Config{
			R:              router,
			ProductService: mockProductService,
		})
		json1 := &model.Product{
			Id:            1,
			ProductName:   "p1",
			Slug:          "s1",
			Brand:         "brand",
			Price:         1,
			CategoryId:    1,
			CountInStock:  1,
			Description:   "desc",
			CreatedAt:     time.Now(),
			UpdatedAt:     time.Now(),
		}
		reqBody, err := json.Marshal(gin.H{
			"product_name":   json1.ProductName,
			"slug":           json1.Slug,
			"brand":          json1.Brand,
			"price":          json1.Price,
			"category_id":    json1.CategoryId,
			"count_in_stock": json1.CountInStock,
			"description":    json1.Description,
			"created_at":     json1.CreatedAt,
			"updated_at":     json1.UpdatedAt,
		})
		// fmt.Println("err", err)
		assert.NoError(t, err)
		sid := strconv.Itoa(int(json1.Id))
		mockProductService.On("ProductUpdate", mock.AnythingOfType("*context.emptyCtx"), json1.Id, mock.AnythingOfType("*model.Product")).Return(json1, nil)
		request, err := http.NewRequest(http.MethodPut, "/products/"+sid, bytes.NewBuffer(reqBody))
		// fmt.Println("err", err)
		assert.NoError(t, err)
		router.ServeHTTP(rr, request)
		respBody, err := json.Marshal(gin.H{
			"product": json1,
		})
		// fmt.Println("err", err)
		assert.NoError(t, err)
		assert.Equal(t, http.StatusOK, rr.Code)
		// fmt.Println("http.StatusOK", http.StatusOK)
		assert.Equal(t, respBody, rr.Body.Bytes())
		// fmt.Println(string(respBody))
		// fmt.Println(rr.Body.String())
	})
}

func TestProductDelete(t *testing.T) {
	gin.SetMode(gin.TestMode)

	t.Run("Success", func(t *testing.T) {
		rr := httptest.NewRecorder()
		router := gin.Default()
		mockProductService := new(mocks.MockProductService)
		NewHandler(&Config{
			R:              router,
			ProductService: mockProductService,
		})
		json1 := &model.Product{
			Id:            1,
			ProductName:   "p1",
			Slug:          "s1",
			Brand:         "brand",
			Price:         1,
			CategoryId:    1,
			CountInStock:  1,
			Description:   "desc",
			CreatedAt:     time.Now(),
			UpdatedAt:     time.Now(),
		}
		sid := strconv.Itoa(int(json1.Id))
		mockProductService.On("ProductDelete", mock.AnythingOfType("*context.emptyCtx"), json1.Id).Return(json1, nil)
		request, err := http.NewRequest(http.MethodDelete, "/products/"+sid, nil)
		// fmt.Println("err", err)
		assert.NoError(t, err)
		router.ServeHTTP(rr, request)
		respBody, err := json.Marshal(gin.H{
			"product": json1,
		})
		// fmt.Println("err", err)
		assert.NoError(t, err)
		assert.Equal(t, http.StatusOK, rr.Code)
		// fmt.Println("http.StatusOK", http.StatusOK)
		assert.Equal(t, respBody, rr.Body.Bytes())
		// fmt.Println(string(respBody))
		// fmt.Println(rr.Body.String())
	})
}
