package repository

import (
	"backend/model"
	"backend/model/apperrors"
	"context"
	"log"

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

func (r *pGAuthRepository) ForgotPassword(ctx context.Context, passwordReset *model.PasswordReset) error {
	query := "INSERT INTO resets (email, token) VALUES ($1, $2) RETURNING *"
	if err := r.DB.GetContext(ctx, passwordReset, query, passwordReset.Email, passwordReset.Token); err != nil {
		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
			log.Printf("Could not forget password: %v. Reason: %v\n", passwordReset.Email, err.Code.Name())
			return nil
		}
		log.Printf("Could not forget password: %v. Reason: %v\n", passwordReset.Email, err)
		return nil
	}
	return nil
}

func (r *pGAuthRepository) ResetPassword(ctx context.Context, hashPassword string, passwordReset *model.PasswordReset) error {
	reset := &model.PasswordReset{}
	query := "SELECT * FROM resets WHERE token=$1"
	if err := r.DB.GetContext(ctx, reset, query, passwordReset.Token); err != nil {
		return apperrors.NewNotFound("email", reset.Email)
	}
	user := &model.User{}
	user.PreUpdate()
	query1 := `
		UPDATE users
		SET password=$2
		WHERE email=$1
		RETURNING *;
	`
	if err := r.DB.GetContext(ctx, user, query1, passwordReset.Email, hashPassword); err != nil {
		return apperrors.NewNotFound("email", reset.Email)
	}
	return nil
}
