package repository

import (
	"backend/model"
	"backend/model/apperrors"
	"context"
	"log"
	"time"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/jmoiron/sqlx/types"
	"github.com/lib/pq"
)

type pGWishlistRepository struct {
	DB *sqlx.DB
}

func NewWishlistRepository(db *sqlx.DB) model.WishlistRepository {
	return &pGWishlistRepository{
		DB: db,
	}
}

func (r *pGWishlistRepository) WishlistCreate(ctx context.Context, userId uuid.UUID, productId int64) ([]model.Product, error) {
	wishlist := []model.Product{}
	query := `INSERT INTO wishlists (user_id, product_id) VALUES  ($1, $2) RETURNING *`
	if err := r.DB.GetContext(ctx, &wishlist, query, userId, productId); err != nil {
		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
			log.Printf("Could not create a userId: %v. Reason: %v\n", userId, err.Code.Name())
			return nil, err
		}
		log.Printf("Could not create a userId: %v. Reason: %v\n", userId, err)
		return nil, apperrors.NewInternal()
	}
	return wishlist, nil
}
func (r *pGWishlistRepository) WishlistGet(ctx context.Context, userId uuid.UUID) ([]model.Product, error) {
	query := `SELECT DISTINCT ON (p.id)
	p.*,
	b.name AS brand_name,
	b.slug AS brand_slug,
	b.type AS brand_type,
	b.description AS brand_description,
	b.email AS brand_email,
	b.logo AS brand_logo,
	b.website_url AS brand_website_url,
	b.created_at AS brand_created_at,
	b.updated_at AS brand_updated_at,
	c.name AS category_name,
	c.slug AS category_slug,
	c.description AS category_description,
	c.logo AS category_logo,
	c.properties AS category_properties,
	c.created_at AS category_created_at,
	c.updated_at AS category_updated_at,
	pp.id AS pricing_id,
  pp.product_id AS pricing_product_id,
	pp.price AS pricing_price,
	pp.original_price AS pricing_original_price,
  pp.sale_starts AS pricing_sale_starts,
  pp.sale_ends AS pricing_sale_ends
	FROM public.products p
	LEFT JOIN product_pricing pp ON p.id = pp.product_id
	LEFT JOIN brands b ON p.brand_id = b.id
	LEFT JOIN categories c ON p.category_id = c.id
	LEFT JOIN wishlists w ON p.id = w.product_id
	LEFT JOIN users u ON u.id = w.user_id
	WHERE CURRENT_TIMESTAMP BETWEEN pp.sale_starts AND pp.sale_ends
	AND u.id = $1
	ORDER BY p.id, pp.id DESC`
	var wp []WishlistProduct
	if err := r.DB.GetContext(ctx, &wp, query, userId); err != nil {
		return nil, apperrors.NewNotFound("userid", userId.String())
	}
	wishlist := make([]model.Product, 0)
	// for _, x := range wp {
	// wishlist = append(wishlist, x.ToProduct())
	// }
	return wishlist, nil
}
func (r *pGWishlistRepository) WishlistDelete(ctx context.Context, userId uuid.UUID, productId int64) ([]model.Product, error) {
	wishlist := []model.Product{}
	query := "DELETE FROM wishlists WHERE user_id=$1 AND product_id=$2 VALUES  ($1, $2) RETURNING *"
	if err := r.DB.GetContext(ctx, &wishlist, query, userId, productId); err != nil {
		log.Printf("Unable to get product: %v. Err: %v\n", wishlist, err)
		return nil, apperrors.NewNotFound("wishlist", "userId")
	}
	return wishlist, nil
}
func (r *pGWishlistRepository) WishlistClear(ctx context.Context, userId uuid.UUID) error {
	wishlist := []model.Product{}
	query := "DELETE FROM wishlists WHERE user_id=$1  VALUES  ($1)"
	if err := r.DB.GetContext(ctx, &wishlist, query, userId); err != nil {
		log.Printf("Unable to get product: %v. Err: %v\n", wishlist, err)
		return apperrors.NewNotFound("wishlist", "userId")
	}
	return nil
}

type Pricing struct {
	PID            int64     `db:"pricing_id"`
	PProductID     int64     `db:"pricing_product_id"`
	PPrice         int       `db:"pricing_price"`
	POriginalPrice int       `db:"pricing_original_price"`
	PSaleStarts    time.Time `db:"pricing_sale_starts"`
	PSaleEnds      time.Time `db:"pricing_sale_ends"`
}
type Brand struct {
	BID           int64     `db:"brand_id"`
	BName         string    `db:"brand_name"`
	BSlug         string    `db:"brand_slug"`
	BType         string    `db:"brand_type"`
	BDescription  string    `db:"brand_description"`
	BEmail        string    `db:"brand_email"`
	BLogo         string    `db:"brand_logo"`
	BLogoPublicID string    `db:"brand_logo_public_id"`
	BWebsiteURL   string    `db:"brand_website_url"`
	BCreatedAt    time.Time `db:"brand_created_at"`
	BUpdatedAt    time.Time `db:"brand_updated_at"`
}
type Category struct {
	CID           int64           `db:"category_id"`
	CName         string          `db:"category_name"`
	CSlug         string          `db:"category_slug"`
	CLogo         string          `db:"category_logo"`
	CLogoPublicID string          `db:"category_logo_public_id"`
	CDescription  string          `db:"category_description"`
	CIsFeatured   bool            `db:"category_is_featured"`
	CProperties   *types.JSONText `db:"category_properties"`
	CCreatedAt    time.Time       `db:"category_created_at"`
	CUpdatedAt    time.Time       `db:"category_updated_at"`
}
type WishlistProduct struct {
	model.Product
	Tsv  string `json:"-" db:"tsv"`
	Rank string `json:"-" db:"rank"`
	*Pricing
	*Brand
	*Category
}
