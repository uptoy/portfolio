CREATE TABLE IF NOT EXISTS carts (
  cart_id uuid PRIMARY KEY,
  user_id uuid NOT NULL,
  cart_item_id uuid NOT NULL,
  total_price INTEGER NOT NULL
);
ALTER TABLE "carts"
ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");
ALTER TABLE "carts"
ADD FOREIGN KEY ("cart_item_id") REFERENCES "cart_items" ("cart_item_id");
