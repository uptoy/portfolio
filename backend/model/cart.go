package model

type Cart struct {
	User      User
	CartItems []CartItem
}

type CartItem struct {
	Product  Product
	Quantity int
}
