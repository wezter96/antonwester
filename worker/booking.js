// POST /api/booking and GET /api/booking/slots: a visitor books a call in Anton's Google Calendar.
import { busyTimes, createBooking, siteBookings } from './google.js';
import { buildMessage, FROM, ORIGIN, readSubmission } from './mail.js';
import { isBookable, isFree, isMonday, weekSlots } from './slots.js';

const DAY = 86400e3;
const MAX_BOOKINGS = 10;
const TURNSTILE = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const NO_STORE = { 'Cache-Control': 'no-store' };
const ip = (request) => request.headers.get('CF-Connecting-IP') ?? 'unknown';
const answer = (result, status) => Response.json({ result }, { status, headers: NO_STORE });
const unavailable = (error) => {
  console.error('booking failed', error);
  return null;
};

/** GET /api/booking/slots?week=YYYY-MM-DD (a Monday) → { slots } */
export async function slots(request, env) {
  const { success } = await env.SLOTS_LIMIT.limit({ key: ip(request) });
  if (!success) return Response.json({ error: 'limited' }, { status: 429, headers: NO_STORE });

  const week = new URL(request.url).searchParams.get('week') ?? '';
  if (!isMonday(week)) return Response.json({ error: 'invalid' }, { status: 400, headers: NO_STORE });

  const now = new Date();
  const monday = new Date(`${week}T00:00:00.000Z`).getTime();
  // outside the window there is nothing to book, so skip Google and save quota
  if (monday + 7 * DAY <= now.getTime() || monday > now.getTime() + 35 * DAY) return Response.json({ slots: [] }, { headers: NO_STORE });

  try {
    const busy = await busyTimes(env, new Date(monday - DAY).toISOString(), new Date(monday + 7 * DAY).toISOString());
    return Response.json({ slots: weekSlots(week, busy, now) }, { headers: NO_STORE });
  } catch (error) {
    unavailable(error);
    return Response.json({ error: 'unavailable' }, { status: 502, headers: NO_STORE });
  }
}

/**
 * POST /api/booking (FormData) → { result }
 * @param {(from: string, to: string, raw: string) => Promise<void>} send mail sender, supplied by worker/index.js
 */
export async function book(request, env, send) {
  const origin = request.headers.get('Origin');
  if (origin && origin !== ORIGIN) return answer('forbidden', 403);
  const { success } = await env.BOOK_LIMIT.limit({ key: ip(request) });
  if (!success) return answer('limited', 429);

  let form;
  try { form = await request.formData(); } catch { return answer('invalid', 400); }
  const submission = readSubmission(form);
  if (submission.error) return answer('invalid', 400);
  // a filled honeypot is a bot; it gets the same answer as a person so it learns nothing
  if (submission.spam) return answer('booked', 200);

  try {
    const check = await fetch(TURNSTILE, {
      method: 'POST',
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET,
        response: String(form.get('cf-turnstile-response') ?? ''),
        remoteip: ip(request),
      }),
    });
    if (!check.ok || !(await check.json()).success) return answer('invalid', 400);
  } catch (error) {
    unavailable(error);
    return answer('unavailable', 502);
  }

  const start = String(form.get('start') ?? '');
  const now = new Date();
  if (!isBookable(start, now)) return answer('invalid', 400);

  const locale = form.get('locale') === 'en' ? 'en' : 'sv';
  const email = submission.fields.email.toLowerCase();
  const from = new Date(start).getTime();
  try {
    const existing = await siteBookings(env, now.toISOString());
    if (existing.length >= MAX_BOOKINGS || existing.includes(email)) return answer('full', 409);
    // shortcut: two visitors can pass the recheck at once, low traffic, use a Durable Object if it ever happens
    const busy = await busyTimes(env, new Date(from - DAY).toISOString(), new Date(from + DAY).toISOString());
    if (!isFree(start, busy)) return answer('taken', 409);
    await createBooking(env, { start, email, locale });
  } catch (error) {
    unavailable(error);
    return answer('unavailable', 502);
  }

  // the event exists now, so a mail failure must not turn into an error for the visitor
  try {
    const when = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Stockholm', dateStyle: 'full', timeStyle: 'short' }).format(new Date(start));
    const fields = { ...submission.fields, email, inquiry: when };
    const raw = buildMessage(fields, { from: FROM, to: env.MAIL_TO, subject: `Bokning ${when} från ${fields.name}`, id: crypto.randomUUID(), date: now });
    await send(FROM, env.MAIL_TO, raw);
  } catch (error) {
    console.error('booking mail failed', error);
  }
  return answer('booked', 200);
}
