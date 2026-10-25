import { describe, expect, it } from 'vitest';
import { buildMessage, readSubmission } from '../../worker/mail.js';

const form = (fields: Record<string, string>) => {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
};
const valid = { name: 'Åsa Öberg', email: 'asa@example.se', message: 'Hej!\nVi vill automatisera fakturor.', inquiry: 'AI-utveckling' };

describe('contact mail', () => {
  it('reads a valid submission', () => {
    const r = readSubmission(form(valid));
    expect(r.error).toBeUndefined();
    expect(r.spam).toBe(false);
    expect(r.fields?.name).toBe('Åsa Öberg');
  });

  it('rejects a missing message, a bad address and a header injection', () => {
    expect(readSubmission(form({ ...valid, message: ' ' })).error).toBeDefined();
    expect(readSubmission(form({ ...valid, email: 'nope' })).error).toBeDefined();
    expect(readSubmission(form({ ...valid, email: 'a@b.se\r\nBcc: x@y.se' })).error).toBeDefined();
    expect(readSubmission(form({ ...valid, message: 'x'.repeat(5001) })).error).toBeDefined();
  });

  it('flags a filled honeypot as spam', () => {
    expect(readSubmission(form({ ...valid, _honey: 'bot' })).spam).toBe(true);
  });

  it('builds a UTF-8 message with Reply-To set to the sender', () => {
    const { fields } = readSubmission(form(valid));
    const raw = buildMessage(fields!, { from: 'form@antonwester.se', to: 'me@example.com', subject: 'Förfrågan från Åsa', id: 'abc', date: new Date(0) });
    const [head, body] = raw.split('\r\n\r\n');
    expect(head).toContain('Reply-To: asa@example.se');
    expect(head).toContain('To: me@example.com');
    const subject = head!.match(/Subject: =\?UTF-8\?B\?(.+)\?=/)![1]!;
    expect(new TextDecoder().decode(Uint8Array.from(atob(subject), (c) => c.charCodeAt(0)))).toBe('Förfrågan från Åsa');
    const text = new TextDecoder().decode(Uint8Array.from(atob(body!.replace(/\r\n/g, '')), (c) => c.charCodeAt(0)));
    expect(text).toContain('Namn: Åsa Öberg');
    expect(text).toContain('Meddelande:\nHej!\nVi vill automatisera fakturor.');
    expect(body!.split('\r\n').every((line) => line.length <= 76)).toBe(true);
  });
});
