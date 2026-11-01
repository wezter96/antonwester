import { describe, expect, it } from 'vitest';
import { GAP_MINUTES, SLOT_MINUTES, isBookable, isFree, isMonday, stockholmToUtc, weekSlots } from '../../worker/slots.js';

const iso = (s: string) => new Date(s);
const now = iso('2026-10-20T00:00:00.000Z');
const stockholm = (utc: string) =>
  new Date(utc).toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm', hour12: false });

describe('stockholmToUtc', () => {
  it('handles winter and summer time', () => {
    expect(stockholmToUtc('2026-11-02', 9, 0).toISOString()).toBe('2026-11-02T08:00:00.000Z');
    expect(stockholmToUtc('2026-07-01', 9, 0).toISOString()).toBe('2026-07-01T07:00:00.000Z');
  });
});

describe('weekSlots', () => {
  it('exports the constants', () => {
    expect([SLOT_MINUTES, GAP_MINUTES]).toEqual([30, 15]);
  });

  it('starts at 09:00 Stockholm across clock changes', () => {
    expect(weekSlots('2026-10-26', [], iso('2026-10-20T00:00:00.000Z'))[0]).toMatch(/T08:00:00\.000Z$/);
    expect(weekSlots('2026-10-19', [], iso('2026-10-12T00:00:00.000Z'))[0]).toMatch(/T07:00:00\.000Z$/);
    const spring = weekSlots('2027-03-22', [], iso('2027-03-15T00:00:00.000Z'));
    expect(spring).toContain('2027-03-25T08:00:00.000Z');
    expect(weekSlots('2027-03-29', [], iso('2027-03-22T00:00:00.000Z'))[0]).toBe('2027-03-29T07:00:00.000Z');
  });

  it('gives 5 x 16 slots, last at 16:30', () => {
    const slots = weekSlots('2026-11-02', [], now);
    expect(slots).toHaveLength(80);
    expect(slots[15]).toBe('2026-11-02T15:30:00.000Z');
    expect(stockholm(slots[15])).toContain('16:30');
  });

  it('drops slots that clash with busy time plus the gap', () => {
    const busy = [{ start: '2026-11-02T09:00:00.000Z', end: '2026-11-02T10:00:00.000Z' }]; // 10:00-11:00
    const slots = weekSlots('2026-11-02', busy, now);
    for (const t of ['09:30', '10:00', '10:30', '11:00']) expect(slots).not.toContain(`2026-11-02T${String(Number(t.slice(0, 2)) - 1).padStart(2, '0')}:${t.slice(3)}:00.000Z`);
    expect(slots).toContain('2026-11-02T08:00:00.000Z');
    expect(slots).toContain('2026-11-02T10:30:00.000Z');
  });

  it('keeps a slot that only touches the gap edge', () => {
    const busy = [{ start: '2026-11-02T08:00:00.000Z', end: '2026-11-02T08:45:00.000Z' }]; // ends 09:45
    expect(weekSlots('2026-11-02', busy, now)).toContain('2026-11-02T09:00:00.000Z');
  });

  it('needs a day of notice', () => {
    const slots = weekSlots('2026-11-02', [], iso('2026-11-02T08:00:00.000Z')); // Monday 09:00
    expect(slots[0]).toBe('2026-11-03T08:00:00.000Z');
  });

  it('stops at 28 days', () => {
    const slots = weekSlots('2026-11-30', [], iso('2026-11-02T08:00:00.000Z'));
    expect(slots.every((s) => s <= '2026-11-30T08:00:00.000Z')).toBe(true);
    expect(slots).toContain('2026-11-30T08:00:00.000Z');
  });
});

describe('isBookable / isFree / isMonday', () => {
  it('accepts a normal slot only in exact form', () => {
    expect(isBookable('2026-11-03T08:00:00.000Z', now)).toBe(true);
    expect(isBookable('2026-11-03T08:00:00Z', now)).toBe(false);
  });

  it('rejects bad times', () => {
    expect(isBookable('2026-11-03T08:15:00.000Z', now)).toBe(false);
    expect(isBookable('2026-11-07T08:00:00.000Z', now)).toBe(false); // Saturday
    expect(isBookable('2026-10-19T08:00:00.000Z', now)).toBe(false); // past
    expect(isBookable('nope', now)).toBe(false);
    expect(isBookable('2026-11-03T16:00:00.000Z', now)).toBe(false); // 17:00
  });

  it('isFree matches the gap rule', () => {
    const busy = [{ start: '2026-11-02T09:00:00.000Z', end: '2026-11-02T10:00:00.000Z' }];
    expect(isFree('2026-11-02T08:30:00.000Z', busy)).toBe(false);
    expect(isFree('2026-11-02T08:00:00.000Z', busy)).toBe(true);
  });

  it('isMonday', () => {
    expect(isMonday('2026-11-02')).toBe(true);
    expect(isMonday('2026-11-03')).toBe(false);
    expect(isMonday('2026-13-01')).toBe(false);
    expect(isMonday('x')).toBe(false);
  });
});
