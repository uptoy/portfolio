package mocks

import (
	"context"

	"backend/model"
	"github.com/google/uuid"
	"github.com/stretchr/testify/mock"
)

type MockWishlistRepository struct {
	mock.Mock
}

func (m *MockWishlistRepository) WishlistCreate(ctx context.Context, userId uuid.UUID) (*model.Wishlist, error) {
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
func (m *MockWishlistRepository) WishlistAddItem(ctx context.Context, userId uuid.UUID, productId int64) ([]*model.Product, error) {
	ret := m.Called(ctx, userId, productId)
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

func (m *MockWishlistRepository) WishlistGet(ctx context.Context, userId uuid.UUID) ([]*model.Product, error) {
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

func (m *MockWishlistRepository) WishlistDeleteItem(ctx context.Context, userId uuid.UUID, productId int64) ([]*model.Product, error) {
	ret := m.Called(ctx, userId, productId)
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


func (m *MockWishlistRepository) WishlistClear(ctx context.Context, userId uuid.UUID) error {
	ret := m.Called(ctx, userId)

	var r0 error
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(error)
	}

	return r0
}
