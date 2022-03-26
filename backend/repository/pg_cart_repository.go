package repository

import (
	"backend/model"
	"backend/model/apperrors"
	"context"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/lib/pq"
	"log"
)

type pGCartRepository struct {
	DB *sqlx.DB
}

func NewCartRepository(db *sqlx.DB) model.CartRepository {
	return &pGCartRepository{
		DB: db,
	}
}

func (r *pGCartRepository) CartAdd(ctx context.Context, userID uuid.UUID, productId int64, quantity int64) (*model.Cart, error) {
	cart_item := model.CartItem{}
	query1 := `INSERT INTO cart_items (product_id,quantity) VALUES ($1,$2) RETURNING *`
	if err := r.DB.GetContext(ctx, &cart_item, query1, productId, quantity); err != nil {
		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
			log.Printf("Could not create a cart_item: Reason: %v\n", err.Code.Name())
			return nil, apperrors.NewConflict("cart_item", "cart_item")
		}
		log.Printf("Could not create a cart : %v. Reason: %v\n", cart_item,err)
		return nil, apperrors.NewInternal()
	}

	product := model.Product{}
	query2 := "SELECT * FROM products WHERE product_id=$1"
	if err := r.DB.SelectContext(ctx, &product, query2, productId); err != nil {
		log.Printf("Unable to get cart: %v. Err: %v\n", product, err)
		return nil, apperrors.NewNotFound("carts", "carts")
	}

	total_price := product.Price * quantity
	cart := model.Cart{}
	query3 := `INSERT INTO carts (user_id,cart_item_id,total_price) VALUES ($1,$2,$3) RETURNING *`
	if err := r.DB.GetContext(ctx, &cart, query3, userID, cart_item.CartItemId, total_price); err != nil {
		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
			log.Printf("Could not create a cart: %v. Reason: %v\n",cart, err.Code.Name())
			return nil, apperrors.NewConflict("cart", "cart")
		}
		log.Printf("Could not create a cart : %v. Reason: %v\n",cart, err)
		return nil, apperrors.NewInternal()
	}
	return &cart, nil
}

func (r *pGCartRepository) CartList(ctx context.Context, userID uuid.UUID) ([]model.Cart, error) {
	cart := []model.Cart{}
	query := "SELECT * FROM carts WHERE cart_id=$1"
	if err := r.DB.SelectContext(ctx, &cart, query, userID); err != nil {
		log.Printf("Unable to get cart: %v. Err: %v\n", cart, err)
		return nil, apperrors.NewNotFound("carts", "carts")
	}
	return cart, nil
}


func (r *pGCartRepository) CartRemove(ctx context.Context, userID uuid.UUID, productId int64, quantity int64) (*model.Cart, error) {
	cart := model.Cart{}
	query := "SELECT * FROM carts WHERE cart_id=$1"
	if err := r.DB.GetContext(ctx, &cart, query, userID); err != nil {
		log.Printf("Unable to remove cart: %v. Err: %v\n", cart, err)
		return nil, apperrors.NewNotFound("cart", "cart")
	}
	query2 := "DELETE FROM carts WHERE cart_id = $1"
	_, err2 := r.DB.ExecContext(ctx, query2, userID)
	if err2 != nil {
		log.Printf("Unable to remove cart: %v. Err: %v\n", cart, err2)
		return nil, apperrors.NewNotFound("cart_id", "cart_id")
	}
	return &cart, nil
}
