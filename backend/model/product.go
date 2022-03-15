package model

import (
	"github.com/google/uuid"
)

type Product struct {
	Product_ID   uuid.UUID `db:"productId" json:"productId"`
	Product_Name string    `db:"product_name" json:"product_name"`
	Description  string    `db:"product_name" json:"description"`
	Price        int       `db:"price" json:"price"`
	Rating       int   `db:"rating" json:"rating"`
	ImageURL     string    `db:"image_url" json:"imageUrl"`
	Categories   []Category `json:"categories"`
}
