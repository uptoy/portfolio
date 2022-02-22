package service

import (
		"backend/model"
		"context"
		"github.com/google/uuid"
    "fmt"
    "testing"

    "github.com/stretchr/testify/mock"

    "github.com/gin-gonic/gin"
    "backend/model/mocks"
    "github.com/stretchr/testify/assert"


)

func TestGet(t *testing.T) {
	// Setup
	gin.SetMode(gin.TestMode)

// add two cases here
t.Run("Success", func(t *testing.T) {
  uid, _ := uuid.NewRandom()

  mockUserResp := &model.User{
    UID:   uid,
    Email: "bob@bob.com",
    Name:  "Bobby Bobson",
  }

  mockUserRepository := new(mocks.MockUserRepository)
  us := NewUserService(&USConfig{
    UserRepository: mockUserRepository,
  })
  mockUserRepository.On("FindByID", mock.Anything, uid).Return(mockUserResp, nil)

  ctx := context.TODO()
  u, err := us.Get(ctx, uid)

  assert.NoError(t, err)
  assert.Equal(t, u, mockUserResp)
  mockUserRepository.AssertExpectations(t)
})

t.Run("Error", func(t *testing.T) {
  uid, _ := uuid.NewRandom()

  mockUserRepository := new(mocks.MockUserRepository)
  us := NewUserService(&USConfig{
    UserRepository: mockUserRepository,
  })

  mockUserRepository.On("FindByID", mock.Anything, uid).Return(nil, fmt.Errorf("Some error down the call chain"))

  ctx := context.TODO()
  u, err := us.Get(ctx, uid)

  assert.Nil(t, u)
  assert.Error(t, err)
  mockUserRepository.AssertExpectations(t)
})
}
