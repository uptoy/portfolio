
CREATE TABLE IF NOT EXISTS product_review(
  id SERIAL PRIMARY KEY,
  user_id uuid NOT NULL,
  product_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  title VARCHAR (100) NOT NULL,
  comment VARCHAR (100) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT (now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT (now()),
  CHECK (rating >= 1 AND rating <= 5),
  UNIQUE (user_id, product_id)
);

ALTER TABLE "product_review" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("uid") ON DELETE CASCADE;
ALTER TABLE "product_review" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE;
