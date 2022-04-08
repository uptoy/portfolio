package service

import (
	"backend/model"
	"fmt"
	"context"
)

type paymentService struct {
	PaymentRepository model.PaymentRepository
}

type PaymentServiceConfig struct {
	PaymentRepository model.PaymentRepository
}

func NewPaymentService(c *PaymentServiceConfig) model.PaymentService {
	return &paymentService{
		PaymentRepository: c.PaymentRepository,
	}
}

func (s *paymentService) Payment(ctx context.Context, amount int64, email string) error {
	err := s.PaymentRepository.Payment(ctx, amount, email)
	if err != nil {
		fmt.Println(err)
	}
	return nil
}
