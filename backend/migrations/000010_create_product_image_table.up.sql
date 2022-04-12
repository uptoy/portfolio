CREATE TABLE product_image (
  id       SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT (now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT (now()),
  FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);

