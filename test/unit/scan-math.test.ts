import { describe, expect, it } from 'vitest';
import { scan } from '../../src/content/scan';
import { ui } from '../../src/content/ui';
import { estimateMessage, fillTemplate, formatHours, fullTimeWeeks, hoursPerYear } from '../../src/scripts/lib/scan-math';

const cs = scan.sv[0].steps;
const admin = scan.sv[3].steps;

describe('scan maths', () => {
  it('matches the mockup for customer service at 25 h with two choices per step', () => {
    expect(hoursPerYear(25, cs)).toBe(640);
    expect(fullTimeWeeks(640)).toBe(16);
  });
  it('gives 740 h for administration at 25 h', () => {
    expect(hoursPerYear(25, admin)).toBe(740);
  });
  it('returns 0, never NaN, when every step is human or the input is not a number', () => {
    expect(hoursPerYear(120, cs.map((s) => ({ ...s, mode: 'you' as const })))).toBe(0);
    expect(hoursPerYear(Number.NaN, cs)).toBe(0);
    expect(hoursPerYear(-5, cs)).toBe(0);
    expect(fullTimeWeeks(0)).toBe(0);
  });
  it('handles the slider extremes', () => {
    expect(hoursPerYear(2, cs)).toBe(50);
    expect(hoursPerYear(120, cs)).toBe(3090);
  });
  it('formats numbers per locale', () => {
    expect(formatHours(3420, 'sv')).toBe(new Intl.NumberFormat('sv-SE').format(3420));
    expect(formatHours(3420, 'en')).toBe('3,420');
  });
  it('fills templates and builds the handoff message', () => {
    expect(fillTemplate('a {x} b', { x: 1 })).toBe('a 1 b');
    const msg = estimateMessage({
      functionName: 'Kundtjänst', steps: cs, modeLabels: ui.sv.scan.modes, hoursPerWeek: 25,
      hoursPerYear: 640, locale: 'sv', template: ui.sv.scan.message,
    });
    expect(msg.split('\n')[0]).toBe('Uppskattning från AI-verktyget: Kundtjänst, 25 timmar per vecka.');
    expect(msg).toContain('– Kontrollera ton och fakta: Medarbetare');
    expect(msg).toContain('(16 heltidsveckor)');
  });
});
