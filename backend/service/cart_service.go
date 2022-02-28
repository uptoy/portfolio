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

func NewCartService(c *USConfig) model.CartService {
	return &cartService{
		CartRepository: c.CartRepository,
	}
}

// Get retrieves a user based on their uuid
func (s *cartService) AddCartItem(ctx context.Context, uid uuid.UUID, product *model.Product) error {
	err := s.CartRepository.AddCartItem(ctx, uid, product)
	return err
}

// Signup reaches our to a UserRepository to verify the
// email address is available and signs up the user if this is the case
// func (s *userService) Signup(ctx context.Context, u *model.User) error {
// 	pw, err := hashPassword(u.Password)

// 	if err != nil {
// 		log.Printf("Unable to signup user for email: %v\n", u.Email)
// 		return apperrors.NewInternal()
// 	}
// 	u.Password = pw
// 	if err := s.UserRepository.Create(ctx, u); err != nil {
// 		return err
// 	}
// 	return nil
// }

// func (s *userService) Signin(ctx context.Context, u *model.User) error {
// 	uFetched, err := s.UserRepository.FindByEmail(ctx, u.Email)
// 	if err != nil {
// 		return apperrors.NewAuthorization("Invalid email and password combination")
// 	}
// 	match, err := comparePasswords(uFetched.Password, u.Password)
// 	if err != nil {
// 		return apperrors.NewInternal()
// 	}
// 	if !match {
// 		return apperrors.NewAuthorization("Invalid email and password combination")
// 	}
// 	*u = *uFetched
// 	return nil
// }

// func (s *userService) UpdateDetails(ctx context.Context, u *model.User) error {
// 	// Update user in UserRepository
// 	err := s.UserRepository.Update(ctx, u)
// 	if err != nil {
// 		return err
// 	}

// 	// // Publish user updated
// 	// err = s.EventsBroker.PublishUserUpdated(u, false)
// 	// if err != nil {
// 	// 	return apperrors.NewInternal()
// 	// }

// 	return nil
// }

// func (s *userService) SetProfileImage(
// 	ctx context.Context,
// 	uid uuid.UUID,
// 	imageFileHeader *multipart.FileHeader,
// ) (*model.User, error) {
// 	u, err := s.UserRepository.FindByID(ctx, uid)

// 	if err != nil {
// 		return nil, err
// 	}

// 	objName, err := objNameFromURL(u.ImageURL)

// 	if err != nil {
// 		return nil, err
// 	}

// 	imageFile, err := imageFileHeader.Open()
// 	if err != nil {
// 		log.Printf("Failed to open image file: %v\n", err)
// 		return nil, apperrors.NewInternal()
// 	}

// 	// Upload user's image to ImageRepository
// 	// Possibly received updated imageURL
// 	imageURL, err := s.ImageRepository.UpdateProfile(ctx, objName, imageFile)

// 	if err != nil {
// 		log.Printf("Unable to upload image to cloud provider: %v\n", err)
// 		return nil, err
// 	}

// 	updatedUser, err := s.UserRepository.UpdateImage(ctx, u.UID, imageURL)

// 	if err != nil {
// 		log.Printf("Unable to update imageURL: %v\n", err)
// 		return nil, err
// 	}

// 	return updatedUser, nil
// }

// func objNameFromURL(imageURL string) (string, error) {
// 	// if user doesn't have imageURL - create one
// 	// otherwise, extract last part of URL to get cloud storage object name
// 	if imageURL == "" {
// 		objID, _ := uuid.NewRandom()
// 		return objID.String(), nil
// 	}

// 	// split off last part of URL, which is the image's storage object ID
// 	urlPath, err := url.Parse(imageURL)

// 	if err != nil {
// 		log.Printf("Failed to parse objectName from imageURL: %v\n", imageURL)
// 		return "", apperrors.NewInternal()
// 	}

// 	// get "path" of url (everything after domain)
// 	// then get "base", the last part
// 	return path.Base(urlPath.Path), nil
// }
