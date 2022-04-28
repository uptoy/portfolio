package service

// // // skipTest(t)
// import (
// 	"context"
// 	"fmt"
// 	"testing"

// 	"backend/model"
// 	"backend/model/mocks"

// 	"github.com/stretchr/testify/assert"
// 	"github.com/stretchr/testify/mock"
// 	// "mime/multipart"
// )

// func TestProductCreate(t *testing.T) {
// 	t.Run("Success", func(t *testing.T) {
// 		mockProduct := &model.Product{
// 			ProductName:   "product_name",
// 			Slug:          "slug",
// 			Brand:         "brand",
// 			Price:         1,
// 			CategoryId:    1,
// 			CountInStock:  1,
// 			Description:   "description",
// 			AverageRating: 5,
// 		}
// 		var images []string
// 		mockProductRepository := new(mocks.MockProductRepository)
// 		ps := NewProductService(&ProductServiceConfig{
// 			ProductRepository: mockProductRepository,
// 		})
// 		mockProductRepository.On("ProductCreate", mock.AnythingOfType("*context.emptyCtx"), mock.AnythingOfType("*model.Product")).Return(mockProduct, nil)
// 		ctx := context.TODO()
// 		product, err := ps.ProductCreate(ctx, mockProduct, images)
// 		assert.NoError(t, err)
// 		assert.Equal(t, int64(0), product.Id)
// 		assert.NotNil(t, product.Id)
// 		mockProductRepository.AssertExpectations(t)
// 	})
// }

// func TestProductList(t *testing.T) {
// 	t.Run("Success", func(t *testing.T) {
// 		mockProduct0 := model.Product{
// 			Id:            0,
// 			ProductName:   "product_name",
// 			Slug:          "slug",
// 			Brand:         "brand",
// 			Price:         1,
// 			CategoryId:    1,
// 			CountInStock:  1,
// 			Description:   "description",
// 			AverageRating: 5,
// 		}
// 		mockProduct2 := model.Product{
// 			Id:            1,
// 			ProductName:   "product_name1",
// 			Slug:          "slug1",
// 			Brand:         "brand1",
// 			Price:         1,
// 			CategoryId:    2,
// 			CountInStock:  1,
// 			Description:   "description1",
// 			AverageRating: 5,
// 		}
// 		mockProductList := []model.Product{mockProduct0, mockProduct2}
// 		mockProductRepository := new(mocks.MockProductRepository)
// 		ps := NewProductService(&ProductServiceConfig{
// 			ProductRepository: mockProductRepository,
// 		})
// 		mockProductRepository.On("ProductList", mock.AnythingOfType("*context.emptyCtx")).Return(mockProductList, nil)
// 		ctx := context.TODO()
// 		productList, err := ps.ProductList(ctx)
// 		assert.NoError(t, err)
// 		fmt.Println("mockProductList[0]", mockProductList[0])
// 		fmt.Println("mockProductList[1]", mockProductList[1])
// 		assert.Equal(t, mockProductList[0].Id, productList[0].Id)
// 		assert.Equal(t, mockProductList[1].Id, productList[1].Id)
// 		mockProductRepository.AssertExpectations(t)
// 	})
// }

// func TestProductFindByID(t *testing.T) {
// 	t.Run("Success", func(t *testing.T) {
// 		mockProduct := &model.Product{
// 			Id:            0,
// 			ProductName:   "product_name",
// 			Slug:          "slug",
// 			Brand:         "brand",
// 			Price:         1,
// 			CategoryId:    1,
// 			CountInStock:  1,
// 			Description:   "description",
// 			AverageRating: 5,
// 		}
// 		mockProductRepository := new(mocks.MockProductRepository)
// 		ps := NewProductService(&ProductServiceConfig{
// 			ProductRepository: mockProductRepository,
// 		})
// 		mockProductRepository.On("ProductFindByID", mock.AnythingOfType("*context.emptyCtx"), mockProduct.Id).Return(mockProduct, nil)
// 		ctx := context.TODO()
// 		product, err := ps.ProductFindByID(ctx, mockProduct.Id)
// 		assert.NoError(t, err)
// 		assert.Equal(t, mockProduct, product)
// 		assert.Equal(t, mockProduct.ProductName, product.ProductName)
// 		mockProductRepository.AssertExpectations(t)
// 	})
// }

// func TestProductFindByName(t *testing.T) {
// 	t.Run("Success", func(t *testing.T) {
// 		mockProduct := &model.Product{
// 			Id:            0,
// 			ProductName:   "product_name",
// 			Slug:          "slug",
// 			Brand:         "brand",
// 			Price:         1,
// 			CategoryId:    1,
// 			CountInStock:  1,
// 			Description:   "description",
// 			AverageRating: 5,
// 		}
// 		mockProductRepository := new(mocks.MockProductRepository)
// 		ps := NewProductService(&ProductServiceConfig{
// 			ProductRepository: mockProductRepository,
// 		})
// 		mockProductRepository.On("ProductFindByName", mock.AnythingOfType("*context.emptyCtx"), mockProduct.ProductName).Return(mockProduct, nil)
// 		ctx := context.TODO()
// 		product, err := ps.ProductFindByName(ctx, mockProduct.ProductName)
// 		assert.NoError(t, err)
// 		assert.Equal(t, mockProduct, product)
// 		assert.Equal(t, mockProduct.Id, product.Id)
// 		mockProductRepository.AssertExpectations(t)
// 	})
// }

// func TestProductUpdate(t *testing.T) {
// 	t.Run("Success", func(t *testing.T) {
// 		mockProduct := &model.Product{
// 			Id:            0,
// 			ProductName:   "product_name",
// 			Slug:          "slug",
// 			Brand:         "brand",
// 			Price:         1,
// 			CategoryId:    1,
// 			CountInStock:  1,
// 			Description:   "description",
// 			AverageRating: 5,
// 		}
// 		mockProductRepository := new(mocks.MockProductRepository)
// 		ps := NewProductService(&ProductServiceConfig{
// 			ProductRepository: mockProductRepository,
// 		})
// 		mockProductRepository.On("ProductUpdate", mock.AnythingOfType("*context.emptyCtx"), mockProduct.Id, mockProduct).Return(mockProduct, nil)
// 		ctx := context.TODO()
// 		product, err := ps.ProductUpdate(ctx, mockProduct.Id, mockProduct)
// 		assert.NoError(t, err)
// 		assert.Equal(t, mockProduct, product)
// 		assert.Equal(t, mockProduct.Id, product.Id)
// 		mockProductRepository.AssertExpectations(t)
// 	})
// }

// func TestProductDelete(t *testing.T) {
// 	t.Run("Success", func(t *testing.T) {
// 		mockProduct := &model.Product{
// 			Id:            0,
// 			ProductName:   "product_name",
// 			Slug:          "slug",
// 			Brand:         "brand",
// 			Price:         1,
// 			CategoryId:    1,
// 			CountInStock:  1,
// 			Description:   "description",
// 			AverageRating: 5,
// 		}
// 		mockProductRepository := new(mocks.MockProductRepository)
// 		ps := NewProductService(&ProductServiceConfig{
// 			ProductRepository: mockProductRepository,
// 		})
// 		mockProductRepository.On("ProductDelete", mock.AnythingOfType("*context.emptyCtx"), mockProduct.Id).Return(mockProduct, nil)
// 		ctx := context.TODO()
// 		product, err := ps.ProductDelete(ctx, mockProduct.Id)
// 		assert.NoError(t, err)
// 		assert.Equal(t, mockProduct, product)
// 		assert.Equal(t, mockProduct.ProductName, product.ProductName)
// 		mockProductRepository.AssertExpectations(t)
// 	})
// }
