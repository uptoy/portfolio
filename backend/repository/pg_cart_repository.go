package repository

import (
	"context"
	"backend/model"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

// PGCartRepository is data/repository implementation
// of service layer CartRepository
type pGCartRepository struct {
	DB *sqlx.DB
}

// NewCartRepository is a factory for initializing Cart Repositories
func NewCartRepository(db *sqlx.DB) model.CartRepository {
	return &pGCartRepository{
		DB: db,
	}
}

// Create reaches out to database SQLX api
func (r *pGCartRepository) AddCartItem(ctx context.Context, uid uuid.UUID, product *model.Product) (*model.Cart, error) {
	var cart = model.Cart{}
	var err error
	return &cart,err
}

func (r *pGCartRepository) RemoveCartItem(ctx context.Context, input *model.Product) (*model.Cart, error) {
	var cart = model.Cart{}
	var err error
	return &cart,err
}

func (r *pGCartRepository) GetCartItem(ctx context.Context, uid uuid.UUID) (*model.Cart, error) {
	var cart = model.Cart{}
	var err error
	return &cart,err
}

func (r *pGCartRepository) UpdateCartItem(ctx context.Context, uid uuid.UUID, input *model.Product) (*model.Cart, error){
	var cart = model.Cart{}
	var err error
	return &cart,err
}
