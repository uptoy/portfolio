```
export POSTGRESQL_URL='postgres://postgres:password@localhost:5432/example?sslmode=disable'
migrate create -ext sql -dir db/migrations -seq create_users_table
```
```
CREATE TABLE IF NOT EXISTS users(
   user_id serial PRIMARY KEY,
   username VARCHAR (50) UNIQUE NOT NULL,
   password VARCHAR (50) NOT NULL,
   email VARCHAR (300) UNIQUE NOT NULL
);
```
```
DROP TABLE IF EXISTS users;
```
```
migrate -database ${POSTGRESQL_URL} -path db/migrations up
```
```
migrate -database ${POSTGRESQL_URL} -path db/migrations down
```
```
migrate create -ext sql -dir db/migrations -seq add_mood_to_users
```
```
BEGIN;

CREATE TYPE enum_mood AS ENUM (
	'happy',
	'sad',
	'neutral'
);
ALTER TABLE users ADD COLUMN mood enum_mood;

COMMIT;
```
Migration down:
```
BEGIN;

ALTER TABLE users DROP COLUMN mood;
DROP TYPE enum_mood;

COMMIT;
```
```
migrate -database ${POSTGRESQL_URL} -path db/migrations up
psql example -c "\d users"
```
