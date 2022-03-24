package handler

import (
// 	"encoding/json"

// 	"backend/model"
// 	"backend/model/mocks"
// 	"fmt"
// 	"github.com/gin-gonic/gin"
// 	"github.com/stretchr/testify/assert"
// 	"github.com/stretchr/testify/mock"
// 	"net/http"
// 	"net/http/httptest"
	"testing"
)

func TestProductList(t *testing.T) {
	// gin.SetMode(gin.TestMode)
	// t.Run("Success", func(t *testing.T) {
	// 	rr := httptest.NewRecorder()
	// 	router := gin.Default()
	// 	mockProductService := new(mocks.MockProductService)
	// 	NewHandler(&Config{
	// 		R:              router,
	// 		ProductService: mockProductService,
	// 	})
	// 	mockProductResp := model.Product{
	// 		ProductName:   "product_name",
	// 		Slug:          "slug",
	// 		ProductImage:  "product_name",
	// 		Brand:         "brand",
	// 		Price:         100,
	// 		CategoryName:  "category_name",
	// 		CountInStock:  200,
	// 		Description:   "description",
	// 		AverageRating: 300,
	// 	}
	// 	mockProductService.On("ProductList", mock.AnythingOfType("*context.emptyCtx")).Return(mockProductResp, nil)
	// 	request, err := http.NewRequest(http.MethodGet, "/products", nil)
	// 	fmt.Println("err", err)
	// 	assert.NoError(t, err)
	// 	router.ServeHTTP(rr, request)
	// 	respBody, err := json.Marshal(gin.H{
	// 		"products": mockProductResp,
	// 	})
	// 	fmt.Println("err", err)
	// 	assert.NoError(t, err)

	// 	assert.Equal(t, http.StatusOK, rr.Code)
	// 	fmt.Println("http.StatusOK", http.StatusOK)
	// 	assert.Equal(t, respBody, rr.Body.Bytes())
	// 	fmt.Println("respBody", string(respBody))
	// 	fmt.Println("rr.Body.Bytes()", rr.Body.String())
	// })
}

// func performRequest(r http.Handler, method, path string) *httptest.ResponseRecorder {
// 	req, _ := http.NewRequest(method, path, nil)
// 	w := httptest.NewRecorder()
// 	r.ServeHTTP(w, req)
// 	return w
// }

// func TestProductList(t *testing.T) {
// 	body := gin.H{
// 		"hello": "world",
//  }
//  // Grab our router
//  router := SetupRouter()
//  w := performRequest(router, "GET", "/")
//  assert.Equal(t, http.StatusOK, w.Code)
//  var response map[string]string
//  err := json.Unmarshal([]byte(w.Body.String()), &response)
//  value, exists := response["hello"]
//  assert.Nil(t, err)
//  assert.True(t, exists)
//  assert.Equal(t, body["hello"], value)
// 	// router := gin.Default()
// 	// w := httptest.NewRecorder()
// 	// //c, _ := gin.CreateTestContext(w)
// 	// req, _ := http.NewRequest("GET", "/products", nil)
// 	// router.ServeHTTP(w, req)

// 	// assert.Equal(t, 200, w.Code)
// 	// assert.Equal(t, w.Body.String(), "{\"msg\":\"pong\"}")
// }

// // Setup
// // gin.SetMode(gin.TestMode) t.Run("Success", func(t *testing.T) {
// // 	mockProductResp := model.Product{
// // 		ProductId:     0,
// // 		ProductName:   "product_name",
// // 		Slug:          "slug",
// // 		ProductImage:  "http://placehold.jp/150x150.png",
// // 		Brand:         "brand",
// // 		Price:         1,
// // 		CategoryName:  "category_name",
// // 		CountInStock:  1,
// // 		Description:   "description",
// // 		AverageRating: 5,
// // 	}
// // 	out, _ := json.MarshalIndent(mockProductResp, "", "   ")
// // 	fmt.Println(string(out))
// // 	// fmt.Println(out)

// // 	mockProductService := new(mocks.MockProductService)
// // 	mockProductService.On("ProductList", mock.AnythingOfType("*context.emptyCtx")).Return(mockProductResp, nil)
// // 	rr := httptest.NewRecorder()
// // 	router := gin.Default()

// // 	NewHandler(&Config{
// // 		R:              router,
// // 		ProductService: mockProductService,
// // 	})

// // 	request, err := http.NewRequest(http.MethodGet, "/products", nil)
// // 	assert.NoError(t, err)
// // 	router.ServeHTTP(rr, request)
// // 	respBody, err := json.MarshalIndent(mockProductResp, "", "   ")
// // 	fmt.Println(string(respBody))
// // 	assert.NoError(t, err)
// // 	// assert.Equal(t, http.StatusOK, rr.Code)
// // 	assert.Equal(t, string(respBody), string(out))
// // 	// mockProductService.AssertExpectations(t) // assert that UserService.Get was called
// // })

// // t.Run("Success", func(t *testing.T) {
// // 	mockProduct0 := model.Product{
// // 		ProductId:     0,
// // 		ProductName:   "product_name",
// // 		Slug:          "slug",
// // 		ProductImage:  "http://placehold.jp/150x150.png",
// // 		Brand:         "brand",
// // 		Price:         1,
// // 		CategoryName:  "category_name",
// // 		CountInStock:  1,
// // 		Description:   "description",
// // 		AverageRating: 5,
// // 	}
// // 	mockProduct2 := model.Product{
// // 		ProductId:     1,
// // 		ProductName:   "product_name1",
// // 		Slug:          "slug1",
// // 		ProductImage:  "http://placehold.jp/150x150.png",
// // 		Brand:         "brand1",
// // 		Price:         1,
// // 		CategoryName:  "category_name1",
// // 		CountInStock:  1,
// // 		Description:   "description1",
// // 		AverageRating: 5,
// // 	}
// // 	mockProductResp := []model.Product{mockProduct0, mockProduct2}

// // uid, _ := uuidc.NewRandom()

// // mockUserResp := &model.User{
// // 	UserId: uid,
// // 	Email:  "bob@bob.com",
// // 	Name:   "Bobby Bobson",
// // }
// // 	mockProductResp := &model.Product{
// // 		ProductId:     0,
// // 		ProductName:   "product_name",
// // 		Slug:          "slug",
// // 		ProductImage:  "http://placehold.jp/150x150.png",
// // 		Brand:         "brand",
// // 		Price:         1,
// // 		CategoryName:  "category_name",
// // 		CountInStock:  1,
// // 		Description:   "description",
// // 		AverageRating: 5,
// // 	}

// // 	mockProductService := new(mocks.MockProductService)
// // 	mockProductService.On("ProductList", mock.AnythingOfType("*context.emptyCtx")).Return(mockProductResp, nil)
// // 	// a response recorder for getting written http response
// // 	rr := httptest.NewRecorder()

// // 	// use a middleware to set context for test
// // 	// the only claims we care about in this test
// // 	// is the UID
// // 	router := gin.Default()

// // 	NewHandler(&Config{
// // 		R:           router,
// // 		ProductService: mockProductService,
// // 	})

// // 	request, err := http.NewRequest(http.MethodGet, "/products", nil)
// // 	assert.NoError(t, err)
// // 	router.ServeHTTP(rr, request)
// // 	respBody, err := json.Marshal(gin.H{
// // 		"productlist": mockProductResp,
// // 	})
// // 	fmt.Printf("%s\n", respBody)

// // 	assert.NoError(t, err)

// // 	assert.Equal(t, http.StatusOK, rr.Code)
// // 	assert.Equal(t, respBody, rr.Body.Bytes())
// // 	mockProductService.AssertExpectations(t) // assert that UserService.Get was called
// // })

// // // fmt.Println("mockProductResp",mockProductResp)
// // // mockProductResp := []model.Product{mockProduct0, mockProduct2}
// // // mockProductResp [{0 product_name slug http://placehold.jp/150x150.png brand 1 category_name 1 description 5} {1 product_name1 slug1 http://placehold.jp/150x150.png brand1 1 category_name1 1 description1 5}]
// // // fmt.Println("mockProductResp",mockProductResp)
// // // mockProductResp [0x140003d8500 0x140003d8580]
// // mockProductService := new(mocks.MockProductService)
// // mockProductService.On("ProductList", mock.AnythingOfType("*context.emptyCtx")).Return(mockProductResp, nil)

// // rr := httptest.NewRecorder()
// // // fmt.Println("rr",rr)
// // // rr &{200 map[]  false <nil> map[] false}
// // // rr &{503 map[Content-Type:[application/json]] {"error":{"type":"SERVICE_UNAVAILABLE","message":"Service unavailable or timed out"}} false <nil> map[Content-Type:[application/json]] true}
// // router := gin.Default()
// // NewHandler(&Config{
// // 	R:              router,
// // 	ProductService: mockProductService,
// // })

// // request, err := http.NewRequest(http.MethodGet, "/products", nil)
// // // fmt.Println("request",request)
// // 		// request &{GET /products HTTP/1.1 1 1 map[] <nil> <nil> 0 [] false  map[] map[] <nil> map[]   <nil> <nil> <nil> 0x140000240b8}
// // // response := httptest.NewRecorder()
// // // response &{200 map[]  false <nil> map[] false}
// // assert.NoError(t, err)
// // router.ServeHTTP(rr, request)
// // // fmt.Println("rr",rr)
// // // fmt.Println("request",request)
// // // fmt.Println("response",response)
// // //[]bytes型
// // respBody, err := json.Marshal(gin.H{
// // 	"productlist": mockProductResp,
// // })
// // assert.NoError(t, err)
// // // assert.Equal(t, http.StatusOK, rr.Code)

// // //expect //actual
// // assert.Equal(t, respBody, rr.Body.Bytes())
// // mockProductService.AssertExpectations(t)

// // t.Run("NoContextProduct", func(t *testing.T) {
// // 	mockProductService := new(mocks.MockProductService)
// // 	mockProductService.On("ProductList", mock.Anything, mock.Anything).Return(nil, nil)

// // 	rr := httptest.NewRecorder()
// // 	router := gin.Default()
// // 	NewHandler(&Config{
// // 		R:              router,
// // 		ProductService: mockProductService,
// // 	})

// // 	request, err := http.NewRequest(http.MethodGet, "/products", nil)
// // 	assert.NoError(t, err)

// // 	router.ServeHTTP(rr, request)

// // 	assert.Equal(t, http.StatusInternalServerError, rr.Code)
// // 	mockProductService.AssertNotCalled(t, "ProductList", mock.Anything)
// // })

// // t.Run("NotFound", func(t *testing.T) {
// // 	// uid, _ := uuid.NewRandom()
// // 	mockProductService := new(mocks.MockProductService)
// // 	mockProductService.On("ProductList", mock.Anything).Return(nil, fmt.Errorf("Some error down call chain"))
// // 	rr := httptest.NewRecorder()
// // 	router := gin.Default()
// // 	NewHandler(&Config{
// // 		R:              router,
// // 		ProductService: mockProductService,
// // 	})
// // 	request, err := http.NewRequest(http.MethodGet, "/products", nil)
// // 	assert.NoError(t, err)
// // 	router.ServeHTTP(rr, request)
// // 	respErr :=apperrors.NewNotFound("products", "err")
// // 	respBody, err := json.Marshal(gin.H{
// // 		"error": respErr,
// // 	})
// // 	assert.NoError(t, err)
// // 	assert.Equal(t, respErr.Status(), rr.Code)
// // 	assert.Equal(t, respBody, rr.Body.Bytes())
// // 	mockProductService.AssertExpectations(t)
// // })

// // func TestProductCreate(t *testing.T) {
// // 	gin.SetMode(gin.TestMode)
// // 	t.Run("Success", func(t *testing.T) {
// // 		p := &model.Product{
// // 			ProductName:   "product_name",
// // 			Slug:          "slug",
// // 			ProductImage:  "https://www.imageURL.com/1234",
// // 			Brand:         "brand",
// // 			Price:         0,
// // 			CategoryName:  "category_name",
// // 			CountInStock:  0,
// // 			Description:   "description",
// // 			AverageRating: 4,
// // 		}
// // 		p.ProductId = 0
// // 		p2 := p
// // 		mockProductService := new(mocks.MockProductService)
// // 		mockProductService.
// // 			On("ProductCreate", mock.AnythingOfType("*context.emptyCtx"), p).
// // 			Return(p2, nil)
// // 		rr := httptest.NewRecorder()
// // 		router := gin.Default()
// // 		NewHandler(&Config{
// // 			R:              router,
// // 			ProductService: mockProductService,
// // 		})
// // 		reqBody, err := json.Marshal(gin.H{
// // 			"product_id":     p.ProductId,
// // 			"product_name":   p.ProductName,
// // 			"slug":           p.Slug,
// // 			"product_image":  p.ProductImage,
// // 			"brand":          p.Brand,
// // 			"price":          p.Price,
// // 			"category_name":  p.CategoryName,
// // 			"count_in_stock": p.CountInStock,
// // 			"description":    p.Description,
// // 			"average_rating": p.AverageRating,
// // 		})
// // 		assert.NoError(t, err)
// // 		request, err := http.NewRequest(http.MethodPost, "/products", bytes.NewBuffer(reqBody))
// // 		request.Header.Set("Content-Type", "application/json")
// // 		assert.NoError(t, err)
// // 		router.ServeHTTP(rr, request)
// // 		// respBody, _ := json.Marshal(gin.H{
// // 		// 	"product": product,
// // 		// })
// // 		// assert.Equal(t, respBody, rr.Body.Bytes())
// // 		// assert.Equal(t, http.StatusOK, rr.Code)
// // 		// mockProductService.AssertExpectations(t)
// // 	})
// // }

// // 	mockProduct0 := &model.Product{
// // 		ProductId:     0,
// // 		ProductName:   "product_name",
// // 		Slug:          "slug",
// // 		ProductImage:  "http://placehold.jp/150x150.png",
// // 		Brand:         "brand",
// // 		Price:         1,
// // 		CategoryName:  "category_name",
// // 		CountInStock:  1,
// // 		Description:   "description",
// // 		AverageRating: 5,
// // 	}
// // 	mockProduct2 := &model.Product{
// // 		ProductId:     1,
// // 		ProductName:   "product_name1",
// // 		Slug:          "slug1",
// // 		ProductImage:  "http://placehold.jp/150x150.png",
// // 		Brand:         "brand1",
// // 		Price:         1,
// // 		CategoryName:  "category_name1",
// // 		CountInStock:  1,
// // 		Description:   "description1",
// // 		AverageRating: 5,
// // 	}
// // 	mockProductList := []*model.Product{mockProduct0, mockProduct2}
// // 	mockProductService := new(mocks.MockProductService)
// // 	mockProductService.
// // 		On("ProductCreate", mock.AnythingOfType("*context.emptyCtx")).
// // 		Return(mockProductList, nil)
// // 	rr := httptest.NewRecorder()
// // 	router := gin.Default()
// // 	NewHandler(&Config{
// // 		R:              router,
// // 		ProductService: mockProductService,
// // 	})
// // 	reqBody, err := json.Marshal(gin.H{
// // 		"product_id":     p.ProductId,
// // 		"product_name":   p.ProductName,
// // 		"slug":           p.Slug,
// // 		"product_image":  p.ProductImage,
// // 		"brand":          p.Brand,
// // 		"price":          p.Price,
// // 		"category_name":  p.CategoryName,
// // 		"count_in_stock": p.CountInStock,
// // 		"description":    p.Description,
// // 		"average_rating": p.AverageRating,
// // 	})
// // 	assert.NoError(t, err)
// // 	request, err := http.NewRequest(http.MethodPost, "/products", bytes.NewBuffer(reqBody))
// // 	request.Header.Set("Content-Type", "application/json")
// // 	assert.NoError(t, err)
// // 	router.ServeHTTP(rr, request)
// // 	// respBody, _ := json.Marshal(gin.H{
// // 	// 	"product": product,
// // 	// })
// // 	// assert.Equal(t, respBody, rr.Body.Bytes())
// // 	// assert.Equal(t, http.StatusOK, rr.Code)
// // 	// mockProductService.AssertExpectations(t)
// // })

// // // func TestProductList(t *testing.T) {
// // // 	gin.SetMode(gin.TestMode)
// // // 	t.Run("Success", func(t *testing.T) {
// // // 		uid, _ := uuid.NewRandom()
// // // 		mockProduct0 := &model.Product{
// // // 			ProductId:     uid,
// // // 			ProductName:   "product_name0",
// // // 			Slug:          "slug0",
// // // 			ProductImage:  "http://placehold.jp/149x150.png",
// // // 			Brand:         "brand0",
// // // 			Price:         0,
// // // 			CategoryName:  "category_name0",
// // // 			CountInStock:  0,
// // // 			Description:   "description0",
// // // 			AverageRating: 0,
// // // 		}
// // // 		mockProduct1 := &model.Product{
// // // 			ProductId:     uid,
// // // 			ProductName:   "product_name1",
// // // 			Slug:          "slug1",
// // // 			ProductImage:  "http://placehold.jp/149x150.png",
// // // 			Brand:         "brand1",
// // // 			Price:         1,
// // // 			CategoryName:  "category_name1",
// // // 			CountInStock:  1,
// // // 			Description:   "description1",
// // // 			AverageRating: 1,
// // // 		}
// // // 		mockProductList := []*model.Product{mockProduct0, mockProduct2}
// // // 		mockProductService := new(mocks.MockProductService)
// // // 		mockProductService.On("ProductList", mock.AnythingOfType("*context.emptyCtx")).Return(mockProductList, nil)
// // // 		rr := httptest.NewRecorder()
// // // 		router := gin.Default()
// // // 		NewHandler(&Config{
// // // 			R:              router,
// // // 			ProductService: mockProductService,
// // // 		})
// // // 		request, err := http.NewRequest(http.MethodGet, "/products", nil)
// // // 		assert.NoError(t, err)
// // // 		router.ServeHTTP(rr, request)
// // // 		respBody, err := json.Marshal(gin.H{
// // // 			"productlist": mockProductList,
// // // 		})
// // // 		assert.NoError(t, err)
// // // 		assert.Equal(t, http.StatusOK, rr.Code)
// // // 		assert.Equal(t, respBody, rr.Body.Bytes())
// // // 		mockProductService.AssertExpectations(t)
// // // 	})
// // // }

// // // func TestProductFindByID(t *testing.T) {
// // // 	// Setup
// // // 	gin.SetMode(gin.TestMode)
// // // 	t.Run("Success", func(t *testing.T) {
// // // 		uid, _ := uuid.NewRandom()
// // // 		mockProduct := &model.Product{
// // // 			ProductId:     uid,
// // // 			ProductName:   "product_name",
// // // 			Slug:          "slug",
// // // 			ProductImage:  "http://placehold.jp/149x150.png",
// // // 			Brand:         "brand",
// // // 			Price:         0,
// // // 			CategoryName:  "category_name",
// // // 			CountInStock:  0,
// // // 			Description:   "description",
// // // 			AverageRating: 4,
// // // 		}
// // // 		mockProductService := new(mocks.MockProductService)
// // // 		mockProductService.On("ProductFindByID", mock.AnythingOfType("*context.emptyCtx"), uid).Return(mockProduct, nil)
// // // 		rr := httptest.NewRecorder()
// // // 		router := gin.Default()
// // // 		NewHandler(&Config{
// // // 			R:              router,
// // // 			ProductService: mockProductService,
// // // 		})
// // // 		request, err := http.NewRequest(http.MethodGet, "/products/:productId", nil)
// // // 		assert.NoError(t, err)
// // // 		router.ServeHTTP(rr, request)
// // // 		respBody, err := json.Marshal(gin.H{
// // // 			"product": mockProduct,
// // // 		})
// // // 		assert.NoError(t, err)
// // // 		assert.Equal(t, http.StatusOK, rr.Code)
// // // 		assert.Equal(t, respBody, rr.Body.Bytes())
// // // 		mockProductService.AssertExpectations(t)
// // // 	})
// // // }

// // // func TestProductFindByName(t *testing.T) {
// // // 	gin.SetMode(gin.TestMode)
// // // 	t.Run("Success", func(t *testing.T) {
// // // 		uid, _ := uuid.NewRandom()
// // // 		mockProduct := &model.Product{
// // // 			ProductId:     uid,
// // // 			ProductName:   "product_name",
// // // 			Slug:          "slug",
// // // 			ProductImage:  "http://placehold.jp/149x150.png",
// // // 			Brand:         "brand",
// // // 			Price:         0,
// // // 			CategoryName:  "category_name",
// // // 			CountInStock:  0,
// // // 			Description:   "description",
// // // 			AverageRating: 4,
// // // 		}
// // // 		mockProductService := new(mocks.MockProductService)
// // // 		mockProductService.On("ProductFindByID", mock.AnythingOfType("*context.emptyCtx"), mockProduct.ProductName).Return(mockProduct, nil)
// // // 		rr := httptest.NewRecorder()
// // // 		router := gin.Default()
// // // 		NewHandler(&Config{
// // // 			R:              router,
// // // 			ProductService: mockProductService,
// // // 		})
// // // 		request, err := http.NewRequest(http.MethodGet, "/search/:productName", nil)
// // // 		assert.NoError(t, err)
// // // 		router.ServeHTTP(rr, request)
// // // 		respBody, err := json.Marshal(gin.H{
// // // 			"product": mockProduct,
// // // 		})
// // // 		assert.NoError(t, err)
// // // 		assert.Equal(t, http.StatusOK, rr.Code)
// // // 		assert.Equal(t, respBody, rr.Body.Bytes())
// // // 		mockProductService.AssertExpectations(t)
// // // 	})
// // // }

// // // func TestProductUpdate(t *testing.T) {
// // // 	gin.SetMode(gin.TestMode)
// // // 	uid, _ := uuid.NewRandom()
// // // 	ctxProduct := &model.Product{
// // // 		ProductId: uid,
// // // 	}
// // // 	router := gin.Default()
// // // 	mockProductService := new(mocks.MockProductService)
// // // 	NewHandler(&Config{
// // // 		R:              router,
// // // 		ProductService: mockProductService,
// // // 	})
// // // 	t.Run("Success", func(t *testing.T) {
// // // 		rr := httptest.NewRecorder()
// // // 		newProductName := "product_name1"
// // // 		newBrand := "brand1"
// // // 		newCountInStock := 99
// // // 		mockProductService := new(mocks.MockProductService)

// // // 		reqBody, _ := json.Marshal(gin.H{
// // // 			"product_name":   newProductName,
// // // 			"brand":          newBrand,
// // // 			"count_in_stock": newCountInStock,
// // // 		})
// // // 		request, _ := http.NewRequest(http.MethodPut, "/products/:productId", bytes.NewBuffer(reqBody))
// // // 		request.Header.Set("Content-Type", "application/json")
// // // 		productToUpdate := &model.Product{
// // // 			ProductId:   ctxProduct.ProductId,
// // // 			ProductName: newProductName,
// // // 			Brand:       newBrand,
// // // 		}
// // // 		updateArgs := mock.Arguments{
// // // 			mock.AnythingOfType("*context.emptyCtx"),
// // // 			uid,
// // // 			productToUpdate,
// // // 		}
// // // 		mockProductService.
// // // 			On("ProductUpdate", updateArgs...).
// // // 			Run(func(args mock.Arguments) {
// // // 			}).
// // // 			Return(productToUpdate, nil)
// // // 		router.ServeHTTP(rr, request)
// // // 		respBody, _ := json.Marshal(gin.H{
// // // 			"product": productToUpdate,
// // // 		})
// // // 		assert.Equal(t, http.StatusOK, rr.Code)
// // // 		assert.Equal(t, respBody, rr.Body.Bytes())
// // // 		mockProductService.AssertCalled(t, "ProductUpdate", updateArgs...)
// // // 	})
// // // }

// // // func TestProductDelete(t *testing.T) {
// // // 	gin.SetMode(gin.TestMode)
// // // 	uid, _ := uuid.NewRandom()
// // // 	mockProduct := &model.Product{
// // // 		ProductId:     uid,
// // // 		ProductName:   "product_name",
// // // 		Slug:          "slug",
// // // 		ProductImage:  "http://placehold.jp/149x150.png",
// // // 		Brand:         "brand",
// // // 		Price:         0,
// // // 		CategoryName:  "category_name",
// // // 		CountInStock:  0,
// // // 		Description:   "description",
// // // 		AverageRating: 4,
// // // 	}
// // // 	router := gin.Default()
// // // 	mockProductService := new(mocks.MockProductService)
// // // 	NewHandler(&Config{
// // // 		R:              router,
// // // 		ProductService: mockProductService,
// // // 	})
// // // 	t.Run("Success", func(t *testing.T) {
// // // 		rr := httptest.NewRecorder()
// // // 		mockProductService := new(mocks.MockProductService)
// // // 		NewHandler(&Config{
// // // 			R:              router,
// // // 			ProductService: mockProductService,
// // // 		})
// // // 		productDeleteArgs := mock.Arguments{
// // // 			mock.Anything,
// // // 			uid,
// // // 		}
// // // 		mockProductService.On("ProductDelete", productDeleteArgs...).Return(mockProduct, nil)
// // // 		request, _ := http.NewRequest(http.MethodDelete, "/products/:productId", nil)
// // // 		router.ServeHTTP(rr, request)
// // // 		assert.Equal(t, http.StatusOK, rr.Code)
// // // 		mockProductService.AssertCalled(t, "ProductDelete", productDeleteArgs...)
// // // 	})
// // // }

// // // // productToUpdate := &model.Product{
// // // // 	ProductId:     ctxProduct.ProductId,
// // // // 	ProductName:   "",
// // // // 	Slug:          "",
// // // // 	ProductImage:  "",
// // // // 	Brand:         "",
// // // // 	Price:         0,
// // // // 	CategoryName:  "",
// // // // 	CountInStock:  0,
// // // // 	Description:   "",
// // // // 	AverageRating: 0,
// // // // }
