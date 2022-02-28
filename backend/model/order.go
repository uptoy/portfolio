package model

import (
	"github.com/google/uuid"
	"time"
)


type Order struct {
	Order_ID       uuid.UUID     `db:"order_id" json:"order_id"`
	Order_Cart     []ProductUser `db:"order_list" json:"order_list"`
	Ordered_At     time.Time     `db:"ordered_at" json:"ordered_at"`
	Price          int           `db:"total_price" json:"total_price"`
	Discount       int           `db:"discount" json:"discount"`
	Payment_Method Payment       `db:"payment_method" json:"payment_method"`
}
