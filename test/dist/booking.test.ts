import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { site } from '../../src/content/site';
import { DIST, readDist, readText } from './helpers';

describe('booking pages', () => {
  it.each(['/sv/boka/', '/en/book/'])('%s holds the booking widget and the address without JS', (path) => {
    const doc = readDist(path);
    expect(doc.querySelector('[data-booking]')).not.toBeNull();
    expect(doc.querySelector(`.nojs a[href="mailto:${site.email}"]`)).not.toBeNull();
  });

  it('links every button to the page for its locale', () => {
    expect(readDist('/').querySelector('.hero a.btn')!.getAttribute('href')).toBe('/sv/boka/');
    expect(readDist('/en/').querySelector('.hero a.btn')!.getAttribute('href')).toBe('/en/book/');
  });

  it('loads the Turnstile script only from the booking script, never in the HTML', () => {
    expect(readText('index.html')).not.toContain('challenges.cloudflare.com');
  });

  it('has no link to the old Google page in any file', () => {
    const old = 'calendar.app.google';
    const files = readdirSync(DIST, { recursive: true, encoding: 'utf8' }).map((f) => join(DIST, f)).filter((f) => statSync(f).isFile());
    expect(files.filter((f) => readFileSync(f).includes(old))).toEqual([]);
  });
});
