package repository

// import (
// 	"context"
// 	"log"

// 	"backend/model"
// 	"backend/model/apperrors"
// 	"github.com/google/uuid"
// 	"github.com/jmoiron/sqlx"
// 	// "github.com/lib/pq"
// )

// // PGProductRepository is data/repository implementation
// // of service layer ProductRepository
// type pGProductRepository struct {
// 	DB *sqlx.DB
// }

// // NewProductRepository is a factory for initializing Product Repositories
// func NewProductRepository(db *sqlx.DB) model.ProductRepository {
// 	return &pGProductRepository{
// 		DB: db,
// 	}
// }

// // Create reaches out to database SQLX api
// func (r *pGProductRepository) Create(ctx context.Context, input *model.Product) (*model.Product, error) {
// 	var err error
// 	product := &model.Product{}
// 	query := "INSERT INTO products (id, product_name, price,rating,image) VALUES (?, ?, ?, ?, ?)"
// 	_, err = r.DB.ExecContext(
// 		ctx, query, product,
// 	)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return product, nil
// }

// // FindByID fetches product by id
// func (r *pGProductRepository) FindByID(ctx context.Context, productId uuid.UUID) (*model.Product, error) {
// 	product := &model.Product{}
// 	query := "SELECT * FROM products WHERE id = ? LIMIT 1"
// 	// we need to actually check errors as it could be something other than not found
// 	if err := r.DB.GetContext(ctx, r.DB, query, productId); err != nil {
// 		return nil, apperrors.NewNotFound("id", productId.String())
// 	}

// 	return product, nil
// }

// // Update updates a product's properties
// func (r *pGProductRepository) Update(ctx context.Context, productId uuid.UUID, input *model.Product) (*model.Product, error) {
// 	query := `
// 	UPDATE products SET product_name = ?, price = ?, rating = ?, image = ? WHERE id = ?"
// 	`
// 	_, err := r.DB.ExecContext(ctx, query, input.Product_Name,input.Price, input.Rating, input.Image, productId)
// 	if err != nil {
// 		log.Printf("Unable to prepare product update query: %v\n", err)
// 		return nil, apperrors.NewInternal()
// 	}
// 	if err != nil {
// 		return nil, err
// 	}
// 	return r.FindByID(ctx, productId)
// }

// // List はリポジトリから全ユーザーのProductを検索する
// func (r *pGProductRepository) List(ctx context.Context, limit, offset int) ([]*model.Product, error) {
// 	products := make([]*model.Product, 0, limit)
// 	query := `
// 	SELECT id, product_name, price, rating, image FROM products
// 	ORDER BY created_at DESC LIMIT ? OFFSET ?
// `
// 	err := sqlx.SelectContext(ctx, r.DB, &products, query, limit, offset)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return products, nil
// }

// func (r *pGProductRepository) Delete(ctx context.Context, productId uuid.UUID) error {
// 	//??
// 	query := `DELETE FROM products WHERE id = ?"`
// 	_, err := r.DB.ExecContext(ctx, query, productId)
// 	if err != nil {
// 		log.Printf("Unable to prepare product delete query: %v\n", err)
// 		return apperrors.NewInternal()
// 	}
// 	return err
// }
