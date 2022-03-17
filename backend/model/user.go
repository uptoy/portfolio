package model

import (
	"github.com/google/uuid"
	"time"
)

// User defines domain model and its json and db representations
type User struct {
	UserId     uuid.UUID `db:"user_id" json:"user_id"`
	Name       string    `db:"name" json:"name"`
	Email      string    `db:"email" json:"email"`
	Password   string    `db:"password" json:"-"`
	ProfileUrl string    `db:"profile_url" json:"profile_url"`
	CreatedAt  time.Time `db:"created_at" json:"created_at"`
	UpdatedAt  time.Time `db:"updated_at" json:"updated_at"`
}
