CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS reviews (
  uid uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR NOT NULL DEFAULT '',
  comment VARCHAR NOT NULL  DEFAULT '',
  rating INTEGER NOT NULL  DEFAULT 5,
  created_at timestamptz NOT NULL DEFAULT (now())
);

ALTER TABLE "users" ADD FOREIGN KEY ("owner") REFERENCES "users" ("username");
ALTER TABLE "products" ADD FOREIGN KEY ("") REFERENCES "users" ("username");
