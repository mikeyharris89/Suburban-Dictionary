# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique


## words
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
definition  | text      | not null
sentence    | text      | not null, foreign key (references notebooks), indexed
author_id   | integer   | not null, foreign key (references users), indexed
likes       | integer   | not null, default: 0
dislikes    | integer   | not null, default: 0
