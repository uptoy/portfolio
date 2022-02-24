package model

import (
	"github.com/google/uuid"
)


type Product struct {
	Product_ID   uuid.UUID `db:"id" json:"id"`
	Product_Name string    `db:"product_name" json:"product_name"`
	Price        int       `db:"price" json:"price"`
	Rating       string    `db:"rating" json:"rating"`
	Image        string    `db:"image" json:"image"`
}

type ProductUser struct {
	Product_ID   uuid.UUID `db:"product_id" bson:"product_id"`
	Product_Name string    `db:"product_name" json:"product_name"`
	Price        int       `db:"price" json:"price"`
	Rating       string    `db:"rating" json:"rating"`
	Image        string    `db:"image" json:"image"`
}
