package model

import (
	"github.com/google/uuid"
	"time"
)

// User defines domain model and its json and db representations
type Shipping struct {
	ShippingId uuid.UUID `db:"shipping_id" json:"shipping_id"`
	Address    string    `db:"address" json:"address"`
	City       string    `db:"city" json:"city"`
	PostalCode string    `db:"postal_code" json:"postal_code"`
	Country    string    `db:"country" json:"country"`
	CreatedAt  time.Time `db:"created_at" json:"created_at"`
	UpdatedAt  time.Time `db:"updated_at" json:"updated_at"`
}
