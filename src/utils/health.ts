import Fastify from 'fastify';
import type { Pool } from 'pg';
import { registry } from './metrics.js';

export function createHealthServer(port: number, pool: Pool, rpcOk: () => boolean) {
  const app = Fastify({ logger: false });
  app.get('/health', async () => ({ status: 'ok' }));
  app.get('/ready', async () => {
    await pool.query('SELECT 1');
    if (!rpcOk()) throw new Error('rpc unavailable');
    return { status: 'ready' };
  });
  app.get('/metrics', async (_, reply) => {
    reply.header('Content-Type', registry.contentType);
    return registry.metrics();
  });
  return { app, listen: () => app.listen({ port, host: '0.0.0.0' }) };
}
