package service

import (
	"context"
	"fmt"
	"fmt"
	"fmt"
	"io/ioutil"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"

	"backend/model"
	"backend/model/apperrors"
	"backend/model/mocks"
)

func TestForgotPassword(t *testing.T) {
	mockReset := &model.PasswordReset{
		ID:    1,
		Email: "email@email.com",
	}

	t.Run("Success", func(t *testing.T) {
		mockAuthRepository := new(mocks.MockAuthRepository)
		authService := NewAuthService(&AuthServiceConfig{
			AuthRepository: mockAuthRepository,
		})
		ctx := context.Background()
		reset := &model.PasswordReset{}
		token := "token"
		mockReset.Token = token
		mockAuthRepository.On("ForgotPassword", mock.AnythingOfType("*context.emptyCtx"), mock.AnythingOfType("*model.PasswordReset")).Return(nil)
		err1 := authService.ForgotPassword(ctx, reset)
		assert.NoError(t, err1)
	})
}

func TestResetPassword(t *testing.T) {
	t.Run("Success", func(t *testing.T) {
		email := "email@email.com"
		newpassword := "newpassword"
		hashPass, err := hashPassword(newpassword)
		assert.NoError(t, err)
		token := "token"
		mockReset := &model.PasswordReset{
			Email: email,
			Token: token,
		}
		mockArgs := mock.Arguments{
			mock.AnythingOfType("*context.emptyCtx"),
			hashPass,
			mockReset,
		}
		mockAuthRepository := new(mocks.MockAuthRepository)
		as := NewAuthService(&AuthServiceConfig{
			AuthRepository: mockAuthRepository,
		})
		mockAuthRepository.
			On("ResetPassword", mockArgs...).
			Run(func(args mock.Arguments) {
				userArg := args.Get(1).(*model.User) // arg 0 is context, arg 1 is *User
				userArg.Password = hashPass
			}).Return(nil)

		ctx := context.TODO()
		err1 := as.ResetPassword(ctx, newpassword, mockReset)
		assert.NoError(t, err1)
		mockAuthRepository.AssertCalled(t, "ResetPassword", mockArgs...)
	})
}
