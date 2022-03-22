package main

// import (
//     "context"
//     "log"
//     "net/http"
//     "os"
//     "os/signal"
//     "syscall"
//     "time"

//     "github.com/gin-gonic/gin"
// )

// func main() {
//     // you could insert your favorite logger here for structured or leveled logging
//     log.Println("Starting server...")

//     router := gin.Default()

//     router.GET("/api/account", func(c *gin.Context) {
//         c.JSON(http.StatusOK, gin.H{
//             "hello": "world",
//         })
//     })

//     srv := &http.Server{
//         Addr:    ":8080",
//         Handler: router,
//   }

//     // Graceful server shutdown - https://github.com/gin-gonic/examples/blob/master/graceful-shutdown/graceful-shutdown/server.go
//     go func() {
//         if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
//             log.Fatalf("Failed to initialize server: %v\n", err)
//         }
//     }()

//     log.Printf("Listening on port %v\n", srv.Addr)

//     // Wait for kill signal of channel
//     quit := make(chan os.Signal)

//     signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

//     // This blocks until a signal is passed into the quit channel
//     <-quit

//     // The context is used to inform the server it has 5 seconds to finish
//     // the request it is currently handling
//     ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
//     defer cancel()

//     // Shutdown server
//     log.Println("Shutting down server...")
//     if err := srv.Shutdown(ctx); err != nil {
//         log.Fatalf("Server forced to shutdown: %v\n", err)
// }

// // import (
// // 	"context"
// // 	"fmt"
// // 	"log"
// // 	"net/http"
// // 	"os"
// // 	"os/signal"
// // 	"syscall"
// // 	"time"
// // 	"strconv"

// // 	// "github.com/dgrijalva/jwt-go"
// // 	"backend/handler"
// // 	"backend/repository"
// // 	"backend/service"
// // 	"github.com/gin-gonic/gin"

// // 	"cloud.google.com/go/storage"
// // 	"github.com/go-redis/redis/v8"
// // 	"github.com/jmoiron/sqlx"
// // 	_ "github.com/lib/pq"
// // )

// // func main() {
// // 	log.Println("Starting server...")

// // 	// initialize data sources
// // 	ds, err := initDS()

// // 	if err != nil {
// // 		log.Fatalf("Unable to initialize data sources: %v\n", err)
// // 	}

// // 	router, err := inject(ds)

// // 	if err != nil {
// // 		log.Fatalf("Failure to inject data sources: %v\n", err)
// // 	}

// // 	srv := &http.Server{
// // 		Addr:    "127.0.0.1:8080",
// // 		Handler: router,
// // 	}

// // 	// Graceful server shutdown - https://github.com/gin-gonic/examples/blob/master/graceful-shutdown/graceful-shutdown/server.go
// // 	go func() {
// // 		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
// // 			log.Fatalf("Failed to initialize server: %v\n", err)
// // 		}
// // 	}()

// // 	log.Printf("Listening on port %v\n", srv.Addr)

// // 	// Wait for kill signal of channel
// // 	quit := make(chan os.Signal)

// // 	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

// // 	// This blocks until a signal is passed into the quit channel
// // 	<-quit

// // 	// The context is used to inform the server it has 5 seconds to finish
// // 	// the request it is currently handling
// // 	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
// // 	defer cancel()

// // 	// shutdown data sources
// // 	if err := ds.close(); err != nil {
// // 		log.Fatalf("A problem occurred gracefully shutting down data sources: %v\n", err)
// // 	}

// // 	// Shutdown server
// // 	log.Println("Shutting down server...")
// // 	if err := srv.Shutdown(ctx); err != nil {
// // 		log.Fatalf("Server forced to shutdown: %v\n", err)
// // 	}
// // }

// // type dataSources struct {
// // 	DB            *sqlx.DB
// // 	RedisClient   *redis.Client
// // 	StorageClient *storage.Client
// // }

// // // InitDS establishes connections to fields in dataSources
// // func initDS() (*dataSources, error) {
// // 	log.Printf("Initializing data sources\n")
// // 	// load env variables - we could pass these in,
// // 	// but this is sort of just a top-level (main package)
// // 	// helper function, so I'll just read them in here
// // 	pgHost := "localhost"
// // 	pgPort := "5432"
// // 	pgUser := "postgres"
// // 	pgPassword := "password"
// // 	pgDB := "portfolio_db"
// // 	pgSSL := "disable"

// // 	pgConnString := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s", pgHost, pgPort, pgUser, pgPassword, pgDB, pgSSL)

// // 	log.Printf("Connecting to Postgresql\n")
// // 	db, err := sqlx.Open("postgres", pgConnString)

// // 	if err != nil {
// // 		return nil, fmt.Errorf("error opening db: %w", err)
// // 	}

// // 	// Verify database connection is working
// // 	if err := db.Ping(); err != nil {
// // 		return nil, fmt.Errorf("error connecting to db: %w", err)
// // 	}

// // 	// Initialize redis connection
// // 	redisHost := "localhost"
// // 	redisPort := "6379"

// // 	log.Printf("Connecting to Redis\n")
// // 	rdb := redis.NewClient(&redis.Options{
// // 		Addr:     fmt.Sprintf("%s:%s", redisHost, redisPort),
// // 		Password: "",
// // 		DB:       0,
// // 	})

// // 	// verify redis connection

// // 	_, err = rdb.Ping(context.Background()).Result()

// // 	if err != nil {
// // 		return nil, fmt.Errorf("error connecting to redis: %w", err)
// // 	}

// // 	// Initialize google storage client
// // 	// log.Printf("Connecting to Cloud Storage\n")
// // 	// ctx := context.Background()
// // 	// ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
// // 	// defer cancel() // releases resources if slowOperation completes before timeout elapses
// // 	// storage, err := storage.NewClient(ctx)

// // 	if err != nil {
// // 		return nil, fmt.Errorf("error creating cloud storage client: %w", err)
// // 	}

// // 	return &dataSources{
// // 		DB:          db,
// // 		RedisClient: rdb,
// // 		// StorageClient: storage,
// // 	}, nil
// // }

// // // close to be used in graceful server shutdown
// // func (d *dataSources) close() error {
// // 	if err := d.DB.Close(); err != nil {
// // 		return fmt.Errorf("error closing Postgresql: %w", err)
// // 	}

// // 	if err := d.RedisClient.Close(); err != nil {
// // 		return fmt.Errorf("error closing Redis Client: %w", err)
// // 	}

// // 	if err := d.StorageClient.Close(); err != nil {
// // 		return fmt.Errorf("error closing Cloud Storage client: %w", err)
// // 	}

// // 	return nil
// // }

// // func inject(d *dataSources) (*gin.Engine, error) {
// // 	log.Println("Injecting data sources")

// // 	/*
// // 	 * repository layer
// // 	 */
// // 	userRepository := repository.NewUserRepository(d.DB)
// // 	productRepository := repository.NewProductRepository(d.DB)
// // 	tokenRepository := repository.NewTokenRepository(d.RedisClient)
// // 	// bucketName := os.Getenv("GC_IMAGE_BUCKET")
// // 	// imageRepository := repository.NewImageRepository(d.StorageClient, bucketName)

// // 	/*
// // 	 * service layer
// // 	 */
// // 	userService := service.NewUserService(&service.USConfig{
// // 		UserRepository: userRepository,
// // 		// ImageRepository: imageRepository,
// // 	})
// // 	productService := service.NewProductService(&service.PSConfig{
// // 		ProductRepository: productRepository,
// // 		// ImageRepository: imageRepository,
// // 	})

// // 	// load rsa keys
// // 	// privKeyFile := os.Getenv("PRIV_KEY_FILE")
// // 	// priv, err := ioutil.ReadFile(privKeyFile)

// // 	// if err != nil {
// // 	// 	return nil, fmt.Errorf("could not read private key pem file: %w", err)
// // 	// }

// // 	// privKey, err := jwt.ParseRSAPrivateKeyFromPEM(priv)

// // 	// if err != nil {
// // 	// 	return nil, fmt.Errorf("could not parse private key: %w", err)
// // 	// }

// // 	// pubKeyFile := os.Getenv("PUB_KEY_FILE")
// // 	// pub, err := ioutil.ReadFile(pubKeyFile)

// // 	// if err != nil {
// // 	// 	return nil, fmt.Errorf("could not read public key pem file: %w", err)
// // 	// }

// // 	// pubKey, err := jwt.ParseRSAPublicKeyFromPEM(pub)

// // 	// if err != nil {
// // 	// 	return nil, fmt.Errorf("could not parse public key: %w", err)
// // 	// }

// // 	// load refresh token secret from env variable
// // 	refreshSecret := os.Getenv("REFRESH_SECRET")

// // 	// load expiration lengths from env variables and parse as int
// // 	idTokenExp := "900"
// // 	refreshTokenExp := "259200"

// // 	idExp, err := strconv.ParseInt(idTokenExp, 0, 64)
// // 	if err != nil {
// // 		return nil, fmt.Errorf("could not parse ID_TOKEN_EXP as int: %w", err)
// // 	}

// // 	refreshExp, err := strconv.ParseInt(refreshTokenExp, 0, 64)
// // 	if err != nil {
// // 		return nil, fmt.Errorf("could not parse REFRESH_TOKEN_EXP as int: %w", err)
// // 	}

// // 	tokenService := service.NewTokenService(&service.TSConfig{
// // 		TokenRepository: tokenRepository,
// // 		// PrivKey:               privKey,
// // 		// PubKey:                pubKey,
// // 		RefreshSecret:         refreshSecret,
// // 		IDExpirationSecs:      idExp,
// // 		RefreshExpirationSecs: refreshExp,
// // 	})

// // 	// initialize gin.Engine
// // 	router := gin.Default()
// // 	// read in BACKEND_API_URL
// // 	// baseURL := os.Getenv("BACKEND_API_URL")
// // 	baseURL := "/"

// // 	// read in HANDLER_TIMEOUT
// // 	handlerTimeout := "5"
// // 	ht, err := strconv.ParseInt(handlerTimeout, 0, 64)
// // 	if err != nil {
// // 		return nil, fmt.Errorf("could not parse HANDLER_TIMEOUT as int: %w", err)
// // 	}
// // 	maxBodyBytes := "4194304"
// // 	mbb, err := strconv.ParseInt(maxBodyBytes, 0, 64)
// // 	if err != nil {
// // 		return nil, fmt.Errorf("could not parse MAX_BODY_BYTES as int: %w", err)
// // 	}

// // 	handler.NewHandler(&handler.Config{
// // 		R:               router,
// // 		ProductService:     productService,
// // 		UserService:     userService,
// // 		TokenService:    tokenService,
// // 		BaseURL:         baseURL,
// // 		TimeoutDuration: time.Duration(time.Duration(ht) * time.Second),
// // 		MaxBodyBytes:    mbb,
// // 	})

// // 	return router, nil
// // }
