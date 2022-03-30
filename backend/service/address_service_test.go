package service

import (
	"context"
	"fmt"
	"testing"

	"backend/model"
	"backend/model/mocks"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"time"
	"github.com/google/uuid"
)

func TestAddressList(t *testing.T) {
	t.Run("Success", func(t *testing.T) {
		mockAddress1 := model.Address{
			ID:        1,
			Line1:     "line_1",
			Line2:     "line_2",
			City:      "city",
			Country:   "country",
			State:     "state",
			ZIP:       "zip",
			Latitude:  1234,
			Longitude: 1234,
			Phone:     "phone",
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
			DeletedAt: time.Now(),
		}
		mockAddress2 := model.Address{
			ID:        2,
			Line1:     "line_12",
			Line2:     "line_22",
			City:      "city2",
			Country:   "country2",
			State:     "state2",
			ZIP:       "zip",
			Latitude:  12342,
			Longitude: 12342,
			Phone:     "phone2",
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
			DeletedAt: time.Now(),
		}
		mockAddressList := []model.Address{mockAddress1, mockAddress2}
		uid, _ := uuid.NewRandom()
		mockUser := &model.User{
			UserId: uid,
			Name:   "name",
			Email:  "email@email.com",
		}
		userId := mockUser.UserId
		mockAddressRepository := new(mocks.MockAddressRepository)
		as := NewAddressService(&AddressServiceConfig{
			AddressRepository: mockAddressRepository,
		})
		mockAddressRepository.On("AddressList", mock.AnythingOfType("*context.emptyCtx")).Return(mockAddressList, nil)
		ctx := context.TODO()
		addressList, err := as.AddressList(ctx, userId)
		assert.NoError(t, err)
		fmt.Println("mockAddressList[0]", mockAddressList[0])
		fmt.Println("mockAddressList[1]", mockAddressList[1])
		assert.Equal(t, mockAddressList[0].ID, addressList[0].ID)
	})
}
