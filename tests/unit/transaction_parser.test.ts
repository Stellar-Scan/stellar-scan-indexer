import { describe, expect, it } from 'vitest';
import { parseDeployFromEnvelope } from '../../src/parsers/transaction_parser.js';

describe('parseDeployFromEnvelope', () => {
  it('detects invokeHostFunction deploy', () => {
    const parsed = parseDeployFromEnvelope({
      sourceAccount: 'GABC',
      ledger: 1,
      hash: 'tx1',
      operations: [{ body: 'invokeHostFunction', contractId: 'C123' }],
    });
    expect(parsed?.contractId).toBe('C123');
  });
});
