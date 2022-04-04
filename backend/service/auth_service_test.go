package service

import (
	"context"
	// "fmt"
	// "fmt"
	// "io/ioutil"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"

	"backend/model"
	"backend/model/mocks"
)

func ForgotPassword(t *testing.T) {
	mockAuthRepository := new(mocks.MockAuthRepository)
	mockTokenRepository := new(mocks.MockTokenRepository)

	authService := NewAuthService(&AuthServiceConfig{
		AuthRepository: mockAuthRepository,
	})
	tokenService := NewTokenService(&TSConfig{
		TokenRepository: mockTokenRepository,
	})

	// uid, _ := uuid.NewRandom()
	mockReset := &model.PasswordReset{
		ID:    1,
		Email: "email@email.com",
	}
	email := mockReset.Email
	t.Run("Success", func(t *testing.T) {
		ctx := context.Background()
		reset := &model.PasswordReset{}

		token, err := tokenService.ForgotPasswordToken(ctx, email, "")
		assert.NoError(t, err)
		mockTokenRepository.On("ForgotPasswordToken", mock.AnythingOfType("*context.emptyCtx"), email, "").Return(token, nil)
		mockReset.Token = token
		err1 := authService.ForgotPassword(ctx, reset)
		mockAuthRepository.On("ForgotPassword", mock.AnythingOfType("*context.emptyCtx"), mockReset).Return(nil)
		assert.NoError(t, err1)
	})
}
func ResetPassword(t *testing.T) {
	mockAuthRepository := new(mocks.MockAuthRepository)
	mockTokenRepository := new(mocks.MockTokenRepository)

	authService := NewAuthService(&AuthServiceConfig{
		AuthRepository: mockAuthRepository,
	})
	tokenService := NewTokenService(&TSConfig{
		TokenRepository: mockTokenRepository,
	})
	t.Run("Success", func(t *testing.T) {
		ctx := context.Background()
		email := "email@email.com"
		newPassword := "newpassword"
		token, err := tokenService.ForgotPasswordToken(ctx, email, "")
		assert.NoError(t, err)
		mockReset := &model.PasswordReset{
			Email: email,
			Token: token,
		}
		err1 := authService.ResetPassword(ctx, newPassword, mockReset)
		assert.NoError(t, err1)
		mockAuthRepository.On("ResetPassword", mock.AnythingOfType("*context.emptyCtx"), newPassword,mockReset).Return(nil)
	})
}
