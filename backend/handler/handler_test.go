package handler

// import (
// 	"bytes"
// 	"encoding/json"
// 	"fmt"
// 	"net/http"
// 	"net/http/httptest"
// 	"testing"

// 	"github.com/gin-gonic/gin"
// 	"github.com/stretchr/testify/assert"
// )

// func TestSamepleGetList(t *testing.T) {
// 	// Setup
// 	gin.SetMode(gin.TestMode)

// 	t.Run("Success", func(t *testing.T) {
// 		rr := httptest.NewRecorder()
// 		router := gin.Default()
// 		NewHandler(&Config{
// 			R: router,
// 		})
// 		request, err := http.NewRequest(http.MethodGet, "/", nil)
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		router.ServeHTTP(rr, request)
// 		type JsonRequest struct {
// 			Str string `json:"str"`
// 			Int int    `json:"int"`
// 		}
// 		json1 := JsonRequest{Str: "str1", Int: 1}
// 		json2 := JsonRequest{Str: "str2", Int: 2}
// 		jsons := []JsonRequest{json1, json2}
// 		respBody, err := json.Marshal(gin.H{
// 			"jsons": jsons,
// 		})
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)

// 		assert.Equal(t, http.StatusOK, rr.Code)
// 		fmt.Println("http.StatusOK", http.StatusOK)
// 		assert.Equal(t, respBody, rr.Body.Bytes())
// 		fmt.Println("respBody", string(respBody))
// 		fmt.Println("rr.Body.Bytes()", rr.Body.String())
// 	})
// 	t.Run("json null", func(t *testing.T) {
		// rr := httptest.NewRecorder()
		// router := gin.Default()
		// NewHandler(&Config{
		// 	R: router,
		// })
		// request, err := http.NewRequest(http.MethodGet, "/", nil)
		// fmt.Println("err", err)
		// assert.NoError(t, err)
		// router.ServeHTTP(rr, request)
		// respBody, err := json.Marshal(gin.H{
		// 	"error": "null",
		// })
		// fmt.Println("err", err)
		// assert.NoError(t, err)

		// assert.Equal(t, http.StatusOK, rr.Code)
		// fmt.Println("http.StatusOK", http.StatusOK)
		// assert.Equal(t, respBody, rr.Body.Bytes())
		// fmt.Println("respBody", string(respBody))
		// fmt.Println("rr.Body.Bytes()", rr.Body.String())
// 	})
// }

// func TestSameplePost(t *testing.T) {
// 	// Setup
// 	gin.SetMode(gin.TestMode)

// 	t.Run("Success", func(t *testing.T) {
// 		rr := httptest.NewRecorder()
// 		router := gin.Default()
// 		NewHandler(&Config{
// 			R: router,
// 		})
// 		type JsonRequest struct {
// 			Str string `json:"str"`
// 			Int int    `json:"int"`
// 		}
// 		json1 := JsonRequest{Str: "str1", Int: 1}
// 		reqBody, err := json.Marshal(gin.H{
// 			"int": json1.Int,
// 			"str": json1.Str,
// 		})
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		request, err := http.NewRequest(http.MethodPost, "/", bytes.NewBuffer(reqBody))
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		router.ServeHTTP(rr, request)
// 		respBody, err := json.Marshal(gin.H{
// 			"int": json1.Int,
// 			"str": json1.Str,
// 		})
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)

// 		assert.Equal(t, http.StatusOK, rr.Code)
// 		fmt.Println("http.StatusOK", http.StatusOK)
// 		assert.Equal(t, respBody, rr.Body.Bytes())
// 		fmt.Println("respBody", string(respBody))
// 		fmt.Println("rr.Body.Bytes()", rr.Body.String())
// 	})
// }

// func TestSameplePut(t *testing.T) {
// 	// Setup
// 	gin.SetMode(gin.TestMode)

// 	t.Run("Success", func(t *testing.T) {
// 		rr := httptest.NewRecorder()
// 		router := gin.Default()
// 		NewHandler(&Config{
// 			R: router,
// 		})
// 		type JsonRequest struct {
// 			Str string `json:"str"`
// 			Int int    `json:"int"`
// 		}
// 		json1 := JsonRequest{Str: "str1", Int: 1}
// 		reqBody, err := json.Marshal(gin.H{
// 			"int": json1.Int,
// 			"str": json1.Str,
// 		})
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		request, err := http.NewRequest(http.MethodPut, "/:id", bytes.NewBuffer(reqBody))
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		router.ServeHTTP(rr, request)
// 		respBody, err := json.Marshal(gin.H{
// 			"int": json1.Int,
// 			"str": json1.Str,
// 		})
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		assert.Equal(t, http.StatusOK, rr.Code)
// 		fmt.Println("http.StatusOK", http.StatusOK)
// 		assert.Equal(t, respBody, rr.Body.Bytes())
// 		fmt.Println("respBody", string(respBody))
// 		fmt.Println("rr.Body.Bytes()", rr.Body.String())
// 	})
// }

// func TestSamepleDelete(t *testing.T) {
// 	// Setup
// 	gin.SetMode(gin.TestMode)

// 	t.Run("Success", func(t *testing.T) {
// 		rr := httptest.NewRecorder()
// 		router := gin.Default()
// 		NewHandler(&Config{
// 			R: router,
// 		})
// 		type JsonRequest struct {
// 			Str string `json:"str"`
// 			Int int    `json:"int"`
// 		}
// 		json1 := JsonRequest{Str: "str1", Int: 1}
// 		reqBody, err := json.Marshal(gin.H{
// 			"int": json1.Int,
// 			"str": json1.Str,
// 		})
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		request, err := http.NewRequest(http.MethodDelete, "/:id", bytes.NewBuffer(reqBody))
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		router.ServeHTTP(rr, request)
// 		respBody, err := json.Marshal(gin.H{
// 			"int": json1.Int,
// 			"str": json1.Str,
// 		})
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		assert.Equal(t, http.StatusOK, rr.Code)
// 		fmt.Println("http.StatusOK", http.StatusOK)
// 		assert.Equal(t, respBody, rr.Body.Bytes())
// 		fmt.Println("respBody", string(respBody))
// 		fmt.Println("rr.Body.Bytes()", rr.Body.String())
// 	})
// }

// func TestSampleGetFindById(t *testing.T) {
// 	// Setup
// 	gin.SetMode(gin.TestMode)

// 	t.Run("Success", func(t *testing.T) {
// 		rr := httptest.NewRecorder()
// 		router := gin.Default()
// 		NewHandler(&Config{
// 			R: router,
// 		})
// 		type JsonRequest struct {
// 			Str string `json:"str"`
// 			Int int    `json:"int"`
// 		}
// 		json1 := JsonRequest{Str: "str1", Int: 1}
// 		reqBody, err := json.Marshal(gin.H{
// 			"int": json1.Int,
// 			"str": json1.Str,
// 		})
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		request, err := http.NewRequest(http.MethodGet, "/:id", bytes.NewBuffer(reqBody))
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		router.ServeHTTP(rr, request)
// 		respBody, err := json.Marshal(gin.H{
// 			"int": json1.Int,
// 			"str": json1.Str,
// 		})
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		assert.Equal(t, http.StatusOK, rr.Code)
// 		fmt.Println("http.StatusOK", http.StatusOK)
// 		assert.Equal(t, respBody, rr.Body.Bytes())
// 		fmt.Println("respBody", string(respBody))
// 		fmt.Println("rr.Body.Bytes()", rr.Body.String())
// 	})
// }
