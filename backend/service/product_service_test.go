package service

// skipTest(t)
import (
	"context"
	"fmt"
	"testing"

	"backend/model"
	"backend/model/apperrors"
	"backend/model/mocks"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestProductCreate(t *testing.T) {
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
		mockProductRepository := new(mocks.MockProductRepository)
		ps := NewProductService(&PSConfig{
			ProductRepository: mockProductRepository,
		})
		mockProductRepository.On("ProductCreate", mock.Anything, mockProduct).Return(mockProduct, nil)
		ctx := context.TODO()
		p, err := ps.ProductCreate(ctx, mockProduct)
		assert.NoError(t, err)
		assert.Equal(t, p, mockProduct)
		mockProductRepository.AssertExpectations(t)
	})
	t.Run("Error", func(t *testing.T) {
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
		mockProductRepository := new(mocks.MockProductRepository)
		ps := NewProductService(&PSConfig{
			ProductRepository: mockProductRepository,
		})
		mockErr := apperrors.NewConflict("product_name", mockProduct.ProductName)
		mockProductRepository.
			On("ProductCreate", mock.AnythingOfType("*context.emptyCtx"), mockProduct).
			Return(mockErr)
		ctx := context.TODO()
		_, err := ps.ProductCreate(ctx, mockProduct)
		assert.Error(t, err)
		mockProductRepository.AssertExpectations(t)
	})
}

func TestProductList(t *testing.T) {
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
		mockProductRepository := new(mocks.MockProductRepository)
		ps := NewProductService(&PSConfig{
			ProductRepository: mockProductRepository,
		})
		mockProductRepository.On("ProductList", mock.Anything).Return(mockProduct, nil)
		ctx := context.TODO()
		p, err := ps.ProductList(ctx)
		assert.NoError(t, err)
		assert.Equal(t, p, mockProduct)
		mockProductRepository.AssertExpectations(t)
	})
	t.Run("Error", func(t *testing.T) {
		mockProductRepository := new(mocks.MockProductRepository)
		ps := NewProductService(&PSConfig{
			ProductRepository: mockProductRepository,
		})
		mockProductRepository.On("ProductList", mock.Anything).Return(nil, fmt.Errorf("Some error down the call chain"))
		ctx := context.TODO()
		p, err := ps.ProductList(ctx)
		assert.Nil(t, p)
		assert.Error(t, err)
		mockProductRepository.AssertExpectations(t)
	})
}

func TestProductFindById(t *testing.T) {
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
		mockProductRepository := new(mocks.MockProductRepository)
		ps := NewProductService(&PSConfig{
			ProductRepository: mockProductRepository,
		})
		mockProductRepository.On("ProductFindById", mock.Anything, uid).Return(mockProduct, nil)
		ctx := context.TODO()
		p, err := ps.ProductList(ctx)
		assert.NoError(t, err)
		assert.Equal(t, p, mockProduct)
		mockProductRepository.AssertExpectations(t)
	})
	t.Run("Error", func(t *testing.T) {
		uid, _ := uuid.NewRandom()
		mockProductRepository := new(mocks.MockProductRepository)
		ps := NewProductService(&PSConfig{
			ProductRepository: mockProductRepository,
		})
		mockProductRepository.
			On("ProductFindById", mock.Anything).
			Return(nil, fmt.Errorf("Some error down the call chain"))
		ctx := context.TODO()
		p, err := ps.ProductFindByID(ctx, uid)
		assert.Nil(t, p)
		assert.Error(t, err)
		mockProductRepository.AssertExpectations(t)
	})
}

func TestProductFindByName(t *testing.T) {
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
		mockProductRepository := new(mocks.MockProductRepository)
		ps := NewProductService(&PSConfig{
			ProductRepository: mockProductRepository,
		})
		mockProductRepository.On("ProductFindByName", mock.Anything, mockProduct.ProductName).Return(mockProduct, nil)
		ctx := context.TODO()
		p, err := ps.ProductFindByName(ctx, mockProduct.ProductName)
		assert.NoError(t, err)
		assert.Equal(t, p, mockProduct)
		mockProductRepository.AssertExpectations(t)
	})
	t.Run("Error", func(t *testing.T) {
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
		mockProductRepository := new(mocks.MockProductRepository)
		ps := NewProductService(&PSConfig{
			ProductRepository: mockProductRepository,
		})
		mockProductRepository.
			On("ProductFindByName", mock.Anything).
			Return(nil, fmt.Errorf("Some error down the call chain"))
		ctx := context.TODO()
		p, err := ps.ProductFindByName(ctx, mockProduct.ProductName)
		assert.Nil(t, p)
		assert.Error(t, err)
		mockProductRepository.AssertExpectations(t)
	})
}

func TestProductUpdate(t *testing.T) {
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
		mockProductRepository := new(mocks.MockProductRepository)
		ps := NewProductService(&PSConfig{
			ProductRepository: mockProductRepository,
		})
		mockProductRepository.On("ProductUpdate", mock.Anything, uid, mockProduct).Return(mockProduct, nil)
		ctx := context.TODO()
		p, err := ps.ProductUpdate(ctx, uid, mockProduct)
		assert.NoError(t, err)
		assert.Equal(t, p, mockProduct)
		mockProductRepository.AssertExpectations(t)
	})
	t.Run("Error", func(t *testing.T) {
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
		mockProductRepository := new(mocks.MockProductRepository)
		ps := NewProductService(&PSConfig{
			ProductRepository: mockProductRepository,
		})
		mockProductRepository.
			On("ProductUpdate", mock.Anything).
			Return(nil, fmt.Errorf("Some error down the call chain"))
		ctx := context.TODO()
		p, err := ps.ProductUpdate(ctx, uid, mockProduct)
		assert.Nil(t, p)
		assert.Error(t, err)
		mockProductRepository.AssertExpectations(t)
	})
}

func TestProductDelete(t *testing.T) {
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
		mockProductRepository := new(mocks.MockProductRepository)
		ps := NewProductService(&PSConfig{
			ProductRepository: mockProductRepository,
		})
		mockProductRepository.On("ProductUpdate", mock.Anything, uid).Return(mockProduct, nil)
		ctx := context.TODO()
		p, err := ps.ProductDelete(ctx, uid)
		assert.NoError(t, err)
		assert.Equal(t, p, mockProduct)
		mockProductRepository.AssertExpectations(t)
	})
	t.Run("Error", func(t *testing.T) {
		uid, _ := uuid.NewRandom()
		mockProductRepository := new(mocks.MockProductRepository)
		ps := NewProductService(&PSConfig{
			ProductRepository: mockProductRepository,
		})
		mockProductRepository.
			On("ProductDelete", mock.Anything).
			Return(nil, fmt.Errorf("Some error down the call chain"))
		ctx := context.TODO()
		p, err := ps.ProductDelete(ctx, uid)
		assert.Nil(t, p)
		assert.Error(t, err)
		mockProductRepository.AssertExpectations(t)
	})
}
