CREATE TABLE IF NOT EXISTS payments (
  payment_id uuid PRIMARY KEY,
  payment_method VARCHAR NOT NULL DEFAULT ''
);
