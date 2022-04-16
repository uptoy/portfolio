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
	var id int64
	query := `INSERT INTO products (product_name, slug, brand, price, category_id, count_in_stock, description,average_rating) VALUES ($1, $2,$3, $4,$5,$6, $7,$8) RETURNING id`
	if err := r.DB.QueryRowContext(ctx, query, p.ProductName, p.Slug, p.Brand, p.Price, p.CategoryId, p.CountInStock, p.Description, p.AverageRating).Scan(&id); err != nil {
		log.Printf("Could not create a product : %v. Reason: %v\n", p.ProductName, err)
		return nil, apperrors.NewInternal()
	}
	p.Id = id
	return p, nil
}

func (r *pGProductRepository) ProductList(ctx context.Context) ([]*model.Product, error) {
	var pj []productJoin
	q := `
	SELECT DISTINCT ON (p.id)
	p.*,
	c.category_name
	FROM products p
	LEFT JOIN categories c ON p.category_id = c.id;
	`
	if err := r.DB.SelectContext(ctx, &pj, q); err != nil {
		log.Printf("Unable to get product with name: %v. Err: %v\n", "", err)
	}
	products := make([]*model.Product, 0)
	for _, x := range pj {
		products = append(products, x.ToProduct())
	}
	return products, nil
}
func (r *pGProductRepository) ProductFindByID(ctx context.Context, productId int64) (*model.Product, error) {
	var pj productJoin
	q := `
		SELECT products.*,categories.* FROM products LEFT JOIN categories ON products.category_id = categories.id WHERE products.id = $1;
		`
	if err := r.DB.GetContext(ctx, &pj, q, productId); err != nil {
		log.Printf("Unable to get product with name: %v. Err: %v\n", "", err)
	}
	product := pj.ToProduct()
	return product, nil
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
	SET product_name = $2,slug = $3,brand = $4, price = $5,category_id = $6,count_in_stock = $7,description = $8,average_rating = $9
	WHERE id=$1
	RETURNING *;`
	if err := r.DB.GetContext(ctx, p, query, productId, p.ProductName, p.Slug, p.Brand, p.Price, p.CategoryId, p.CountInStock, p.Description, p.AverageRating); err != nil {
		log.Printf("Unable to update product: %v. Err: %v\n", p.ProductName, err)
		id := strconv.Itoa(int(productId))
		return nil, apperrors.NewNotFound("product_id", id)
	}
	return p, nil
}
func (r *pGProductRepository) ProductDelete(ctx context.Context, productId int64) (*model.Product, error) {
	product := model.Product{}
	query := "SELECT * FROM products WHERE id=$1"
	if err := r.DB.GetContext(ctx, &product, query, productId); err != nil {
		log.Printf("Unable to get product: %v. Err: %v\n", product, err)
		id := strconv.Itoa(int(productId))
		return nil, apperrors.NewNotFound("product", id)
	}
	query2 := "DELETE FROM products WHERE id = $1"
	_, err2 := r.DB.ExecContext(ctx, query2, productId)
	if err2 != nil {
		log.Printf("Unable to delete product: %v. Err: %v\n", product, err2)
		id := strconv.Itoa(int(productId))
		return nil, apperrors.NewNotFound("product_id", id)
	}
	return &product, nil
}

func (r *pGProductRepository) BulkDelete(ctx context.Context) ([]model.Product, error) {
	products := []model.Product{}
	query := "SELECT * FROM products"
	if err := r.DB.SelectContext(ctx, &products, query); err != nil {
		log.Printf("Unable to get product with name: %v. Err: %v\n", products, err)
		return nil, apperrors.NewNotFound("product_name", "products")
	}
	query1 := "DELETE FROM products"
	_, err2 := r.DB.ExecContext(ctx, query1)
	if err2 != nil {
		log.Printf("Unable to delete product: %v. Err: %v\n", products, err2)
		return nil, apperrors.NewNotFound("products", "products")
	}
	return products, nil
}

func (r *pGProductRepository) BulkInsert(ctx context.Context, products []model.Product) ([]model.Product, error) {
	query := "INSERT INTO categories (category_name,slug,brand,price,category_id,count_in_stock,description,average_rating,created_at,updated_at) values (:category_name,:slug,:brand,:price,:category_id,:count_in_stock,:description,:average_rating,:created_at,:updated_at)"
	_, err := r.DB.NamedExecContext(ctx, query, products)
	if err != nil {
		log.Printf("Unable to bulk insert product: %v. Err: %v\n", products, err)
	}
	return products, nil
}

func (r *pGProductRepository) ProductCount(ctx context.Context) (int, error) {
	var count int
	query := `
	SELECT COUNT(*) FROM products
	`
	r.DB.GetContext(ctx, &count, query)
	return count, nil
}

func (r *pGProductRepository) ProductListByIDS(ctx context.Context, ids []int64) ([]*model.Product, error) {
	products := []*model.Product{}

	return products, nil
}
