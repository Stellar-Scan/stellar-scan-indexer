import { describe, expect, it } from 'vitest';
import { hashWasm } from '../../src/decoders/wasm_decoder.js';

describe('hashWasm', () => {
  it('hashes wasm bytes deterministically', () => {
    const h1 = hashWasm(Buffer.from('wasm'));
    const h2 = hashWasm(Buffer.from('wasm'));
    expect(h1).toBe(h2);
    expect(h1).toHaveLength(64);
  });
});
