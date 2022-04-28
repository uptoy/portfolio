package service

import (
	"context"
	"log"

	"backend/model"
	"backend/model/apperrors"
	// "backend/service"
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

func (s *addressService) AddressCreate(ctx context.Context, userId uuid.UUID, address *model.Address) (*model.Address, error) {
	result, err := s.AddressRepository.AddressCreate(ctx, userId, address)
	if err != nil {
		log.Printf("Unable to service create address: %v\n", address)
		return nil, apperrors.NewInternal()
	}
	return result, nil
}

func (s *addressService) AddressList(ctx context.Context, userId uuid.UUID) ([]*model.Address, error) {
	addressList := []model.Address{}
	result, err := s.AddressRepository.AddressList(ctx, userId)
	if err != nil {
		log.Printf("Unable to service get address list: %v\n", addressList)
		return nil, apperrors.NewInternal()
	}
	return result, nil
}

func (s *addressService) AddressGet(ctx context.Context, userId uuid.UUID, addressId int64) (*model.Address, error) {
	address := model.Address{}
	result, err := s.AddressRepository.AddressGet(ctx, userId, addressId)
	if err != nil {
		log.Printf("Unable to service get address: %v\n", address)
		return nil, apperrors.NewInternal()
	}
	return result, nil
}

func (s *addressService) AddressUpdate(ctx context.Context, addressId int64, address *model.Address) (*model.Address, error) {
	result, err := s.AddressRepository.AddressUpdate(ctx, addressId, address)
	if err != nil {
		log.Printf("Unable to service update address: %v\n", address)
		return nil, apperrors.NewInternal()
	}
	return result, nil
}

func (s *addressService) AddressDelete(ctx context.Context, addressId int64) error {
	err := s.AddressRepository.AddressDelete(ctx, addressId)
	if err != nil {
		log.Printf("Unable to service reset password: %v\n", string(addressId))
		return apperrors.NewInternal()
	}
	return nil
}
