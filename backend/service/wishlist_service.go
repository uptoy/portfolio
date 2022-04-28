package service

import (
	"backend/model"
	"context"
	"github.com/google/uuid"
)

type wishlistService struct {
	WishlistRepository     model.WishlistRepository
	ProductImageRepository model.ProductImageRepository
	CategoryRepository     model.CategoryRepository
	ReviewRepository       model.ReviewRepository
}

type WishlistServiceConfig struct {
	WishlistRepository     model.WishlistRepository
	ProductImageRepository model.ProductImageRepository
	CategoryRepository     model.CategoryRepository
	ReviewRepository       model.ReviewRepository
}

func NewWishlistService(c *WishlistServiceConfig) model.WishlistService {
	return &wishlistService{
		WishlistRepository:     c.WishlistRepository,
		ProductImageRepository: c.ProductImageRepository,
		CategoryRepository:     c.CategoryRepository,
		ReviewRepository:       c.ReviewRepository,
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
		return nil, err
	}
	for _, product := range wishlist {
		productId := product.Id
		images, err := s.ProductImageRepository.GetAll(ctx, productId)
		if err != nil {
			return nil, err
		}
		product.Images = images
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
