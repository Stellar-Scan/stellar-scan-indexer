CREATE TABLE IF NOT EXISTS ledger_cursor (
  network TEXT PRIMARY KEY,
  last_indexed_ledger BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
