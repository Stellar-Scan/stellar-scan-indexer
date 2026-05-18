import { Counter, Gauge, Registry } from 'prom-client';

export const registry = new Registry();

export const ledgersIndexed = new Counter({
  name: 'indexer_ledgers_total',
  help: 'Ledgers processed',
  registers: [registry],
});

export const contractsIndexed = new Counter({
  name: 'indexer_contracts_total',
  help: 'Contracts indexed',
  registers: [registry],
});

export const rpcErrors = new Counter({
  name: 'indexer_rpc_errors_total',
  help: 'RPC errors',
  registers: [registry],
});

export const lastLedgerGauge = new Gauge({
  name: 'indexer_last_ledger',
  help: 'Last indexed ledger sequence',
  registers: [registry],
});
