package service

import (
	"backend/model"
	"context"
	"github.com/google/uuid"
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

func (s *reviewService) ReviewList(ctx context.Context, productId int64, userId uuid.UUID) ([]model.Review, error) {
	reviews, err := s.ReviewRepository.ReviewList(ctx, productId, userId)
	if err != nil {
		return nil, err
	}
	return reviews, nil
}

func (s *reviewService) ReviewCreate(ctx context.Context, userId uuid.UUID, review *model.Review) (*model.Review, error) {
	review, err := s.ReviewRepository.ReviewCreate(ctx, userId, review)
	if err != nil {
		return nil, err
	}
	return review, nil
}

func (s *reviewService) ReviewUpdate(ctx context.Context, reviewId int64, review *model.Review) (*model.Review, error) {
	review, err := s.ReviewRepository.ReviewUpdate(ctx, reviewId, review)
	if err != nil {
		return nil, err
	}
	return review, nil
}

func (s *reviewService) ReviewDelete(ctx context.Context, reviewId int64) (*model.Review, error) {
	review, err := s.ReviewRepository.ReviewDelete(ctx,reviewId)
	if err != nil {
		return nil, err
	}
	return review, nil
}
