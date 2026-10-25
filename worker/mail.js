// Turns a contact form submission into a plain-text email, or says why it cannot.

const LIMITS = { name: 200, email: 254, company: 200, inquiry: 200, estimate: 4000, message: 5000 };
const LABELS = { name: 'Namn', email: 'E-post', company: 'Företag', inquiry: 'Gäller', estimate: 'Uppskattning', message: 'Meddelande' };

/** @param {FormData} form */
export function readSubmission(form) {
  /** @type {Record<string, string>} */
  const fields = {};
  for (const key of Object.keys(LIMITS)) {
    const value = String(form.get(key) ?? '').trim();
    if (value.length > LIMITS[key]) return { error: `${key} is too long` };
    fields[key] = value;
  }
  if (!fields.name || !fields.message) return { error: 'name and message are required' };
  // the address goes into Reply-To, so a line break would let a sender add headers
  if (!/^[^\s@<>,;"]+@[^\s@<>,;"]+\.[^\s@<>,;"]+$/.test(fields.email)) return { error: 'email is not valid' };
  return { fields, spam: String(form.get('_honey') ?? '') !== '' };
}

/** UTF-8 to base64, without Buffer (the Worker runs without nodejs_compat). */
function base64(text) {
  let binary = '';
  for (const byte of new TextEncoder().encode(text)) binary += String.fromCharCode(byte);
  return btoa(binary);
}

/**
 * @param {Record<string, string>} fields
 * @param {{ from: string; to: string; subject: string; id: string; date: Date }} envelope
 */
export function buildMessage(fields, { from, to, subject, id, date }) {
  const body = Object.entries(LABELS)
    .filter(([key]) => fields[key])
    .map(([key, label]) => (key === 'message' || key === 'estimate' ? `${label}:\n${fields[key]}` : `${label}: ${fields[key]}`))
    .join('\n\n');
  return [
    `From: antonwester.se <${from}>`,
    `To: ${to}`,
    `Reply-To: ${fields.email}`,
    `Subject: =?UTF-8?B?${base64(subject)}?=`,
    `Message-ID: <${id}@antonwester.se>`,
    `Date: ${date.toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    'Content-Transfer-Encoding: base64',
    '',
    base64(body).replace(/.{76}/g, '$&\r\n'),
  ].join('\r\n');
}
