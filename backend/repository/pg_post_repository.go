package repository

import (
	"context"
	"log"

	"backend/model"
	"backend/model/apperrors"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	// "github.com/lib/pq"
)

// PGPostRepository is data/repository implementation
// of service layer PostRepository
type pGPostRepository struct {
	DB *sqlx.DB
}

// NewPostRepository is a factory for initializing Post Repositories
func NewPostRepository(db *sqlx.DB) model.PostRepository {
	return &pGPostRepository{
		DB: db,
	}
}

// Create reaches out to database SQLX api
func (r *pGPostRepository) Create(ctx context.Context, input *model.CreatePostInput) (*model.Post, error) {
	var err error
	post := &model.Post{
		UserID:      input.UserID,
		Title:       input.Title,
		Description: input.Description,
	}
	query := "INSERT INTO posts (user_id, title, description) VALUES (?, ?, ?, ?, ?)"
	_, err = r.DB.ExecContext(
		ctx, query, post.UserID, post.Title, post.Description,
	)
	if err != nil {
		return nil, err
	}
	return post, nil
}

// FindByID fetches post by id
func (r *pGPostRepository) FindByID(ctx context.Context, postId uuid.UUID) (*model.Post, error) {
	post := &model.Post{}
	query := "SELECT * FROM posts WHERE id = ? LIMIT 1"
	// we need to actually check errors as it could be something other than not found
	if err := r.DB.GetContext(ctx, r.DB, query, postId); err != nil {
		return nil, apperrors.NewNotFound("id", postId.String())
	}

	return post, nil
}

// Update updates a post's properties
func (r *pGPostRepository) Update(ctx context.Context, postId uuid.UUID, input *model.UpdatePostInput) (*model.Post, error) {
	query := `
	UPDATE posts SET title = ?, description = ?
	WHERE id = ?
	`
	_, err := r.DB.ExecContext(ctx, query, input.Title, input.Description, postId)

	if err != nil {
		log.Printf("Unable to prepare post update query: %v\n", err)
		return nil,apperrors.NewInternal()
	}
	if err != nil {
		return nil, err
	}
	return r.FindByID(ctx, postId)
}

// List はリポジトリから全ユーザーのPostを検索する
func (r *pGPostRepository) List(ctx context.Context, limit, offset int) ([]*model.Post, error) {
	posts := make([]*model.Post, 0, limit)
	query := `
	SELECT id, user_id, path, title, description FROM posts
	ORDER BY created_at DESC LIMIT ? OFFSET ?
`
	err := sqlx.SelectContext(ctx, r.DB, &posts, query, limit, offset)
	if err != nil {
		return nil, err
	}
	return posts, nil
}

// ListByUserID はリポジトリからユーザーのPostを検索する
func (r *pGPostRepository) ListByProductID(ctx context.Context, userID uuid.UUID, limit, offset int) ([]*model.Post, error) {
	posts := make([]*model.Post, 0, limit)
	query := `
	SELECT id, user_id, path, title, description FROM posts
		WHERE user_id = ?
		ORDER BY title DESC LIMIT ? OFFSET ?
`
	err := sqlx.SelectContext(ctx, r.DB, &posts, query, userID, limit, offset)
	if err != nil {
		return nil, err
	}
	return posts, nil
}
