package mocks

import (
	"context"

	"backend/model"
	"github.com/stretchr/testify/mock"
)

type MockCategoryRepository struct {
	mock.Mock
}

func (m *MockCategoryRepository) CategoryCreate(ctx context.Context, c *model.Category) (*model.Category, error) {
	ret := m.Called(ctx, c)
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

func (m *MockCategoryRepository) CategoryList(ctx context.Context) ([]model.Category, error) {
	rets := m.Called(ctx)
	result := rets.Get(0)
	return result.([]model.Category), rets.Error(1)
}

func (m *MockCategoryRepository) CategoryFindByID(ctx context.Context, id int64) (*model.Category, error) {
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

func (m *MockCategoryRepository) CategoryFindByName(ctx context.Context, category_name string) (*model.Category, error) {
	ret := m.Called(ctx, category_name)
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

func (m *MockCategoryRepository) CategoryUpdate(ctx context.Context, id int64, c *model.Category) (*model.Category, error) {
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

func (m *MockCategoryRepository) CategoryDelete(ctx context.Context, id int64) (*model.Category, error) {
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
