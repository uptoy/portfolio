CREATE TABLE IF NOT EXISTS categories (
  categoryId uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  category_name VARCHAR NOT NULL DEFAULT '',
  description VARCHAR NOT NULL DEFAULT '',
  prodct_id UUID NOT NULL REFERENCES products ON DELETE CASCADE,
);
