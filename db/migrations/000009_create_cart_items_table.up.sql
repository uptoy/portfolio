CREATE TABLE IF NOT EXISTS cart_items (
  cartitem_id uuid PRIMARY KEY,
  product_id uuid NOT NULL,
  quantity INTEGER NOT NULL
);
ALTER TABLE "cart_items" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("product_id");
