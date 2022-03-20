package service

import (
	"context"
	"fmt"
	"testing"

	"backend/model"
	"backend/model/apperrors"
	"backend/model/fixture"
	"backend/model/mocks"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestProductList(t *testing.T) {
	t.Run("Success", func(t *testing.T) {
		uid, _ := uuid.NewRandom()
		mockProductResp := &model.Product{
			ProductId:     uid,
			ProductName:   "product_name",
			Slug:          "slug",
			ProductImage:  "http://placehold.jp/150x150.png",
			Brand:         "brand",
			Price:         1,
			CategoryName:  "category_name",
			CountInStock:  1,
			Description:   "description",
			AverageRating: 5,
		}
		mockProductRepository := new(mocks.MockProductRepository)
		ps := NewProductService(&PSConfig{
			ProductRepository: mockProductRepository,
		})
		mockProductRepository.On("ProductList", mock.Anything, uid).Return(mockProductResp, nil)

		ctx := context.TODO()
		p, err := ps.Get(ctx, uid)
		// var p = model.Product{}
		// var err error

		assert.NoError(t, err)
		assert.Equal(t, p, mockProductResp)
		mockProductRepository.AssertExpectations(t)
	})
	t.Run("Error", func(t *testing.T) {
		uid, _ := uuid.NewRandom()
		mockProductRepository := new(mocks.MockProductRepository)
		ps := NewProductService(&PSConfig{
			ProductRepository: mockProductRepository,
		})
		mockProductRepository.On("FindByID", mock.Anything, uid).Return(nil, fmt.Errorf("Some error down the call chain"))
		ctx := context.TODO()
		u, err := ps.Get(ctx, uid)
		assert.Nil(t, u)
		assert.Error(t, err)
		mockProductRepository.AssertExpectations(t)
	})
}

// func TestProductList(t *testing.T) {
// 	t.Run("Success", func(t *testing.T) {
// 		uid, _ := uuid.NewRandom()

// 		mockProductResp := &model.Product{
// 			ProductId: uid,
// 			Email:     "bob@bob.com",
// 			Name:      "Bobby Bobson",
// 		}

// 		mockProductRepository := new(mocks.MockProductRepository)
// 		us := NewProductService(&PSConfig{
// 			ProductRepository: mockProductRepository,
// 		})
// 		mockProductRepository.On("FindByID", mock.Anything, uid).Return(mockProductResp, nil)

// 		ctx := context.TODO()
// 		u, err := us.Get(ctx, uid)

// 		assert.NoError(t, err)
// 		assert.Equal(t, u, mockProductResp)
// 		mockProductRepository.AssertExpectations(t)
// 	})

// 	t.Run("Error", func(t *testing.T) {
// 		uid, _ := uuid.NewRandom()

// 		mockProductRepository := new(mocks.MockProductRepository)
// 		us := NewUserService(&USConfig{
// 			ProductRepository: mockProductRepository,
// 		})

// 		mockProductRepository.On("FindByID", mock.Anything, uid).Return(nil, fmt.Errorf("Some error down the call chain"))

// 		ctx := context.TODO()
// 		u, err := us.Get(ctx, uid)

// 		assert.Nil(t, u)
// 		assert.Error(t, err)
// 		mockProductRepository.AssertExpectations(t)
// 	})
// }

// func TestSignup(t *testing.T) {
// 	t.Run("Success", func(t *testing.T) {
// 		uid, _ := uuid.NewRandom()

// 		mockProduct := &model.Product{
// 			Email:    "bob@bob.com",
// 			Password: "howdyhoneighbor!",
// 		}

// 		mockProductRepository := new(mocks.MockProductRepository)
// 		us := NewProductService(&USConfig{
// 			ProductRepository: mockProductRepository,
// 		})

// 		// We can use Run method to modify the user when the Create method is called.
// 		//  We can then chain on a Return method to return no error
// 		mockProductRepository.
// 			On("Create", mock.AnythingOfType("*context.emptyCtx"), mockProduct).
// 			Run(func(args mock.Arguments) {
// 				productArg := args.Get(1).(*model.Product) // arg 0 is context, arg 1 is *User
// 				productArg.ProductId = uid
// 			}).Return(nil)

// 		ctx := context.TODO()
// 		err := us.Signup(ctx, mockProduct)

// 		assert.NoError(t, err)

// 		// assert user now has a userID
// 		assert.Equal(t, uid, mockProduct.ProductId)

// 		mockProductRepository.AssertExpectations(t)
// 	})

// 	t.Run("Error", func(t *testing.T) {
// 		mockProduct := &model.Product{
// 			Email:    "bob@bob.com",
// 			Password: "howdyhoneighbor!",
// 		}

// 		mockProductRepository := new(mocks.MockProductRepository)
// 		us := NewProductService(&USConfig{
// 			ProductRepository: mockProductRepository,
// 		})

// 		mockErr := apperrors.NewConflict("email", mockProduct.Email)

// 		// We can use Run method to modify the user when the Create method is called.
// 		//  We can then chain on a Return method to return no error
// 		mockProductRepository.
// 			On("Create", mock.AnythingOfType("*context.emptyCtx"), mockProduct).
// 			Return(mockErr)

// 		ctx := context.TODO()
// 		err := us.Signup(ctx, mockProduct)

// 		// assert error is error we response with in mock
// 		assert.EqualError(t, err, mockErr.Error())

// 		mockProductRepository.AssertExpectations(t)
// 	})
// }

// func TestSignin(t *testing.T) {
// 	// setup valid email/pw combo with hashed password to test method
// 	// response when provided password is invalid
// 	email := "bob@bob.com"
// 	validPW := "howdyhoneighbor!"
// 	hashedValidPW, _ := hashPassword(validPW)
// 	invalidPW := "howdyhodufus!"

// 	mockProductRepository := new(mocks.MockProductRepository)
// 	us := NewProductService(&USConfig{
// 		ProductRepository: mockProductRepository,
// 	})

// 	t.Run("Success", func(t *testing.T) {
// 		uid, _ := uuid.NewRandom()

// 		mockProduct := &model.Product{
// 			Email:    email,
// 			Password: validPW,
// 		}

// 		mockProductResp := &model.Product{
// 			ProductId: uid,
// 			Email:     email,
// 			Password:  hashedValidPW,
// 		}

// 		mockArgs := mock.Arguments{
// 			mock.AnythingOfType("*context.emptyCtx"),
// 			email,
// 		}

// 		// We can use Run method to modify the user when the Create method is called.
// 		//  We can then chain on a Return method to return no error
// 		mockProductRepository.
// 			On("FindByEmail", mockArgs...).Return(mockProductResp, nil)

// 		ctx := context.TODO()
// 		err := us.Signin(ctx, mockProduct)

// 		assert.NoError(t, err)
// 		mockProductRepository.AssertCalled(t, "FindByEmail", mockArgs...)
// 	})

// 	t.Run("Invalid email/password combination", func(t *testing.T) {
// 		uid, _ := uuid.NewRandom()

// 		mockProduct := &model.Product{
// 			Email:    email,
// 			Password: invalidPW,
// 		}

// 		mockProductResp := &model.Product{
// 			UserId:   uid,
// 			Email:    email,
// 			Password: hashedValidPW,
// 		}

// 		mockArgs := mock.Arguments{
// 			mock.AnythingOfType("*context.emptyCtx"),
// 			email,
// 		}

// 		// We can use Run method to modify the user when the Create method is called.
// 		//  We can then chain on a Return method to return no error
// 		mockProductRepository.
// 			On("FindByEmail", mockArgs...).Return(mockProductResp, nil)

// 		ctx := context.TODO()
// 		err := us.Signin(ctx, mockProduct)

// 		assert.Error(t, err)
// 		assert.EqualError(t, err, "Invalid email and password combination")
// 		mockProductRepository.AssertCalled(t, "FindByEmail", mockArgs...)
// 	})
// }

// func TestUpdateDetails(t *testing.T) {
// 	mockProductRepository := new(mocks.MockProductRepository)
// 	us := NewProductService(&USConfig{
// 		ProductRepository: mockProductRepository,
// 	})

// 	t.Run("Success", func(t *testing.T) {
// 		uid, _ := uuid.NewRandom()

// 		mockUser := &model.Product{
// 			ProductId: uid,
// 			Email:     "new@bob.com",
// 			Name:      "A New Bob!",
// 		}

// 		mockArgs := mock.Arguments{
// 			mock.AnythingOfType("*context.emptyCtx"),
// 			mockProduct,
// 		}

// 		mockProductRepository.
// 			On("Update", mockArgs...).Return(nil)

// 		ctx := context.TODO()
// 		err := us.UpdateDetails(ctx, mockProduct)

// 		assert.NoError(t, err)
// 		mockProductRepository.AssertCalled(t, "Update", mockArgs...)
// 	})

// 	t.Run("Failure", func(t *testing.T) {
// 		uid, _ := uuid.NewRandom()

// 		mockProduct := &model.Product{
// 			ProductId: uid,
// 		}

// 		mockArgs := mock.Arguments{
// 			mock.AnythingOfType("*context.emptyCtx"),
// 			mockProduct,
// 		}

// 		mockError := apperrors.NewInternal()

// 		mockProductRepository.
// 			On("Update", mockArgs...).Return(mockError)

// 		ctx := context.TODO()
// 		err := us.UpdateDetails(ctx, mockProduct)
// 		assert.Error(t, err)

// 		apperror, ok := err.(*apperrors.Error)
// 		assert.True(t, ok)
// 		assert.Equal(t, apperrors.Internal, apperror.Type)

// 		mockProductRepository.AssertCalled(t, "Update", mockArgs...)
// 	})
// }

// func TestSetProfileImage(t *testing.T) {
// 	mockProductRepository := new(mocks.MockProductRepository)

// 	ps := NewProductService(&USConfig{
// 		ProductRepository: mockProductRepository,
// 	})

// 	t.Run("Successful new image", func(t *testing.T) {
// 		uid, _ := uuid.NewRandom()

// 		// does not have have imageURL
// 		mockProduct := &model.Product{
// 			ProductId: uid,
// 			Email:     "new@bob.com",
// 			Name:      "A New Bob!",
// 		}

// 		findByIDArgs := mock.Arguments{
// 			mock.AnythingOfType("*context.emptyCtx"),
// 			uid,
// 		}
// 		mockProductRepository.On("FindByID", findByIDArgs...).Return(mockProduct, nil)

// 		multipartImageFixture := fixture.NewMultipartImage("image.png", "image/png")
// 		defer multipartImageFixture.Close()
// 		imageFileHeader := multipartImageFixture.GetFormFile()
// 		imageFile, _ := imageFileHeader.Open()

// 		updateProfileArgs := mock.Arguments{
// 			mock.AnythingOfType("*context.emptyCtx"),
// 			mock.AnythingOfType("string"),
// 			imageFile,
// 		}

// 		imageURL := "http://imageurl.com/jdfkj34kljl"

// 		mockImageRepository.
// 			On("UpdateProfile", updateProfileArgs...).
// 			Return(imageURL, nil)

// 		updateImageArgs := mock.Arguments{
// 			mock.AnythingOfType("*context.emptyCtx"),
// 			mockProduct.ProductId,
// 			imageURL,
// 		}

// 		mockUpdatedProduct := &model.Product{
// 			ProductId:  uid,
// 			Email:      "new@bob.com",
// 			Name:       "A New Bob!",
// 			ProfileUrl: imageURL,
// 		}

// 		mockProductRepository.
// 			On("UpdateImage", updateImageArgs...).
// 			Return(mockUpdatedProduct, nil)

// 		ctx := context.TODO()

// 		updatedProduct, err := ps.SetProfileImage(ctx, mockProduct.ProductId, imageFileHeader)

// 		assert.NoError(t, err)
// 		assert.Equal(t, mockUpdatedProduct, updatedProduct)
// 		mockProductRepository.AssertCalled(t, "FindByID", findByIDArgs...)
// 	})

// 	t.Run("Successful update image", func(t *testing.T) {
// 		uid, _ := uuid.NewRandom()
// 		imageURL := "http://imageurl.com/jdfkj34kljl"

// 		// has imageURL
// 		mockProduct := &model.Product{
// 			ProductId:     uid,
// 			Email:      "new@bob.com",
// 			Name:       "A New Bob!",
// 		}

// 		findByIDArgs := mock.Arguments{
// 			mock.AnythingOfType("*context.emptyCtx"),
// 			uid,
// 		}
// 		mockProductRepository.On("FindByID", findByIDArgs...).Return(mockProduct, nil)

// 		multipartImageFixture := fixture.NewMultipartImage("image.png", "image/png")
// 		defer multipartImageFixture.Close()
// 		imageFileHeader := multipartImageFixture.GetFormFile()
// 		imageFile, _ := imageFileHeader.Open()

// 		updateProfileArgs := mock.Arguments{
// 			mock.AnythingOfType("*context.emptyCtx"),
// 			mock.AnythingOfType("string"),
// 			imageFile,
// 		}

// 		updateImageArgs := mock.Arguments{
// 			mock.AnythingOfType("*context.emptyCtx"),
// 			mockProduct.ProductId,
// 			imageURL,
// 		}

// 		mockUpdatedProduct := &model.Product{
// 			ProductId:     uid,
// 			Email:      "new@bob.com",
// 			Name:       "A New Bob!",
// 			ProfileUrl: imageURL,
// 		}

// 		mockProductRepository.
// 			On("UpdateImage", updateImageArgs...).
// 			Return(mockUpdatedProduct, nil)

// 		ctx := context.TODO()

// 		updatedProduct, err := ps.SetProfileImage(ctx, uid, imageFileHeader)

// 		assert.NoError(t, err)
// 		assert.Equal(t, mockUpdatedProduct, updatedProduct)
// 		mockProductRepository.AssertCalled(t, "FindByID", findByIDArgs...)
// 	})

// 	t.Run("ProductRepository FindByID Error", func(t *testing.T) {
// 		uid, _ := uuid.NewRandom()

// 		findByIDArgs := mock.Arguments{
// 			mock.AnythingOfType("*context.emptyCtx"),
// 			uid,
// 		}
// 		mockError := apperrors.NewInternal()
// 		mockProductRepository.On("FindByID", findByIDArgs...).Return(nil, mockError)

// 		multipartImageFixture := fixture.NewMultipartImage("image.png", "image/png")
// 		defer multipartImageFixture.Close()
// 		imageFileHeader := multipartImageFixture.GetFormFile()

// 		ctx := context.TODO()

// 		updatedProduct, err := ps.SetProfileImage(ctx, uid, imageFileHeader)

// 		assert.Error(t, err)
// 		assert.Nil(t, updatedProduct)
// 		mockProductRepository.AssertCalled(t, "FindByID", findByIDArgs...)
// 	})

// 	t.Run("ImageRepository Error", func(t *testing.T) {
// 		// need to create a new ProductService and repository
// 		// because testify has no way to overwrite a mock's
// 		// "On" call.
// 		mockProductRepository := new(mocks.MockProductRepository)
// 		mockImageRepository := new(mocks.MockImageRepository)

// 		us := NewProductService(&USConfig{
// 			ProductRepository:  mockProductRepository,
// 		})

// 		uid, _ := uuid.NewRandom()
// 		imageURL := "http://imageurl.com/jdfkj34kljl"

// 		// has imageURL
// 		mockProduct := &model.Product{
// 			ProductId:     uid,
// 			Email:      "new@bob.com",
// 			Name:       "A New Bob!",
// 		}

// 		findByIDArgs := mock.Arguments{
// 			mock.AnythingOfType("*context.emptyCtx"),
// 			uid,
// 		}
// 		mockProductRepository.On("FindByID", findByIDArgs...).Return(mockProduct, nil)

// 		multipartImageFixture := fixture.NewMultipartImage("image.png", "image/png")
// 		defer multipartImageFixture.Close()
// 		imageFileHeader := multipartImageFixture.GetFormFile()
// 		imageFile, _ := imageFileHeader.Open()

// 		updateProfileArgs := mock.Arguments{
// 			mock.AnythingOfType("*context.emptyCtx"),
// 			mock.AnythingOfType("string"),
// 			imageFile,
// 		}

// 		mockError := apperrors.NewInternal()
// 		mockImageRepository.
// 			On("UpdateProfile", updateProfileArgs...).
// 			Return(nil, mockError)

// 		ctx := context.TODO()
// 		updatedProduct, err := us.SetProfileImage(ctx, uid, imageFileHeader)

// 		assert.Nil(t, updatedProduct)
// 		assert.Error(t, err)
// 		mockProductRepository.AssertCalled(t, "FindByID", findByIDArgs...)
// 	})

// 	t.Run("ProductRepository UpdateImage Error", func(t *testing.T) {
// 		uid, _ := uuid.NewRandom()
// 		imageURL := "http://imageurl.com/jdfkj34kljl"

// 		// has imageURL
// 		mockProduct := &model.Product{
// 			ProductId:     uid,
// 			Email:      "new@bob.com",
// 			Name:       "A New Bob!",
// 			ProfileUrl: imageURL,
// 		}

// 		findByIDArgs := mock.Arguments{
// 			mock.AnythingOfType("*context.emptyCtx"),
// 			uid,
// 		}
// 		mockProductRepository.On("FindByID", findByIDArgs...).Return(mockProduct, nil)

// 		multipartImageFixture := fixture.NewMultipartImage("image.png", "image/png")
// 		defer multipartImageFixture.Close()
// 		imageFileHeader := multipartImageFixture.GetFormFile()
// 		imageFile, _ := imageFileHeader.Open()

// 		updateProfileArgs := mock.Arguments{
// 			mock.AnythingOfType("*context.emptyCtx"),
// 			mock.AnythingOfType("string"),
// 			imageFile,
// 		}

// 		mockImageRepository.
// 			On("UpdateProfile", updateProfileArgs...).
// 			Return(imageURL, nil)

// 		updateImageArgs := mock.Arguments{
// 			mock.AnythingOfType("*context.emptyCtx"),
// 			mockProduct.ProductId,
// 			imageURL,
// 		}

// 		mockError := apperrors.NewInternal()
// 		mockProductRepository.
// 			On("UpdateImage", updateImageArgs...).
// 			Return(nil, mockError)

// 		ctx := context.TODO()

// 		updatedProduct, err := ps.SetProfileImage(ctx, uid, imageFileHeader)

// 		assert.Error(t, err)
// 		assert.Nil(t, updatedProduct)
// 		mockProductRepository.AssertCalled(t, "UpdateImage", updateImageArgs...)
// 	})
// }
