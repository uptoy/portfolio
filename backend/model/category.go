package model

type Category struct {
	ID          int    `json:"categoryId"`
	Name        string `json:"name"`
	Description string `json:"description"`
}
