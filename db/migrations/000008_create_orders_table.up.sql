CREATE TABLE IF NOT EXISTS orders (
  uid uuid PRIMARY KEY,
  items_prices INTEGER NOT NULL,
  tax_price INTEGER NOT NULL,
  price INTEGER NOT NULL,
  total_price INTEGER NOT NULL,
  is_paid BOOLEAN NOT NULL DEFAULT false,
  is_delivered BOOLEAN NOT NULL DEFAULT false,
  paid_at TIMESTAMPTZ NOT NULL,
  delivered_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT (now()),
  user_id uuid NOT NULL,
  order_item_id uuid NOT NULL,
  shipping_id uuid NOT NULL,
  payment_id uuid NOT NULL
);

ALTER TABLE "orders" ADD FOREIGN KEY ("order_item_id") REFERENCES "order_items" ("uid");
ALTER TABLE "orders" ADD FOREIGN KEY ("shipping_id") REFERENCES "shippings" ("uid");
ALTER TABLE "orders" ADD FOREIGN KEY ("payment_id") REFERENCES "payments" ("uid");
ALTER TABLE "orders" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("uid");

