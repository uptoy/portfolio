package service

import (
	"crypto/rsa"
	"backend/model"
	"backend/model/apperrors"
	"log"
	"context"
	"time"
	"github.com/dgrijalva/jwt-go"
	"github.com/google/uuid"
)

// TokenService used for injecting an implementation of TokenRepository
// for use in service methods along with keys and secrets for
// signing JWTs
type TokenService struct {
	// TokenRepository model.TokenRepository
	PrivKey       *rsa.PrivateKey
	PubKey        *rsa.PublicKey
	RefreshSecret string
}

// TSConfig will hold repositories that will eventually be injected into this
// this service layer
type TSConfig struct {
	// TokenRepository model.TokenRepository
	PrivKey       *rsa.PrivateKey
	PubKey        *rsa.PublicKey
	RefreshSecret string
}

// NewTokenService is a factory function for
// initializing a UserService with its repository layer dependencies
func NewTokenService(c *TSConfig) model.TokenService {
	return &TokenService{
			PrivKey:       c.PrivKey,
			PubKey:        c.PubKey,
			RefreshSecret: c.RefreshSecret,
	}
}

// NewPairFromUser creates fresh id and refresh tokens for the current user
// If a previous token is included, the previous token is removed from
// the tokens repository
func (s *TokenService) NewPairFromUser(ctx context.Context, u *model.User, prevTokenID string) (*model.TokenPair, error) {
	// No need to use a repository for idToken as it is unrelated to any data source
	idToken, err := generateIDToken(u, s.PrivKey)

	if err != nil {
			log.Printf("Error generating idToken for uid: %v. Error: %v\n", u.UID, err.Error())
			return nil, apperrors.NewInternal()
	}

	refreshToken, err := generateRefreshToken(u.UID, s.RefreshSecret)

	if err != nil {
			log.Printf("Error generating refreshToken for uid: %v. Error: %v\n", u.UID, err.Error())
			return nil, apperrors.NewInternal()
	}

	// TODO: store refresh tokens by calling TokenRepository methods

	return &model.TokenPair{
			IDToken:      idToken,
			RefreshToken: refreshToken.SS,
	}, nil
}


// RefreshToken holds the actual signed jwt string along with the ID
// We return the id so it can be used without re-parsing the JWT from signed string
type RefreshToken struct {
	SS        string
	ID        string
	ExpiresIn time.Duration
}

// RefreshTokenCustomClaims holds the payload of a refresh token
// This can be used to extract user id for subsequent
// application operations (IE, fetch user in Redis)
type RefreshTokenCustomClaims struct {
	UID uuid.UUID `json:"uid"`
	jwt.StandardClaims
}

// generateRefreshToken creates a refresh token
// The refresh token stores only the user's ID, a string
func generateRefreshToken(uid uuid.UUID, key string) (*RefreshToken, error) {
	currentTime := time.Now()
	tokenExp := currentTime.AddDate(0, 0, 3) // 3 days
	tokenID, err := uuid.NewRandom()         // v4 uuid in the google uuid lib

	if err != nil {
			log.Println("Failed to generate refresh token ID")
			return nil, err
	}

	claims := RefreshTokenCustomClaims{
			UID: uid,
			StandardClaims: jwt.StandardClaims{
					IssuedAt:  currentTime.Unix(),
					ExpiresAt: tokenExp.Unix(),
					Id:        tokenID.String(),
			},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, err := token.SignedString([]byte(key))

	if err != nil {
			log.Println("Failed to sign refresh token string")
			return nil, err
	}

	return &RefreshToken{
			SS:        ss,
			ID:        tokenID.String(),
			ExpiresIn: tokenExp.Sub(currentTime),
	}, nil
}
