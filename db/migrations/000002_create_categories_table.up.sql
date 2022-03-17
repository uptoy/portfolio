CREATE TABLE IF NOT EXISTS categories (
  uid uuid PRIMARY KEY,
  category_name VARCHAR NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT (now())
);
