package repository

import (
	"backend/model"
	"context"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type pGProductRepository struct {
	DB *sqlx.DB
}

func NewPostRepository(db *sqlx.DB) model.ProductRepository {
	return &pGProductRepository{
		DB: db,
	}
}

func (r *pGProductRepository) ProductCreate(ctx context.Context, product *model.Product) (*model.Product, error) {
	product = &model.Product{}
	var err error
	return product, err

}
func (r *pGProductRepository) ProductList(ctx context.Context) ([]*model.Product, error) {
	products := []*model.Product{}
	var err error
	return products, err

}
func (r *pGProductRepository) ProductFindByID(ctx context.Context, productId uuid.UUID) (*model.Product, error) {
	product := model.Product{}
	var err error
	return &product, err

}

// ProductSearch
func (r *pGProductRepository) ProductFindByName(ctx context.Context, productName string) (*model.Product, error) {
	product := model.Product{}
	var err error
	return &product, err
}
func(r *pGProductRepository) ProductUpdate(ctx context.Context, productId uuid.UUID, product *model.Product) (*model.Product, error) {
	var err error
	return product, err
}
func(r *pGProductRepository) ProductDelete(ctx context.Context, productId uuid.UUID) (*model.Product, error) {
	product := model.Product{}
	var err error
	return &product, err
}
