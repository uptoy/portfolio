CREATE TABLE IF NOT EXISTS reviews (
  uid uuid PRIMARY KEY,
  title VARCHAR NOT NULL DEFAULT '',
  comment VARCHAR NOT NULL  DEFAULT '',
  rating INTEGER NOT NULL  DEFAULT 5,
  created_at timestamptz NOT NULL DEFAULT (now()),
  product_id uuid NOT NULL,
  user_id uuid NOT NULL
);

ALTER TABLE "reviews" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("uid");
ALTER TABLE "reviews" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("uid");
