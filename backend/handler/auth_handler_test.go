package handler

import (
	"backend/model"
	"backend/model/mocks"
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestForgotPassword(t *testing.T) {
	gin.SetMode(gin.TestMode)

	router := gin.Default()
	mockAuthService := new(mocks.MockAuthService)
	mockTokenService := new(mocks.MockTokenService)

	NewHandler(&Config{
		R:            router,
		AuthService:  mockAuthService,
		TokenService: mockTokenService,
	})
	t.Run("Success", func(t *testing.T) {
		rr := httptest.NewRecorder()
		email := "email@email.com"
		mockTokenResp := "token"
		mockTokenService.On("ForgotPasswordToken", mock.AnythingOfType("*context.emptyCtx"), email, "").Return(mockTokenResp, nil)
		reqBody, _ := json.Marshal(gin.H{
			"email": email,
		})
		mockReset := &model.PasswordReset{
			ID:    0,
			Email: email,
			Token: mockTokenResp,
		}
		request, err := http.NewRequest(http.MethodPost, "/forgot", bytes.NewBuffer(reqBody))
		request.Header.Set("Content-Type", "application/json")
		mockAuthService.On("ForgotPassword", mock.AnythingOfType("*context.emptyCtx"), mockReset).Return(nil)
		fmt.Println("err", err)
		assert.NoError(t, err)
		router.ServeHTTP(rr, request)
		respBody, err := json.Marshal(gin.H{
			"message": "Check your mail",
		})
		fmt.Println("err", err)
		assert.NoError(t, err)
		assert.Equal(t, http.StatusOK, rr.Code)
		fmt.Println("http.StatusOK", http.StatusOK)
		assert.Equal(t, respBody, rr.Body.Bytes())
		fmt.Println(string(respBody))
		fmt.Println(rr.Body.String())
	})
}

// func TestResetPassword(t *testing.T) {
// 	gin.SetMode(gin.TestMode)

// 	router := gin.Default()
// 	mockAuthService := new(mocks.MockAuthService)
// 	NewHandler(&Config{
// 		R:           router,
// 		AuthService: mockAuthService,
// 	})

// 	token := "token"
// 	email := "email@email.com"
// 	newPassword := "password10"

// 	t.Run("Success", func(t *testing.T) {
// 		rr := httptest.NewRecorder()
// 		mockReset := &model.PasswordReset{
// 			Email: email,
// 			Token: token,
// 		}
// 		mockArgs := mock.Arguments{
// 			mock.AnythingOfType("*context.emptyCtx"),
// 			newPassword,
// 			mockReset,
// 		}

// 		reqBody, _ := json.Marshal(gin.H{
// 			"token":            token,
// 			"email":            email,
// 			"password":         newPassword,
// 			"password_confirm": newPassword,
// 		})
// 		request, err := http.NewRequest(http.MethodPost, "/reset", bytes.NewBuffer(reqBody))
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		router.ServeHTTP(rr, request)
// 		request.Header.Set("Content-Type", "application/json")
// 		mockAuthService.On("ResetPassword", mock.AnythingOfType("*context.emptyCtx"), mockArgs...).Return(nil)
// 		respBody, err := json.Marshal(gin.H{
// 			"message": "success",
// 			"status":  http.StatusOK,
// 		})
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		assert.Equal(t, http.StatusOK, rr.Code) //NG
// 		fmt.Println("http.StatusOK", http.StatusOK)
// 		assert.Equal(t, respBody, rr.Body.Bytes())
// 		fmt.Println(string(respBody))
// 		fmt.Println(rr.Body.String())
// 	})
// }
