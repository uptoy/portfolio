package repository

import (
	"context"
	"log"

	"backend/model"
	"backend/model/apperrors"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/lib/pq"
)

// PGUserRepository is data/repository implementation
// of service layer UserRepository
type pGUserRepository struct {
	DB *sqlx.DB
}

// NewUserRepository is a factory for initializing User Repositories
func NewUserRepository(db *sqlx.DB) model.UserRepository {
	return &pGUserRepository{
		DB: db,
	}
}

// Create reaches out to database SQLX api
func (r *pGUserRepository) Create(ctx context.Context, u *model.User) error {
	query := "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *"

	if err := r.DB.GetContext(ctx, u, query, u.Email, u.Password); err != nil {
		// check unique constraint
		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
			log.Printf("Could not create a user with email: %v. Reason: %v\n", u.Email, err.Code.Name())
			return apperrors.NewConflict("email", u.Email)
		}

		log.Printf("Could not create a user with email: %v. Reason: %v\n", u.Email, err)
		return apperrors.NewInternal()
	}
	return nil
}

// FindByID fetches user by id
func (r *pGUserRepository) FindByID(ctx context.Context, uid uuid.UUID) (*model.User, error) {
	user := &model.User{}

	query := "SELECT * FROM users WHERE uid=$1"

	// we need to actually check errors as it could be something other than not found
	if err := r.DB.GetContext(ctx, user, query, uid); err != nil {
		return user, apperrors.NewNotFound("uid", uid.String())
	}

	return user, nil
}

// FindByEmail retrieves user row by email address
func (r *pGUserRepository) FindByEmail(ctx context.Context, email string) (*model.User, error) {
	user := &model.User{}

	query := "SELECT * FROM users WHERE email=$1"

	if err := r.DB.GetContext(ctx, user, query, email); err != nil {
		log.Printf("Unable to get user with email address: %v. Err: %v\n", email, err)
		return user, apperrors.NewNotFound("email", email)
	}

	return user, nil
}

// Update updates a user's properties
func (r *pGUserRepository) Update(ctx context.Context, u *model.User) error {
	query := `
		UPDATE users
		SET name=:name, email=:email, website=:website
		WHERE uid=:uid
		RETURNING *;
	`

	nstmt, err := r.DB.PrepareNamedContext(ctx, query)

	if err != nil {
		log.Printf("Unable to prepare user update query: %v\n", err)
		return apperrors.NewInternal()
	}

	if err := nstmt.GetContext(ctx, u, u); err != nil {
		log.Printf("Failed to update details for user: %v\n", u)
		return apperrors.NewInternal()
	}

	return nil
}

// UpdateImage is used to separately update a user's image separate from
// other api details
func (r *pGUserRepository) UpdateImage(ctx context.Context, uid uuid.UUID, imageURL string) (*model.User, error) {
	query := `
		UPDATE users
		SET image_url=$2
		WHERE uid=$1
		RETURNING *;
	`

	// must be instantiated to scan into ref using `GetContext`
	u := &model.User{}

	err := r.DB.GetContext(ctx, u, query, uid, imageURL)

	if err != nil {
		log.Printf("Error updating image_url in database: %v\n", err)
		return nil, apperrors.NewInternal()
	}

	return u, nil
}

func (r *pGUserRepository) PasswordForgot(ctx context.Context, reset *model.PasswordReset) error {
	query := "INSERT INTO resets (email, token) VALUES ($1, $2) RETURNING *"
	// must be instantiated to scan into ref using `GetContext`
	u := &model.User{}
	err := r.DB.GetContext(ctx, u, query, reset.Email, reset.Token)
	if err != nil {
		log.Printf("Error forgot password: %v\n", err)
		return apperrors.NewInternal()
	}
	return nil
}

func (r *pGUserRepository) PasswordReset(ctx context.Context, token string, reset *model.PasswordReset)error {
	query := "SELECT * FROM resets WHERE token=$1"
	passwordReset := &model.PasswordReset{}
	err := r.DB.GetContext(ctx, query, token)
	if err != nil {
		log.Printf("Error forgot password: %v\n", err)
		return apperrors.NewInternal()
	}
	query2 := `
	UPDATE users
	SET =$2
	WHERE email=$1
	RETURNING *;
`
	err2 := r.DB.GetContext(ctx, query2, reset.Email, passwordReset)
	if err != nil {
		log.Printf("Error forgot password: %v\n", err2)
		return apperrors.NewInternal()
	}
	return err2
}
