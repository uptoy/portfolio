package model

import (
	"github.com/google/uuid"
)


// User defines domain model and its json and db representations
type Post struct {
	ID          uuid.UUID `db:"id"`
	UserID      uuid.UUID `db:"user_id"`
	Title       string    `db:"title"`
	Description string    `db:"description"`
}

type CreatePostInput struct {
	UserID      uuid.UUID
	Title       string
	Description string
}

type UpdatePostInput struct {
	Title       string
	Description string
}
