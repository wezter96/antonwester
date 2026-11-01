import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { book, slots } from '../../worker/booking.js';

const NOW = new Date('2026-11-02T10:00:00.000Z'); // Monday
const START = '2026-11-04T08:00:00.000Z'; // Wednesday 09:00 Stockholm
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });

type Opts = { siteverify?: Response; existingRaw?: unknown[]; busy?: { start: string; end: string }[]; existing?: string[]; turnstile?: boolean; google?: 'down'; turnstileDown?: boolean };
let calls: { url: string; init: RequestInit | undefined }[];

function setup(o: Opts = {}) {
  calls = [];
  vi.stubGlobal('fetch', vi.fn(async (url: string, init?: RequestInit) => {
    calls.push({ url, init });
    if (url.includes('turnstile')) {
      if (o.turnstileDown) throw new Error('net');
      return o.siteverify ?? json({ success: o.turnstile ?? true });
    }
    if (o.google === 'down') throw new Error('net');
    if (url.includes('oauth2')) return json({ access_token: 'tok' });
    if (url.includes('freeBusy')) return json({ calendars: { primary: { busy: o.busy ?? [] } } });
    if (init?.method === 'POST') return json({});
    if (o.existingRaw) return json({ items: o.existingRaw });
    return json({ items: (o.existing ?? []).map((email) => ({ attendees: [{ email }] })) });
  }));
}
const writes = () => calls.filter((c) => c.url.includes('/events') && c.init?.method === 'POST');

const env = (limited = false) => ({
  BOOK_LIMIT: { limit: async () => ({ success: !limited }) },
  SLOTS_LIMIT: { limit: async () => ({ success: !limited }) },
  TURNSTILE_SECRET: 's',
  OWNER_EMAIL: 'Owner@gmail.com',
  MAIL_TO: 'anton@example.se',
  GOOGLE_CLIENT_ID: 'i', GOOGLE_CLIENT_SECRET: 's', GOOGLE_REFRESH_TOKEN: 'r',
});

function post(fields: Record<string, string> = {}, headers: Record<string, string> = {}) {
  const form = new FormData();
  const all = { start: START, locale: 'en', name: 'Ada', email: 'ada@x.se', message: 'Hi', 'cf-turnstile-response': 'ok', ...fields };
  for (const [k, v] of Object.entries(all)) form.set(k, v);
  return new Request('https://antonwester.se/api/booking', { method: 'POST', body: form, headers });
}
const sent: string[] = [];
const send = async (_f: string, _t: string, raw: string) => { sent.push(raw); };
const run = async (req: Request, e = env(), mail = send) => {
  const res = await book(req, e, mail);
  return { status: res.status, result: (await res.json()).result };
};

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(NOW);
  vi.spyOn(console, 'error').mockImplementation(() => {});
  sent.length = 0;
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('book', () => {
  it('books a free slot, creates the event and mails Anton', async () => {
    setup();
    expect(await run(post())).toEqual({ status: 200, result: 'booked' });
    expect(writes()).toHaveLength(1);
    expect(sent).toHaveLength(1);
    expect(sent[0]).toContain('Reply-To: ada@x.se');
    expect(Buffer.from(sent[0].split('\r\n\r\n')[1].replace(/\r\n/g, ''), 'base64').toString()).toContain('Hi');
  });

  it('403 for a foreign Origin', async () => {
    setup();
    expect(await run(post({}, { Origin: 'https://evil.example' }))).toEqual({ status: 403, result: 'forbidden' });
    expect(writes()).toHaveLength(0);
  });

  it('429 when limited', async () => {
    setup();
    expect(await run(post(), env(true))).toEqual({ status: 429, result: 'limited' });
    expect(writes()).toHaveLength(0);
  });

  it('400 for a bad submission', async () => {
    setup();
    expect(await run(post({ email: 'nope' }))).toEqual({ status: 400, result: 'invalid' });
    expect(writes()).toHaveLength(0);
  });

  it('honeypot answers booked and writes nothing', async () => {
    setup();
    expect(await run(post({ _honey: 'x' }))).toEqual({ status: 200, result: 'booked' });
    expect(calls).toHaveLength(0);
    expect(sent).toHaveLength(0);
  });

  it('failed Turnstile gives invalid', async () => {
    setup({ turnstile: false });
    expect(await run(post())).toEqual({ status: 400, result: 'invalid' });
    expect(writes()).toHaveLength(0);
  });

  it('Turnstile network error gives unavailable', async () => {
    setup({ turnstileDown: true });
    expect(await run(post())).toEqual({ status: 502, result: 'unavailable' });
    expect(console.error).toHaveBeenCalled();
  });

  it.each([
    ['off the grid', '2026-11-04T08:15:00.000Z'],
    ['weekend', '2026-11-07T08:00:00.000Z'],
    ['past', '2026-10-01T08:00:00.000Z'],
    ['with an offset', '2026-11-04T09:00:00.000+01:00'],
    ['not a date', 'banana'],
    ['too soon', '2026-11-03T08:00:00.000Z'],
  ])('forged start (%s) gives 400 and no write', async (_n, start) => {
    setup();
    expect(await run(post({ start }))).toEqual({ status: 400, result: 'invalid' });
    expect(writes()).toHaveLength(0);
  });

  it('10 upcoming bookings gives full', async () => {
    setup({ existing: Array.from({ length: 10 }, (_, i) => `u${i}@x.se`) });
    expect(await run(post())).toEqual({ status: 409, result: 'full' });
    expect(writes()).toHaveLength(0);
  });

  it('same email in another case gives full', async () => {
    setup({ existing: ['a@x.se'] });
    expect(await run(post({ email: 'A@X.se' }))).toEqual({ status: 409, result: 'full' });
    expect(writes()).toHaveLength(0);
  });

  it('busy on the recheck gives taken', async () => {
    setup({ busy: [{ start: START, end: '2026-11-04T08:30:00.000Z' }] });
    expect(await run(post())).toEqual({ status: 409, result: 'taken' });
    expect(writes()).toHaveLength(0);
  });

  it('Google down gives unavailable and is logged', async () => {
    setup({ google: 'down' });
    expect(await run(post())).toEqual({ status: 502, result: 'unavailable' });
    expect(console.error).toHaveBeenCalled();
  });

  it('a mail failure still gives booked', async () => {
    setup();
    const bad = async () => { throw new Error('mail'); };
    expect(await run(post(), env(), bad)).toEqual({ status: 200, result: 'booked' });
    expect(writes()).toHaveLength(1);
    expect(console.error).toHaveBeenCalled();
  });

  it('an unknown locale is treated as sv', async () => {
    setup();
    await run(post({ locale: 'fr' }));
    expect(JSON.parse(writes()[0].init!.body as string).summary).toBe('Samtal med Anton Wester');
  });
});

describe('fix round 1', () => {
  it('events with no guest count toward the cap', async () => {
    setup({ existingRaw: Array.from({ length: 10 }, () => ({})) });
    expect(await run(post())).toEqual({ status: 409, result: 'full' });
    expect(writes()).toHaveLength(0);
  });

  it.each([['owner@GMAIL.com'], ['Anton@Example.se']])('refuses the owner address %s before any Google call', async (email) => {
    setup();
    expect(await run(post({ email }))).toEqual({ status: 400, result: 'invalid' });
    expect(calls.filter((c) => !c.url.includes('turnstile'))).toHaveLength(0);
  });

  it('still checks MAIL_TO when OWNER_EMAIL is missing', async () => {
    setup();
    const e = { ...env(), OWNER_EMAIL: undefined };
    expect(await run(post({ email: 'ANTON@example.se' }), e as never)).toEqual({ status: 400, result: 'invalid' });
  });

  it('siteverify non-2xx gives unavailable and is logged', async () => {
    setup({ siteverify: json({}, 500) });
    expect(await run(post())).toEqual({ status: 502, result: 'unavailable' });
    expect(console.error).toHaveBeenCalled();
  });

  it.each(['invalid-input-secret', 'missing-input-secret'])('%s gives unavailable and a clear log', async (code) => {
    setup({ siteverify: json({ success: false, 'error-codes': [code] }) });
    expect(await run(post())).toEqual({ status: 502, result: 'unavailable' });
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('TURNSTILE_SECRET'));
  });

  it('an unset TURNSTILE_SECRET gives unavailable without calling siteverify', async () => {
    setup();
    expect(await run(post(), { ...env(), TURNSTILE_SECRET: undefined } as never)).toEqual({ status: 502, result: 'unavailable' });
    expect(calls).toHaveLength(0);
    expect(console.error).toHaveBeenCalled();
  });

  it('a visitor failure still gives invalid', async () => {
    setup({ siteverify: json({ success: false, 'error-codes': ['timeout-or-duplicate'] }) });
    expect(await run(post())).toEqual({ status: 400, result: 'invalid' });
  });
});

describe('slots', () => {
  const get = (q: string, e = env()) => slots(new Request(`https://antonwester.se/api/booking/slots${q}`), e);

  it('400 for week=garbage and a non-Monday', async () => {
    setup();
    expect((await get('?week=garbage')).status).toBe(400);
    expect((await get('?week=2026-11-03')).status).toBe(400);
    expect((await get('')).status).toBe(400);
    expect(calls).toHaveLength(0);
  });

  it('returns slots with no-store', async () => {
    setup();
    const res = await get('?week=2026-11-02');
    expect(res.status).toBe(200);
    expect(res.headers.get('Cache-Control')).toBe('no-store');
    expect((await res.json()).slots.length).toBeGreaterThan(0);
  });

  it('past and far weeks give an empty list without calling Google', async () => {
    setup();
    for (const week of ['2026-10-19', '2026-12-14']) {
      expect(await (await get(`?week=${week}`)).json()).toEqual({ slots: [] });
    }
    expect(calls).toHaveLength(0);
  });

  it('429 when limited', async () => {
    setup();
    expect((await get('?week=2026-11-02', env(true))).status).toBe(429);
  });

  it('502 when Google fails', async () => {
    setup({ google: 'down' });
    const res = await get('?week=2026-11-02');
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ error: 'unavailable' });
  });
});
