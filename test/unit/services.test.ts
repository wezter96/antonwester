import { describe, expect, it } from 'vitest';
import { SERVICE_IDS } from '../../src/content/routes';
import { services } from '../../src/content/services';
import type { ServiceContent } from '../../src/content/types';

const text = (s: ServiceContent) => [
  s.h1, s.promise, s.intro, ...s.sections.flatMap((x) => [x.heading, ...x.paragraphs, ...(x.list ?? [])]),
  ...s.steps, ...s.fitsWhen, s.firstEngagement, ...s.faq.flatMap((f) => [f.q, f.a]),
].join(' ');
const wordCount = (s: string) => s.split(/\s+/).filter(Boolean).length;

const TERMS = {
  assessment: { sv: 'AI-kartläggning', en: 'AI assessment' },
  development: { sv: 'AI-utveckling', en: 'AI development' },
  operations: { sv: 'drift och förvaltning', en: 'hosting and maintenance' },
  cto: { sv: 'Fractional CTO', en: 'Fractional CTO' },
} as const;

describe('services', () => {
  for (const id of SERVICE_IDS) {
    for (const l of ['sv', 'en'] as const) {
      const s = services[id][l];
      it(`${id}/${l} has at least 600 words of copy`, () => {
        expect(wordCount(text(s))).toBeGreaterThanOrEqual(600);
      });
      it(`${id}/${l} carries its search term in title, h1 and description`, () => {
        const term = TERMS[id][l].toLowerCase();
        expect(s.seo.title.toLowerCase()).toContain(term);
        expect(s.h1.toLowerCase()).toContain(term);
        expect(s.seo.description.toLowerCase()).toContain(term);
      });
      it(`${id}/${l} stays inside SEO length limits`, () => {
        expect(s.seo.title.length).toBeLessThanOrEqual(60);
        expect(s.seo.description.length).toBeGreaterThanOrEqual(120);
        expect(s.seo.description.length).toBeLessThanOrEqual(160);
      });
      it(`${id}/${l} has 3–4 FAQ entries and 3–6 steps`, () => {
        expect(s.faq.length).toBeGreaterThanOrEqual(3);
        expect(s.faq.length).toBeLessThanOrEqual(4);
        expect(s.steps.length).toBeGreaterThanOrEqual(3);
        expect(s.steps.length).toBeLessThanOrEqual(6);
      });
    }
    it(`${id} shares structure across locales`, () => {
      expect(services[id].sv.relatedCases).toEqual(services[id].en.relatedCases);
      expect(services[id].sv.stage).toBe(services[id].en.stage);
      expect(services[id].sv.id).toBe(id);
    });
  }
});
