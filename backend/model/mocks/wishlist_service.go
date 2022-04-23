package mocks

import (
	"context"

	"backend/model"
	// "github.com/google/uuid"
	"github.com/google/uuid"
	"github.com/stretchr/testify/mock"
)

type MockWishlistService struct {
	mock.Mock
}

func (m *MockWishlistService) WishlistCreate(ctx context.Context, userId uuid.UUID, productId int64) (*model.Wishlist, error) {
	ret := m.Called(ctx, userId)
	var r0 *model.Wishlist
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.Wishlist)
	}
	var r1 error

	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}
	return r0, r1
}

// func (m *MockWishlistService) WishlistAddItem(ctx context.Context, userId uuid.UUID, productId int64) ([]*model.Product, error) {
// 	ret := m.Called(ctx, userId, productId)
// 	var r0 []*model.Product
// 	if ret.Get(0) != nil {
// 		r0 = ret.Get(0).([]*model.Product)
// 	}
// 	var r1 error

// 	if ret.Get(1) != nil {
// 		r1 = ret.Get(1).(error)
// 	}
// 	return r0, r1
// }

func (m *MockWishlistService) WishlistGet(ctx context.Context, userId uuid.UUID) ([]*model.Product, error) {
	ret := m.Called(ctx, userId)
	var r0 []*model.Product
	if ret.Get(0) != nil {
		r0 = ret.Get(0).([]*model.Product)
	}
	var r1 error

	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}

	return r0, r1
}

func (m *MockWishlistService) WishlistDelete(ctx context.Context, userId uuid.UUID, productId int64) (*model.Wishlist, error) {
	ret := m.Called(ctx, userId, productId)
	var r0 *model.Wishlist
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.Wishlist)
	}
	var r1 error
	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}
	return r0, r1
}

// func (m *MockWishlistService) WishlistClear(ctx context.Context, userId uuid.UUID) error {
// 	ret := m.Called(ctx, userId)

// 	var r0 error
// 	if ret.Get(0) != nil {
// 		r0 = ret.Get(0).(error)
// 	}

// 	return r0
// }
