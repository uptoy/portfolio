CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL,
);

CREATE TABLE cart_item (
    id SERIAL PRIMARY KEY,
    cart_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    UNIQUE (cart_id, product_id)
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
);

CREATE TYPE "payment" AS ENUM ('PAYSTACK', 'STRIPE');

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    status CHARACTER varying(20) NOT NULL,
    date TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_DATE NOT NULL,
    amount INTEGER NOT NULL CHECK (amount > 0),
    total INTEGER NOT NULL CHECK (total > 0),
    ref CHARACTER varying(100),
    payment_method payment,
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name CHARACTER varying(50) NOT NULL,
    price INTEGER NOT NULL CHECK (price > 0),
    description TEXT NOT NULL,
    image_url CHARACTER varying,
);

CREATE TABLE "resetTokens" (
    id SERIAL PRIMARY KEY,
    email CHARACTER varying NOT NULL,
    token CHARACTER varying NOT NULL,
    used BOOLEAN DEFAULT false NOT NULL,
    expiration TIMESTAMP WITHOUT TIME ZONE,
);

CREATE TABLE reviews (
    id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    rating INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    created_at TIMESTAMP without time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, product_id)
);

CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    password CHARACTER varying(200),
    email CHARACTER varying(100) UNIQUE NOT NULL,
    fullname CHARACTER varying(100) NOT NULL,
    username CHARACTER varying(50) UNIQUE NOT NULL,
    google_id CHARACTER varying(100) UNIQUE,
    roles CHARACTER varying(10) [] DEFAULT '{customer}' :: CHARACTER varying [] NOT NULL,
    address CHARACTER varying(200),
    city CHARACTER varying(100),
    state CHARACTER varying(100),
    country CHARACTER varying(100),
    created_at TIMESTAMP without time zone DEFAULT CURRENT_TIMESTAMP,
);

ALTER TABLE
    carts
ADD
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE
SET
    NULL NOT VALID;

ALTER TABLE
    cart_items
ADD
    FOREIGN KEY (cart_id) REFERENCES carts (id) ON DELETE CASCADE NOT VALID;

ALTER TABLE
    cart_items
ADD
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE
SET
    NULL NOT VALID;

ALTER TABLE
    order_items
ADD
    FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE NOT VALID;

ALTER TABLE
    order_items
ADD
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE
SET
    NULL NOT VALID;

ALTER TABLE
    orders
ADD
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE NOT VALID;

ALTER TABLE
    reviews
ADD
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE
SET
    NULL NOT VALID;

ALTER TABLE
    reviews
ADD
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE
SET
    NULL NOT VALID;
