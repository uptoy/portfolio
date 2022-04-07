package model

import (
	// "github.com/google/uuid"
	"time"
)

type Product struct {
	ProductId     int64  `db:"product_id" json:"product_id"`
	ProductName   string `db:"product_name" json:"product_name"`
	Slug          string `db:"slug" json:"slug"`
	ProductImage  string `db:"product_image" json:"product_image"`
	Brand         string `db:"brand" json:"brand"`
	Price         int64  `db:"price" json:"price"`
	CategoryName  string `db:"category_name" json:"category_name"`
	CountInStock  int64  `db:"count_in_stock" json:"count_in_stock"`
	Description   string `db:"description" json:"description"`
	AverageRating int64  `db:"average_rating" json:"average_rating"`
	CreatedAt     time.Time `db:"created_at" json:"created_at"`
	UpdatedAt     time.Time `db:"updated_at" json:"updated_at"`
}

// "product_name":"p1",
// "slug":"s1",
// "product_image":"http://placehold.jp/150x150.png",
// "brand":"brand",
// "price":1,
// "category_name":"category1",
// "count_in_stock":1,
// "description":"desc",
// "average_rating":1
