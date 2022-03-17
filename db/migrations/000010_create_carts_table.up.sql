CREATE TABLE IF NOT EXISTS carts (
  cart_id uuid PRIMARY KEY,
  user_id uuid NOT NULL,
  cartitem_id uuid NOT NULL,
  total_price INTEGER NOT NULL,
  created_at timestamptz NOT NULL DEFAULT (now()),
  updated_at timestamptz NOT NULL
);
ALTER TABLE "carts"
ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");
ALTER TABLE "carts"
ADD FOREIGN KEY ("cartitem_id") REFERENCES "cart_items" ("cartitem_id");
