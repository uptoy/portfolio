package service

import (
	"context"
	// "log"
	// "mime/multipart"
	// "net/url"
	// "path"

	"backend/model"
	// "backend/model/apperrors"
	"github.com/google/uuid"
)

// userService acts as a struct for injecting an implementation of UserRepository
// for use in service methods
type cartService struct {
	CartRepository model.CartRepository
}

type CartServiceConfig struct {
	CartRepository  model.CartRepository
}

func NewCartService(c *CartServiceConfig) model.CartService {
	return &cartService{
		CartRepository: c.CartRepository,
	}
}

// return CartItems
func (s *cartService) AddCartItem(ctx context.Context, userId uuid.UUID, cartItem *model.CartItem) (*model.Cart, error) {
	var cart = model.Cart{}
	// var user = model.User{}
	// var product = model.CartItem.Product{}
	// var product = cartItem.Product{}
	// var cartItem = model.CartItem{}
	// var cart = model.Cart{
	// 	User:User,
	// 	CartItems:cart.CartItems ,
	// }


	var err error
	return &cart,err
}

func (s *cartService) RemoveCartItem(ctx context.Context,userId uuid.UUID, productId uuid.UUID) (*model.Cart, error) {
	var cart = model.Cart{}
	var err error
	return &cart,err
}

// return CartItems
func (s *cartService) GetCartItemList(ctx context.Context, uid uuid.UUID) (*model.Cart, error) {
	var cart = model.Cart{}
	var err error
	return &cart,err
}

//不要?
// func (s *cartService) UpdateCartItem(ctx context.Context, uid uuid.UUID, input *model.Product) (*model.Cart, error){
// 	var cart = model.Cart{}
// 	var err error
// 	return &cart,err
// }

