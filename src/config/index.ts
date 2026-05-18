import { z } from 'zod';

const schema = z.object({
  STELLAR_RPC_URL: z.string().url(),
  NETWORK: z.enum(['testnet', 'mainnet', 'futurenet']),
  DATABASE_URL: z.string().min(1),
  POLL_INTERVAL_MS: z.coerce.number().int().positive().default(5000),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  PORT: z.coerce.number().int().positive().default(3001),
  START_LEDGER: z.coerce.number().int().positive().optional(),
});

export type AppConfig = z.infer<typeof schema>;

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  return schema.parse(env);
}
