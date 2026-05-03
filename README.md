# stellar-scan-indexer

> Real-time Stellar RPC watcher that detects Soroban contract deployments, decodes WASM, parses specs, and writes structured metadata to PostgreSQL.

[![Stellar Wave](https://img.shields.io/badge/Stellar%20Wave-Wave%205-blue?style=flat-square)](https://www.drips.network/wave/stellar)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-green?style=flat-square)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-green?style=flat-square)](.github/workflows/ci.yml)

---

## Overview

`stellar-scan-indexer` is a long-running Node.js service that polls Stellar's RPC for new ledgers, detects contract deployment and upgrade transactions, fetches the WASM binary, decodes the contract spec (function signatures, types, documentation), and persists everything to PostgreSQL for the API layer to serve.

It is the data backbone of the Stellar Scan platform.

---

## File Structure

```
stellar-scan-indexer/
│
├── package.json
├── tsconfig.json
├── README.md                              # This file
├── CONTRIBUTING.md
├── LICENSE
├── CODEOWNERS
├── .gitignore
├── .env.example                           # Required environment variables
├── .eslintrc.json
├── .prettierrc
├── docker-compose.yml                     # Local dev: Postgres + indexer
├── Dockerfile
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                         # Lint, typecheck, test on every PR
│   │   └── docker.yml                    # Build + push Docker image on main merge
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       └── stellar_wave_task.md
│
├── src/
│   ├── index.ts                           # Service entry point — wires all components
│   │
│   ├── watchers/
│   │   ├── ledger_watcher.ts              # Polls RPC for new ledgers via getLatestLedger
│   │   ├── contract_watcher.ts            # Filters ledger txns for contract operations
│   │   └── event_watcher.ts              # Listens for Soroban contract events
│   │
│   ├── decoders/
│   │   ├── wasm_decoder.ts                # Fetches WASM binary via getContractWasmByContractId
│   │   ├── spec_decoder.ts                # Parses Soroban contract spec from WASM metadata
│   │   ├── function_decoder.ts            # Extracts function signatures and parameter types
│   │   └── event_decoder.ts              # Decodes contract event topics and values
│   │
│   ├── parsers/
│   │   ├── transaction_parser.ts          # Extracts contract deploys from raw tx envelopes
│   │   ├── operation_parser.ts            # Handles InvokeHostFunction operations
│   │   └── meta_parser.ts                 # Extracts deployer, timestamp, fee from tx meta
│   │
│   ├── storage/
│   │   ├── db.ts                          # pg connection pool + query helpers
│   │   ├── contract_repo.ts               # CRUD for contracts table
│   │   ├── function_repo.ts               # CRUD for contract_functions table
│   │   ├── event_repo.ts                  # CRUD for contract_events table
│   │   └── ledger_repo.ts                 # Tracks last indexed ledger for resume
│   │
│   ├── config/
│   │   ├── index.ts                       # Loads + validates env vars (zod)
│   │   └── networks.ts                    # RPC endpoints for testnet / mainnet / futurenet
│   │
│   └── utils/
│       ├── logger.ts                      # Structured JSON logging (pino)
│       ├── retry.ts                       # Exponential backoff wrapper for RPC calls
│       ├── health.ts                      # HTTP /health endpoint for Docker healthcheck
│       └── metrics.ts                     # Prometheus metrics (ledgers/sec, errors/min)
│
├── tests/
│   ├── unit/
│   │   ├── wasm_decoder.test.ts
│   │   ├── spec_decoder.test.ts
│   │   ├── transaction_parser.test.ts
│   │   └── function_decoder.test.ts
│   │
│   └── integration/
│       ├── indexer_flow.test.ts           # Full end-to-end with testnet fixture data
│       └── storage.test.ts               # DB write/read roundtrip tests
│
└── migrations/
    ├── 001_create_contracts.sql
    ├── 002_create_contract_functions.sql
    ├── 003_create_contract_events.sql
    ├── 004_create_ledger_cursor.sql
    └── 005_add_verification_status.sql
```

---

## Database Schema (overview)

```sql
contracts          — contract_id, deployer, wasm_hash, deploy_ledger, network, verified, tags
contract_functions — contract_id, name, doc, inputs (jsonb), outputs (jsonb)
contract_events    — contract_id, ledger, tx_hash, topics (jsonb), value (jsonb)
ledger_cursor      — network, last_indexed_ledger (for resumable indexing)
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in values:

```
STELLAR_RPC_URL=https://soroban-testnet.stellar.org
NETWORK=testnet
DATABASE_URL=postgresql://user:password@localhost:5432/stellar_scan
POLL_INTERVAL_MS=5000
LOG_LEVEL=info
PORT=3001
```

---

## Running Locally

### With Docker Compose (recommended)

```bash
git clone https://github.com/stellar-scan/stellar-scan-indexer
cd stellar-scan-indexer
cp .env.example .env
# Edit .env with your RPC URL and DB credentials
docker-compose up
```

### Without Docker

```bash
npm install
npm run db:migrate        # Run all migrations
npm run dev               # Start with ts-node and hot reload
```

### Run Tests

```bash
npm test
npm run lint
npm run typecheck
```

---

## Stellar Wave — Open Issues

Browse: [github.com/stellar-scan/stellar-scan-indexer/issues](https://github.com/stellar-scan/stellar-scan-indexer/issues?q=label%3A%22Stellar+Wave%22)

**Points:** Trivial = 100 pts | Medium = 150 pts | High = 200 pts

Full rules: [docs.drips.network/wave/terms-and-rules](https://docs.drips.network/wave/terms-and-rules)

---

## License

MIT — see [LICENSE](LICENSE)
