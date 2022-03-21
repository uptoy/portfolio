package model

import (
	"github.com/google/uuid"
)

type Payment struct {
	PaymentId     uuid.UUID `db:"payment_id" json:"payment_id"`
	PaymentMethod string    `db:"payment_method" json:"payment_method"`
}
