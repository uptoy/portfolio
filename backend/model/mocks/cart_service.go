package mocks

import (
	"context"

	"backend/model"

	"github.com/google/uuid"
	"github.com/stretchr/testify/mock"
)

type MockCartService struct {
	mock.Mock
}

func (m *MockCartService) CartGet(ctx context.Context, userId uuid.UUID) ([]model.CartItem, error) {
	ret := m.Called(ctx)
	var r0 []model.CartItem
	if ret.Get(0) != nil {
		r0 = ret.Get(0).([]model.CartItem)
	}
	var r1 error
	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}
	return r0, r1
}

func (m *MockCartService) CartAddItem(ctx context.Context, cartId int64, productId int64, quantity int64) ([]model.CartItem, error) {
	ret := m.Called(ctx, cartId, productId, quantity)

	var r0 []model.CartItem
	if ret.Get(0) != nil {
		r0 = ret.Get(0).([]model.CartItem)
	}
	var r1 error
	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}

	return r0, r1
}

func (m *MockCartService) CartDeleteItem(ctx context.Context, cartId int64, productId int64) ([]model.CartItem, error) {
	ret := m.Called(ctx, cartId, productId)
	var r0 []model.CartItem
	if ret.Get(0) != nil {
		r0 = ret.Get(0).([]model.CartItem)
	}
	var r1 error
	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}
	return r0, r1
}


func (m *MockCartService) CartIncrementItem(ctx context.Context, cartId int64, productId int64) ([]model.CartItem, error) {
	ret := m.Called(ctx, cartId, productId)
	var r0 []model.CartItem
	if ret.Get(0) != nil {
		r0 = ret.Get(0).([]model.CartItem)
	}
	var r1 error
	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}
	return r0, r1
}

func (m *MockCartService) CartDecrementItem(ctx context.Context, cartId int64, productId int64) ([]model.CartItem, error) {
	ret := m.Called(ctx, cartId, productId)
	var r0 []model.CartItem
	if ret.Get(0) != nil {
		r0 = ret.Get(0).([]model.CartItem)
	}
	var r1 error
	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}
	return r0, r1
}
