CREATE TABLE IF NOT EXISTS shippings (
  shipping_id uuid PRIMARY KEY,
  address VARCHAR NOT NULL DEFAULT '',
  city VARCHAR NOT NULL DEFAULT '',
  postal_code INTEGER NOT NULL,
  country VARCHAR NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT (now()),
  updated_at timestamptz NOT NULL
);
