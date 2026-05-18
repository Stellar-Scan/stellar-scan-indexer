import { createHash } from 'node:crypto';

export function hashWasm(bytes: Buffer): string {
  return createHash('sha256').update(bytes).digest('hex');
}

export async function fetchWasm(
  rpcUrl: string,
  contractId: string,
): Promise<{ bytes: Buffer; hash: string }> {
  const res = await fetch(rpcUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'getContractWasm',
      params: { contractId },
    }),
  });
  const json = (await res.json()) as { result?: { wasm?: string } };
  const wasmB64 = json.result?.wasm;
  if (!wasmB64) throw new Error('wasm not found');
  const bytes = Buffer.from(wasmB64, 'base64');
  return { bytes, hash: hashWasm(bytes) };
}
