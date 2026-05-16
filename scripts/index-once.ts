import { loadConfig } from '../src/config/index.js';
import { createPool } from '../src/storage/db.js';
import { LedgerRepo } from '../src/storage/ledger_repo.js';

const cfg = loadConfig();
const pool = createPool(cfg.DATABASE_URL);
const repo = new LedgerRepo(pool);
const from = Number(process.argv[2] ?? 0);
const to = Number(process.argv[3] ?? from);
(async () => {
  for (let l = from; l <= to; l++) await repo.setLastLedger(cfg.NETWORK, l);
  console.log('indexed', from, 'to', to);
  await pool.end();
})();
