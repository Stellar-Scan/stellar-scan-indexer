CREATE TABLE IF NOT EXISTS contracts (
  contract_id TEXT NOT NULL,
  network TEXT NOT NULL,
  deployer TEXT NOT NULL,
  wasm_hash TEXT NOT NULL,
  deploy_ledger BIGINT NOT NULL,
  name TEXT,
  tags TEXT[] DEFAULT '{}',
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (contract_id, network)
);

CREATE INDEX IF NOT EXISTS idx_contracts_network ON contracts(network);
CREATE INDEX IF NOT EXISTS idx_contracts_deployer ON contracts(deployer);
