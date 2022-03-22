package model

import (
	"context"
	"time"

	"github.com/google/uuid"
	"mime/multipart"
)

// UserService defines methods the handler layer expects
// any service it interacts with to implement
type UserService interface {
	ClearProfileImage(ctx context.Context, uid uuid.UUID) error
	Get(ctx context.Context, uid uuid.UUID) (*User, error)
	Signup(ctx context.Context, u *User) error
	Signin(ctx context.Context, u *User) error
	UpdateDetails(ctx context.Context, u *User) error
	SetProfileImage(ctx context.Context, uid uuid.UUID, imageFileHeader *multipart.FileHeader) (*User, error)
}

// UserRepository defines methods the service layer expects
// any repository it interacts with to implement
type UserRepository interface {
	Create(ctx context.Context, u *User) error
	FindByEmail(ctx context.Context, email string) (*User, error)
	FindByID(ctx context.Context, uid uuid.UUID) (*User, error)
	Update(ctx context.Context, u *User) error
	UpdateImage(ctx context.Context, uid uuid.UUID, imageURL string) (*User, error)
}

// TokenService defines methods the handler layer expects to interact
// with in regards to producing JWTs as string
type TokenService interface {
	NewPairFromUser(ctx context.Context, u *User, prevTokenID string) (*TokenPair, error)
	Signout(ctx context.Context, uid uuid.UUID) error
	ValidateIDToken(tokenString string) (*User, error)
	ValidateRefreshToken(refreshTokenString string) (*RefreshToken, error)
}

// TokenRepository defines methods it expects a repository
// it interacts with to implement
type TokenRepository interface {
	SetRefreshToken(ctx context.Context, userID string, tokenID string, expiresIn time.Duration) error
	DeleteRefreshToken(ctx context.Context, userID string, prevTokenID string) error
	DeleteUserRefreshTokens(ctx context.Context, userID string) error
}

// ImageRepository defines methods it expects a repository
// it interacts with to implement
type ImageRepository interface {
	DeleteProfile(ctx context.Context, objName string) error
	UpdateProfile(ctx context.Context, objName string, imageFile multipart.File) (string, error)
}

type ProductService interface {
	ProductCreate(ctx context.Context, product *Product) (*Product, error)
	ProductList(ctx context.Context) ([]*Product, error)
	ProductFindByID(ctx context.Context, productId int64) (*Product, error)
	// ProductSearch
	ProductFindByName(ctx context.Context, productName string) (*Product, error)
	ProductUpdate(ctx context.Context, productId int64, product *Product) (*Product, error)
	ProductDelete(ctx context.Context, productId int64) (*Product, error)
}

// TokenRepository defines methods it expects a repository
// it interacts with to implement
type ProductRepository interface {
	ProductCreate(ctx context.Context, product *Product) (*Product, error)
	ProductList(ctx context.Context) ([]*Product, error)
	ProductFindByID(ctx context.Context, productId int64) (*Product, error)
	// ProductSearch
	ProductFindByName(ctx context.Context, productName string) (*Product, error)
	ProductUpdate(ctx context.Context, productId int64, product *Product) (*Product, error)
	ProductDelete(ctx context.Context, productId int64) (*Product, error)
}
