import { describe, expect, it } from 'vitest';
import { inferTags } from '../../src/utils/tagging.js';

describe('inferTags', () => {
  it('detects token interface', () => {
    expect(inferTags(['transfer', 'balance'])).toContain('token');
  });
});
