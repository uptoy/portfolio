package model

type PasswordReset struct {
	ID    int   `db:"id" json:"id"`
	Email string `db:"email" json:"email"`
	Token string `db:"token" json:"token"`
}
