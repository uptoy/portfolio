CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS products (
  uid uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR NOT NULL UNIQUE,
  product_image VARCHAR NOT NULL DEFAULT '',
  brand VARCHAR NOT NULL,
  price VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  count_in_stock INTEGER NOT NULL  DEFAULT 1,
  description VARCHAR NOT NULL DEFAULT 'description',
  average_rating INTEGER NOT NULL  DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT (now())
);
