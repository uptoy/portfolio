package handler

// import (
// 	"backend/model"
// 	"backend/model/mocks"
// 	"bytes"
// 	"encoding/json"
// 	// "fmt"
// 	"github.com/gin-gonic/gin"
// 	"github.com/stretchr/testify/assert"
// 	"github.com/stretchr/testify/mock"
// 	"net/http"
// 	"net/http/httptest"
// 	"testing"
// )

// func TestForgotPassword(t *testing.T) {
// 	gin.SetMode(gin.TestMode)

// 	router := gin.Default()
// 	mockAuthService := new(mocks.MockAuthService)
// 	mockTokenService := new(mocks.MockTokenService)

// 	NewHandler(&Config{
// 		R:            router,
// 		AuthService:  mockAuthService,
// 		TokenService: mockTokenService,
// 	})
// 	t.Run("Success", func(t *testing.T) {
// 		rr := httptest.NewRecorder()
// 		email := "email@email.com"
// 		mockTokenResp := "token"
// 		mockTokenService.On("ForgotPasswordToken", mock.AnythingOfType("*context.emptyCtx"), email, "").Return(mockTokenResp, nil)
// 		reqBody, _ := json.Marshal(gin.H{
// 			"email": email,
// 		})
// 		mockReset := &model.PasswordReset{
// 			ID:    0,
// 			Email: email,
// 			Token: mockTokenResp,
// 		}
// 		request, err := http.NewRequest(http.MethodPost, "/forgot_password", bytes.NewBuffer(reqBody))
// 		request.Header.Set("Content-Type", "application/json")
// 		mockAuthService.On("ForgotPassword", mock.AnythingOfType("*context.emptyCtx"), mockReset).Return(nil)
// 		// fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		router.ServeHTTP(rr, request)
// 		respBody, err := json.Marshal(gin.H{
// 			"message": "Check your mail",
// 		})
// 		// fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		assert.Equal(t, http.StatusOK, rr.Code)
// 		// fmt.Println("http.StatusOK", http.StatusOK)
// 		assert.Equal(t, respBody, rr.Body.Bytes())
// 		// fmt.Println(string(respBody))
// 		// fmt.Println(rr.Body.String())
// 	})
// }
