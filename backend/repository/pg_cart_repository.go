package repository

import (
	"backend/model"
	"context"
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
func (r *pGCartRepository) CartGet(ctx context.Context, userID uuid.UUID) ([]model.CartItem, error) {

	var cart = []model.CartItem{}
	var err error
	return cart, err
}

func (r *pGCartRepository) CartAddItem(ctx context.Context, userId uuid.UUID, cartItem *model.CartItem) (*model.Cart, error) {

	var cart = model.Cart{}
	var err error
	return &cart, err
}

func (r *pGCartRepository)CartDeleteItem(ctx context.Context, cartId int64, productId int64) ([]model.CartItem, error) {
	var cart = []model.CartItem{}
	var err error
	return cart, err
}

func (r *pGCartRepository)CartIncrementItem(ctx context.Context, cartId int64, productId int64) ([]model.CartItem, error){
	var cart = []model.CartItem{}
	var err error
	return cart, err
}
func (r *pGCartRepository)CartDecrementItem(ctx context.Context, cartId int64, productId int64) ([]model.CartItem, error) {
	var cart = []model.CartItem{}
	var err error
	return cart, err
}

// func (r *pGCartRepository) CartRemoveItem(ctx context.Context, userId uuid.UUID, productId uuid.UUID) (*model.Cart, error) {
// 	var cart = model.Cart{}
// 	var err error
// 	return &cart, err
// }

// func (r *pGCartRepository) GetCartItemList(ctx context.Context, userId uuid.UUID) (*model.Cart, error) {
// 	cartItem := model.CartItem{}
// 	cart := model.Cart{}
// 	query := `
// 	SELECT id, user_id, path, title, description FROM cartItem
// 	ORDER BY created_at DESC LIMIT ? OFFSET ?
// `
// 	err := sqlx.SelectContext(ctx, r.DB, &cartItem, query)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return &cart, err
// }

// func (r *pGCartRepository) UpdateCartItem(ctx context.Context, uid uuid.UUID, input *model.Product) (*model.Cart, error){
// 	var cart = model.Cart{}
// 	var err error
// 	return &cart,err
// }
