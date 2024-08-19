CREATE EXTENSION IF NOT EXISTS vector;
CREATE TABLE IF NOT EXISTS docs (
  id varchar PRIMARY KEY UNIQUE,
  embedding vector(512),
  body varchar
);
