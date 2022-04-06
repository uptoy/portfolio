package model

import (
	"context"
	"time"

	"github.com/google/uuid"
)

// UserService defines methods the handler layer expects
// any service it interacts with to implement
type UserService interface {
	Get(ctx context.Context, uid uuid.UUID) (*User, error)
	Signup(ctx context.Context, u *User) error
	Signin(ctx context.Context, u *User) error
	UpdateDetails(ctx context.Context, u *User) error
	Delete(ctx context.Context, email string)  (*User, error)
}

// TokenService defines methods the handler layer expects to interact
// with in regards to producing JWTs as string
type TokenService interface {
	NewPairFromUser(ctx context.Context, u *User, prevTokenID string) (*TokenPair, error)
	Signout(ctx context.Context, uid uuid.UUID) error
	ValidateIDToken(tokenString string) (*User, error)
	ValidateRefreshToken(refreshTokenString string) (*RefreshToken, error)
	ForgotPasswordToken(ctx context.Context, email string, prevTokenID string) (string, error)
}

// UserRepository defines methods the service layer expects
// any repository it interacts with to implement
type UserRepository interface {
	FindByID(ctx context.Context, uid uuid.UUID) (*User, error)
	FindByEmail(ctx context.Context, email string) (*User, error)
	Create(ctx context.Context, u *User) error
	Update(ctx context.Context, u *User) error
	Delete(ctx context.Context, email string)  (*User, error)

}

// TokenService defines methods the handler layer expects to interact
// with in regards to producing JWTs as string

// TokenRepository defines methods it expects a repository
// it interacts with to implement
type TokenRepository interface {
	SetRefreshToken(ctx context.Context, userID string, tokenID string, expiresIn time.Duration) error
	DeleteRefreshToken(ctx context.Context, userID string, prevTokenID string) error
	DeleteUserRefreshTokens(ctx context.Context, userID string) error
}

type AuthService interface {
	ForgotPassword(ctx context.Context, passwordReset *PasswordReset) error
	ResetPassword(ctx context.Context, newPassword string, passwordReset *PasswordReset) error
}

type AuthRepository interface {
	ForgotPassword(ctx context.Context, passwordReset *PasswordReset) error
	ResetPassword(ctx context.Context, newPassword string, passwordReset *PasswordReset) error
}

type ProductService interface {
	ProductList(ctx context.Context) ([]Product, error)
	ProductCreate(ctx context.Context, product *Product) (*Product, error)
	ProductFindByID(ctx context.Context, productId int64) (*Product, error)
	ProductUpdate(ctx context.Context, productId int64, product *Product) (*Product, error)
	ProductDelete(ctx context.Context, productId int64) (*Product, error)
	ProductFindByName(ctx context.Context, productName string) (*Product, error)
	BulkDelete(ctx context.Context) ([]Product, error)
	BulkInsert(ctx context.Context, products []Product) ([]Product, error)
}

type ProductRepository interface {
	ProductList(ctx context.Context) ([]Product, error)
	ProductCreate(ctx context.Context, product *Product) (*Product, error)
	ProductFindByID(ctx context.Context, productId int64) (*Product, error)
	ProductFindByName(ctx context.Context, productName string) (*Product, error)
	ProductUpdate(ctx context.Context, productId int64, product *Product) (*Product, error)
	ProductDelete(ctx context.Context, productId int64) (*Product, error)
	BulkDelete(ctx context.Context) ([]Product, error)
	BulkInsert(ctx context.Context, products []Product) ([]Product, error)
}

type CategoryService interface {
	CategoryList(ctx context.Context) ([]Category, error)
	CategoryCreate(ctx context.Context, c *Category) (*Category, error)
	CategoryFindByID(ctx context.Context, id int64) (*Category, error)
	CategoryUpdate(ctx context.Context, id int64, c *Category) (*Category, error)
	CategoryDelete(ctx context.Context, id int64) (*Category, error)
	CategoryFindByName(ctx context.Context, name string) (*Category, error)
	BulkDelete(ctx context.Context) ([]Category, error)
	BulkInsert(ctx context.Context, categories []Category) ([]Category, error)
}
type CategoryRepository interface {
	CategoryList(ctx context.Context) ([]Category, error)
	CategoryCreate(ctx context.Context, c *Category) (*Category, error)
	CategoryFindByID(ctx context.Context, id int64) (*Category, error)
	CategoryUpdate(ctx context.Context, id int64, c *Category) (*Category, error)
	CategoryDelete(ctx context.Context, id int64) (*Category, error)
	CategoryFindByName(ctx context.Context, name string) (*Category, error)
	BulkDelete(ctx context.Context) ([]Category, error)
	BulkInsert(ctx context.Context, categories []Category) ([]Category, error)
}
