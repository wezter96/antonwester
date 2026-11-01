// Usage: GOOGLE_CLIENT_ID=... GOOGLE_CLIENT_SECRET=... npx tsx scripts/google-token.ts
import { spawn } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { createServer } from 'node:http';

const { GOOGLE_CLIENT_ID: clientId, GOOGLE_CLIENT_SECRET: clientSecret } = process.env;
if (!clientId || !clientSecret) {
  console.error('Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in the environment.');
  process.exit(1);
}

const PORT = 53682;
const redirect = `http://127.0.0.1:${PORT}`;
const state = randomBytes(16).toString('hex');

const consent = new URL('https://accounts.google.com/o/oauth2/v2/auth');
consent.search = new URLSearchParams({
  client_id: clientId,
  redirect_uri: redirect,
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
  state,
  scope: 'https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.freebusy',
}).toString();

async function exchange(code: string): Promise<string> {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: new URLSearchParams({ code, client_id: clientId!, client_secret: clientSecret!, redirect_uri: redirect, grant_type: 'authorization_code' }),
  });
  const json = (await res.json()) as { refresh_token?: string; error?: string; error_description?: string };
  if (!res.ok) throw new Error(`Token exchange failed: ${json.error ?? res.status} ${json.error_description ?? ''}`.trim());
  if (!json.refresh_token) throw new Error('Google sent no refresh_token. Revoke the app at myaccount.google.com/permissions and run again.');
  return json.refresh_token;
}

// The token goes to wrangler on stdin only, never to our output.
const store = (token: string) =>
  new Promise<void>((resolve, reject) => {
    const p = spawn('npx', ['wrangler', 'secret', 'put', 'GOOGLE_REFRESH_TOKEN'], { stdio: ['pipe', 'inherit', 'inherit'] });
    p.on('error', reject);
    p.on('close', (c) => (c === 0 ? resolve() : reject(new Error(`wrangler exited with code ${c}`))));
    p.stdin.end(token);
  });

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', redirect);
  if (url.pathname !== '/') {
    res.writeHead(404).end();
    return;
  }
  const reply = (msg: string) => res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' }).end(msg);
  try {
    if (url.searchParams.get('state') !== state) throw new Error('State mismatch.');
    const err = url.searchParams.get('error');
    if (err) throw new Error(`Google returned an error: ${err}`);
    const code = url.searchParams.get('code');
    if (!code) throw new Error('No code in the callback.');
    await store(await exchange(code));
    console.log('Done');
    reply('Done. You can close this tab.');
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(`Failed: ${msg}`);
    process.exitCode = 1;
    reply(`Failed: ${msg}`);
  }
  server.close();
});

server.listen(PORT, '127.0.0.1', () => console.log(`Open this URL in your browser:\n\n${consent}\n`));
