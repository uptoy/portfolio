package model

import (
	"github.com/google/uuid"
)

type Category struct {
	ID          uuid.UUID `db:"categoryId" json:"categoryId"`
	Name        string    `db:"name" json:"name"`
	Description string    `db:"description" json:"description"`
}
