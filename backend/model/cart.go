package model

import (
	"github.com/google/uuid"
)

type Cart struct {
	ID         uuid.UUID  `json:"cartId"`
	TotalPrice int        `json:"totalPrice"`
	CartItems  []CartItem `json:"cartItems"`
}

type CartItem struct {
	Product_ID uuid.UUID `json:"productId"`
	Quantity   int       `json:"quantity"`
}
