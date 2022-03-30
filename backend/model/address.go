package model

import (
	"time"
)


// Address holds the contact info
type Address struct {
	ID        int64      `json:"id" db:"id"`
	Line1     string     `json:"line_1" db:"line_1"`
	Line2     string    `json:"line_2" db:"line_2"`
	City      string     `json:"city" db:"city"`
	Country   string     `json:"country" db:"country"`
	State     string    `json:"state" db:"state"`
	ZIP       string    `json:"zip" db:"zip"`
	Latitude  int64   `json:"latitude" db:"latitude"`
	Longitude int64   `json:"longitude" db:"longitude"`
	Phone     string    `json:"phone" db:"phone"`
	CreatedAt time.Time  `json:"created_at" db:"created_at"`
	UpdatedAt time.Time  `json:"updated_at" db:"updated_at"`
	DeletedAt time.Time `json:"deleted_at" db:"deleted_at"`
}
