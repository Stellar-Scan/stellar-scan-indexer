CREATE TABLE IF NOT EXISTS contract_events (
  id SERIAL PRIMARY KEY,
  contract_id TEXT NOT NULL,
  network TEXT NOT NULL,
  ledger BIGINT NOT NULL,
  tx_hash TEXT NOT NULL,
  event_index INT NOT NULL,
  topics JSONB NOT NULL DEFAULT '[]',
  value JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (tx_hash, event_index, network)
);
