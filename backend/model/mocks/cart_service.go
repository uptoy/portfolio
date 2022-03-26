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

func (m *MockCartService) CartAdd(ctx context.Context, userId uuid.UUID, productId int64, quantity int64) (*model.Cart, error) {
	ret := m.Called(ctx, userId)

	var r0 *model.Cart
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.Cart)
	}

	var r1 error

	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}

	return r0, r1
}

func (m *MockCartService) CartList(ctx context.Context, userId uuid.UUID) ([]model.Cart, error) {
	ret := m.Called(ctx)
	var r0 []model.Cart
	if ret.Get(0) != nil {
		r0 = ret.Get(0).([]model.Cart)
	}
	var r1 error

	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}

	return r0, r1
}

func (m *MockCartService) CartRemove(ctx context.Context, userId uuid.UUID, productId int64, quantity int64) (*model.Cart, error) {
	ret := m.Called(ctx, userId)
	var r0 *model.Cart
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.Cart)
	}
	var r1 error
	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}
	return r0, r1
}
