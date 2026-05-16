import { describe, expect, it } from 'vitest';
import { specToFunctions } from '../../src/decoders/function_decoder.js';

describe('specToFunctions', () => {
  it('maps function specs', () => {
    const rows = specToFunctions('C1', 'testnet', [
      { name: 'transfer', kind: 'function' },
      { name: 'Event', kind: 'event' },
    ]);
    expect(rows).toHaveLength(1);
    expect(rows[0].name).toBe('transfer');
  });
});
