package mocks

import (
	"context"

	"backend/model"
	"github.com/stretchr/testify/mock"
)

type MockAuthService struct {
	mock.Mock
}

func (m *MockAuthService) ForgotPassword(ctx context.Context, passwordReset *model.PasswordReset) error {
	ret := m.Called(ctx, passwordReset)
	var r0 error
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(error)
	}
	return r0
}

func (m *MockAuthService) ResetPassword(ctx context.Context, newPassword string, passwordReset *model.PasswordReset) error {
	ret := m.Called(ctx, newPassword, passwordReset)
	var r0 error
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(error)
	}
	return r0
}
