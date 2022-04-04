package service

import (
	"context"
	"log"

	"backend/model"
	"backend/model/apperrors"
	// "backend/service"
)

type authService struct {
	AuthRepository model.AuthRepository
}

// USConfig will hold repositories that will eventually be injected into this
// this service layer
type AuthServiceConfig struct {
	AuthRepository model.AuthRepository
}

func NewAuthService(c *AuthServiceConfig) model.AuthService {
	return &authService{
		AuthRepository: c.AuthRepository,
	}
}

func (s *authService) ForgotPassword(ctx context.Context, passwordReset *model.PasswordReset) error {
	err := s.AuthRepository.ForgotPassword(ctx, passwordReset)
	if err != nil {
		log.Printf("Unable to service forgot password: %v\n", passwordReset.Email)
		return apperrors.NewInternal()
	}
	return nil
}

// func (s *authService) ResetPassword(ctx context.Context, newPassword string, passwordReset *model.PasswordReset) error {
// 	hashPassword, err := hashPassword(newPassword)
// 	if err != nil {
// 		log.Printf("Unable to reset password hash: %v\n", passwordReset.Email)
// 		return apperrors.NewInternal()
// 	}
// 	err1 := s.AuthRepository.ResetPassword(ctx, hashPassword, passwordReset)
// 	if err1 != nil {
// 		log.Printf("Unable to service reset password: %v\n", passwordReset.Email)
// 		return apperrors.NewAuthorization("Invalid reset password")
// 	}
// 	return apperrors.NewInternal()
// }
