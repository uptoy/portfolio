package sample

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"log"
	"math"
	"net/http"
	"os"
	"sync"
	"time"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Listening on port %s", port)

	http.HandleFunc("/", Votes)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
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
	fmt.Println("connectUnixSocket()")
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
	fmt.Println("connectTCPSocket()")
	return dbPool, nil
}

var (
	db   *sqlx.DB
	once sync.Once
)

func getDB() *sqlx.DB {
	once.Do(func() {
		db = mustConnect()
	})
	return db
}

// migrateDB creates the votes table if it does not already exist.
func migrateDB(db *sqlx.DB) error {
	createVotes := `CREATE TABLE IF NOT EXISTS votes (
		id SERIAL NOT NULL,
		created_at timestamp NOT NULL,
		candidate VARCHAR(6) NOT NULL,
		PRIMARY KEY (id)
	);`
	_, err := db.Exec(createVotes)
	return err
}

func formatMargin(a, b int) string {
	diff := int(math.Abs(float64(a - b)))
	margin := fmt.Sprintf("%d votes", diff)
	// remove pluralization when diff is just one
	if diff == 1 {
		margin = "1 vote"
	}
	return margin
}

// votingData is used to pass data to the HTML template.
type votingData struct {
	TabsCount   int
	SpacesCount int
	VoteMargin  string
	RecentVotes []vote
}

// currentTotals retrieves all voting data from the database.
func currentTotals(db *sqlx.DB) (votingData, error) {
	var (
		tabs   int
		spaces int
	)
	err := db.QueryRow("SELECT count(id) FROM votes WHERE candidate='TABS'").Scan(&tabs)
	if err != nil {
		return votingData{}, fmt.Errorf("DB.QueryRow: %v", err)
	}
	err = db.QueryRow("SELECT count(id) FROM votes WHERE candidate='SPACES'").Scan(&spaces)
	if err != nil {
		return votingData{}, fmt.Errorf("DB.QueryRow: %v", err)
	}

	recent, err := recentVotes(db)
	if err != nil {
		return votingData{}, fmt.Errorf("recentVotes: %v", err)
	}

	return votingData{
		TabsCount:   tabs,
		SpacesCount: spaces,
		VoteMargin:  formatMargin(tabs, spaces),
		RecentVotes: recent,
	}, nil
}

func mustConnect() *sqlx.DB {
	var (
		db  *sqlx.DB
		err error
	)
	if os.Getenv("INSTANCE_HOST") != "" {

		db, err = connectTCPSocket()
		fmt.Println("INSTANCE_HOST", os.Getenv("INSTANCE_HOST"))
		if err != nil {
			log.Fatalf("connectTCPSocket: unable to connect: %s", err)
		}
	}
	if os.Getenv("INSTANCE_UNIX_SOCKET") != "" {
		db, err = connectUnixSocket()
		fmt.Println("INSTANCE_UNIX_SOCKET", os.Getenv("INSTANCE_UNIX_SOCKET"))
		if err != nil {
			log.Fatalf("connectUnixSocket: unable to connect: %s", err)
		}
	}
	if db == nil {
		log.Fatal("Missing database connection type. Please define one of INSTANCE_HOST, INSTANCE_UNIX_SOCKET, or INSTANCE_CONNECTION_NAME")
	}
	if err := migrateDB(db); err != nil {
		log.Fatalf("unable to create table: %s", err)
	}

	return db
}

func configureConnectionPool(db *sqlx.DB) {
	db.SetMaxIdleConns(5)
	db.SetMaxOpenConns(7)
	db.SetConnMaxLifetime(1800 * time.Second)
}

func Votes(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		renderIndex(w, r, getDB())
	case http.MethodPost:
		saveVote(w, r, getDB())
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

type vote struct {
	Candidate string
	VoteTime  time.Time
}
