CREATE TABLE IF NOT EXISTS contract_functions (
  id SERIAL PRIMARY KEY,
  contract_id TEXT NOT NULL,
  network TEXT NOT NULL,
  name TEXT NOT NULL,
  doc TEXT,
  inputs JSONB NOT NULL DEFAULT '[]',
  outputs JSONB NOT NULL DEFAULT '[]',
  UNIQUE (contract_id, network, name)
);
