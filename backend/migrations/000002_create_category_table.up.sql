create table categories (
  id SERIAL PRIMARY KEY,
  category_name VARCHAR (100) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT (now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT (now())
);
