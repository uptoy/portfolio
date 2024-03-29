package model

import (
	// "github.com/google/uuid"
	"fmt"
	"log"
	"time"

	"github.com/google/uuid"
)

type Product struct {
	Id            int64     `db:"id" json:"id"`
	ProductName   string    `db:"product_name" json:"product_name"`
	Slug          string    `db:"slug" json:"slug"`
	Brand         string    `db:"brand" json:"brand"`
	Price         int64     `db:"price" json:"price"`
	CategoryId    int64     `db:"category_id" json:"category_id"`
	CountInStock  int64     `db:"count_in_stock" json:"count_in_stock"`
	Description   string    `db:"description" json:"description"`
	CreatedAt     time.Time `db:"created_at" json:"created_at"`
	UpdatedAt     time.Time `db:"updated_at" json:"updated_at"`
	// Category      *Category        `json:"category"`
	// Images        []*ProductImage  `json:"images"`
	// Reviews       []*ProductReview `json:"reviews"`
	Category *Category        `json:"category"`
	Images   []*ProductImage  `json:"images"`
	Reviews  []*ProductReview `json:"reviews"`
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

	if p.Id != 0 {
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

type ProductReview struct {
	ID        int64     `json:"id" db:"id"`
	UserID    uuid.UUID `json:"user_id" db:"user_id"`
	ProductID int64     `json:"product_id" db:"product_id"`
	Rating    int64     `json:"rating" db:"rating"`
	Title     string    `json:"title" db:"title"`
	Comment   string    `json:"comment" db:"comment"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
	User      *User     `json:"user"`
}

// "product_name":"p1",
// "slug":"s1",
// "brand":"brand",
// "price":1,
// "category_id":1,
// "count_in_stock":1,
// "description":"desc",
// "average_rating":1

type ProductImage struct {
	ID        int64     `db:"id" json:"id"`
	ProductId int64     `db:"product_id" json:"product_id"`
	URL       string    `db:"url" json:"url"`
	CreatedAt time.Time `db:"created_at" json:"created_at" `
	UpdatedAt time.Time `db:"updated_at" json:"updated_at" `
}

func (img *ProductImage) PreSave() {
	now := time.Now()
	img.CreatedAt = now
	img.UpdatedAt = img.CreatedAt
}

func (img *ProductImage) PreUpdate() {
	now := time.Now()
	img.UpdatedAt = now
}
