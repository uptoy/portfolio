package service

import (
	"backend/model"

	// "bytes"
	"context"
	"io"
	// "io/ioutil"
	// "log"
	// "github.com/google/uuid"
	// "mime/multipart"
	// "path/filepath"
)

type productService struct {
	ProductRepository      model.ProductRepository
	ProductImageRepository model.ProductImageRepository
}

type ProductServiceConfig struct {
	ProductRepository      model.ProductRepository
	ProductImageRepository model.ProductImageRepository
}

func NewProductService(c *ProductServiceConfig) model.ProductService {
	return &productService{
		ProductRepository:      c.ProductRepository,
		ProductImageRepository: c.ProductImageRepository,
	}
}

func (s *productService) ProductList(ctx context.Context) ([]model.Product, error) {
	products, err := s.ProductRepository.ProductList(ctx)
	if err != nil {
		return products, err
	}
	return products, nil
}

func (s *productService) ProductCreate(ctx context.Context, p *model.Product, filepaths []string) (*model.Product, error) {
	product, err := s.ProductRepository.ProductCreate(ctx, p)
	if err != nil {
		return nil, err
	}

	if len(filepaths) > 0 {
		images := make([]*model.ProductImage, 0)
		for _, filepath := range filepaths {
			images = append(images, &model.ProductImage{
				ProductId: product.Id,
				URL:       filepath,
			})
		}
		for _, img := range images {
			img.PreSave()
		}
		if err := s.ProductImageRepository.BulkInsert(ctx, images); err != nil {
			return nil, err
		}
	}
	return p, nil
}

func (s *productService) ProductFindByID(ctx context.Context, id int64) (*model.Product, error) {
	product, err := s.ProductRepository.ProductFindByID(ctx, id)
	if err != nil {
		return nil, err
	}
	return product, nil
}

func (s *productService) ProductUpdate(ctx context.Context, id int64, p *model.Product) (*model.Product, error) {
	product, err := s.ProductRepository.ProductUpdate(ctx, id, p)
	if err != nil {
		return nil, err
	}
	return product, nil
}

func (s *productService) ProductDelete(ctx context.Context, id int64) (*model.Product, error) {
	product, err := s.ProductRepository.ProductDelete(ctx, id)
	if err != nil {
		return nil, err
	}
	return product, nil
}

func (s *productService) ProductFindByName(ctx context.Context, name string) (*model.Product, error) {
	product, err := s.ProductRepository.ProductFindByName(ctx, name)
	if err != nil {
		return nil, err
	}
	return product, nil
}

func (s *productService) BulkDelete(ctx context.Context) ([]model.Product, error) {
	products, err := s.ProductRepository.BulkDelete(ctx)
	if err != nil {
		return nil, err
	}
	return products, nil
}

func (s *productService) BulkInsert(ctx context.Context, products []model.Product) ([]model.Product, error) {
	products, err := s.ProductRepository.BulkInsert(ctx, products)
	if err != nil {
		return nil, err
	}
	return products, nil
}

func (s *productService) ProductFindByIDJoin(ctx context.Context, productId int64) (*model.Product, error) {
	product, err := s.ProductRepository.ProductFindByIDJoin(ctx, productId)
	if err != nil {
		return nil, err
	}
	return product, nil
}

func (s *productService) ProductCount(ctx context.Context) (int, error) {
	count, err := s.ProductRepository.ProductCount(ctx)
	if err != nil {
		return count, err
	}
	return count, nil
}

func (s *productService) ProductListByIDS(ctx context.Context, ids []int64) ([]*model.Product, error) {
	products, err := s.ProductRepository.ProductListByIDS(ctx, ids)
	if err != nil {
		return nil, err
	}
	return products, nil
}

//s3
func (s *productService) UploadImage(data io.Reader, filename string, cloudEnvURI string) error {
	return nil
}
