package service

import (
	"backend/model"
	"context"
	"github.com/google/uuid"
)

type cartService struct {
	CartRepository model.CartRepository
}

type CartServiceConfig struct {
	CartRepository model.CartRepository
}

func NewCartService(c *CartServiceConfig) model.CartService {
	return &cartService{
		CartRepository: c.CartRepository,
	}
}

func (s *cartService) CartGet(ctx context.Context, userID uuid.UUID) ([]model.CartItem, error) {
	var err error
	cart, err := s.CartRepository.CartGet(ctx, userID)
	if err != nil {
		return cart, err
	}
	return cart, nil
}

func (s *cartService) CartAddItem(ctx context.Context, cartId int64, productId int64, quantity int64) ([]model.CartItem, error) {
	cart, err := s.CartRepository.CartAddItem(ctx, cartId, productId, quantity)
	if err != nil {
		return nil, err
	}
	return cart, nil
}

func (s *cartService) CartDeleteItem(ctx context.Context, cartId int64, productId int64) ([]model.CartItem, error) {
	cart, err := s.CartRepository.CartDeleteItem(ctx, cartId, productId)
	if err != nil {
		return nil, err
	}
	return cart, nil
}

func (s *cartService) CartIncrementItem(ctx context.Context, cartId int64, productId int64) ([]model.CartItem, error) {
	cart, err := s.CartRepository.CartIncrementItem(ctx, cartId, productId)
	if err != nil {
		return nil, err
	}
	return cart, nil
}

func (s *cartService) CartDecrementItem(ctx context.Context, cartId int64, productId int64) ([]model.CartItem, error) {
	cart, err := s.CartRepository.CartDecrementItem(ctx, cartId, productId)
	if err != nil {
		return nil, err
	}
	return cart, nil
}
