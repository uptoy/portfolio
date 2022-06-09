package repository

import (
	"backend/model"
	"backend/model/apperrors"
	"context"
	"github.com/google/uuid"

	// "fmt"

	// "database/sql"
	"log"

	// "github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/lib/pq"
)

type pGOrderRepository struct {
	DB *sqlx.DB
}

func NewOrderRepository(db *sqlx.DB) model.OrderRepository {
	return &pGOrderRepository{
		DB: db,
	}
}

func (r *pGOrderRepository) OrderCreate(ctx context.Context, order *model.Order) (*model.Order, error) {
	query := `
	INSERT INTO orders (user_id , total_price, shipping_address, shipping_city,shipping_state,shipping_country,shipping_zip)
	VALUES ($1, $2,$3, $4,$5,$6, $7) RETURNING *
	`
	if err := r.DB.GetContext(ctx, order, query, order.UserId, order.TotalPrice, order.ShippingAddress, order.ShippingCity, order.ShippingState, order.ShippingCountry, order.ShippingZIP); err != nil {
		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
			log.Printf("Could not create a order: %v. Reason: %v\n", order.Id, err.Code.Name())
			return nil, apperrors.NewConflict("order", "order")
		}
		log.Printf("Could not create a order : %v. Reason: %v\n", order.Id, err)
		return nil, apperrors.NewInternal()
	}
	return order, nil
}

func (r *pGOrderRepository) OrderList(ctx context.Context, userID uuid.UUID) ([]model.Order, error) {
	orders := []model.Order{}
	query := "SELECT * FROM orders"
	if err := r.DB.SelectContext(ctx, &orders, query); err != nil {
		log.Printf("Unable to get order with name: %v. Err: %v\n", orders, err)
		return nil, apperrors.NewNotFound("order", "order")
	}
	return orders, nil
}

func (r *pGOrderRepository) OrderFindByID(ctx context.Context, orderId int64) (*model.Order, error) {
	order := model.Order{}
	query := "SELECT * FROM order WHERE id=$1"
	if err := r.DB.GetContext(ctx, &order, query, orderId); err != nil {
		log.Printf("Unable to get order: %v. Err: %v\n", order, err)
		return nil, apperrors.NewNotFound("order_id", "order_id")
	}
	return &order, nil
}

func (r *pGOrderRepository) OrderUpdate(ctx context.Context, orderId int64, order *model.Order) (*model.Order, error) {
	return order, nil
}

func (r *pGOrderRepository) OrderCount(ctx context.Context) (int, error) {
	var n int
	query := "SELECT COUNT(*) FROM order"
	if err := r.DB.GetContext(ctx, &n, query); err != nil {
		log.Printf("Unable to get order: %v. Err: %v\n", n, err)
		return n, apperrors.NewNotFound("order_id", "order_id")
	}
	return n, nil
}

//order detail
func (r *pGOrderRepository) OrderDetailsBulkInsert(ctx context.Context, items []*model.OrderDetail) error {
	if _, err := r.DB.NamedExecContext(ctx, `INSERT INTO order_detail (order_id, product_id, quantity, sub_price) VALUES (:order_id, :product_id, :quantity, :sub_price)`, items); err != nil {
		return err
	}
	return nil
}

func (r *pGOrderRepository) Save(ctx context.Context, o *model.OrderDetail) (*model.OrderDetail, error) {
	if _, err := r.DB.NamedExecContext(ctx, `INSERT INTO order_detail (order_id, product_id, quantity, sub_price) VALUES (:order_id, :product_id, :quantity, :sub_price)`, o); err != nil {
		return nil, err
	}
	return o, nil
}

func (r *pGOrderRepository) OrderGetDetails(ctx context.Context, orderID int64) ([]*model.OrderInfo, error) {
	var ods = make([]*model.OrderInfo, 0)
	q := `SELECT * FROM order_detail od LEFT JOIN product p ON od.product_id = p.id WHERE od.order_id = $1`
	if err := r.DB.SelectContext(ctx, &ods, q, orderID); err != nil {
		return nil, err
	}
	return ods, nil
}
