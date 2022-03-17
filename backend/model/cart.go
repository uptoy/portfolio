package model

import (
	"github.com/google/uuid"
	"time"
)

type Cart struct {
	CartId     uuid.UUID   `db:"cart_id" json:"cart_id"`
	UserId     uuid.UUID   `db:"user_id" json:"user_id"`
	CartItemId uuid.UUID `db:"cart_item_id" json:"cart_item_id"`
	TotalPrice int         `db:"total_price" json:"total_price"`
	CreatedAt  time.Time   `db:"created_at" json:"created_at"`
	UpdatedAt  time.Time   `db:"updated_at" json:"updated_at"`
}

type CartItem struct {
	CartItemId uuid.UUID `db:"cartitem_id" json:"cartitem_id"`
	ProductId  uuid.UUID `db:"product_id" json:"product_id"`
	Quantity   int       `db:"quantity" json:"quantity"`

}
