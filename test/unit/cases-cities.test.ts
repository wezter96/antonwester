import { describe, expect, it } from 'vitest';
import { cases } from '../../src/content/cases';
import { cities } from '../../src/content/cities';
import { CASE_IDS, CITY_IDS } from '../../src/content/routes';

describe('cases', () => {
  for (const id of CASE_IDS) {
    for (const l of ['sv', 'en'] as const) {
      const c = cases[id][l];
      it(`${id}/${l} has SEO in range and three facts`, () => {
        expect(c.seo.title.length).toBeLessThanOrEqual(60);
        expect(c.seo.description.length).toBeGreaterThanOrEqual(120);
        expect(c.seo.description.length).toBeLessThanOrEqual(160);
        expect(c.facts).toHaveLength(3);
        expect(c.h1).toContain(c.name);
      });
    }
  }
  it('labels Wez as private with no external link', () => {
    expect(cases.wez.sv.url).toBeNull();
    expect(cases.wez.sv.privateLabel).toBe('Privat projekt, i daglig drift');
    expect(cases.wez.en.privateLabel).toBe('Private project, in daily use');
  });
  it('marks OpenAudit as MIT licensed software', () => {
    expect(cases.openaudit.en.license).toBe('MIT');
    expect(cases.openaudit.en.schemaType).toBe('SoftwareApplication');
  });
});

describe('cities', () => {
  for (const id of CITY_IDS) {
    for (const l of ['sv', 'en'] as const) {
      const c = cities[id][l];
      it(`${id}/${l} targets the AI consultant term`, () => {
        const term = l === 'sv' ? `AI-konsult i ${c.name}` : `AI Consultant in ${c.name}`;
        expect(c.seo.title).toContain(term);
        expect(c.h1.toLowerCase()).toContain(term.toLowerCase());
        expect(c.seo.title.length).toBeLessThanOrEqual(60);
        expect(c.seo.description.length).toBeGreaterThanOrEqual(120);
        expect(c.seo.description.length).toBeLessThanOrEqual(160);
        expect(c.faq).toHaveLength(3);
        expect(c.neighbours).not.toContain(id);
      });
    }
  }
  it('keeps Swedish letters in names', () => {
    expect(cities.kungalv.sv.name).toBe('Kungälv');
    expect(cities.boras.sv.name).toBe('Borås');
    expect(cities.trollhattan.sv.name).toBe('Trollhättan');
  });
  it('writes a unique focus paragraph per city', () => {
    const focus = CITY_IDS.map((id) => cities[id].sv.focus);
    expect(new Set(focus).size).toBe(CITY_IDS.length);
  });
});
