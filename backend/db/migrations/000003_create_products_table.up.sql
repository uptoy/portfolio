CREATE TABLE IF NOT EXISTS products (
  product_id SERIAL PRIMARY KEY,
  product_name VARCHAR NOT NULL UNIQUE,
  slug VARCHAR NOT NULL UNIQUE,
  product_image VARCHAR NOT NULL DEFAULT 'http://placehold.jp/150x150.png',
  brand VARCHAR NOT NULL,
  price INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  count_in_stock INTEGER NOT NULL DEFAULT 0,
  description VARCHAR NOT NULL DEFAULT '',
  average_rating INTEGER NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT (now()),
  updated_at timestamptz NOT NULL DEFAULT (now())
);
