
CREATE TABLE IF NOT EXISTS product_review(
  id serial PRIMARY KEY,
  user_id uuid NOT NULL,
  product_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  title VARCHAR (100) UNIQUE NOT NULL,
  comment VARCHAR (100) UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT (now()),
  updated_at timestamptz NOT NULL DEFAULT (now()),
  FOREIGN KEY (user_id) REFERENCES users (uid) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
  CHECK (rating >= 1 AND rating <= 5),
  UNIQUE (user_id, product_id)
);
