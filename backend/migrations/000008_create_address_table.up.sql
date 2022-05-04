CREATE TABLE addresses (
	id SERIAL PRIMARY KEY,
	street_address TEXT NOT NULL,
	city TEXT NOT NULL,
	state TEXT,
	zip_code TEXT,
	country TEXT NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT (now()),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT (now())
);

CREATE TABLE user_address (
	user_id uuid NOT NULL,
	address_id INTEGER NOT NULL
);

ALTER TABLE
	user_address
ADD
	FOREIGN KEY (user_id) REFERENCES users (uid) ON DELETE CASCADE;

ALTER TABLE
	user_address
ADD
	FOREIGN KEY (address_id) REFERENCES addresses (id) ON DELETE CASCADE;
