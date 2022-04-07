package repository

import (
	"backend/model"
	"backend/model/apperrors"
	"context"
	"log"
	"strconv"

	// "time"

	"github.com/jmoiron/sqlx"
	"github.com/lib/pq"
)

type pGCategoryRepository struct {
	DB *sqlx.DB
}

func NewCategoryRepository(db *sqlx.DB) model.CategoryRepository {
	return &pGCategoryRepository{
		DB: db,
	}
}

func (r *pGCategoryRepository) CategoryCreate(ctx context.Context, c *model.Category) (*model.Category, error) {
	category := model.Category{}
	// c.PreSave()
	// c.Validate()

	query := `INSERT INTO categories (category_name) VALUES ($1) RETURNING *`
	if err := r.DB.GetContext(ctx, &category, query, c.CategoryName); err != nil {
		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
			log.Printf("Could not create a category: %v. Reason: %v\n", c.CategoryName, err.Code.Name())
			return nil, apperrors.NewConflict("category", c.CategoryName)
		}
		log.Printf("Could not create a category : %v. Reason: %v\n", c.CategoryName, err)
		return nil, apperrors.NewInternal()
	}
	return &category, nil
}

func (r *pGCategoryRepository) CategoryList(ctx context.Context) ([]model.Category, error) {
	categories := []model.Category{}
	query := "SELECT * FROM categories"
	if err := r.DB.SelectContext(ctx, &categories, query); err != nil {
		log.Printf("Unable to get category with name: %v. Err: %v\n", categories, err)
		return nil, apperrors.NewNotFound("category_name", "categories")
	}
	return categories, nil
}
func (r *pGCategoryRepository) CategoryFindByID(ctx context.Context, id int64) (*model.Category, error) {
	category := model.Category{}
	query := "SELECT * FROM categories WHERE id=$1"
	if err := r.DB.GetContext(ctx, &category, query, id); err != nil {
		log.Printf("Unable to get category with name: %v. Err: %v\n", category.CategoryName, err)
		id := strconv.Itoa(int(id))
		return nil, apperrors.NewNotFound("category_id", id)
	}
	return &category, nil
}

func (r *pGCategoryRepository) CategoryFindByName(ctx context.Context, name string) (*model.Category, error) {
	category := model.Category{}
	query := "SELECT * FROM categories WHERE category_name=$1"
	if err := r.DB.GetContext(ctx, &category, query, name); err != nil {
		log.Printf("Unable to get category : %v. Err: %v\n", name, err)
		return nil, apperrors.NewNotFound("category", name)
	}

	return &category, nil
}

func (r *pGCategoryRepository) CategoryUpdate(ctx context.Context, id int64, c *model.Category) (*model.Category, error) {
	c.PreUpdate()
	query := `
	UPDATE categories
	SET category_name = $2
	WHERE id=$1
	RETURNING *;`
	if err := r.DB.GetContext(ctx, c, query, id, c.CategoryName); err != nil {
		log.Printf("Unable to update category: %v. Err: %v\n", c.CategoryName, err)
		id := strconv.Itoa(int(id))
		return nil, apperrors.NewNotFound("category_id", id)
	}
	return c, nil
}
func (r *pGCategoryRepository) CategoryDelete(ctx context.Context, id int64) (*model.Category, error) {
	category := model.Category{}
	query := "SELECT * FROM categories WHERE id=$1"
	if err := r.DB.GetContext(ctx, &category, query, id); err != nil {
		log.Printf("Unable to get category: %v. Err: %v\n", category, err)
		id := strconv.Itoa(int(id))
		return nil, apperrors.NewNotFound("category", id)
	}
	query2 := "DELETE FROM categories WHERE id = $1"
	_, err2 := r.DB.ExecContext(ctx, query2, id)
	if err2 != nil {
		log.Printf("Unable to delete category: %v. Err: %v\n", category, err2)
		id := strconv.Itoa(int(id))
		return nil, apperrors.NewNotFound("category_id", id)
	}
	return &category, nil
}

func (r *pGCategoryRepository) BulkDelete(ctx context.Context) ([]model.Category, error) {
	categories := []model.Category{}
	query := "SELECT * FROM categories"
	if err := r.DB.SelectContext(ctx, &categories, query); err != nil {
		log.Printf("Unable to get product with name: %v. Err: %v\n", categories, err)
		return nil, apperrors.NewNotFound("product_name", "products")
	}
	query1 := "DELETE FROM categories"
	_, err2 := r.DB.ExecContext(ctx, query1)
	if err2 != nil {
		log.Printf("Unable to delete product: %v. Err: %v\n", categories, err2)
		return nil, apperrors.NewNotFound("categories", "categories")
	}
	return categories, nil
}

func (r *pGCategoryRepository) BulkInsert(ctx context.Context, categories []model.Category) ([]model.Category, error) {
	query := "INSERT INTO categories (category_name,created_at,updated_at) values (:category_name,:created_at,:updated_at)"
	for _, category := range categories {
		category.PreSave()
	}
	_, err := r.DB.NamedExecContext(ctx, query, categories)
	if err != nil {
		log.Fatalln(err)
	}
	return categories, nil
}

func (r *pGCategoryRepository) CategoryCount(ctx context.Context) (int, error) {
	var count int
	query := `
	SELECT COUNT(*) FROM categories
	`
	r.DB.GetContext(ctx, &count, query)
	return count, nil
}
