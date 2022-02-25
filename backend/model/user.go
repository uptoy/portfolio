package model

import (
	"github.com/google/uuid"
	"time"
)

// User defines domain model and its json and db representations
type User struct {
	UID            uuid.UUID `db:"uid" json:"uid"`
	Email          string    `db:"email" json:"email"`
	Password       string    `db:"password" json:"-"`
	Name           string    `db:"name" json:"name"`
	IsAdmin        bool
	ImageURL       string    `db:"image_url" json:"imageUrl"`
	Website        string    `db:"website" json:"website"`
	Token          string    `db:"token" json:"token"`
	RefreshToken   string    `db:"refresh_token" json:"refresh_token"`
	Created_At     time.Time `db:"created_at" json:"created_at"`
	Updated_At     time.Time `db:"updated_at" json:"updated_at"`
	Cart_ID        int       `db:"cartId" json:"cartId"`
	AddreddDetails []Address `db:"address" json:"address"`
	Order_Status   []Order   `db:"orders" json:"orders"`
}

type PasswordReset struct {
	Id    uint
	Email string
	Token string
}
