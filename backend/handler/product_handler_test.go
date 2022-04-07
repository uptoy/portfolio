package handler

// import (
// 	"backend/model"
// 	"backend/model/mocks"
// 	"bytes"
// 	"encoding/json"
// 	"fmt"
// 	"github.com/gin-gonic/gin"
// 	"github.com/stretchr/testify/assert"
// 	"github.com/stretchr/testify/mock"
// 	"net/http"
// 	"net/http/httptest"
// 	"strconv"
// 	"testing"
// 	"time"
// )

// func TestProductList(t *testing.T) {
// 	gin.SetMode(gin.TestMode)

// 	t.Run("Success", func(t *testing.T) {
// 		rr := httptest.NewRecorder()
// 		router := gin.Default()
// 		mockProductService := new(mocks.MockProductService)
// 		NewHandler(&Config{
// 			R:              router,
// 			ProductService: mockProductService,
// 		})

// 		p1 := model.Product{
// 			ProductId:     1,
// 			ProductName:   "product_name1",
// 			Slug:          "slug1",
// 			ProductImage:  "http://placehold.jp/150x150.png",
// 			Brand:         "brand1",
// 			Price:         1,
// 			CategoryName:  "category_name1",
// 			CountInStock:  1,
// 			Description:   "description1",
// 			AverageRating: 1,
// 			CreatedAt:     time.Now(),
// 			UpdatedAt:     time.Now(),
// 		}
// 		p2 := model.Product{
// 			ProductId:     2,
// 			ProductName:   "product_name2",
// 			Slug:          "slug2",
// 			ProductImage:  "http://placehold.jp/150x150.png",
// 			Brand:         "brand2",
// 			Price:         2,
// 			CategoryName:  "category_name2",
// 			CountInStock:  2,
// 			Description:   "description2",
// 			AverageRating: 2,
// 			CreatedAt:     time.Now(),
// 			UpdatedAt:     time.Now(),
// 		}
// 		p := []model.Product{p1, p2}
// 		mockProductService.On("ProductList", mock.AnythingOfType("*context.emptyCtx")).Return(p, nil)
// 		request, err := http.NewRequest(http.MethodGet, "/products", nil)
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		router.ServeHTTP(rr, request)

// 		respBody, err := json.Marshal(gin.H{
// 			"jsons": p,
// 		})
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		assert.Equal(t, http.StatusOK, rr.Code)
// 		fmt.Println("http.StatusOK", http.StatusOK)
// 		assert.Equal(t, respBody, rr.Body.Bytes())
// 		fmt.Println(string(respBody))
// 		fmt.Println(rr.Body.String())
// 	})
// }

// func TestProductCreate(t *testing.T) {
// 	gin.SetMode(gin.TestMode)

// 	t.Run("Success", func(t *testing.T) {
// 		rr := httptest.NewRecorder()
// 		router := gin.Default()
// 		mockProductService := new(mocks.MockProductService)
// 		NewHandler(&Config{
// 			R:              router,
// 			ProductService: mockProductService,
// 		})
// 		json1 := &model.Product{
// 			ProductName:   "p1",
// 			Slug:          "s1",
// 			ProductImage:  "http://placehold.jp/150x150.png",
// 			Brand:         "brand",
// 			Price:         1,
// 			CategoryName:  "category1",
// 			CountInStock:  1,
// 			Description:   "desc",
// 			AverageRating: 1,
// 			CreatedAt:     time.Now(),
// 			UpdatedAt:     time.Now(),
// 		}
// 		reqBody, err := json.Marshal(gin.H{
// 			"product_name":   json1.ProductName,
// 			"slug":           json1.Slug,
// 			"product_image":  json1.ProductImage,
// 			"brand":          json1.Brand,
// 			"price":          json1.Price,
// 			"category_name":  json1.CategoryName,
// 			"count_in_stock": json1.CountInStock,
// 			"description":    json1.Description,
// 			"average_rating": json1.AverageRating,
// 			"created_at":     json1.CreatedAt,
// 			"updated_at":     json1.UpdatedAt,
// 		})
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		mockProductService.On("ProductCreate", mock.AnythingOfType("*context.emptyCtx"), mock.AnythingOfType("*model.Product")).Return(json1, nil)
// 		request, err := http.NewRequest(http.MethodPost, "/products", bytes.NewBuffer(reqBody))
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		router.ServeHTTP(rr, request)
// 		respBody, err := json.Marshal(gin.H{
// 			"product": json1,
// 		})
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)

// 		assert.Equal(t, http.StatusOK, rr.Code)
// 		fmt.Println("http.StatusOK", http.StatusOK)
// 		assert.Equal(t, respBody, rr.Body.Bytes())
// 		fmt.Println(string(respBody))
// 		fmt.Println(rr.Body.String())
// 	})
// }

// func TestProductFindByID(t *testing.T) {
// 	gin.SetMode(gin.TestMode)
// 	t.Run("Success", func(t *testing.T) {
// 		rr := httptest.NewRecorder()
// 		router := gin.Default()
// 		mockProductService := new(mocks.MockProductService)
// 		NewHandler(&Config{
// 			R:              router,
// 			ProductService: mockProductService,
// 		})
// 		json1 := &model.Product{
// 			ProductId:     1,
// 			ProductName:   "p1",
// 			Slug:          "s1",
// 			ProductImage:  "http://placehold.jp/150x150.png",
// 			Brand:         "brand",
// 			Price:         1,
// 			CategoryName:  "category1",
// 			CountInStock:  1,
// 			Description:   "desc",
// 			AverageRating: 1,
// 			CreatedAt:     time.Now(),
// 			UpdatedAt:     time.Now(),
// 		}
// 		sid := strconv.Itoa(int(json1.ProductId))
// 		mockProductService.On("ProductFindByID", mock.AnythingOfType("*context.emptyCtx"), json1.ProductId).Return(json1, nil)
// 		request, err := http.NewRequest(http.MethodGet, "/products/"+sid, nil)
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		router.ServeHTTP(rr, request)
// 		respBody, err := json.Marshal(gin.H{
// 			"product": json1,
// 		})
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		assert.Equal(t, http.StatusOK, rr.Code)
// 		fmt.Println("http.StatusOK", http.StatusOK)
// 		assert.Equal(t, respBody, rr.Body.Bytes())
// 		fmt.Println(string(respBody))
// 		fmt.Println(rr.Body.String())
// 	})
// }

// func TestProductFindByName(t *testing.T) {
// 	gin.SetMode(gin.TestMode)
// 	t.Run("Success", func(t *testing.T) {
// 		rr := httptest.NewRecorder()
// 		router := gin.Default()
// 		mockProductService := new(mocks.MockProductService)
// 		NewHandler(&Config{
// 			R:              router,
// 			ProductService: mockProductService,
// 		})
// 		json1 := &model.Product{
// 			ProductId:     1,
// 			ProductName:   "p1",
// 			Slug:          "s1",
// 			ProductImage:  "http://placehold.jp/150x150.png",
// 			Brand:         "brand",
// 			Price:         1,
// 			CategoryName:  "category1",
// 			CountInStock:  1,
// 			Description:   "desc",
// 			AverageRating: 1,
// 			CreatedAt:     time.Now(),
// 			UpdatedAt:     time.Now(),
// 		}
// 		name := json1.ProductName
// 		mockProductService.On("ProductFindByName", mock.AnythingOfType("*context.emptyCtx"), json1.ProductName).Return(json1, nil)
// 		request, err := http.NewRequest(http.MethodGet, "/products/search/"+name, nil)
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		router.ServeHTTP(rr, request)
// 		respBody, err := json.Marshal(gin.H{
// 			"product": json1,
// 		})
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		assert.Equal(t, http.StatusOK, rr.Code)
// 		fmt.Println("http.StatusOK", http.StatusOK)
// 		assert.Equal(t, respBody, rr.Body.Bytes())
// 		fmt.Println(string(respBody))
// 		fmt.Println(rr.Body.String())
// 	})
// }

// func TestProductUpdate(t *testing.T) {
// 	gin.SetMode(gin.TestMode)

// 	t.Run("Success", func(t *testing.T) {
// 		rr := httptest.NewRecorder()
// 		router := gin.Default()
// 		mockProductService := new(mocks.MockProductService)
// 		NewHandler(&Config{
// 			R:              router,
// 			ProductService: mockProductService,
// 		})
// 		json1 := &model.Product{
// 			ProductId:     1,
// 			ProductName:   "p1",
// 			Slug:          "s1",
// 			ProductImage:  "http://placehold.jp/150x150.png",
// 			Brand:         "brand",
// 			Price:         1,
// 			CategoryName:  "category1",
// 			CountInStock:  1,
// 			Description:   "desc",
// 			AverageRating: 1,
// 			CreatedAt:     time.Now(),
// 			UpdatedAt:     time.Now(),
// 		}
// 		reqBody, err := json.Marshal(gin.H{
// 			"product_name":   json1.ProductName,
// 			"slug":           json1.Slug,
// 			"product_image":  json1.ProductImage,
// 			"brand":          json1.Brand,
// 			"price":          json1.Price,
// 			"category_name":  json1.CategoryName,
// 			"count_in_stock": json1.CountInStock,
// 			"description":    json1.Description,
// 			"average_rating": json1.AverageRating,
// 			"created_at":     json1.CreatedAt,
// 			"updated_at":     json1.UpdatedAt,
// 		})
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		sid := strconv.Itoa(int(json1.ProductId))
// 		mockProductService.On("ProductUpdate", mock.AnythingOfType("*context.emptyCtx"), json1.ProductId, mock.AnythingOfType("*model.Product")).Return(json1, nil)
// 		request, err := http.NewRequest(http.MethodPut, "/products/"+sid, bytes.NewBuffer(reqBody))
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		router.ServeHTTP(rr, request)
// 		respBody, err := json.Marshal(gin.H{
// 			"product": json1,
// 		})
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		assert.Equal(t, http.StatusOK, rr.Code)
// 		fmt.Println("http.StatusOK", http.StatusOK)
// 		assert.Equal(t, respBody, rr.Body.Bytes())
// 		fmt.Println(string(respBody))
// 		fmt.Println(rr.Body.String())
// 	})
// }

// func TestProductDelete(t *testing.T) {
// 	gin.SetMode(gin.TestMode)

// 	t.Run("Success", func(t *testing.T) {
// 		rr := httptest.NewRecorder()
// 		router := gin.Default()
// 		mockProductService := new(mocks.MockProductService)
// 		NewHandler(&Config{
// 			R:              router,
// 			ProductService: mockProductService,
// 		})
// 		json1 := &model.Product{
// 			ProductId:     1,
// 			ProductName:   "p1",
// 			Slug:          "s1",
// 			ProductImage:  "http://placehold.jp/150x150.png",
// 			Brand:         "brand",
// 			Price:         1,
// 			CategoryName:  "category1",
// 			CountInStock:  1,
// 			Description:   "desc",
// 			AverageRating: 1,
// 			CreatedAt:     time.Now(),
// 			UpdatedAt:     time.Now(),
// 		}
// 		sid := strconv.Itoa(int(json1.ProductId))
// 		mockProductService.On("ProductDelete", mock.AnythingOfType("*context.emptyCtx"), json1.ProductId).Return(json1, nil)
// 		request, err := http.NewRequest(http.MethodDelete, "/products/"+sid, nil)
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		router.ServeHTTP(rr, request)
// 		respBody, err := json.Marshal(gin.H{
// 			"product": json1,
// 		})
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		assert.Equal(t, http.StatusOK, rr.Code)
// 		fmt.Println("http.StatusOK", http.StatusOK)
// 		assert.Equal(t, respBody, rr.Body.Bytes())
// 		fmt.Println(string(respBody))
// 		fmt.Println(rr.Body.String())
// 	})
// }
