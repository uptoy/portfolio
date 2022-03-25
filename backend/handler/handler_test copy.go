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
// 	"strconv"
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
// 			Int int    `json:"int"`
// 			Str string `json:"str"`
// 		}
// 		json1 := JsonRequest{Int: 1, Str: "str1"}
// 		json2 := JsonRequest{Int: 2, Str: "str2"}
// 		jsons := []JsonRequest{json1, json2}
// 		respBody, err := json.Marshal(gin.H{
// 			"jsons": jsons,
// 		})
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)

// 		assert.Equal(t, http.StatusOK, rr.Code)
// 		fmt.Println("http.StatusOK", http.StatusOK)
// 		assert.Equal(t, respBody, rr.Body.Bytes())
// 		fmt.Println(string(respBody))
// 		fmt.Println(rr.Body.String())
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
// 			Int int    `json:"int"`
// 			Str string `json:"str"`
// 		}
// 		json1 := JsonRequest{Int: 1, Str: "str1"}
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
// 		fmt.Println(string(respBody))
// 		fmt.Println(rr.Body.String())
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
// 		fmt.Println(string(respBody))
// 		fmt.Println(rr.Body.String())
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
// 		id := strconv.Itoa(int(json1.Int))
// 		reqBody, err := json.Marshal(gin.H{
// 			"jsons": id,
// 		})

// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		request, err := http.NewRequest(http.MethodGet, "/"+id, bytes.NewBuffer(reqBody))
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		router.ServeHTTP(rr, request)
// 		respBody, err := json.Marshal(gin.H{
// 			"jsons": id,
// 		})
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		assert.Equal(t, http.StatusOK, rr.Code)
// 		fmt.Println("http.StatusOK", http.StatusOK)
// 		assert.Equal(t, respBody, rr.Body.Bytes())
// 		fmt.Println(string(respBody))
// 		fmt.Println(rr.Body.String())
// 	})
// }

// func TestSampleUpdate(t *testing.T) {
// 	gin.SetMode(gin.TestMode)

// 	t.Run("Success", func(t *testing.T) {
// 		rr := httptest.NewRecorder()
// 		router := gin.Default()
// 		NewHandler(&Config{
// 			R: router,
// 		})
// 		type JsonRequest struct {
// 			Int int    `json:"int"`
// 			Str string `json:"str"`
// 		}
// 		json1 := JsonRequest{Int: 1, Str: "str1"}
// 		reqBody, err := json.Marshal(gin.H{
// 			"int": json1.Int,
// 			"str": json1.Str,
// 		})
// 		fmt.Println("err", err)
// 		assert.NoError(t, err)
// 		uid := strconv.Itoa(int(json1.Int))
// 		request, err := http.NewRequest(http.MethodPut, "/"+uid, bytes.NewBuffer(reqBody))
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
// 		fmt.Println(string(respBody))
// 		fmt.Println(rr.Body.String())
// 	})

// }
