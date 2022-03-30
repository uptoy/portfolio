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

type ImageRepository interface {
	DeleteProfile(ctx context.Context, objName string) error
	UpdateProfile(ctx context.Context, objName string, imageFile multipart.File) (string, error)
}
type ProductService interface {
	ProductList(ctx context.Context) ([]Product, error)
	ProductCreate(ctx context.Context, p *Product) (*Product, error)
	ProductFindByID(ctx context.Context, id int64) (*Product, error)
	ProductUpdate(ctx context.Context, id int64, p *Product) (*Product, error)
	ProductDelete(ctx context.Context, id int64) (*Product, error)
	ProductFindByName(ctx context.Context, name string) (*Product, error)
}
type ProductRepository interface {
	ProductList(ctx context.Context) ([]Product, error)
	ProductCreate(ctx context.Context, p *Product) (*Product, error)
	ProductFindByID(ctx context.Context, id int64) (*Product, error)
	ProductUpdate(ctx context.Context, id int64, p *Product) (*Product, error)
	ProductDelete(ctx context.Context, id int64) (*Product, error)
	ProductFindByName(ctx context.Context, name string) (*Product, error)
}

type CategoryService interface {
	CategoryList(ctx context.Context) ([]Category, error)
	CategoryCreate(ctx context.Context, c *Category) (*Category, error)
	CategoryFindByID(ctx context.Context, id int64) (*Category, error)
	CategoryUpdate(ctx context.Context, id int64, c *Category) (*Category, error)
	CategoryDelete(ctx context.Context, id int64) (*Category, error)
	CategoryFindByName(ctx context.Context, name string) (*Category, error)
}
type CategoryRepository interface {
	CategoryList(ctx context.Context) ([]Category, error)
	CategoryCreate(ctx context.Context, c *Category) (*Category, error)
	CategoryFindByID(ctx context.Context, id int64) (*Category, error)
	CategoryUpdate(ctx context.Context, id int64, c *Category) (*Category, error)
	CategoryDelete(ctx context.Context, id int64) (*Category, error)
	CategoryFindByName(ctx context.Context, name string) (*Category, error)
}

type CartService interface {
	CartGet(ctx context.Context, userID uuid.UUID) ([]CartItem, error)
	CartAddItem(ctx context.Context, cartId int64, productId int64, quantity int64) ([]CartItem, error)
	CartDeleteItem(ctx context.Context, cartId int64, productId int64) ([]CartItem, error)
	CartIncrementItem(ctx context.Context, cartId int64, productId int64) ([]CartItem, error)
	CartDecrementItem(ctx context.Context, cartId int64, productId int64) ([]CartItem, error)
}
type CartRepository interface {
	CartGet(ctx context.Context, userID uuid.UUID) ([]CartItem, error)
	CartAddItem(ctx context.Context, cartId int64, productId int64, quantity int64) ([]CartItem, error)
	CartDeleteItem(ctx context.Context, cartId int64, productId int64) ([]CartItem, error)
	CartIncrementItem(ctx context.Context, cartId int64, productId int64) ([]CartItem, error)
	CartDecrementItem(ctx context.Context, cartId int64, productId int64) ([]CartItem, error)
}

type OrderService interface {
	OrderList(ctx context.Context, userID uuid.UUID) ([]Order, error)
	OrderCreate(ctx context.Context, order *Order) (*Order, error)
	OrderFindByID(ctx context.Context, orderId int64) (*Order, error)
}
type OrderRepository interface {
	OrderList(ctx context.Context, userID uuid.UUID) ([]Order, error)
	OrderCreate(ctx context.Context, order *Order) (*Order, error)
	OrderFindByID(ctx context.Context, orderId int64) (*Order, error)
}

type ReviewService interface {
	ReviewList(ctx context.Context, productId int64, userId uuid.UUID) ([]Review, error)
	ReviewCreate(ctx context.Context, userId uuid.UUID, review *Review) (*Review, error)
	ReviewUpdate(ctx context.Context, reviewId int64, review *Review) (*Review, error)
	ReviewDelete(ctx context.Context, reviewId int64) (*Review, error)
}
type ReviewRepository interface {
	ReviewList(ctx context.Context, productId int64, userId uuid.UUID) ([]Review, error)
	ReviewCreate(ctx context.Context, userId uuid.UUID, review *Review) (*Review, error)
	ReviewUpdate(ctx context.Context, reviewId int64, review *Review) (*Review, error)
	ReviewDelete(ctx context.Context, reviewId int64) (*Review, error)
}

type PaymentService interface {
	Payment(amount int64, email string) error
}

type WishlistService interface {
	WishlistGet(ctx context.Context, userId uuid.UUID) ([]Product, error)
	WishlistCreate(ctx context.Context, userId uuid.UUID, productId int64) ([]Product, error)
	WishlistDelete(ctx context.Context, userId uuid.UUID, productId int64) ([]Product, error)
	WishlistClear(ctx context.Context, userId uuid.UUID) error
}

type WishlistRepository interface {
	WishlistGet(ctx context.Context, userId uuid.UUID) ([]Product, error)
	WishlistCreate(ctx context.Context, userId uuid.UUID, productId int64) ([]Product, error)
	WishlistDelete(ctx context.Context, userId uuid.UUID, productId int64) ([]Product, error)
	WishlistClear(ctx context.Context, userId uuid.UUID) error
}
