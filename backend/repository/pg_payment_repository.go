package repository

import (
	"backend/model"
	// "backend/model/apperrors"
	// "context"
	// "log"

	"context"
	"github.com/jmoiron/sqlx"
	// "github.com/lib/pq"
)

type pGPaymentRepository struct {
	DB *sqlx.DB
}

func NewPaymentRepository(db *sqlx.DB) model.PaymentRepository {
	return &pGPaymentRepository{
		DB: db,
	}
}

func (r *pGPaymentRepository) Payment(ctx context.Context, amount int64, email string) error  {
	return nil
}
