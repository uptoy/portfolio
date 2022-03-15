package model

import (
	"github.com/google/uuid"
)


type Address struct {
	Address_ID uuid.UUID `db:"addressId" json:"addressId"`
	House      string    `db:"house" json:"house"`
	Street     string    `db:"street" json:"street"`
	City       string    `db:"city" json:"city"`
	Pincode    string    `db:"pincode" json:"pincode"`
}
