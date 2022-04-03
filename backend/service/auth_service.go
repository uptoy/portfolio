package service

import (
	"context"
	"log"

	"backend/model"
	"backend/model/apperrors"
	"golang.org/x/crypto/bcrypt"
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
	if err := s.AuthRepository.ForgotPassword(ctx, passwordReset); err != nil {
		return err
	}
	return apperrors.NewInternal()
}

// func (s *authService) ResetPassword(ctx context.Context, newPassword string, passwordReset *model.PasswordReset) error {
// new_password, err := bcrypt.GenerateFromPassword([]byte(newPassword), 14)
// s := string(new_password)

// err := s.AuthRepository.ResetPassword(ctx, newPassword, passwordReset)
// if err != nil {
// 	log.Printf("Unable to service reset password: %v\n", passwordReset.Email)
// 	return apperrors.NewAuthorization("Invalid email and password combination")
// }
// return apperrors.NewInternal()
// 	return nil
// }
func (s *authService) ResetPassword(ctx context.Context, newPassword string, passwordReset *model.PasswordReset) error {
	// new_password, err := bcrypt.GenerateFromPassword([]byte(newPassword), 14)
	// s := string(new_password)
	test := "sample"

	// string 型 → []byte 型
	b := []byte(test)

	// []byte 型 → string 型
	s := string(b)
	return nil

}
