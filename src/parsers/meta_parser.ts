export type TxMeta = { fee: string; timestamp: string };

export function parseTxMeta(meta: Record<string, unknown>): TxMeta {
  return {
    fee: String(meta.feeCharged ?? meta.fee ?? '0'),
    timestamp: String(meta.closedAt ?? meta.timestamp ?? new Date().toISOString()),
  };
}
