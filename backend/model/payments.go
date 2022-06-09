package model

type Payment struct {
	PaymentId     int64 `db:"payment_id" json:"payment_id"`
	PaymentMethod string    `db:"payment_method" json:"payment_method"`
}
