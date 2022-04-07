package repository

import (
	"backend/model"
	"backend/model/apperrors"
	"context"

	// "fmt"

	// "database/sql"
	"log"
	"strconv"

	// "github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

type pGProductRepository struct {
	DB *sqlx.DB
}

func NewProductRepository(db *sqlx.DB) model.ProductRepository {
	return &pGProductRepository{
		DB: db,
	}
}

func (r *pGProductRepository) ProductCreate(ctx context.Context, p *model.Product) (*model.Product, error) {
	product := model.Product{}
	query := `INSERT INTO products (product_name, slug, product_image, brand, price, category_id, count_in_stock, description,average_rating) VALUES ($1, $2,$3, $4,$5,$6, $7,$8, $9) RETURNING *`
	if err := r.DB.GetContext(ctx, &product, query, p.ProductName, p.Slug, p.ProductImage, p.Brand, p.Price, p.CategoryId, p.CountInStock, p.Description, p.AverageRating); err != nil {
		log.Printf("Could not create a product : %v. Reason: %v\n", p.ProductName, err)
		return nil, apperrors.NewInternal()
	}
	return p, nil
}


func (r *pGProductRepository) ProductList(ctx context.Context) ([]model.Product, error) {
	products := []model.Product{}
	query := "SELECT * FROM products"
	if err := r.DB.SelectContext(ctx, &products, query); err != nil {
		log.Printf("Unable to get product with name: %v. Err: %v\n", products, err)
		return nil, apperrors.NewNotFound("product_name", "products")
	}
	return products, nil
}
func (r *pGProductRepository) ProductFindByID(ctx context.Context, productId int64) (*model.Product, error) {
	product := model.Product{}
	query := "SELECT * FROM products WHERE product_id=$1"
	if err := r.DB.GetContext(ctx, &product, query, productId); err != nil {
		log.Printf("Unable to get product with name: %v. Err: %v\n", product.ProductName, err)
		id := strconv.Itoa(int(productId))
		return nil, apperrors.NewNotFound("product_id", id)
	}
	return &product, nil
}

// ProductSearch
func (r *pGProductRepository) ProductFindByName(ctx context.Context, productName string) (*model.Product, error) {
	product := model.Product{}
	query := "SELECT * FROM products WHERE product_name=$1"
	if err := r.DB.GetContext(ctx, &product, query, productName); err != nil {
		log.Printf("Unable to get product : %v. Err: %v\n", productName, err)
		return nil, apperrors.NewNotFound("product", productName)
	}

	return &product, nil
}

func (r *pGProductRepository) ProductUpdate(ctx context.Context, productId int64, p *model.Product) (*model.Product, error) {
	query := `
	UPDATE products
	SET product_name = $2,slug = $3,product_image = $4,brand = $5, price = $6,category_name = $7,count_in_stock = $8,description = $9,average_rating = $10
	WHERE product_id=$1
	RETURNING *;`
	if err := r.DB.GetContext(ctx, p, query, productId, p.ProductName, p.Slug, p.ProductImage, p.Brand, p.Price, p.CategoryId, p.CountInStock, p.Description, p.AverageRating); err != nil {
		log.Printf("Unable to update product: %v. Err: %v\n", p.ProductName, err)
		id := strconv.Itoa(int(productId))
		return nil, apperrors.NewNotFound("product_id", id)
	}
	return p, nil
}
func (r *pGProductRepository) ProductDelete(ctx context.Context, productId int64) (*model.Product, error) {
	product := model.Product{}
	query := "SELECT * FROM products WHERE product_id=$1"
	if err := r.DB.GetContext(ctx, &product, query, productId); err != nil {
		log.Printf("Unable to get product: %v. Err: %v\n", product, err)
		id := strconv.Itoa(int(productId))
		return nil, apperrors.NewNotFound("product", id)
	}
	query2 := "DELETE FROM products WHERE product_id = $1"
	_, err2 := r.DB.ExecContext(ctx, query2, productId)
	if err2 != nil {
		log.Printf("Unable to delete product: %v. Err: %v\n", product, err2)
		id := strconv.Itoa(int(productId))
		return nil, apperrors.NewNotFound("product_id", id)
	}
	return &product, nil
}
