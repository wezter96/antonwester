import { describe, expect, it } from 'vitest';
import { allPages, LOCALES, urlFor } from '../../src/content/routes';
import { headForCase, headForCity, headForHome, headForService, personLd, professionalServiceLd, serviceLd } from '../../src/lib/seo';
import type { PageRef } from '../../src/content/routes';

const headFor = (p: PageRef, l: 'sv' | 'en') =>
  p.kind === 'home' ? headForHome(l) : p.kind === 'service' ? headForService(p.id, l) : p.kind === 'case' ? headForCase(p.id, l) : headForCity(p.id, l);

describe('heads', () => {
  for (const page of allPages()) {
    for (const l of LOCALES) {
      it(`${JSON.stringify(page)} ${l}`, () => {
        const h = headFor(page, l);
        expect(h.canonical).toBe(urlFor(page, l));
        expect(h.title.length).toBeLessThanOrEqual(60);
        expect(h.description.length).toBeGreaterThanOrEqual(120);
        expect(h.description.length).toBeLessThanOrEqual(160);
        expect(h.ogImage).toMatch(/^https:\/\/antonwester\.se\/og\/.+\.png$/);
        const types = h.jsonLd.map((x) => x['@type']);
        expect(types).toContain('Organization');
        expect(types).toContain('Person');
        expect(types).toContain('WebPage');
        expect(types).toContain('BreadcrumbList');
        for (const x of h.jsonLd) expect(x['@context']).toBe('https://schema.org');
        expect(() => JSON.parse(JSON.stringify(h.jsonLd))).not.toThrow();
      });
    }
  }

  it('adds FAQPage where FAQs render and ProfessionalService on home and cities', () => {
    expect(headForHome('sv').jsonLd.map((x) => x['@type'])).toEqual(expect.arrayContaining(['FAQPage', 'ProfessionalService', 'WebSite']));
    expect(headForCity('ale', 'en').jsonLd.map((x) => x['@type'])).toEqual(expect.arrayContaining(['FAQPage', 'ProfessionalService']));
    expect(headForService('cto', 'sv').jsonLd.map((x) => x['@type'])).toEqual(expect.arrayContaining(['Service', 'FAQPage']));
    expect(headForCase('openaudit', 'en').jsonLd.map((x) => x['@type'])).toContain('SoftwareApplication');
    expect(headForCase('sokhem', 'en').jsonLd.map((x) => x['@type'])).toContain('WebApplication');
  });

  it('gives the person the agreed job title per locale', () => {
    expect(personLd('sv').jobTitle).toBe('AI-konsult och systemarkitekt');
    expect(personLd('en').jobTitle).toBe('AI consultant and software architect');
  });
});

describe('local and service signals', () => {
  it('places the business in Göteborg', () => {
    const ld = professionalServiceLd('sv', 'https://antonwester.se/') as { address?: Record<string, string> };
    expect(ld.address).toMatchObject({ '@type': 'PostalAddress', addressLocality: 'Göteborg', addressCountry: 'SE' });
  });
  it('types each service', () => {
    const ld = serviceLd({ url: 'https://antonwester.se/sv/ai-agenter/', name: 'AI-agenter', description: 'x', locale: 'sv' }) as { serviceType?: string };
    expect(ld.serviceType).toBe('AI-agenter');
  });
});
