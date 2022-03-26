package service

import (
	"backend/model"
	"context"
)

type categoryService struct {
	CategoryRepository model.CategoryRepository
}

type CategoryServiceConfig struct {
	CategoryRepository model.CategoryRepository
}

func NewCategoryService(c *CategoryServiceConfig) model.CategoryService {
	return &categoryService{
		CategoryRepository: c.CategoryRepository,
	}
}

func (s *categoryService) CategoryList(ctx context.Context) ([]model.Category, error) {
	categories, err := s.CategoryRepository.CategoryList(ctx)
	if err != nil {
		return categories, err
	}
	return categories, nil
}

func (s *categoryService) CategoryCreate(ctx context.Context, c *model.Category) (*model.Category, error) {
	category, err := s.CategoryRepository.CategoryCreate(ctx, c)
	if err != nil {
		return nil, err
	}
	return category, nil
}

func (s *categoryService) CategoryFindByID(ctx context.Context, id int64) (*model.Category, error) {
	category, err := s.CategoryRepository.CategoryFindByID(ctx, id)
	if err != nil {
		return nil, err
	}
	return category, nil
}

func (s *categoryService) CategoryUpdate(ctx context.Context, id int64, c *model.Category) (*model.Category, error) {
	category, err := s.CategoryRepository.CategoryUpdate(ctx, id, c)
	if err != nil {
		return nil, err
	}
	return category, nil
}

func (s *categoryService) CategoryDelete(ctx context.Context, id int64) (*model.Category, error) {
	category, err := s.CategoryRepository.CategoryDelete(ctx, id)
	if err != nil {
		return nil, err
	}
	return category, nil
}

func (s *categoryService) CategoryFindByName(ctx context.Context, name string) (*model.Category, error) {
	category, err := s.CategoryRepository.CategoryFindByName(ctx, name)
	if err != nil {
		return nil, err
	}
	return category, nil
}
