package service

import (
	"backend/model"
	"context"
	"github.com/google/uuid"
)

type productService struct {
	ProductRepository model.ProductRepository
}

type ProductServiceConfig struct {
	ProductRepository model.ProductRepository
}

func NewProductService(c *ProductServiceConfig) model.ProductService {
	return &productService{}
}

func (s *productService) ProductCreate(ctx context.Context, product *model.Product) (*model.Product, error) {
	product = &model.Product{}
	var err error
	return product, err
}

func (s *productService) ProductList(ctx context.Context) ([]*model.Product, error) {
	products := []*model.Product{}
	var err error
	return products, err
}
func (s *productService) ProductFindByID(ctx context.Context, productId uuid.UUID) (*model.Product, error) {
	product := model.Product{}
	var err error
	return &product, err
}
func (s *productService) ProductFindByName(ctx context.Context, productName string) (*model.Product, error) {
	product := model.Product{}
	var err error
	return &product, err
}

func (s *productService) ProductUpdate(ctx context.Context, productId uuid.UUID, product *model.Product) (*model.Product, error) {
	var err error
	return product, err
}

func (s *productService) ProductDelete(ctx context.Context, productId uuid.UUID) (*model.Product, error) {
	product := model.Product{}
	var err error
	return &product, err
}
