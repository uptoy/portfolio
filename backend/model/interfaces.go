package model

import (
	"context"
	// "io"
	// "mime/multipart"
	"mime/multipart"
	"time"

	"github.com/google/uuid"
)

type AddressRepository interface {
	AddressCreate(ctx context.Context, userId uuid.UUID, address *Address) (*Address, error)
	AddressList(ctx context.Context, userId uuid.UUID) ([]*Address, error)
	AddressGet(ctx context.Context, userId uuid.UUID, addressId int64) (*Address, error)
	AddressUpdate(ctx context.Context, addressId int64, address *Address) (*Address, error)
	AddressDelete(ctx context.Context, addressId int64) error
}
type AddressService interface {
	AddressCreate(ctx context.Context, userId uuid.UUID, address *Address) (*Address, error)
	AddressList(ctx context.Context, userId uuid.UUID) ([]*Address, error)
	AddressGet(ctx context.Context, userId uuid.UUID, addressId int64) (*Address, error)
	AddressUpdate(ctx context.Context, addressId int64, address *Address) (*Address, error)
	AddressDelete(ctx context.Context, addressId int64) error
}

type AuthRepository interface {
	ForgotPassword(ctx context.Context, passwordReset *PasswordReset) error
	ResetPassword(ctx context.Context, newPassword string, passwordReset *PasswordReset) error
}
type AuthService interface {
	ForgotPassword(ctx context.Context, passwordReset *PasswordReset) error
	ResetPassword(ctx context.Context, newPassword string, passwordReset *PasswordReset) error
}
type CartRepository interface {
	CartCreate(ctx context.Context, userID uuid.UUID) (*Cart, error)
	CartGet(ctx context.Context, cartID int64) ([]*CartItem, error)
	CartAddItem(ctx context.Context, cartItem *CartItem) (*CartItem, error)
	CartDeleteItem(ctx context.Context, cartId int64, productId int64) (*CartItem, error)
	CartIncrementItem(ctx context.Context, cartId int64, productId int64) (*CartItem, error)
	CartDecrementItem(ctx context.Context, cartId int64, productId int64) (*CartItem, error)
	CartGetId(ctx context.Context, userId uuid.UUID) (int64, error)
}
type CartService interface {
	CartCreate(ctx context.Context, userID uuid.UUID) (*Cart, error)
	CartGet(ctx context.Context, cartID int64) ([]*CartItem, error)
	CartAddItem(ctx context.Context, cartItem *CartItem) (*CartItem, error)
	CartDeleteItem(ctx context.Context, cartId int64, productId int64) (*CartItem, error)
	CartIncrementItem(ctx context.Context, cartId int64, productId int64) (*CartItem, error)
	CartDecrementItem(ctx context.Context, cartId int64, productId int64) (*CartItem, error)
	CartGetId(ctx context.Context, userId uuid.UUID) (int64, error)
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
	CategoryCount(ctx context.Context) (int, error)
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
	CategoryCount(ctx context.Context) (int, error)
}

type MediaService interface {
	FileUpload(file *multipart.FileHeader) (string, error)
	RemoteUpload(url Url) (string, error)
}

type OrderRepository interface {
	OrderList(ctx context.Context, userID uuid.UUID) ([]Order, error)
	OrderCreate(ctx context.Context, order *Order) (*Order, error)
	OrderFindByID(ctx context.Context, orderId int64) (*Order, error)
	OrderCount(ctx context.Context) (int, error)
	OrderDetailsBulkInsert(ctx context.Context, items []*OrderDetail) error
	OrderGetDetails(ctx context.Context, orderID int64) ([]*OrderInfo, error)
}
type OrderService interface {
	OrderList(ctx context.Context, userID uuid.UUID) ([]Order, error)
	OrderCreate(ctx context.Context, userID uuid.UUID, data *OrderRequestData) (*Order, error)
	OrderFindByID(ctx context.Context, orderId int64) (*Order, error)
	OrderGetDetails(ctx context.Context, orderId int64) ([]*OrderInfo, error)
	OrderCount(ctx context.Context) (int, error)
	OrderDetailsBulkInsert(ctx context.Context, items []*OrderDetail) error
}

type PaymentRepository interface {
	Payment(ctx context.Context, amount int64, email string) error
}
type PaymentService interface {
	Payment(ctx context.Context, amount int64, email string) error
}

type ProductImageRepository interface {
	BulkInsert(ctx context.Context, images []*ProductImage) error
	Save(ctx context.Context, productId int64, image *ProductImage) (*ProductImage, error)
	Get(ctx context.Context, productId, id int64) (*ProductImage, error)
	GetAll(ctx context.Context, productId int64) ([]*ProductImage, error)
	Update(ctx context.Context, productId int64, images []*ProductImage) error
	// BulkInsertUpdate(ctx context.Context, images []*ProductImage) error
	Delete(ctx context.Context, productId, id int64) error
	BulkDelete(ctx context.Context, pid int64, ids []int) error
	// FileUpload(file File) (string, error)
	// RemoteUpload(url Url) (string, error)
}

// type ProductImageService interface {
// 	UploadImage(data io.Reader, filename string)
// }

type ProductRepository interface {
	ProductList(ctx context.Context) ([]*Product, error)
	ProductCreate(ctx context.Context, p *Product) (*Product, error)
	ProductFindByID(ctx context.Context, id int64) (*Product, error)
	ProductUpdate(ctx context.Context, id int64, p *Product) (*Product, error)
	ProductDelete(ctx context.Context, id int64) (*Product, error)
	ProductFindByName(ctx context.Context, name string) (*Product, error)
	BulkDelete(ctx context.Context) ([]Product, error)
	BulkInsert(ctx context.Context, products []Product) ([]Product, error)
	// ProductFindByIDJoin(ctx context.Context, productId int64) (*Product, error)
	ProductCount(ctx context.Context) (int, error)
	ProductListByIDS(ctx context.Context, ids []int64) ([]*Product, error)
}
type ProductService interface {
	ProductList(ctx context.Context) ([]*Product, error)
	ProductCreate(ctx context.Context, p *Product, files []*multipart.FileHeader) (*Product, error)
	ProductFindByID(ctx context.Context, id int64) (*Product, error)
	ProductUpdate(ctx context.Context, id int64, p *Product, files []*multipart.FileHeader) (*Product, error)
	ProductDelete(ctx context.Context, id int64) (*Product, error)
	ProductFindByName(ctx context.Context, name string) (*Product, error)
	BulkDelete(ctx context.Context) ([]Product, error)
	BulkInsert(ctx context.Context, products []Product) ([]Product, error)
	// ProductFindByIDJoin(ctx context.Context, productId int64) (*Product, error)
	ProductCount(ctx context.Context) (int, error)
	ProductListByIDS(ctx context.Context, ids []int64) ([]*Product, error)
	ImageBulkInsert(ctx context.Context, images []*ProductImage) error
}

type ReviewService interface {
	ReviewBulkInsert(ctx context.Context, reviews []ProductReview) ([]ProductReview, error)
	ReviewCreate(ctx context.Context, product_id int64, review *ProductReview) (*ProductReview, error)
	Get(ctx context.Context, product_id, review_id int64) (*ProductReview, error)
	GetAll(ctx context.Context, product_id int64) ([]*ProductReview, error)
	Update(ctx context.Context, product_id, review_id int64, review *ProductReview) (*ProductReview, error)
	Delete(ctx context.Context, product_id, review_id int64) (*ProductReview, error)
	BulkDelete(ctx context.Context, product_id int64, ids []int) ([]ProductReview, error)
	Count(ctx context.Context, productId int64) (int, error)
	// ReviewList(ctx context.Context, productId int64, userId uuid.UUID) ([]Review, error)
	// ReviewCreate(ctx context.Context, userId uuid.UUID, review *Review) (*Review, error)
	// ReviewUpdate(ctx context.Context, reviewId int64, review *Review) (*Review, error)
	// ReviewDelete(ctx context.Context, reviewId int64) (*Review, error)
}
type ReviewRepository interface {
	ReviewBulkInsert(ctx context.Context, reviews []ProductReview) ([]ProductReview, error)
	ReviewCreate(ctx context.Context, product_id int64, review *ProductReview) (*ProductReview, error)
	Get(ctx context.Context, product_id, review_id int64) (*ProductReview, error)
	GetAll(ctx context.Context, product_id int64) ([]*ProductReview, error)
	Update(ctx context.Context, product_id, review_id int64, review *ProductReview) (*ProductReview, error)
	Delete(ctx context.Context, product_id, review_id int64) (*ProductReview, error)
	BulkDelete(ctx context.Context, product_id int64, ids []int) ([]ProductReview, error)
	Count(ctx context.Context, productId int64) (int, error)
	// ReviewList(ctx context.Context, productId int64, userId uuid.UUID) ([]Review, error)
	// ReviewCreate(ctx context.Context, userId uuid.UUID, review *Review) (*Review, error)
	// ReviewUpdate(ctx context.Context, reviewId int64, review *Review) (*Review, error)
	// ReviewDelete(ctx context.Context, reviewId int64) (*Review, error)
}

// TokenRepository defines methods it expects a repository
// it interacts with to implement
type TokenRepository interface {
	SetRefreshToken(ctx context.Context, userID string, tokenID string, expiresIn time.Duration) error
	DeleteRefreshToken(ctx context.Context, userID string, prevTokenID string) error
	DeleteUserRefreshTokens(ctx context.Context, userID string) error
}

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
	GetList(ctx context.Context) ([]*User, error)
	FindByID(ctx context.Context, uid uuid.UUID) (*User, error)
	FindByEmail(ctx context.Context, email string) (*User, error)
	Create(ctx context.Context, u *User) (*User, error)
	Update(ctx context.Context, u *User) error
	Count(ctx context.Context) (int, error)
}

// UserService defines methods the handler layer expects
// any service it interacts with to implement
type UserService interface {
	Get(ctx context.Context, uid uuid.UUID) (*User, error)
	GetList(ctx context.Context) ([]*User, error)
	Signup(ctx context.Context, u *User) (*User, error)
	Signin(ctx context.Context, u *User) (*User, error)
	UpdateDetails(ctx context.Context, u *User) error
	Count(ctx context.Context) (int, error)
	FindByEmail(ctx context.Context, email string) (*User, error)
}

type WishlistService interface {
	WishlistGet(ctx context.Context, userId uuid.UUID) ([]*Product, error)
	WishlistCreate(ctx context.Context, userId uuid.UUID, productId int64) ([]*Product, error)
	WishlistDelete(ctx context.Context, userId uuid.UUID, productId int64) ([]*Product, error)
	// WishlistAddItem(ctx context.Context, userId uuid.UUID, productId int64) ([]*Product, error)
	// WishlistClear(ctx context.Context, userId uuid.UUID) error
}

type WishlistRepository interface {
	WishlistGet(ctx context.Context, userId uuid.UUID) ([]*Product, error)
	WishlistCreate(ctx context.Context, userId uuid.UUID, productId int64) ([]*Product, error)
	WishlistDelete(ctx context.Context, userId uuid.UUID, productId int64) ([]*Product, error)
	// WishlistGet(ctx context.Context, userId uuid.UUID) ([]*Product, error)
	// WishlistCreate(ctx context.Context, userId uuid.UUID) (*Wishlist, error)
	// WishlistAddItem(ctx context.Context, userId uuid.UUID, productId int64) ([]*Product, error)
	// WishlistDeleteItem(ctx context.Context, userId uuid.UUID, productId int64) ([]*Product, error)
	// WishlistClear(ctx context.Context, userId uuid.UUID) error
}
