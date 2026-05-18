import type { Pool } from 'pg';

export type FunctionRow = {
  contract_id: string;
  network: string;
  name: string;
  doc?: string | null;
  inputs: unknown[];
  outputs: unknown[];
};

export class FunctionRepo {
  constructor(private pool: Pool) {}

  async replaceForContract(contractId: string, network: string, rows: FunctionRow[]): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('DELETE FROM contract_functions WHERE contract_id = $1 AND network = $2', [
        contractId,
        network,
      ]);
      for (const row of rows) {
        await client.query(
          `INSERT INTO contract_functions (contract_id, network, name, doc, inputs, outputs)
           VALUES ($1,$2,$3,$4,$5::jsonb,$6::jsonb)`,
          [contractId, network, row.name, row.doc ?? null, JSON.stringify(row.inputs), JSON.stringify(row.outputs)],
        );
      }
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }
}
