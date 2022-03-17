CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS users (
  user_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR NOT NULL DEFAULT '',
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  profile_image VARCHAR NOT NULL DEFAULT 'http://placehold.jp/150x150.png',
  created_at timestamptz NOT NULL DEFAULT (now()),
  updated_at timestamptz NOT NULL
);
