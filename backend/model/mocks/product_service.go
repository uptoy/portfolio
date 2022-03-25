package mocks

import (
	"context"

	"backend/model"
	// "github.com/google/uuid"
	"github.com/stretchr/testify/mock"
)

type MockProductService struct {
	mock.Mock
}

func (m *MockProductService) ProductCreate(ctx context.Context, p *model.Product) (*model.Product, error) {
	ret := m.Called(ctx, p)

	// first value passed to "Return"
	var r0 *model.Product
	if ret.Get(0) != nil {
		// we can just return this if we know we won't be passing function to "Return"
		r0 = ret.Get(0).(*model.Product)
	}

	var r1 error

	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}

	return r0, r1
}

func (m *MockProductService) ProductList(ctx context.Context) ([]model.Product, error) {
	// args that will be passed to "Return" in the tests, when function
	// is called with a uid. Hence the name "ret"
	ret := m.Called(ctx)
	// first value passed to "Return"
	var r0 []model.Product
	if ret.Get(0) != nil {
		// we can just return this if we know we won't be passing function to "Return"
		r0 = ret.Get(0).([]model.Product)
	}
	var r1 error

	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}

	return r0, r1
}

func (m *MockProductService) ProductFindByID(ctx context.Context, productId int64) (*model.Product, error) {
	ret := m.Called(ctx, productId)
	var r0 *model.Product
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.Product)
	}
	var r1 error
	if ret.Get(0) != nil {
		r1 = ret.Get(0).(error)
	}
	return r0, r1
}

func (m *MockProductService) ProductFindByName(ctx context.Context, productName string) (*model.Product, error) {
	ret := m.Called(ctx, productName)
	var r0 *model.Product
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.Product)
	}
	var r1 error
	if ret.Get(0) != nil {
		r1 = ret.Get(0).(error)
	}
	return r0, r1
}

func (m *MockProductService) ProductUpdate(ctx context.Context, productId int64, p *model.Product) (*model.Product, error) {
	ret := m.Called(ctx, productId, p)
	var r0 *model.Product
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.Product)
	}
	var r1 error
	if ret.Get(0) != nil {
		r1 = ret.Get(0).(error)
	}
	return r0, r1
}

func (m *MockProductService) ProductDelete(ctx context.Context, productId int64) (*model.Product, error) {
	ret := m.Called(ctx, productId)
	var r0 *model.Product
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.Product)
	}
	var r1 error
	if ret.Get(0) != nil {
		r1 = ret.Get(0).(error)
	}
	return r0, r1
}
