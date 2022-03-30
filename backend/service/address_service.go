package service

import (
	"backend/model"
	"context"
	"github.com/google/uuid"
)

type addressService struct {
	AddressRepository model.AddressRepository
}

type AddressServiceConfig struct {
	AddressRepository model.AddressRepository
}

func NewAddressService(c *AddressServiceConfig) model.AddressService {
	return &addressService{
		AddressRepository: c.AddressRepository,
	}
}

func (s *addressService) AddressList(ctx context.Context, userId uuid.UUID) ([]model.Address, error) {
	addresslist, err := s.AddressRepository.AddressList(ctx, userId)
	if err != nil {
		return nil, err
	}
	return addresslist, nil
}
func (s *addressService) AddressCreate(ctx context.Context, userId uuid.UUID, address *model.Address) (*model.Address, error) {
	address, err := s.AddressRepository.AddressCreate(ctx, userId, address)
	if err != nil {
		return nil, err
	}
	return address, nil
}
func (s *addressService) AddressFindByID(ctx context.Context, addressId int64) (*model.Address, error) {
	address, err := s.AddressRepository.AddressFindByID(ctx, addressId)
	if err != nil {
		return nil, err
	}
	return address, nil
}
func (s *addressService) AddressUpdate(ctx context.Context, addressId int64, address *model.Address) (*model.Address, error) {
	address, err := s.AddressRepository.AddressUpdate(ctx, addressId, address)
	if err != nil {
		return nil, err
	}
	return address, nil
}
func (s *addressService) AddressDelete(ctx context.Context, addressId int64) (*model.Address, error) {
	address, err := s.AddressRepository.AddressDelete(ctx, addressId)
	if err != nil {
		return nil, err
	}
	return address, nil
}
