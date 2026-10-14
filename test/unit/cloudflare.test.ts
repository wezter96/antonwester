import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { LEGACY_REDIRECTS } from '../../src/content/routes';

// Cloudflare serves real 301s from public/_redirects; they must match the route registry.
describe('cloudflare', () => {
  const rules = existsSync('public/_redirects')
    ? readFileSync('public/_redirects', 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')).map((l) => l.split(/\s+/))
    : [];
  it('redirects every legacy URL with and without its trailing slash', () => {
    for (const [from, to] of Object.entries(LEGACY_REDIRECTS)) {
      expect(rules).toContainEqual([from, to, '301']);
      expect(rules).toContainEqual([from.replace(/\/$/, ''), to, '301']);
    }
    expect(rules).toHaveLength(Object.keys(LEGACY_REDIRECTS).length * 2);
  });
  it('caches hashed assets for a year', () => {
    const headers = existsSync('public/_headers') ? readFileSync('public/_headers', 'utf8') : '';
    expect(headers).toMatch(/\/_astro\/\*\n\s+Cache-Control: public, max-age=31536000, immutable/);
  });
});
