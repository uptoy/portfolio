CREATE TABLE IF NOT EXISTS categories (
  category_id uuid PRIMARY KEY,
  category_name VARCHAR NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT (now()),
  updated_at timestamptz NOT NULL
);
