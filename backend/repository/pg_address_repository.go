package repository

import (
	"backend/model"
	"backend/model/apperrors"
	"context"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/lib/pq"
	"log"
	"strconv"
)

type pGAddressRepository struct {
	DB *sqlx.DB
}

func NewAddressRepository(db *sqlx.DB) model.AddressRepository {
	return &pGAddressRepository{
		DB: db,
	}
}

func (r *pGAddressRepository) AddressList(ctx context.Context, userId uuid.UUID) ([]model.Address, error) {
	addresslist := []model.Address{}
	query := `SELECT a.* FROM addresses a LEFT JOIN user_addresses ua ON a.id = ua.address_id WHERE ua.user_id = $1`
	if err := r.DB.SelectContext(ctx, &addresslist, query, userId); err != nil {
		log.Printf("Unable to get product with name: %v. Err: %v\n", addresslist, err)
		return nil, apperrors.NewNotFound("product_name", "products")
	}
	return addresslist, nil
}

func (r *pGAddressRepository) AddressCreate(ctx context.Context, userId uuid.UUID, address *model.Address) (*model.Address, error) {
	query := `WITH addr_ins AS (
		INSERT INTO address (line_1, line_2, city, country, state, zip, latitude, longitude, phone, created_at, updated_at)
		VALUES (:line_1, :line_2, :city, :country, :state, :zip, :latitude, :longitude, :phone, :created_at, :updated_at)
		RETURNING id AS addr_id
	)
	INSERT INTO user_address (user_id, address_id)
	VALUES (:user_id, (SELECT addr_id FROM addr_ins))
	RETURNING (SELECT addr_id FROM addr_ins)`
	m := map[string]interface{}{
		"line_1":     address.Line1,
		"line_2":     address.Line2,
		"city":       address.City,
		"country":    address.Country,
		"state":      address.State,
		"zip":        address.ZIP,
		"latitude":   address.Latitude,
		"longitude":  address.Longitude,
		"phone":      address.Phone,
		"created_at": address.CreatedAt,
		"updated_at": address.UpdatedAt,
		"user_id":    userId,
	}
	if err := r.DB.GetContext(ctx, address, query, m); err != nil {
		if err, ok := err.(*pq.Error); ok && err.Code.Name() == "unique_violation" {
			log.Printf("Could not create a address: %v. Reason: %v\n", address, err.Code.Name())
			return nil, apperrors.NewConflict("address", "address")
		}
		log.Printf("Could not create address : %v. Reason: %v\n", address, err)
		return nil, apperrors.NewInternal()
	}
	return address, nil
}

func (r *pGAddressRepository) AddressFindByID(ctx context.Context, addressId int64) (*model.Address, error) {
	address := model.Address{}
	query := "SELECT * FROM addresses WHERE id=$1"
	if err := r.DB.GetContext(ctx, &address, query, addressId); err != nil {
		log.Printf("Unable to get address: %v. Err: %v\n", address.City, err)
		id := strconv.Itoa(int(addressId))
		return nil, apperrors.NewNotFound("address_id", id)
	}
	return &address, nil
}

func (r *pGAddressRepository) AddressUpdate(ctx context.Context, addressId int64, address *model.Address) (*model.Address, error) {
	query := `UPDATE addresses SET line_1=:line_1, line_2=:line_2, city=:city, country=:country, state=:state, zip=:zip, latitude=:latitude, longitude=:longitude, phone=:phone, updated_at=:updated_at WHERE id=$1`
	m := map[string]interface{}{
		"line_1":     address.Line1,
		"line_2":     address.Line2,
		"city":       address.City,
		"country":    address.Country,
		"state":      address.State,
		"zip":        address.ZIP,
		"latitude":   address.Latitude,
		"longitude":  address.Longitude,
		"phone":      address.Phone,
		"created_at": address.CreatedAt,
		"updated_at": address.UpdatedAt,
	}
	if err := r.DB.GetContext(ctx, &address, query, addressId, m); err != nil {
		log.Printf("Unable to get address: %v. Err: %v\n", address.City, err)
		id := strconv.Itoa(int(addressId))
		return nil, apperrors.NewNotFound("address_id", id)
	}
	return address, nil
}

func (r *pGAddressRepository) AddressDelete(ctx context.Context, addressId int64) (*model.Address, error) {
	address := model.Address{}
	query := "SELECT * FROM addresses WHERE id=$1"
	if err := r.DB.GetContext(ctx, &address, query, addressId); err != nil {
		log.Printf("Unable to get address: %v. Err: %v\n", address, err)
		id := strconv.Itoa(int(addressId))
		return nil, apperrors.NewNotFound("product", id)
	}
	query2 := "DELETE FROM addresses WHERE id = $1"
	_, err2 := r.DB.ExecContext(ctx, query2, address)
	if err2 != nil {
		log.Printf("Unable to delete address: %v. Err: %v\n", address, err2)
		id := strconv.Itoa(int(addressId))
		return nil, apperrors.NewNotFound("address_id", id)
	}
	return &address, nil
}
