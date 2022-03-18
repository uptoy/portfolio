package mocks

import (
	"context"

	"backend/model"
	"github.com/google/uuid"
	"github.com/stretchr/testify/mock"
)

// MockUserService is a mock type for model.UserService
type MockProductService struct {
	mock.Mock
}

// Get is mock of UserService Get
func (m *MockProductService) Get(ctx context.Context, uid uuid.UUID) (*model.Product, error) {
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

func (m *MockProductService) Signup(ctx context.Context, u *model.User) error {
	ret := m.Called(ctx, u)

	var r0 error
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(error)
	}

	return r0
}

// Signin is a mock of UserService.Signin
func (m *MockProductService) Signin(ctx context.Context, u *model.User) error {
	ret := m.Called(ctx, u)

	var r0 error
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(error)
	}

	return r0
}

// UpdateDetails is a mock of UserService.UpdateDetails
func (m *MockProductService) UpdateDetails(ctx context.Context, u *model.User) error {
	ret := m.Called(ctx, u)

	var r0 error
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(error)
	}

	return r0
}
