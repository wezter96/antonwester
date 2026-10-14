import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { CLIENTS } from '../../src/content/clients';
import { allPages, LOCALES, ogPath, urlFor, SITE_URL } from '../../src/content/routes';
import { readText } from './helpers';

describe('sitemap', () => {
  const xml = readText('sitemap.xml');
  it('lists exactly the canonical URLs', () => {
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).sort();
    const expected = allPages().flatMap((p) => LOCALES.map((l) => urlFor(p, l))).sort();
    expect(locs).toEqual(expected);
    expect(xml).not.toContain(`${SITE_URL}/sv/</loc>`);
  });
  it('includes hreflang alternates for each URL', () => {
    expect(xml.match(/xhtml:link/g)!.length).toBe(38 * 3);
  });
});

describe('robots.txt', () => {
  it('allows crawling and points at the sitemap', () => {
    const t = readText('robots.txt');
    expect(t).toContain('User-agent: *');
    expect(t).toContain('Allow: /');
    expect(t).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
    expect(t).not.toMatch(/Disallow: \/\s*$/m);
  });
});

describe('llms.txt', () => {
  it('describes the AI consulting offer and links both homes, services and cases', () => {
    const t = readText('llms.txt');
    expect(t).toMatch(/^# Anton Wester/);
    expect(t).toContain('AI-konsult i Göteborg');
    expect(t).toContain(`${SITE_URL}/`);
    expect(t).toContain(`${SITE_URL}/en/`);
    expect(t).toContain(`${SITE_URL}/sv/ai-kartlaggning/`);
    expect(t).toContain(`${SITE_URL}/en/case/openaudit/`);
  });
});

describe('assets', () => {
  it('ships every client logo file', () => {
    for (const c of CLIENTS) if ('file' in c) expect(existsSync(join('dist', c.file))).toBe(true);
  });
  it('ships an OG image for every page and locale', () => {
    for (const p of allPages()) for (const l of LOCALES) expect(existsSync(join('dist', ogPath(p, l)))).toBe(true);
  });
  it('ships the monogram and favicon', () => {
    expect(existsSync('dist/monogram.svg')).toBe(true);
    expect(existsSync('dist/favicon.svg')).toBe(true);
  });
});
