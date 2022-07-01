package mocks

import (
	"context"

	"backend/model"
	"github.com/stretchr/testify/mock"
)

type MockCategoryService struct {
	mock.Mock
}

func (m *MockCategoryService) CategoryCreate(ctx context.Context, p *model.Category) (*model.Category, error) {
	ret := m.Called(ctx, p)

	var r0 *model.Category
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.Category)
	}

	var r1 error

	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}

	return r0, r1
}

func (m *MockCategoryService) CategoryList(ctx context.Context) ([]model.Category, error) {
	ret := m.Called(ctx)
	var r0 []model.Category
	if ret.Get(0) != nil {
		r0 = ret.Get(0).([]model.Category)
	}
	var r1 error

	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}

	return r0, r1
}

func (m *MockCategoryService) CategoryFindByID(ctx context.Context, id int64) (*model.Category, error) {
	ret := m.Called(ctx, id)
	var r0 *model.Category
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.Category)
	}
	var r1 error
	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}
	return r0, r1
}

func (m *MockCategoryService) CategoryFindByName(ctx context.Context, name string) (*model.Category, error) {
	ret := m.Called(ctx, name)
	var r0 *model.Category
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.Category)
	}
	var r1 error
	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}
	return r0, r1
}

func (m *MockCategoryService) CategoryUpdate(ctx context.Context, id int64, c *model.Category) (*model.Category, error) {
	ret := m.Called(ctx, id, c)
	var r0 *model.Category
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.Category)
	}
	var r1 error
	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}
	return r0, r1
}

func (m *MockCategoryService) CategoryDelete(ctx context.Context, id int64) (*model.Category, error) {
	ret := m.Called(ctx, id)
	var r0 *model.Category
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.Category)
	}
	var r1 error
	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}
	return r0, r1
}
