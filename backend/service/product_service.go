package service

import (
	"backend/model"
	"context"
	// "github.com/google/uuid"
)

type productService struct {
	ProductRepository model.ProductRepository
}

type PSConfig struct {
	ProductRepository model.ProductRepository
}

func NewProductService(c *PSConfig) model.ProductService {
	return &productService{
		ProductRepository:  c.ProductRepository,
	}
}

func (s *productService) ProductCreate(ctx context.Context, product *model.Product) (*model.Product, error) {
	product, err := s.ProductRepository.ProductCreate(ctx, product)
	if err != nil {
		return nil, err
	}
	return product, nil
}

func (s *productService) ProductList(ctx context.Context) ([]*model.Product, error) {
	productList, err := s.ProductRepository.ProductList(ctx)
	if err != nil {
		return nil, err
	}
	return productList, nil
}
func (s *productService) ProductFindByID(ctx context.Context, productId int64) (*model.Product, error) {
	product, err := s.ProductRepository.ProductFindByID(ctx, productId)
	if err != nil {
		return nil, err
	}
	return product, nil
}
func (s *productService) ProductFindByName(ctx context.Context, productName string) (*model.Product, error) {
	product, err := s.ProductRepository.ProductFindByName(ctx, productName)
	if err != nil {
		return nil, err
	}
	return product, nil
}

func (s *productService) ProductUpdate(ctx context.Context, productId int64, product *model.Product) (*model.Product, error) {
	product, err := s.ProductRepository.ProductUpdate(ctx, productId, product)
	if err != nil {
		return nil, err
	}
	return product, nil
}

func (s *productService) ProductDelete(ctx context.Context, productId int64) (*model.Product, error) {
	product, err := s.ProductRepository.ProductDelete(ctx, productId)
	if err != nil {
		return nil, err
	}
	return product, nil
}
