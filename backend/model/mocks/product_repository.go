package mocks

import (
	"context"

	"backend/model"
	"github.com/google/uuid"
	"github.com/stretchr/testify/mock"
)

type MockProductRepository struct {
	mock.Mock
}

func (m *MockProductRepository) ProductFindByID(ctx context.Context, uid uuid.UUID) (*model.Product, error) {
	ret := m.Called(ctx, uid)

	var r0 *model.Product
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.Product)
	}

	var r1 error

	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}

	return r0, r1
}

func (m *MockProductRepository) ProductCreate(ctx context.Context, p *model.Product) (*model.Product, error) {
	ret := m.Called(ctx, p)
	var r0 *model.Product
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.Product)
	}
	var r1 error
	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}
	return r0, r1
}

func (m *MockProductRepository) ProductList(ctx context.Context) ([]*model.Product, error) {
	rets := m.Called(ctx)
	result := rets.Get(0)
	return result.([]*model.Product), rets.Error(1)
}

func (m *MockProductRepository) ProductFindByName(ctx context.Context, product_name string) (*model.Product, error) {
	ret := m.Called(ctx, product_name)

	var r0 *model.Product
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.Product)
	}

	var r1 error

	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}

	return r0, r1
}

func (m *MockProductRepository) ProductUpdate(ctx context.Context, uid uuid.UUID, p *model.Product) (*model.Product, error) {
	ret := m.Called(ctx, uid, p)

	var r0 *model.Product
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.Product)
	}

	var r1 error

	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}

	return r0, r1
}

func (m *MockProductRepository) ProductDelete(ctx context.Context, uid uuid.UUID) (*model.Product, error) {
	ret := m.Called(ctx, uid)

	var r0 *model.Product
	var r1 error
	if ret.Get(0) != nil {
		r1 = ret.Get(0).(error)
	}
	return r0, r1
}
