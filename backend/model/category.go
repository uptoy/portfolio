package model

import (
	"fmt"
	"time"
	"log"
)

type Category struct {
	ID           int64     `db:"id" json:"id"`
	CategoryName string    `db:"category_name" json:"category_name"`
	CreatedAt    time.Time `db:"created_at" json:"created_at"`
	UpdatedAt    time.Time `db:"updated_at" json:"updated_at"`
}

func (c Category) PreSave() {
	c.CreatedAt = time.Now()
	c.UpdatedAt = time.Now()
}

func (c *Category) PreUpdate() {
	c.UpdatedAt = time.Now()
}

func (c Category) Validate() error {
	var err error

	if c.ID != 0 {
		fmt.Println(err, "ID is 0")
	}
	if c.CategoryName == "" {
		log.Fatal(err, "CategoryName is nothing")
	}
	if c.CreatedAt.IsZero() {
		log.Fatal(err, "CreatedAt is zero")
	}
	if c.UpdatedAt.IsZero() {
		log.Fatal(err, "CreatedAt is zero")
	}
	return nil
}

