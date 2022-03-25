package model

import (
	"time"
)

type Cart struct {
	CartId     int64 `db:"cart_id" json:"cart_id"`
	UserId     int64 `db:"user_id" json:"user_id"`
	CartItemId int64 `db:"cart_item_id" json:"cart_item_id"`
	TotalPrice int       `db:"total_price" json:"total_price"`
	CreatedAt  time.Time `db:"created_at" json:"created_at"`
	UpdatedAt  time.Time `db:"updated_at" json:"updated_at"`
}

type CartItem struct {
	CartItemId int64 `db:"cartitem_id" json:"cartitem_id"`
	ProductId  int64 `db:"product_id" json:"product_id"`
	Quantity   int64       `db:"quantity" json:"quantity"`
}
