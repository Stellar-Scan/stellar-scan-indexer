export type ParsedDeploy = {
  contractId: string;
  deployer: string;
  ledger: number;
  txHash: string;
};

export function parseDeployFromEnvelope(envelope: Record<string, unknown>): ParsedDeploy | null {
  const ops = (envelope.operations as unknown[]) ?? [];
  for (const op of ops) {
    const body = (op as { body?: string }).body;
    if (body === 'invokeHostFunction') {
      const cid = (op as { contractId?: string }).contractId;
      if (cid) {
        return {
          contractId: cid,
          deployer: String((envelope.sourceAccount as string) ?? ''),
          ledger: Number((envelope.ledger as number) ?? 0),
          txHash: String((envelope.hash as string) ?? ''),
        };
      }
    }
  }
  return null;
}
