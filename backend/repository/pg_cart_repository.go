package repository

import (
	"backend/model"
	"backend/model/apperrors"
	"context"
	"log"
	"strconv"

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

func (r *pGCartRepository) CartCreate(ctx context.Context, userID uuid.UUID) (*model.Cart, error) {
	cart := model.Cart{}
	query := `INSERT INTO carts (user_id) VALUES ($1) RETURNING *`
	if err := r.DB.GetContext(ctx, &cart, query, userID); err != nil {
		log.Printf("Could not create a cart : %v. Reason: %v\n", userID, err)
		return nil, apperrors.NewInternal()
	}
	return &cart, nil
}

func (r *pGCartRepository) CartGet(ctx context.Context, cartID int64) ([]*model.CartItem, error) {
	query := `
	SELECT DISTINCT ON (p.id)
			p.*,ci.quantity,ci.product_id
			FROM cart_item ci
			LEFT JOIN products p ON p.id = ci.product_id
				WHERE ci.cart_id = $1
	`
	var cij []cartItemJoin
	id := strconv.Itoa(int(cartID))
	if err := r.DB.SelectContext(ctx, &cij, query, id); err != nil {
		return nil, apperrors.NewNotFound("cartID", id)
	}
	result := make([]*model.CartItem, 0)
	for _, x := range cij {
		result = append(result, x.ToCartItem())
	}
	return result, nil
}

//ok
func (r *pGCartRepository) CartAddItem(ctx context.Context, cartItem *model.CartItem) (*model.CartItem, error) {
	query :=
		`
	INSERT INTO cart_item (cart_id, product_id, quantity) VALUES ($1, $2,$3) RETURNING *
	`

	if err := r.DB.GetContext(ctx, cartItem, query, cartItem.CartId, cartItem.ProductId, cartItem.Quantity); err != nil {
		log.Printf("Unable to add cart item: %v. Err: %v\n", cartItem, err)
		id := strconv.Itoa(int(cartItem.CartId))
		return nil, apperrors.NewNotFound("Unable to add cart item", id)
	}
	return cartItem, nil
}

func (r *pGCartRepository) CartDeleteItem(ctx context.Context, cartId int64, productId int64) (*model.CartItem, error) {
	cartItem := model.CartItem{}
	query :=
		`
		DELETE FROM cart_item Where cart_id = $1 AND product_id = $2 RETURNING *
	`
	if err := r.DB.GetContext(ctx, &cartItem, query, cartId, productId); err != nil {
		log.Printf("Unable to get user's cart: %v. Err: %v\n", cartItem, err)
		return nil, apperrors.NewNotFound("user's cart", "user's cart")
	}
	return &cartItem, nil
}

func (r *pGCartRepository) CartIncrementItem(ctx context.Context, cartId int64, productId int64) (*model.CartItem, error) {
	cartItem := model.CartItem{}
	query :=
		`
		UPDATE cart_item SET quantity = quantity + 1 WHERE cart_item.cart_id = $1 AND cart_item.product_id = $2 RETURNING *
	`
	_, err := r.DB.QueryContext(ctx, query, cartId, productId)
	if err != nil {
		log.Printf("Unable to get user's cart: %v. Err: %v\n", cartItem, err)
		return nil, apperrors.NewNotFound("user's cart", "user's cart")
	}
	return &cartItem, nil
}
func (r *pGCartRepository) CartDecrementItem(ctx context.Context, cartId int64, productId int64) (*model.CartItem, error) {
	cartItem := model.CartItem{}
	query :=
		`
		UPDATE cart_item SET quantity = quantity - 1 WHERE cart_item.cart_id = $1 AND cart_item.product_id = $2 RETURNING *
	`
	_, err := r.DB.QueryContext(ctx, query, cartId, productId)
	if err != nil {
		log.Printf("Unable to get user's cart: %v. Err: %v\n", cartItem, err)
		return nil, apperrors.NewNotFound("user's cart", "user's cart")
	}
	return &cartItem, nil
}

func (r *pGCartRepository) CartGetId(ctx context.Context, userId uuid.UUID) (int64, error) {
	var cartId int64
	query :=
		`
	SELECT carts.id
	FROM carts
	WHERE user_id = $1
`
	if err := r.DB.GetContext(ctx, &cartId, query, userId); err != nil {
		log.Printf("Unable to get user's cart: %v. Err: %v\n", cartId, err)
		return cartId, apperrors.NewNotFound("user's cart", "user's cart")
	}
	// cart := model.Cart{}
	// query :=
	// 	`
	// SELECT * FROM carts WHERE user_id=$1"
	// `
	// if err := r.DB.GetContext(ctx, &cart, query, userId); err != nil {
	// 	log.Printf("Unable to  get cart id: %v. Err: %v\n", cart, err)
	// 	return cart.Id, apperrors.NewNotFound("Unable to get cart id", string(cart.Id))
	// }
	// cart_id := cart.Id
	return cartId, nil
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

// cartItems := []model.CartItem{}
// // query := `
// // SELECT products.*, cart_item.quantity, products.price * cart_item.quantity) AS SUBTOTAL FROM users
// // JOIN cart ON users.user_id = cart.user_id
// // JOIN cart_item ON cart.id = cart_item.cart_id
// // JOIN products ON products.id = cart_item.product_id
// // Where users.uid = $1

// // `
// query :=`	SELECT * FROM carts WHERE user_id=$1"`
// if err := r.DB.SelectContext(ctx, &cartItems, query, userID); err != nil {
// 	log.Printf("Unable to get user's cart: %v. Err: %v\n", cartItems, err)
// 	return nil, apperrors.NewNotFound("user's cart", "user's cart")
// }
// return cartItems, nil
