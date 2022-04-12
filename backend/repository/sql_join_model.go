package repository

import (
	"time"

	"backend/model"

	"github.com/google/uuid"
)

// productJoin is temp join type
type productJoin struct {
	model.Product
	*CategoryJoin
}

// CategoryJoin is temp join type
type CategoryJoin struct {
	CID        int64     `db:"category_id"`
	CName      string    `db:"category_name"`
	CCreatedAt time.Time `db:"category_created_at"`
	CUpdatedAt time.Time `db:"category_updated_at"`
}

func (pj *productJoin) ToProduct() *model.Product {
	return &model.Product{
		Id:     pj.Id,
		ProductName:   pj.ProductName,
		Slug:          pj.Slug,
		Brand:         pj.Brand,
		Price:         pj.Price,
		CategoryId:    pj.CategoryId,
		CountInStock:  pj.CountInStock,
		Description:   pj.Description,
		AverageRating: pj.AverageRating,
		CreatedAt:     pj.CreatedAt,
		UpdatedAt:     pj.UpdatedAt,
		Category: &model.Category{
			ID:           pj.CID,
			CategoryName: pj.CName,
			CreatedAt:    pj.CCreatedAt,
			UpdatedAt:    pj.CUpdatedAt,
		},
	}
}

// reviewJoin is temp join type
type reviewJoin struct {
	*model.ProductReview
	*UserJoin
}

func (rj *reviewJoin) ToReview() *model.ProductReview {
	return &model.ProductReview{
		ID:        rj.ID,
		UserID:    rj.UID,
		ProductID: rj.ProductID,
		Rating:    rj.Rating,
		Title:     rj.Title,
		Comment:   rj.Comment,
		CreatedAt: rj.CreatedAt,
		UpdatedAt: rj.UpdatedAt,
		User: &model.User{
			UID:        rj.UID,
			Name:       rj.Name,
			Email:      rj.Email,
			ProfileUrl: rj.ProfileUrl,
		},
	}
}
type UserJoin struct {
	UID        uuid.UUID `db:"uid" json:"uid"`
	Name       string    `db:"name" json:"name"`
	Email      string    `db:"email" json:"email"`
	ProfileUrl string    `db:"profile_url" json:"profile_url"`
}
