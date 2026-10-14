import { describe, expect, it } from 'vitest';
import { lineSizeVw, widthEm } from '../../src/lib/measure';

describe('measure', () => {
  it('measures the name in Archivo at wdth 100, wght 800', () => {
    expect(widthEm('ANTON')).toBeGreaterThan(2.8);
    expect(widthEm('ANTON')).toBeLessThan(4.2);
    expect(widthEm('WESTER')).toBeGreaterThan(widthEm('ANTON'));
  });
  it('uppercases before measuring, as the CSS does', () => {
    expect(widthEm('anton')).toBeCloseTo(widthEm('ANTON'), 5);
  });
  it('sizes the hero line to roughly 9–11vw for 82 % of the viewport', () => {
    const vw = lineSizeVw(['ANTON', 0.95, 'WESTER'], 82, 0.12);
    expect(vw).toBeGreaterThan(8);
    expect(vw).toBeLessThan(11.5);
  });
  it('handles Swedish letters', () => {
    expect(widthEm('SÖKHEM')).toBeGreaterThan(0);
  });
});
