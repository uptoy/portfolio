package model

import (
	"github.com/google/uuid"
)

type Category struct {
	ID            uuid.UUID `db:"categoryId" json:"categoryId"`
	Category_Name string    `db:"category_name" json:"category_name"`
	Description   string    `db:"description" json:"description"`
}
