CREATE TABLE user_product (
  user_id uuid NOT NULL,
  product_id INTEGER NOT NULL,
  UNIQUE (user_id, product_id)
);

ALTER TABLE "user_product" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("uid") ON DELETE CASCADE;
ALTER TABLE "user_product" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE;
