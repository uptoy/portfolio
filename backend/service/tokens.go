package service

import (
    "crypto/rsa"
    "log"
    "time"

    "github.com/dgrijalva/jwt-go"
    // "github.com/google/uuid"
    "backend/model"
)

// IDTokenCustomClaims holds structure of jwt claims of idToken
type IDTokenCustomClaims struct {
    User *model.User `json:"user"`
    jwt.StandardClaims
}

// generateIDToken generates an IDToken which is a jwt with myCustomClaims
// Could call this GenerateIDTokenString, but the signature makes this fairly clear
func generateIDToken(u *model.User, key *rsa.PrivateKey) (string, error) {
    unixTime := time.Now().Unix()
    tokenExp := unixTime + 60*15 // 15 minutes from current time

    claims := IDTokenCustomClaims{
        User: u,
        StandardClaims: jwt.StandardClaims{
            IssuedAt:  unixTime,
            ExpiresAt: tokenExp,
        },
    }

    token := jwt.NewWithClaims(jwt.SigningMethodRS256, claims)
    ss, err := token.SignedString(key)

    if err != nil {
        log.Println("Failed to sign id token string")
        return "", err
    }

    return ss, nil
}
