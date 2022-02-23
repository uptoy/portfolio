package model

import (
	"github.com/google/uuid"
	"time"
)

// User defines domain model and its json and db representations
type User struct {
	UID            uuid.UUID     `db:"uid" json:"uid"`
	Email          string        `db:"email" json:"email"`
	Password       string        `db:"password" json:"-"`
	Name           string        `db:"name" json:"name"`
	ImageURL       string        `db:"image_url" json:"imageUrl"`
	Website        string        `db:"website" json:"website"`
	Token          string        `db:"token" json:"token"`
	RefreshToken   string        `db:"refresh_token" json:"refresh_token"`
	Created_At     time.Time     `db:"created_at" json:"created_at"`
	Updated_At     time.Time     `db:"updated_at" json:"updated_at"`
	User_ID        string        `db:"user_id" json:"user_id"`
	UserCart       []ProductUser `db:"user_cart" json:"user_cart"`
	AddreddDetails []Address     `db:"address" json:"address"`
	Order_Status   []Order       `db:"orders" json:"orders"`
}

type Product struct {
	Product_ID   uuid.UUID `db:"product_id" json:"product_id"`
	Product_Name string    `db:"product_name" json:"product_name"`
	Price        int       `db:"price" json:"price"`
	Rating       string    `db:"rating" json:"rating"`
	Image        string    `db:"image" json:"image"`
}

type ProductUser struct {
	Product_ID   uuid.UUID `db:"product_id" bson:"product_id"`
	Product_Name string    `db:"product_name" json:"product_name"`
	Price        int       `db:"price" json:"price"`
	Rating       string    `db:"rating" json:"rating"`
	Image        string    `db:"image" json:"image"`
}

type Address struct {
	Address_ID uuid.UUID `db:"address_id" json:"address_id"`
	House      string    `db:"house" json:"house"`
	Street     string    `db:"street" json:"street"`
	City       string    `db:"city" json:"city"`
	Pincode    string    `db:"pincode" json:"pincode"`
}

type Order struct {
	Order_ID       uuid.UUID     `db:"order_id" json:"order_id"`
	Order_Cart     []ProductUser `db:"order_list" json:"order_list"`
	Ordered_At     time.Time     `db:"ordered_at" json:"ordered_at"`
	Price          int           `db:"total_price" json:"total_price"`
	Discount       int           `db:"discount" json:"discount"`
	Payment_Method Payment       `db:"payment_method" json:"payment_method"`
}

type Payment struct {
	Digital bool
	Cod     bool
}
