package service

import (
	"backend/model"
)

//TODO stripe



type paymentService struct {
}


func NewPaymentService() model.PaymentService {
	return &paymentService{}
}

func (s *paymentService) Payment(amount int64, email string) error {

	return nil
}
