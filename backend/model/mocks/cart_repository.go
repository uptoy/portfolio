package mocks

import (
	"backend/model"
	"context"
	"github.com/google/uuid"
	"github.com/stretchr/testify/mock"
)

// MockUserRepository is a mock type for model.UserRepository
type MockCartRepository struct {
	mock.Mock
}

func (m *MockCartRepository) CartCreate(ctx context.Context, userID uuid.UUID) error {
	ret := m.Called(ctx, userID)
	var r0 error
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(error)
	}
	return r0
}

func (m *MockCartRepository) CartGet(ctx context.Context, cartID int64) ([]*model.CartItem, error) {
	ret := m.Called(ctx, cartID)
	var r0 []*model.CartItem
	if ret.Get(0) != nil {
		r0 = ret.Get(0).([]*model.CartItem)
	}
	var r1 error
	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}
	return r0, r1
}

func (m *MockCartRepository) CartAddItem(ctx context.Context, cartItem *model.CartItem) (*model.CartItem, error) {
	ret := m.Called(ctx, cartItem)
	var r0 *model.CartItem
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.CartItem)
	}
	var r1 error
	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}
	return r0, r1
}

func (m *MockCartRepository) CartDeleteItem(ctx context.Context, cartId int64, productId int64) (*model.CartItem, error) {
	ret := m.Called(ctx, cartId, productId)
	var r0 *model.CartItem
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.CartItem)
	}
	var r1 error
	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}
	return r0, r1
}
func (m *MockCartRepository) CartIncrementItem(ctx context.Context, cartId int64, productId int64) (*model.CartItem, error) {
	ret := m.Called(ctx, cartId, productId)
	var r0 *model.CartItem
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.CartItem)
	}
	var r1 error
	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}
	return r0, r1
}
func (m *MockCartRepository) CartDecrementItem(ctx context.Context, cartId int64, productId int64) (*model.CartItem, error) {
	ret := m.Called(ctx, cartId, productId)
	var r0 *model.CartItem
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.CartItem)
	}
	var r1 error
	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}
	return r0, r1
}
func (m *MockCartRepository) CartGetId(ctx context.Context, userId uuid.UUID) (int64, error) {
	ret := m.Called(ctx, userId)
	var r0 int64
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(int64)
	}
	var r1 error
	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}
	return r0, r1

}
