package model

import (
	"github.com/google/uuid"
	"time"
)

type Order struct {
	OrderId     uuid.UUID `db:"order_id" json:"order_id"`
	ItemsPrices int       `db:"items_prices" json:"items_prices"`
	TaxPrice    int       `db:"tax_price" json:"tax_price"`
	Price       int       `db:"price" json:"price"`
	TotalPrice  int       `db:"total_price" json:"total_price"`
	IsPaid      bool      `db:"is_paid" json:"is_paid"`
	IsDelivered bool      `db:"is_delivered" json:"is_delivered"`
	PaidAt      time.Time `db:"paid_at" json:"paid_at"`
	DeliveredAt time.Time `db:"delivered_at" json:"delivered_at"`
	CreatedAt   time.Time `db:"created_at" json:"created_at"`
	UserId      uuid.UUID `db:"user_id" json:"user_id"`
	OrderItemId uuid.UUID `db:"order_item_id" json:"order_item_id"`
	ShippingId  uuid.UUID `db:"shipping_id" json:"shipping_id"`
	PaymentId   uuid.UUID `db:"payment_id" json:"payment_id"`
}

type OrderItem struct {
	OrderItemId  uuid.UUID `db:"order_item_id" json:"order_item_id"`
	ProductName  string    `db:"product_name" json:"product_name"`
	Quantity     int       `db:"quantity" json:"quantity"`
	ProductImage string    `db:"product_image" json:"product_image"`
	Price        int       `db:"price" json:"price"`
	ProductId    uuid.UUID `db:"product_id" json:"product_id"`
}
