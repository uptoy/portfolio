CREATE TABLE product_wishlist (
  id       SERIAL PRIMARY KEY,
  user_id uuid NOT NULL,
  product_id INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT (now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT (now()),
  UNIQUE (user_id, product_id)
);

ALTER TABLE product_wishlist ADD FOREIGN KEY (user_id) REFERENCES users (uid);
ALTER TABLE product_wishlist ADD FOREIGN KEY (product_id) REFERENCES products (id);
