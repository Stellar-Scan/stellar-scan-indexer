import { withRetry } from '../utils/retry.js';

export async function fetchLatestLedger(rpcUrl: string): Promise<number> {
  return withRetry(async () => {
    const res = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getLatestLedger' }),
    });
    const json = (await res.json()) as { result?: { sequence?: number } };
    const seq = json.result?.sequence;
    if (seq === undefined) throw new Error('no sequence');
    return seq;
  });
}
