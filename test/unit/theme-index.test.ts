import { describe, expect, it } from 'vitest';
import { activeSection } from '../../src/scripts/lib/theme-index';

describe('active section', () => {
  it('picks the last section whose top is above the line', () => {
    expect(activeSection([0, 900, 1800], 540)).toBe(0);
    expect(activeSection([0, 900, 1800], 900)).toBe(1);
    expect(activeSection([0, 900, 1800], 5000)).toBe(2);
  });
  it('falls back to the first section', () => {
    expect(activeSection([100, 900], 0)).toBe(0);
    expect(activeSection([], 0)).toBe(0);
  });
});
