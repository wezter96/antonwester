import { describe, expect, it } from 'vitest';
import { CLIENTS } from '../../src/content/clients';
import { home } from '../../src/content/home';
import { scan } from '../../src/content/scan';
import { ui } from '../../src/content/ui';

const words = (s: string) => s.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

describe('core content', () => {
  it('has the logo bar in the agreed order', () => {
    expect(CLIENTS.map((c) => c.name)).toEqual([
      'IVC Evidensia', 'Evinova', 'Telia', 'FAR', 'Sejfa', 'Tiimo', 'Future Memories', 'zodiapps', 'weapp',
    ]);
  });

  it('labels the logo bar and the stages as agreed', () => {
    expect(ui.sv.workedWith).toBe('Arbetat med');
    expect(ui.en.workedWith).toBe('Worked with');
    expect(home.sv.approach.map((s) => s.word)).toEqual(['Hitta.', 'Bygg.', 'Förvalta.']);
    expect(home.en.approach.map((s) => s.word)).toEqual(['Find.', 'Build.', 'Run.']);
  });

  it('uses the agreed offer sentence', () => {
    expect(home.sv.offer).toBe('Jag identifierar var AI och automation skapar värde i er verksamhet och tar hand om både utveckling och underhåll.');
    expect(home.en.offer).toBe('I identify where AI and automation create value in your business and take care of both development and maintenance.');
  });

  it('keeps home SEO inside the length limits', () => {
    for (const l of ['sv', 'en'] as const) {
      expect(home[l].seo.title.length).toBeLessThanOrEqual(60);
      expect(home[l].seo.description.length).toBeGreaterThanOrEqual(120);
      expect(home[l].seo.description.length).toBeLessThanOrEqual(160);
    }
    expect(home.sv.seo.title).toContain('AI-konsult i Göteborg');
    expect(home.en.seo.title).toContain('AI Consultant in Gothenburg');
  });

  it('has five scan functions per locale with shares that sum to 1', () => {
    expect(scan.sv.map((f) => f.name)).toEqual(['Kundtjänst', 'Ekonomi', 'Försäljning', 'Administration', 'Rapportering']);
    expect(scan.en.map((f) => f.name)).toEqual(['Customer service', 'Finance', 'Sales', 'Administration', 'Reporting']);
    for (const l of ['sv', 'en'] as const) {
      for (const f of scan[l]) {
        const sum = f.steps.reduce((s, st) => s + st.share, 0);
        expect(sum).toBeCloseTo(1, 5);
      }
    }
    scan.sv.forEach((f, i) => {
      expect(f.id).toBe(scan.en[i].id);
      expect(f.steps.map((s) => [s.mode, s.share])).toEqual(scan.en[i].steps.map((s) => [s.mode, s.share]));
    });
  });

  it('has six home FAQ entries per locale with real answers', () => {
    for (const l of ['sv', 'en'] as const) {
      expect(home[l].faq).toHaveLength(6);
      for (const f of home[l].faq) expect(words(f.a)).toBeGreaterThanOrEqual(20);
    }
  });

  it('never states a client metric in the home copy', () => {
    expect(JSON.stringify(home)).not.toMatch(/%|200 timmar|200 hours/);
  });
});
