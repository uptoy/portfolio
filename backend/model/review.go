package model

import (
	"github.com/google/uuid"
	"time"
)

// User defines domain model and its json and db representations
type Review struct {
	Title     string    `db:"title" json:"title"`
	Comment   string    `db:"comment" json:"comment"`
	Rating    int64    `db:"rating" json:"rating"`
	ProductId int64     `db:"product_id" json:"product_id"`
	UserId    uuid.UUID `db:"user_id" json:"user_id"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
	UpdatedAt time.Time `db:"updated_at" json:"updated_at"`
}
