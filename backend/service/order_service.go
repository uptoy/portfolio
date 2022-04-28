package service

import (
	"backend/model"
	"context"
	"log"

	"github.com/google/uuid"
)

type orderService struct {
	OrderRepository   model.OrderRepository
	ProductRepository model.ProductRepository
	UserRepository    model.UserRepository
	AddressRepository model.AddressRepository
}

type OrderServiceConfig struct {
	OrderRepository   model.OrderRepository
	ProductRepository model.ProductRepository
	UserRepository    model.UserRepository
	AddressRepository model.AddressRepository
}

func NewOrderService(c *OrderServiceConfig) model.OrderService {
	return &orderService{
		OrderRepository:   c.OrderRepository,
		ProductRepository: c.ProductRepository,
		UserRepository:    c.UserRepository,
		AddressRepository: c.AddressRepository,
	}
}

func (s *orderService) OrderList(ctx context.Context, userID uuid.UUID) ([]model.Order, error) {
	orders, err := s.OrderRepository.OrderList(ctx, userID)
	if err != nil {
		return orders, err
	}
	return orders, nil
}

func (s *orderService) OrderCreate(ctx context.Context, userID uuid.UUID, data *model.OrderRequestData) (*model.Order, error) {
	if err := data.Validate(); err != nil {
		return nil, err
	}

	ids := make([]int64, 0)
	for _, x := range data.Items {
		ids = append(ids, x.ProductId)
	}
	products, err := s.ProductRepository.ProductListByIDS(ctx, ids)
	if err != nil {
		return nil, err
	}

	subtotal := int64(0)
	for i, p := range products {
		subtotal += p.Price * data.Items[i].Quantity
	}
	total := subtotal

	shippingAddrInfo := &model.Address{}

	if data.UseExistingBillingAddress != nil && *data.UseExistingBillingAddress == true {
		if data.ShippingAddressID != nil {
			ua, err := s.AddressRepository.AddressGet(ctx, userID, *data.ShippingAddressID)
			if err != nil {
				return nil, err
			}
			shippingAddrInfo = ua
		}
	} else {
		shippingAddrInfo = data.ShippingAddress
	}
	if total == 0 {
		total = 50
	}
	o := &model.Order{
		UserId:          userID,
		TotalPrice:      total,
		ShippingAddress: shippingAddrInfo.Address,
		ShippingCity:    shippingAddrInfo.City,
		ShippingState:   shippingAddrInfo.State,
		ShippingCountry: shippingAddrInfo.Country,
		ShippingZIP:     shippingAddrInfo.ZIP,
	}

	o.PreSave()

	if data.SameShippingAsBilling != nil && *data.SameShippingAsBilling == true {
		o.ShippingAddress = shippingAddrInfo.City
		o.ShippingCountry = shippingAddrInfo.Country
		o.ShippingState = shippingAddrInfo.State
		o.ShippingZIP = shippingAddrInfo.ZIP
	} else {
		o.ShippingCity = data.ShippingAddress.City
		o.ShippingCountry = data.ShippingAddress.Country
		o.ShippingState = data.ShippingAddress.State
		o.ShippingZIP = data.ShippingAddress.ZIP
	}

	// save actual order
	order, err := s.OrderRepository.OrderCreate(ctx, o)
	if err != nil {
		return nil, err
	}

	orderDetails := make([]*model.OrderDetail, 0)
	for i, p := range products {
		detail := &model.OrderDetail{
			OrderID:   order.Id,
			ProductID: p.Id,
			Quantity:  data.Items[i].Quantity,
			SubPrice:  p.Price,
		}
		orderDetails = append(orderDetails, detail)
	}
	if err := s.OrderRepository.OrderDetailsBulkInsert(ctx, orderDetails); err != nil {
		return nil, err
	}

	defer func() {
		if (data.UseExistingBillingAddress == nil || data.UseExistingBillingAddress != nil && *data.UseExistingBillingAddress == false) && (data.SaveAddress != nil && *data.SaveAddress == true) {
			if _, err := s.AddressRepository.AddressCreate(ctx, userID, data.ShippingAddress); err != nil {
				log.Fatal(err)
			}
		}
	}()

	return order, nil
}

func (s *orderService) OrderFindByID(ctx context.Context, orderId int64) (*model.Order, error) {
	order, err := s.OrderRepository.OrderFindByID(ctx, orderId)
	if err != nil {
		return nil, err
	}
	return order, nil
}

func (s *orderService) OrderCount(ctx context.Context) (int, error) {
	result, err := s.OrderRepository.OrderCount(ctx)
	if err != nil {
		return result, err
	}
	return result, nil
}

func (s *orderService) OrderGetDetails(ctx context.Context, orderId int64) ([]*model.OrderInfo, error) {
	result, err := s.OrderRepository.OrderGetDetails(ctx, orderId)
	if err != nil {
		return result, err
	}
	return result, nil
}

func (s *orderService) OrderDetailsBulkInsert(ctx context.Context, items []*model.OrderDetail) error {
	err := s.OrderRepository.OrderDetailsBulkInsert(ctx, items)
	if err != nil {
		return err
	}
	return nil

}
