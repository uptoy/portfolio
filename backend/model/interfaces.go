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
	PasswordReset(ctx context.Context, token string, reset *PasswordReset) error
	PasswordForgot(ctx context.Context, reset *PasswordReset) error
	PasswordUpdate(ctx context.Context, u *User) error
}

// TokenService defines methods the handler layer expects to interact
// with in regards to producing JWTs as string
type TokenService interface {
	NewPairFromUser(ctx context.Context, u *User, prevTokenID string) (*TokenPair, error)
	Signout(ctx context.Context, uid uuid.UUID) error
	ValidateIDToken(tokenString string) (*User, error)
	ValidateRefreshToken(refreshTokenString string) (*RefreshToken, error)
}

type ProductService interface {
	Create(ctx context.Context, input *Product) (*Product, error)
	FindByID(ctx context.Context, uid uuid.UUID) (*Product, error)
	List(ctx context.Context, limit, offset int) ([]*Product, error)
	Update(ctx context.Context, uid uuid.UUID, input *Product) (*Product, error)
	Delete(ctx context.Context, uid uuid.UUID) error
}

type CartService interface {
	// RemoveCartItem(ctx context.Context, input *Product) (*Product, error)
	AddCartItem(ctx context.Context, uid uuid.UUID, product *Product) error
	// GetCartItem(ctx context.Context, uid uuid.UUID) ([]*Cart, error)
	// UpdateCartItem(ctx context.Context, uid uuid.UUID, input *Product) (*Product, error)
}

// UserRepository defines methods the service layer expects
// any repository it interacts with to implement
type UserRepository interface {
	Create(ctx context.Context, u *User) error
	FindByEmail(ctx context.Context, email string) (*User, error)
	FindByID(ctx context.Context, uid uuid.UUID) (*User, error)
	Update(ctx context.Context, u *User) error
	UpdateImage(ctx context.Context, uid uuid.UUID, imageURL string) (*User, error)
	PasswordForgot(ctx context.Context, reset *PasswordReset) error
	PasswordReset(ctx context.Context, token string, reset *PasswordReset) error
}

// PostRepository defines methods the service layer expects
// any repository it interacts with to implement
type PostRepository interface {
	Create(ctx context.Context, input *CreatePostInput) (*Post, error)
	FindByID(ctx context.Context, uid uuid.UUID) (*Post, error)
	List(ctx context.Context, limit, offset int) ([]*Post, error)
	Update(ctx context.Context, uid uuid.UUID, input *UpdatePostInput) (*Post, error)
	// Delete(ctx context.Context, uid uuid.UUID) (*Post, error)
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

// PostRepository defines methods the service layer expects
// any repository it interacts with to implement
type ProductRepository interface {
	Create(ctx context.Context, input *Product) (*Product, error)
	FindByID(ctx context.Context, uid uuid.UUID) (*Product, error)
	List(ctx context.Context, limit, offset int) ([]*Product, error)
	Update(ctx context.Context, uid uuid.UUID, input *Product) (*Product, error)
	Delete(ctx context.Context, uid uuid.UUID) error
}

type CartRepository interface {
	RemoveCartItem(ctx context.Context, input *Product)(*Cart, error)
	AddCartItem(ctx context.Context, uid uuid.UUID, product *Product) (*Cart, error)
	GetCartItem(ctx context.Context, uid uuid.UUID) (*Cart, error)
	UpdateCartItem(ctx context.Context, uid uuid.UUID, input *Product) (*Cart, error)
}
