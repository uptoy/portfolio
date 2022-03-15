package model

import (
	"github.com/google/uuid"
	"time"
)

type Order struct {
	ID          uuid.UUID   `json:"orderId"`
	OrderID     string      `json:"orderID"`
	CreatedAt   time.Time   `json:"createdAt"`
	DeliveredAt time.Time   `json:"deliveredAt"`
	TotalPrice  float64     `json:"totalPrice"`
	OrderItems  []OrderItem `json:"orderItems"`
	ContactInfo ContactInfo `json:"contactInfo"`
	UserID      uuid.UUID   `json:"userID"`
	Status      string      `json:"status"`
}

type OrderItem struct {
	ProductID uuid.UUID `json:"productId"`
	Quantity  int64     `json:"quantity"`
}

type ContactInfo struct {
	Name         string `json:"name"`
	Surname      string `json:"surname"`
	PhoneNumber  string `json:"phoneNumber"`
	Address      string `json:"address"`
	OrderComment string `json:"orderComment"`
}
