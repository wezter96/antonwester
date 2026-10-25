// antonwester.se: static assets, POST /api/contact, which mails the contact form to MAIL_TO through Cloudflare Email Routing,
// and POST /api/chat, the site chat.
import { EmailMessage } from 'cloudflare:email';
import { respond } from './chat.js';
import { buildMessage, readSubmission } from './mail.js';

const FROM = 'form@antonwester.se';
const ORIGIN = 'https://antonwester.se';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/chat') return chat(request, env);
    if (url.pathname !== '/api/contact') return env.ASSETS.fetch(request);
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });

    const wantsJson = (request.headers.get('Accept') ?? '').includes('application/json');
    // without JS the browser shows this answer itself, so it is a small page in both languages
    const page = (ok, status) => new Response(
      `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>antonwester.se</title><p>${ok
        ? 'Tack, meddelandet är skickat. / Thanks, your message is on its way.'
        : 'Det gick inte att skicka. Mejla contact@antonwester.se. / It could not be sent. Email contact@antonwester.se.'}</p><p><a href="/">antonwester.se</a></p>`,
      { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
    );
    const reply = (ok, status = ok ? 200 : 400) => (wantsJson ? Response.json({ success: ok }, { status }) : page(ok, status));

    const origin = request.headers.get('Origin');
    if (origin && origin !== ORIGIN) return reply(false, 403);
    const { success } = await env.LIMIT.limit({ key: request.headers.get('CF-Connecting-IP') ?? 'unknown' });
    if (!success) return reply(false, 429);

    let form;
    try { form = await request.formData(); } catch { return reply(false); }
    const result = readSubmission(form);
    if (result.error) return reply(false);
    // a filled honeypot is a bot; it gets the same answer as a person so it learns nothing
    if (result.spam) return reply(true);

    const subject = `${result.fields.inquiry || 'Förfrågan'} från ${result.fields.name}`;
    const raw = buildMessage(result.fields, { from: FROM, to: env.MAIL_TO, subject, id: crypto.randomUUID(), date: new Date() });
    try {
      await env.MAIL.send(new EmailMessage(FROM, env.MAIL_TO, raw));
    } catch (error) {
      console.error('contact mail failed', error);
      return reply(false, 502);
    }
    return reply(true);
  },
};

/** POST /api/chat { message, locale, asked } → one chat turn; see worker/chat.js. */
async function chat(request, env) {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) return Response.json({ kind: 'contact' }, { status: 403 });
  const { success } = await env.CHAT_LIMIT.limit({ key: request.headers.get('CF-Connecting-IP') ?? 'unknown' });
  if (!success) return Response.json({ kind: 'contact' }, { status: 429 });

  let body;
  try {
    const raw = await request.text();
    if (raw.length > 4000) return Response.json({ kind: 'contact' }, { status: 413 });
    body = JSON.parse(raw);
  } catch { return Response.json({ kind: 'contact' }, { status: 400 }); }
  return Response.json(await respond(body, env), { headers: { 'Cache-Control': 'no-store' } });
}
