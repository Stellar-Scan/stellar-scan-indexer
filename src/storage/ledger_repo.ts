import type { Pool } from 'pg';

export class LedgerRepo {
  constructor(private pool: Pool) {}

  async getLastLedger(network: string): Promise<number> {
    const res = await this.pool.query(
      'SELECT last_indexed_ledger FROM ledger_cursor WHERE network = $1',
      [network],
    );
    if (!res.rowCount) return 0;
    return Number(res.rows[0].last_indexed_ledger);
  }

  async setLastLedger(network: string, ledger: number): Promise<void> {
    await this.pool.query(
      `INSERT INTO ledger_cursor (network, last_indexed_ledger)
       VALUES ($1, $2)
       ON CONFLICT (network) DO UPDATE
       SET last_indexed_ledger = EXCLUDED.last_indexed_ledger, updated_at = NOW()`,
      [network, ledger],
    );
  }
}
