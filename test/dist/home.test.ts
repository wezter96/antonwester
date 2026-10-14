import { describe, expect, it } from 'vitest';
import { readDist } from './helpers';

describe('home pages', () => {
  for (const [path, lang, term] of [['/', 'sv', 'AI-konsult i Göteborg'], ['/en/', 'en', 'AI consultant in Gothenburg']] as const) {
    const doc = readDist(path);
    it(`${path} has one h1 with the name and the search term`, () => {
      const h1s = doc.querySelectorAll('h1');
      expect(h1s).toHaveLength(1);
      expect(h1s[0].textContent.replace(/\s+/g, ' ')).toContain('Anton Wester');
      expect(h1s[0].textContent).toContain(term);
      expect(doc.querySelector('html')!.getAttribute('lang')).toBe(lang);
    });
    it(`${path} renders without the pre class and with every section`, () => {
      expect(doc.querySelector('html')!.getAttribute('class') ?? '').not.toContain('pre');
      for (const id of ['scan', 'approach', 'work', 'about', 'faq', 'contact']) expect(doc.querySelector(`#${id}`)).not.toBeNull();
    });
    it(`${path} shows the nine clients in order`, () => {
      const names = doc.querySelectorAll('[data-client]').slice(0, 9).map((e) => e.getAttribute('data-client'));
      expect(names).toEqual(['IVC Evidensia', 'Evinova', 'Telia', 'FAR', 'Sejfa', 'Tiimo', 'Future Memories', 'zodiapps', 'weapp']);
    });
    it(`${path} renders the scan with data and a working no-JS action`, () => {
      expect(doc.querySelector('[data-scan-data]')).not.toBeNull();
      expect(doc.querySelectorAll('[data-scan] [data-step]').length).toBeGreaterThanOrEqual(4);
      expect(doc.querySelector('[data-scan-send]')!.getAttribute('href')).toMatch(/^mailto:contact@antonwester\.se\?subject=/);
    });
    it(`${path} has a contact form with the estimate field`, () => {
      const form = doc.querySelector('form[data-contact]')!;
      expect(form.getAttribute('action')).toBe('https://formsubmit.co/contact@antonwester.se');
      expect(form.querySelector('input[name=estimate]')).not.toBeNull();
    });
  }
  it('links the language switch to the twin page', () => {
    expect(readDist('/').querySelector('[data-lang-switch]')!.getAttribute('href')).toBe('/en/');
    expect(readDist('/en/').querySelector('[data-lang-switch]')!.getAttribute('href')).toBe('/');
  });
});
