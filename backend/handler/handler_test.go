package handler

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	// "backend/model/mocks"
	// "backend/model"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	// "github.com/stretchr/testify/mock"
	"strconv"
)

func TestSamepleGetList(t *testing.T) {
	// Setup
	gin.SetMode(gin.TestMode)

	t.Run("Success", func(t *testing.T) {
		rr := httptest.NewRecorder()
		router := gin.Default()
		NewHandler(&Config{
			R: router,
		})
		request, err := http.NewRequest(http.MethodGet, "/", nil)
		fmt.Println("err", err)
		assert.NoError(t, err)
		router.ServeHTTP(rr, request)
		type JsonRequest struct {
			Int int    `json:"int"`
			Str string `json:"str"`
		}
		json1 := JsonRequest{Int: 1, Str: "str1"}
		json2 := JsonRequest{Int: 2, Str: "str2"}
		jsons := []JsonRequest{json1, json2}
		respBody, err := json.Marshal(gin.H{
			"jsons": jsons,
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

func TestSameplePost(t *testing.T) {
	// Setup
	gin.SetMode(gin.TestMode)

	t.Run("Success", func(t *testing.T) {
		rr := httptest.NewRecorder()
		router := gin.Default()
		NewHandler(&Config{
			R: router,
		})
		type JsonRequest struct {
			Int int    `json:"int"`
			Str string `json:"str"`
		}
		json1 := JsonRequest{Int: 1, Str: "str1"}
		reqBody, err := json.Marshal(gin.H{
			"int": json1.Int,
			"str": json1.Str,
		})
		fmt.Println("err", err)
		assert.NoError(t, err)
		request, err := http.NewRequest(http.MethodPost, "/", bytes.NewBuffer(reqBody))
		fmt.Println("err", err)
		assert.NoError(t, err)
		router.ServeHTTP(rr, request)
		respBody, err := json.Marshal(gin.H{
			"int": json1.Int,
			"str": json1.Str,
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

func TestSamepleDelete(t *testing.T) {
	// Setup
	gin.SetMode(gin.TestMode)

	t.Run("Success", func(t *testing.T) {
		rr := httptest.NewRecorder()
		router := gin.Default()
		NewHandler(&Config{
			R: router,
		})
		type JsonRequest struct {
			Str string `json:"str"`
			Int int    `json:"int"`
		}
		json1 := JsonRequest{Str: "str1", Int: 1}
		uid := strconv.Itoa(int(json1.Int))
		reqBody, err := json.Marshal(gin.H{
			"int": json1.Int,
			"str": json1.Str,
		})
		fmt.Println("err", err)
		assert.NoError(t, err)
		request, err := http.NewRequest(http.MethodDelete, "/"+uid, bytes.NewBuffer(reqBody))
		fmt.Println("err", err)
		assert.NoError(t, err)
		router.ServeHTTP(rr, request)
		respBody, err := json.Marshal(gin.H{
			"int": json1.Int,
			"str": json1.Str,
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

func TestSampleGetFindById(t *testing.T) {
	gin.SetMode(gin.TestMode)

	t.Run("Success", func(t *testing.T) {
		rr := httptest.NewRecorder()
		router := gin.Default()
		NewHandler(&Config{
			R: router,
		})
		type JsonRequest struct {
			Int int    `json:"int"`
			Str string `json:"str"`
		}
		json1 := JsonRequest{Int: 1, Str: "str1"}
		uid := strconv.Itoa(int(json1.Int))
		request, err := http.NewRequest(http.MethodGet, "/"+uid, nil)
		fmt.Println("err", err)
		assert.NoError(t, err)
		router.ServeHTTP(rr, request)

		// json2 := JsonRequest{Int: 2, Str: "str2"}
		// jsons := []JsonRequest{json1, json2}
		respBody, err := json.Marshal(gin.H{
			"jsons": json1,
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


func TestSampleGetFindByName(t *testing.T) {
	gin.SetMode(gin.TestMode)

	t.Run("Success", func(t *testing.T) {
		rr := httptest.NewRecorder()
		router := gin.Default()
		NewHandler(&Config{
			R: router,
		})
		name := "name"
		request, err := http.NewRequest(http.MethodGet, "/search/"+name, nil)
		fmt.Println("err", err)
		assert.NoError(t, err)
		router.ServeHTTP(rr, request)

		// json2 := JsonRequest{Int: 2, Str: "str2"}
		// jsons := []JsonRequest{json1, json2}
		respBody, err := json.Marshal(gin.H{
			"name": name,
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

func TestSampleUpdate(t *testing.T) {
	gin.SetMode(gin.TestMode)

	t.Run("Success", func(t *testing.T) {
		rr := httptest.NewRecorder()
		router := gin.Default()
		NewHandler(&Config{
			R: router,
		})
		type JsonRequest struct {
			Int int    `json:"int"`
			Str string `json:"str"`
		}
		json1 := JsonRequest{Int: 1, Str: "str1"}
		reqBody, err := json.Marshal(gin.H{
			"int": json1.Int,
			"str": json1.Str,
		})
		fmt.Println("err", err)
		assert.NoError(t, err)
		uid := strconv.Itoa(int(json1.Int))
		request, err := http.NewRequest(http.MethodPut, "/"+uid, bytes.NewBuffer(reqBody))
		fmt.Println("err", err)
		assert.NoError(t, err)
		router.ServeHTTP(rr, request)
		respBody, err := json.Marshal(gin.H{
			"int": json1.Int,
			"str": json1.Str,
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
