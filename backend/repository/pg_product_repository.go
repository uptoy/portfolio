package repository

import (
	"backend/model"
	"backend/model/apperrors"
	"context"
	"log"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/lib/pq"
)

type pGProductRepository struct {
	DB *sqlx.DB
}

func NewPostRepository(db *sqlx.DB) model.ProductRepository {
	return &pGProductRepository{
		DB: db,
	}
}

func (r *pGProductRepository) ProductCreate(ctx context.Context, p *model.Product) (*model.Product, error) {
	product := &model.Product{}
	query := `INSERT INTO products (product_name, description,price,rating,image_url) VALUES ($1, $2,$3, $4,$5) RETURNING *`
	if err := r.DB.GetContext(ctx, p, query, p.ProductName, p.Description, p.Price, p.AverageRating, p.ProductImage); err != nil {
		// check unique constraint
		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
			log.Printf("Could not create a user proct: %v. Reason: %v\n", p.ProductName, err.Code.Name())
			return nil, apperrors.NewConflict("product", p.ProductName)
		}
		log.Printf("Could not create a product with name: %v. Reason: %v\n", p.ProductName, err)
		return nil, apperrors.NewInternal()
	}
	return product, nil

}
func (r *pGProductRepository) ProductList(ctx context.Context) ([]*model.Product, error) {
	products := []*model.Product{}
	query := "SELECT * FROM products"
	if err := r.DB.GetContext(ctx, products, query); err != nil {
		log.Printf("Unable to get uproducts: %v. Err: %v\n", products, err)
		return products, apperrors.NewNotFound("products", "err")
	}
	return products, nil
}
func (r *pGProductRepository) ProductFindByID(ctx context.Context, productId uuid.UUID) (*model.Product, error) {
	product := model.Product{}
	query := "SELECT * FROM products WHERE productId=$1 LIMIT 1"
	if err := r.DB.GetContext(ctx, product, query, productId); err != nil {
		log.Printf("Unable to get product with name: %v. Err: %v\n", product, err)
		return &product, apperrors.NewNotFound("product_name", product.ProductName)
	}
	return &product, nil
}

// ProductSearch
func (r *pGProductRepository) ProductFindByName(ctx context.Context, productName string) (*model.Product, error) {
	product := model.Product{}
	query := "SELECT * FROM products WHERE product_name=$1"
	if err := r.DB.GetContext(ctx, product, query, productName); err != nil {
		log.Printf("Unable to get product with name: %v. Err: %v\n", productName, err)
		return &product, apperrors.NewNotFound("product_name", productName)
	}
	return &product, nil
}

func (r *pGProductRepository) ProductUpdate(ctx context.Context, productId uuid.UUID, product *model.Product) (*model.Product, error) {
	query := `
	UPDATE products
	SET product_name = $2,description = $3,price = $4,rating = $5, image_url = $6
	WHERE productId=$1
	RETURNING *;`
	if err := r.DB.GetContext(ctx, product, query, productId, product.ProductName, product.Description, product.Price, product.AverageRating, product.ProductImage); err != nil {
		log.Printf("Unable to update product: %v. Err: %v\n", product.ProductName, err)
		return product, apperrors.NewNotFound("product", product.ProductName)
	}
	return product, nil
}
func (r *pGProductRepository) ProductDelete(ctx context.Context, productId uuid.UUID) (*model.Product, error) {
	product := model.Product{}
	query := "DELETE FROM products WHERE productId = $1"
	// err := r.DB.GetContext(ctx,product , query, productId)
	_, err := r.DB.ExecContext(ctx, query, productId)
	if err != nil {
		log.Fatal(err)
	}
	return &product, err
}
