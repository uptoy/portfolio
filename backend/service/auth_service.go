package service

import (
	"context"

	"backend/model"
)

type authService struct {
	AuthRepository model.AuthRepository
}

type AuthServiceConfig struct {
	AuthRepository model.AuthRepository
}

func NewAuthService(c *AuthServiceConfig) model.AuthService {
	return &authService{
		AuthRepository: c.AuthRepository,
	}
}

func (s *userService) ResetPassword(ctx context.Context, resetPassword *model.ResetPassword) error {
	return nil
}
func (s *userService) ForgotPassword(ctx context.Context, forgotPassword *model.ForgotPassword) error {
	return nil
}
