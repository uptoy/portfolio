package service

import (
	"context"
	// "fmt"
	"log"
	// "mime/multipart"
	// "net/url"
	// "path"

	"backend/model"
	"backend/model/apperrors"

	"github.com/google/uuid"
)

// userService acts as a struct for injecting an implementation of UserRepository
// for use in service methods
type userService struct {
	UserRepository     model.UserRepository
	CartRepository     model.CartRepository
	WishlistRepository model.WishlistRepository
}

// USConfig will hold repositories that will eventually be injected into this
// this service layer
type USConfig struct {
	UserRepository     model.UserRepository
	CartRepository     model.CartRepository
	WishlistRepository model.WishlistRepository
}

// NewUserService is a factory function for
// initializing a UserService with its repository layer dependencies
func NewUserService(c *USConfig) model.UserService {
	return &userService{
		UserRepository:     c.UserRepository,
		CartRepository:     c.CartRepository,
		WishlistRepository: c.WishlistRepository,
	}
}

// Get retrieves a user based on their uuid
func (s *userService) Get(ctx context.Context, uid uuid.UUID) (*model.User, error) {
	u, err := s.UserRepository.FindByID(ctx, uid)

	return u, err
}

// Signup reaches our to a UserRepository to verify the
// email address is available and signs up the user if this is the case
func (s *userService) Signup(ctx context.Context, u *model.User) (*model.User, error) {
	pw, err := hashPassword(u.Password)

	if err != nil {
		log.Printf("Unable to signup user for email: %v\n", u.Email)
		return nil, apperrors.NewInternal()
	}

	// now I realize why I originally used Signup(ctx, email, password)
	// then created a user. It's somewhat un-natural to mutate the user here
	u.Password = pw
	user, err := s.UserRepository.Create(ctx, u)
	if err != nil {
		log.Printf("Unable to signup user for email: %v\n", u.Email)
		return nil, apperrors.NewInternal()
	}
	uid := user.UID

	// If we get around to adding events, we'd Publish it here
	_, err1 := s.CartRepository.CartCreate(ctx, uid)
	// fmt.Println(cart)
	if err1 != nil {
		log.Printf("Unable to create cart: %v\n", u.Name)
		return nil, apperrors.NewInternal()
	}

	return user, nil
}

// Signin reaches our to a UserRepository check if the user exists
// and then compares the supplied password with the provided password
// if a valid email/password combo is provided, u will hold all
// available user fields
func (s *userService) Signin(ctx context.Context, u *model.User) (*model.User, error) {
	uFetched, err := s.UserRepository.FindByEmail(ctx, u.Email)

	// Will return NotAuthorized to client to omit details of why
	if err != nil {
		return nil, apperrors.NewAuthorization("Invalid email and password combination")
	}

	// verify password - we previously created this method
	match, err := comparePasswords(uFetched.Password, u.Password)
	if err != nil {
		return nil, apperrors.NewInternal()
	}

	if !match {
		return nil, apperrors.NewAuthorization("Invalid email and password combination")
	}

	*u = *uFetched
	return uFetched, nil
}

func (s *userService) UpdateDetails(ctx context.Context, u *model.User) error {
	// Update user in UserRepository
	err := s.UserRepository.Update(ctx, u)

	if err != nil {
		return err
	}

	// // Publish user updated
	// err = s.EventsBroker.PublishUserUpdated(u, false)
	// if err != nil {
	// 	return apperrors.NewInternal()
	// }

	return nil
}

func (s *userService) FindByEmail(ctx context.Context, email string) (*model.User, error) {
	result, err := s.UserRepository.FindByEmail(ctx, email)

	if err != nil {
		return result, err
	}
	return result, err
}

func (s *userService) Count(ctx context.Context) (int, error) {
	result, err := s.UserRepository.Count(ctx)

	if err != nil {
		return result, err
	}
	return result, err
}

func (s *userService) GetList(ctx context.Context) ([]*model.User, error) {
	result, err := s.UserRepository.GetList(ctx)
	if err != nil {
		return result, err
	}
	return result, err
}
