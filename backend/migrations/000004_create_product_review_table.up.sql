
CREATE TABLE IF NOT EXISTS product_review(
  user_id uuid NOT NULL,
  product_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  title VARCHAR (100) UNIQUE NOT NULL,
  comment VARCHAR (100) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT (now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT (now()),
  CHECK (rating >= 1 AND rating <= 5),
  UNIQUE (user_id, product_id),
  PRIMARY KEY (user_id, product_id)
);
