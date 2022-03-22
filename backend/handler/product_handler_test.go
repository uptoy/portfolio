package handler

import (
	"bytes"
	"encoding/json"
	// "fmt"

	// "fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	// "backend/model/apperrors"
	"backend/model"
	"backend/model/mocks"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/mock"

	"github.com/stretchr/testify/assert"
)

func TestProductCreate(t *testing.T) {
	gin.SetMode(gin.TestMode)
	t.Run("Success", func(t *testing.T) {
		p := &model.Product{
			ProductName:   "product_name",
			Slug:          "slug",
			ProductImage:  "https://www.imageURL.com/1234",
			Brand:         "brand",
			Price:         0,
			CategoryName:  "category_name",
			CountInStock:  0,
			Description:   "description",
			AverageRating: 4,
		}
		mockProductService := new(mocks.MockProductService)
		mockProductService.
			On("ProductCreate", mock.AnythingOfType("*context.emptyCtx"), p).
			Return(p, nil)
		rr := httptest.NewRecorder()
		router := gin.Default()
		NewHandler(&Config{
			R:              router,
			ProductService: mockProductService,
		})
		reqBody, err := json.Marshal(gin.H{
			"product_id":     p.ProductId,
			"product_name":   p.ProductName,
			"slug":           p.Slug,
			"product_image":  p.ProductImage,
			"brand":          p.Brand,
			"price":          p.Price,
			"category_name":  p.CategoryName,
			"count_in_stock": p.CountInStock,
			"description":    p.Description,
			"average_rating": p.AverageRating,
		})
		assert.NoError(t, err)
		request, err := http.NewRequest(http.MethodPost, "/products", bytes.NewBuffer(reqBody))
		request.Header.Set("Content-Type", "application/json")
		assert.NoError(t, err)
		router.ServeHTTP(rr, request)
		// respBody, _ := json.Marshal(gin.H{
		// 	"product": product,
		// })
		// assert.Equal(t, respBody, rr.Body.Bytes())
		// assert.Equal(t, http.StatusOK, rr.Code)
		// mockProductService.AssertExpectations(t)
	})
}

// // func TestProductList(t *testing.T) {
// // 	gin.SetMode(gin.TestMode)
// // 	t.Run("Success", func(t *testing.T) {
// // 		uid, _ := uuid.NewRandom()
// // 		mockProduct0 := &model.Product{
// // 			ProductId:     uid,
// // 			ProductName:   "product_name0",
// // 			Slug:          "slug0",
// // 			ProductImage:  "http://placehold.jp/149x150.png",
// // 			Brand:         "brand0",
// // 			Price:         0,
// // 			CategoryName:  "category_name0",
// // 			CountInStock:  0,
// // 			Description:   "description0",
// // 			AverageRating: 0,
// // 		}
// // 		mockProduct1 := &model.Product{
// // 			ProductId:     uid,
// // 			ProductName:   "product_name1",
// // 			Slug:          "slug1",
// // 			ProductImage:  "http://placehold.jp/149x150.png",
// // 			Brand:         "brand1",
// // 			Price:         1,
// // 			CategoryName:  "category_name1",
// // 			CountInStock:  1,
// // 			Description:   "description1",
// // 			AverageRating: 1,
// // 		}
// // 		mockProductList := []*model.Product{mockProduct0, mockProduct2}
// // 		mockProductService := new(mocks.MockProductService)
// // 		mockProductService.On("ProductList", mock.AnythingOfType("*context.emptyCtx")).Return(mockProductList, nil)
// // 		rr := httptest.NewRecorder()
// // 		router := gin.Default()
// // 		NewHandler(&Config{
// // 			R:              router,
// // 			ProductService: mockProductService,
// // 		})
// // 		request, err := http.NewRequest(http.MethodGet, "/products", nil)
// // 		assert.NoError(t, err)
// // 		router.ServeHTTP(rr, request)
// // 		respBody, err := json.Marshal(gin.H{
// // 			"productlist": mockProductList,
// // 		})
// // 		assert.NoError(t, err)
// // 		assert.Equal(t, http.StatusOK, rr.Code)
// // 		assert.Equal(t, respBody, rr.Body.Bytes())
// // 		mockProductService.AssertExpectations(t)
// // 	})
// // }

// // func TestProductFindByID(t *testing.T) {
// // 	// Setup
// // 	gin.SetMode(gin.TestMode)
// // 	t.Run("Success", func(t *testing.T) {
// // 		uid, _ := uuid.NewRandom()
// // 		mockProduct := &model.Product{
// // 			ProductId:     uid,
// // 			ProductName:   "product_name",
// // 			Slug:          "slug",
// // 			ProductImage:  "http://placehold.jp/149x150.png",
// // 			Brand:         "brand",
// // 			Price:         0,
// // 			CategoryName:  "category_name",
// // 			CountInStock:  0,
// // 			Description:   "description",
// // 			AverageRating: 4,
// // 		}
// // 		mockProductService := new(mocks.MockProductService)
// // 		mockProductService.On("ProductFindByID", mock.AnythingOfType("*context.emptyCtx"), uid).Return(mockProduct, nil)
// // 		rr := httptest.NewRecorder()
// // 		router := gin.Default()
// // 		NewHandler(&Config{
// // 			R:              router,
// // 			ProductService: mockProductService,
// // 		})
// // 		request, err := http.NewRequest(http.MethodGet, "/products/:productId", nil)
// // 		assert.NoError(t, err)
// // 		router.ServeHTTP(rr, request)
// // 		respBody, err := json.Marshal(gin.H{
// // 			"product": mockProduct,
// // 		})
// // 		assert.NoError(t, err)
// // 		assert.Equal(t, http.StatusOK, rr.Code)
// // 		assert.Equal(t, respBody, rr.Body.Bytes())
// // 		mockProductService.AssertExpectations(t)
// // 	})
// // }

// // func TestProductFindByName(t *testing.T) {
// // 	gin.SetMode(gin.TestMode)
// // 	t.Run("Success", func(t *testing.T) {
// // 		uid, _ := uuid.NewRandom()
// // 		mockProduct := &model.Product{
// // 			ProductId:     uid,
// // 			ProductName:   "product_name",
// // 			Slug:          "slug",
// // 			ProductImage:  "http://placehold.jp/149x150.png",
// // 			Brand:         "brand",
// // 			Price:         0,
// // 			CategoryName:  "category_name",
// // 			CountInStock:  0,
// // 			Description:   "description",
// // 			AverageRating: 4,
// // 		}
// // 		mockProductService := new(mocks.MockProductService)
// // 		mockProductService.On("ProductFindByID", mock.AnythingOfType("*context.emptyCtx"), mockProduct.ProductName).Return(mockProduct, nil)
// // 		rr := httptest.NewRecorder()
// // 		router := gin.Default()
// // 		NewHandler(&Config{
// // 			R:              router,
// // 			ProductService: mockProductService,
// // 		})
// // 		request, err := http.NewRequest(http.MethodGet, "/search/:productName", nil)
// // 		assert.NoError(t, err)
// // 		router.ServeHTTP(rr, request)
// // 		respBody, err := json.Marshal(gin.H{
// // 			"product": mockProduct,
// // 		})
// // 		assert.NoError(t, err)
// // 		assert.Equal(t, http.StatusOK, rr.Code)
// // 		assert.Equal(t, respBody, rr.Body.Bytes())
// // 		mockProductService.AssertExpectations(t)
// // 	})
// // }

// // func TestProductUpdate(t *testing.T) {
// // 	gin.SetMode(gin.TestMode)
// // 	uid, _ := uuid.NewRandom()
// // 	ctxProduct := &model.Product{
// // 		ProductId: uid,
// // 	}
// // 	router := gin.Default()
// // 	mockProductService := new(mocks.MockProductService)
// // 	NewHandler(&Config{
// // 		R:              router,
// // 		ProductService: mockProductService,
// // 	})
// // 	t.Run("Success", func(t *testing.T) {
// // 		rr := httptest.NewRecorder()
// // 		newProductName := "product_name1"
// // 		newBrand := "brand1"
// // 		newCountInStock := 99
// // 		mockProductService := new(mocks.MockProductService)

// // 		reqBody, _ := json.Marshal(gin.H{
// // 			"product_name":   newProductName,
// // 			"brand":          newBrand,
// // 			"count_in_stock": newCountInStock,
// // 		})
// // 		request, _ := http.NewRequest(http.MethodPut, "/products/:productId", bytes.NewBuffer(reqBody))
// // 		request.Header.Set("Content-Type", "application/json")
// // 		productToUpdate := &model.Product{
// // 			ProductId:   ctxProduct.ProductId,
// // 			ProductName: newProductName,
// // 			Brand:       newBrand,
// // 		}
// // 		updateArgs := mock.Arguments{
// // 			mock.AnythingOfType("*context.emptyCtx"),
// // 			uid,
// // 			productToUpdate,
// // 		}
// // 		mockProductService.
// // 			On("ProductUpdate", updateArgs...).
// // 			Run(func(args mock.Arguments) {
// // 			}).
// // 			Return(productToUpdate, nil)
// // 		router.ServeHTTP(rr, request)
// // 		respBody, _ := json.Marshal(gin.H{
// // 			"product": productToUpdate,
// // 		})
// // 		assert.Equal(t, http.StatusOK, rr.Code)
// // 		assert.Equal(t, respBody, rr.Body.Bytes())
// // 		mockProductService.AssertCalled(t, "ProductUpdate", updateArgs...)
// // 	})
// // }

// // func TestProductDelete(t *testing.T) {
// // 	gin.SetMode(gin.TestMode)
// // 	uid, _ := uuid.NewRandom()
// // 	mockProduct := &model.Product{
// // 		ProductId:     uid,
// // 		ProductName:   "product_name",
// // 		Slug:          "slug",
// // 		ProductImage:  "http://placehold.jp/149x150.png",
// // 		Brand:         "brand",
// // 		Price:         0,
// // 		CategoryName:  "category_name",
// // 		CountInStock:  0,
// // 		Description:   "description",
// // 		AverageRating: 4,
// // 	}
// // 	router := gin.Default()
// // 	mockProductService := new(mocks.MockProductService)
// // 	NewHandler(&Config{
// // 		R:              router,
// // 		ProductService: mockProductService,
// // 	})
// // 	t.Run("Success", func(t *testing.T) {
// // 		rr := httptest.NewRecorder()
// // 		mockProductService := new(mocks.MockProductService)
// // 		NewHandler(&Config{
// // 			R:              router,
// // 			ProductService: mockProductService,
// // 		})
// // 		productDeleteArgs := mock.Arguments{
// // 			mock.Anything,
// // 			uid,
// // 		}
// // 		mockProductService.On("ProductDelete", productDeleteArgs...).Return(mockProduct, nil)
// // 		request, _ := http.NewRequest(http.MethodDelete, "/products/:productId", nil)
// // 		router.ServeHTTP(rr, request)
// // 		assert.Equal(t, http.StatusOK, rr.Code)
// // 		mockProductService.AssertCalled(t, "ProductDelete", productDeleteArgs...)
// // 	})
// // }

// // // productToUpdate := &model.Product{
// // // 	ProductId:     ctxProduct.ProductId,
// // // 	ProductName:   "",
// // // 	Slug:          "",
// // // 	ProductImage:  "",
// // // 	Brand:         "",
// // // 	Price:         0,
// // // 	CategoryName:  "",
// // // 	CountInStock:  0,
// // // 	Description:   "",
// // // 	AverageRating: 0,
// // // }
