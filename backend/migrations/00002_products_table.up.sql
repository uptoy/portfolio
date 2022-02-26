CREATE TABLE IF NOT EXISTS products (
  uid uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_name VARCHAR NOT NULL DEFAULT '',
  description VARCHAR NOT NULL,
  price INT NOT NULL,
  rating INT NOT NULL
  image_url VARCHAR NOT NULL DEFAULT '',
);
