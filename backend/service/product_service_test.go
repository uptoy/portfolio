package service

// // skipTest(t)
import (
	"context"
	"testing"

	"backend/model"
	"backend/model/mocks"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestProductCreate(t *testing.T) {
	t.Run("Success", func(t *testing.T) {
		mockProduct := &model.Product{
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
		mockProductRepository := new(mocks.MockProductRepository)
		ps := NewProductService(&PSConfig{
			ProductRepository: mockProductRepository,
		})
		mockProductRepository.On("ProductCreate", mock.AnythingOfType("*context.emptyCtx"), mockProduct).Return(mockProduct, nil)
		ctx := context.TODO()
		product, err := ps.ProductCreate(ctx, mockProduct)
		assert.NoError(t, err)
		assert.Equal(t, int64(0), product.ProductId)
		assert.NotNil(t, product.ProductId)
		mockProductRepository.AssertExpectations(t)
	})
}

func TestProductList(t *testing.T) {
	t.Run("Success", func(t *testing.T) {
		mockProduct0 := &model.Product{
			ProductId:     0,
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
		mockProduct2 := &model.Product{
			ProductId:     1,
			ProductName:   "product_name1",
			Slug:          "slug1",
			ProductImage:  "http://placehold.jp/150x150.png",
			Brand:         "brand1",
			Price:         1,
			CategoryName:  "category_name1",
			CountInStock:  1,
			Description:   "description1",
			AverageRating: 5,
		}
		mockProductList := []*model.Product{mockProduct0, mockProduct2}
		mockProductRepository := new(mocks.MockProductRepository)
		ps := NewProductService(&PSConfig{
			ProductRepository: mockProductRepository,
		})
		mockProductRepository.On("ProductList", mock.AnythingOfType("*context.emptyCtx")).Return(mockProductList, nil)
		ctx := context.TODO()
		productList, err := ps.ProductList(ctx)
		assert.NoError(t, err)
		assert.Equal(t, mockProductList[0].ProductName, productList[0].ProductName)
		assert.Equal(t, mockProductList[1].ProductName, productList[1].ProductName)
		assert.Equal(t, mockProductList[0].ProductId, productList[0].ProductId)
		assert.Equal(t, mockProductList[1].ProductId, productList[1].ProductId)
		mockProductRepository.AssertExpectations(t)
	})
}

func TestProductFindByID(t *testing.T) {
	t.Run("Success", func(t *testing.T) {
		mockProduct := &model.Product{
			ProductId:     0,
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
		mockProductRepository := new(mocks.MockProductRepository)
		ps := NewProductService(&PSConfig{
			ProductRepository: mockProductRepository,
		})
		mockProductRepository.On("ProductFindByID", mock.AnythingOfType("*context.emptyCtx"), mockProduct.ProductId).Return(mockProduct, nil)
		ctx := context.TODO()
		product, err := ps.ProductFindByID(ctx, mockProduct.ProductId)
		assert.NoError(t, err)
		assert.Equal(t, mockProduct, product)
		assert.Equal(t, mockProduct.ProductName, product.ProductName)
		mockProductRepository.AssertExpectations(t)
	})
}

func TestProductFindByName(t *testing.T) {
	t.Run("Success", func(t *testing.T) {
		mockProduct := &model.Product{
			ProductId:     0,
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
		mockProductRepository := new(mocks.MockProductRepository)
		ps := NewProductService(&PSConfig{
			ProductRepository: mockProductRepository,
		})
		mockProductRepository.On("ProductFindByName", mock.AnythingOfType("*context.emptyCtx"), mockProduct.ProductName).Return(mockProduct, nil)
		ctx := context.TODO()
		product, err := ps.ProductFindByName(ctx, mockProduct.ProductName)
		assert.NoError(t, err)
		assert.Equal(t, mockProduct, product)
		assert.Equal(t, mockProduct.ProductId, product.ProductId)
		mockProductRepository.AssertExpectations(t)
	})
}

func TestProductUpdate(t *testing.T) {
	t.Run("Success", func(t *testing.T) {
		mockProduct := &model.Product{
			ProductId:     0,
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
		mockProductRepository := new(mocks.MockProductRepository)
		ps := NewProductService(&PSConfig{
			ProductRepository: mockProductRepository,
		})
		mockProductRepository.On("ProductUpdate", mock.AnythingOfType("*context.emptyCtx"), mockProduct.ProductId, mockProduct).Return(mockProduct, nil)
		ctx := context.TODO()
		product, err := ps.ProductUpdate(ctx, mockProduct.ProductId, mockProduct)
		assert.NoError(t, err)
		assert.Equal(t, mockProduct, product)
		assert.Equal(t, mockProduct.ProductId, product.ProductId)
		mockProductRepository.AssertExpectations(t)
	})
}

func TestProductDelete(t *testing.T) {
	t.Run("Success", func(t *testing.T) {
		mockProduct := &model.Product{
			ProductId:     0,
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
		mockProductRepository := new(mocks.MockProductRepository)
		ps := NewProductService(&PSConfig{
			ProductRepository: mockProductRepository,
		})
		mockProductRepository.On("ProductDelete", mock.AnythingOfType("*context.emptyCtx"), mockProduct.ProductId).Return(mockProduct, nil)
		ctx := context.TODO()
		product, err := ps.ProductDelete(ctx, mockProduct.ProductId)
		assert.NoError(t, err)
		assert.Equal(t, mockProduct, product)
		assert.Equal(t, mockProduct.ProductName, product.ProductName)
		mockProductRepository.AssertExpectations(t)
	})
}
