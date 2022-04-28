package service

import (
	"backend/model"
	"context"
	// "fmt"
	"mime/multipart"
)

type productService struct {
	ProductRepository      model.ProductRepository
	ProductImageRepository model.ProductImageRepository
	CategoryRepository     model.CategoryRepository
	ReviewRepository       model.ReviewRepository
}

type ProductServiceConfig struct {
	ProductRepository      model.ProductRepository
	ProductImageRepository model.ProductImageRepository
	CategoryRepository     model.CategoryRepository
	ReviewRepository       model.ReviewRepository
}

func NewProductService(c *ProductServiceConfig) model.ProductService {
	return &productService{
		ProductRepository:      c.ProductRepository,
		ProductImageRepository: c.ProductImageRepository,
		CategoryRepository:     c.CategoryRepository,
		ReviewRepository:       c.ReviewRepository,
	}
}

func (s *productService) ProductList(ctx context.Context) ([]*model.Product, error) {
	products, err := s.ProductRepository.ProductList(ctx)
	if err != nil {
		return products, err
	}
	for _, product := range products {
		productId := product.Id
		images, err := s.ProductImageRepository.GetAll(ctx, productId)
		if err != nil {
			return nil, err
		}
		product.Images = images
	}
	return products, nil
}

func (s *productService) ProductCreate(ctx context.Context, p *model.Product, files []*multipart.FileHeader) (*model.Product, error) {
	product, err := s.ProductRepository.ProductCreate(ctx, p)
	if err != nil {
		return nil, err
	}

	if len(files) > 0 {
		images := make([]*model.ProductImage, 0)
		for _, file := range files {
			image_url, err := NewMediaService(&MediaServiceConfig{}).FileUpload(file)
			if err != nil {
				return nil, err
			}
			images = append(images, &model.ProductImage{
				// ProductId: model.NewInt64(product.Id),
				// URL:       model.NewString(image_url),
				ProductId: product.Id,
				URL:       image_url,
			})
		}

		for _, img := range images {
			img.PreSave()
		}
		if err := s.ProductImageRepository.BulkInsert(ctx, images); err != nil {
			return nil, err
		}
		p.Images = images
		return p, nil
	}
	return p, nil
}

func (s *productService) ProductFindByID(ctx context.Context, id int64) (*model.Product, error) {
	product, err := s.ProductRepository.ProductFindByID(ctx, id)
	if err != nil {
		return nil, err
	}
	images, err1 := s.ProductImageRepository.GetAll(ctx, id)
	if err1 != nil {
		return nil, err1
	}
	product.Images = images
	return product, nil
}

func (s *productService) ProductUpdate(ctx context.Context, id int64, p *model.Product, files []*multipart.FileHeader) (*model.Product, error) {
	product, err := s.ProductRepository.ProductUpdate(ctx, id, p)
	if err != nil {
		return nil, err
	}
	if len(files) > 0 {
		images := make([]*model.ProductImage, 0)
		for _, file := range files {
			image_url, err := NewMediaService(&MediaServiceConfig{}).FileUpload(file)
			if err != nil {
				return nil, err
			}
			images = append(images, &model.ProductImage{
				// ProductId: model.NewInt64(product.Id),
				// URL:       model.NewString(image_url),
				ProductId: product.Id,
				URL:       image_url,
			})
		}
		for _, img := range images {
			img.PreUpdate()
		}
		productId := product.Id
		if err := s.ProductImageRepository.Update(ctx, productId, images); err != nil {
			return nil, err
		}
		// p.Images = images
		return p, nil
	}
	return product, nil
}

func (s *productService) ProductDelete(ctx context.Context, id int64) (*model.Product, error) {
	product, err := s.ProductRepository.ProductDelete(ctx, id)
	if err != nil {
		return nil, err
	}
	images, err1 := s.ProductImageRepository.GetAll(ctx, id)
	if err1 != nil {
		return nil, err1
	}
	product.Images = images
	return product, nil
}

func (s *productService) ProductFindByName(ctx context.Context, name string) (*model.Product, error) {
	product, err := s.ProductRepository.ProductFindByName(ctx, name)
	if err != nil {
		return nil, err
	}
	productId := product.Id
	images, err1 := s.ProductImageRepository.GetAll(ctx, productId)
	if err1 != nil {
		return nil, err1
	}
	product.Images = images
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

func (s *productService) ImageBulkInsert(ctx context.Context, images []*model.ProductImage) error {
	err := s.ProductImageRepository.BulkInsert(ctx, images)
	if err != nil {
		return err
	}
	return nil
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
