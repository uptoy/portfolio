package handler

import (
	"backend/model"
	"backend/model/mocks"
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestCartList(t *testing.T) {
	gin.SetMode(gin.TestMode)

	t.Run("Success", func(t *testing.T) {
		rr := httptest.NewRecorder()
		router := gin.Default()
		mockCartService := new(mocks.MockCartService)
		NewHandler(&Config{
			R:              router,
			CartService: mockCartService,
		})
		product1 := model.Product{
			ProductId:     1,
			ProductName:   "product_name1",
			Slug:          "slug1",
			ProductImage:  "http://placehold.jp/150x150.png",
			Brand:         "brand1",
			Price:         1,
			CategoryName:  "category_name1",
			CountInStock:  1,
			Description:   "description1",
			AverageRating: 1,
			CreatedAt:     time.Now(),
			UpdatedAt:     time.Now(),
		}
		product2 := model.Product{
			ProductId:     2,
			ProductName:   "product_name2",
			Slug:          "slug2",
			ProductImage:  "http://placehold.jp/150x150.png",
			Brand:         "brand2",
			Price:         2,
			CategoryName:  "category_name2",
			CountInStock:  2,
			Description:   "description2",
			AverageRating: 2,
			CreatedAt:     time.Now(),
			UpdatedAt:     time.Now(),
		}

		type CartItemRequest struct {
			Product  model.Product `json:"product"`
			Quantity int64         `json:"quantity"`
		}
		type UserRequest struct {
			UserId uuid.UUID `json:"user_id"`
			Name       string `json:"name"`
			Email      string `json:"email"`
			ProfileUrl string `json:"profile_url"`
			Password   string `json:"password"`
		}

		type CartRequest struct {
			User       UserRequest       `json:"user"`
			CartItem   []CartItemRequest `json:"product"`
			TotalPrice int64             `json:"total_price"`
		}
		user1 := UserRequest{Name: "name", Email: "email", ProfileUrl: "profile_url", Password: "password"}
		cart_item1 := CartItemRequest{Product: product1, Quantity: 1}
		cart_item2 := CartItemRequest{Product: product2, Quantity: 2}
		cart_item_list := []CartItemRequest{cart_item1, cart_item2}
		cart := CartRequest{user1, cart_item_list, 100}
		mockCartService.On("CartList", mock.AnythingOfType("*context.emptyCtx")).Return(cart, nil)
		request, err := http.NewRequest(http.MethodGet, "/carts", nil)
		fmt.Println("err", err)
		assert.NoError(t, err)
		router.ServeHTTP(rr, request)

		respBody, err := json.Marshal(gin.H{
			"cart": cart,
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

func TestCartAdd(t *testing.T) {
	gin.SetMode(gin.TestMode)

	t.Run("Success", func(t *testing.T) {
		rr := httptest.NewRecorder()
		router := gin.Default()
		mockCartService := new(mocks.MockCartService)
		NewHandler(&Config{
			R:              router,
			CartService: mockCartService,
		})
		product1 := model.Product{
			ProductId:     1,
			ProductName:   "product_name1",
			Slug:          "slug1",
			ProductImage:  "http://placehold.jp/150x150.png",
			Brand:         "brand1",
			Price:         1,
			CategoryName:  "category_name1",
			CountInStock:  1,
			Description:   "description1",
			AverageRating: 1,
			CreatedAt:     time.Now(),
			UpdatedAt:     time.Now(),
		}
		product2 := model.Product{
			ProductId:     2,
			ProductName:   "product_name2",
			Slug:          "slug2",
			ProductImage:  "http://placehold.jp/150x150.png",
			Brand:         "brand2",
			Price:         2,
			CategoryName:  "category_name2",
			CountInStock:  2,
			Description:   "description2",
			AverageRating: 2,
			CreatedAt:     time.Now(),
			UpdatedAt:     time.Now(),
		}

		type CartItemRequest struct {
			Product  model.Product `json:"product"`
			Quantity int64         `json:"quantity"`
		}
		type UserRequest struct {
			Name       string `json:"name"`
			Email      string `json:"email"`
			ProfileUrl string `json:"profile_url"`
			Password   string `json:"password"`
		}

		type CartRequest struct {
			User       UserRequest       `json:"user"`
			CartItem   []CartItemRequest `json:"product"`
			TotalPrice int64             `json:"total_price"`
		}
		user1 := UserRequest{Name: "name", Email: "email", ProfileUrl: "profile_url", Password: "password"}
		cart_item1 := CartItemRequest{Product: product1, Quantity: 1}
		cart_item2 := CartItemRequest{Product: product2, Quantity: 2}
		cart_item_list := []CartItemRequest{cart_item1, cart_item2}
		cart := CartRequest{user1, cart_item_list, 100}
		fmt.Println(cart)
		reqBody, err := json.Marshal(gin.H{
			"cart":  cart,
		})
		fmt.Println("err", err)
		assert.NoError(t, err)
		mockCartService.On("CartAdd", mock.AnythingOfType("*context.emptyCtx"), mock.AnythingOfType("*model.Cart")).Return(cart, nil)
		request, err := http.NewRequest(http.MethodPost, "/cart_add", bytes.NewBuffer(reqBody))
		fmt.Println("err", err)
		assert.NoError(t, err)
		router.ServeHTTP(rr, request)
		respBody, err := json.Marshal(gin.H{
			"cart": cart,
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


func TestCartRemove(t *testing.T) {
	gin.SetMode(gin.TestMode)

	t.Run("Success", func(t *testing.T) {
		rr := httptest.NewRecorder()
		router := gin.Default()
		mockCartService := new(mocks.MockCartService)
		NewHandler(&Config{
			R:              router,
			CartService: mockCartService,
		})
		json1 := &model.Product{
			ProductId:     1,
			ProductName:   "p1",
			Slug:          "s1",
			ProductImage:  "http://placehold.jp/150x150.png",
			Brand:         "brand",
			Price:         1,
			CategoryName:  "category1",
			CountInStock:  1,
			Description:   "desc",
			AverageRating: 1,
			CreatedAt:     time.Now(),
			UpdatedAt:     time.Now(),
		}
		mockCartService.On("CartRemove", mock.AnythingOfType("*context.emptyCtx"), ).Return(json1, nil)
		request, err := http.NewRequest(http.MethodDelete, "/cart_remove", nil)
		fmt.Println("err", err)
		assert.NoError(t, err)
		router.ServeHTTP(rr, request)
		respBody, err := json.Marshal(gin.H{
			"cart": json1,
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
