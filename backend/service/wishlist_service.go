package service

import (
	"backend/model"
	"context"
	"github.com/google/uuid"
)

type wishlistService struct {
	WishlistRepository model.WishlistRepository
}

type WishlistServiceConfig struct {
	WishlistRepository model.WishlistRepository
}

func NewWishlistService(c *WishlistServiceConfig) model.WishlistService {
	return &wishlistService{
		WishlistRepository: c.WishlistRepository,
	}
}

func (s *wishlistService) WishlistCreate(ctx context.Context, userId uuid.UUID, productId int64) ([]*model.Product, error) {
	wishlist, err := s.WishlistRepository.WishlistCreate(ctx, userId, productId)
	if err != nil {
		return wishlist, err
	}
	return wishlist, nil
}
func (s *wishlistService) WishlistGet(ctx context.Context, userId uuid.UUID) ([]*model.Product, error) {
	wishlist, err := s.WishlistRepository.WishlistGet(ctx, userId)
	if err != nil {
		return wishlist, err
	}
	return wishlist, nil
}
func (s *wishlistService) WishlistDelete(ctx context.Context, userId uuid.UUID, productId int64) ([]*model.Product, error) {
	wishlist, err := s.WishlistRepository.WishlistDelete(ctx, userId, productId)
	if err != nil {
		return wishlist, err
	}
	return wishlist, nil
}

// func (s *wishlistService) WishlistAddItem(ctx context.Context, userId uuid.UUID, productId int64) ([]*model.Product, error) {
// 	wishlist, err := s.WishlistRepository.WishlistAddItem(ctx, userId, productId)
// 	if err != nil {
// 		return wishlist, err
// 	}
// 	return wishlist, nil
// }

// func (s *wishlistService) WishlistClear(ctx context.Context, userId uuid.UUID) error {
// 	err := s.WishlistRepository.WishlistClear(ctx, userId)
// 	if err != nil {
// 		return err
// 	}
// 	return nil
// }
