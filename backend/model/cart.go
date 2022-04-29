package model

import (
	"github.com/google/uuid"
	"time"
)

type Cart struct {
	Id        int64     `db:"id" json:"id"`
	UserId    uuid.UUID `db:"user_id" json:"user_id"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
	UpdatedAt time.Time `db:"updated_at" json:"updated_at"`
}

type CartItem struct {
	Id        int64     `db:"id" json:"id"`
	CartId    int64     `db:"cart_id" json:"cart_id"`
	ProductId int64     `db:"product_id" json:"product_id"`
	Quantity  int64     `db:"quantity" json:"quantity"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
	UpdatedAt time.Time `db:"updated_at" json:"updated_at"`
}
