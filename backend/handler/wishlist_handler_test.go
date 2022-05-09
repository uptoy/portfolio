package handler

import (
	"backend/model"
	"backend/model/mocks"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strconv"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestWishlistGet(t *testing.T) {
	gin.SetMode(gin.TestMode)
	t.Run("Success", func(t *testing.T) {
		rr := httptest.NewRecorder()
		router := gin.Default()
		mockWishlistService := new(mocks.MockWishlistService)
		NewHandler(&Config{
			R:               router,
			WishlistService: mockWishlistService,
		})

		p1 := model.Product{
			Id:            1,
			ProductName:   "product_name1",
			Slug:          "slug1",
			Brand:         "brand1",
			Price:         1,
			CategoryId:    1,
			CountInStock:  1,
			Description:   "description1",
			CreatedAt:     time.Now(),
			UpdatedAt:     time.Now(),
		}
		p2 := model.Product{
			Id:            2,
			ProductName:   "product_name2",
			Slug:          "slug2",
			Price:         2,
			CategoryId:    2,
			CountInStock:  2,
			Description:   "description2",
			CreatedAt:     time.Now(),
			UpdatedAt:     time.Now(),
		}
		uid, _ := uuid.NewRandom()
		mockUser := &model.User{
			UID:   uid,
			Username:  "username",
			Email: "email@email.com",
		}
		userId := mockUser.UID
		wishlist := []model.Product{p1, p2}
		mockWishlistService.On("WishlistGet", mock.AnythingOfType("*context.emptyCtx"), userId).Return(wishlist, nil)
		request, err := http.NewRequest(http.MethodGet, "/wishlist", nil)
		fmt.Println("err", err)
		assert.NoError(t, err)
		router.ServeHTTP(rr, request)
		respBody, err := json.Marshal(gin.H{
			"data": wishlist,
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

func TestWishlistCreate(t *testing.T) {
	gin.SetMode(gin.TestMode)
	t.Run("Success", func(t *testing.T) {
		rr := httptest.NewRecorder()
		router := gin.Default()
		mockWishlistService := new(mocks.MockWishlistService)
		NewHandler(&Config{
			R:               router,
			WishlistService: mockWishlistService,
		})

		p1 := model.Product{
			Id:            1,
			ProductName:   "product_name1",
			Slug:          "slug1",
			Brand:         "brand1",
			Price:         1,
			CategoryId:    1,
			CountInStock:  1,
			Description:   "description1",
			CreatedAt:     time.Now(),
			UpdatedAt:     time.Now(),
		}
		p2 := model.Product{
			Id:            2,
			ProductName:   "product_name2",
			Slug:          "slug2",
			Brand:         "brand2",
			Price:         2,
			CategoryId:    2,
			CountInStock:  2,
			Description:   "description2",
			CreatedAt:     time.Now(),
			UpdatedAt:     time.Now(),
		}
		uid, _ := uuid.NewRandom()
		mockUser := &model.User{
			UID:   uid,
			Username:  "username",
			Email: "email@email.com",
		}
		wishlist := []model.Product{p1, p2}
		productId := strconv.Itoa(int(p2.Id))
		userId := mockUser.UID
		mockWishlistService.On("WishlistCreate", mock.AnythingOfType("*context.emptyCtx"), userId, productId).Return(wishlist, nil)
		request, err := http.NewRequest(http.MethodPost, "/wishlist", nil)
		fmt.Println("err", err)
		assert.NoError(t, err)
		router.ServeHTTP(rr, request)
		respBody, err := json.Marshal(gin.H{
			"data": wishlist,
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

func TestWishlistDelete(t *testing.T) {
	gin.SetMode(gin.TestMode)
	t.Run("Success", func(t *testing.T) {
		rr := httptest.NewRecorder()
		router := gin.Default()
		mockWishlistService := new(mocks.MockWishlistService)
		NewHandler(&Config{
			R:               router,
			WishlistService: mockWishlistService,
		})

		p1 := model.Product{
			Id:            1,
			ProductName:   "product_name1",
			Slug:          "slug1",
			Brand:         "brand1",
			Price:         1,
			CategoryId:    1,
			CountInStock:  1,
			Description:   "description1",
			CreatedAt:     time.Now(),
			UpdatedAt:     time.Now(),
		}
		p2 := model.Product{
			Id:            2,
			ProductName:   "product_name2",
			Slug:          "slug2",
			Brand:         "brand2",
			Price:         2,
			CategoryId:    2,
			CountInStock:  2,
			Description:   "description2",
			CreatedAt:     time.Now(),
			UpdatedAt:     time.Now(),
		}
		wishlist := []model.Product{p1}
		uid, _ := uuid.NewRandom()
		mockUser := &model.User{
			UID:   uid,
			Username:  "username",
			Email: "email@email.com",
		}
		productId := strconv.Itoa(int(p2.Id))
		userId := mockUser.UID
		mockWishlistService.On("WishlistDelete", mock.AnythingOfType("*context.emptyCtx"), userId, productId).Return(wishlist, nil)
		request, err := http.NewRequest(http.MethodDelete, "/wishlist/"+productId, nil)
		fmt.Println("err", err)
		assert.NoError(t, err)
		router.ServeHTTP(rr, request)
		respBody, err := json.Marshal(gin.H{
			"data": wishlist,
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

func TestWishlistClear(t *testing.T) {
	gin.SetMode(gin.TestMode)
	t.Run("Success", func(t *testing.T) {
		rr := httptest.NewRecorder()
		router := gin.Default()
		mockWishlistService := new(mocks.MockWishlistService)
		NewHandler(&Config{
			R:               router,
			WishlistService: mockWishlistService,
		})
		uid, _ := uuid.NewRandom()
		mockUser := &model.User{
			UID:   uid,
			Username:  "username",
			Email: "email@email.com",
		}
		userId := mockUser.UID
		mockWishlistService.On("WishlistClear", mock.AnythingOfType("*context.emptyCtx"), userId).Return(nil)
		request, err := http.NewRequest(http.MethodDelete, "/wishlist/clear", nil)
		fmt.Println("err", err)
		assert.NoError(t, err)
		router.ServeHTTP(rr, request)
		respBody, err := json.Marshal(gin.H{
			"data": "OK",
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
