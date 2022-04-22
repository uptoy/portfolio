package handler

import (
	// "log"
	"net/http"
	"time"

	"backend/handler/middleware"
	"backend/model"
	"backend/model/apperrors"
	"github.com/gin-gonic/gin"
	// "strconv"
)

// Handler struct holds required services for handler to function
type Handler struct {
	AddressService  model.AddressService
	AuthService     model.AuthService
	CartService     model.CartService
	CategoryService model.CategoryService
	// ChatService     model.ChatService
	// ImageService    model.ImageService
	OrderService    model.OrderService
	PaymentService  model.PaymentService
	ProductService  model.ProductService
	ReviewService   model.ReviewService
	TokenService    model.TokenService
	UserService     model.UserService
	WishlistService model.WishlistService

	MaxBodyBytes int64
}

type Config struct {
	R               *gin.Engine
	AddressService  model.AddressService
	AuthService     model.AuthService
	CartService     model.CartService
	CategoryService model.CategoryService
	// ChatService     model.ChatService
	// ImageService    model.ImageService
	OrderService    model.OrderService
	PaymentService  model.PaymentService
	ProductService  model.ProductService
	ReviewService   model.ReviewService
	TokenService    model.TokenService
	UserService     model.UserService
	WishlistService model.WishlistService

	BaseURL         string
	TimeoutDuration time.Duration
	MaxBodyBytes    int64
}

// NewHandler initializes the handler with required injected services along with http routes
// Does not return as it deals directly with a reference to the gin Engine
func NewHandler(c *Config) {
	// Create a handler (which will later have injected services)
	h := &Handler{
		AddressService:  c.AddressService,
		AuthService:     c.AuthService,
		CartService:     c.CartService,
		CategoryService: c.CategoryService,
		// ChatService:     c.ChatService,
		// ImageService:    c.ImageService,
		OrderService:    c.OrderService,
		PaymentService:  c.PaymentService,
		ProductService:  c.ProductService,
		ReviewService:   c.ReviewService,
		TokenService:    c.TokenService,
		UserService:     c.UserService,
		WishlistService: c.WishlistService,

		MaxBodyBytes: c.MaxBodyBytes,
	} // currently has no properties

	// Create an account group
	api := c.R.Group(c.BaseURL)
	api.Static("images", "./images")
	// api.Use(cors.New(cors.Config{
	// 	AllowOrigins:     []string{"*"},
	// 	AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	// 	AllowHeaders:     []string{"Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization", "accept", "origin", "Cache-Control", "X-Requested-With"},
	// 	ExposeHeaders:    []string{"Content-Length"},
	// 	AllowCredentials: true,
	// 	AllowOriginFunc: func(origin string) bool {
	// 		return true
	// 	},
	// 	MaxAge: 15 * time.Second,
	// }))

	if gin.Mode() != gin.TestMode {
		//auth
		api.Use(middleware.Timeout(c.TimeoutDuration, apperrors.NewServiceUnavailable()))
		api.GET("/me", middleware.AuthUser(h.TokenService), h.Me)
		api.POST("/signout", middleware.AuthUser(h.TokenService), h.Signout)
		api.PUT("/details", middleware.AuthUser(h.TokenService), h.Details)
	} else {
		//こちらがテスト実行される
		api.GET("/me", h.Me)
		api.POST("/signout", h.Signout)
		api.PUT("/details", h.Details)
		// api.POST("/forgot", h.ForgotPassword)
	}
	//こちらがテスト実行される
	users := api.Group("/users")
	{
		users.GET("", h.UserList)
	}
	products := api.Group("/products")
	{
		products.GET("", h.ProductList)
		products.POST("", h.ProductCreate)
		products.GET("/:id", h.ProductFindByID)
		products.PUT("/:id", h.ProductUpdate)
		products.DELETE("/:id", h.ProductDelete)
		products.DELETE("/delete", h.ProductBulkDelete)
		products.POST("/insert", h.ProductBulkInsert)
		products.GET("/count", h.ProductCount)
		products.GET("/search/:name", h.ProductFindByName)
		products.GET("/:id/reviews/insert", h.ReviewBulkInsert)
		products.DELETE("/:id/reviews/delete", h.ReviewBulkDelete)
		products.POST("/:id/reviews", middleware.AuthUser(h.TokenService), h.ReviewCreate)
		// products.GET("/:id/reviews", h.ReviewGetAll)
		products.GET("/:id/reviews/count", h.ReviewCount)
		products.GET("/:id/reviews/:rid", h.ReviewGet)
		products.PUT("/:id/reviews/:rid", h.ReviewUpdate)
		products.DELETE("/:id/reviews/:rid", h.ReviewDelete)
		// products.POST("/confirm", h.ConfirmCreateReviewFlow)
	}
	categories := api.Group("/categories")
	{
		categories.GET("", h.CategoryList)
		categories.POST("", h.CategoryCreate)
		categories.GET("/:id", h.CategoryFindByID)
		categories.PUT("/:id", h.CategoryUpdate)
		categories.DELETE("/:id", h.CategoryDelete)
		categories.GET("/search/:name", h.CategoryFindByName)
		categories.DELETE("/delete", h.CategoryBulkDelete)
		categories.POST("/insert", h.CategoryBulkInsert)
		categories.GET("/count", h.CategoryCount)
	}
	sample := api.Group("/sample")
	{
		sample.GET("", h.SampleGetList)
		sample.POST("", h.SamplePost)
		sample.GET("/:id", h.SampleGetFindByID)
		sample.PUT("/:id", h.SampleUpdate)
		sample.DELETE("/:id", h.SampleDelete)
		sample.GET("/search/:name", h.SampleGetFindByName)
	}
	auth := api.Group("/auth")
	{
		auth.GET("/me", middleware.AuthUser(h.TokenService), h.Me)
		auth.POST("/signup", h.Signup)
		auth.POST("/signin", h.Signin)
		auth.POST("/signout", h.Signout)
		auth.POST("/tokens", h.Tokens)
		auth.POST("/forgot_password", h.Sample)
		auth.POST("/reset_password", h.Sample)
	}
	wishlist := api.Group("/wishlist")
	{
		wishlist.GET("/create", middleware.AuthUser(h.TokenService), h.WishlistCreate)
		wishlist.GET("", middleware.AuthUser(h.TokenService), h.WishlistGet)
		wishlist.POST("/:product_id", middleware.AuthUser(h.TokenService), h.WishlistAddItem)
		wishlist.DELETE("/:product_id", middleware.AuthUser(h.TokenService), h.WishlistDeleteItem)
		wishlist.DELETE("/clear", middleware.AuthUser(h.TokenService), h.WishlistClear)
	}
	cart := api.Group("/cart")
	{
		cart.GET("", middleware.AuthUser(h.TokenService), h.CartGet)
		cart.POST("/add", middleware.AuthUser(h.TokenService), h.CartAddItem)
		cart.DELETE("/:id", middleware.AuthUser(h.TokenService), h.CartDeleteItem)
		cart.PUT("/inc", middleware.AuthUser(h.TokenService), h.CartIncrementItem)
		cart.PUT("/dec", middleware.AuthUser(h.TokenService), h.CartDecrementItem)
	}
	api.POST("/payment", h.Payment)
	order := api.Group("/orders")
	{
		order.POST("", middleware.AuthUser(h.TokenService), h.OrderCreate)
		order.GET("", middleware.AuthUser(h.TokenService), h.OrderList)
		order.GET("/:id", middleware.AuthUser(h.TokenService), h.OrderFindByID)
		order.GET("/:id/detail", middleware.AuthUser(h.TokenService), h.OrderGetDetails)
		order.GET("/count", middleware.AuthUser(h.TokenService), h.OrderCount)

	}
	address := api.Group("/address")
	{
		address.POST("", middleware.AuthUser(h.TokenService), h.AddressUserCreate)
		address.GET("", middleware.AuthUser(h.TokenService), h.AddressListUserGet)
		address.GET("/:id", middleware.AuthUser(h.TokenService), h.AddressUserGet)
		address.PUT("/:id", middleware.AuthUser(h.TokenService), h.AddressUserUpdate)
		address.DELETE("/:id", middleware.AuthUser(h.TokenService), h.AddressUserDelete)
	}
	// chat := api.Group("/chat")
	{
		// chat.GET("", h.ChatRoom)
		// chat.GET("/ws", h.WsEndpoint)
		// chat.GET("/room/:roomId",)
		//  router.GET("/ws/:roomId", func(c *gin.Context) {
		//     roomId := c.Param("roomId")
		//     serveWs(c.Writer, c.Request, roomId)
		//  })
	}
	seed := api.Group("/seed")
	{
		seed.POST("/category", h.SeedCategory)
		seed.POST("/product", h.SeedProduct)
		seed.POST("/image", h.SeedProductImage)
		seed.POST("/review", h.SeedReview)

	}
	// image := api.Group("/image")
	// {
	// image.POST("", h.ImageLocalSaveMulti)
	// image.POST("/upload/multi", h.WsEndpoint)
	// image.POST("/upload", h.ImageUploadSingle)
	// image.POST("", h.ImageBulkUpload)
	//  router.GET("/ws/:roomId", func(c *gin.Context) {
	//     roomId := c.Param("roomId")
	//     serveWs(c.Writer, c.Request, roomId)
	//  })
	// }
}

// products.PUT("/:id/reviews", h.ReviewUpdate)
// products.DELETE("/:id/reviews", h.ReviewUpdate)

// admin := api.Group("/admin")
// {
// admin.POST("/signup", h.AdminSignup)
// admin.POST("/signin", h.AdminSignin)
// admin.POST("/signout", h.AdminSignout)
// admin.PUT("/order/update", h.AdminOrderUpdate)
// admin.GET("/order/orders", h.AdminOrderList)
// }
// }
func (h *Handler) Sample(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"hello": "world",
	})
}

func (h *Handler) SamplePost(c *gin.Context) {
	type JsonRequest struct {
		Int int    `json:"int"`
		Str string `json:"str"`
	}
	var json JsonRequest
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	json = JsonRequest{
		Int: json.Int,
		Str: json.Str,
	}
	c.JSON(http.StatusOK, gin.H{
		"int": json.Int,
		"str": json.Str,
	})
}

func (h *Handler) SampleGetList(c *gin.Context) {
	type JsonRequest struct {
		Int int    `json:"int"`
		Str string `json:"str"`
	}
	json1 := JsonRequest{Int: 1, Str: "str1"}
	json2 := JsonRequest{Int: 2, Str: "str2"}
	jsons := []JsonRequest{json1, json2}
	// p, _ := h.ProductService.ProductCreate(ctx, p1)
	c.JSON(http.StatusOK, gin.H{
		"data": jsons,
	})
}

func (h *Handler) SampleGetFindByID(c *gin.Context) {
	// p := &model.Product{ProductId: 0, ProductName: "name1"}
	type JsonRequest struct {
		Int int    `json:"int"`
		Str string `json:"str"`
	}
	json1 := JsonRequest{Int: 1, Str: "str1"}
	// json2 := JsonRequest{Int: 2, Str: "str2"}
	// jsons := []JsonRequest{json1, json2}
	// p, _ := h.ProductService.ProductCreate(ctx, p1)
	c.JSON(http.StatusOK, gin.H{
		"data": json1,
	})
}

func (h *Handler) SampleGetFindByName(c *gin.Context) {
	// p := &model.Product{ProductId: 0, ProductName: "name1"}
	// json1 := JsonRequest{Int: 1, Str: "str1"}
	name := c.Param("name")
	// json2 := JsonRequest{Int: 2, Str: "str2"}
	// jsons := []JsonRequest{json1, json2}
	// p, _ := h.ProductService.ProductCreate(ctx, p1)
	c.JSON(http.StatusOK, gin.H{
		"name": name,
	})
}

func (h *Handler) SampleUpdate(c *gin.Context) {
	type JsonRequest struct {
		Int int    `json:"int"`
		Str string `json:"str"`
	}
	var json JsonRequest
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	json = JsonRequest{
		Int: json.Int,
		Str: json.Str,
	}
	c.JSON(http.StatusOK, gin.H{
		"int": json.Int,
		"str": json.Str,
	})
}
func (h *Handler) SampleDelete(c *gin.Context) {
	// id := c.Param("id")
	type JsonRequest struct {
		Int int    `json:"int"`
		Str string `json:"str"`
	}
	json1 := JsonRequest{Str: "str1", Int: 1}
	// type JsonRequest struct {
	// 	Int int    `json:"int"`
	// 	Str string `json:"str"`
	// }
	// json1 := JsonRequest{Int: 1, Str: "str1"}
	// json2 := JsonRequest{Int: 2, Str: "str2"}
	// jsons := []JsonRequest{json1, json2}
	// p, _ := h.ProductService.ProductCreate(ctx, p1)
	c.JSON(http.StatusOK, gin.H{
		"int": json1.Int,
		"str": json1.Str,
	})
}
