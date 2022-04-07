package repository

import (
	"backend/model"
	"backend/model/apperrors"
	"context"
	"fmt"
	"log"

	"github.com/jmoiron/sqlx"
	"github.com/lib/pq"
)

type pGReviewRepository struct {
	DB *sqlx.DB
}

func NewReviewRepository(db *sqlx.DB) model.ReviewRepository {
	return &pGReviewRepository{
		DB: db,
	}
}

func (r *pGReviewRepository) ReviewBulkInsert(ctx context.Context, reviews []model.ProductReview) ([]model.ProductReview, error) {
	q := `INSERT INTO product_review(user_id, product_id, rating, title, comment, created_at, updated_at) VALUES(:user_id, :product_id, :rating, :title, :comment, :created_at, :updated_at) RETURNING id`
	if _, err := r.DB.NamedExec(q, &reviews); err != nil {
		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
			log.Printf("Could not create a reviews: Reason: %v\n", err.Code.Name())
			return nil, apperrors.NewConflict("reviews", "reviews")
		}
		log.Printf("Could not create a reviews : %v. Reason: %v\n", reviews, err)
		return nil, apperrors.NewInternal()
	}
	return reviews, nil
}

func (r *pGReviewRepository) ReviewCreate(ctx context.Context, product_id int64, review *model.ProductReview) (*model.ProductReview, error) {
	fmt.Println("review", review)
	query := `INSERT INTO product_review (user_id, product_id, rating, title, comment) VALUES ($1, $2,$3, $4,$5) RETURNING *`
	if err := r.DB.GetContext(ctx, review, query, review.UserID, review.ProductID, review.Rating, review.Title, review.Comment); err != nil {
		log.Printf("Could not create product review : %v. Reason: %v\n", review.ProductID, err)
		return nil, apperrors.NewInternal()
	}
	return review, nil
}

// Get gets one review by id
func (r *pGReviewRepository) Get(ctx context.Context, product_id, review_id int64) (*model.ProductReview, error) {
	q := `SELECT
	r.*,
	u.id AS user_id,
	u.first_name AS user_first_name,
	u.last_name AS user_last_name,
	u.username AS user_username,
	u.avatar_url AS user_avatar_url,
	u.avatar_public_id AS user_avatar_public_id
	FROM product_review r
	LEFT JOIN public.user u ON r.user_id = u.id
	WHERE r.product_id = $1 AND r.id = $2`
	var rj reviewJoin
	if err := r.DB.Get(&rj, q, product_id, review_id); err != nil {
		return nil, err
	}
	return rj.ToReview(), nil
}

// GetAll returns all reviews
func (r *pGReviewRepository) GetAll(ctx context.Context, product_id int64) ([]*model.ProductReview, error) {
	q := `SELECT
	r.*,
	u.id AS user_id,
	u.first_name AS user_first_name,
	u.last_name AS user_last_name,
	u.username AS user_username,
	u.avatar_url AS user_avatar_url,
	u.avatar_public_id AS user_avatar_public_id
	FROM product_review r
	LEFT JOIN public.user u ON r.user_id = u.id
	WHERE r.product_id = $1`

	var rj []reviewJoin
	if err := r.DB.Select(&rj, q, product_id); err != nil {
		return nil, err
	}
	var reviews = make([]*model.ProductReview, 0)
	for _, x := range rj {
		reviews = append(reviews, x.ToReview())
	}
	return reviews, nil
}

// Update updates the review
func (r *pGReviewRepository) Update(ctx context.Context, product_id, review_id int64, rev *model.ProductReview) (*model.ProductReview, error) {
	q := `UPDATE product_review SET rating=:rating, title=:title, comment=:comment, updated_at=:updated_at WHERE product_id=:product_id AND id=:review_id`
	m := map[string]interface{}{"product_id": product_id, "review_id": review_id, "rating": rev.Rating, "title": rev.Title, "comment": rev.Comment, "updated_at": rev.UpdatedAt}
	if _, err := r.DB.NamedExec(q, m); err != nil {
		return nil, err
	}
	return rev, nil
}

// Delete hard deletes the review
func (r *pGReviewRepository) Delete(ctx context.Context, product_id, review_id int64) (*model.ProductReview, error) {
	review := model.ProductReview{}
	if _, err := r.DB.NamedExec("DELETE FROM product_review WHERE product_id=:product_id AND id=:review_id", map[string]interface{}{"product_id": product_id, "review_id": review_id}); err != nil {
		return nil, err
	}
	return &review, nil
}

func (r *pGReviewRepository) BulkDelete(ctx context.Context, product_id int64, ids []int) ([]model.ProductReview, error) {
	reviews := []model.ProductReview{}
	q, args, err := sqlx.In(`DELETE FROM public.product_review WHERE product_id = ? AND id IN (?)`, product_id, ids)
	if err != nil {
		return nil, err
	}
	if _, err := r.DB.Exec(r.DB.Rebind(q), args...); err != nil {
		return nil, err
	}

	return reviews, nil
}

// func (r *pGReviewRepository) ReviewList(ctx context.Context, productId int64, usereview_id uuid.UUID) ([]model.Review, error) {
// 	reviews := []model.Review{}
// 	query1 := `SELECT EXISTS (SELECT * FROM reviews where product_id = $1 and user_id = $2)`
// 	if err := r.DB.GetContext(ctx, &reviews, query1, productId, usereview_id); err != nil {
// 		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
// 			log.Printf("Could not create a reviews: Reason: %v\n", err.Code.Name())
// 			return nil, apperrors.NewConflict("reviews", "reviews")
// 		}
// 		log.Printf("Could not create a reviews : %v. Reason: %v\n", reviews, err)
// 		return nil, apperrors.NewInternal()
// 	}
// 	query2 :=
// 		`SELECT users.fullname as name, reviews.* FROM reviews
// 	join users
// 	on users.user_id = reviews.user_id
// 	WHERE product_id = $1`
// 	if err := r.DB.GetContext(ctx, &reviews, query2, productId); err != nil {
// 		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
// 			log.Printf("Could not create a reviews: Reason: %v\n", err.Code.Name())
// 			return nil, apperrors.NewConflict("reviews", "reviews")
// 		}
// 		log.Printf("Could not create a reviews : %v. Reason: %v\n", reviews, err)
// 		return nil, apperrors.NewInternal()
// 	}
// 	// reviewExist: reviewExist.rows[0].exists,
// 	// reviews: reviews.rows,
// 	return reviews, nil
// }

// func (r *pGReviewRepository) ReviewCreate(ctx context.Context, usereview_id uuid.UUID, review *model.Review) (*model.Review, error) {

// 	query := `INSERT INTO reviews(user_id, product_id, content, rating)
// 	VALUES($1, $2, $3, $4) returning *
//  `
// 	if err := r.DB.GetContext(ctx, &review, query); err != nil {
// 		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
// 			log.Printf("Could not create a review: Reason: %v\n", err.Code.Name())
// 			return nil, apperrors.NewConflict("reviews", "reviews")
// 		}
// 		log.Printf("Could not create a review : %v. Reason: %v\n", review, err)
// 		return nil, apperrors.NewInternal()
// 	}

// 	return review, nil
// }

// func (r *pGReviewRepository) ReviewUpdate(ctx context.Context, reviewId int64, review *model.Review) (*model.Review, error) {
// 	query :=
// 		`UPDATE reviews set content = $1, rating = $2 where id = $3 returning *`
// 	if err := r.DB.GetContext(ctx, review, query); err != nil {
// 		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
// 			log.Printf("Could not create a review: Reason: %v\n", err.Code.Name())
// 			return nil, apperrors.NewConflict("reviews", "reviews")
// 		}
// 		log.Printf("Could not create a review : %v. Reason: %v\n", review, err)
// 		return nil, apperrors.NewInternal()
// 	}
// 	return review, nil
// }

// func (r *pGReviewRepository) ReviewDelete(ctx context.Context, reviewId int64) (*model.Review, error) {
// 	review := model.Review{}
// 	query := `DELETE FROM reviews where review_id = $1 returning *`
// 	if err := r.DB.GetContext(ctx, &review, query, reviewId); err != nil {
// 		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
// 			log.Printf("Could not create a review: Reason: %v\n", err.Code.Name())
// 			return nil, apperrors.NewConflict("reviews", "reviews")
// 		}
// 		log.Printf("Could not create a review : %v. Reason: %v\n", review, err)
// 		return nil, apperrors.NewInternal()
// 	}
// 	return &review, nil
// }
