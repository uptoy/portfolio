CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table users (
  uid uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR NOT NULL DEFAULT '',
  email VARCHAR NOT NULL UNIQUE DEFAULT '',
  password VARCHAR NOT NULL,
  profile_url VARCHAR NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT (now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT (now())
);


