package mocks

import (
	"context"

	"backend/model"
	"github.com/google/uuid"
	"github.com/stretchr/testify/mock"
)

type MockProductRepository struct {
	mock.Mock
}


func (m *MockProductRepository) FindByID(ctx context.Context, uid uuid.UUID) (*model.Product, error) {
	ret := m.Called(ctx, uid)

	var r0 *model.Product
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.Product)
	}

	var r1 error

	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}

	return r0, r1
}

func (m *MockProductRepository) Create(ctx context.Context, u *model.Product) error {
	ret := m.Called(ctx, u)

	var r0 error
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(error)
	}
	return r0
}

// func (r *pGProductRepository) ProductFindByID(ctx context.Context, productId uuid.UUID) (*model.Product, error) {
// func (r *pGProductRepository) ProductCreate(ctx context.Context, p *model.Product) (*model.Product, error) {
// func (r *pGProductRepository) ProductList(ctx context.Context) ([]*model.Product, error) {

// func (r *pGProductRepository) ProductFindByName(ctx context.Context, productName string) (*model.Product, error) {
// func (r *pGProductRepository) ProductUpdate(ctx context.Context, productId uuid.UUID, p *model.Product) (*model.Product, error) {

func (m *MockProductRepository) FindByName(ctx context.Context, product_name string) (*model.Product, error) {
	ret := m.Called(ctx, product_name)

	var r0 *model.Product
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(*model.Product)
	}

	var r1 error

	if ret.Get(1) != nil {
		r1 = ret.Get(1).(error)
	}

	return r0, r1
}

// Update is mock of UserRepository.Update
func (m *MockProductRepository) Update(ctx context.Context, u *model.Product) error {
	ret := m.Called(ctx, u)

	var r0 error
	if ret.Get(0) != nil {
		r0 = ret.Get(0).(error)
	}

	return r0
}
