package mocks

import (
	"context"

	"backend/model"
	"github.com/google/uuid"
	"github.com/stretchr/testify/mock"
)

// MockUserRepository is a mock type for model.UserRepository
type MockUserRepository struct {
	mock.Mock
}

// FindByID is mock of UserRepository FindByID
func (m *MockUserRepository) FindByID(ctx context.Context, uid uuid.UUID) (*model.User, error) {
	ret := m.Called(ctx, uid)

	var r0 *model.User
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.User)
	}

	var r1 error

	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}

	return r0, r1
}

// Create is a mock for UserRepository Create
func (m *MockUserRepository) Create(ctx context.Context, u *model.User) (*model.User, error) {
	ret := m.Called(ctx, u)
	var r0 *model.User
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.User)
	}

	var r1 error

	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}

	return r0, r1
}

// FindByEmail is mock of UserRepository.FindByEmail
func (m *MockUserRepository) FindByEmail(ctx context.Context, email string) (*model.User, error) {
	ret := m.Called(ctx, email)

	var r0 *model.User
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.User)
	}

	var r1 error

	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}

	return r0, r1
}

// Update is mock of UserRepository.Update
func (m *MockUserRepository) Update(ctx context.Context, u *model.User) error {
	ret := m.Called(ctx, u)

	var r0 error
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(error)
	}

	return r0
}

func (m *MockUserRepository) Count(ctx context.Context) (int, error) {
	ret := m.Called(ctx)
	var r0 int
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(int)
	}

	var r1 error

	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}

	return r0, r1
}

func (m *MockUserRepository) GetList(ctx context.Context) ([]*model.User, error) {
	ret := m.Called(ctx)

	var r0 []*model.User
	if ret.Get(0) != nil {
		r0 = ret.Get(0).([]*model.User)
	}

	var r1 error

	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}

	return r0, r1
}
