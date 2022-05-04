CREATE TABLE orders (
	id SERIAL PRIMARY KEY,
	user_id uuid UNIQUE NOT NULL,
	address TEXT NOT NULL,
	total_price INTEGER NOT NULL,
	shipping_street_address TEXT NOT NULL,
	shipping_city TEXT NOT NULL,
	shipping_state TEXT NOT NULL,
  shipping_zip_code TEXT NOT NULL,
	shipping_country TEXT NOT NULL,
	shipped_at TIMESTAMPTZ NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT (now())
);


CREATE TABLE order_detail (
	order_id INTEGER NOT NULL,
	product_id INTEGER NOT NULL,
	quantity INTEGER NOT NULL,
	sub_price INTEGER NOT NULL,
	PRIMARY KEY (order_id, product_id)
);

  -- status varchar(30) default 'pending' not null,
	-- subtotal int not null,
	-- payment_method_id text not null,
	-- payment_intent_id text not null,
