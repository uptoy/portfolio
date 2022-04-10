package service

// // skipTest(t)
import (
	"context"
	"fmt"
	"testing"

	"backend/model"
	"backend/model/mocks"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestWishlistCreate(t *testing.T) {
	t.Run("Success", func(t *testing.T) {
		mockProduct0 := model.Product{
			Id:     0,
			ProductName:   "product_name",
			Slug:          "slug",
			ProductImage:  "http://placehold.jp/150x150.png",
			Brand:         "brand",
			Price:         1,
			CategoryId:    1,
			CountInStock:  1,
			Description:   "description",
			AverageRating: 5,
		}
		mockProduct2 := model.Product{
			Id:     1,
			ProductName:   "product_name1",
			Slug:          "slug1",
			ProductImage:  "http://placehold.jp/150x150.png",
			Brand:         "brand1",
			Price:         1,
			CategoryId:    2,
			CountInStock:  1,
			Description:   "description1",
			AverageRating: 5,
		}
		mockProductList := []model.Product{mockProduct0, mockProduct2}
		uid, _ := uuid.NewRandom()
		mockUser := &model.User{
			UID: uid,
			Name:   "name",
			Email:  "email@email.com",
		}
		mockWishlistRepository := new(mocks.MockWishlistRepository)
		ws := NewWishlistService(&WishlistServiceConfig{
			WishlistRepository: mockWishlistRepository,
		})
		userId := mockUser.UID
		productId2 := mockProduct2.Id
		mockWishlistRepository.On("WishlistCreate", mock.AnythingOfType("*context.emptyCtx"), userId, productId2).Return(mockProductList, nil)
		ctx := context.TODO()
		wishlist, err := ws.WishlistGet(ctx, mockUser.UID)
		assert.NoError(t, err)
		assert.Equal(t, mockProductList[0].Id, wishlist[0].Id)
		assert.Equal(t, mockProductList[1].Id, wishlist[1].Id)
		assert.NotNil(t, wishlist[0].Id)
		mockWishlistRepository.AssertExpectations(t)
	})
}

func TestWishlistGet(t *testing.T) {
	t.Run("Success", func(t *testing.T) {
		mockProduct0 := model.Product{
			Id:     0,
			ProductName:   "product_name",
			Slug:          "slug",
			ProductImage:  "http://placehold.jp/150x150.png",
			Brand:         "brand",
			Price:         1,
			CategoryId:    1,
			CountInStock:  1,
			Description:   "description",
			AverageRating: 5,
		}
		mockProduct2 := model.Product{
			Id:     1,
			ProductName:   "product_name1",
			Slug:          "slug1",
			ProductImage:  "http://placehold.jp/150x150.png",
			Brand:         "brand1",
			Price:         1,
			CategoryId:    2,
			CountInStock:  1,
			Description:   "description1",
			AverageRating: 5,
		}
		mockProductList := []model.Product{mockProduct0, mockProduct2}
		uid, _ := uuid.NewRandom()
		mockUser := &model.User{
			UID:   uid,
			Name:  "name",
			Email: "email@email.com",
		}
		mockWishlistRepository := new(mocks.MockWishlistRepository)
		ws := NewWishlistService(&WishlistServiceConfig{
			WishlistRepository: mockWishlistRepository,
		})
		userId := mockUser.UID
		mockWishlistRepository.On("WishlistGet", mock.AnythingOfType("*context.emptyCtx"), userId).Return(mockProductList, nil)
		ctx := context.TODO()
		wishlist, err := ws.WishlistGet(ctx, mockUser.UID)
		assert.NoError(t, err)
		fmt.Println("mockProductList[0]", mockProductList[0])
		fmt.Println("mockProductList[1]", mockProductList[1])
		assert.Equal(t, mockProductList[0].Id, wishlist[0].Id)
		assert.Equal(t, mockProductList[1].Id, wishlist[1].Id)
		mockWishlistRepository.AssertExpectations(t)
	})
}

func TestWishlistDelete(t *testing.T) {
	t.Run("Success", func(t *testing.T) {
		mockProduct1 := model.Product{
			Id:     0,
			ProductName:   "product_name",
			Slug:          "slug",
			ProductImage:  "http://placehold.jp/150x150.png",
			Brand:         "brand",
			Price:         1,
			CategoryId:    1,
			CountInStock:  1,
			Description:   "description",
			AverageRating: 5,
		}
		mockProduct2 := model.Product{
			Id:     1,
			ProductName:   "product_name1",
			Slug:          "slug1",
			ProductImage:  "http://placehold.jp/150x150.png",
			Brand:         "brand1",
			Price:         1,
			CategoryId:    2,
			CountInStock:  1,
			Description:   "description1",
			AverageRating: 5,
		}
		mockProductList := []model.Product{mockProduct1}
		uid, _ := uuid.NewRandom()
		mockUser := &model.User{
			UID:   uid,
			Name:  "name",
			Email: "email@email.com",
		}
		mockWishlistRepository := new(mocks.MockWishlistRepository)
		ws := NewWishlistService(&WishlistServiceConfig{
			WishlistRepository: mockWishlistRepository,
		})
		userId := mockUser.UID
		productId2 := mockProduct2.Id
		mockWishlistRepository.On("WishlistDelete", mock.AnythingOfType("*context.emptyCtx"), userId, productId2).Return(mockProductList, nil)
		ctx := context.TODO()
		wishlist, err := ws.WishlistDelete(ctx, mockUser.UID, mockProduct2.Id)
		assert.NoError(t, err)
		fmt.Println("mockProductList[0]", mockProductList[0])
		assert.Equal(t, mockProductList[0].Id, wishlist[0].Id)
		mockWishlistRepository.AssertExpectations(t)
	})
}

func TestWishlistClear(t *testing.T) {
	t.Run("Success", func(t *testing.T) {
		uid, _ := uuid.NewRandom()
		mockUser := &model.User{
			UID:   uid,
			Name:  "name",
			Email: "email@email.com",
		}
		mockWishlistRepository := new(mocks.MockWishlistRepository)
		ws := NewWishlistService(&WishlistServiceConfig{
			WishlistRepository: mockWishlistRepository,
		})
		userId := mockUser.UID
		mockWishlistRepository.On("WishlistClear", mock.AnythingOfType("*context.emptyCtx"), userId).Return(nil)
		ctx := context.TODO()
		err := ws.WishlistClear(ctx, mockUser.UID)
		assert.NoError(t, err)
		mockWishlistRepository.AssertExpectations(t)
	})
}
