package model

import (
	"github.com/google/uuid"
)

type Review struct {
	ID        uuid.UUID `json:"reviewId"`
	UserID    uuid.UUID `json:"userID"`
	ProductID uuid.UUID `json:"productID"`
	Text      string    `json:"text"`
	Rating    int8      `json:"rating"`
}
