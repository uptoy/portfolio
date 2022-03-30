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

func (r *pGCartRepository) CartGet(ctx context.Context, userID uuid.UUID) ([]model.CartItem, error) {
	cart := []model.CartItem{}
	query1 :=
		`SELECT products.*, cart_items.quantity, ROUND((products.price * cart_items.quantity)::numeric, 2) AS subtotal FROM users
	JOIN carts ON users.user_id = cart.user_id
	JOIN cart_items ON carts.id = cart_items.cart_id
	JOIN products ON products.product_id = cart_items.product_id
	WHERE users.user_id = $1
	`
	if err := r.DB.GetContext(ctx, &cart, query1, userID); err != nil {
		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
			log.Printf("Could not create a cart_item: Reason: %v\n", err.Code.Name())
			return nil, apperrors.NewConflict("cart_item", "cart_item")
		}
		log.Printf("Could not create a cart : %v. Reason: %v\n", cart, err)
		return nil, apperrors.NewInternal()
	}
	return cart, nil
}

func (r *pGCartRepository) CartAddItem(ctx context.Context, cartId int64, productId int64, quantity int64) ([]model.CartItem, error) {
	cart := []model.CartItem{}
	query1 :=
		`INSERT INTO cart_items(cart_id, product_id, quantity)
      VALUES($1, $2, $3) ON CONFLICT (cart_id, product_id)
      DO UPDATE SET quantity = cart_items.quantity + 1 RETURNING *`
	if err := r.DB.GetContext(ctx, &cart, query1, cartId, quantity); err != nil {
		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
			log.Printf("Could not create a cart_item: Reason: %v\n", err.Code.Name())
			return nil, apperrors.NewConflict("cart_item", "cart_item")
		}
		log.Printf("Could not create a cart : %v. Reason: %v\n", cart, err)
		return nil, apperrors.NewInternal()
	}
	query2 :=
		`SELECT products.*, cart_items.quantity, ROUND((products.price * cart_items.quantity)::numeric, 2) AS subtotal FROM cart_items JOIN products ON cart_items.product_id = products.product_id WHERE cart_items.cart_id = $1`
	if err := r.DB.SelectContext(ctx, &cart, query2, cartId); err != nil {
		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
			log.Printf("Could not create a cart_item: Reason: %v\n", err.Code.Name())
			return nil, apperrors.NewConflict("cart_item", "cart_item")
		}
		log.Printf("Could not create a cart : %v. Reason: %v\n", cart, err)
		return nil, apperrors.NewInternal()
	}

	return cart, nil
}

func (r *pGCartRepository) CartDeleteItem(ctx context.Context, cartId int64, productId int64) ([]model.CartItem, error) {
	cart := []model.CartItem{}
	query := `DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2 RETURNING *`
	if err := r.DB.GetContext(ctx, &cart, query, cartId, productId); err != nil {
		log.Printf("Unable to remove cart: %v. Err: %v\n", cart, err)
		return nil, apperrors.NewNotFound("cart", "cart")
	}
	return cart, nil
}

func (r *pGCartRepository) CartIncrementItem(ctx context.Context, cartId int64, productId int64) ([]model.CartItem, error) {
	cart := []model.CartItem{}
	query :=
		`SELECT products.*, cart_items.quantity,
	ROUND((products.price * cart_items.quantity)::numeric, 2) AS subtotal
	FROM cart_items JOIN products
	ON cart_items.product_id = products.product_id
	WHERE cart_items.cart_id = $1
	`
	if err := r.DB.GetContext(ctx, &cart, query, cartId, productId); err != nil {
		log.Printf("Unable to remove cart: %v. Err: %v\n", cart, err)
		return nil, apperrors.NewNotFound("cart", "cart")
	}
	return cart, nil
}

func (r *pGCartRepository) CartDecrementItem(ctx context.Context, cartId int64, productId int64) ([]model.CartItem, error) {
	cart := []model.CartItem{}
	query1 := `UPDATE cart_items SET quantity = quantity - 1 WHERE cart_items.cart_id = $1 AND cart_items.product_id = $2 RETURNING *`
	if err := r.DB.GetContext(ctx, &cart, query1, cartId, productId); err != nil {
		log.Printf("Unable to remove cart: %v. Err: %v\n", cart, err)
		return nil, apperrors.NewNotFound("cart", "cart")
	}
	query2 := `SELECT products.*, cart_items.quantity, ROUND((products.price * cart_items.quantity)::numeric, 2) AS subtotal FROM cart_items JOIN products ON cart_items.product_id = products.product_id WHERE cart_items.cart_id = $1`
	if err := r.DB.GetContext(ctx, &cart, query2, cartId, productId); err != nil {
		log.Printf("Unable to remove cart: %v. Err: %v\n", cart, err)
		return nil, apperrors.NewNotFound("cart", "cart")
	}
	return cart, nil
}
