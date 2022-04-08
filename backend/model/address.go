package model

import "time"

type Address struct {
	ID        int64     `db:"id" json:"id" `
	Address   string    `db:"address" json:"address" `
	City      string    `db:"city" json:"city"`
	State     string    `db:"state" json:"state"`
	Country   string    `db:"country" json:"country"`
	ZIP       string    `db:"zip" json:"zip"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
	UpdatedAt time.Time `db:"updated_at" json:"updated_at"`
}
