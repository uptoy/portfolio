package handler

//NG

// import (
// 	"bytes"
// 	"encoding/json"
// 	"net/http"
// 	"net/http/httptest"
// 	"testing"

// 	"github.com/gin-gonic/gin"

// 	"github.com/stretchr/testify/assert"
	// "github.com/stretchr/testify/mock"
	// "github.com/google/uuid"
	// "backend/model"
	// "backend/model/apperrors"
	// "backend/model/mocks"
// )

// func TestHandlerSampleGet(t *testing.T) {
// 		gin.SetMode(gin.TestMode)
// 	router := gin.Default()
// 	NewHandler(&Config{
// 		R: router,
// 	})
// 	t.Run("Api Sample Test Get", func(t *testing.T) {
// 		rr := httptest.NewRecorder()
// 		request, _ := http.NewRequest(http.MethodGet, "/", nil)
// 		router.ServeHTTP(rr, request)
// 		respBody, _ := json.Marshal(gin.H{
// 			"str": "str",
// 		})
// 		assert.Equal(t, http.StatusOK, rr.Code)
// 		assert.Equal(t, respBody, rr.Body.Bytes())
// 	})
// }

// func TestHandlerSamplePost(t *testing.T) {
// 	gin.SetMode(gin.TestMode)
// 	router := gin.Default()
// 	NewHandler(&Config{
// 		R: router,
// 	})
// 	t.Run("Api Sample Test Post Success", func(t *testing.T) {
// 		rr := httptest.NewRecorder()
// 		reqBody, err := json.Marshal(gin.H{
// 			"str":"str",
// 		})
// 		assert.NoError(t, err)
// 		request, err := http.NewRequest(http.MethodPost, "/", bytes.NewBuffer(reqBody))
// 		router.ServeHTTP(rr, request)
// 		assert.NoError(t, err)
// 		request.Header.Set("Content-Type", "application/json")
// 		respBody, _ := json.Marshal(gin.H{
// 			"str": "str",
// 		})
// 		assert.Equal(t, respBody, rr.Body.Bytes())
// 		assert.Equal(t, http.StatusOK, rr.Code)
// 	})
// 	t.Run("Api Sample Test Post Failure type int", func(t *testing.T) {
// 		rr := httptest.NewRecorder()
// 		reqBody, err := json.Marshal(gin.H{
// 			"str":1,
// 		})
// 		assert.NoError(t, err)
// 		request, err := http.NewRequest(http.MethodPost, "/", bytes.NewBuffer(reqBody))
// 		router.ServeHTTP(rr, request)
// 		assert.NoError(t, err)
// 		request.Header.Set("Content-Type", "application/json")
// 		assert.Equal(t, http.StatusBadRequest, rr.Code)
// 	})
// }
