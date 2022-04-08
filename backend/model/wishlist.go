package model

import (
	"fmt"
	"log"
)

type Wishlist struct {
	ID        int64 `json:"id" db:"id"`
	UserID    int64 `json:"user_id" db:"user_id"`
	ProductID int64 `json:"product_id" db:"product_id"`
}

func (pw *Wishlist) Validate() error {
	var err error

	if pw.UserID == 0 {
		log.Fatal(err)
		fmt.Println("err UserID == 0", err)
	}
	if pw.ProductID == 0 {
		log.Fatal(err)
		fmt.Println("err ProductID == ", err)
	}

	return nil
}
