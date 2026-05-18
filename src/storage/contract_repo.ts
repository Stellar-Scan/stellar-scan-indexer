import type { Pool } from 'pg';

export type ContractRow = {
  contract_id: string;
  network: string;
  deployer: string;
  wasm_hash: string;
  deploy_ledger: number;
  name?: string | null;
  tags?: string[];
};

export class ContractRepo {
  constructor(private pool: Pool) {}

  async upsert(row: ContractRow): Promise<void> {
    await this.pool.query(
      `INSERT INTO contracts (contract_id, network, deployer, wasm_hash, deploy_ledger, name, tags)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       ON CONFLICT (contract_id, network) DO UPDATE SET
         wasm_hash = EXCLUDED.wasm_hash,
         deploy_ledger = EXCLUDED.deploy_ledger,
         name = COALESCE(EXCLUDED.name, contracts.name),
         tags = COALESCE(EXCLUDED.tags, contracts.tags),
         updated_at = NOW()`,
      [
        row.contract_id,
        row.network,
        row.deployer,
        row.wasm_hash,
        row.deploy_ledger,
        row.name ?? null,
        row.tags ?? [],
      ],
    );
  }
}
