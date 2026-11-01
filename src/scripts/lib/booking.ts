import type { Locale } from '../../content/routes';

export interface Day {
  label: string;
  date: string;
  times: { iso: string; time: string }[];
}

const DAY = 86400e3;
// en-GB keeps English 24-hour, day before month, as the Swedish page does
const tag = (locale: Locale) => (locale === 'sv' ? 'sv-SE' : 'en-GB');
/** sv-SE writes dates as YYYY-MM-DD. */
const isoDate = (at: Date, timeZone: string) => new Intl.DateTimeFormat('sv-SE', { timeZone, dateStyle: 'short' }).format(at);
const stockholmDate = (at: Date) => isoDate(at, 'Europe/Stockholm');
const utc = (date: string) => new Date(`${date}T12:00:00Z`);

/** "mån 2 nov." with one space after the weekday, so the page can set the two parts apart. */
function dayLabel(at: Date, timeZone: string, locale: Locale): string {
  const weekday = new Intl.DateTimeFormat(tag(locale), { timeZone, weekday: 'short' }).format(at);
  const date = new Intl.DateTimeFormat(tag(locale), { timeZone, day: 'numeric', month: 'short' }).format(at);
  return `${weekday} ${date}`;
}

const byDate = (a: Day, b: Day) => a.date.localeCompare(b.date);

/** Groups by the visitor's own day: a slot can land on any weekday far from Sweden, and must still show. */
export function groupByDay(slots: string[], timeZone: string, locale: Locale): Day[] {
  const clock = new Intl.DateTimeFormat(tag(locale), { timeZone, hour: '2-digit', minute: '2-digit' });
  const days = new Map<string, Day>();
  for (const iso of [...slots].sort()) {
    const at = new Date(iso);
    const date = isoDate(at, timeZone);
    if (!days.has(date)) days.set(date, { label: dayLabel(at, timeZone, locale), date, times: [] });
    days.get(date)!.times.push({ iso, time: clock.format(at) });
  }
  return [...days.values()].sort(byDate);
}

export const addWeeks = (monday: string, weeks: number): string =>
  new Date(utc(monday).getTime() + weeks * 7 * DAY).toISOString().slice(0, 10);

/** The columns of a week: Monday to Friday, empty or not, plus any other day that has times. */
export function weekColumns(monday: string, groups: Day[], locale: Locale): Day[] {
  const days = new Map(groups.map((d) => [d.date, d]));
  for (let i = 0; i < 5; i++) {
    const at = new Date(utc(monday).getTime() + i * DAY);
    const date = at.toISOString().slice(0, 10);
    if (!days.has(date)) days.set(date, { label: dayLabel(at, 'UTC', locale), date, times: [] });
  }
  return [...days.values()].sort(byDate);
}

function mondayOf(date: string): string {
  const at = utc(date);
  return new Date(at.getTime() - ((at.getUTCDay() + 6) % 7) * DAY).toISOString().slice(0, 10);
}

/** The Monday of today's Stockholm date. */
export const currentMonday = (now: Date): string => mondayOf(stockholmDate(now));

/** The Monday of the week that holds the 4-week limit, the last week the page can show. */
export const lastMonday = (now: Date): string => mondayOf(stockholmDate(new Date(now.getTime() + 28 * DAY)));

export function weekNumber(monday: string): number {
  // a week belongs to the year of its Thursday, and week 1 holds that year's first Thursday
  const thursday = utc(monday).getTime() + 3 * DAY;
  const year = new Date(thursday).getUTCFullYear();
  return Math.floor((thursday - Date.UTC(year, 0, 1)) / (7 * DAY)) + 1;
}
