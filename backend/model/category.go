package model

import (
	"time"
)

type Category struct {
	ID   int64     `db:"id" json:"id"`
	CategoryName string    `db:"category_name" json:"category_name"`
	CreatedAt    time.Time `db:"created_at" json:"created_at"`
	UpdatedAt    time.Time `db:"updated_at" json:"updated_at"`
}
