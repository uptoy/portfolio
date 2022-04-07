package repository

import (
	"time"

	"backend/model"
)

type productJoin struct {
	model.Product
	*CategoryJoin
}

// CategoryJoin is temp join type
type CategoryJoin struct {
	CCategoryId       int64     `db:"category_id"`
	CCategoryName string    `db:"category_name"`
	CCreatedAt        time.Time `db:"category_created_at"`
	CUpdatedAt        time.Time `db:"category_updated_at"`
}

func (pj *productJoin) ToProduct() *model.Product {
	return &model.Product{
		ProductId:     pj.ProductId,
		ProductName:   pj.ProductName,
		Slug:          pj.Slug,
		ProductImage:  pj.Slug,
		Brand:         pj.Slug,
		Price:         pj.Price,
		CountInStock:  pj.CountInStock,
		Description:   pj.Description,
		AverageRating: pj.AverageRating,
		CreatedAt:     pj.Product.CreatedAt,
		UpdatedAt:     pj.Product.UpdatedAt,
		Category: &model.Category{
			CategoryId:   pj.CategoryId,
			CategoryName: pj.CCategoryName,
			CreatedAt:    pj.CCreatedAt,
			UpdatedAt:    pj.CUpdatedAt,
		},
	}
}
