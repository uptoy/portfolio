CREATE TABLE IF NOT EXISTS payments (
  uid uuid PRIMARY KEY,
  payment_method VARCHAR NOT NULL DEFAULT ''
);
