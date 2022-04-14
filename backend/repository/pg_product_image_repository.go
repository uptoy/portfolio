package repository

import (
	"backend/model"
	"context"
	"fmt"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

type pGProductImageRepository struct {
	DB *sqlx.DB
}

func NewProductImageRepository(db *sqlx.DB) model.ProductImageRepository {
	return &pGProductImageRepository{
		DB: db,
	}
}

func (r *pGProductImageRepository) BulkInsert(ctx context.Context, images []*model.ProductImage) error {
	fmt.Println("images", images)
	q := `INSERT INTO product_image (product_id, url, created_at, updated_at) VALUES(:product_id, :url, :created_at, :updated_at)`
	if _, err := r.DB.NamedExecContext(ctx, q, images); err != nil {
		return err
	}
	return nil
}

func (r *pGProductImageRepository) Save(ctx context.Context, productId int64, image *model.ProductImage) (*model.ProductImage, error) {
	q := `INSERT INTO product_image (product_id, url, created_at, updated_at) VALUES(:product_id, :url, :created_at, :updated_at) RETURNING id`

	var id int64
	rows, err := r.DB.NamedQueryContext(ctx, q, map[string]interface{}{"product_id": productId, "url": image.URL, "created_at": image.CreatedAt, "updated_at": image.UpdatedAt})
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		rows.Scan(&id)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	image.ID = model.NewInt64(id)
	image.ProductId = model.NewInt64(productId)
	return image, nil
}

func (r *pGProductImageRepository) Get(ctx context.Context, pid, id int64) (*model.ProductImage, error) {
	query := `SELECT img.id AS id, img.product_id AS product_id, img.url AS url, img.created_at AS created_at, img.updated_at AS updated_at FROM product_image img WHERE img.id = $1 AND product_id= $2`
	var image model.ProductImage
	if err := r.DB.GetContext(ctx, &image, query, id, pid); err != nil {
		return nil, err
	}
	return &image, nil
}

func (r *pGProductImageRepository) GetAll(ctx context.Context, productId int64) ([]*model.ProductImage, error) {
	q := `SELECT img.id AS id, img.product_id AS product_id, img.url AS url, img.created_at AS created_at, img.updated_at AS updated_at FROM product_image img WHERE img.product_id = $1`
	imgs := make([]*model.ProductImage, 0)
	if err := r.DB.SelectContext(ctx, &imgs, q, productId); err != nil {
		return nil, err
	}
	return imgs, nil
}

func (r *pGProductImageRepository) Update(ctx context.Context, productId, id int64, image *model.ProductImage) (*model.ProductImage, error) {
	q := `UPDATE product_image SET url=:url, created_at=:created_at, updated_at=:updated_at WHERE id=:id AND product_id=:product_id`
	if _, err := r.DB.NamedExecContext(ctx, q, map[string]interface{}{"product_id": productId, "id": id, "url": image.URL, "created_at": image.CreatedAt, "updated_at": image.UpdatedAt}); err != nil {
		return nil, err
	}
	return image, nil
}

func (r *pGProductImageRepository) Delete(ctx context.Context, productId, id int64) error {
	if _, err := r.DB.NamedExecContext(ctx, `DELETE FROM product_image WHERE product_id=:product_id AND id=:id`, map[string]interface{}{"product_id": productId, "id": id}); err != nil {
		return err
	}
	return nil
}

func (r *pGProductImageRepository) BulkDelete(ctx context.Context, pid int64, ids []int) error {
	q, args, err := sqlx.In(`DELETE FROM product_image WHERE product_id = ? AND id IN (?)`, pid, ids)
	if err != nil {
		return err
	}
	if _, err := r.DB.ExecContext(ctx, r.DB.Rebind(q), args...); err != nil {
		return err
	}
	return nil
}
