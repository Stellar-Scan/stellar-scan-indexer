ALTER TABLE contracts
  ADD COLUMN IF NOT EXISTS verification_status TEXT NOT NULL DEFAULT 'unverified';

CREATE INDEX IF NOT EXISTS idx_contracts_verified ON contracts(verified);
CREATE INDEX IF NOT EXISTS idx_contracts_tags ON contracts USING GIN (tags);

ALTER TABLE contracts
  ADD COLUMN IF NOT EXISTS search_vector tsvector
  GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(name, '') || ' ' || coalesce(contract_id, ''))
  ) STORED;

CREATE INDEX IF NOT EXISTS idx_contracts_search ON contracts USING GIN (search_vector);
