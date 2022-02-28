package service

import (
	"context"
	"backend/model"
	"github.com/google/uuid"
)

type productService struct {
	ProductRepository model.ProductRepository
}

func NewProductService(c *USConfig) model.ProductService {
	return &productService{}
}

func (s *productService) Create(ctx context.Context, input *model.Product) (*model.Product, error) {
	u, err := s.ProductRepository.Create(ctx, input)

	return u, err
}

func (s *productService) FindByID(ctx context.Context, uid uuid.UUID) (*model.Product, error) {
	u, err := s.ProductRepository.FindByID(ctx, uid)

	return u, err
}
func (s *productService) List(ctx context.Context, limit, offset int) ([]*model.Product, error) {
	products, err := s.ProductRepository.List(ctx, limit, offset)
	return products, err
}

func (s *productService) Update(ctx context.Context, uid uuid.UUID, input *model.Product) (*model.Product, error) {
	u, err := s.ProductRepository.Update(ctx, uid, input)
	return u, err
}

func (s *productService) Delete(ctx context.Context, uid uuid.UUID)  error {
	err := s.ProductRepository.Delete(ctx, uid)
	return err
}
