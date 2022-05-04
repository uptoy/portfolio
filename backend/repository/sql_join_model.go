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

type Category struct {
	CID        int64     `db:"category_id"`
	CName      string    `db:"category_name"`
	CCreatedAt time.Time `db:"category_created_at"`
	CUpdatedAt time.Time `db:"category_updated_at"`
}
type WishlistProduct struct {
	model.Product
	*Category
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
		Id:           pj.Id,
		ProductName:  pj.ProductName,
		Slug:         pj.Slug,
		Brand:        pj.Brand,
		Price:        pj.Price,
		CategoryId:   pj.CategoryId,
		CountInStock: pj.CountInStock,
		Description:  pj.Description,
		CreatedAt:    pj.CreatedAt,
		UpdatedAt:    pj.UpdatedAt,
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

type cartItemJoin struct {
	model.CartItem
	*ProductJoin
}


type ProductJoin struct {
	PId           int64     `db:"id" json:"id"`
	PProductName  string    `db:"product_name" json:"product_name"`
	PSlug         string    `db:"slug" json:"slug"`
	PBrand        string    `db:"brand" json:"brand"`
	PPrice        int64     `db:"price" json:"price"`
	PCategoryId   int64     `db:"category_id" json:"category_id"`
	PCountInStock int64     `db:"count_in_stock" json:"count_in_stock"`
	PDescription  string    `db:"description" json:"description"`
	PCreatedAt    time.Time `db:"created_at" json:"created_at"`
	PUpdatedAt    time.Time `db:"updated_at" json:"updated_at"`
}

func (cij *cartItemJoin) ToCartItem() *model.CartItem {
	return &model.CartItem{
		Id:        cij.Id,
		CartId:    cij.CartId,
		ProductId: cij.ProductId,
		Quantity:  cij.Quantity,
		CreatedAt: cij.CreatedAt,
		UpdatedAt: cij.UpdatedAt,
		Product: &model.Product{
			Id:           cij.PId,
			ProductName:  cij.PProductName,
			Slug:         cij.PSlug,
			Brand:        cij.PBrand,
			Price:        cij.PPrice,
			CategoryId:   cij.PCategoryId,
			CountInStock: cij.PCountInStock,
			Description:  cij.PDescription,
			CreatedAt:    cij.CreatedAt,
			UpdatedAt:    cij.UpdatedAt,
		},
	}
}
