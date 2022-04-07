CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table users (
  uid uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR (50) UNIQUE NOT NULL,
  password VARCHAR (50) NOT NULL,
  profile_url VARCHAR (300) UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT (now()),
  updated_at timestamptz NOT NULL DEFAULT (now())
);


