package mocks

import (
	"context"

	"backend/model"
	"github.com/stretchr/testify/mock"
)

type MockCartRepository struct {
	mock.Mock
}

func (m *MockCartRepository) CartCreate(ctx context.Context, c *model.Cart) (*model.Cart, error) {
	ret := m.Called(ctx, c)
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

func (m *MockCartRepository) CartList(ctx context.Context) ([]model.Cart, error) {
	rets := m.Called(ctx)
	result := rets.Get(0)
	return result.([]model.Cart), rets.Error(1)
}


func (m *MockCartRepository) CartDelete(ctx context.Context, id int64) (*model.Cart, error) {
	ret := m.Called(ctx, id)
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
