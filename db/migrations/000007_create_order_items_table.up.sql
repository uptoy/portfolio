CREATE TABLE IF NOT EXISTS order_items (
  order_item_id uuid PRIMARY KEY,
  product_name VARCHAR NOT NULL DEFAULT '',
  quantity INTEGER NOT NULL DEFAULT 1,
  product_image VARCHAR NOT NULL DEFAULT 'http://placehold.jp/150x150.png',
  price INTEGER NOT NULL,
  product_id uuid NOT NULL
);


ALTER TABLE "order_items" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("product_id");
