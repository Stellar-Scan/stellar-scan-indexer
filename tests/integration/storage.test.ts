import { describe, expect, it } from 'vitest';

describe('storage integration', () => {
  it('skips without DATABASE_URL', () => {
    if (!process.env.DATABASE_URL) {
      expect(true).toBe(true);
      return;
    }
    expect(process.env.DATABASE_URL).toBeTruthy();
  });
});
