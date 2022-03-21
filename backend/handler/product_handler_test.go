package handler

import (
	"bytes"
	"encoding/json"
	// "fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"backend/model"
	// "backend/model/apperrors"
	"backend/model/mocks"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestProductCreate(t *testing.T) {
	gin.SetMode(gin.TestMode)

	t.Run("Success", func(t *testing.T) {
		uid, _ := uuid.NewRandom()
		mockProduct := &model.Product{
			ProductId:     uid,
			ProductName:   "product_name",
			Slug:          "slug",
			ProductImage:  "http://placehold.jp/150x150.png",
			Brand:         "brand",
			Price:         1,
			CategoryName:  "category_name",
			CountInStock:  1,
			Description:   "description",
			AverageRating: 5,
		}
		mockProductService := new(mocks.MockProductService)
		mockProductService.
			On("ProductCreate", mock.AnythingOfType("*context.emptyCtx"), mockProduct).
			Return(&mockProduct, nil)
		rr := httptest.NewRecorder()
		router := gin.Default()
		NewHandler(&Config{
			R:              router,
			ProductService: mockProductService,
		})
		reqBody, err := json.Marshal(gin.H{
			"product_id":     mockProduct.ProductId,
			"product_name":   mockProduct.ProductName,
			"slug":           mockProduct.Slug,
			"product_image":  mockProduct.ProductImage,
			"brand":          mockProduct.Brand,
			"price":          mockProduct.Price,
			"category_name":  mockProduct.CategoryName,
			"count_in_stock": mockProduct.CountInStock,
			"description":    mockProduct.Description,
			"average_rating": mockProduct.AverageRating,
		})
		assert.NoError(t, err)
		request, err := http.NewRequest(http.MethodPost, "/products", bytes.NewBuffer(reqBody))
		assert.NoError(t, err)
		request.Header.Set("Content-Type", "application/json")
		router.ServeHTTP(rr, request)
		assert.NoError(t, err)
		assert.Equal(t, http.StatusCreated, rr.Code)
		mockProductService.AssertExpectations(t)
	})
}

func TestProductList(t *testing.T) {
	gin.SetMode(gin.TestMode)
	t.Run("Success", func(t *testing.T) {
		uid, _ := uuid.NewRandom()
		mockProduct1 := &model.Product{
			ProductId:     uid,
			ProductName:   "product_name1",
			Slug:          "slug1",
			ProductImage:  "http://placehold.jp/150x150.png",
			Brand:         "brand1",
			Price:         1,
			CategoryName:  "category_name1",
			CountInStock:  1,
			Description:   "description1",
			AverageRating: 1,
		}
		mockProduct2 := &model.Product{
			ProductId:     uid,
			ProductName:   "product_name2",
			Slug:          "slug2",
			ProductImage:  "http://placehold.jp/150x150.png",
			Brand:         "brand2",
			Price:         2,
			CategoryName:  "category_name2",
			CountInStock:  2,
			Description:   "description2",
			AverageRating: 2,
		}
		mockProductList := []*model.Product{mockProduct1, mockProduct2}
		mockProductService := new(mocks.MockProductService)
		mockProductService.On("ProductList", mock.AnythingOfType("*context.emptyCtx")).Return(mockProductList, nil)
		rr := httptest.NewRecorder()
		router := gin.Default()
		NewHandler(&Config{
			R:              router,
			ProductService: mockProductService,
		})
		request, err := http.NewRequest(http.MethodGet, "/products", nil)
		assert.NoError(t, err)
		router.ServeHTTP(rr, request)
		respBody, err := json.Marshal(gin.H{
			"productlist": mockProductList,
		})
		assert.NoError(t, err)
		assert.Equal(t, http.StatusOK, rr.Code)
		assert.Equal(t, respBody, rr.Body.Bytes())
		mockProductService.AssertExpectations(t)
	})
}

func TestProductFindByID(t *testing.T) {
	// Setup
	gin.SetMode(gin.TestMode)
	t.Run("Success", func(t *testing.T) {
		uid, _ := uuid.NewRandom()
		mockProduct := &model.Product{
			ProductId:     uid,
			ProductName:   "product_name",
			Slug:          "slug",
			ProductImage:  "http://placehold.jp/150x150.png",
			Brand:         "brand",
			Price:         1,
			CategoryName:  "category_name",
			CountInStock:  1,
			Description:   "description",
			AverageRating: 5,
		}
		mockProductService := new(mocks.MockProductService)
		mockProductService.On("ProductFindByID", mock.AnythingOfType("*context.emptyCtx"), uid).Return(mockProduct, nil)
		rr := httptest.NewRecorder()
		router := gin.Default()
		NewHandler(&Config{
			R:              router,
			ProductService: mockProductService,
		})
		request, err := http.NewRequest(http.MethodGet, "/products/:productId", nil)
		assert.NoError(t, err)
		router.ServeHTTP(rr, request)
		respBody, err := json.Marshal(gin.H{
			"product": mockProduct,
		})
		assert.NoError(t, err)
		assert.Equal(t, http.StatusOK, rr.Code)
		assert.Equal(t, respBody, rr.Body.Bytes())
		mockProductService.AssertExpectations(t)
	})
}

func TestProductFindByName(t *testing.T) {
	gin.SetMode(gin.TestMode)
	t.Run("Success", func(t *testing.T) {
		uid, _ := uuid.NewRandom()
		mockProduct := &model.Product{
			ProductId:     uid,
			ProductName:   "product_name",
			Slug:          "slug",
			ProductImage:  "http://placehold.jp/150x150.png",
			Brand:         "brand",
			Price:         1,
			CategoryName:  "category_name",
			CountInStock:  1,
			Description:   "description",
			AverageRating: 5,
		}
		mockProductService := new(mocks.MockProductService)
		mockProductService.On("ProductFindByID", mock.AnythingOfType("*context.emptyCtx"), mockProduct.ProductName).Return(mockProduct, nil)
		rr := httptest.NewRecorder()
		router := gin.Default()
		NewHandler(&Config{
			R:              router,
			ProductService: mockProductService,
		})
		request, err := http.NewRequest(http.MethodGet, "/products/:productName", nil)
		assert.NoError(t, err)
		router.ServeHTTP(rr, request)
		respBody, err := json.Marshal(gin.H{
			"product": mockProduct,
		})
		assert.NoError(t, err)
		assert.Equal(t, http.StatusOK, rr.Code)
		assert.Equal(t, respBody, rr.Body.Bytes())
		mockProductService.AssertExpectations(t)
	})
}

func TestProductUpdate(t *testing.T) {
	gin.SetMode(gin.TestMode)
	uid, _ := uuid.NewRandom()
	ctxProduct := &model.Product{
		ProductId: uid,
	}
	router := gin.Default()
	mockProductService := new(mocks.MockProductService)
	NewHandler(&Config{
		R:              router,
		ProductService: mockProductService,
	})
	t.Run("Success", func(t *testing.T) {
		rr := httptest.NewRecorder()
		newProductName := "product_name2"
		newBrand := "brand2"
		newCountInStock := 100
		mockProductService := new(mocks.MockProductService)

		reqBody, _ := json.Marshal(gin.H{
			"product_name":   newProductName,
			"brand":          newBrand,
			"count_in_stock": newCountInStock,
		})
		request, _ := http.NewRequest(http.MethodPut, "/products/:productId", bytes.NewBuffer(reqBody))
		request.Header.Set("Content-Type", "application/json")
		productToUpdate := &model.Product{
			ProductId:   ctxProduct.ProductId,
			ProductName: newProductName,
			Brand:       newBrand,
		}
		updateArgs := mock.Arguments{
			mock.AnythingOfType("*context.emptyCtx"),
			uid,
			productToUpdate,
		}
		mockProductService.
			On("ProductUpdate", updateArgs...).
			Run(func(args mock.Arguments) {
			}).
			Return(productToUpdate, nil)
		router.ServeHTTP(rr, request)
		respBody, _ := json.Marshal(gin.H{
			"product": productToUpdate,
		})
		assert.Equal(t, http.StatusOK, rr.Code)
		assert.Equal(t, respBody, rr.Body.Bytes())
		mockProductService.AssertCalled(t, "ProductUpdate", updateArgs...)
	})
}

func TestProductDelete(t *testing.T) {
	gin.SetMode(gin.TestMode)
	uid, _ := uuid.NewRandom()
	mockProduct := &model.Product{
		ProductId:     uid,
		ProductName:   "product_name",
		Slug:          "slug",
		ProductImage:  "http://placehold.jp/150x150.png",
		Brand:         "brand",
		Price:         1,
		CategoryName:  "category_name",
		CountInStock:  1,
		Description:   "description",
		AverageRating: 5,
	}
	router := gin.Default()
	mockProductService := new(mocks.MockProductService)
	NewHandler(&Config{
		R:              router,
		ProductService: mockProductService,
	})
	t.Run("Success", func(t *testing.T) {
		rr := httptest.NewRecorder()
		mockProductService := new(mocks.MockProductService)
		NewHandler(&Config{
			R:              router,
			ProductService: mockProductService,
		})
		productDeleteArgs := mock.Arguments{
			mock.Anything,
			uid,
		}
		mockProductService.On("ProductDelete", productDeleteArgs...).Return(mockProduct, nil)
		request, _ := http.NewRequest(http.MethodDelete, "/products/:productId", nil)
		router.ServeHTTP(rr, request)
		assert.Equal(t, http.StatusOK, rr.Code)
		mockProductService.AssertCalled(t, "ProductDelete", productDeleteArgs...)
	})
}

// productToUpdate := &model.Product{
// 	ProductId:     ctxProduct.ProductId,
// 	ProductName:   "",
// 	Slug:          "",
// 	ProductImage:  "",
// 	Brand:         "",
// 	Price:         1,
// 	CategoryName:  "",
// 	CountInStock:  1,
// 	Description:   "",
// 	AverageRating: 1,
// }
