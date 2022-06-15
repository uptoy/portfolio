package model

import (
	"fmt"
	"github.com/google/uuid"
	"log"
	// "time"
)

type Wishlist struct {
	// ID        int64     `json:"id" db:"id"`
	UserID    uuid.UUID `json:"user_id" db:"user_id"`
	ProductID int64     `json:"product_id" db:"product_id"`
	// CreatedAt time.Time `json:"created_at" db:"created_at"`
	// UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

func (pw *Wishlist) Validate() error {
	var err error
	if pw.ProductID == 0 {
		log.Fatal(err)
		fmt.Println("err ProductID == ", err)
	}

	return nil
}
