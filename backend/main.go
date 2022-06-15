// package main

// import (
// 	"backend/handler"
// 	"backend/repository"
// 	"backend/service"
// 	secretmanager "cloud.google.com/go/secretmanager/apiv1"
// 	"context"
// 	"fmt"
// 	"github.com/dgrijalva/jwt-go"
// 	"github.com/gin-contrib/cors"
// 	"github.com/gin-gonic/gin"
// 	redis "github.com/go-redis/redis/v8"
// 	"github.com/jmoiron/sqlx"
// 	"github.com/joho/godotenv"
// 	_ "github.com/lib/pq"
// 	secretmanagerpb "google.golang.org/genproto/googleapis/cloud/secretmanager/v1"
// 	"io/ioutil"
// 	"log"
// 	"net/http"
// 	"os"
// 	"os/signal"
// 	"strconv"
// 	"syscall"
// 	"time"
// )

// func main() {
// 	// loadEnv()
// 	log.Println("Starting server...")

// 	ds, err := initDS()
// 	if err != nil {
// 		log.Fatalf("Unable to initialize data sources: %v\n", err)
// 	}

// 	router, err := inject(ds)

// 	if err != nil {
// 		log.Fatalf("Failure to inject data sources: %v\n", err)
// 	}
// 	port := os.Getenv("PORT")
// 	if port == "" {
// 		port = "8080"
// 	}

// 	srv := &http.Server{
// 		Addr:    "127.0.0.1:" + port,
// 		Handler: router,
// 	}
// 	go func() {
// 		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
// 			log.Fatalf("Failed to initialize server: %v\n", err)
// 		}
// 	}()

// 	log.Printf("Listening on port %v\n", srv.Addr)

// 	// Wait for kill signal of channel
// 	quit := make(chan os.Signal)

// 	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

// 	// This blocks until a signal is passed into the quit channel
// 	<-quit

// 	// The context is used to inform the server it has 5 seconds to finish
// 	// the request it is currently handling
// 	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
// 	defer cancel()

// 	// shutdown data sources
// 	if err := ds.close(); err != nil {
// 		log.Fatalf("A problem occurred gracefully shutting down data sources: %v\n", err)
// 	}

// 	// Shutdown server
// 	log.Println("Shutting down server...")
// 	if err := srv.Shutdown(ctx); err != nil {
// 		log.Fatalf("Server forced to shutdown: %v\n", err)
// 	}
// }

// func inject(d *dataSources) (*gin.Engine, error) {
// 	// loadEnv()
// 	log.Println("Injecting data sources")
// 	/*
// 	 * repository layer
// 	 */
// 	addressRepository := repository.NewAddressRepository(d.DB)
// 	authRepository := repository.NewAuthRepository(d.DB)
// 	cartRepository := repository.NewCartRepository(d.DB)
// 	categoryRepository := repository.NewCategoryRepository(d.DB)
// 	orderRepository := repository.NewOrderRepository(d.DB)
// 	paymentRepository := repository.NewPaymentRepository(d.DB)
// 	productRepository := repository.NewProductRepository(d.DB)
// 	productImageRepository := repository.NewProductImageRepository(d.DB)
// 	reviewRepository := repository.NewReviewRepository(d.DB)
// 	tokenRepository := repository.NewTokenRepository(d.RedisClient)
// 	userRepository := repository.NewUserRepository(d.DB)
// 	wishlistRepository := repository.NewWishlistRepository(d.DB)

// 	/*
// 	 * service layer
// 	 */
// 	addressService := service.NewAddressService(&service.AddressServiceConfig{
// 		AddressRepository: addressRepository,
// 	})
// 	authService := service.NewAuthService(&service.AuthServiceConfig{
// 		AuthRepository: authRepository,
// 	})
// 	cartService := service.NewCartService(&service.CartServiceConfig{
// 		CartRepository:         cartRepository,
// 		ProductImageRepository: productImageRepository,
// 	})
// 	categoryService := service.NewCategoryService(&service.CategoryServiceConfig{
// 		CategoryRepository: categoryRepository,
// 	})
// 	// chatService := service.NewChatService(&service.ChatServiceConfig{
// 	// 	ChatRepository: chatRepository,
// 	// })

// 	orderService := service.NewOrderService(&service.OrderServiceConfig{
// 		OrderRepository: orderRepository,
// 	})

// 	paymentService := service.NewPaymentService(&service.PaymentServiceConfig{
// 		PaymentRepository: paymentRepository,
// 	})
// 	productService := service.NewProductService(&service.ProductServiceConfig{
// 		ProductRepository:      productRepository,
// 		ProductImageRepository: productImageRepository,
// 	})

// 	reviewService := service.NewReviewService(&service.ReviewServiceConfig{
// 		ReviewRepository: reviewRepository,
// 	})

// 	userService := service.NewUserService(&service.USConfig{
// 		UserRepository: userRepository,
// 		CartRepository: cartRepository,
// 	})
// 	wishlistService := service.NewWishlistService(&service.WishlistServiceConfig{
// 		WishlistRepository:     wishlistRepository,
// 		ReviewRepository:       reviewRepository,
// 		ProductImageRepository: productImageRepository,
// 	})

// 	// load rsa keys
// 	privKeyFile := os.Getenv("PRIV_KEY_FILE")
// 	priv, err := ioutil.ReadFile(privKeyFile)

// 	if err != nil {
// 		return nil, fmt.Errorf("could not read private key pem file: %w", err)
// 	}

// 	privKey, err := jwt.ParseRSAPrivateKeyFromPEM(priv)

// 	if err != nil {
// 		return nil, fmt.Errorf("could not parse private key: %w", err)
// 	}

// 	pubKeyFile := os.Getenv("PUB_KEY_FILE")
// 	pub, err := ioutil.ReadFile(pubKeyFile)

// 	if err != nil {
// 		return nil, fmt.Errorf("could not read public key pem file: %w", err)
// 	}

// 	pubKey, err := jwt.ParseRSAPublicKeyFromPEM(pub)

// 	if err != nil {
// 		return nil, fmt.Errorf("could not parse public key: %w", err)
// 	}
// 	refreshSecret := os.Getenv("REFRESH_SECRET")
// 	idTokenExp := os.Getenv("ID_TOKEN_EXP")
// 	refreshTokenExp := os.Getenv("REFRESH_TOKEN_EXP")

// 	idExp, err := strconv.ParseInt(idTokenExp, 0, 64)
// 	if err != nil {
// 		return nil, fmt.Errorf("could not parse ID_TOKEN_EXP as int: %w", err)
// 	}

// 	refreshExp, err := strconv.ParseInt(refreshTokenExp, 0, 64)
// 	if err != nil {
// 		return nil, fmt.Errorf("could not parse REFRESH_TOKEN_EXP as int: %w", err)
// 	}

// 	tokenService := service.NewTokenService(&service.TSConfig{
// 		TokenRepository:       tokenRepository,
// 		PrivKey:               privKey,
// 		PubKey:                pubKey,
// 		RefreshSecret:         refreshSecret,
// 		IDExpirationSecs:      idExp,
// 		RefreshExpirationSecs: refreshExp,
// 	})

// 	router := gin.Default()
// 	router.Use(cors.New(cors.Config{
// 		AllowOrigins:     []string{"*"},
// 		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
// 		AllowHeaders:     []string{"Content-Type"},
// 		ExposeHeaders:    []string{"Content-Length"},
// 		AllowCredentials: true,
// 		AllowOriginFunc: func(origin string) bool {
// 			return origin == "*"
// 		},
// 		MaxAge: 12 * time.Hour,
// 	}))
// 	baseURL := os.Getenv("BACKEND_API_URL")
// 	handlerTimeout := os.Getenv("HANDLER_TIMEOUT")
// 	ht, err := strconv.ParseInt(handlerTimeout, 0, 64)
// 	if err != nil {
// 		return nil, fmt.Errorf("could not parse HANDLER_TIMEOUT as int: %w", err)
// 	}
// 	maxBodyBytes := "4194304"
// 	mbb, err := strconv.ParseInt(maxBodyBytes, 0, 64)
// 	if err != nil {
// 		return nil, fmt.Errorf("could not parse MAX_BODY_BYTES as int: %w", err)
// 	}

// 	handler.NewHandler(&handler.Config{
// 		R:               router,
// 		AddressService:  addressService,
// 		AuthService:     authService,
// 		CartService:     cartService,
// 		CategoryService: categoryService,
// 		OrderService:    orderService,
// 		PaymentService:  paymentService,
// 		ProductService:  productService,
// 		ReviewService:   reviewService,
// 		TokenService:    tokenService,
// 		UserService:     userService,
// 		WishlistService: wishlistService,
// 		BaseURL:         baseURL,
// 		TimeoutDuration: time.Duration(time.Duration(ht) * time.Second),
// 		MaxBodyBytes:    mbb,
// 	})
// 	return router, nil
// }

// type dataSources struct {
// 	DB          *sqlx.DB
// 	RedisClient *redis.Client
// }

// func initDS() (*dataSources, error) {
// 	var (
// 		db  *sqlx.DB
// 		err error
// 	)
// 	log.Printf("Initializing data sources\n")
// 	if os.Getenv("INSTANCE_HOST") != "" {

// 		db, err = connectTCPSocket()
// 		if err != nil {
// 			log.Fatalf("connectTCPSocket: unable to connect: %s", err)
// 		}
// 	}
// 	if os.Getenv("INSTANCE_UNIX_SOCKET") != "" {
// 		db, err = connectUnixSocket()
// 		if err != nil {
// 			log.Fatalf("connectUnixSocket: unable to connect: %s", err)
// 		}
// 	}
// 	if db == nil {
// 		log.Fatal("Missing database connection type. Please define one of INSTANCE_HOST, INSTANCE_UNIX_SOCKET, or INSTANCE_CONNECTION_NAME")
// 	}
// 	redisHost := os.Getenv("REDIS_HOST")
// 	redisPort := os.Getenv("REDIS_PORT")
// 	fmt.Println("redisHost", redisHost)
// 	fmt.Println("redisPort", redisPort)
// 	log.Printf("Connecting to Redis\n")
// 	rdb := redis.NewClient(&redis.Options{
// 		Addr:     fmt.Sprintf("%s:%s", redisHost, redisPort),
// 		Password: "",
// 		DB:       0,
// 	})
// 	_, err = rdb.Ping(context.Background()).Result()

// 	if err != nil {
// 		return nil, fmt.Errorf("error connecting to redis: %w", err)
// 	}
// 	return &dataSources{
// 		DB:          db,
// 		RedisClient: rdb,
// 	}, nil
// }

// func (d *dataSources) close() error {
// 	if err := d.DB.Close(); err != nil {
// 		return fmt.Errorf("error closing Postgresql: %w", err)
// 	}
// 	if err := d.RedisClient.Close(); err != nil {
// 		return fmt.Errorf("error closing Redis Client: %w", err)
// 	}
// 	return nil
// }

// func loadEnv() {
// 	err := godotenv.Load(".env.dev")
// 	if err != nil {
// 		fmt.Printf("Could not read env: %v", err)
// 	}
// }

// func connectTCPSocket() (*sqlx.DB, error) {
// 	mustGetenv := func(k string) string {
// 		v := os.Getenv(k)
// 		if v == "" {
// 			log.Fatalf("Warning: %s environment variable not set.", k)
// 		}
// 		return v
// 	}
// 	var (
// 		dbUser    = mustGetenv("DB_USER")       // e.g. 'my-db-user'
// 		dbPwd     = mustGetenv("DB_PASS")       // e.g. 'my-db-password'
// 		dbTCPHost = mustGetenv("INSTANCE_HOST") // e.g. '127.0.0.1' ('172.17.0.1' if deployed to GAE Flex)
// 		dbPort    = mustGetenv("DB_PORT")       // e.g. '5432'
// 		dbName    = mustGetenv("DB_NAME")       // e.g. 'my-database'
// 	)

// 	dbURI := fmt.Sprintf("host=%s user=%s password=%s port=%s database=%s",
// 		dbTCPHost, dbUser, dbPwd, dbPort, dbName)
// 	if dbRootCert, ok := os.LookupEnv("DB_ROOT_CERT"); ok { // e.g., '/path/to/my/server-ca.pem'
// 		var (
// 			dbCert = mustGetenv("DB_CERT") // e.g. '/path/to/my/client-cert.pem'
// 			dbKey  = mustGetenv("DB_KEY")  // e.g. '/path/to/my/client-key.pem'
// 		)
// 		dbURI += fmt.Sprintf(" sslmode=require sslrootcert=%s sslcert=%s sslkey=%s",
// 			dbRootCert, dbCert, dbKey)
// 	}
// 	dbPool, err := sqlx.Open("postgres", dbURI)
// 	if err != nil {
// 		return nil, fmt.Errorf("sqlx.Open: %v", err)
// 	}
// 	configureConnectionPool(dbPool)
// 	return dbPool, nil
// }

// func connectUnixSocket() (*sqlx.DB, error) {
// 	mustGetenv := func(k string) string {
// 		v := os.Getenv(k)
// 		if v == "" {
// 			log.Fatalf("Warning: %s environment variable not set.\n", k)
// 		}
// 		return v
// 	}
// 	var (
// 		dbUser         = mustGetenv("DB_USER")              // e.g. 'my-db-user'
// 		dbPwd          = mustGetenv("DB_PASS")              // e.g. 'my-db-password'
// 		unixSocketPath = mustGetenv("INSTANCE_UNIX_SOCKET") // e.g. '/cloudsql/project:region:instance'
// 		dbName         = mustGetenv("DB_NAME")              // e.g. 'my-database'
// 	)

// 	dbURI := fmt.Sprintf("user=%s password=%s database=%s host=%s",
// 		dbUser, dbPwd, dbName, unixSocketPath)

// 	dbPool, err := sqlx.Open("postgres", dbURI)
// 	if err != nil {
// 		return nil, fmt.Errorf("sqlx.Open: %v", err)
// 	}
// 	configureConnectionPool(dbPool)
// 	return dbPool, nil
// }

// func configureConnectionPool(db *sqlx.DB) {
// 	db.SetMaxIdleConns(5)
// 	db.SetMaxOpenConns(7)
// 	db.SetConnMaxLifetime(1800 * time.Second)
// }

// func SecretManager() {
// 	// GCP project in which to store secrets in Secret Manager.
// 	projectID := "p06111806"

// 	// Create the client.
// 	ctx := context.Background()
// 	client, err := secretmanager.NewClient(ctx)
// 	if err != nil {
// 		log.Fatalf("failed to setup client: %v", err)
// 	}
// 	defer client.Close()

// 	// Create the request to create the secret.
// 	createSecretReqPrivate := &secretmanagerpb.CreateSecretRequest{
// 		Parent:   fmt.Sprintf("projects/%s", projectID),
// 		SecretId: "rsa-private",
// 		Secret: &secretmanagerpb.Secret{
// 			Replication: &secretmanagerpb.Replication{
// 				Replication: &secretmanagerpb.Replication_Automatic_{
// 					Automatic: &secretmanagerpb.Replication_Automatic{},
// 				},
// 			},
// 		},
// 	}
// 	createSecretReqPublic := &secretmanagerpb.CreateSecretRequest{
// 		Parent:   fmt.Sprintf("projects/%s", projectID),
// 		SecretId: "rsa-private",
// 		Secret: &secretmanagerpb.Secret{
// 			Replication: &secretmanagerpb.Replication{
// 				Replication: &secretmanagerpb.Replication_Automatic_{
// 					Automatic: &secretmanagerpb.Replication_Automatic{},
// 				},
// 			},
// 		},
// 	}

// 	secretPrivate, err := client.CreateSecret(ctx, createSecretReqPrivate)
// 	if err != nil {
// 		log.Fatalf("failed to create secret: %v", err)
// 	}
// 	secretPublic, err := client.CreateSecret(ctx, createSecretReqPublic)
// 	if err != nil {
// 		log.Fatalf("failed to create secret: %v", err)
// 	}

// 	// Declare the payload to store.
// 	payload := []byte("my super secret data")

// 	// Build the request.
// 	addSecretVersionReqPrivate := &secretmanagerpb.AddSecretVersionRequest{
// 		Parent: secretPrivate.Name,
// 		Payload: &secretmanagerpb.SecretPayload{
// 			Data: payload,
// 		},
// 	}
// 	addSecretVersionReqPublic := &secretmanagerpb.AddSecretVersionRequest{
// 		Parent: secretPublic.Name,
// 		Payload: &secretmanagerpb.SecretPayload{
// 			Data: payload,
// 		},
// 	}

// 	// Call the API.
// 	versionPrivate, err := client.AddSecretVersion(ctx, addSecretVersionReqPrivate)
// 	if err != nil {
// 		log.Fatalf("failed to add secret version: %v", err)
// 	}
// 	versionPublic, err := client.AddSecretVersion(ctx, addSecretVersionReqPublic)
// 	if err != nil {
// 		log.Fatalf("failed to add secret version: %v", err)
// 	}

// 	// Build the request.
// 	accessRequestPublic := &secretmanagerpb.AccessSecretVersionRequest{
// 		Name: versionPrivate.Name,
// 	}

// 	accessRequestPrivate := &secretmanagerpb.AccessSecretVersionRequest{
// 		Name: versionPublic.Name,
// 	}

// 	// Call the API.
// 	resultPrivate, err := client.AccessSecretVersion(ctx, accessRequestPrivate)
// 	if err != nil {
// 		log.Fatalf("failed to access secret version: %v", err)
// 	}
// 	resultPublic, err := client.AccessSecretVersion(ctx, accessRequestPublic)
// 	if err != nil {
// 		log.Fatalf("failed to access secret version: %v", err)
// 	}

// 	// Print the secret payload.
// 	//
// 	// WARNING: Do not print the secret in a production environment - this
// 	// snippet is showing how to access the secret material.
// 	log.Printf("Plaintext: %s", resultPrivate.Payload.Data)
// 	log.Printf("Plaintext: %s", resultPublic.Payload.Data)

// }

// Sample quickstart is a basic program that uses Secret Manager.
package main

import (
	"context"
	"fmt"

	secretmanager "cloud.google.com/go/secretmanager/apiv1"
	secretmanagerpb "google.golang.org/genproto/googleapis/cloud/secretmanager/v1"
)

func main() {
	ctx := context.Background()
	c, err := secretmanager.NewClient(ctx)
	if err != nil {
		// TODO: Handle error.
		fmt.Println(err)
	}
	defer c.Close()

	req := &secretmanagerpb.GetSecretRequest{
		// TODO: Fill request struct fields.
		// See https://pkg.go.dev/google.golang.org/genproto/googleapis/cloud/secretmanager/v1#GetSecretRequest.
	}
	resp, err := c.GetSecret(ctx, req)
	if err != nil {
		// TODO: Handle error.
		fmt.Println(err)
	}
	// TODO: Use resp.
	_ = resp
}
