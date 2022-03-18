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
	query := `INSERT INTO products (product_name, p.slug, p.product_image, p.brand, p.price, p.category_name, p.count_in_stock, p.description, p.average_rating) VALUES ($1, $2,$3, $4,$5,$6, $7,$8, $9) RETURNING *`
	if err := r.DB.GetContext(ctx, p, query, p.ProductName, p.Slug, p.ProductImage, p.Brand, p.Price, p.CategoryName, p.CountInStock, p.Description, p.AverageRating); err != nil {
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

// query := `INSERT INTO products (product_name, p.slug, p.product_image, p.brand, p.price, p.category_name, p.count_in_stock, p.description, p.average_rating) VALUES ($1, $2,$3, $4,$5,$6, $7,$8, $9) RETURNING *`
func (r *pGProductRepository) ProductUpdate(ctx context.Context, productId uuid.UUID, p *model.Product) (*model.Product, error) {
	query := `
	UPDATE products
	SET product_name = $2,slug = $3,product_image = $4,brand = $5, price = $6,category_name = $7,count_in_stock = $8,description = $9,average_rating = $10
	WHERE productId=$1
	RETURNING *;`
	if err := r.DB.GetContext(ctx, p, query, productId,p.ProductName, p.Slug, p.ProductImage, p.Brand, p.Price, p.CategoryName, p.CountInStock, p.Description, p.AverageRating); err != nil {
		log.Printf("Unable to update product: %v. Err: %v\n", p.ProductName, err)
		return p, apperrors.NewNotFound("product", p.ProductName)
	}
	return p, nil
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
