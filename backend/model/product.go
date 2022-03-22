package model

// import (
// 	"github.com/google/uuid"
// 	// "time"
// )

type Product struct {
	// ProductId     uuid.UUID `db:"product_id" json:"product_id"`
	ProductId     int64  `db:"product_id" json:"product_id"`
	ProductName   string `db:"product_name" json:"product_name"`
	Slug          string `db:"slug" json:"slug"`
	ProductImage  string `db:"product_image" json:"product_image"`
	Brand         string `db:"brand" json:"brand"`
	Price         int    `db:"price" json:"price"`
	CategoryName  string `db:"category_name" json:"category_name"`
	CountInStock  int    `db:"count_in_stock" json:"count_in_stock"`
	Description   string `db:"description" json:"description"`
	AverageRating int    `db:"average_rating" json:"average_rating"`
	// CreatedAt     time.Time `db:"created_at" json:"created_at"`
	// UpdatedAt     time.Time `db:"updated_at" json:"updated_at"`
}
