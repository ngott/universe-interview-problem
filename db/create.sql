-- This file is used to create the SQLite database schema.

-- SQLite

DROP TABLE IF EXISTS Posts;
CREATE TABLE Posts(
  id INTEGER PRIMARY KEY,
  user_id INTEGER KEY, -- should be foreign key
  post TEXT NOT NULL,
  image TEXT NOT NULL,
  organization TEXT NOT NULL -- should be an ENUM
);

DROP TABLE IF EXISTS Users;
CREATE TABLE Users(
  id INTEGER PRIMARY KEY,
  display_name STRING NOT NULL,
  description STRING NOT NULL,
  profile_pic TEXT NOT NULL
);
