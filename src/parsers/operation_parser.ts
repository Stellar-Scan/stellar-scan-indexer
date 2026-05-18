export function isInvokeHostFunction(op: Record<string, unknown>): boolean {
  return op.type === 'invokeHostFunction' || op.body === 'invokeHostFunction';
}

export function extractContractId(op: Record<string, unknown>): string | null {
  const id = op.contractId ?? op.contract_id;
  return typeof id === 'string' ? id : null;
}
