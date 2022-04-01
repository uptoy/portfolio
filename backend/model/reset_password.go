package model

// import (
// 	"html"
// 	"strings"
// )

type ResetPassword struct {
	ID          int64  `db:"id" json:"id"`
	Email       string `db:"email" json:"email"`
	NewPassword string `db:"new_password" json:"new_password"`
	Token       string `db:"email" json:"token"`
}
