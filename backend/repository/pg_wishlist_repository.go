package repository

import (
	"backend/model"
	"backend/model/apperrors"
	"context"
	"log"
	"time"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	// "github.com/lib/pq"
)

type pGWishlistRepository struct {
	DB *sqlx.DB
}

func NewWishlistRepository(db *sqlx.DB) model.WishlistRepository {
	return &pGWishlistRepository{
		DB: db,
	}
}

func (r *pGWishlistRepository) WishlistCreate(ctx context.Context, userId uuid.UUID, productId int64) ([]*model.Product, error) {
	wishlist := model.Wishlist{}
	query := `INSERT INTO user_product (user_id,product_id) VALUES ($1,$2) RETURNING *`
	if err := r.DB.GetContext(ctx, &wishlist, query, userId, productId); err != nil {
		log.Printf("Could not create a wishlist : %v. Reason: %v\n", userId, err)
		return nil, apperrors.NewInternal()
	}
	query1 := `
	SELECT DISTINCT ON (p.id)
		p.*,
		c.category_name
		FROM products p
		LEFT JOIN categories c ON p.category_id = c.id
		LEFT JOIN user_product up ON p.id = up.product_id
		LEFT JOIN users u ON u.uid = up.user_id
			WHERE u.uid = $1
	`
	var pj []productJoin
	if err := r.DB.SelectContext(ctx, &pj, query1, userId); err != nil {
		return nil, apperrors.NewNotFound("userid", userId.String())
	}

	result := make([]*model.Product, 0)
	for _, x := range pj {
		result = append(result, x.ToProduct())
	}

	return result, nil
}

func (r *pGWishlistRepository) WishlistDelete(ctx context.Context, userId uuid.UUID, productId int64) ([]*model.Product, error) {
	wishlist := model.Wishlist{}
	query :=
		`
	DELETE FROM user_product Where user_id = $1 AND product_id = $2
	`
	_, err := r.DB.ExecContext(ctx, query, userId, productId)
	if err != nil {
		log.Printf("Unable to get product: %v. Err: %v\n", wishlist, err)
		return nil, apperrors.NewNotFound("wishlist", "userId")
	}
	query1 := `
	SELECT DISTINCT ON (p.id)
		p.*,
		c.category_name
		FROM products p
		LEFT JOIN categories c ON p.category_id = c.id
		LEFT JOIN user_product up ON p.id = up.product_id
		LEFT JOIN users u ON u.uid = up.user_id
			WHERE u.uid = $1
	`
	var pj []productJoin
	if err := r.DB.SelectContext(ctx, &pj, query1, userId); err != nil {
		return nil, apperrors.NewNotFound("userid", userId.String())
	}

	result := make([]*model.Product, 0)
	for _, x := range pj {
		result = append(result, x.ToProduct())
	}
	return result, nil
}

func (r *pGWishlistRepository) WishlistGet(ctx context.Context, userId uuid.UUID) ([]*model.Product, error) {
	query := `
	SELECT DISTINCT ON (p.id)
		p.*,
		c.category_name
		FROM products p
		LEFT JOIN categories c ON p.category_id = c.id
		LEFT JOIN user_product up ON p.id = up.product_id
		LEFT JOIN users u ON u.uid = up.user_id
			WHERE u.uid = $1
	`
	var pj []productJoin
	if err := r.DB.SelectContext(ctx, &pj, query, userId); err != nil {
		return nil, apperrors.NewNotFound("userid", userId.String())
	}

	wishlist := make([]*model.Product, 0)
	for _, x := range pj {
		wishlist = append(wishlist, x.ToProduct())
	}

	return wishlist, nil
}

// func (r *pGWishlistRepository) WishlistAddItem(ctx context.Context, userId uuid.UUID, productId int64) ([]*model.Product, error) {
// 	wishlist := []*model.Product{}
// 	query := `INSERT INTO product_wishlist (user_id, product_id) VALUES  ($1, $2) RETURNING *`
// 	if err := r.DB.GetContext(ctx, wishlist, query, userId, productId); err != nil {
// 		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
// 			log.Printf("Could not create a userId: %v. Reason: %v\n", userId, err.Code.Name())
// 			return nil, err
// 		}
// 		log.Printf("Could not create a userId: %v. Reason: %v\n", userId, err)
// 		return nil, apperrors.NewInternal()
// 	}
// 	return wishlist, nil
// }

// func (r *pGWishlistRepository) WishlistClear(ctx context.Context, userId uuid.UUID) error {
// 	wishlist := []*model.Product{}
// 	query := "DELETE FROM product_wishlist WHERE user_id=$1  VALUES  ($1)"
// 	if err := r.DB.GetContext(ctx, wishlist, query, userId); err != nil {
// 		log.Printf("Unable to get product: %v. Err: %v\n", wishlist, err)
// 		return apperrors.NewNotFound("wishlist", "userId")
// 	}
// 	return nil
// }

type Category struct {
	CID        int64     `db:"category_id"`
	CName      string    `db:"category_name"`
	CCreatedAt time.Time `db:"category_created_at"`
	CUpdatedAt time.Time `db:"category_updated_at"`
}
type WishlistProduct struct {
	model.Product
	*Category
}
