CREATE TABLE orders (
  id       SERIAL PRIMARY KEY,
  user_id uuid UNIQUE NOT NULL,
  address TEXT NOT NULL,
  total_price INTEGER NOT NULL,
  shipping_address TEXT NOT NULL,
  shipping_state TEXT NOT NULL,
  shipping_country TEXT NOT NULL,
  shipping_zip TEXT NOT NULL,
  shipped_at TIMESTAMPTZ NOT NULL ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT (now())
);

ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users (uid);

CREATE TABLE order_detail (
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  sub_price INTEGER NOT NULL,
  PRIMARY KEY (order_id, product_id)
);



