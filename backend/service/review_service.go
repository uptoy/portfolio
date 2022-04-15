package service

import (
	"backend/model"
	"context"
	"fmt"
)

type reviewService struct {
	ReviewRepository model.ReviewRepository
}

type ReviewServiceConfig struct {
	ReviewRepository model.ReviewRepository
}

func NewReviewService(c *ReviewServiceConfig) model.ReviewService {
	return &reviewService{
		ReviewRepository: c.ReviewRepository,
	}
}

func (s *reviewService) ReviewBulkInsert(ctx context.Context, reviews []model.ProductReview) ([]model.ProductReview, error) {
	review, err := s.ReviewRepository.ReviewBulkInsert(ctx, reviews)
	if err != nil {
		return nil, err
	}
	return review, nil
}
func (s *reviewService) ReviewCreate(ctx context.Context, productId int64, review *model.ProductReview) (*model.ProductReview, error) {
	fmt.Println("review", review)
	fmt.Println("productId", productId)
	review, err := s.ReviewRepository.ReviewCreate(ctx, productId, review)
	if err != nil {
		return nil, err
	}
	return review, nil
}
func (s *reviewService) Get(ctx context.Context, product_id, review_id int64) (*model.ProductReview, error) {
	review, err := s.ReviewRepository.Get(ctx, product_id, review_id)
	if err != nil {
		return nil, err
	}
	return review, nil
}
func (s *reviewService) GetAll(ctx context.Context, productId int64) ([]*model.ProductReview, error) {
	reviews, err := s.ReviewRepository.GetAll(ctx, productId)
	if err != nil {
		return nil, err
	}
	return reviews, nil
}
func (s *reviewService) Update(ctx context.Context, product_id, review_id int64, review *model.ProductReview) (*model.ProductReview, error) {
	review, err := s.ReviewRepository.Update(ctx, product_id, review_id, review)
	if err != nil {
		return nil, err
	}
	return review, nil

}
func (s *reviewService) Delete(ctx context.Context, product_id, review_id int64) (*model.ProductReview, error) {
	review, err := s.ReviewRepository.Delete(ctx, product_id, review_id)
	if err != nil {
		return nil, err
	}
	return review, nil

}
func (s *reviewService) BulkDelete(ctx context.Context, product_id int64, ids []int) ([]model.ProductReview, error) {
	reviews, err := s.ReviewRepository.BulkDelete(ctx, product_id, ids)
	if err != nil {
		return nil, err
	}
	return reviews, nil
}

func (s *reviewService) Count(ctx context.Context, productId int64) (int, error) {
	count, err := s.ReviewRepository.Count(ctx, productId)
	if err != nil {
		return count, err
	}
	return count, nil
}

// func (s *reviewService) ReviewList(ctx context.Context, productId int64, userId uuid.UUID) ([]model.Review, error) {
// 	reviews, err := s.ReviewRepository.ReviewList(ctx, productId, userId)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return reviews, nil
// }

// func (s *reviewService) ReviewCreate(ctx context.Context, userId uuid.UUID, review *model.Review) (*model.Review, error) {
// 	review, err := s.ReviewRepository.ReviewCreate(ctx, userId, review)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return review, nil
// }

// func (s *reviewService) ReviewUpdate(ctx context.Context, reviewId int64, review *model.Review) (*model.Review, error) {
// 	review, err := s.ReviewRepository.ReviewUpdate(ctx, reviewId, review)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return review, nil
// }

// func (s *reviewService) ReviewDelete(ctx context.Context, reviewId int64) (*model.Review, error) {
// 	review, err := s.ReviewRepository.ReviewDelete(ctx,reviewId)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return review, nil
// }
