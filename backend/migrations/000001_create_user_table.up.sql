CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  uid uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  username VARCHAR NOT NULL DEFAULT '',
  email VARCHAR NOT NULL UNIQUE DEFAULT '',
  password VARCHAR NOT NULL,
  profile_url VARCHAR NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT (now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT (now())
);
