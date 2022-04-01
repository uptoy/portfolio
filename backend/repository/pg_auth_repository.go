package repository

import (
	"context"
	"log"
	"backend/model"
	"backend/model/apperrors"
	"github.com/jmoiron/sqlx"
	"github.com/lib/pq"
)

type pGAuthRepository struct {
	DB *sqlx.DB
}

func NewAuthRepository(db *sqlx.DB) model.AuthRepository {
	return &pGAuthRepository{
		DB: db,
	}
}

func (r *pGAuthRepository) ForgotPassword(ctx context.Context, resetPassword *model.ResetPassword) (*model.ResetPassword, error) {
	user := model.User{}
	query := "SELECT * FROM users WHERE email=$1"
	email := resetPassword.Email
	if err := r.DB.GetContext(ctx, &user, query, email); err != nil {
		return nil, apperrors.NewNotFound("email", email)
	}
	query1 := "INSERT INTO reset_password (email, token) VALUES ($1, $2) RETURNING *"
	if err := r.DB.GetContext(ctx, resetPassword, query1, resetPassword.Email, resetPassword.Token); err != nil {
		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
			log.Printf("Could not reset password: %v. Reason: %v\n", resetPassword.Email, err.Code.Name())
			return nil, apperrors.NewConflict("email", resetPassword.Email)
		}
		log.Printf("Could not reset password: %v. Reason: %v\n", resetPassword.Email, err)
		return nil, apperrors.NewInternal()
	}
	return resetPassword, nil
}

func (r *pGAuthRepository) ResetPassword(ctx context.Context, resetPassword *model.ResetPassword) error {
	token := resetPassword.Token
	user := &model.User{}
	email := resetPassword.Email
	query := "SELECT * FROM reset_password WHERE token=$1"
	if err := r.DB.GetContext(ctx, resetPassword, query, token); err != nil {
		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
			log.Printf("Could not reset password: %v. Reason: %v\n", resetPassword.Email, err.Code.Name())
			return apperrors.NewConflict("email", resetPassword.Email)
		}
		log.Printf("Could not reset password: %v. Reason: %v\n", resetPassword.Email, err)
		return apperrors.NewInternal()
	}
	password := resetPassword.NewPassword
	query1 := `
		UPDATE users
		SET password=$2
		WHERE email=$1
		RETURNING *;
		`
	if err := r.DB.GetContext(ctx, user, query1, email, password); err != nil {
		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
			log.Printf("Could not reset password: %v. Reason: %v\n", resetPassword.Email, err.Code.Name())
			return apperrors.NewConflict("email", resetPassword.Email)
		}
		log.Printf("Could not reset password: %v. Reason: %v\n", resetPassword.Email, err)
		return apperrors.NewInternal()
	}
	query2 := "DELETE * FROM reset_password WHERE id=$1  RETURNING *"
	if err := r.DB.GetContext(ctx, resetPassword, query2, resetPassword.ID); err != nil {
		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
			log.Printf("Could not reset password: %v. Reason: %v\n", resetPassword.Email, err.Code.Name())
			return apperrors.NewConflict("email", resetPassword.Email)
		}
		log.Printf("Could not reset password: %v. Reason: %v\n", resetPassword.Email, err)
		return apperrors.NewInternal()
	}
	return nil
}
