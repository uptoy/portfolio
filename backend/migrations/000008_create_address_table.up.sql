CREATE TABLE address (
  id       SERIAL PRIMARY KEY,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  country TEXT NOT NULL,
  zip TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT (now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT (now())
);

CREATE TABLE user_address (
  user_id uuid NOT NULL,
  address_id INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT (now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT (now())
);


ALTER TABLE user_address ADD FOREIGN KEY (user_id) REFERENCES users (uid);
ALTER TABLE user_address ADD FOREIGN KEY (address_id) REFERENCES address (id);
