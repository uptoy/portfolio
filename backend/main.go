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

	// AddressService     model.AddressService
	// AuthService     model.AuthService
	// CartService     model.CartService
	// CategoryService model.CategoryService
	// OrderService    model.OrderService
	// PaymentService  model.PaymentService
	// ProductService  model.ProductService
	// ReviewService   model.ReviewService
	// TokenService    model.TokenService
	// UserService     model.UserService
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
		WishlistRepository: wishlistRepository,
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

	// router := gin.Default()
	router := gin.New()
	router.Use(gin.Logger())
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	router.Use(cors.New(config))
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
