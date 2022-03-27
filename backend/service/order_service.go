package service

import (
	"backend/model"
	"context"
	"github.com/google/uuid"
)

type orderService struct {
	OrderRepository model.OrderRepository
}

type OrderServiceConfig struct {
	OrderRepository model.OrderRepository
}

func NewOrderService(c *OrderServiceConfig) model.OrderService {
	return &orderService{
		OrderRepository: c.OrderRepository,
	}
}

func (s *orderService) OrderList(ctx context.Context, userID uuid.UUID) ([]model.Order, error) {
	orders, err := s.OrderRepository.OrderList(ctx, userID)
	if err != nil {
		return orders, err
	}
	return orders, nil
}

func (s *orderService) OrderCreate(ctx context.Context, order *model.Order) (*model.Order, error) {
	order, err := s.OrderRepository.OrderCreate(ctx, order)
	if err != nil {
		return nil, err
	}
	return order, nil
}

func (s *orderService) OrderFindByID(ctx context.Context, orderId int64) (*model.Order, error) {
	order, err := s.OrderRepository.OrderFindByID(ctx, orderId)
	if err != nil {
		return nil, err
	}
	return order, nil
}
