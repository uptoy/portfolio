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

func (s *cartService) CartCreate(ctx context.Context, userID uuid.UUID) (*model.Cart, error) {
	var err error
	cart, err := s.CartRepository.CartCreate(ctx, userID)
	if err != nil {
		return cart, err
	}
	return cart, nil
}

func (s *cartService) CartGet(ctx context.Context, userID uuid.UUID) ([]model.CartItem, error) {
	var err error
	cart, err := s.CartRepository.CartGet(ctx, userID)
	if err != nil {
		return cart, err
	}
	return cart, nil
}

func (s *cartService) CartGetId(ctx context.Context, userID uuid.UUID) (int64, error) {
	var err error
	cartId, err := s.CartRepository.CartGetId(ctx, userID)
	if err != nil {
		return cartId, err
	}
	return cartId, nil
}

func (s *cartService) CartAddItem(ctx context.Context, cartItem *model.CartItem) (*model.Cart, error) {
	cart, err := s.CartRepository.CartAddItem(ctx, cartItem)
	if err != nil {
		return cart, err
	}
	return cart, err
}

func (r *cartService) CartDeleteItem(ctx context.Context, cartId int64, productId int64) ([]model.CartItem, error) {
	cartItems, err := r.CartRepository.CartDeleteItem(ctx, cartId, productId)
	if err != nil {
		return nil, err
	}
	return cartItems, err
}

func (r *cartService) CartIncrementItem(ctx context.Context, cartId int64, productId int64) ([]model.CartItem, error) {
	cartItems, err := r.CartRepository.CartIncrementItem(ctx, cartId, productId)
	if err != nil {
		return nil, err
	}
	return cartItems, err
}
func (r *cartService) CartDecrementItem(ctx context.Context, cartId int64, productId int64) ([]model.CartItem, error) {
	cartItems, err := r.CartRepository.CartDecrementItem(ctx, cartId, productId)
	if err != nil {
		return nil, err
	}
	return cartItems, err
}
