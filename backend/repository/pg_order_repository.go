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
	query := `INSERT INTO orders () VALUES () RETURNING *`
	if err := r.DB.GetContext(ctx, &order, query); err != nil {
		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
			log.Printf("Could not create a order: %v. Reason: %v\n", order.OrderId, err.Code.Name())
			return nil, apperrors.NewConflict("order", "order")
		}
		log.Printf("Could not create a order : %v. Reason: %v\n", order.OrderId, err)
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
