package mocks

import (
	"context"

	"backend/model"
	"github.com/google/uuid"
	"github.com/stretchr/testify/mock"
)

type MockAddressRepository struct {
	mock.Mock
}

func (m *MockAddressRepository) AddressCreate(ctx context.Context, userId uuid.UUID, address *model.Address) (*model.Address, error) {
	ret := m.Called(ctx, userId, address)
	var r0 *model.Address
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.Address)
	}
	var r1 error
	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}
	return r0, r1
}

func (m *MockAddressRepository) AddressList(ctx context.Context, userId uuid.UUID) ([]model.Address, error) {
	rets := m.Called(ctx,userId)
	result := rets.Get(0)
	return result.([]model.Address), rets.Error(1)
}

func (m *MockAddressRepository) AddressFindByID(ctx context.Context, addressId int64) (*model.Address, error) {
	ret := m.Called(ctx, addressId)
	var r0 *model.Address
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.Address)
	}

	var r1 error

	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}

	return r0, r1
}

func (m *MockAddressRepository) AddressUpdate(ctx context.Context, addressId int64, address *model.Address) (*model.Address, error) {
	ret := m.Called(ctx, addressId, address)
	var r0 *model.Address
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.Address)
	}
	var r1 error
	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}

	return r0, r1
}

func (m *MockAddressRepository) AddressDelete(ctx context.Context, addressId int64) (*model.Address, error) {
	ret := m.Called(ctx, addressId)
	var r0 *model.Address
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.Address)
	}
	var r1 error
	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}
	return r0, r1
}
