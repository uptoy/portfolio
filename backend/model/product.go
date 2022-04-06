package model

import (
	// "github.com/google/uuid"
	"fmt"
	"log"
	"time"
)

// video
type Product struct {
	ProductId     int64     `db:"id" json:"id"`
	ProductName   string    `db:"product_name" json:"product_name"`
	Slug          string    `db:"slug" json:"slug"`
	ProductImage  string    `db:"product_image" json:"product_image"`
	Brand         string    `db:"brand" json:"brand"`
	Price         int64     `db:"price" json:"price"`
	CategoryId    int64     `db:"category_id" json:"category_id"`
	Category      Category  `json:"category"`
	CountInStock  int64     `db:"count_in_stock" json:"count_in_stock"`
	Description   string    `db:"description" json:"description"`
	AverageRating int64     `db:"average_rating" json:"average_rating"`
	CreatedAt     time.Time `db:"created_at" json:"created_at"`
	UpdatedAt     time.Time `db:"updated_at" json:"updated_at"`
}

type Category struct {
	CategoryId   int64     `db:"id" json:"id"`
	CategoryName string    `db:"category_name" json:"category_name"`
	CreatedAt    time.Time `db:"created_at" json:"created_at"`
	UpdatedAt    time.Time `db:"updated_at" json:"updated_at"`
}

func (c Category) PreSave() {
	c.CreatedAt = time.Now()
	c.UpdatedAt = time.Now()
}

func (c *Category) PreUpdate() {
	c.UpdatedAt = time.Now()
}

func (c Category) Validate() error {
	var err error

	if c.CategoryId != 0 {
		fmt.Println(err, "ID is 0")
	}
	if c.CategoryName == "" {
		log.Fatal(err, "CategoryName is nothing")
	}
	if c.CreatedAt.IsZero() {
		log.Fatal(err, "CreatedAt is zero")
	}
	if c.UpdatedAt.IsZero() {
		log.Fatal(err, "CreatedAt is zero")
	}
	return nil
}

func (p Product) PreSave() {
	p.CreatedAt = time.Now()
	p.UpdatedAt = time.Now()
}

func (c *Product) PreUpdate() {
	c.UpdatedAt = time.Now()
}

func (p Product) Validate() error {
	var err error

	if p.ProductId != 0 {
		fmt.Println(err, "ID is 0")
	}
	if p.ProductName == "" {
		log.Fatal(err, "CategoryName is nothing")
	}
	if p.CreatedAt.IsZero() {
		log.Fatal(err, "CreatedAt is zero")
	}
	if p.UpdatedAt.IsZero() {
		log.Fatal(err, "CreatedAt is zero")
	}
	return nil
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
