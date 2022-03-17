package model

import (
	"github.com/google/uuid"
	"time"
)

// User defines domain model and its json and db representations
type Review struct {
	ReviewId  uuid.UUID `db:"review_id" json:"review_id"`
	Title     string    `db:"title" json:"title"`
	Comment   string    `db:"comment" json:"comment"`
	Rating    string    `db:"rating" json:"rating"`
	ProductId string    `db:"product_id" json:"product_id"`
	UserId    string    `db:"user_id" json:"user_id"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
	UpdatedAt time.Time `db:"updated_at" json:"updated_at"`
}
