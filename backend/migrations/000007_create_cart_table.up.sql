CREATE TABLE carts
(
    id SERIAL NOT NULL,
    user_id uuid UNIQUE NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE cart_item
(
    id       SERIAL PRIMARY KEY,
    cart_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    UNIQUE (cart_id, product_id)
);

ALTER TABLE carts
    ADD FOREIGN KEY (user_id)
    REFERENCES users (uid)
    ON DELETE SET NULL
    NOT VALID;


ALTER TABLE cart_item
    ADD FOREIGN KEY (cart_id)
    REFERENCES carts (id)
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE cart_item
    ADD FOREIGN KEY (product_id)
    REFERENCES products (id)
    ON DELETE SET NULL
    NOT VALID;
