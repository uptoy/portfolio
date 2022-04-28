package main

import (
	"backend/handler"
	"backend/repository"
	"backend/service"
	"context"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
	"github.com/jmoiron/sqlx"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"syscall"
	"time"
)

func main() {
	loadEnv()
	log.Println("Starting server...")

	ds, err := initDS()
	if err != nil {
		log.Fatalf("Unable to initialize data sources: %v\n", err)
	}

	router, err := inject(ds)

	if err != nil {
		log.Fatalf("Failure to inject data sources: %v\n", err)
	}

	srv := &http.Server{
		Addr:    "127.0.0.1:8080",
		Handler: router,
	}
	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Failed to initialize server: %v\n", err)
		}
	}()

	log.Printf("Listening on port %v\n", srv.Addr)

	// Wait for kill signal of channel
	quit := make(chan os.Signal)

	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	// This blocks until a signal is passed into the quit channel
	<-quit

	// The context is used to inform the server it has 5 seconds to finish
	// the request it is currently handling
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// shutdown data sources
	if err := ds.close(); err != nil {
		log.Fatalf("A problem occurred gracefully shutting down data sources: %v\n", err)
	}

	// Shutdown server
	log.Println("Shutting down server...")
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v\n", err)
	}
}

func inject(d *dataSources) (*gin.Engine, error) {
	loadEnv()
	log.Println("Injecting data sources")
	/*
	 * repository layer
	 */
	addressRepository := repository.NewAddressRepository(d.DB)
	authRepository := repository.NewAuthRepository(d.DB)
	cartRepository := repository.NewCartRepository(d.DB)
	categoryRepository := repository.NewCategoryRepository(d.DB)
	orderRepository := repository.NewOrderRepository(d.DB)
	paymentRepository := repository.NewPaymentRepository(d.DB)
	productRepository := repository.NewProductRepository(d.DB)
	productImageRepository := repository.NewProductImageRepository(d.DB)
	reviewRepository := repository.NewReviewRepository(d.DB)
	tokenRepository := repository.NewTokenRepository(d.RedisClient)
	userRepository := repository.NewUserRepository(d.DB)
	wishlistRepository := repository.NewWishlistRepository(d.DB)

	/*
	 * service layer
	 */
	addressService := service.NewAddressService(&service.AddressServiceConfig{
		AddressRepository: addressRepository,
	})
	authService := service.NewAuthService(&service.AuthServiceConfig{
		AuthRepository: authRepository,
	})
	cartService := service.NewCartService(&service.CartServiceConfig{
		CartRepository: cartRepository,
	})
	categoryService := service.NewCategoryService(&service.CategoryServiceConfig{
		CategoryRepository: categoryRepository,
	})
	// chatService := service.NewChatService(&service.ChatServiceConfig{
	// 	ChatRepository: chatRepository,
	// })

	orderService := service.NewOrderService(&service.OrderServiceConfig{
		OrderRepository: orderRepository,
	})

	paymentService := service.NewPaymentService(&service.PaymentServiceConfig{
		PaymentRepository: paymentRepository,
	})
	productService := service.NewProductService(&service.ProductServiceConfig{
		ProductRepository:      productRepository,
		ProductImageRepository: productImageRepository,
	})

	reviewService := service.NewReviewService(&service.ReviewServiceConfig{
		ReviewRepository: reviewRepository,
	})

	userService := service.NewUserService(&service.USConfig{
		UserRepository: userRepository,
		CartRepository: cartRepository,
	})
	wishlistService := service.NewWishlistService(&service.WishlistServiceConfig{
		WishlistRepository:     wishlistRepository,
		ReviewRepository:       reviewRepository,
		ProductImageRepository: productImageRepository,
	})

	// load rsa keys
	privKeyFile := os.Getenv("PRIV_KEY_FILE")
	priv, err := ioutil.ReadFile(privKeyFile)

	if err != nil {
		return nil, fmt.Errorf("could not read private key pem file: %w", err)
	}

	privKey, err := jwt.ParseRSAPrivateKeyFromPEM(priv)

	if err != nil {
		return nil, fmt.Errorf("could not parse private key: %w", err)
	}

	pubKeyFile := os.Getenv("PUB_KEY_FILE")
	pub, err := ioutil.ReadFile(pubKeyFile)

	if err != nil {
		return nil, fmt.Errorf("could not read public key pem file: %w", err)
	}

	pubKey, err := jwt.ParseRSAPublicKeyFromPEM(pub)

	if err != nil {
		return nil, fmt.Errorf("could not parse public key: %w", err)
	}

	// load refresh token secret from env variable
	refreshSecret := os.Getenv("REFRESH_SECRET")

	// load expiration lengths from env variables and parse as int
	idTokenExp := os.Getenv("ID_TOKEN_EXP")
	refreshTokenExp := os.Getenv("REFRESH_TOKEN_EXP")

	idExp, err := strconv.ParseInt(idTokenExp, 0, 64)
	if err != nil {
		return nil, fmt.Errorf("could not parse ID_TOKEN_EXP as int: %w", err)
	}

	refreshExp, err := strconv.ParseInt(refreshTokenExp, 0, 64)
	if err != nil {
		return nil, fmt.Errorf("could not parse REFRESH_TOKEN_EXP as int: %w", err)
	}

	tokenService := service.NewTokenService(&service.TSConfig{
		TokenRepository:       tokenRepository,
		PrivKey:               privKey,
		PubKey:                pubKey,
		RefreshSecret:         refreshSecret,
		IDExpirationSecs:      idExp,
		RefreshExpirationSecs: refreshExp,
	})

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"*"},
		AllowHeaders:     []string{"*"},
		ExposeHeaders:    []string{"*"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == "http://localhost:3000"
		},
		MaxAge: 12 * time.Hour,
	}))
	baseURL := os.Getenv("BACKEND_API_URL")
	handlerTimeout := os.Getenv("HANDLER_TIMEOUT")
	ht, err := strconv.ParseInt(handlerTimeout, 0, 64)
	if err != nil {
		return nil, fmt.Errorf("could not parse HANDLER_TIMEOUT as int: %w", err)
	}
	maxBodyBytes := "4194304"
	mbb, err := strconv.ParseInt(maxBodyBytes, 0, 64)
	if err != nil {
		return nil, fmt.Errorf("could not parse MAX_BODY_BYTES as int: %w", err)
	}

	handler.NewHandler(&handler.Config{
		R:               router,
		AddressService:  addressService,
		AuthService:     authService,
		CartService:     cartService,
		CategoryService: categoryService,
		// ChatService:     chatService,
		// ImageService:    imageService,
		OrderService:    orderService,
		PaymentService:  paymentService,
		ProductService:  productService,
		ReviewService:   reviewService,
		TokenService:    tokenService,
		UserService:     userService,
		WishlistService: wishlistService,
		BaseURL:         baseURL,
		TimeoutDuration: time.Duration(time.Duration(ht) * time.Second),
		MaxBodyBytes:    mbb,
	})
	return router, nil
}

type dataSources struct {
	DB          *sqlx.DB
	RedisClient *redis.Client
}

// InitDS establishes connections to fields in dataSources
func initDS() (*dataSources, error) {
	log.Printf("Initializing data sources\n")
	pgHost := "localhost"
	pgPort := "5432"
	pgUser := "postgres"
	pgPassword := "password"
	pgDB := "portfolio_db"
	pgSSL := "disable"

	pgConnString := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s", pgHost, pgPort, pgUser, pgPassword, pgDB, pgSSL)

	log.Printf("Connecting to Postgresql\n")
	db, err := sqlx.Open("postgres", pgConnString)

	if err != nil {
		return nil, fmt.Errorf("error opening db: %w", err)
	}

	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("error connecting to db: %w", err)
	}
	redisHost := "localhost"
	redisPort := "6379"
	log.Printf("Connecting to Redis\n")
	rdb := redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:%s", redisHost, redisPort),
		Password: "",
		DB:       0,
	})
	// verify redis connection
	_, err = rdb.Ping(context.Background()).Result()

	if err != nil {
		return nil, fmt.Errorf("error connecting to redis: %w", err)
	}
	return &dataSources{
		DB:          db,
		RedisClient: rdb,
	}, nil
}

func (d *dataSources) close() error {
	if err := d.DB.Close(); err != nil {
		return fmt.Errorf("error closing Postgresql: %w", err)
	}
	if err := d.RedisClient.Close(); err != nil {
		return fmt.Errorf("error closing Redis Client: %w", err)
	}
	return nil
}

func loadEnv() {
	err := godotenv.Load(".env.dev")
	if err != nil {
		fmt.Printf("Could not read env: %v", err)
	}
}

// package main

// import (
// 	"backend/model"
// 	"backend/model/apperrors"
// 	"fmt"
// 	"github.com/gin-contrib/cors"
// 	"github.com/gin-gonic/gin"
// 	"github.com/go-playground/validator/v10"
// 	"log"
// 	"net/http"
// 	"time"
// )

// type invalidArgument struct {
// 	Field string `json:"field"`
// 	Value string `json:"value"`
// 	Tag   string `json:"tag"`
// 	Param string `json:"param"`
// }

// func main() {
// 	r := gin.Default()
// 	r.Use(cors.New(cors.Config{
// 		AllowOrigins:     []string{"http://localhost:3000"},
// 		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
// 		AllowHeaders:     []string{"Content-Type"},
// 		ExposeHeaders:    []string{"Content-Length"},
// 		AllowCredentials: true,
// 		AllowOriginFunc: func(origin string) bool {
// 			return origin == "http://localhost:3000"
// 		},
// 		MaxAge: 12 * time.Hour,
// 	}))
// 	r.POST("/api/auth/signup", func(c *gin.Context) {
// 		type signupReq struct {
// 			Name     string `json:"name" binding:"required"`
// 			Email    string `json:"email" binding:"required,email"`
// 			Password string `json:"password" binding:"required,gte=6,lte=30"`
// 		}
// 		var req signupReq
// 			// var req signupReq

// 	// // Bind incoming json to struct and check for validation errors
// 	if ok := bindData(c, &req); !ok {
// 		return
// 	}

// 	u := &model.User{
// 		Name:     req.Name,
// 		Email:    req.Email,
// 		Password: req.Password,
// 	}

// 	// ctx := c.Request.Context()
// 	// result, err := h.UserService.Signup(ctx, u)

// 	// if err != nil {
// 	// 	log.Printf("Failed to sign up user: %v\n", err.Error())
// 	// 	c.JSON(apperrors.Status(err), gin.H{
// 	// 		"error": err,
// 	// 	})
// 	// 	return
// 	// }

// 	// create token pair as strings
// 	// tokens, err := h.TokenService.NewPairFromUser(ctx, u, "")

// 	if err != nil {
// 		log.Printf("Failed to create tokens for user: %v\n", err.Error())

// 		// may eventually implement rollback logic here
// 		// meaning, if we fail to create tokens after creating a user,
// 		// we make sure to clear/delete the created user in the database

// 		c.JSON(apperrors.Status(err), gin.H{
// 			"error": err,
// 		})
// 		return
// 	}

// 	accessToken := tokens.IDToken.SS
// 	// refreshToken := tokens.RefreshToken.SS
// 	fmt.Println("accessToken", accessToken)
// 	// fmt.Println("refreshToken", refreshToken)
// 	fmt.Println("tokens", tokens)
// 	//   maxAge: 60 * 60 * 24, // 1 day
// 	//   maxAge: 60 * 60 * 24 * 30, // 1 Month
// 	c.SetCookie("token", accessToken, 60*60*24, "/", "localhost", false, true)
// 	// c.SetCookie("refreshToken", refreshToken, 60*60*24*30, "/", "localhost", false, true)

// 		// // Bind incoming json to struct and check for validation errors
// 		if ok := bindData(c, &req); !ok {
// 			return
// 		}

// 		u := &model.User{
// 			Name:     req.Name,
// 			Email:    req.Email,
// 			Password: req.Password,
// 		}

// 		c.JSON(http.StatusCreated, gin.H{
// 			"message": "Success SignUp",
// 			"user":    u,
// 		})
// 	})
// 	r.Run("127.0.0.1:8080") // listen and serve on 0.0.0.0:8080
// }

// // func bindData(c *gin.Context, req interface{}) bool {
// // 	if c.ContentType() != "application/json" {
// // 		msg := fmt.Sprintf("%s only accepts Content-Type application/json", c.FullPath())

// // 		err := apperrors.NewUnsupportedMediaType(msg)

// // 		c.JSON(err.Status(), gin.H{
// // 			"error": err,
// // 		})
// // 		return false
// // 	}
// // 	// Bind incoming json to struct and check for validation errors
// // 	if err := c.ShouldBind(req); err != nil {
// // 		log.Printf("Error binding data: %+v\n", err)

// // 		if errs, ok := err.(validator.ValidationErrors); ok {
// // 			// could probably extract this, it is also in middleware_auth_user
// // 			var invalidArgs []invalidArgument

// // 			for _, err := range errs {
// // 				invalidArgs = append(invalidArgs, invalidArgument{
// // 					err.Field(),
// // 					err.Value().(string),
// // 					err.Tag(),
// // 					err.Param(),
// // 				})
// // 			}

// // 			err := apperrors.NewBadRequest("Invalid request parameters. See invalidArgs")

// // 			c.JSON(err.Status(), gin.H{
// // 				"error":       err,
// // 				"invalidArgs": invalidArgs,
// // 			})
// // 			return false
// // 		}

// // 		// later we'll add code for validating max body size here!

// // 		// if we aren't able to properly extract validation errors,
// // 		// we'll fallback and return an internal server error
// // 		// fallBack := apperrors.NewInternal()
// // 		fallBack := apperrors.NewInternal()

// // 		c.JSON(fallBack.Status(), gin.H{"error": fallBack})
// // 		return false
// // 	}

// // 	return true
// // }

// // // // package main

// // // // import (
// // // // 	"backend/handler"
// // // // 	"backend/repository"
// // // // 	"backend/service"
// // // // 	"context"
// // // // 	"fmt"
// // // // 	"github.com/dgrijalva/jwt-go"
// // // // "github.com/gin-contrib/cors"
// // // // 	"github.com/gin-gonic/gin"
// // // // 	"github.com/go-redis/redis/v8"
// // // // 	"github.com/jmoiron/sqlx"
// // // // 	"github.com/joho/godotenv"
// // // // 	_ "github.com/lib/pq"
// // // // 	"io/ioutil"
// // // // 	"log"
// // // // 	"net/http"
// // // // 	"os"
// // // // 	"os/signal"
// // // // 	"strconv"
// // // // 	"syscall"

// // // // // )
// // // // import (
// // // // 	"net/http"
// // // // 	"github.com/gin-contrib/cors"
// // // // 	"github.com/gin-gonic/gin"
// // // // 	"time"
// // // // )

// // // // func main() {
// // // // 	router := gin.Default()
// // // // 	router.Use(cors.New(cors.Config{
// // // // 		AllowOrigins:     []string{"http://localhost:3000"},
// // // // 		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
// // // // 		AllowHeaders:     []string{"Content-Type"},
// // // // 		ExposeHeaders:    []string{"Content-Length"},
// // // // 		AllowCredentials: true,
// // // // 		AllowOriginFunc: func(origin string) bool {
// // // // 			return origin == "http://localhost:3000"
// // // // 		},
// // // // 		MaxAge: 12 * time.Hour,
// // // // 	}))
// // // // 	router.POST("/api/auth/signup", Signup)
// // // // 	router.Run("127.0.0.1:8080")
// // // // }

// // // // signupReq is not exported, hence the lowercase name
// // // // it is used for validation and json marshalling
// // // type signupReq struct {
// // // 	Name     string `json:"name" binding:"required"`
// // // 	Email    string `json:"email" binding:"required,email"`
// // // 	Password string `json:"password" binding:"required,gte=6,lte=30"`
// // // }

// // // // Signup handler
// // // func Signup(c *gin.Context) {
// // // 	token := "Shimin Li"
// // // 	c.SetCookie("name1800", token, 3600, "/", "localhost", false, true)
// // // 	// define a variable to which we'll bind incoming
// // // 	// json body, {email, password}
// // // 	var req signupReq

// // // 	// // Bind incoming json to struct and check for validation errors
// // // 	if ok := bindData(c, &req); !ok {
// // // 		return
// // // 	}

// // // 	u := &model.User{
// // // 		Name:     req.Name,
// // // 		Email:    req.Email,
// // // 		Password: req.Password,
// // // 	}

// // // 	ctx := c.Request.Context()
// // // 	result, err := h.UserService.Signup(ctx, u)

// // // 	if err != nil {
// // // 		log.Printf("Failed to sign up user: %v\n", err.Error())
// // // 		c.JSON(apperrors.Status(err), gin.H{
// // // 			"error": err,
// // // 		})
// // // 		return
// // // 	}

// // // 	// create token pair as strings
// // // 	tokens, err := h.TokenService.NewPairFromUser(ctx, u, "")

// // // 	if err != nil {
// // // 		log.Printf("Failed to create tokens for user: %v\n", err.Error())

// // // 		// may eventually implement rollback logic here
// // // 		// meaning, if we fail to create tokens after creating a user,
// // // 		// we make sure to clear/delete the created user in the database

// // // 		c.JSON(apperrors.Status(err), gin.H{
// // // 			"error": err,
// // // 		})
// // // 		return
// // // 	}

// // // 	accessToken := tokens.IDToken.SS
// // // 	// refreshToken := tokens.RefreshToken.SS
// // // 	fmt.Println("accessToken", accessToken)
// // // 	// fmt.Println("refreshToken", refreshToken)
// // // 	fmt.Println("tokens", tokens)
// // // 	//   maxAge: 60 * 60 * 24, // 1 day
// // // 	//   maxAge: 60 * 60 * 24 * 30, // 1 Month
// // // 	c.SetCookie("token", accessToken, 60*60*24, "/", "localhost", false, true)
// // // 	// c.SetCookie("refreshToken", refreshToken, 60*60*24*30, "/", "localhost", false, true)

// // // 	c.JSON(http.StatusCreated, gin.H{
// // // 		"message": "Success SignUp",
// // // 		// "user":    result,
// // // 	})
// // // }

// // // // 	loadEnv()
// // // // 	log.Println("Starting server...")

// // // // 	ds, err := initDS()
// // // 	if err != nil {
// // // 		log.Fatalf("Unable to initialize data sources: %v\n", err)
// // // 	}

// // // 	router, err := inject(ds)

// // // 	if err != nil {
// // // 		log.Fatalf("Failure to inject data sources: %v\n", err)
// // // 	}

// // // 	srv := &http.Server{
// // // 		Addr:    "127.0.0.1:8080",
// // // 		Handler: router,
// // // 	}
// // // 	go func() {
// // // 		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
// // // 			log.Fatalf("Failed to initialize server: %v\n", err)
// // // 		}
// // // 	}()

// // // 	log.Printf("Listening on port %v\n", srv.Addr)

// // // 	// Wait for kill signal of channel
// // // 	quit := make(chan os.Signal)

// // // 	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

// // // // 	// This blocks until a signal is passed into the quit channel
// // // // 	<-quit

// // // // 	// The context is used to inform the server it has 5 seconds to finish
// // // // 	// the request it is currently handling
// // // // 	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
// // // // 	defer cancel()

// // // // 	// shutdown data sources
// // // // 	if err := ds.close(); err != nil {
// // // // 		log.Fatalf("A problem occurred gracefully shutting down data sources: %v\n", err)
// // // // 	}

// // // // 	// Shutdown server
// // // // 	log.Println("Shutting down server...")
// // // // 	if err := srv.Shutdown(ctx); err != nil {
// // // // 		log.Fatalf("Server forced to shutdown: %v\n", err)
// // // // 	}
// // // // }

// // // // func inject(d *dataSources) (*gin.Engine, error) {
// // // // 	loadEnv()
// // // // 	log.Println("Injecting data sources")
// // // // 	/*
// // // // 	 * repository layer
// // // // 	 */
// // // // 	addressRepository := repository.NewAddressRepository(d.DB)
// // // // 	authRepository := repository.NewAuthRepository(d.DB)
// // // // 	cartRepository := repository.NewCartRepository(d.DB)
// // // // 	categoryRepository := repository.NewCategoryRepository(d.DB)
// // // // 	orderRepository := repository.NewOrderRepository(d.DB)
// // // // 	paymentRepository := repository.NewPaymentRepository(d.DB)
// // // // 	productRepository := repository.NewProductRepository(d.DB)
// // // // 	productImageRepository := repository.NewProductImageRepository(d.DB)
// // // // 	reviewRepository := repository.NewReviewRepository(d.DB)
// // // // 	tokenRepository := repository.NewTokenRepository(d.RedisClient)
// // // // 	userRepository := repository.NewUserRepository(d.DB)
// // // // 	wishlistRepository := repository.NewWishlistRepository(d.DB)

// // // // 	// AddressService     model.AddressService
// // // // 	// AuthService     model.AuthService
// // // // 	// CartService     model.CartService
// // // // 	// CategoryService model.CategoryService
// // // // 	// OrderService    model.OrderService
// // // // 	// PaymentService  model.PaymentService
// // // // 	// ProductService  model.ProductService
// // // // 	// ReviewService   model.ReviewService
// // // // 	// TokenService    model.TokenService
// // // // 	// UserService     model.UserService
// // // // 	/*
// // // // 	 * service layer
// // // // 	 */
// // // // 	addressService := service.NewAddressService(&service.AddressServiceConfig{
// // // // 		AddressRepository: addressRepository,
// // // // 	})
// // // // 	authService := service.NewAuthService(&service.AuthServiceConfig{
// // // // 		AuthRepository: authRepository,
// // // // 	})
// // // // 	cartService := service.NewCartService(&service.CartServiceConfig{
// // // // 		CartRepository: cartRepository,
// // // // 	})
// // // // 	categoryService := service.NewCategoryService(&service.CategoryServiceConfig{
// // // // 		CategoryRepository: categoryRepository,
// // // // 	})
// // // // 	// chatService := service.NewChatService(&service.ChatServiceConfig{
// // // // 	// 	ChatRepository: chatRepository,
// // // // 	// })

// // // // 	orderService := service.NewOrderService(&service.OrderServiceConfig{
// // // // 		OrderRepository: orderRepository,
// // // // 	})

// // // // 	paymentService := service.NewPaymentService(&service.PaymentServiceConfig{
// // // // 		PaymentRepository: paymentRepository,
// // // // 	})
// // // // 	productService := service.NewProductService(&service.ProductServiceConfig{
// // // // 		ProductRepository:      productRepository,
// // // // 		ProductImageRepository: productImageRepository,
// // // // 	})

// // // // 	reviewService := service.NewReviewService(&service.ReviewServiceConfig{
// // // // 		ReviewRepository: reviewRepository,
// // // // 	})

// // // // 	userService := service.NewUserService(&service.USConfig{
// // // // 		UserRepository: userRepository,
// // // // 		CartRepository: cartRepository,
// // // // 	})
// // // // 	wishlistService := service.NewWishlistService(&service.WishlistServiceConfig{
// // // // 		WishlistRepository:     wishlistRepository,
// // // // 		ReviewRepository:       reviewRepository,
// // // // 		ProductImageRepository: productImageRepository,
// // // // 	})

// // // // 	// load rsa keys
// // // // 	privKeyFile := os.Getenv("PRIV_KEY_FILE")
// // // // 	priv, err := ioutil.ReadFile(privKeyFile)

// // // // 	if err != nil {
// // // // 		return nil, fmt.Errorf("could not read private key pem file: %w", err)
// // // // 	}

// // // // 	privKey, err := jwt.ParseRSAPrivateKeyFromPEM(priv)

// // // // 	if err != nil {
// // // // 		return nil, fmt.Errorf("could not parse private key: %w", err)
// // // // 	}

// // // // 	pubKeyFile := os.Getenv("PUB_KEY_FILE")
// // // // 	pub, err := ioutil.ReadFile(pubKeyFile)

// // // // 	if err != nil {
// // // // 		return nil, fmt.Errorf("could not read public key pem file: %w", err)
// // // // 	}

// // // // 	pubKey, err := jwt.ParseRSAPublicKeyFromPEM(pub)

// // // // 	if err != nil {
// // // // 		return nil, fmt.Errorf("could not parse public key: %w", err)
// // // // 	}

// // // // 	// load refresh token secret from env variable
// // // // 	refreshSecret := os.Getenv("REFRESH_SECRET")

// // // // 	// load expiration lengths from env variables and parse as int
// // // // 	idTokenExp := os.Getenv("ID_TOKEN_EXP")
// // // // 	refreshTokenExp := os.Getenv("REFRESH_TOKEN_EXP")

// // // // 	idExp, err := strconv.ParseInt(idTokenExp, 0, 64)
// // // // 	if err != nil {
// // // // 		return nil, fmt.Errorf("could not parse ID_TOKEN_EXP as int: %w", err)
// // // // 	}

// // // // 	refreshExp, err := strconv.ParseInt(refreshTokenExp, 0, 64)
// // // // 	if err != nil {
// // // // 		return nil, fmt.Errorf("could not parse REFRESH_TOKEN_EXP as int: %w", err)
// // // // 	}

// // // // 	tokenService := service.NewTokenService(&service.TSConfig{
// // // // 		TokenRepository:       tokenRepository,
// // // // 		PrivKey:               privKey,
// // // // 		PubKey:                pubKey,
// // // // 		RefreshSecret:         refreshSecret,
// // // // 		IDExpirationSecs:      idExp,
// // // // 		RefreshExpirationSecs: refreshExp,
// // // // 	})

// // // // 	router := gin.Default()
// // // // 	// router.Use(cors.New(cors.Config{
// // // // 	// 	AllowOrigins:     []string{"http://localhost:3000"},
// // // // 	// 	AllowMethods:     []string{"GET", "POST"},
// // // // 	// 	AllowHeaders:     []string{"Content-Type"},
// // // // 	// 	ExposeHeaders:    []string{"Content-Length"},
// // // // 	// 	AllowCredentials: true,
// // // // 	// 	AllowOriginFunc: func(origin string) bool {
// // // // 	// 		return origin == "http://localhost:3000"
// // // // 	// 	},
// // // // 	// 	MaxAge: 12 * time.Hour,
// // // // 	// }))
// // // // 	// router.Use(cors.New(cors.Config{
// // // // 	// 	// ExposeHeaders: []string{"Content-Length"},
// // // // 	// 	// // アクセス許可するオリジン
// // // // 	// 	// AllowOrigins: []string{
// // // // 	// 	// 	"http://localhost:3000",
// // // // 	// 	// },
// // // // 	// 	// // アクセス許可するHTTPメソッド
// // // // 	// 	// AllowMethods: []string{
// // // // 	// 	// 	"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS",
// // // // 	// 	// },
// // // // 	// 	// // 許可するHTTPリクエストヘッダ
// // // // 	// 	// AllowHeaders: []string{
// // // // 	// 	// 	"Origin", "Content-Length", "Content-Type", "Authorization",
// // // // 	// 	// },
// // // // 	// 	// // cookieなどの情報を必要とするかどうか
// // // // 	// 	// // AllowCredentials: true,
// // // // 	// 	// // preflightリクエストの結果をキャッシュする時間
// // // // 	// 	// MaxAge: 24 * time.Hour,
// // // // 	// 	AllowOrigins: []string{"http://localhost:3000"},
// // // // 	// 	AllowMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
// // // // 	// 	AllowHeaders: []string{
// // // // 	// 		"Origin", "Content-Length", "Content-Type", "Authorization",
// // // // 	// 	},
// // // // 	// 	ExposeHeaders:    []string{"Content-Length"},
// // // // 	// 	AllowCredentials: true,
// // // // 	// 	// AllowOriginFunc: func(origin string) bool {
// // // // 	// 	// 	return origin == "https://github.com"
// // // // 	// 	// },
// // // // 	// 	MaxAge: 12 * time.Hour,
// // // // 	// }))
// // // // 	// router.Use(cors.New(cors.Config{
// // // // 	// 	AllowOrigins:     []string{"http://localhost:3000"},
// // // // 	// 	AllowMethods:     []string{"GET","POST","PUT", "PATCH", "DELETE"},
// // // // 	// 	AllowHeaders:     []string{"Origin"},
// // // // 	// router.Use(cors.Default())
// // // // 	baseURL := os.Getenv("BACKEND_API_URL")
// // // // 	handlerTimeout := os.Getenv("HANDLER_TIMEOUT")
// // // // 	ht, err := strconv.ParseInt(handlerTimeout, 0, 64)
// // // // 	if err != nil {
// // // // 		return nil, fmt.Errorf("could not parse HANDLER_TIMEOUT as int: %w", err)
// // // // 	}
// // // // 	maxBodyBytes := "4194304"
// // // // 	mbb, err := strconv.ParseInt(maxBodyBytes, 0, 64)
// // // // 	if err != nil {
// // // // 		return nil, fmt.Errorf("could not parse MAX_BODY_BYTES as int: %w", err)
// // // // 	}

// // // // 	handler.NewHandler(&handler.Config{
// // // // 		R:               router,
// // // // 		AddressService:  addressService,
// // // // 		AuthService:     authService,
// // // // 		CartService:     cartService,
// // // // 		CategoryService: categoryService,
// // // // 		// ChatService:     chatService,
// // // // 		// ImageService:    imageService,
// // // // 		OrderService:    orderService,
// // // // 		PaymentService:  paymentService,
// // // // 		ProductService:  productService,
// // // // 		ReviewService:   reviewService,
// // // // 		TokenService:    tokenService,
// // // // 		UserService:     userService,
// // // // 		WishlistService: wishlistService,
// // // // 		BaseURL:         baseURL,
// // // // 		TimeoutDuration: time.Duration(time.Duration(ht) * time.Second),
// // // // 		MaxBodyBytes:    mbb,
// // // // 	})
// // // // 	return router, nil
// // // // }

// // // // type dataSources struct {
// // // // 	DB          *sqlx.DB
// // // // 	RedisClient *redis.Client
// // // // }

// // // // // InitDS establishes connections to fields in dataSources
// // // // func initDS() (*dataSources, error) {
// // // // 	log.Printf("Initializing data sources\n")
// // // // 	pgHost := "localhost"
// // // // 	pgPort := "5432"
// // // // 	pgUser := "postgres"
// // // // 	pgPassword := "password"
// // // // 	pgDB := "portfolio_db"
// // // // 	pgSSL := "disable"

// // // // 	pgConnString := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s", pgHost, pgPort, pgUser, pgPassword, pgDB, pgSSL)

// // // // 	log.Printf("Connecting to Postgresql\n")
// // // // 	db, err := sqlx.Open("postgres", pgConnString)

// // // // 	if err != nil {
// // // // 		return nil, fmt.Errorf("error opening db: %w", err)
// // // // 	}

// // // // 	if err := db.Ping(); err != nil {
// // // // 		return nil, fmt.Errorf("error connecting to db: %w", err)
// // // // 	}
// // // // 	redisHost := "localhost"
// // // // 	redisPort := "6379"
// // // // 	log.Printf("Connecting to Redis\n")
// // // // 	rdb := redis.NewClient(&redis.Options{
// // // // 		Addr:     fmt.Sprintf("%s:%s", redisHost, redisPort),
// // // // 		Password: "",
// // // // 		DB:       0,
// // // // 	})
// // // // 	// verify redis connection
// // // // 	_, err = rdb.Ping(context.Background()).Result()

// // // // 	if err != nil {
// // // // 		return nil, fmt.Errorf("error connecting to redis: %w", err)
// // // // 	}
// // // // 	return &dataSources{
// // // // 		DB:          db,
// // // // 		RedisClient: rdb,
// // // // 	}, nil
// // // // }

// // // // func (d *dataSources) close() error {
// // // // 	if err := d.DB.Close(); err != nil {
// // // // 		return fmt.Errorf("error closing Postgresql: %w", err)
// // // // 	}
// // // // 	if err := d.RedisClient.Close(); err != nil {
// // // // 		return fmt.Errorf("error closing Redis Client: %w", err)
// // // // 	}
// // // // 	return nil
// // // // }

// // // // func loadEnv() {
// // // // 	err := godotenv.Load(".env.dev")
// // // // 	if err != nil {
// // // // 		fmt.Printf("Could not read env: %v", err)
// // // // 	}
// // // // }
