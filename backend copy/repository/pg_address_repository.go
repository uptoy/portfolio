package repository

import (
	"backend/model"
	// "backend/model/apperrors"
	"context"
	// "log"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

type pGAddressRepository struct {
	DB *sqlx.DB
}

func NewAddressRepository(db *sqlx.DB) model.AddressRepository {
	return &pGAddressRepository{
		DB: db,
	}
}

func (r *pGAddressRepository) AddressCreate(ctx context.Context, userId uuid.UUID, address *model.Address) (*model.Address, error) {
	q := `WITH addr_ins AS (
		INSERT INTO address (address, city, state, country, zip, created_at, updated_at)
		VALUES (:address, :city, :state, :country, :zip , :created_at, :updated_at)
		RETURNING id AS addr_id
	)
	INSERT INTO user_address (user_id, address_id)
	VALUES (:user_id, (SELECT addr_id FROM addr_ins))
	RETURNING (SELECT addr_id FROM addr_ins)`

	m := map[string]interface{}{
		"address":    address.Address,
		"city":       address.City,
		"state":      address.State,
		"country":    address.Country,
		"zip":        address.ZIP,
		"created_at": address.CreatedAt,
		"updated_at": address.UpdatedAt,
		"user_id":    userId,
	}

	var id int64
	rows, err := r.DB.NamedQuery(q, m)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		rows.Scan(&id)
	}
	address.ID = id
	return address, nil
}
func (r *pGAddressRepository) AddressGet(ctx context.Context, userID uuid.UUID, addressID int64) (*model.Address, error) {
	q := `SELECT a.* FROM address a LEFT JOIN user_address ua ON a.id = ua.address_id WHERE ua.user_id = $1 AND a.id = $2`
	var addr model.Address
	if err := r.DB.Get(&addr, q, userID, addressID); err != nil {
		return nil, err
	}
	return &addr, nil
}
// GetAll gets the all user's addresses
func (r *pGAddressRepository) AddressList(ctx context.Context, userID uuid.UUID) ([]*model.Address, error) {
	q := `SELECT a.* FROM address a LEFT JOIN user_address ua ON a.id = ua.address_id WHERE ua.user_id = $1`
	addressList := make([]*model.Address, 0)
	if err := r.DB.SelectContext(ctx, &addressList, q, userID); err != nil {
		return nil, err
	}

	return addressList, nil
}

// Update updates the address
func (r *pGAddressRepository) AddressUpdate(ctx context.Context, addressId int64, address *model.Address) (*model.Address, error) {
	query := `UPDATE address SET address=:address, city=:city, state=:state, country=:country, zip=:zip, updated_at=:updated_at WHERE id=:id`
	if _, err := r.DB.NamedExecContext(ctx, query, address); err != nil {
		return nil, err
	}
	return address, nil
}

// Delete hard deletes the address
func (r *pGAddressRepository) AddressDelete(ctx context.Context, addressId int64) error {
	query := `DELETE FROM address WHERE id = :id`
	if _, err := r.DB.NamedExecContext(ctx, query, map[string]interface{}{"id": addressId}); err != nil {
		return err
	}
	return nil
}
