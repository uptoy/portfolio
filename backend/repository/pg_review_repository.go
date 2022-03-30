package repository

import (
	"backend/model"
	"backend/model/apperrors"
	"context"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/lib/pq"
	"log"
)

type pGReviewRepository struct {
	DB *sqlx.DB
}

func NewReviewRepository(db *sqlx.DB) model.ReviewRepository {
	return &pGReviewRepository{
		DB: db,
	}
}

func (r *pGReviewRepository) ReviewList(ctx context.Context, productId int64, userId uuid.UUID) ([]model.Review, error) {
	reviews := []model.Review{}
	query1 := `SELECT EXISTS (SELECT * FROM reviews WHERE product_id = $1 AND user_id = $2)`
	if err := r.DB.GetContext(ctx, &reviews, query1, productId, userId); err != nil {
		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
			log.Printf("Could not create a reviews: Reason: %v\n", err.Code.Name())
			return nil, apperrors.NewConflict("reviews", "reviews")
		}
		log.Printf("Could not create a reviews : %v. Reason: %v\n", reviews, err)
		return nil, apperrors.NewInternal()
	}
	query2 :=
		`SELECT users.fullname AS name, reviews.* FROM reviews
	JOIN users
	ON users.user_id = reviews.user_id
	WHERE product_id = $1`
	if err := r.DB.GetContext(ctx, &reviews, query2, productId); err != nil {
		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
			log.Printf("Could not create a reviews: Reason: %v\n", err.Code.Name())
			return nil, apperrors.NewConflict("reviews", "reviews")
		}
		log.Printf("Could not create a reviews : %v. Reason: %v\n", reviews, err)
		return nil, apperrors.NewInternal()
	}
	// reviewExist: reviewExist.rows[0].exists,
	// reviews: reviews.rows,
	return reviews, nil
}

func (r *pGReviewRepository) ReviewCreate(ctx context.Context, userId uuid.UUID, review *model.Review) (*model.Review, error) {

	query := `INSERT INTO reviews(user_id, product_id, content, rating)
	VALUES($1, $2, $3, $4) RETURNING *
 `
	if err := r.DB.GetContext(ctx, &review, query); err != nil {
		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
			log.Printf("Could not create a review: Reason: %v\n", err.Code.Name())
			return nil, apperrors.NewConflict("reviews", "reviews")
		}
		log.Printf("Could not create a review : %v. Reason: %v\n", review, err)
		return nil, apperrors.NewInternal()
	}

	return review, nil
}

func (r *pGReviewRepository) ReviewUpdate(ctx context.Context, reviewId int64, review *model.Review) (*model.Review, error) {
	query :=
		`UPDATE reviews SET content = $1, rating = $2 WHERE id = $3 RETURNING *`
	if err := r.DB.GetContext(ctx, review, query); err != nil {
		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
			log.Printf("Could not create a review: Reason: %v\n", err.Code.Name())
			return nil, apperrors.NewConflict("reviews", "reviews")
		}
		log.Printf("Could not create a review : %v. Reason: %v\n", review, err)
		return nil, apperrors.NewInternal()
	}
	return review, nil
}

func (r *pGReviewRepository) ReviewDelete(ctx context.Context, reviewId int64) (*model.Review, error) {
	review := model.Review{}
	query := `DELETE FROM reviews WHERE review_id = $1 RETURNING *`
	if err := r.DB.GetContext(ctx, &review, query, reviewId); err != nil {
		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
			log.Printf("Could not create a review: Reason: %v\n", err.Code.Name())
			return nil, apperrors.NewConflict("reviews", "reviews")
		}
		log.Printf("Could not create a review : %v. Reason: %v\n", review, err)
		return nil, apperrors.NewInternal()
	}
	return &review, nil
}
