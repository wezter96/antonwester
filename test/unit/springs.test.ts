import { describe, expect, it } from 'vitest';
import { approach, createRipple, kickRipple, lensAt, stepRipple } from '../../src/scripts/lib/springs';

describe('lens', () => {
  it('peaks at the pointer and fades within a fifth of the width', () => {
    expect(lensAt(500, 500, 1000)).toBeCloseTo(22, 5);
    expect(lensAt(700, 500, 1000)).toBeLessThan(0.05);
  });
  it('approaches a target smoothly', () => {
    expect(approach(0, 10)).toBeCloseTo(0.85, 5);
  });
});

describe('ripple', () => {
  const centers = Array.from({ length: 11 }, (_, i) => i * 100);
  it('travels from the clicked letter to the far end', () => {
    const r = createRipple(11);
    kickRipple(r, centers, 0, 35);
    let farthest = 0;
    for (let t = 0; t < 60; t++) { stepRipple(r); farthest = Math.max(farthest, Math.abs(r.r[10])); }
    expect(farthest).toBeGreaterThan(0.5);
  });
  it('settles and stays within the width axis', () => {
    const r = createRipple(11);
    kickRipple(r, centers, 300, 35);
    let energy = Infinity;
    for (let t = 0; t < 600; t++) {
      energy = stepRipple(r);
      for (const v of r.r) { expect(v).toBeLessThanOrEqual(25); expect(v).toBeGreaterThanOrEqual(-30); }
    }
    expect(energy).toBeLessThan(0.05);
  });
});
