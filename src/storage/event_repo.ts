import type { Pool } from 'pg';

export type EventRow = {
  contract_id: string;
  network: string;
  ledger: number;
  tx_hash: string;
  event_index: number;
  topics: unknown[];
  value?: unknown;
};

export class EventRepo {
  constructor(private pool: Pool) {}

  async insert(row: EventRow): Promise<void> {
    await this.pool.query(
      `INSERT INTO contract_events (contract_id, network, ledger, tx_hash, event_index, topics, value)
       VALUES ($1,$2,$3,$4,$5,$6::jsonb,$7::jsonb)
       ON CONFLICT (tx_hash, event_index, network) DO NOTHING`,
      [
        row.contract_id,
        row.network,
        row.ledger,
        row.tx_hash,
        row.event_index,
        JSON.stringify(row.topics),
        row.value === undefined ? null : JSON.stringify(row.value),
      ],
    );
  }
}
