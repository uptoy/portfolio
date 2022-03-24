package service

import (
	"backend/model"
	"context"
	// "github.com/google/uuid"
)

type productService struct {
	ProductRepository  model.ProductRepository
}

// USConfig will hold repositories that will eventually be injected into this
// this service layer
type PSConfig struct {
	ProductRepository  model.ProductRepository
}

// NewUserService is a factory function for
// initializing a UserService with its repository layer dependencies
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

// func (s *productService) ProductList(ctx context.Context) ([]model.Product) {
func (s *productService) ProductList() ([]model.Product) {
	mockProductResp1 := model.Product{
		ProductId:     1,
		ProductName:   "product_name",
		Slug:          "slug",
		ProductImage:  "product_name",
		Brand:         "brand",
		Price:         100,
		CategoryName:  "category_name",
		CountInStock:  200,
		Description:   "description",
		AverageRating: 300,
	}
	mockProductResp2 := model.Product{
		ProductId:     2,
		ProductName:   "product_name",
		Slug:          "slug",
		ProductImage:  "product_name",
		Brand:         "brand",
		Price:         100,
		CategoryName:  "category_name",
		CountInStock:  200,
		Description:   "description",
		AverageRating: 300,
	}
	products := []model.Product{mockProductResp1, mockProductResp2}
	// productList, err := s.ProductRepository.ProductList(ctx)
	// if err != nil {
	// 	return nil, err
	// }
	return products
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
