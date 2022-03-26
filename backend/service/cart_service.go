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

func (s *cartService) CartList(ctx context.Context, userID uuid.UUID) ([]model.Cart, error) {
	var err error
	cart, err := s.CartRepository.CartList(ctx, userID)
	if err != nil {
		return cart, err
	}
	return cart, nil
}

func (s *cartService) CartAdd(ctx context.Context, userID uuid.UUID, productId int64, quantity int64) (*model.Cart, error) {
	cart, err := s.CartRepository.CartAdd(ctx, userID, productId, quantity)
	if err != nil {
		return nil, err
	}
	return cart, nil
}

func (s *cartService) CartRemove(ctx context.Context, userID uuid.UUID, productId int64, quantity int64) (*model.Cart, error) {
	cart, err := s.CartRepository.CartRemove(ctx, userID, productId, quantity)
	if err != nil {
		return nil, err
	}
	return cart, nil
}
