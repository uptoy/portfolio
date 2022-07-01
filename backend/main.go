package main

import (
	"backend/config"
	"backend/handler"
	"backend/repository"
	"backend/service"
	"context"
	"crypto/rsa"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"syscall"
	"time"

	secretmanager "cloud.google.com/go/secretmanager/apiv1"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	redis "github.com/go-redis/redis/v8"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	secretmanagerpb "google.golang.org/genproto/googleapis/cloud/secretmanager/v1"
)

func main() {
	config.LoadEnv()
	log.Println("Starting server...")
	ds, err := initDS()
	fmt.Println(ds)
	if err != nil {
		log.Fatalf("Unable to initialize data sources: %v\n", err)
	}
	router, err := inject(ds)
	if err != nil {
		log.Fatalf("Failure to inject data sources: %v\n", err)
	}
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("defaulting to port %s", port)
	}
	router.Run("0.0.0.0:" + port) // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
	log.Printf("Listening on port %v\n", port)
	// Wait for kill signal of channel
	quit := make(chan os.Signal)

	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	// This blocks until a signal is passed into the quit channel
	<-quit

	// The context is used to inform the server it has 5 seconds to finish
	// the request it is currently handling
	// shutdown data sources
	if err := ds.close(); err != nil {
		log.Fatalf("A problem occurred gracefully shutting down data sources: %v\n", err)
	}
	// shutdown data sources
	if err := ds.close(); err != nil {
		log.Fatalf("A problem occurred gracefully shutting down data sources: %v\n", err)
	}
}

func inject(d *dataSources) (*gin.Engine, error) {
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
		CartRepository:         cartRepository,
		ProductImageRepository: productImageRepository,
	})
	categoryService := service.NewCategoryService(&service.CategoryServiceConfig{
		CategoryRepository: categoryRepository,
	})
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
	pubKey, err := getPubKey()
	if err != nil {
		return nil, fmt.Errorf("could not parse public key: %w", err)
	}
	privKey, err := getPrivKey()
	if err != nil {
		return nil, fmt.Errorf("could not parse private key: %w", err)
	}
	// load expiration lengths from env variables and parse as int
	refreshSecret := os.Getenv("REFRESH_SECRET")
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
	if os.Getenv("ENV") != "local" {
		router.Use(cors.New(cors.Config{
			AllowOrigins:     []string{"http://localhost:3000"},
			AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"},
			AllowHeaders:     []string{"Origin", "Content-Type"},
			ExposeHeaders:    []string{"Content-Length"},
			AllowCredentials: true,
			AllowOriginFunc: func(origin string) bool {
				return origin == "http://localhost:3000"
			},
			MaxAge: 12 * time.Hour,
		}))
	}
	if os.Getenv("ENV") != "production" {
		router.Use(cors.New(cors.Config{
			AllowOrigins:     []string{"https://frontend-kighwilmrq-an.a.run.app"},
			AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"},
			AllowHeaders:     []string{"Origin", "Content-Type"},
			ExposeHeaders:    []string{"Content-Length"},
			AllowCredentials: true,
			AllowOriginFunc: func(origin string) bool {
				return origin == "https://frontend-kighwilmrq-an.a.run.app"
			},
			MaxAge: 12 * time.Hour,
		}))
	}
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "connect portfolio backend",
		})
	})
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
	db, err := connectDB()
	if err != nil {
		return nil, fmt.Errorf("error connecting to db: %w", err)
	}
	redisHost := os.Getenv("REDIS_HOST")
	redisPort := os.Getenv("REDIS_PORT")
	log.Printf("Connecting to Redis\n")
	rdb := redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:%s", redisHost, redisPort),
		Password: "",
		DB:       0,
	})
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
func accessSecret(name string) []byte {
	ctx := context.Background()
	client, err := secretmanager.NewClient(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Close()
	reqPrivate := &secretmanagerpb.AccessSecretVersionRequest{
		Name: name,
	}
	result, err := client.AccessSecretVersion(ctx, reqPrivate)
	if err != nil {
		log.Fatal(err)
	}
	key := result.Payload.Data
	return key
}

func configureConnectionPool(db *sqlx.DB) {
	db.SetMaxIdleConns(5)
	db.SetMaxOpenConns(7)
	db.SetConnMaxLifetime(1800 * time.Second)
}

func connectUnixSocket() (*sqlx.DB, error) {
	mustGetenv := func(k string) string {
		v := os.Getenv(k)
		if v == "" {
			log.Fatalf("Warning: %s environment variable not set.\n", k)
		}
		return v
	}
	var (
		dbUser         = mustGetenv("DB_USER")              // e.g. 'my-db-user'
		dbPwd          = mustGetenv("DB_PASS")              // e.g. 'my-db-password'
		unixSocketPath = mustGetenv("INSTANCE_UNIX_SOCKET") // e.g. '/cloudsql/project:region:instance'
		dbName         = mustGetenv("DB_NAME")              // e.g. 'my-database'
	)

	dbURI := fmt.Sprintf("user=%s password=%s database=%s host=%s",
		dbUser, dbPwd, dbName, unixSocketPath)

	dbPool, err := sqlx.Open("postgres", dbURI)
	if err != nil {
		return nil, fmt.Errorf("sqlx.Open: %v", err)
	}
	configureConnectionPool(dbPool)
	return dbPool, nil
}

func connectTCPSocket() (*sqlx.DB, error) {
	mustGetenv := func(k string) string {
		v := os.Getenv(k)
		if v == "" {
			log.Fatalf("Warning: %s environment variable not set.", k)
		}
		return v
	}
	var (
		dbUser    = mustGetenv("DB_USER")       // e.g. 'my-db-user'
		dbPwd     = mustGetenv("DB_PASS")       // e.g. 'my-db-password'
		dbTCPHost = mustGetenv("INSTANCE_HOST") // e.g. '127.0.0.1' ('172.17.0.1' if deployed to GAE Flex)
		dbPort    = mustGetenv("DB_PORT")       // e.g. '5432'
		dbName    = mustGetenv("DB_NAME")       // e.g. 'my-database'
	)

	dbURI := fmt.Sprintf("host=%s user=%s password=%s port=%s database=%s",
		dbTCPHost, dbUser, dbPwd, dbPort, dbName)
	if dbRootCert, ok := os.LookupEnv("DB_ROOT_CERT"); ok { // e.g., '/path/to/my/server-ca.pem'
		var (
			dbCert = mustGetenv("DB_CERT") // e.g. '/path/to/my/client-cert.pem'
			dbKey  = mustGetenv("DB_KEY")  // e.g. '/path/to/my/client-key.pem'
		)
		dbURI += fmt.Sprintf(" sslmode=require sslrootcert=%s sslcert=%s sslkey=%s",
			dbRootCert, dbCert, dbKey)
	}
	dbPool, err := sqlx.Open("postgres", dbURI)
	if err != nil {
		return nil, fmt.Errorf("sqlx.Open: %v", err)
	}
	configureConnectionPool(dbPool)
	return dbPool, nil
}

func connectDB() (*sqlx.DB, error) {
	//ローカル環境の場合
	db, err := LocalConnectDB()
	if err != nil {
		log.Fatalf("connectTCPSocket: unable to connect: %s", err)
	}
	//本番環境の場合
	if os.Getenv("ENV") != "production" {
		if os.Getenv("INSTANCE_HOST") != "" {
			db, err := connectTCPSocket()
			if err != nil {
				log.Fatalf("connectTCPSocket: unable to connect: %s", err)
			}
			return db, nil
		}
		if os.Getenv("INSTANCE_UNIX_SOCKET") != "" {
			db, err := connectUnixSocket()
			if err != nil {
				log.Fatalf("connectUnixSocket: unable to connect: %s", err)
			}
			return db, nil
		}
	}
	return db, nil
}

func LocalConnectDB() (*sqlx.DB, error) {
	pgHost := os.Getenv("PG_HOST")
	pgPort := os.Getenv("DB_PORT")
	pgUser := os.Getenv("DB_USER")
	pgPassword := os.Getenv("DB_PASS")
	pgDB := os.Getenv("DB_NAME")
	pgSSL := os.Getenv("PG_SSL")
	pgConnString := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s", pgHost, pgPort, pgUser, pgPassword, pgDB, pgSSL)
	log.Printf("Connecting to Postgresql\n")
	db, err := sqlx.Open("postgres", pgConnString)
	if err != nil {
		return nil, fmt.Errorf("error opening db: %w", err)
	}
	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("error connecting to db: %w", err)
	}
	return db, nil
}

//Private Key
func getPrivKey() (*rsa.PrivateKey, error) {
	//ローカル環境の場合
	pubKey, err := getLocalPrivKey()
	if err != nil {
		return nil, fmt.Errorf("could not parse public key: %w", err)
	}
	//本番環境の場合
	if os.Getenv("ENV") == "production" {
		pubKey, err := getProdPrivKey()
		if err != nil {
			return nil, fmt.Errorf("could not parse public key: %w", err)
		}
		return pubKey, nil
	}
	return pubKey, nil
}

//ローカル環境の場合(Private)
func getLocalPrivKey() (*rsa.PrivateKey, error) {
	privKeyFile := os.Getenv("PRIV_KEY_FILE")
	priv, err := ioutil.ReadFile(privKeyFile)
	if err != nil {
		return nil, fmt.Errorf("could not read private key pem file: %w", err)
	}
	privKey, err := jwt.ParseRSAPrivateKeyFromPEM(priv)
	if err != nil {
		return nil, fmt.Errorf("could not parse private key: %w", err)
	}
	return privKey, nil
}

//本番環境の場合(Private)
func getProdPrivKey() (*rsa.PrivateKey, error) {
	privateName := os.Getenv("PRIVATE_NAME")
	priv := accessSecret(privateName)
	privKey, err := jwt.ParseRSAPrivateKeyFromPEM(priv)
	if err != nil {
		return nil, fmt.Errorf("could not parse private key: %w", err)
	}
	return privKey, nil
}

//Public Key
func getPubKey() (*rsa.PublicKey, error) {
	//ローカル環境の場合
	pubKey, err := getLocalPubKey()
	if err != nil {
		return nil, fmt.Errorf("could not parse public key: %w", err)
	}
	//本番環境の場合
	if os.Getenv("ENV") == "production" {
		pubKey, err := getProdPubKey()
		if err != nil {
			return nil, fmt.Errorf("could not parse public key: %w", err)
		}
		return pubKey, nil
	}
	return pubKey, nil
}

//ローカルの場合(Public)
func getLocalPubKey() (*rsa.PublicKey, error) {
	pubKeyFile := os.Getenv("PUB_KEY_FILE")
	pub, err := ioutil.ReadFile(pubKeyFile)
	if err != nil {
		return nil, fmt.Errorf("could not read public key pem file: %w", err)
	}
	pubKey, err := jwt.ParseRSAPublicKeyFromPEM(pub)
	if err != nil {
		return nil, fmt.Errorf("could not parse public key: %w", err)
	}
	return pubKey, nil
}

//本番環境の場合(Public)
func getProdPubKey() (*rsa.PublicKey, error) {
	publicName := os.Getenv("PUBLIC_NAME")
	pub := accessSecret(publicName)
	pubKey, err := jwt.ParseRSAPublicKeyFromPEM(pub)
	if err != nil {
		return nil, fmt.Errorf("could not parse public key: %w", err)
	}
	return pubKey, nil
}
