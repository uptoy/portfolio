package service

import (
	"backend/model"
	"context"
)

type productService struct {
	ProductRepository model.ProductRepository
}

type PSConfig struct {
	ProductRepository model.ProductRepository
}

func NewProductService(c *PSConfig) model.ProductService {
	return &productService{
		ProductRepository: c.ProductRepository,
	}
}

func (s *productService) ProductList(ctx context.Context) ([]*model.Product, error) {
	products, err := s.ProductRepository.ProductList(ctx)
	if err != nil {
		return nil, err
	}
	return products, nil
}

func (s *productService) ProductCreate(ctx context.Context, p *model.Product) (*model.Product, error) {
	product,err := s.ProductRepository.ProductCreate(ctx, p)
	if err != nil {
		return nil, err
	}
	return product,nil
}

func (s *productService) ProductFindByID(ctx context.Context, id int64) (*model.Product, error) {
	product,err := s.ProductRepository.ProductFindByID(ctx, id)
	if err != nil {
		return nil, err
	}
	return product,nil
}

func (s *productService) ProductUpdate(ctx context.Context, id int64, p *model.Product) (*model.Product, error) {
	product,err := s.ProductRepository.ProductUpdate(ctx, id, p)
	if err != nil {
		return nil, err
	}
	return product,nil
}

func (s *productService) ProductDelete(ctx context.Context, id int64) (*model.Product, error) {
	product,err := s.ProductRepository.ProductDelete(ctx, id)
	if err != nil {
		return nil, err
	}
	return product,nil
}

func (s *productService) ProductFindByName(ctx context.Context, name string) (*model.Product, error) {
	product,err := s.ProductRepository.ProductFindByName(ctx, name)
	if err != nil {
		return nil, err
	}
	return product,nil
}
