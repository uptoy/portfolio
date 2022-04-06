package model

import (
	"github.com/google/uuid"
	"log"
	"time"
)

// User defines domain model and its json and db representations
type User struct {
	UID        uuid.UUID `db:"uid" json:"uid"`
	Name       string    `db:"name" json:"name"`
	Email      string    `db:"email" json:"email"`
	Password   string    `db:"password" json:"-"`
	ProfileUrl string    `db:"profile_url" json:"profile_url"`
	CreatedAt  time.Time `db:"created_at" json:"created_at"`
	UpdatedAt  time.Time `db:"updated_at" json:"updated_at"`
}

func (u *User) PreSave() {
	u.CreatedAt = time.Now()
	u.UpdatedAt = time.Now()
}

func (u *User) PreUpdate() {
	u.UpdatedAt = time.Now()
}

func (u *User) Validate() error {
	var err error

	if u.Name == "" {
		log.Fatal(err, "Name is nothing")
	}
	if u.Email == "" {
		log.Fatal(err, "Email is nothing")
	}
	if u.Password == "" {
		log.Fatal(err, "Password is nothing")
	}
	if u.ProfileUrl == "" {
		log.Fatal(err, "ProfileUrl is nothing")
	}
	if u.CreatedAt.IsZero() {
		log.Fatal(err, "CreatedAt is zero")
	}
	if u.UpdatedAt.IsZero() {
		log.Fatal(err, "CreatedAt is zero")
	}
	return nil
}
