package model

import (
	"github.com/google/uuid"
	"time"
)

type Order struct {
	Id              int64     `db:"id" json:"id"`
	UserId          uuid.UUID `db:"user_id" json:"user_id"`
	TotalPrice      int64     `db:"total_price" json:"total_price"`
	ShippingAddress string    `db:"shipping_address" json:"shipping_address" `
	ShippingCity    string    `db:"shipping_city" json:"shipping_city"`
	ShippingState   string    `db:"shipping_state" json:"shipping_state"`
	ShippingCountry string    `db:"shipping_country" json:"shipping_country"`
	ShippingZIP     string    `db:"shipping_zip" json:"shipping_zip"`
	ShippedAt       time.Time `json:"shipped_at" db:"shipped_at"`
	CreatedAt       time.Time `json:"created_at" db:"created_at"`
}

type OrderDetail struct {
	OrderID   int64 `json:"order_id" db:"order_id"`
	ProductID int64 `json:"product_id" db:"product_id"`
	Quantity  int64   `json:"quantity" db:"quantity"`
	SubPrice  int64   `json:"sub_price" db:"sub_price"`
}

type OrderInfo struct {
	OrderDetail
	Product
}

type OrderRequestData struct {
	Items                     []*CartItem `json:"items"`
	ShippingAddress           *Address    `json:"shipping_address"`
	SaveAddress               *bool       `json:"save_address"`
	UseExistingBillingAddress *bool       `json:"use_existing_billing_address"`
	ShippingAddressID         *int64      `json:"billing_address_id"`
	SameShippingAsBilling     *bool       `json:"same_shipping_as_billing"`
}

func (o *Order) PreSave() {
	o.CreatedAt = time.Now()
}

func (data *OrderRequestData) Validate() error {
	var err error
	if len(data.Items) == 0 {
		return err
	}
	if data.ShippingAddress == nil && (data.UseExistingBillingAddress == nil || (data.UseExistingBillingAddress != nil && *data.UseExistingBillingAddress == false)) {
		return err
	}
	if data.ShippingAddressID == nil && data.UseExistingBillingAddress != nil && *data.UseExistingBillingAddress == true {
		return err
	}
	if (data.ShippingAddress == nil && (data.UseExistingBillingAddress == nil || (data.UseExistingBillingAddress != nil && *data.UseExistingBillingAddress == false))) && (data.SameShippingAsBilling == nil || (data.SameShippingAsBilling != nil && *data.SameShippingAsBilling == false)) {
		return err
	}
	if (data.ShippingAddress != nil && data.ShippingAddress != nil) && data.SameShippingAsBilling != nil && *data.SameShippingAsBilling == true {
		return err
	}
	return nil
}

// type Order struct {
// 	OrderId     int64     `db:"order_id" json:"order_id"`
// 	ItemsPrices int64     `db:"items_prices" json:"items_prices"`
// 	TaxPrice    int64     `db:"tax_price" json:"tax_price"`
// 	Price       int64     `db:"price" json:"price"`
// 	TotalPrice  int64     `db:"total_price" json:"total_price"`
// 	IsPaid      bool      `db:"is_paid" json:"is_paid"`
// 	IsDelivered bool      `db:"is_delivered" json:"is_delivered"`
// 	PaidAt      time.Time `db:"paid_at" json:"paid_at"`
// 	DeliveredAt time.Time `db:"delivered_at" json:"delivered_at"`
// 	CreatedAt   time.Time `db:"created_at" json:"created_at"`
// 	UserId      uuid.UUID `db:"user_id" json:"user_id"`
// 	OrderItemId int64     `db:"order_item_id" json:"order_item_id"`
// 	ShippingId  int64     `db:"shipping_id" json:"shipping_id"`
// 	PaymentId   int64     `db:"payment_id" json:"payment_id"`
// }

// type OrderItem struct {
// 	OrderItemId  int64  `db:"order_item_id" json:"order_item_id"`
// 	ProductName  string `db:"product_name" json:"product_name"`
// 	Quantity     int64  `db:"quantity" json:"quantity"`
// 	ProductImage string `db:"product_image" json:"product_image"`
// 	Price        int64  `db:"price" json:"price"`
// 	ProductId    int64  `db:"product_id" json:"product_id"`
// }
