package model

import (
	"github.com/google/uuid"
	"time"
)

type Category struct {
	CategoryId   uuid.UUID `db:"category_id" json:"category_id"`
	CategoryName string    `db:"category_name" json:"category_name"`
	CreatedAt    time.Time `db:"created_at" json:"created_at"`
	UpdatedAt  time.Time `db:"updated_at" json:"updated_at"`
}
