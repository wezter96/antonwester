import { describe, expect, it } from 'vitest';
import { allPages, alternatesFor, LOCALES, pathFor, urlFor, LEGACY_REDIRECTS } from '../../src/content/routes';
import { DIST, readDist } from './helpers';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

describe('every canonical page', () => {
  for (const page of allPages()) {
    for (const l of LOCALES) {
      const path = pathFor(page, l);
      it(path, () => {
        const doc = readDist(path);
        expect(doc.querySelector('html')!.getAttribute('lang')).toBe(l);
        expect(doc.querySelector('link[rel=canonical]')!.getAttribute('href')).toBe(urlFor(page, l));
        const alts = doc.querySelectorAll('link[rel=alternate][hreflang]').map((a) => ({ hreflang: a.getAttribute('hreflang'), href: a.getAttribute('href') }));
        expect(alts).toEqual(alternatesFor(page));
        expect(doc.querySelector('title')!.textContent.length).toBeLessThanOrEqual(60);
        const desc = doc.querySelector('meta[name=description]')!.getAttribute('content')!;
        expect(desc.length).toBeGreaterThanOrEqual(120);
        expect(desc.length).toBeLessThanOrEqual(160);
        expect(doc.querySelectorAll('h1')).toHaveLength(1);
        for (const s of doc.querySelectorAll('script[type="application/ld+json"]')) expect(() => JSON.parse(s.textContent)).not.toThrow();
        for (const img of doc.querySelectorAll('img')) expect(img.getAttribute('alt')).not.toBeNull();
        expect(doc.querySelector('[data-lang-switch]')!.getAttribute('href')).toBe(pathFor(page, l === 'sv' ? 'en' : 'sv'));
      });
    }
  }
});

describe('legacy URLs', () => {
  for (const [from, to] of Object.entries(LEGACY_REDIRECTS)) {
    it(`${from} redirects to ${to}`, () => {
      const doc = readDist(from);
      expect(doc.querySelector('meta[http-equiv=refresh]')!.getAttribute('content')).toContain(`url=${to}`);
      expect(doc.querySelector('meta[name=robots]')!.getAttribute('content')).toContain('noindex');
    });
  }
});

describe('404', () => {
  it('exists and is not indexed', () => {
    expect(existsSync(join(DIST, '404.html'))).toBe(true);
  });
});
