CREATE TABLE IF NOT EXISTS reviews (
  review_id uuid PRIMARY KEY,
  title VARCHAR NOT NULL DEFAULT '',
  comment VARCHAR NOT NULL DEFAULT '',
  rating INTEGER NOT NULL DEFAULT 5,
  product_id uuid NOT NULL,
  user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT (now()),
  updated_at timestamptz NOT NULL
);
ALTER TABLE "reviews" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("product_id");
ALTER TABLE "reviews" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");
