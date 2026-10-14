import { describe, expect, it } from 'vitest';
import {
  CITY_IDS, LEGACY_REDIRECTS, LOCALES, SITE_URL, allPages, alternatesFor, astroRedirects,
  ogPath, otherLocale, pageKey, pathFor, slugPages, urlFor,
} from '../../src/content/routes';

describe('route registry', () => {
  it('puts the Swedish home at / and the English at /en/', () => {
    expect(pathFor({ kind: 'home' }, 'sv')).toBe('/');
    expect(pathFor({ kind: 'home' }, 'en')).toBe('/en/');
  });

  it('keeps existing city URLs', () => {
    for (const id of CITY_IDS) {
      expect(pathFor({ kind: 'city', id }, 'sv')).toBe(`/sv/${id}/`);
      expect(pathFor({ kind: 'city', id }, 'en')).toBe(`/en/${id}/`);
    }
  });

  it('has 34 unique canonical URLs, all ending in a slash', () => {
    const urls = allPages().flatMap((p) => LOCALES.map((l) => urlFor(p, l)));
    expect(urls).toHaveLength(34);
    expect(new Set(urls).size).toBe(34);
    for (const u of urls) {
      expect(u.startsWith(`${SITE_URL}/`)).toBe(true);
      expect(u.endsWith('/')).toBe(true);
    }
  });

  it('gives every page reciprocal alternates with x-default in English', () => {
    for (const page of allPages()) {
      const alt = alternatesFor(page);
      expect(alt).toEqual([
        { hreflang: 'sv', href: urlFor(page, 'sv') },
        { hreflang: 'en', href: urlFor(page, 'en') },
        { hreflang: 'x-default', href: urlFor(page, 'en') },
      ]);
    }
  });

  it('never lets a service slug collide with a city slug', () => {
    for (const l of LOCALES) {
      const slugs = slugPages(l).map((s) => s.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
      for (const s of slugs) expect(s).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('redirects legacy URLs to canonical ones and never redirects a canonical path', () => {
    expect(LEGACY_REDIRECTS['/sv/']).toBe('/');
    expect(LEGACY_REDIRECTS['/partille/']).toBe('/sv/partille/');
    const canonical = new Set(allPages().flatMap((p) => LOCALES.map((l) => pathFor(p, l))));
    for (const from of Object.keys(LEGACY_REDIRECTS)) expect(canonical.has(from)).toBe(false);
    expect(astroRedirects()['/sv']).toBe('/');
    expect(astroRedirects()['/varberg']).toBe('/sv/varberg/');
  });

  it('switches language to the twin page', () => {
    const page = { kind: 'case', id: 'wez' } as const;
    expect(pathFor(page, otherLocale('sv'))).toBe('/en/case/wez/');
  });

  it('names one OG image per page and locale', () => {
    expect(ogPath({ kind: 'home' }, 'sv')).toBe('/og/home-sv.png');
    expect(ogPath({ kind: 'service', id: 'cto' }, 'en')).toBe('/og/service-cto-en.png');
    expect(pageKey({ kind: 'city', id: 'ale' })).toBe('city-ale');
  });
});
