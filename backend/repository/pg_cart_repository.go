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
		`SELECT products.*, cart_items.quantity, round((products.price * cart_items.quantity)::numeric, 2) as subtotal from users
	join carts on users.user_id = cart.user_id
	join cart_items on carts.id = cart_items.cart_id
	join products on products.product_id = cart_items.product_id
	where users.user_id = $1
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
      DO UPDATE set quantity = cart_items.quantity + 1 returning *`
	if err := r.DB.GetContext(ctx, &cart, query1, cartId, quantity); err != nil {
		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
			log.Printf("Could not create a cart_item: Reason: %v\n", err.Code.Name())
			return nil, apperrors.NewConflict("cart_item", "cart_item")
		}
		log.Printf("Could not create a cart : %v. Reason: %v\n", cart, err)
		return nil, apperrors.NewInternal()
	}
	query2 :=
		`Select products.*, cart_items.quantity, round((products.price * cart_items.quantity)::numeric, 2) as subtotal from cart_items join products on cart_items.product_id = products.product_id where cart_items.cart_id = $1`
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
	query := `delete from cart_items where cart_id = $1 AND product_id = $2 returning *`
	if err := r.DB.GetContext(ctx, &cart, query, cartId, productId); err != nil {
		log.Printf("Unable to remove cart: %v. Err: %v\n", cart, err)
		return nil, apperrors.NewNotFound("cart", "cart")
	}
	return cart, nil
}

func (r *pGCartRepository) CartIncrementItem(ctx context.Context, cartId int64, productId int64) ([]model.CartItem, error) {
	cart := []model.CartItem{}
	query :=
		`Select products.*, cart_items.quantity,
	round((products.price * cart_items.quantity)::numeric, 2) as subtotal
	from cart_items join products
	on cart_items.product_id = products.product_id
	where cart_items.cart_id = $1
	`
	if err := r.DB.GetContext(ctx, &cart, query, cartId, productId); err != nil {
		log.Printf("Unable to remove cart: %v. Err: %v\n", cart, err)
		return nil, apperrors.NewNotFound("cart", "cart")
	}
	return cart, nil
}

func (r *pGCartRepository) CartDecrementItem(ctx context.Context, cartId int64, productId int64) ([]model.CartItem, error) {
	cart := []model.CartItem{}
	query1 := `update cart_items set quantity = quantity - 1 where cart_items.cart_id = $1 AND cart_items.product_id = $2 returning *`
	if err := r.DB.GetContext(ctx, &cart, query1, cartId, productId); err != nil {
		log.Printf("Unable to remove cart: %v. Err: %v\n", cart, err)
		return nil, apperrors.NewNotFound("cart", "cart")
	}
	query2 := `Select products.*, cart_items.quantity, round((products.price * cart_items.quantity)::numeric, 2) as subtotal from cart_items join products on cart_items.product_id = products.product_id where cart_items.cart_id = $1`
	if err := r.DB.GetContext(ctx, &cart, query2, cartId, productId); err != nil {
		log.Printf("Unable to remove cart: %v. Err: %v\n", cart, err)
		return nil, apperrors.NewNotFound("cart", "cart")
	}
	return cart, nil
}
