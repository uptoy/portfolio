package service

import (
	"backend/model"
	"context"

	"github.com/google/uuid"
)

type cartService struct {
	CartRepository         model.CartRepository
	ProductImageRepository model.ProductImageRepository
}

type CartServiceConfig struct {
	CartRepository         model.CartRepository
	ProductImageRepository model.ProductImageRepository
}

func NewCartService(c *CartServiceConfig) model.CartService {
	return &cartService{
		CartRepository:         c.CartRepository,
		ProductImageRepository: c.ProductImageRepository,
	}
}


func (s *cartService) CartGet(ctx context.Context, cartID int64) ([]*model.CartItem, error) {
	var err error
	cartItems, err := s.CartRepository.CartGet(ctx, cartID)
	if err != nil {
		return cartItems, err
	}
	for _, cartItem := range cartItems {
		productId := cartItem.ProductId
		images, err := s.ProductImageRepository.GetAll(ctx, productId)
		if err != nil {
			return nil, err
		}
		cartItem.Product.Images = images
	}
	return cartItems, nil
}

func (s *cartService) CartGetId(ctx context.Context, userID uuid.UUID) (int64, error) {
	var err error
	cartId, err := s.CartRepository.CartGetId(ctx, userID)
	if err != nil {
		return cartId, err
	}
	return cartId, nil
}

func (s *cartService) CartAddItem(ctx context.Context, cartItem *model.CartItem) (*model.CartItem, error) {
	cart, err := s.CartRepository.CartAddItem(ctx, cartItem)
	if err != nil {
		return cart, err
	}
	return cart, err
}

func (r *cartService) CartDeleteItem(ctx context.Context, cartId int64, productId int64) (*model.CartItem, error) {
	cartItem, err := r.CartRepository.CartDeleteItem(ctx, cartId, productId)
	if err != nil {
		return nil, err
	}
	return cartItem, err
}

func (r *cartService) CartIncrementItem(ctx context.Context, cartId int64, productId int64) (*model.CartItem, error) {
	cartItem, err := r.CartRepository.CartIncrementItem(ctx, cartId, productId)
	if err != nil {
		return nil, err
	}
	return cartItem, err
}
func (r *cartService) CartDecrementItem(ctx context.Context, cartId int64, productId int64) (*model.CartItem, error) {
	cartItem, err := r.CartRepository.CartDecrementItem(ctx, cartId, productId)
	if err != nil {
		return nil, err
	}
	return cartItem, err
}
