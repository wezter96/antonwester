import { describe, expect, it } from 'vitest';
import { addWeeks, currentMonday, groupByDay, lastMonday, weekColumns, weekNumber } from '../../src/scripts/lib/booking';

describe('groupByDay', () => {
  // Tue 3 Nov 09:00 and 13:00, Mon 2 Nov 10:30, all Stockholm (UTC+1), out of order on purpose
  const slots = ['2026-11-03T08:00:00.000Z', '2026-11-03T12:00:00.000Z', '2026-11-02T09:30:00.000Z'];

  it('groups by Stockholm day, sorted by date, with times in that zone', () => {
    const days = groupByDay(slots, 'Europe/Stockholm', 'sv');
    expect(days.map((d) => d.date)).toEqual(['2026-11-02', '2026-11-03']);
    expect(days[1].times).toEqual([
      { iso: '2026-11-03T08:00:00.000Z', time: '09:00' },
      { iso: '2026-11-03T12:00:00.000Z', time: '13:00' },
    ]);
    expect(days[0].label).toBe('mån 2 nov.');
  });

  it('labels days in English for en', () => {
    expect(groupByDay(slots, 'Europe/Stockholm', 'en')[0].label).toBe('Mon 2 Nov');
  });

  it('keeps a Friday 16:30 Stockholm slot that lands on a Saturday in Auckland', () => {
    const friday = '2026-11-06T15:30:00.000Z'; // 16:30 Stockholm, Sat 04:30 Auckland (UTC+13)
    const days = groupByDay([friday], 'Pacific/Auckland', 'en');
    expect(days).toEqual([{ label: 'Sat 7 Nov', date: '2026-11-07', times: [{ iso: friday, time: '04:30' }] }]);
  });

  it('gives nothing for no slots', () => {
    expect(groupByDay([], 'Europe/Stockholm', 'sv')).toEqual([]);
  });
});

describe('weekColumns', () => {
  it('shows Monday to Friday even with no times', () => {
    const days = weekColumns('2026-11-02', [], 'sv');
    expect(days.map((d) => d.date)).toEqual(['2026-11-02', '2026-11-03', '2026-11-04', '2026-11-05', '2026-11-06']);
    expect(days[0]).toEqual({ label: 'mån 2 nov.', date: '2026-11-02', times: [] });
  });

  it('adds a day outside Monday to Friday when it has times, in date order', () => {
    const groups = groupByDay(['2026-11-06T15:30:00.000Z'], 'Pacific/Auckland', 'en');
    const days = weekColumns('2026-11-02', groups, 'en');
    expect(days.map((d) => d.date).at(-1)).toBe('2026-11-07');
    expect(days).toHaveLength(6);
  });
});

describe('week arithmetic', () => {
  it('finds the Monday of the Stockholm date', () => {
    expect(currentMonday(new Date('2026-11-04T12:00:00Z'))).toBe('2026-11-02');
    expect(currentMonday(new Date('2026-11-02T00:00:00Z'))).toBe('2026-11-02');
    // Sunday 23:30 UTC is already Monday in Stockholm
    expect(currentMonday(new Date('2026-11-01T23:30:00Z'))).toBe('2026-11-02');
    expect(currentMonday(new Date('2026-11-01T12:00:00Z'))).toBe('2026-10-26');
  });

  it('stops at the Monday of the week that holds the 4-week limit', () => {
    expect(lastMonday(new Date('2026-11-01T12:00:00Z'))).toBe('2026-11-23');
    expect(lastMonday(new Date('2026-11-04T12:00:00Z'))).toBe('2026-11-30');
  });

  it('adds weeks across a month and a clock change', () => {
    expect(addWeeks('2026-10-19', 1)).toBe('2026-10-26');
    expect(addWeeks('2026-11-30', 1)).toBe('2026-12-07');
    expect(addWeeks('2026-11-02', -1)).toBe('2026-10-26');
  });

  it('gives the ISO week number', () => {
    expect(weekNumber('2026-11-02')).toBe(45);
    expect(weekNumber('2026-12-28')).toBe(53);
    expect(weekNumber('2027-01-04')).toBe(1);
  });
});
