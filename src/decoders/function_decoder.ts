import type { FunctionRow } from '../storage/function_repo.js';
import type { SpecEntry } from './spec_decoder.js';

export function specToFunctions(
  contractId: string,
  network: string,
  specs: SpecEntry[],
): FunctionRow[] {
  return specs
    .filter((s) => s.kind === 'function')
    .map((s) => ({
      contract_id: contractId,
      network,
      name: s.name,
      doc: null,
      inputs: [],
      outputs: [],
    }));
}
