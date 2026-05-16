import { loadConfig } from './config/index.js';
import { createLogger } from './utils/logger.js';
import { createPool } from './storage/db.js';
import { LedgerRepo } from './storage/ledger_repo.js';
import { ContractRepo } from './storage/contract_repo.js';
import { FunctionRepo } from './storage/function_repo.js';
import { EventRepo } from './storage/event_repo.js';
import { fetchLatestLedger } from './watchers/ledger_watcher.js';
import { createHealthServer } from './utils/health.js';
import { ledgersIndexed, lastLedgerGauge } from './utils/metrics.js';
import { onShutdown } from './shutdown.js';

async function main() {
  const cfg = loadConfig();
  const log = createLogger(cfg.LOG_LEVEL);
  const pool = createPool(cfg.DATABASE_URL);
  const ledgerRepo = new LedgerRepo(pool);
  const contractRepo = new ContractRepo(pool);
  const functionRepo = new FunctionRepo(pool);
  const eventRepo = new EventRepo(pool);

  let rpcHealthy = true;
  const health = createHealthServer(cfg.PORT, pool, () => rpcHealthy);
  await health.listen();
  log.info({ port: cfg.PORT }, 'health server listening');

  let cursor = cfg.START_LEDGER ?? (await ledgerRepo.getLastLedger(cfg.NETWORK));

  const tick = async () => {
    try {
      const latest = await fetchLatestLedger(cfg.STELLAR_RPC_URL);
      rpcHealthy = true;
      while (cursor < latest) {
        cursor += 1;
        await ledgerRepo.setLastLedger(cfg.NETWORK, cursor);
        ledgersIndexed.inc();
        lastLedgerGauge.set(cursor);
        log.debug({ ledger: cursor }, 'indexed ledger');
      }
    } catch (err) {
      rpcHealthy = false;
      log.warn({ err }, 'ledger poll failed');
    }
  };

  onShutdown(async () => {
    log.info('shutting down');
    await pool.end();
  });

  await tick();
  setInterval(tick, cfg.POLL_INTERVAL_MS);
  log.info({ network: cfg.NETWORK, cursor }, 'indexer started');

  void { contractRepo, functionRepo, eventRepo };
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
