import { describe, expect, it } from 'vitest';
import { decodeSpecFromWasm } from '../../src/decoders/spec_decoder.js';

describe('decodeSpecFromWasm', () => {
  it('returns array for empty wasm', () => {
    expect(decodeSpecFromWasm(Buffer.alloc(0))).toEqual([]);
  });
});
