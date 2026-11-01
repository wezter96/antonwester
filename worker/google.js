// Google Calendar over plain fetch (the Worker runs without nodejs_compat, so no SDK).

const API = 'https://www.googleapis.com';
const MEETING_MS = 30 * 60 * 1000;
const TEXT = {
  sv: { summary: 'Samtal med Anton Wester', description: 'Bokat via antonwester.se. Svara på inbjudan om tiden inte passar.' },
  en: { summary: 'Call with Anton Wester', description: 'Booked via antonwester.se. Reply to the invite if the time does not work.' },
};

/** Throws with the status in the message; never includes headers or bodies that could hold a token. */
async function ok(res, what) {
  if (!res.ok) throw new Error(`${what} failed: ${res.status}`);
  return res.json();
}

/** @param {{ GOOGLE_CLIENT_ID: string; GOOGLE_CLIENT_SECRET: string; GOOGLE_REFRESH_TOKEN: string }} env */
export async function accessToken(env) {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      refresh_token: env.GOOGLE_REFRESH_TOKEN,
    }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    if (body.error === 'invalid_grant') console.error('google refresh token is dead');
    throw new Error(`google token failed: ${res.status}`);
  }
  return (await res.json()).access_token;
}

async function call(env, path, init = {}) {
  const token = await accessToken(env);
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  });
  return ok(res, `google ${path.split('?')[0]}`);
}

export async function busyTimes(env, fromIso, toIso) {
  const data = await call(env, '/calendar/v3/freeBusy', {
    method: 'POST',
    body: JSON.stringify({ timeMin: fromIso, timeMax: toIso, items: [{ id: 'primary' }] }),
  });
  const primary = data.calendars?.primary;
  // an empty list would offer times when Anton may be busy, so a bad reply must fail loudly
  if (primary?.errors || !Array.isArray(primary?.busy)) throw new Error('google freeBusy gave no usable answer');
  return primary.busy;
}

export async function siteBookings(env, nowIso) {
  const query = new URLSearchParams({
    privateExtendedProperty: 'source=site',
    timeMin: nowIso,
    singleEvents: 'true',
    maxResults: '50',
  });
  const data = await call(env, `/calendar/v3/calendars/primary/events?${query}`);
  return (data.items ?? [])
    .map((event) => event.attendees?.find((a) => !a.self)?.email?.toLowerCase())
    .filter(Boolean);
}

export async function createBooking(env, { start, email, locale }) {
  const text = TEXT[locale] ?? TEXT.en;
  const from = new Date(start);
  await call(env, '/calendar/v3/calendars/primary/events?sendUpdates=all&conferenceDataVersion=1', {
    method: 'POST',
    body: JSON.stringify({
      summary: text.summary,
      description: text.description,
      start: { dateTime: from.toISOString(), timeZone: 'UTC' },
      end: { dateTime: new Date(from.getTime() + MEETING_MS).toISOString(), timeZone: 'UTC' },
      attendees: [{ email }],
      extendedProperties: { private: { source: 'site' } },
      conferenceData: {
        createRequest: { requestId: crypto.randomUUID(), conferenceSolutionKey: { type: 'hangoutsMeet' } },
      },
    }),
  });
}
