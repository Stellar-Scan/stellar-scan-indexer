import { describe, expect, it } from 'vitest';
import { fetchLatestLedger } from '../../src/watchers/ledger_watcher.js';

describe('indexer flow', () => {
  it('fetchLatestLedger is defined', () => {
    expect(typeof fetchLatestLedger).toBe('function');
  });
});
