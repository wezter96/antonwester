// Booking slot rules in Stockholm time. Pure: no fetch, no env.

export const SLOT_MINUTES = 30;
export const GAP_MINUTES = 15;
const FIRST_MINUTE = 9 * 60; // 09:00
const LAST_MINUTE = 16 * 60 + 30; // last slot starts 16:30
const NOTICE_MS = 24 * 3600e3;
const WINDOW_MS = 28 * 24 * 3600e3;
const MIN = 60e3;

const zone = (name) => new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Stockholm', timeZoneName: 'longOffset', ...name });
const offsetFmt = zone({});
const partsFmt = zone({ hour12: false, hourCycle: 'h23', weekday: 'short', hour: '2-digit', minute: '2-digit' });

/** Offset of Stockholm from UTC at this instant, in ms. */
function offsetMs(date) {
  const name = offsetFmt.formatToParts(date).find((p) => p.type === 'timeZoneName').value; // "GMT+01:00"
  const m = /GMT([+-])(\d\d):(\d\d)/.exec(name);
  return m ? (m[1] === '-' ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3])) * MIN : 0;
}

/**
 * @param {string} date YYYY-MM-DD
 * @param {number} hour
 * @param {number} minute
 */
export function stockholmToUtc(date, hour, minute) {
  const [y, m, d] = date.split('-').map(Number);
  const guess = new Date(Date.UTC(y, m - 1, d, hour, minute));
  // bookable hours never fall inside a clock change, so one pass is enough
  return new Date(guess.getTime() - offsetMs(guess));
}

/** @param {string} week YYYY-MM-DD */
export function isMonday(week) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(week)) return false;
  const d = new Date(`${week}T00:00:00.000Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().startsWith(week) && d.getUTCDay() === 1;
}

/**
 * Grid and window rules only, no busy check.
 * @param {string} start UTC ISO string in toISOString() form
 * @param {Date} now
 */
export function isBookable(start, now) {
  const date = new Date(start);
  if (Number.isNaN(date.getTime()) || date.toISOString() !== start) return false;
  const p = Object.fromEntries(partsFmt.formatToParts(date).map((x) => [x.type, x.value]));
  const minutes = Number(p.hour) * 60 + Number(p.minute);
  if (['Sat', 'Sun'].includes(p.weekday)) return false;
  if (minutes < FIRST_MINUTE || minutes > LAST_MINUTE || minutes % SLOT_MINUTES !== 0) return false;
  const ahead = date.getTime() - now.getTime();
  return ahead >= NOTICE_MS && ahead <= WINDOW_MS;
}

/**
 * True if the slot, plus a gap on each side, touches no busy time.
 * @param {string} start
 * @param {{ start: string; end: string }[]} busy
 */
export function isFree(start, busy) {
  const from = new Date(start).getTime() - GAP_MINUTES * MIN;
  const to = new Date(start).getTime() + (SLOT_MINUTES + GAP_MINUTES) * MIN;
  return !busy.some((b) => new Date(b.start).getTime() < to && new Date(b.end).getTime() > from);
}

/**
 * Free slots Monday to Friday of one week, as UTC ISO strings.
 * @param {string} monday YYYY-MM-DD
 * @param {{ start: string; end: string }[]} busy
 * @param {Date} now
 */
export function weekSlots(monday, busy, now) {
  const slots = [];
  for (let day = 0; day < 5; day++) {
    const date = new Date(new Date(`${monday}T00:00:00.000Z`).getTime() + day * 86400e3).toISOString().slice(0, 10);
    for (let t = FIRST_MINUTE; t <= LAST_MINUTE; t += SLOT_MINUTES) {
      const start = stockholmToUtc(date, Math.floor(t / 60), t % 60).toISOString();
      if (isBookable(start, now) && isFree(start, busy)) slots.push(start);
    }
  }
  return slots;
}
