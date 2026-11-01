import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { accessToken, busyTimes, createBooking, siteBookings } from '../../worker/google.js';

const env = { GOOGLE_CLIENT_ID: 'id', GOOGLE_CLIENT_SECRET: 'secret', GOOGLE_REFRESH_TOKEN: 'refresh' };
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });

/** Answers the token call, then each queued reply in turn. */
function stub(...replies: Response[]) {
  const fetchMock = vi.fn();
  fetchMock.mockResolvedValueOnce(json({ access_token: 'tok' }));
  for (const reply of replies) fetchMock.mockResolvedValueOnce(reply);
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

beforeEach(() => vi.spyOn(console, 'error').mockImplementation(() => {}));
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('accessToken', () => {
  it('posts a refresh_token grant', async () => {
    const f = stub();
    expect(await accessToken(env)).toBe('tok');
    expect(f.mock.calls[0][0]).toBe('https://oauth2.googleapis.com/token');
    const body = new URLSearchParams(f.mock.calls[0][1].body);
    expect(body.get('grant_type')).toBe('refresh_token');
    expect(body.get('refresh_token')).toBe('refresh');
  });

  it('logs a clear error on invalid_grant, without the token', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(json({ error: 'invalid_grant' }, 400)));
    await expect(accessToken(env)).rejects.toThrow('400');
    expect(console.error).toHaveBeenCalledWith('google refresh token is dead');
  });
});

describe('busyTimes', () => {
  it('returns calendars.primary.busy', async () => {
    const busy = [{ start: 'a', end: 'b' }];
    const f = stub(json({ calendars: { primary: { busy } } }));
    expect(await busyTimes(env, '2026-11-02T00:00:00Z', '2026-11-09T00:00:00Z')).toEqual(busy);
    const [url, init] = f.mock.calls[1];
    expect(url).toBe('https://www.googleapis.com/calendar/v3/freeBusy');
    expect(init.headers.Authorization).toBe('Bearer tok');
    expect(JSON.parse(init.body).items).toEqual([{ id: 'primary' }]);
  });

  it('throws when the calendar reports errors, instead of returning no busy times', async () => {
    stub(json({ calendars: { primary: { errors: [{ reason: 'notFound' }], busy: [] } } }));
    await expect(busyTimes(env, 'a', 'b')).rejects.toThrow();
  });

  it('throws when there is no busy array', async () => {
    stub(json({ calendars: { primary: {} } }));
    await expect(busyTimes(env, 'a', 'b')).rejects.toThrow();
  });

  it('throws on a 500 with the status', async () => {
    stub(json({}, 500));
    await expect(busyTimes(env, 'a', 'b')).rejects.toThrow('500');
  });
});

describe('siteBookings', () => {
  it('lowercases one attendee email per event', async () => {
    const f = stub(
      json({
        items: [
          { attendees: [{ email: 'Self@x.se', self: true }, { email: 'Guest@Example.COM' }] },
          { attendees: [{ email: 'Other@Example.com' }] },
        ],
      }),
    );
    expect(await siteBookings(env, '2026-11-01T00:00:00Z')).toEqual(['guest@example.com', 'other@example.com']);
    const url = new URL(f.mock.calls[1][0]);
    expect(url.pathname).toBe('/calendar/v3/calendars/primary/events');
    expect(url.searchParams.get('privateExtendedProperty')).toBe('source=site');
    expect(url.searchParams.get('singleEvents')).toBe('true');
    expect(url.searchParams.get('maxResults')).toBe('50');
    expect(url.searchParams.get('timeMin')).toBe('2026-11-01T00:00:00Z');
  });
});

describe('createBooking', () => {
  it('posts a tagged event with Meet and sends invites', async () => {
    const f = stub(json({}));
    await createBooking(env, { start: '2026-11-02T08:00:00.000Z', email: 'a@b.se', locale: 'en' });
    const [url, init] = f.mock.calls[1];
    const u = new URL(url);
    expect(u.searchParams.get('sendUpdates')).toBe('all');
    expect(u.searchParams.get('conferenceDataVersion')).toBe('1');
    const body = JSON.parse(init.body);
    expect(body.extendedProperties.private.source).toBe('site');
    expect(body.attendees).toEqual([{ email: 'a@b.se' }]);
    expect(body.start.dateTime).toBe('2026-11-02T08:00:00.000Z');
    expect(body.end.dateTime).toBe('2026-11-02T08:30:00.000Z');
    expect(body.conferenceData.createRequest.conferenceSolutionKey.type).toBe('hangoutsMeet');
    expect(body.conferenceData.createRequest.requestId).toBeTruthy();
    expect(body.summary).not.toContain('a@b.se');
  });

  it('uses a Swedish summary for sv', async () => {
    const f = stub(json({}));
    await createBooking(env, { start: '2026-11-02T08:00:00.000Z', email: 'a@b.se', locale: 'sv' });
    expect(JSON.parse(f.mock.calls[1][1].body).summary).toMatch(/samtal/i);
  });

  it('throws on a 500 with the status', async () => {
    stub(json({}, 500));
    await expect(createBooking(env, { start: '2026-11-02T08:00:00.000Z', email: 'a@b.se', locale: 'en' })).rejects.toThrow('500');
  });
});
