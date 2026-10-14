# antonwester.se redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild antonwester.se as a bilingual AI-konsult site, following direction A ("Westerly"). It has 34 canonical pages, the scan tool, a one-time load sequence, the lens and ripple effect on the name, section crossfades and smooth scroll, and it keeps every existing URL.

**Architecture:**
- Astro 6 static site. A single route registry (`src/content/routes.ts`) owns every path, canonical, hreflang alternate, sitemap entry and legacy redirect.
- Typed content modules (`src/content/*.ts`) hold all copy in both locales.
- Pages are thin compositions of components.
- Client behaviour is four small TypeScript modules: motion, theme, smooth scroll and scan. Their maths lives in pure functions with unit tests.

**Tech Stack:**
- Astro 6.0.4 and TypeScript. Vitest 5 with `getViteConfig`.
- Lenis 1.3.26 and @fontsource-variable/archivo 5.3.0 (the wdth axis files).
- fontkit 2.0.4, to measure text at build time.
- node-html-parser 9, for the tests that read the built HTML.
- playwright-core 1.64 with system Chrome, plus tsx, for the screenshot, OG and QA scripts.
- npm, which CI uses through `package-lock.json`.

**Spec:** `docs/superpowers/specs/2026-10-14-antonwester-redesign-design.md`

**Visual source of truth:** the v6 mockup. Task 1 copies it to `docs/superpowers/specs/assets/direction-a/direction-a-v6.html`. When a task says "port from the mockup", read the CSS rule with the named selector in that file and convert its units with the table in Task 7.

## Global Constraints

Copied from the spec. Every task's requirements implicitly include these.

- Swedish is the default at `/`; English is at `/en/`. Every page path ends with `/`. City slugs stay `stenungsund, ale, kungalv, partille, trollhattan, kungsbacka, boras, varberg`.
- `/sv/` redirects to `/`, and `/{city}/` redirects to `/sv/{city}/`. Both use meta refresh plus canonical, and neither appears in the sitemap.
- Titles are ≤ 60 characters, descriptions are 120–160 characters, and each page has exactly one `<h1>` containing its search term.
- Primary title: "AI-konsult i Göteborg" / "AI consultant in Gothenburg".
- Offer sentence: "Jag hittar var AI och automation lönar sig i er verksamhet, bygger det och underhåller det." / "I find where AI and automation pay off in your business, build it, and maintain it."
- Stages: "Hitta. Bygg. Förvalta." / "Find. Build. Run."
- Logo bar label: "Arbetat med" / "Worked with". Order: IVC Evidensia, Evinova, Telia, FAR, Sejfa, Tiimo, Future Memories, zodiapps, weapp.
- Scan functions: Kundtjänst, Ekonomi, Försäljning, Administration, Rapportering / Customer service, Finance, Sales, Administration, Reporting.
- Proof rules:
  - Client names appear with no metrics and no engagement details.
  - Numbers appear only for Anton's own products, and only numbers those products publish.
  - No invented testimonials, customers or statistics.
- Colours:

  | Token | Value |
  | --- | --- |
  | `--fog` | `#E7E9E4` |
  | `--fog-2` | `#DADED7` |
  | `--ink` | `#0C1E22` |
  | `--ink-2` | `#13292E` |
  | `--ink-3` | `#1B363C` |
  | `--muted` | `#4C5A5B` |
  | `--muted-ink` | `#93A6A8` |
  | `--signal` | `#FF5A1F` |

- Type: Archivo Variable (wdth 62–125, wght 100–900), self-hosted from @fontsource-variable/archivo, with the Latin file preloaded. Exactly five sizes: body, lead, sub, head and monument.
- Motion:
  - The load sequence runs once per page view. Nothing is triggered by scroll except the section crossfade.
  - `prefers-reduced-motion: reduce` disables the load sequence, the lens and ripple, the logo drift, the crossfade animation, Lenis and the tweens.
- No content is hidden when JS is off. The `pre` class is only ever added by an inline head script, and a 3.5 s safety timeout removes it.
- Budgets:
  - JS on the home page ≤ 25 KB gzip.
  - Lighthouse mobile: Performance ≥ 95; Accessibility, Best practices and SEO = 100.
  - LCP < 2.0 s, CLS < 0.05.
- No Effect code. Effect is installed but unused in `src/`.
- Deploys through the existing `.github/workflows/deploy.yml`. Do not change the workflow.
- Work happens on branch `redesign/ai-konsult`, with one commit per task.

## Review Focus

Things the spec implies but no ordinary test would catch, most likely first. Each line names the task that adds the test.

1. **JS fails to load, or is off.** The hero must still show the name, offer sentence and buttons. Task 9 adds a dist test that `<html>` has no `pre` class in static HTML, and a no-JS Playwright check in Task 14.
2. **Reduced motion.** Content must show at once with no drift, no Lenis and no load sequence. The Playwright check with `emulateMedia({ reducedMotion: 'reduce' })` is in Task 14.
3. **Scan extremes.** 2 h and 120 h, and every step set to "Ni", must show "≈ 0 h" and "0" weeks, never `NaN`, with a non-numeric hours value treated as 0. Unit tests are in Task 3.
4. **Extreme viewport widths (320 px and 2560 px).** The monument must never wrap or overflow and the page must not scroll horizontally. The Playwright overflow check is in Task 14.
5. **Language switch on a deep page.** On `/sv/case/wez/` it must lead to `/en/case/wez/`, not to the English home. The dist test is in Task 10.

---

## File structure

```
astro.config.ts                     (replaces astro.config.mjs) site, redirects from the registry
vitest.config.ts                    vitest through Astro's Vite config
src/content/routes.ts               route registry: ids, paths, urls, alternates, slug pages, legacy redirects, og paths
src/content/types.ts                content types shared by all modules
src/content/site.ts                 contact details, links, analytics id
src/content/ui.ts                   interface strings per locale
src/content/home.ts                 home copy per locale (hero, approach, work, about, experience, faq)
src/content/clients.ts              logo bar entries
src/content/scan.ts                 scan functions and steps per locale
src/content/services.ts             four services × two locales
src/content/cases.ts                four cases × two locales
src/content/cities.ts               eight cities × two locales
src/lib/seo.ts                      JSON-LD builders and the HeadProps type
src/lib/measure.ts                  fontkit text measurement for monument sizes
src/types/fontkit.d.ts              minimal fontkit declaration
src/styles/tokens.css               custom properties, @property, fallback font face
src/styles/base.css                 reset, grid, type steps, buttons, links, ground theming, reduced motion
src/layouts/Base.astro              <head>, boot script, skip link, scripts
src/components/*.astro              Nav, Monument, Portrait, HomeHero, LogoBar, Scan, Approach, Work, CaseRow,
                                    About, Faq, Contact, Footer, PageHero
src/templates/*.astro               HomePage, ServicePage, CasePage, CityPage
src/scripts/lib/scan-math.ts        pure: estimate, weeks, message
src/scripts/lib/springs.ts          pure: lens, ripple
src/scripts/lib/theme-index.ts      pure: active section
src/scripts/motion.ts               load sequence, lens + ripple
src/scripts/theme.ts                section crossfade
src/scripts/smooth.ts               Lenis
src/scripts/scan.ts                 scan wiring
src/scripts/form.ts                 Formsubmit and estimate prefill
src/pages/index.astro, en/index.astro, sv/[slug].astro, en/[slug].astro,
src/pages/sv/case/[id].astro, en/case/[id].astro, 404.astro,
src/pages/sitemap.xml.ts, robots.txt.ts, llms.txt.ts
src/assets/shots/{openaudit,sokhem,lingo,wez}.png
src/assets/portrait.jpg             (optional; Anton supplies it)
public/clients/*.svg|png            logos
public/monogram.svg, favicon set, public/og/*.png
scripts/shots.ts, scripts/og.ts, scripts/qa.ts
test/unit/*.test.ts, test/dist/*.test.ts
```

Deleted during the tasks:

- `src/data/**`
- `src/components/PortfolioPage.astro`
- `src/layouts/Layout.astro`
- `src/styles/global.css`
- `src/pages/[city].astro`, `src/pages/sv/index.astro`, `src/pages/sv/[city].astro`, `src/pages/en/[city].astro`
- `src/pages/og/**`
- `src/assets/background.svg`, `src/assets/astro.svg`
- `public/llms.txt`, `public/og-image.svg`

---

### Task 1: Branch, dependencies, test harness, design reference

**Files:**
- Create: `vitest.config.ts`, `test/unit/harness.test.ts`, `docs/superpowers/specs/assets/direction-a/*`
- Modify: `package.json`, `package-lock.json`, `.gitignore`

**Interfaces:**
- Produces: `npm test` runs `test/unit`. `npm run test:dist` builds the site, then runs `test/dist`.

- [ ] **Step 1: Branch and clean stray files**

```bash
git checkout -b redesign/ai-konsult
rm -rf .playwright-mcp
```

- [ ] **Step 2: Install dependencies**

```bash
npm install lenis@1.3.26 @fontsource-variable/archivo@5.3.0 fontkit@2.0.4
npm install -D vitest@5.0.4 node-html-parser@9.0.4 playwright-core@1.64.1 tsx
```

- [ ] **Step 3: Add scripts to `package.json`**

Replace the `"scripts"` block with:

```json
"scripts": {
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "astro": "astro",
  "typecheck": "tsc --noEmit",
  "test": "vitest run test/unit",
  "test:dist": "astro build && vitest run test/dist",
  "shots": "tsx scripts/shots.ts",
  "og": "tsx scripts/og.ts",
  "qa": "tsx scripts/qa.ts",
  "prepare": "effect-language-service patch"
}
```

- [ ] **Step 4: Create `vitest.config.ts`**

```ts
/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'node',
  },
});
```

- [ ] **Step 5: Ignore tool output**

Append to `.gitignore`:

```
.playwright-mcp/
.taste-skill/
```

- [ ] **Step 6: Copy the design reference into the repo**

```bash
mkdir -p docs/superpowers/specs/assets/direction-a
cp .superpowers/brainstorm/9288-1791999451/content/direction-a-v6.html docs/superpowers/specs/assets/direction-a/
cp .superpowers/brainstorm/9288-1791999451/content/logo-* .superpowers/brainstorm/9288-1791999451/content/shot-*.png docs/superpowers/specs/assets/direction-a/
```

- [ ] **Step 7: Write a harness test**

`test/unit/harness.test.ts`:

```ts
import { describe, expect, it } from 'vitest';

describe('test harness', () => {
  it('runs TypeScript tests through Astro’s Vite config', () => {
    expect(import.meta.env).toBeDefined();
  });
});
```

- [ ] **Step 8: Run it**

Run: `npm test`
Expected: PASS, 1 test.

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json vitest.config.ts .gitignore test/unit/harness.test.ts docs/superpowers/specs/assets
git commit -m "chore: test harness, redesign dependencies and design reference"
```

---

### Task 2: Route registry

**Files:**
- Create: `src/content/routes.ts`, `test/unit/routes.test.ts`

**Interfaces:**
- Produces:
  - Types: `Locale`, `LOCALES`, `SITE_URL`, `SERVICE_IDS`/`ServiceId`, `CASE_IDS`/`CaseId`, `CITY_IDS`/`CityId`, `PageRef`, `SlugPage`, `Alternate`.
  - Data: `SERVICE_SLUGS`, `LEGACY_REDIRECTS`.
  - Functions:
    - `pathFor(page, locale): string`
    - `urlFor(page, locale): string`
    - `otherLocale(locale): Locale`
    - `alternatesFor(page): Alternate[]`
    - `allPages(): PageRef[]`
    - `slugPages(locale): { slug: string; page: SlugPage }[]`
    - `astroRedirects(): Record<string, string>`
    - `ogPath(page, locale): string`
    - `pageKey(page): string`

- [ ] **Step 1: Write the failing test**

`test/unit/routes.test.ts`:

```ts
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
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- routes`
Expected: FAIL with "Failed to resolve import ../../src/content/routes".

- [ ] **Step 3: Implement `src/content/routes.ts`**

```ts
export type Locale = 'sv' | 'en';
export const LOCALES: readonly Locale[] = ['sv', 'en'];
export const SITE_URL = 'https://antonwester.se';

export const SERVICE_IDS = ['assessment', 'development', 'operations', 'cto'] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export const CASE_IDS = ['sokhem', 'openaudit', 'wez', 'lingo'] as const;
export type CaseId = (typeof CASE_IDS)[number];

export const CITY_IDS = [
  'stenungsund', 'ale', 'kungalv', 'partille', 'trollhattan', 'kungsbacka', 'boras', 'varberg',
] as const;
export type CityId = (typeof CITY_IDS)[number];

export type PageRef =
  | { kind: 'home' }
  | { kind: 'service'; id: ServiceId }
  | { kind: 'case'; id: CaseId }
  | { kind: 'city'; id: CityId };

export type SlugPage = Extract<PageRef, { kind: 'service' | 'city' }>;

export const SERVICE_SLUGS: Record<ServiceId, Record<Locale, string>> = {
  assessment: { sv: 'ai-kartlaggning', en: 'ai-assessment' },
  development: { sv: 'ai-utveckling', en: 'ai-development' },
  operations: { sv: 'drift-och-forvaltning', en: 'hosting-and-maintenance' },
  cto: { sv: 'fractional-cto', en: 'fractional-cto' },
};

export function pathFor(page: PageRef, locale: Locale): string {
  switch (page.kind) {
    case 'home':
      return locale === 'sv' ? '/' : '/en/';
    case 'service':
      return `/${locale}/${SERVICE_SLUGS[page.id][locale]}/`;
    case 'case':
      return `/${locale}/case/${page.id}/`;
    case 'city':
      return `/${locale}/${page.id}/`;
  }
}

export const urlFor = (page: PageRef, locale: Locale): string => `${SITE_URL}${pathFor(page, locale)}`;
export const otherLocale = (locale: Locale): Locale => (locale === 'sv' ? 'en' : 'sv');

export interface Alternate {
  hreflang: Locale | 'x-default';
  href: string;
}

export function alternatesFor(page: PageRef): Alternate[] {
  return [
    { hreflang: 'sv', href: urlFor(page, 'sv') },
    { hreflang: 'en', href: urlFor(page, 'en') },
    { hreflang: 'x-default', href: urlFor(page, 'en') },
  ];
}

export function allPages(): PageRef[] {
  return [
    { kind: 'home' },
    ...SERVICE_IDS.map((id): PageRef => ({ kind: 'service', id })),
    ...CASE_IDS.map((id): PageRef => ({ kind: 'case', id })),
    ...CITY_IDS.map((id): PageRef => ({ kind: 'city', id })),
  ];
}

export function slugPages(locale: Locale): Array<{ slug: string; page: SlugPage }> {
  return [
    ...SERVICE_IDS.map((id) => ({ slug: SERVICE_SLUGS[id][locale], page: { kind: 'service', id } as SlugPage })),
    ...CITY_IDS.map((id) => ({ slug: id as string, page: { kind: 'city', id } as SlugPage })),
  ];
}

export const LEGACY_REDIRECTS: Record<string, string> = {
  '/sv/': '/',
  ...Object.fromEntries(CITY_IDS.map((id) => [`/${id}/`, `/sv/${id}/`])),
};

/** Astro's `redirects` config wants keys without the trailing slash. */
export function astroRedirects(): Record<string, string> {
  return Object.fromEntries(Object.entries(LEGACY_REDIRECTS).map(([from, to]) => [from.replace(/\/$/, ''), to]));
}

export function pageKey(page: PageRef): string {
  return page.kind === 'home' ? 'home' : `${page.kind}-${page.id}`;
}

export const ogPath = (page: PageRef, locale: Locale): string => `/og/${pageKey(page)}-${locale}.png`;
```

- [ ] **Step 4: Run tests**

Run: `npm test -- routes`
Expected: PASS, 8 tests.

- [ ] **Step 5: Commit**

```bash
git add src/content/routes.ts test/unit/routes.test.ts
git commit -m "feat: route registry for all pages, alternates and legacy redirects"
```

---

### Task 3: Content types, site config, interface strings, home copy, clients, scan data

**Files:**
- Create: `src/content/types.ts`, `site.ts`, `ui.ts`, `home.ts`, `clients.ts`, `scan.ts`, `test/unit/content-core.test.ts`, `src/scripts/lib/scan-math.ts`, `test/unit/scan-math.test.ts`

**Interfaces:**
- Consumes: `Locale`, `ServiceId`, `CaseId`, `CityId` from Task 2.
- Produces:
  - Types: `L10n<T>`, `Seo`, `Faq`, `Fact`, `Section`, `Mode`, `ScanStep`, `ScanFunction`, `ServiceContent`, `CaseContent`, `CityContent`, `Client`, `Ui`, `HomeContent`.
  - Data: `site`, `ui: L10n<Ui>`, `home: L10n<HomeContent>`, `CLIENTS: Client[]`, `scan: L10n<ScanFunction[]>`.
  - Scan maths, used on the server in Task 8 and in the browser in Task 11: `hoursPerYear(hoursPerWeek: number, steps: {mode, share}[]): number`, `fullTimeWeeks(hours): number`, `fillTemplate(t, values): string`, `formatHours(n, locale): string`, `estimateMessage(i: EstimateInput): string`.

- [ ] **Step 1: Write the failing test**

`test/unit/content-core.test.ts`:

```ts
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
    expect(home.sv.offer).toBe('Jag hittar var AI och automation lönar sig i er verksamhet, bygger det och underhåller det.');
    expect(home.en.offer).toBe('I find where AI and automation pay off in your business, build it, and maintain it.');
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

  it('never mentions a client metric', () => {
    const all = JSON.stringify({ home, ui });
    expect(all).not.toMatch(/80 ?%|60 ?%|200 timmar|200 hours/);
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- content-core`
Expected: FAIL, the modules don't exist.

- [ ] **Step 3: Implement `src/content/types.ts`**

```ts
import type { CaseId, CityId, Locale, ServiceId } from './routes';

export type L10n<T> = Record<Locale, T>;
export interface Seo { title: string; description: string }
export interface Faq { q: string; a: string }
export interface Fact { value: string; label: string }
export interface Section { heading: string; paragraphs: string[]; list?: string[] }
export type Mode = 'you' | 'assist' | 'agent';
export interface ScanStep { label: string; mode: Mode; share: number }
export interface ScanFunction { id: string; name: string; steps: ScanStep[] }

export interface ServiceContent {
  id: ServiceId;
  stage: 'find' | 'build' | 'run' | null;
  name: string;
  seo: Seo;
  h1: string;
  intro: string;
  sections: Section[];
  steps: string[];
  fitsWhen: string[];
  firstEngagement: string;
  relatedCases: CaseId[];
  faq: Faq[];
}

export interface CaseContent {
  id: CaseId;
  name: string;
  tagline: string;
  seo: Seo;
  h1: string;
  url: string | null;
  privateLabel: string | null;
  facts: Fact[];
  what: string[];
  how: string[];
  stack: string[];
  proves: string[];
  service: ServiceId;
  schemaType: 'SoftwareApplication' | 'WebApplication';
  applicationCategory: string;
  license: string | null;
}

export interface CityContent {
  id: CityId;
  name: string;
  region: string;
  nearby: string[];
  seo: Seo;
  h1: string;
  focus: string;
  paragraphs: string[];
  deliveryMode: string;
  neighbours: [CityId, CityId];
  faq: Faq[];
}

export type Client =
  | { id: string; name: string; kind: 'mask'; file: string; ratio: number; height: number }
  | { id: string; name: string; kind: 'symbol-text'; file: string; text: string }
  | { id: string; name: string; kind: 'text'; text: string; dot: boolean };

export interface Stage { word: string; lead: string; body: string; service: ServiceId; linkLabel: string; wdth: number }
export interface ExperienceRow { years: string; role: string; org: string }

export interface HomeContent {
  seo: Seo;
  h1Tail: string;
  offer: string;
  approach: Stage[];
  workHeading: string;
  alsoLine: string;
  aboutHeading: string;
  bio: string[];
  experience: ExperienceRow[];
  stack: string;
  faq: Faq[];
}

export interface Ui {
  skip: string;
  navLabel: string;
  nav: { work: string; approach: string; about: string; contact: string };
  switchLabel: string;
  book: string;
  estimate: string;
  workedWith: string;
  portraitAlt: string;
  portraitPlaceholder: string;
  scan: {
    heading: string;
    intro: string;
    functionsLabel: string;
    stepModeLabel: string;
    modes: Record<Mode, string>;
    hoursLabel: string;
    yearBack: string;
    send: string;
    method: string;
    message: { head: string; line: string; total: string };
    mailSubject: string;
  };
  work: { privateTag: string; readCase: string; visit: string };
  faqHeading: string;
  contact: {
    heading: string;
    availability: string;
    formHeading: string;
    fields: { name: string; email: string; company: string; inquiry: string; message: string };
    placeholders: { name: string; email: string; company: string; message: string };
    inquiries: string[];
    submit: string;
    sending: string;
    success: string;
    error: string;
  };
  footer: { org: string; services: string; cities: string; cv: string };
  caseLabels: { what: string; how: string; proves: string; stack: string; next: string; service: string };
  serviceLabels: { what: string; steps: string; fits: string; first: string; cases: string; faq: string };
  cityLabels: { nearby: string; delivery: string; services: string; neighbours: string };
  notFound: { title: string; body: string; home: string };
}
```

- [ ] **Step 4: Implement `src/content/site.ts`**

```ts
export const site = {
  name: 'Anton Wester',
  company: 'Anton Wester AB',
  email: 'contact@antonwester.se',
  booking: 'https://calendar.app.google/Gm6vcBEkrQZT5xB57',
  linkedin: 'https://www.linkedin.com/in/anton-wester-93a26011b',
  github: 'https://github.com/wezter96',
  cv: '/anton-wester-resume.pdf',
  formAction: 'https://formsubmit.co/contact@antonwester.se',
  formAjax: 'https://formsubmit.co/ajax/contact@antonwester.se',
  umamiId: '159f3935-55d2-40cc-8794-84a30e0fc443',
} as const;
```

- [ ] **Step 5: Implement `src/content/clients.ts`**

`height` is a multiple of the bar's logo unit (Task 8 sets `--logo-u`).

```ts
import type { Client } from './types';

export const CLIENTS: Client[] = [
  { id: 'ivcevidensia', name: 'IVC Evidensia', kind: 'mask', file: '/clients/ivcevidensia.svg', ratio: 3.72, height: 2.17 },
  { id: 'evinova', name: 'Evinova', kind: 'mask', file: '/clients/evinova.svg', ratio: 4.34, height: 1.74 },
  { id: 'telia', name: 'Telia', kind: 'mask', file: '/clients/telia.svg', ratio: 2.54, height: 2.26 },
  { id: 'far', name: 'FAR', kind: 'mask', file: '/clients/far.svg', ratio: 2.05, height: 2.0 },
  { id: 'sejfa', name: 'Sejfa', kind: 'mask', file: '/clients/sejfa.svg', ratio: 2.25, height: 2.09 },
  { id: 'tiimo', name: 'Tiimo', kind: 'mask', file: '/clients/tiimo.png', ratio: 3.59, height: 1.83 },
  { id: 'futurememories', name: 'Future Memories', kind: 'symbol-text', file: '/clients/futurememories.svg', text: 'Future Memories' },
  { id: 'zodiapps', name: 'zodiapps', kind: 'text', text: 'zodiapps', dot: true },
  { id: 'weapp', name: 'weapp', kind: 'mask', file: '/clients/weapp.svg', ratio: 3.47, height: 1.65 },
];
```

- [ ] **Step 6: Implement `src/content/scan.ts`**

Copy the five functions from the mockup's `T.sv.sets` and `T.en.sets`, keeping the order and shares. Give each a stable `id`: `cs`, `finance`, `sales`, `admin`, `reporting`. Format:

```ts
import type { L10n, ScanFunction } from './types';

export const scan: L10n<ScanFunction[]> = {
  sv: [
    { id: 'cs', name: 'Kundtjänst', steps: [
      { label: 'Läsa och sortera inkommande mejl', mode: 'agent', share: 0.25 },
      { label: 'Skriva svarsutkast från era hjälpartiklar', mode: 'agent', share: 0.35 },
      { label: 'Kontrollera ton och fakta', mode: 'you', share: 0.15 },
      { label: 'Skicka och logga i CRM', mode: 'agent', share: 0.10 },
      { label: 'Hantera specialfallen', mode: 'assist', share: 0.15 },
    ] },
    { id: 'finance', name: 'Ekonomi', steps: [
      { label: 'Matcha fakturor mot ordrar', mode: 'agent', share: 0.30 },
      { label: 'Jaga saknade kvitton', mode: 'agent', share: 0.20 },
      { label: 'Kontera transaktioner', mode: 'assist', share: 0.25 },
      { label: 'Attestera betalningar', mode: 'you', share: 0.10 },
      { label: 'Sammanfatta månadsbokslutet', mode: 'assist', share: 0.15 },
    ] },
    { id: 'sales', name: 'Försäljning', steps: [
      { label: 'Researcha kunden', mode: 'agent', share: 0.30 },
      { label: 'Skriva första kontakten', mode: 'assist', share: 0.20 },
      { label: 'Kvalificera inkommande leads', mode: 'agent', share: 0.20 },
      { label: 'Ta samtalet', mode: 'you', share: 0.20 },
      { label: 'Uppdatera CRM efteråt', mode: 'agent', share: 0.10 },
    ] },
    { id: 'admin', name: 'Administration', steps: [
      { label: 'Sammanfatta långa dokument', mode: 'agent', share: 0.25 },
      { label: 'Föra över data mellan system', mode: 'agent', share: 0.25 },
      { label: 'Boka möten och skicka påminnelser', mode: 'assist', share: 0.15 },
      { label: 'Svara på interna frågor', mode: 'assist', share: 0.15 },
      { label: 'Granska och fatta beslut', mode: 'you', share: 0.20 },
    ] },
    { id: 'reporting', name: 'Rapportering', steps: [
      { label: 'Hämta siffror från fem system', mode: 'agent', share: 0.35 },
      { label: 'Bygga veckorapporten', mode: 'agent', share: 0.25 },
      { label: 'Hitta vad som ändrats och varför', mode: 'assist', share: 0.20 },
      { label: 'Bestämma vad ni gör åt det', mode: 'you', share: 0.20 },
    ] },
  ],
  en: [
    { id: 'cs', name: 'Customer service', steps: [
      { label: 'Read and sort incoming email', mode: 'agent', share: 0.25 },
      { label: 'Draft replies from your help docs', mode: 'agent', share: 0.35 },
      { label: 'Check tone and facts', mode: 'you', share: 0.15 },
      { label: 'Send and log it in the CRM', mode: 'agent', share: 0.10 },
      { label: 'Handle the odd cases', mode: 'assist', share: 0.15 },
    ] },
    { id: 'finance', name: 'Finance', steps: [
      { label: 'Match invoices to orders', mode: 'agent', share: 0.30 },
      { label: 'Chase missing receipts', mode: 'agent', share: 0.20 },
      { label: 'Code transactions', mode: 'assist', share: 0.25 },
      { label: 'Approve payments', mode: 'you', share: 0.10 },
      { label: 'Write the month-end summary', mode: 'assist', share: 0.15 },
    ] },
    { id: 'sales', name: 'Sales', steps: [
      { label: 'Research the account', mode: 'agent', share: 0.30 },
      { label: 'Write the first outreach', mode: 'assist', share: 0.20 },
      { label: 'Qualify inbound leads', mode: 'agent', share: 0.20 },
      { label: 'Run the call', mode: 'you', share: 0.20 },
      { label: 'Update the CRM afterwards', mode: 'agent', share: 0.10 },
    ] },
    { id: 'admin', name: 'Administration', steps: [
      { label: 'Summarise long documents', mode: 'agent', share: 0.25 },
      { label: 'Move data between systems', mode: 'agent', share: 0.25 },
      { label: 'Book meetings and send reminders', mode: 'assist', share: 0.15 },
      { label: 'Answer internal questions', mode: 'assist', share: 0.15 },
      { label: 'Review and decide', mode: 'you', share: 0.20 },
    ] },
    { id: 'reporting', name: 'Reporting', steps: [
      { label: 'Pull numbers from five systems', mode: 'agent', share: 0.35 },
      { label: 'Build the weekly report', mode: 'agent', share: 0.25 },
      { label: 'Spot what changed and why', mode: 'assist', share: 0.20 },
      { label: 'Decide what to do about it', mode: 'you', share: 0.20 },
    ] },
  ],
};
```

- [ ] **Step 7: Implement `src/content/ui.ts`**

Fill every key of `Ui` for both locales. The strings that came from the mockup and spec are fixed:

```ts
import type { L10n, Ui } from './types';

export const ui: L10n<Ui> = {
  sv: {
    skip: 'Hoppa till innehållet',
    navLabel: 'Huvudmeny',
    nav: { work: 'Arbeten', approach: 'Arbetssätt', about: 'Om mig', contact: 'Kontakt' },
    switchLabel: 'English',
    book: 'Boka ett introsamtal',
    estimate: 'Räkna på era timmar',
    workedWith: 'Arbetat med',
    portraitAlt: 'Anton Wester',
    portraitPlaceholder: 'Porträtt',
    scan: {
      heading: 'Var lönar sig AI hos er?',
      intro: 'Välj en del av verksamheten. Justera stegen efter hur det ser ut hos er, ange teamets timmar och ta med siffran till vårt första samtal.',
      functionsLabel: 'Del av verksamheten',
      stepModeLabel: 'Vem gör steget',
      modes: { you: 'Ni', assist: 'Assisterat', agent: 'Agent' },
      hoursLabel: 'Timmar per vecka som teamet lägger på det här idag:',
      yearBack: 'tillbaka per år. Ungefär {weeks} heltidsveckor.',
      send: 'Skicka uppskattningen till mig',
      method: 'Era timmar × 46 arbetsveckor × varje stegs andel av tiden. Ett agentsteg räknas som 80 %, ett assisterat som 40 %. Det är en startpunkt, och jag stämmer av den mot riktig data innan något byggs.',
      message: {
        head: 'Uppskattning från AI-verktyget: {fn}, {hours} timmar per vecka.',
        line: '– {step}: {mode}',
        total: 'Totalt ungefär {year} timmar per år ({weeks} heltidsveckor).',
      },
      mailSubject: 'AI-uppskattning från antonwester.se',
    },
    work: { privateTag: 'Privat projekt, i daglig drift', readCase: 'Läs caset', visit: 'Besök' },
    faqHeading: 'Vanliga frågor',
    contact: {
      heading: 'Låt oss hitta era timmar.',
      availability: 'Tar nya uppdrag',
      formHeading: 'Eller skriv några rader',
      fields: { name: 'Namn', email: 'E-post', company: 'Bolag', inquiry: 'Vad gäller det?', message: 'Meddelande' },
      placeholders: { name: 'Ditt namn', email: 'namn@bolag.se', company: 'Bolag eller team', message: 'Vad vill ni få gjort, och vad tar mest tid i dag?' },
      inquiries: ['AI-kartläggning', 'AI-utveckling', 'Drift och förvaltning', 'Fractional CTO', 'Annat'],
      submit: 'Skicka',
      sending: 'Skickar…',
      success: 'Tack! Meddelandet är skickat, och jag återkommer inom en arbetsdag.',
      error: 'Meddelandet gick inte iväg. Mejla gärna direkt till contact@antonwester.se.',
    },
    footer: { org: 'Anton Wester AB, Göteborg', services: 'Tjänster', cities: 'AI-konsult nära dig', cv: 'Ladda ner CV' },
    caseLabels: { what: 'Vad det är', how: 'Hur det är byggt', proves: 'Vad det visar', stack: 'Teknik', next: 'Nästa case', service: 'Relaterad tjänst' },
    serviceLabels: { what: 'Vad ni får', steps: 'Så går det till', fits: 'Passar när', first: 'Ett typiskt första uppdrag', cases: 'Exempel', faq: 'Vanliga frågor' },
    cityLabels: { nearby: 'Närliggande orter', delivery: 'Så jobbar jag', services: 'Tjänster', neighbours: 'Även i' },
    notFound: { title: 'Sidan finns inte', body: 'Länken kan vara gammal eller felstavad.', home: 'Till startsidan' },
  },
  en: {
    skip: 'Skip to content',
    navLabel: 'Main menu',
    nav: { work: 'Work', approach: 'Approach', about: 'About', contact: 'Contact' },
    switchLabel: 'Svenska',
    book: 'Book an intro call',
    estimate: 'Estimate your hours',
    workedWith: 'Worked with',
    portraitAlt: 'Anton Wester',
    portraitPlaceholder: 'Portrait',
    scan: {
      heading: 'Where does AI pay off for you?',
      intro: 'Pick a part of the business. Adjust the steps to match how you work, set your team’s hours, and bring the number to our first call.',
      functionsLabel: 'Part of the business',
      stepModeLabel: 'Who does this step',
      modes: { you: 'You', assist: 'Assisted', agent: 'Agent' },
      hoursLabel: 'Hours a week your team spends on this today:',
      yearBack: 'a year back. About {weeks} full-time weeks.',
      send: 'Send me this estimate',
      method: 'Your hours × 46 working weeks × each step’s share of the time. An agent step counts 80 %, an assisted step 40 %. It’s a starting point, and I check it against real data before anything is built.',
      message: {
        head: 'Estimate from the AI tool: {fn}, {hours} hours a week.',
        line: '– {step}: {mode}',
        total: 'In total about {year} hours a year ({weeks} full-time weeks).',
      },
      mailSubject: 'AI estimate from antonwester.se',
    },
    work: { privateTag: 'Private project, in daily use', readCase: 'Read the case', visit: 'Visit' },
    faqHeading: 'Questions',
    contact: {
      heading: 'Let’s find your hours.',
      availability: 'Taking on new work',
      formHeading: 'Or write a few lines',
      fields: { name: 'Name', email: 'Email', company: 'Company', inquiry: 'What is it about?', message: 'Message' },
      placeholders: { name: 'Your name', email: 'name@company.com', company: 'Company or team', message: 'What do you want done, and what takes the most time today?' },
      inquiries: ['AI assessment', 'AI development', 'Hosting and maintenance', 'Fractional CTO', 'Other'],
      submit: 'Send',
      sending: 'Sending…',
      success: 'Thanks. Your message is sent, and I’ll reply within one working day.',
      error: 'The message didn’t go through. Please email contact@antonwester.se directly.',
    },
    footer: { org: 'Anton Wester AB, Gothenburg', services: 'Services', cities: 'AI consultant near you', cv: 'Download CV' },
    caseLabels: { what: 'What it is', how: 'How it’s built', proves: 'What it shows', stack: 'Stack', next: 'Next case', service: 'Related service' },
    serviceLabels: { what: 'What you get', steps: 'How it runs', fits: 'A good fit when', first: 'A typical first engagement', cases: 'Examples', faq: 'Questions' },
    cityLabels: { nearby: 'Nearby', delivery: 'How I work', services: 'Services', neighbours: 'Also in' },
    notFound: { title: 'Page not found', body: 'The link may be old or mistyped.', home: 'Go to the home page' },
  },
};
```

- [ ] **Step 8: Implement `src/content/home.ts`**

```ts
import type { HomeContent, L10n } from './types';

export const home: L10n<HomeContent> = {
  sv: {
    seo: {
      title: 'AI-konsult i Göteborg | Anton Wester',
      description: 'AI-konsult i Göteborg. Jag hittar var AI och automation lönar sig i er verksamhet, bygger lösningen och underhåller den. Boka ett introsamtal.',
    },
    h1Tail: 'AI-konsult i Göteborg.',
    offer: 'Jag hittar var AI och automation lönar sig i er verksamhet, bygger det och underhåller det.',
    approach: [
      { word: 'Hitta.', wdth: 62, service: 'assessment', linkLabel: 'Om AI-kartläggning',
        lead: 'Jag sitter med dem som gör jobbet', body: 'och kartlägger vart timmarna tar vägen. Ni får en prioriterad lista över var AI lönar sig, vad det kostar att bygga och vad som ska förbli mänskligt. Kartan är er, oavsett om vi bygger vidare tillsammans.' },
      { word: 'Bygg.', wdth: 96, service: 'development', linkLabel: 'Om AI-utveckling',
        lead: 'Jag bygger det själv, i er stack:', body: 'agenter, integrationer och gränssnitten teamet ska använda, med tester, övervakning och de skyddsräcken som reglerade branscher kräver.' },
      { word: 'Förvalta.', wdth: 125, service: 'operations', linkLabel: 'Om drift och förvaltning',
        lead: 'Jag driftar och förvaltar det åt er:', body: 'hosting, övervakning, säkerhet, uppdateringar och löpande förbättringar. Vill ni hellre driva det själva får teamet koden, dokumentationen och utbildningen. Ni väljer, och det finns ingen inlåsning.' },
    ],
    workHeading: 'Jag bygger egna produkter också.',
    alsoLine: '<b>Dessutom:</b> <a href="/sv/case/lingo/">Lingo</a>, en AI-native plattform för lokalisering, och bidrag till <a href="https://t4stack.com/" rel="noopener">T4 Stack</a>, ett open source-startpaket för typade webb- och mobilappar.',
    aboutHeading: 'Om mig',
    bio: [
      'Jag har byggt digitala produkter i över sju år, för webb, iOS och Android. Jag är högskoleingenjör i datateknik från Chalmers, har varit tech lead för cross-platform på weapp och utvecklare på Telia.',
      'I dag bygger jag AI-lösningar åt företag och driver mina egna plattformar, SökHem och OpenAudit, hela vägen från arkitektur till drift. I världens största chattcommunity för React är jag utsedd till star helper.',
    ],
    experience: [
      { years: '2024–', role: 'AI-konsult och utvecklare', org: 'Anton Wester AB' },
      { years: '2022–2024', role: 'Tech lead, cross-platform', org: 'weapp' },
      { years: '2021–2022', role: 'Mjukvaruutvecklare', org: 'weapp' },
      { years: '2019–2021', role: 'Mjukvaruutvecklare', org: 'Telia' },
      { years: '2016–2019', role: 'Högskoleingenjör, datateknik', org: 'Chalmers' },
    ],
    stack: 'Jag bygger i TypeScript, React, React Native och Node/Bun, med Postgres, Redis och Docker i drift, och integrerar språkmodeller från bland andra Anthropic och OpenAI med agenter, verktyg och MCP.',
    faq: [
      { q: 'Vad kostar en AI-kartläggning?', a: 'Det beror på hur stor del av verksamheten den ska täcka. Efter ett första samtal får ni ett fast pris för kartläggningen, så att ni vet kostnaden innan vi börjar.' },
      { q: 'Hur snabbt kan vi ha något i drift?', a: 'Ett avgränsat första steg, till exempel en agent som sorterar och besvarar inkommande mejl, går ofta att ha i drift inom några veckor. Större integrationer tar längre tid, och det framgår av kartläggningen.' },
      { q: 'Hur hanterar du säkerhet, GDPR och EU:s AI-förordning?', a: 'Jag bygger med dataminimering och tydliga loggar, väljer leverantörer och regioner efter var er data får behandlas och dokumenterar vilka beslut AI fattar och vilka en människa godkänner. Det gör det enklare att uppfylla GDPR och AI-förordningen.' },
      { q: 'Vilka AI-modeller och verktyg använder du?', a: 'Det som passar uppgiften. Jag arbetar med modeller från bland andra Anthropic och OpenAI och med öppna modeller som kan köras på egen server, och bygger agenter som använder era befintliga system via API:er och MCP.' },
      { q: 'Kan du drifta lösningen åt oss, eller tar vårt team över?', a: 'Båda går. Standard är att jag driftar och förvaltar lösningen åt er, med övervakning, säkerhetsuppdateringar och löpande förbättringar. Vill ni hellre ta över får teamet koden, dokumentationen och utbildningen.' },
      { q: 'Jobbar du på plats eller på distans?', a: 'Jag utgår från Göteborg och jobbar gärna på plats i Västsverige, till exempel under kartläggningen. Resten sker oftast på distans, och jag tar uppdrag i hela Sverige.' },
    ],
  },
  en: {
    seo: {
      title: 'AI Consultant in Gothenburg | Anton Wester',
      description: 'AI consultant in Gothenburg. I find where AI and automation pay off in your business, build the solution and maintain it. Book an intro call.',
    },
    h1Tail: 'AI consultant in Gothenburg.',
    offer: 'I find where AI and automation pay off in your business, build it, and maintain it.',
    approach: [
      { word: 'Find.', wdth: 62, service: 'assessment', linkLabel: 'About the AI assessment',
        lead: 'I sit with the people who do the work', body: 'and map where the hours go. You get a ranked list of where AI pays, what it costs to build, and what should stay human. You keep the map whether or not we build it together.' },
      { word: 'Build.', wdth: 96, service: 'development', linkLabel: 'About AI development',
        lead: 'I build it myself, in your stack:', body: 'agents, integrations and the interfaces your team will use, with tests, monitoring and the guardrails regulated businesses need.' },
      { word: 'Run.', wdth: 125, service: 'operations', linkLabel: 'About hosting and maintenance',
        lead: 'I host and run it for you:', body: 'monitoring, security, updates and steady improvements. If you would rather run it yourselves, your team gets the code, the docs and the training. Your choice, and no lock-in.' },
    ],
    workHeading: 'I build my own products too.',
    alsoLine: '<b>Also:</b> <a href="/en/case/lingo/">Lingo</a>, an AI-native localization platform, and contributions to <a href="https://t4stack.com/" rel="noopener">T4 Stack</a>, an open-source starter for typed web and native apps.',
    aboutHeading: 'About',
    bio: [
      'I have built digital products for more than seven years, for web, iOS and Android. I studied computer engineering at Chalmers, led cross-platform development as tech lead at weapp and worked as a developer at Telia.',
      'Today I build AI solutions for companies and run my own platforms, SökHem and OpenAudit, from architecture to operations. In the world’s largest React chat community I am recognised as a star helper.',
    ],
    experience: [
      { years: '2024–', role: 'AI consultant and developer', org: 'Anton Wester AB' },
      { years: '2022–2024', role: 'Tech lead, cross-platform', org: 'weapp' },
      { years: '2021–2022', role: 'Software engineer', org: 'weapp' },
      { years: '2019–2021', role: 'Software developer', org: 'Telia' },
      { years: '2016–2019', role: 'B.Sc. computer engineering', org: 'Chalmers' },
    ],
    stack: 'I build in TypeScript, React, React Native and Node/Bun, run Postgres, Redis and Docker in production, and integrate language models from Anthropic, OpenAI and others with agents, tools and MCP.',
    faq: [
      { q: 'What does an AI assessment cost?', a: 'It depends on how much of the business it covers. After a first call you get a fixed price for the assessment, so you know the cost before we start.' },
      { q: 'How quickly can we have something running?', a: 'A contained first step, such as an agent that sorts and answers incoming email, can often be running within a few weeks. Larger integrations take longer, and the assessment shows how long.' },
      { q: 'How do you handle security, GDPR and the EU AI Act?', a: 'I build with data minimisation and clear logs, choose providers and regions by where your data may be processed, and document which decisions AI makes and which a person approves. That makes GDPR and the AI Act easier to meet.' },
      { q: 'Which AI models and tools do you use?', a: 'Whatever fits the task. I work with models from Anthropic, OpenAI and others, and with open models that can run on your own server, and I build agents that use your existing systems through APIs and MCP.' },
      { q: 'Can you run it for us, or does our team take over?', a: 'Either works. By default I host and run the solution for you, with monitoring, security updates and steady improvements. If you would rather take over, your team gets the code, the docs and the training.' },
      { q: 'Do you work on site or remotely?', a: 'I am based in Gothenburg and happy to work on site in western Sweden, for example during the assessment. The rest is usually remote, and I take on work across Sweden.' },
    ],
  },
};
```

- [ ] **Step 9: Write the failing scan-maths test**

`test/unit/scan-math.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { scan } from '../../src/content/scan';
import { ui } from '../../src/content/ui';
import { estimateMessage, fillTemplate, formatHours, fullTimeWeeks, hoursPerYear } from '../../src/scripts/lib/scan-math';

const cs = scan.sv[0].steps;
const admin = scan.sv[3].steps;

describe('scan maths', () => {
  it('matches the mockup for customer service at 25 h', () => {
    expect(hoursPerYear(25, cs)).toBe(710);
    expect(fullTimeWeeks(710)).toBe(18);
  });
  it('gives 600 h for administration at 25 h', () => {
    expect(hoursPerYear(25, admin)).toBe(600);
  });
  it('returns 0, never NaN, when every step is human or the input is not a number', () => {
    expect(hoursPerYear(120, cs.map((s) => ({ ...s, mode: 'you' as const })))).toBe(0);
    expect(hoursPerYear(Number.NaN, cs)).toBe(0);
    expect(hoursPerYear(-5, cs)).toBe(0);
    expect(fullTimeWeeks(0)).toBe(0);
  });
  it('handles the slider extremes', () => {
    expect(hoursPerYear(2, cs)).toBe(60);
    expect(hoursPerYear(120, cs)).toBe(3420);
  });
  it('formats numbers per locale', () => {
    expect(formatHours(3420, 'sv')).toBe(new Intl.NumberFormat('sv-SE').format(3420));
    expect(formatHours(3420, 'en')).toBe('3,420');
  });
  it('fills templates and builds the handoff message', () => {
    expect(fillTemplate('a {x} b', { x: 1 })).toBe('a 1 b');
    const msg = estimateMessage({
      functionName: 'Kundtjänst', steps: cs, modeLabels: ui.sv.scan.modes, hoursPerWeek: 25,
      hoursPerYear: 710, locale: 'sv', template: ui.sv.scan.message,
    });
    expect(msg.split('\n')[0]).toBe('Uppskattning från AI-verktyget: Kundtjänst, 25 timmar per vecka.');
    expect(msg).toContain('– Kontrollera ton och fakta: Ni');
    expect(msg).toContain('(18 heltidsveckor)');
  });
});
```

Run: `npm test -- scan-math`
Expected: FAIL, the module doesn't exist.

- [ ] **Step 10: Implement the scan maths**

`src/scripts/lib/scan-math.ts`:

```ts
import type { Locale } from '../../content/routes';
import type { Mode } from '../../content/types';

export const MODE_WEIGHT: Record<Mode, number> = { you: 0, assist: 0.4, agent: 0.8 };
export const WORK_WEEKS = 46;

export function hoursPerYear(hoursPerWeek: number, steps: ReadonlyArray<{ mode: Mode; share: number }>): number {
  const h = Number.isFinite(hoursPerWeek) ? Math.max(0, hoursPerWeek) : 0;
  const share = steps.reduce((sum, s) => sum + s.share * MODE_WEIGHT[s.mode], 0);
  return Math.round((h * WORK_WEEKS * share) / 10) * 10;
}

export const fullTimeWeeks = (hours: number): number => Math.max(0, Math.round(hours / 40));

export const fillTemplate = (template: string, values: Record<string, string | number>): string =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));

export const formatHours = (n: number, locale: Locale): string =>
  new Intl.NumberFormat(locale === 'sv' ? 'sv-SE' : 'en-GB').format(n);

export interface EstimateInput {
  functionName: string;
  steps: ReadonlyArray<{ label: string; mode: Mode }>;
  modeLabels: Record<Mode, string>;
  hoursPerWeek: number;
  hoursPerYear: number;
  locale: Locale;
  template: { head: string; line: string; total: string };
}

export function estimateMessage(i: EstimateInput): string {
  return [
    fillTemplate(i.template.head, { fn: i.functionName, hours: i.hoursPerWeek }),
    ...i.steps.map((s) => fillTemplate(i.template.line, { step: s.label, mode: i.modeLabels[s.mode] })),
    fillTemplate(i.template.total, { year: formatHours(i.hoursPerYear, i.locale), weeks: fullTimeWeeks(i.hoursPerYear) }),
  ].join('\n');
}
```

- [ ] **Step 11: Run tests**

Run: `npm test -- content-core scan-math`
Expected: PASS, 13 tests. If a description length fails, edit the copy and keep its meaning. Do not loosen the test.

- [ ] **Step 12: Commit**

```bash
git add src/content src/scripts/lib/scan-math.ts test/unit/content-core.test.ts test/unit/scan-math.test.ts
git commit -m "feat: content types, site config, interface strings, home copy, clients, scan data and scan maths"
```

---

### Task 4: Service content

**Files:**
- Create: `src/content/services.ts`, `test/unit/services.test.ts`

**Interfaces:**
- Consumes: `ServiceContent`, `L10n` (Task 3); `SERVICE_IDS`, `ServiceId` (Task 2).
- Produces: `services: Record<ServiceId, L10n<ServiceContent>>` and `getService(id: ServiceId, locale: Locale): ServiceContent`.

- [ ] **Step 1: Write the failing test**

`test/unit/services.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { SERVICE_IDS } from '../../src/content/routes';
import { services } from '../../src/content/services';
import type { ServiceContent } from '../../src/content/types';

const text = (s: ServiceContent) => [
  s.h1, s.intro, ...s.sections.flatMap((x) => [x.heading, ...x.paragraphs, ...(x.list ?? [])]),
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
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- services`
Expected: FAIL, the module doesn't exist.

- [ ] **Step 3: Write `src/content/services.ts`**

The structure and the first service in full are below. It sets the bar for voice, specificity and length. Write `development` (stage `build`, relatedCases `['sokhem', 'wez']`), `operations` (stage `run`, relatedCases `['sokhem', 'openaudit']`) and `cto` (stage `null`, relatedCases `['sokhem', 'lingo']`) to the same standard, from these facts:

- **development:** agents that take over steps such as the scan's (email, invoices, documents, reports); integrations with existing systems (CRM, ERP, document stores) through APIs and MCP; interfaces for the people who approve; tests, logging, cost tracking, human approval for risky steps; built in the client's stack or self-hosted; regulated environments (the med-tech experience, without naming metrics); typical first build is one agent for one process in a few weeks.
- **operations:** hosting in EU regions or on the client's own servers; monitoring and alerts; security updates and dependency patches; model and prompt updates as providers change; cost control; monthly review of what the agent did and where it can do more; the handover option (code, docs, training) with no lock-in; Anton runs his own platforms (SökHem, OpenAudit) in production with Docker, Traefik, Prometheus and Grafana.
- **cto:** part-time technical leadership; architecture decisions, hiring help, delivery planning, AI strategy that stays connected to what is buildable; seven years of building and leading cross-platform teams; works with founders and leadership teams who are not ready for a full-time CTO.

```ts
import type { Locale, ServiceId } from './routes';
import type { L10n, ServiceContent } from './types';

export const services: Record<ServiceId, L10n<ServiceContent>> = {
  assessment: {
    sv: {
      id: 'assessment',
      stage: 'find',
      name: 'AI-kartläggning',
      seo: {
        title: 'AI-kartläggning för företag | Anton Wester',
        description: 'En AI-kartläggning visar var AI och automation lönar sig i er verksamhet: vilka processer, vad det kostar att bygga och vad det sparar.',
      },
      h1: 'AI-kartläggning: se var AI lönar sig innan ni bygger',
      intro: 'Innan något byggs vill ni veta var AI faktiskt gör skillnad. I en AI-kartläggning går jag igenom hur arbetet görs i dag, uppskattar var timmarna går och rankar möjligheterna efter vad de sparar och vad de kostar att bygga.',
      sections: [
        {
          heading: 'Vad ni får',
          paragraphs: ['Kartläggningen slutar i ett konkret underlag som ni kan fatta beslut på, oavsett om ni bygger med mig, med ert eget team eller inte alls.'],
          list: [
            'En karta över de processer som tar mest tid, med uppskattade timmar per vecka och vem som gör jobbet i dag.',
            'En prioriterad lista över var AI och automation lönar sig, med uppskattad tidsbesparing och byggkostnad för varje punkt.',
            'En bedömning av riskerna: vilken data som berörs, säkerhet, GDPR och var EU:s AI-förordning påverkar.',
            'Ett förslag på ett första steg som går att bygga på några veckor och mäta.',
          ],
        },
        {
          heading: 'Vad jag tittar efter',
          paragraphs: [
            'De bästa möjligheterna är sällan de mest omtalade. Ofta handlar det om arbete som upprepas varje dag: mejl som sorteras, data som förs över mellan system, dokument som sammanfattas och rapporter som byggs av siffror från flera ställen.',
            'Jag bedömer varje steg utifrån tre frågor: hur mycket tid det tar, hur förutsägbart det är och vad som händer om det blir fel. Steg som är tidskrävande, förutsägbara och lätta att kontrollera passar bra för en agent. Steg där ett fel kostar mycket behåller en människa, ibland med AI som stöd.',
            'Resultatet är inte en rapport som hamnar i en låda. Varje punkt på listan har en ägare, en uppskattad effekt och ett förslag på hur ni mäter att den fungerar efter att den är byggd.',
          ],
        },
        {
          heading: 'Varför börja med en kartläggning',
          paragraphs: [
            'Många AI-projekt börjar med en lösning och letar sedan efter ett problem. Det blir dyrt, och det är anledningen till att så många piloter aldrig når drift. En kartläggning vänder på ordningen: först var tiden går, sedan vad som är värt att bygga.',
            'Eftersom jag också bygger och driftar lösningarna blir bedömningarna praktiska. Jag vet vad en integration mot ett affärssystem brukar kosta, hur lång tid en agent tar att få stabil och vad som krävs för att den ska fungera även om ett år, när modellerna och verktygen har bytts ut.',
          ],
        },
      ],
      steps: [
        'Ett första samtal där vi går igenom verksamheten, målen och vilka delar som känns tyngst i dag.',
        'Intervjuer och genomgångar med dem som gör jobbet. Jag tittar på verktyg, flöden och var information flyttas för hand.',
        'Jag uppskattar tiden per steg och bedömer vad en agent, en automation eller en bättre integration kan ta över.',
        'Ni får kartan och den prioriterade listan, och vi går igenom den tillsammans med ledningen.',
      ],
      fitsWhen: [
        'Ni vet att AI kan hjälpa men inte var ni ska börja.',
        'Flera personer lägger timmar varje vecka på samma manuella moment.',
        'Ni har testat ChatGPT eller Copilot men inte fått in det i det riktiga arbetet.',
        'Ledningen vill ha ett beslutsunderlag innan budgeten läggs.',
      ],
      firstEngagement: 'Ett typiskt första uppdrag är en avgränsad kartläggning av en eller två avdelningar. Den tar några veckor, och resultatet är ert att använda hur ni vill.',
      relatedCases: ['openaudit', 'wez'],
      faq: [
        { q: 'Hur lång tid tar en AI-kartläggning?', a: 'Det beror på hur många avdelningar och processer som ingår. En avgränsad kartläggning av en avdelning brukar ta några veckor från första samtal till genomgång med ledningen.' },
        { q: 'Måste vi bygga med dig efteråt?', a: 'Nej. Kartan och den prioriterade listan är er. Många väljer att bygga första steget tillsammans med mig, men underlaget fungerar lika bra för ert eget team eller en annan leverantör.' },
        { q: 'Behöver vi ha ordning på vår data först?', a: 'Nej. En del av kartläggningen är att se vilken data som finns, var den finns och vad som behöver göras för att AI ska kunna använda den säkert.' },
      ],
    },
    en: {
      id: 'assessment',
      stage: 'find',
      name: 'AI assessment',
      seo: {
        title: 'AI assessment for companies | Anton Wester',
        description: 'An AI assessment shows where AI and automation pay off in your business: which processes, what they cost to build and what they save.',
      },
      h1: 'AI assessment: see where AI pays before you build',
      intro: 'Before anything is built, you want to know where AI actually makes a difference. In an AI assessment I go through how the work is done today, estimate where the hours go, and rank the opportunities by what they save and what they cost to build.',
      sections: [
        {
          heading: 'What you get',
          paragraphs: ['The assessment ends in concrete material you can decide on, whether you build with me, with your own team or not at all.'],
          list: [
            'A map of the processes that take the most time, with estimated hours per week and who does the work today.',
            'A ranked list of where AI and automation pay off, with the estimated time saved and the cost to build for each item.',
            'A view of the risks: which data is involved, security, GDPR and where the EU AI Act applies.',
            'A proposed first step that can be built in a few weeks and measured.',
          ],
        },
        {
          heading: 'What I look for',
          paragraphs: [
            'The best opportunities are rarely the most talked about. They are usually work that repeats every day: email being sorted, data being moved between systems, documents being summarised, and reports being assembled from numbers in several places.',
            'I judge each step by three questions: how much time it takes, how predictable it is and what happens if it goes wrong. Steps that are time-consuming, predictable and easy to check suit an agent. Steps where a mistake is expensive keep a person, sometimes with AI as support.',
            'The result is not a report that ends up in a drawer. Every item on the list has an owner, an estimated effect and a way to measure that it works once it is built.',
          ],
        },
        {
          heading: 'Why start with an assessment',
          paragraphs: [
            'Many AI projects start with a solution and then look for a problem. That gets expensive, and it is why so many pilots never reach production. An assessment turns the order around: first where the time goes, then what is worth building.',
            'Because I also build and run these solutions, the judgements stay practical. I know what an integration with a business system tends to cost, how long an agent takes to become stable and what it takes for it to still work in a year, after the models and tools have changed.',
          ],
        },
      ],
      steps: [
        'A first call where we go through the business, the goals and the parts that feel heaviest today.',
        'Interviews and walk-throughs with the people who do the work. I look at tools, flows and where information is moved by hand.',
        'I estimate the time per step and judge what an agent, an automation or a better integration can take over.',
        'You get the map and the ranked list, and we go through it together with leadership.',
      ],
      fitsWhen: [
        'You know AI can help but not where to start.',
        'Several people spend hours every week on the same manual task.',
        'You have tried ChatGPT or Copilot but not fitted it into the real work.',
        'Leadership wants a basis for decisions before the budget is set.',
      ],
      firstEngagement: 'A typical first engagement is a contained assessment of one or two departments. It takes a few weeks, and the result is yours to use however you like.',
      relatedCases: ['openaudit', 'wez'],
      faq: [
        { q: 'How long does an AI assessment take?', a: 'It depends on how many departments and processes are included. A contained assessment of one department usually takes a few weeks from the first call to the walk-through with leadership.' },
        { q: 'Do we have to build with you afterwards?', a: 'No. The map and the ranked list are yours. Many choose to build the first step with me, but the material works just as well for your own team or another supplier.' },
        { q: 'Does our data need to be in order first?', a: 'No. Part of the assessment is seeing which data exists, where it lives and what needs to happen for AI to use it safely.' },
      ],
    },
  },
  // development, operations, cto: same shape, written from the facts listed above this code block.
} as Record<ServiceId, L10n<ServiceContent>>;

export const getService = (id: ServiceId, locale: Locale): ServiceContent => services[id][locale];
```

Remove the `as Record<…>` cast once all four services exist; the test needs all four.

- [ ] **Step 4: Run tests**

Run: `npm test -- services`
Expected: PASS, 36 tests: 4 services × 2 locales × 4 checks, plus 4 structure checks. If one is under 600 words, add substance (a concrete example or a real limitation), not filler.

- [ ] **Step 5: Commit**

```bash
git add src/content/services.ts test/unit/services.test.ts
git commit -m "feat: copy for the four service pages in Swedish and English"
```

---

### Task 5: Case and city content

**Files:**
- Create: `src/content/cases.ts`, `src/content/cities.ts`, `test/unit/cases-cities.test.ts`

**Interfaces:**
- Consumes: `CaseContent`, `CityContent` (Task 3).
- Produces:
  - `cases: Record<CaseId, L10n<CaseContent>>` and `getCase(id, locale)`.
  - `cities: Record<CityId, L10n<CityContent>>` and `getCity(id, locale)`.

- [ ] **Step 1: Write the failing test**

`test/unit/cases-cities.test.ts`:

```ts
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
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- cases-cities`
Expected: FAIL, the modules don't exist.

- [ ] **Step 3: Write `src/content/cases.ts`**

All four cases in both locales, in the `CaseContent` shape. Use only these facts, from the products' own sites and Anton's CV:

- **SökHem**
  - Basics: url `https://sokhem.se`, schemaType `WebApplication`, applicationCategory `LifestyleApplication`, service `development`, license `null`.
  - Facts: "130 000+" bostäder till salu / homes for sale; "2,5 milj." / "2.5 M" levererade matchningar / matches delivered; "750+" områdesguider / area guides.
  - What it is: buyers describe what they want once, draw areas on a map and get matched daily; sellers list for free, with or without an agent; free statistics and valuations; area guides.
  - How it's built: a monorepo with three apps, namely SSR web (React 19, TanStack Start), API (Hono, oRPC, Better Auth) and background workers (BullMQ) for matching, notifications and ingestion. Postgres/PostGIS with a read replica, Redis, Stripe, Cloudflare R2 and Tunnel. Self-hosted with Docker Compose, Traefik and Dokploy, with Prometheus and Grafana for metrics and alerting and secrets from Infisical. Built with an AI-agent workflow: agent guides, quality gates and protected-file locks.
  - What it shows: one person can found, build and run a national marketplace end to end when AI agents carry the volume and the guardrails are designed in.
- **OpenAudit**
  - Basics: url `https://openaudit.se`, schemaType `SoftwareApplication`, applicationCategory `DeveloperApplication`, service `assessment`, license `MIT`.
  - Facts: "103" granskare / auditors; "10" områden / audit areas; "A 100" eget betyg vid varje push / its own score on every push.
  - What it is: one scored audit across code, sites, apps, APIs, containers, infrastructure, cloud and mobile builds. It runs from the terminal, CI or an AI agent over MCP. It merges overlapping findings, outputs HTML, JSON, SARIF, Markdown and CSV, and treats every target as hostile.
  - How it's built: Bun, 37 built-in auditors plus wrapped free scanners (Semgrep, Trivy, gitleaks, osv-scanner, Lighthouse, axe-core), a GitHub Action, multi-arch Docker images with an SBOM, and agent playbooks.
  - What it shows: the same discipline Anton applies to client systems. You measure, score and fix, and agents are part of the workflow rather than an afterthought.
- **Wez**
  - Basics: url `null`, privateLabel as in the test, schemaType `SoftwareApplication`, applicationCategory `DeveloperApplication`, service `development`, license `null`.
  - Facts: "1 300+" commits / commits; "6" agenter / agents; "3" klienter (desktop, mobil, CLI) / clients (desktop, mobile, CLI).
  - What it is: a local-first agent harness where every request, tool call, file change, cost and approval is visible while it runs.
  - How it's built: a Bun engine with an agent loop, providers, tools and SQLite state, written with Effect. React client, an Electrobun desktop app and Capacitor mobile clients. An MCP server lets Claude Code or Codex drive the crew. Worktrees and file leases support parallel agents, there is a fleet of machines over Tailscale, and prompt caching is designed in.
  - What it shows: it's how Anton builds, with the same visibility clients get.
- **Lingo**
  - Basics: url `https://lingo.antonwester.se` only if it responds with 200 when you write this task (`curl -sI https://lingo.antonwester.se | head -1`), otherwise `null`. schemaType `SoftwareApplication`, applicationCategory `BusinessApplication`, service `development`, license `null`.
  - Facts: "AI-native"; "Self-hosted" / "Self-hosted"; "SDK, API, CLI".
  - What it is: one place for product, content and engineering teams to manage translation work, reviews, releases and delivery, with AI doing the first pass.
  - How it's built: React, TypeScript, Bun and Hono, with an SDK, API and CLI.

Headings: `h1` is `"{name}: {tagline}"`.

- [ ] **Step 4: Write `src/content/cities.ts`**

Carry over `names`, `region`, `nearbyAreas` and `deliveryMode` for the eight non-Gothenburg cities from `src/data/portfolio-shared.ts` (`cityDefinitions`). Rewrite `localFocus` toward AI, one unique sentence pair per city, using the local industries already named there:

| City | Focus angle |
| --- | --- |
| Trollhättan | automotive and manufacturing |
| Borås | textile and e-commerce |
| Varberg | tourism and coastal businesses |
| Kungsbacka | e-commerce and web platforms |
| Stenungsund | process industry and the chemical cluster |
| Kungälv | growing product teams |
| Partille | service businesses east of Gothenburg |
| Ale | logistics along the E45 corridor |

Fill the rest from these templates:

- sv:
  - title `AI-konsult i ${name} | Anton Wester`; `h1` `AI-konsult i ${name}`.
  - paragraphs:
    1. `Jag hjälper företag i ${name} och ${region} att hitta var AI och automation lönar sig, bygga lösningarna och underhålla dem.`
    2. `De flesta uppdrag börjar med en kartläggning på plats och fortsätter sedan på distans, med möten i ${name} när det behövs.`
  - faq:
    - `Tar du uppdrag som AI-konsult i ${name}?` Answer about working with companies there, on site when needed.
    - `Vilka AI-projekt passar företag i ${name}?` Answer using that city's focus angle.
    - `Kan du jobba på plats i ${name}?` Answer with `deliveryMode`.
- en: the same, with title `AI Consultant in ${name} | Anton Wester` and h1 `AI consultant in ${name}`.

Write each city's `seo.description` by hand so it lands at 120–160 characters and mentions the focus angle. Choose `neighbours` from the city's two nearest neighbours in `CITY_IDS`.

- [ ] **Step 5: Run tests**

Run: `npm test -- cases-cities`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/content/cases.ts src/content/cities.ts test/unit/cases-cities.test.ts
git commit -m "feat: case and city copy in Swedish and English"
```

---

### Task 6: SEO library

**Files:**
- Create: `src/lib/seo.ts`, `test/unit/seo.test.ts`

**Interfaces:**
- Consumes: routes (Task 2); `site`, types, content (Tasks 3–5).
- Produces:
  - `HeadProps { title; description; locale; canonical; alternates: Alternate[]; ogImage; ogImageAlt; jsonLd: Ld[]; noindex?: boolean }` and `type Ld = Record<string, unknown>`.
  - Builders: `organizationLd()`, `personLd(locale)`, `websiteLd()`, `webPageLd(o)`, `breadcrumbLd(url, crumbs)`, `professionalServiceLd(locale, url)`, `serviceLd(o)`, `faqLd(url, faqs)`, `softwareLd(o)`.
  - Head builders: `headForHome(locale)`, `headForService(id, locale)`, `headForCase(id, locale)`, `headForCity(id, locale)`.

- [ ] **Step 1: Write the failing test**

`test/unit/seo.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { allPages, LOCALES, urlFor } from '../../src/content/routes';
import { headForCase, headForCity, headForHome, headForService, personLd } from '../../src/lib/seo';
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
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- seo`
Expected: FAIL, the module doesn't exist.

- [ ] **Step 3: Implement `src/lib/seo.ts`**

```ts
import { cases } from '../content/cases';
import { cities } from '../content/cities';
import { home } from '../content/home';
import {
  CITY_IDS, SITE_URL, SERVICE_IDS, alternatesFor, ogPath, urlFor,
  type Alternate, type CaseId, type CityId, type Locale, type PageRef, type ServiceId,
} from '../content/routes';
import { services } from '../content/services';
import { site } from '../content/site';
import type { Faq } from '../content/types';

export type Ld = Record<string, unknown>;
export interface HeadProps {
  title: string;
  description: string;
  locale: Locale;
  canonical: string;
  alternates: Alternate[];
  ogImage: string;
  ogImageAlt: string;
  jsonLd: Ld[];
  noindex?: boolean;
}
export interface Crumb { name: string; url: string }

const CTX = 'https://schema.org';
const ORG = `${SITE_URL}/#organization`;
const PERSON = `${SITE_URL}/#anton-wester`;
const WEBSITE = `${SITE_URL}/#website`;
const lang = (l: Locale) => (l === 'sv' ? 'sv-SE' : 'en');

export const organizationLd = (): Ld => ({
  '@context': CTX, '@type': 'Organization', '@id': ORG, name: site.company, url: SITE_URL,
  email: site.email, logo: `${SITE_URL}/monogram.svg`, founder: { '@id': PERSON }, sameAs: [site.linkedin, site.github],
});

export const personLd = (l: Locale): Ld => ({
  '@context': CTX, '@type': 'Person', '@id': PERSON, name: site.name, url: SITE_URL,
  jobTitle: l === 'sv' ? 'AI-konsult och systemarkitekt' : 'AI consultant and software architect',
  worksFor: { '@id': ORG },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Chalmers University of Technology' },
  knowsAbout: ['AI agents', 'LLM integration', 'Process automation', 'Model Context Protocol', 'TypeScript', 'React', 'React Native', 'Software architecture', 'DevOps'],
  sameAs: [site.linkedin, site.github, 'https://openaudit.se', 'https://sokhem.se'],
});

export const websiteLd = (): Ld => ({
  '@context': CTX, '@type': 'WebSite', '@id': WEBSITE, url: SITE_URL, name: site.name,
  inLanguage: ['sv-SE', 'en'], publisher: { '@id': ORG },
});

export const webPageLd = (o: { url: string; title: string; description: string; locale: Locale; image: string }): Ld => ({
  '@context': CTX, '@type': 'WebPage', '@id': `${o.url}#webpage`, url: o.url, name: o.title, description: o.description,
  inLanguage: lang(o.locale), isPartOf: { '@id': WEBSITE }, about: { '@id': PERSON }, breadcrumb: { '@id': `${o.url}#breadcrumb` },
  primaryImageOfPage: { '@type': 'ImageObject', url: o.image, width: 1200, height: 630 },
});

export const breadcrumbLd = (url: string, crumbs: Crumb[]): Ld => ({
  '@context': CTX, '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
  itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })),
});

export const professionalServiceLd = (l: Locale, url: string): Ld => ({
  '@context': CTX, '@type': 'ProfessionalService', '@id': `${url}#service`, name: site.company, url,
  description: home[l].seo.description, image: `${SITE_URL}${ogPath({ kind: 'home' }, l)}`, email: site.email,
  areaServed: [{ '@type': 'City', name: l === 'sv' ? 'Göteborg' : 'Gothenburg' }, ...CITY_IDS.map((id) => ({ '@type': 'City', name: cities[id][l].name }))],
  provider: { '@id': ORG }, founder: { '@id': PERSON },
  hasOfferCatalog: {
    '@type': 'OfferCatalog', name: l === 'sv' ? 'Tjänster' : 'Services',
    itemListElement: SERVICE_IDS.map((id) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: services[id][l].name, url: urlFor({ kind: 'service', id }, l) } })),
  },
});

export const serviceLd = (o: { url: string; name: string; description: string; locale: Locale }): Ld => ({
  '@context': CTX, '@type': 'Service', '@id': `${o.url}#service`, name: o.name, description: o.description, url: o.url,
  provider: { '@id': ORG }, areaServed: { '@type': 'Country', name: o.locale === 'sv' ? 'Sverige' : 'Sweden' }, inLanguage: lang(o.locale),
});

export const faqLd = (url: string, faqs: Faq[]): Ld => ({
  '@context': CTX, '@type': 'FAQPage', '@id': `${url}#faq`,
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const softwareLd = (o: { url: string; name: string; description: string; schemaType: string; applicationCategory: string; productUrl: string | null; license: string | null }): Ld => ({
  '@context': CTX, '@type': o.schemaType, '@id': `${o.url}#product`, name: o.name, description: o.description,
  applicationCategory: o.applicationCategory, operatingSystem: 'Web', author: { '@id': PERSON },
  ...(o.productUrl ? { url: o.productUrl } : {}),
  ...(o.license ? { license: `https://opensource.org/licenses/${o.license}` } : {}),
});

function base(page: PageRef, l: Locale, title: string, description: string, crumbs: Crumb[], extra: Ld[]): HeadProps {
  const url = urlFor(page, l);
  const image = `${SITE_URL}${ogPath(page, l)}`;
  return {
    title, description, locale: l, canonical: url, alternates: alternatesFor(page), ogImage: image, ogImageAlt: title,
    jsonLd: [organizationLd(), personLd(l), websiteLd(), webPageLd({ url, title, description, locale: l, image }), breadcrumbLd(url, crumbs), ...extra],
  };
}
const homeCrumb = (l: Locale): Crumb => ({ name: l === 'sv' ? 'Start' : 'Home', url: urlFor({ kind: 'home' }, l) });

export function headForHome(l: Locale): HeadProps {
  const url = urlFor({ kind: 'home' }, l);
  const c = home[l];
  return base({ kind: 'home' }, l, c.seo.title, c.seo.description, [homeCrumb(l)], [professionalServiceLd(l, url), faqLd(url, c.faq)]);
}

export function headForService(id: ServiceId, l: Locale): HeadProps {
  const page: PageRef = { kind: 'service', id };
  const url = urlFor(page, l);
  const s = services[id][l];
  return base(page, l, s.seo.title, s.seo.description, [homeCrumb(l), { name: s.name, url }],
    [serviceLd({ url, name: s.name, description: s.seo.description, locale: l }), faqLd(url, s.faq)]);
}

export function headForCase(id: CaseId, l: Locale): HeadProps {
  const page: PageRef = { kind: 'case', id };
  const url = urlFor(page, l);
  const c = cases[id][l];
  return base(page, l, c.seo.title, c.seo.description, [homeCrumb(l), { name: c.name, url }],
    [softwareLd({ url, name: c.name, description: c.seo.description, schemaType: c.schemaType, applicationCategory: c.applicationCategory, productUrl: c.url, license: c.license })]);
}

export function headForCity(id: CityId, l: Locale): HeadProps {
  const page: PageRef = { kind: 'city', id };
  const url = urlFor(page, l);
  const c = cities[id][l];
  return base(page, l, c.seo.title, c.seo.description, [homeCrumb(l), { name: c.name, url }], [professionalServiceLd(l, url), faqLd(url, c.faq)]);
}
```

- [ ] **Step 4: Run tests**

Run: `npm test -- seo`
Expected: PASS, 36 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/seo.ts test/unit/seo.test.ts
git commit -m "feat: head and JSON-LD builders for every page type"
```

---

### Task 7: Fonts, tokens, base CSS, text measurement, Base layout, Astro config

**Files:**
- Create: `src/types/fontkit.d.ts`, `src/lib/measure.ts`, `src/lib/fonts/Archivo-wdth-wght.ttf`, `src/lib/fonts/OFL.txt`, `test/unit/measure.test.ts`, `src/styles/tokens.css`, `src/styles/base.css`, `src/layouts/Base.astro`, `astro.config.ts`
- Delete: `astro.config.mjs`

**Interfaces:**
- Consumes: `HeadProps` (Task 6), `astroRedirects` (Task 2), `site`, `ui`.
- Produces:
  - `widthEm(text: string, s?: Setting): number`, `lineSizeVw(parts: Array<string | number>, targetVw: number, gapEm: number, s?: Setting): number`, `MONUMENT: Setting`.
  - `<Base head={HeadProps} page={PageRef} intro={boolean}>` with a default slot. It sets `<html lang data-ground="fog" data-intro?>`.
  - CSS tokens: `--step-body | --step-lead | --step-sub | --step-head`, `--margin`, `--gutter`, `--section`, plus the colour tokens and the ground variables `--ground --fg --soft --gs --gs8 --gs0`.

- [ ] **Step 1: Write the failing measurement test**

`test/unit/measure.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { lineSizeVw, widthEm } from '../../src/lib/measure';

describe('measure', () => {
  it('measures the name in Archivo at wdth 100, wght 800', () => {
    expect(widthEm('ANTON')).toBeGreaterThan(2.8);
    expect(widthEm('ANTON')).toBeLessThan(4.2);
    expect(widthEm('WESTER')).toBeGreaterThan(widthEm('ANTON'));
  });
  it('uppercases before measuring, as the CSS does', () => {
    expect(widthEm('anton')).toBeCloseTo(widthEm('ANTON'), 5);
  });
  it('sizes the hero line to roughly 9–11vw for 82 % of the viewport', () => {
    const vw = lineSizeVw(['ANTON', 0.95, 'WESTER'], 82, 0.12);
    expect(vw).toBeGreaterThan(8);
    expect(vw).toBeLessThan(11.5);
  });
  it('handles Swedish letters', () => {
    expect(widthEm('SÖKHEM')).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- measure`
Expected: FAIL, the module doesn't exist.

- [ ] **Step 3: Vendor the variable TTF, then implement the fontkit declaration and `src/lib/measure.ts`**

fontkit's `getVariation()` crashes on WOFF2 files: it re-parses the compressed stream as TrueType, and `head` comes back undefined. So measurement uses Google's variable TTF. It is the same design source fontsource builds its WOFF2 files from, and it is used only at build time, never shipped.

```bash
mkdir -p src/lib/fonts
curl -sL -o src/lib/fonts/Archivo-wdth-wght.ttf "https://github.com/google/fonts/raw/main/ofl/archivo/Archivo%5Bwdth%2Cwght%5D.ttf"
curl -sL -o src/lib/fonts/OFL.txt "https://github.com/google/fonts/raw/main/ofl/archivo/OFL.txt"
node -e "const f=require('fontkit').openSync('src/lib/fonts/Archivo-wdth-wght.ttf');console.log(Object.keys(f.variationAxes))"
```

Expected output: `[ 'wght', 'wdth' ]`.

`src/types/fontkit.d.ts`:

```ts
declare module 'fontkit' {
  export interface GlyphRun { advanceWidth: number }
  export interface Font {
    unitsPerEm: number;
    layout(text: string): GlyphRun;
    getVariation(settings: Record<string, number>): Font;
  }
  export function openSync(path: string): Font;
}
```

`src/lib/measure.ts`:

```ts
import { resolve } from 'node:path';
import * as fontkit from 'fontkit';

// Build-time only. Vitest and astro build both run from the repo root.
const FONT_FILE = resolve(process.cwd(), 'src/lib/fonts/Archivo-wdth-wght.ttf');

export interface Setting { wdth: number; wght: number; tracking: number }
export const MONUMENT: Setting = { wdth: 100, wght: 800, tracking: -0.02 };

let font: fontkit.Font | null = null;
const load = (): fontkit.Font => (font ??= fontkit.openSync(FONT_FILE));

/** Advance width of `text` in em, uppercased like the monument CSS. */
export function widthEm(text: string, s: Setting = MONUMENT): number {
  const f = load().getVariation({ wdth: s.wdth, wght: s.wght });
  const upper = text.toLocaleUpperCase('sv-SE');
  return f.layout(upper).advanceWidth / f.unitsPerEm + s.tracking * [...upper].length;
}

/** Font size in vw so that the parts (words, or em-widths given as numbers) span `targetVw`. */
export function lineSizeVw(parts: Array<string | number>, targetVw: number, gapEm: number, s: Setting = MONUMENT): number {
  const em = parts.reduce<number>((sum, p) => sum + (typeof p === 'number' ? p : widthEm(p, s)), 0) + gapEm * (parts.length - 1);
  return Math.round((targetVw / em) * 1000) / 1000;
}
```

- [ ] **Step 4: Run the measurement tests**

Run: `npm test -- measure`
Expected: PASS, 4 tests.

- [ ] **Step 5: Write `src/styles/tokens.css`**

```css
@import '@fontsource-variable/archivo/wdth.css';

/* Arial metrics adjusted toward Archivo so the swap does not shift layout */
@font-face {
  font-family: 'Archivo Fallback';
  src: local('Arial');
  size-adjust: 104%;
  ascent-override: 84%;
  descent-override: 20%;
  line-gap-override: 0%;
}

@property --ground { syntax: '<color>'; inherits: true; initial-value: #E7E9E4; }
@property --fg { syntax: '<color>'; inherits: true; initial-value: #0C1E22; }
@property --soft { syntax: '<color>'; inherits: true; initial-value: #4C5A5B; }
@property --gs { syntax: '<color>'; inherits: true; initial-value: #DADED7; }

:root {
  --fog: #E7E9E4; --fog-2: #DADED7; --ink: #0C1E22; --ink-2: #13292E; --ink-3: #1B363C;
  --muted: #4C5A5B; --muted-ink: #93A6A8; --signal: #FF5A1F;

  --font: 'Archivo Variable', 'Archivo Fallback', system-ui, sans-serif;
  --step-body: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem);
  --step-sub: clamp(1.5rem, 1.1rem + 1.4vw, 2.1rem);
  --step-head: clamp(2.5rem, 1.2rem + 4.4vw, 5rem);

  --margin: clamp(16px, 2.2vw, 32px);
  --gutter: clamp(12px, 1.6vw, 24px);
  --section: clamp(96px, 9vw, 200px);

  --ease-out: cubic-bezier(.16, 1, .3, 1);
  --ease-in-out: cubic-bezier(.65, 0, .35, 1);

  --ground: var(--fog); --fg: var(--ink); --soft: var(--muted); --gs: var(--fog-2);
}
:root[data-ground='fog2'] { --ground: var(--fog-2); --fg: var(--ink); --soft: var(--muted); --gs: #CED3CB; }
:root[data-ground='ink'] { --ground: var(--ink); --fg: var(--fog); --soft: var(--muted-ink); --gs: #1A2C30; }
```

Before committing, compute the real fallback metrics:

```bash
node -e "const fk=require('fontkit');const a=fk.openSync('src/lib/fonts/Archivo-wdth-wght.ttf').getVariation({wdth:100,wght:400});const b=fk.openSync('/System/Library/Fonts/Supplemental/Arial.ttf');const s='Jag hittar var AI och automation lönar sig';const w=(f)=>f.layout(s).advanceWidth/f.unitsPerEm;console.log('size-adjust',(w(a)/w(b)*100).toFixed(1)+'%','ascent',(a.ascent/a.unitsPerEm*100/(w(a)/w(b))).toFixed(1)+'%','descent',(-a.descent/a.unitsPerEm*100/(w(a)/w(b))).toFixed(1)+'%')"
```

Put the printed values into the `Archivo Fallback` face.

- [ ] **Step 6: Write `src/styles/base.css`**

```css
*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body {
  margin: 0; font-family: var(--font); font-size: var(--step-body); line-height: 1.5;
  background: var(--ground); color: var(--fg); -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility;
}
.ground-ready body { transition: --ground .8s var(--ease-in-out), --gs .8s var(--ease-in-out), --fg .45s cubic-bezier(.33,1,.68,1), --soft .45s cubic-bezier(.33,1,.68,1); }
h1, h2, h3, p, ol, ul, dl, dd, figure { margin: 0; }
a { color: inherit; }
img, svg { display: block; max-width: 100%; }
button, input, select, textarea { font: inherit; color: inherit; }
:focus-visible { outline: 2px solid var(--signal); outline-offset: 3px; }
::selection { background: var(--signal); color: var(--ink); }

.wrap { padding-inline: var(--margin); }
.grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: var(--gutter); }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.skip { position: absolute; left: var(--margin); top: -4rem; z-index: 50; background: var(--ink); color: var(--fog); padding: .7rem 1rem; }
.skip:focus { top: 1rem; }

.head { font-size: var(--step-head); line-height: .95; letter-spacing: -.03em; font-weight: 800; font-stretch: 108%; max-width: 18ch; }
.lead { font-size: var(--step-lead); line-height: 1.35; }
.sub { font-size: var(--step-sub); line-height: 1.05; letter-spacing: -.02em; font-weight: 800; font-stretch: 112%; }

.btn {
  display: inline-flex; align-items: center; min-height: 48px; padding: .9rem 1.5rem; background: var(--signal); color: var(--ink);
  font-weight: 650; text-decoration: none; position: relative; overflow: hidden; isolation: isolate; border: 0; cursor: pointer;
}
.btn::before { content: ''; position: absolute; inset: 0; background: var(--fg); transform: translateY(101%); transition: transform .45s var(--ease-in-out); z-index: -1; }
.btn:hover { color: var(--ground); }
.btn:hover::before { transform: none; }
.lnk {
  font-weight: 600; text-decoration: none; padding-bottom: .15em;
  background: linear-gradient(currentColor, currentColor) 0 100% / 100% .08em no-repeat; transition: background-size .4s var(--ease-in-out);
}
.lnk:hover { background-size: 0 .08em; background-position: 100% 100%; }

/* sections paint their own colour without JS; with JS the body ground crossfades instead */
[data-ground='ink'] { background: var(--ink); color: var(--fog); }
[data-ground='fog2'] { background: var(--fog-2); color: var(--ink); }
.js [data-ground] { background: transparent; color: inherit; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
}
```

- [ ] **Step 7: Write `src/layouts/Base.astro`**

```astro
---
import '../styles/tokens.css';
import '../styles/base.css';
import archivoLatin from '@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2?url';
import type { HeadProps } from '../lib/seo';
import { site } from '../content/site';
import { ui } from '../content/ui';

interface Props { head: HeadProps; intro?: boolean }
const { head, intro = false } = Astro.props;
const t = ui[head.locale];
const ogLocale = head.locale === 'sv' ? 'sv_SE' : 'en_US';
const boot = `(function(){var d=document.documentElement;d.classList.add('js');if(d.hasAttribute('data-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('pre');setTimeout(function(){d.classList.remove('pre');d.classList.add('intro-done')},3500)}else{d.classList.add('intro-done')}})();`;
---
<!doctype html>
<html lang={head.locale} data-ground="fog" data-intro={intro ? '' : undefined}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{head.title}</title>
    <meta name="description" content={head.description} />
    {head.noindex ? <meta name="robots" content="noindex" /> : <meta name="robots" content="index,follow,max-image-preview:large" />}
    <link rel="canonical" href={head.canonical} />
    {head.alternates.map((a) => <link rel="alternate" hreflang={a.hreflang} href={a.href} />)}
    <link rel="preload" href={archivoLatin} as="font" type="font/woff2" crossorigin />
    <meta name="theme-color" content="#E7E9E4" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={site.name} />
    <meta property="og:title" content={head.title} />
    <meta property="og:description" content={head.description} />
    <meta property="og:url" content={head.canonical} />
    <meta property="og:image" content={head.ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content={head.ogImageAlt} />
    <meta property="og:locale" content={ogLocale} />
    <meta name="twitter:card" content="summary_large_image" />
    <script is:inline set:html={boot}></script>
    {head.jsonLd.map((ld) => <script type="application/ld+json" set:html={JSON.stringify(ld)} />)}
    <script defer src="https://cloud.umami.is/script.js" data-website-id={site.umamiId}></script>
  </head>
  <body>
    <a class="skip" href="#main">{t.skip}</a>
    <slot />
    <script>
      import '../scripts/theme';
      import '../scripts/smooth';
    </script>
  </body>
</html>
```

Umami loads without an `integrity` attribute on purpose. cloud.umami.is updates `script.js` in place, so a pinned hash would silently break analytics. This matches the live site today.

`theme.ts` and `smooth.ts` arrive in Task 11. Until then, create both as empty files containing `export {};` so the build passes.

- [ ] **Step 8: Replace the Astro config**

Delete `astro.config.mjs` and create `astro.config.ts`:

```ts
import { defineConfig } from 'astro/config';
import { astroRedirects, SITE_URL } from './src/content/routes';

export default defineConfig({
  site: SITE_URL,
  redirects: astroRedirects(),
  build: { inlineStylesheets: 'auto' },
});
```

- [ ] **Step 9: Verify the build still works with the old pages**

The old pages still use the old layout and the old Swedish `/sv/` page. Astro will complain that the redirect `/sv` collides with `src/pages/sv/index.astro`, so delete these now:

```bash
git rm src/pages/sv/index.astro src/pages/\[city\].astro
mkdir -p src/scripts && printf 'export {};\n' > src/scripts/theme.ts && printf 'export {};\n' > src/scripts/smooth.ts
npm run build && npm test && npm run typecheck
```

Expected: the build succeeds. `dist/sv/index.html` contains `http-equiv="refresh"` and `<link rel="canonical" href="https://antonwester.se/">`. `dist/partille/index.html` redirects to `/sv/partille/`. Tests pass and typecheck is clean.

- [ ] **Step 10: Commit**

```bash
git add -A src/types src/lib/measure.ts src/lib/fonts src/styles/tokens.css src/styles/base.css src/layouts/Base.astro src/scripts astro.config.ts test/unit/measure.test.ts
git add -u
git commit -m "feat: tokens, base styles, Archivo self-hosting, text measurement, base layout and legacy redirects"
```

---

### Task 8: Home page components

**Files:**
- Create: `src/components/{Nav,Monument,Portrait,HomeHero,LogoBar,Scan,Approach,Work,CaseRow,About,Faq,Contact,Footer}.astro`, `src/templates/HomePage.astro`, `test/dist/helpers.ts`, `test/dist/home.test.ts`
- Modify: `src/pages/index.astro`, `src/pages/en/index.astro`

**Interfaces:**
- Consumes: everything from Tasks 2–7.
- Produces:
  - `<Nav locale page>`
  - `<Monument words={string[]} portrait={boolean} as="h1"|"p" tail?={string} setting?={Setting} targetVw?={number} gapEm?={number}>`, which renders `[data-monument]` holding `[data-letter]` spans and `data-monument-area` on the wrapper.
  - `<Portrait size="inline"|"large" locale>`
  - `<LogoBar locale>`
  - `<Scan locale>`, which renders `[data-scan]` with `<script type="application/json" data-scan-data>`
  - `<Approach locale>`, `<Work locale>`, `<CaseRow id locale flip>`, `<About locale>`
  - `<Faq id heading items>`
  - `<Contact locale inquiry?>`, which renders `form[data-contact]` with `textarea[name=message]` and `input[name=estimate]`
  - `<Footer locale page>`
  - `<HomePage locale>`
  - dist helpers `readDist(path): HTMLElement`, `distPath(path): string`

Visual rules for every component in this task:
- Port the CSS from the mockup's selector named in brackets, converting units with this table.
- The mockup's `.page` becomes `body`. Its `--fog…--signal` values are already in `tokens.css`.

| Mockup | Site |
| --- | --- |
| `--s-body` 1.15cqw | `var(--step-body)` |
| `--s-lead` 1.6cqw | `var(--step-lead)` |
| `--s-sub` 2.3cqw | `var(--step-sub)` |
| `--s-head` 5.2cqw | `var(--step-head)` |
| `--m` 2.2cqw | `var(--margin)` |
| `--gap` 1.6cqw | `var(--gutter)` |
| section padding 9–11cqw | `var(--section)` |
| any other `Ncqw` | `calc(N * 1vw)`, wrapped in `clamp()` when it sizes text or touch targets (minimum 13px text, 44px targets) |
| hero height 62.5cqw | `min-height: 100svh` |

- [ ] **Step 1: Write the dist helper and the failing home test**

`test/dist/helpers.ts`:

```ts
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse, type HTMLElement } from 'node-html-parser';

export const DIST = join(process.cwd(), 'dist');
export const distPath = (path: string) => join(DIST, path.replace(/^\//, ''), path.endsWith('.xml') || path.endsWith('.txt') ? '' : 'index.html');
export function readDist(path: string): HTMLElement {
  const file = distPath(path);
  if (!existsSync(file)) throw new Error(`missing ${file}`);
  return parse(readFileSync(file, 'utf8'));
}
export const readText = (file: string) => readFileSync(join(DIST, file), 'utf8');
```

`test/dist/home.test.ts`:

```ts
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
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm run test:dist -- home`
Expected: FAIL. The old page has neither `data-client` nor `[data-scan]`, and `h1` doesn't contain "AI-konsult i Göteborg".

- [ ] **Step 3: Write `Monument.astro`**

```astro
---
import { lineSizeVw, MONUMENT, type Setting } from '../lib/measure';
import Portrait from './Portrait.astro';
import type { Locale } from '../content/routes';

interface Props { words: string[]; portrait?: boolean; as?: 'h1' | 'p'; tail?: string; locale: Locale; setting?: Setting; targetVw?: number; gapEm?: number }
const { words, portrait = false, as: Tag = 'h1', tail, locale, setting = MONUMENT, targetVw = 82, gapEm = 0.12 } = Astro.props;
const PORTRAIT_EM = 0.95;
const desktop = lineSizeVw(portrait ? [words[0], PORTRAIT_EM, ...words.slice(1)] : words, targetVw, gapEm, setting);
const longest = words.reduce((a, b) => (b.length > a.length ? b : a));
const mobile = lineSizeVw([longest], 88, 0, setting);
---
<div class="monument-area" data-monument-area style={`--mono-d:${desktop}vw;--mono-m:${mobile}vw;--mono-wdth:${setting.wdth};--mono-track:${setting.tracking}em`}>
  <Tag class="monument" data-monument>
    <span class="line" aria-hidden="true">
      {words.map((w, wi) => (
        <>
          {wi === 1 && portrait && <span class="slot"><Portrait size="inline" locale={locale} /></span>}
          <span class="word">{[...w].map((ch) => <span class="ch" data-letter>{ch}</span>)}</span>
        </>
      ))}
    </span>
    <span class="sr-only">{words.join(' ')}</span>
    {tail && <><span class="sr-only">, </span><span class="tail">{tail}</span></>}
  </Tag>
</div>
<style>
  .monument-area { touch-action: pan-y; }
  .monument { margin: 0; font-weight: 800; text-transform: uppercase; letter-spacing: var(--mono-track); line-height: .8; }
  .line { display: flex; justify-content: center; align-items: baseline; gap: .12em; font-size: var(--mono-d); white-space: nowrap; user-select: none; }
  .word { display: flex; }
  .ch { display: inline-block; font-variation-settings: 'wdth' var(--mono-wdth); transform-origin: 50% 100%;
    transition: font-variation-settings 1.1s var(--ease-out), opacity .6s ease, transform 1s var(--ease-out); }
  :global(.intro-done) .ch { transition: none; }
  :global(.pre) .ch { font-variation-settings: 'wdth' 62; opacity: 0; transform: translateY(18%); }
  .slot { width: .95em; height: .74em; align-self: baseline; overflow: hidden; clip-path: inset(0); transition: clip-path 1.2s var(--ease-in-out) .45s; }
  :global(.pre) .slot { clip-path: inset(0 50% 0 50%); }
  .tail { display: block; font-size: var(--step-lead); line-height: 1.35; font-weight: 700; text-transform: none; letter-spacing: 0; }
  @media (max-width: 640px) {
    .line { flex-direction: column; align-items: center; font-size: var(--mono-m); gap: .08em; }
    .slot { width: calc(100vw - 2 * var(--margin)); height: auto; aspect-ratio: 3 / 2; font-size: 1rem; }
  }
</style>
```

Each `.ch` also gets an inline `style="transition-delay:{index * 55}ms"` computed in the map. Index the letters across both words: `ANTON` is 0–4 and `WESTER` is 5–10.

- [ ] **Step 4: Write the remaining components**

Each one, with its mockup selector:

- **`Portrait.astro`** (`.portrait`).
  - `const found = import.meta.glob('../assets/portrait.{jpg,jpeg,png,webp}', { eager: true });`
  - If a file is found, render `<Image src={…} alt={ui[locale].portraitAlt} widths={[480, 960, 1600]} sizes=… loading={size==='inline'?'eager':'lazy'} fetchpriority={size==='inline'?'high':'auto'} />`.
  - Otherwise render a `<div class="ph" role="img" aria-label={ui[locale].portraitPlaceholder}>` with the silhouette SVG from the mockup.
- **`Nav.astro`** (`.nav`, `.mark`).
  - A `<header>` with the monogram link to `pathFor({kind:'home'}, locale)`.
  - A `<nav aria-label={t.navLabel}>` with four links. On the home page they point to `#work`, `#approach`, `#about` and `#contact`; elsewhere to `{homePath}#work` and so on.
  - The language link: `<a data-lang-switch href={pathFor(page, otherLocale(locale))} hreflang={other} lang={other}>{t.switchLabel}</a>`.
  - The monogram is inline SVG: the two paths from `docs/superpowers/specs/assets/direction-a/monogram.svg`, with fills `var(--fg)` and `var(--signal)`.
- **`HomeHero.astro`** (`.hero`, `.hfoot`, `.lede`, `.hactions`).
  - `<section class="hero" data-ground="fog">` wrapping `<Nav>`.
  - `<Monument words={['Anton','Wester']} portrait as="h1" tail={home[l].h1Tail} locale>`.
  - `<p class="offer">{home[l].offer}</p>`.
  - Actions: `<a class="lnk" href="#scan">{t.estimate}</a>` and `<a class="btn" href={site.booking} rel="noopener">{t.book}</a>`.
  - Then `<LogoBar>`.
  - The H1 tail is positioned with grid so it reads as the bold start of the offer sentence.
  - `.pre .offer, .pre .hactions { opacity:0; transform:translateY(12px) }` with delays .95s and 1.08s; `.pre .nav { opacity:0 }` with delay .2s; `.pre .axis { transform: translateY(100%) }` with delay 1.2s.
- **`LogoBar.astro`** (`.axis`, `.say`, `.track`, `.logo`, `.fm`, `.zd`).
  - `<div class="axis" aria-label={t.workedWith}>` holding `<p class="say">{t.workedWith}</p>` and a `<div class="track">` that renders `CLIENTS` twice. The second copy is `aria-hidden="true"`. Each item carries `data-client={name}` (first copy only).
  - `mask` clients: `<span class="logo" role="img" aria-label={name} style={--src:url(file);--r:ratio;--h:height}>`.
  - `symbol-text`: a mask span plus the text.
  - `text`: the text plus `<i>` for the dot.
  - `--logo-u: clamp(14px, 1.15vw, 18px)`, and logo height is `calc(var(--h) * var(--logo-u))`.
  - `.axis:hover .track, .axis:focus-within .track { animation-play-state: paused }`.
  - Gradients: `.say::after` uses `linear-gradient(90deg, var(--gs), color-mix(in srgb, var(--gs) 80%, transparent) 30%, transparent)`, and the right fade uses the same in reverse.
  - Logo fill is `var(--fg)`.
  - Under reduced motion, `.track { animation: none; flex-wrap: wrap }` and the duplicate copy is hidden.
- **`Scan.astro`** (`.scan`, `.fns`, `.fn`, `.steps`, `.step`, `.seg`, `.result`, `.num`, `.fine`).
  - `<section id="scan" class="scan" data-ground="ink">` with an `h2.head` and `p.lead`.
  - `<div class="tool" data-scan>`:
    - `<div role="group" aria-label={t.scan.functionsLabel}>` holding five `<button class="fn" type="button" data-fn={id} aria-pressed>`.
    - `<ol class="steps">` with the default function's steps as `<li class="step" data-step>`. Each has its label and `<span class="seg" role="group" aria-label={t.scan.stepModeLabel}>` with three `<button type="button" data-mode aria-pressed>`.
    - `<label for="scan-hours">{t.scan.hoursLabel} <b data-hours>25</b></label>` and `<input id="scan-hours" type="range" min="2" max="120" value="25">`.
    - `.step` has `transition: opacity .35s ease, transform .5s var(--ease-out)`, and `.step.out { opacity: 0; transform: translateX(16px) }`, which `scan.ts` uses for the stagger.
    - `<p class="num" aria-live="polite"><span data-out>≈ {formatHours(hoursPerYear(25, defaults), l)}</span> h<small data-weeks>{fillTemplate(t.scan.yearBack,{weeks})}</small></p>`, computed on the server with the scan maths from Task 3.
    - `<a class="btn" data-scan-send href={mailto with subject t.scan.mailSubject}>{t.scan.send}</a>`, then `<p class="fine">{t.scan.method}</p>`.
  - `<script type="application/json" data-scan-data set:html={JSON.stringify({ functions: scan[l], modes: t.scan.modes, yearBack: t.scan.yearBack, message: t.scan.message, locale: l })} />`.
  - `<script>import '../scripts/scan';</script>`.
  - Phone (≤ 640px): `.fns` becomes a single horizontally scrolling row, and steps stack with `.seg` under each label.
- **`Approach.astro`** (`.approach`, `.stage`, `.stage-copy`).
  - `<section id="approach" class="approach grid" data-ground="fog">` with `<h2 class="sr-only">{l==='sv'?'Arbetssätt':'Approach'}</h2>`.
  - For each stage: `<p class="stage" style={--wd}>{word}</p>`, then `<p class="stage-copy"><b>{lead}</b> {body} <a class="lnk" href={pathFor({kind:'service',id:service}, l)}>{linkLabel}</a></p>`.
- **`Work.astro` and `CaseRow.astro`** (`.work`, `.case`, `.case.flip`, `.facts`).
  - `<section id="work" data-ground="fog2">` with `h2.head`, then CaseRow for `openaudit`, `sokhem` (flip) and `wez`, then `<p class="also" set:html={home[l].alsoLine}>`.
  - The English `alsoLine` link is `/en/case/lingo/`.
  - CaseRow:
    - Find the screenshot with `const shots = import.meta.glob<{ default: ImageMetadata }>('../assets/shots/*.png', { eager: true })`, keyed by `../assets/shots/{id}.png`.
    - When it exists, render `<Image>` with `widths={[640, 1280]}`, `sizes="(max-width: 640px) 100vw, 58vw"` and `loading="lazy"`.
    - When it doesn't, render a `.shot-ph` block in `var(--gs)` with the product name set large in `var(--soft)`. Never show another product's screenshot.
    - Then `h3.sub`, the tagline paragraph and `<dl class="facts">`.
    - Then either `<a class="lnk" href={pathFor case}>{t.work.readCase}</a>` plus an external `t.work.visit` link when `url` is set, or `privateLabel`.
  - Create `src/assets/shots/` with the two captured screenshots now. Task 12 adds Lingo and Wez.

    ```bash
    mkdir -p src/assets/shots
    cp docs/superpowers/specs/assets/direction-a/shot-openaudit.png src/assets/shots/openaudit.png
    cp docs/superpowers/specs/assets/direction-a/shot-sokhem.png src/assets/shots/sokhem.png
    ```

- **`About.astro`**.
  - `<section id="about" class="about grid" data-ground="fog">`: `<Portrait size="large">` in columns 1–5, and in columns 7–12 the `h2.head`, the bio paragraphs in `.lead`, and the experience `<table>` (no borders; rows separated by `background: var(--gs)` on odd rows; columns years | role | org).
  - Then the stack sentence and links (LinkedIn, GitHub, CV with `download`).
  - Phone: a single column, portrait first.
- **`Faq.astro`**.
  - `<section id={id} data-ground={ground ?? 'fog'}>` with `h2.head` and one `<details>` per item: `<summary class="sub">`, then `<p class="lead">`.
  - The summary marker is replaced by a `+` drawn with two `::before`/`::after` bars that rotate 45° on `[open]`. Only transform transitions.
- **`Contact.astro`** (`.close`).
  - `<section id="contact" class="close" data-ground="ink">` with `h2.head`, a `<p>` holding the availability line, the `.btn` booking link and the email link.
  - Then `<form data-contact method="POST" action={site.formAction}>` with:
    - the hidden fields `_subject`, `_captcha=false`, `_template=table`, and `estimate`;
    - a honeypot `_honey`;
    - `input[name=name]`, `input[name=email]` and `input[name=company]`, `select[name=inquiry]` (options from `t.contact.inquiries`, with the `inquiry` prop preselected when given), and `textarea[name=message]`;
    - a submit `<button class="btn">` and `<p data-form-status aria-live="polite">`.
  - Labels sit above the fields. Fields have a 1px `var(--soft)` bottom border, which a form may have. `<script>import '../scripts/form';</script>`.
- **`Footer.astro`** (`.bigname`, `.small-row`).
  - `<footer data-ground="ink">` with:
    - `<Monument words={['Anton','Wester']} as="p" locale setting={{ wdth: 125, wght: 800, tracking: -0.03 }} targetVw={94} gapEm={0.25}>`, filling the width.
    - Two lists of links: services (four) and cities ("AI-konsult i {name}" for the eight).
    - `t.footer.org`, the email, LinkedIn, GitHub, the CV and the language switch.
- **`HomePage.astro`**.
  - `<Base head={headForHome(l)} intro>` wrapping `<HomeHero/>`, then `<main id="main">` with Scan, Approach, Work, About, `<Faq id="faq" heading={t.faqHeading} items={home[l].faq}/>` and Contact, then the Footer.
  - `<script>import '../scripts/motion';</script>` (an empty stub `export {};` until Task 11).

- [ ] **Step 5: Point the home pages at the new template**

`src/pages/index.astro`:

```astro
---
import HomePage from '../templates/HomePage.astro';
---
<HomePage locale="sv" />
```

`src/pages/en/index.astro`:

```astro
---
import HomePage from '../../templates/HomePage.astro';
---
<HomePage locale="en" />
```

- [ ] **Step 6: Run the dist tests**

Run: `npm run test:dist -- home`
Expected: PASS, 11 tests.

- [ ] **Step 7: Look at it**

Run `npm run preview`, then screenshot `/` at 1440, 768 and 390 px with the Playwright MCP tools. Compare with the mockup at the same widths and fix differences in spacing, sizes and colours before committing.

- [ ] **Step 8: Commit**

```bash
git add src/components src/templates src/pages/index.astro src/pages/en/index.astro src/assets/shots src/scripts/motion.ts test/dist
git commit -m "feat: new home page in both languages"
```

---

### Task 9: Service, case, city and 404 pages; remove the old site

**Files:**
- Create: `src/components/PageHero.astro`, `src/templates/{ServicePage,CasePage,CityPage}.astro`, `src/pages/sv/[slug].astro`, `src/pages/en/[slug].astro`, `src/pages/sv/case/[id].astro`, `src/pages/en/case/[id].astro`, `src/pages/404.astro`, `test/dist/pages.test.ts`
- Delete: `src/pages/sv/[city].astro`, `src/pages/en/[city].astro`, `src/pages/og/`, `src/components/PortfolioPage.astro`, `src/layouts/Layout.astro`, `src/data/`, `src/styles/global.css`, `src/assets/background.svg`, `src/assets/astro.svg`, `public/og-image.svg`

**Interfaces:**
- Consumes: the components from Task 8 and the heads from Task 6.
- Produces: all 34 canonical pages and a 404 page.

- [ ] **Step 1: Write the failing test**

`test/dist/pages.test.ts`:

```ts
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
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm run test:dist -- pages`
Expected: FAIL, because `/sv/ai-kartlaggning/` and the other new pages don't exist yet.

- [ ] **Step 3: Write `PageHero.astro` and the three templates**

- **`PageHero.astro`**: `<section class="page-hero" data-ground="fog">` with `<Nav>`. It accepts `h1`, `intro` and an optional `monument` (string[]).
  - With a monument (case pages), render `<Monument words={monument} as="p">` above `<h1 class="sub">`.
  - Otherwise render `<h1 class="head">`, then `p.lead` and the booking `.btn`.
- **`ServicePage.astro`**: `<Base head={headForService(id,l)}>` with `PageHero`, then `<main id="main">`:
  - The sections: each `h2.sub` with paragraphs in a reading column (`max-width: 62ch`, starting at column 4) and lists as `<ul>`.
  - "Så går det till" as `<ol class="steps">` with large ordinal numbers. They are a real sequence, so numbers are allowed.
  - `fitsWhen` as a `<ul>`.
  - `firstEngagement` in `.lead`.
  - Related cases as `<CaseRow>`.
  - For `assessment` only: `<Scan locale>` after the intro.
  - A sentence that links home with the anchor text "AI-konsult i Göteborg" / "AI consultant in Gothenburg", for example "Läs mer om hur jag arbetar som [AI-konsult i Göteborg](/)."
  - `<Faq id="faq" items={s.faq}>`, `<Contact inquiry={s.name}>`, `<Footer>`.
- **`CasePage.astro`**: `<Base head={headForCase(id,l)} intro>` with `PageHero monument={[c.name]} h1={c.h1} intro={c.tagline}`, then:
  - a full-width screenshot `<Image>` (`loading="eager"`, `fetchpriority="high"`), or the `.shot-ph` block when the file is missing, as in CaseRow;
  - "Vad det är", "Hur det är byggt" (with the stack as a comma-joined sentence), "Vad det visar", the facts `<dl>`;
  - the product link or private label, a link to the related service, a "Nästa case" link (to the next id in `CASE_IDS`, wrapping around);
  - Contact and Footer, plus the `motion` script.
- **`CityPage.astro`**: `<Base head={headForCity(id,l)} intro>` with:
  - A local hero: `<Monument words={[c.name]} as="p">`, then `<h1 class="sub">{c.h1}</h1>`, the focus paragraph in `.lead`, and the nearby areas as one line joined with " · ". This is a real list of places, set as text. Then the booking button.
  - Then: paragraphs, delivery mode, Scan, Approach, Work, `<Faq items={c.faq}>`, links to the two `neighbours`, Contact, Footer.

- [ ] **Step 4: Write the routes**

`src/pages/sv/[slug].astro`:

```astro
---
import { slugPages, type SlugPage } from '../../content/routes';
import ServicePage from '../../templates/ServicePage.astro';
import CityPage from '../../templates/CityPage.astro';

export function getStaticPaths() {
  return slugPages('sv').map(({ slug, page }) => ({ params: { slug }, props: { page } }));
}
const { page } = Astro.props as { page: SlugPage };
---
{page.kind === 'service' ? <ServicePage id={page.id} locale="sv" /> : <CityPage id={page.id} locale="sv" />}
```

`src/pages/en/[slug].astro` is the same with `'en'`.

`src/pages/sv/case/[id].astro`:

```astro
---
import { CASE_IDS, type CaseId } from '../../../content/routes';
import CasePage from '../../../templates/CasePage.astro';

export function getStaticPaths() {
  return CASE_IDS.map((id) => ({ params: { id } }));
}
const { id } = Astro.params as { id: CaseId };
---
<CasePage id={id} locale="sv" />
```

`src/pages/en/case/[id].astro` is the same with `'en'`.

`src/pages/404.astro` uses `<Base>` with a head built inline:
- title "404 | Anton Wester";
- the description written in both languages, so it is at least 120 characters;
- canonical `${SITE_URL}/404.html`, alternates `[]`, `noindex: true`, ogImage the Swedish home image, jsonLd `[]`.

The body shows the Swedish and English `notFound` texts side by side, with links to `/` and `/en/`.

- [ ] **Step 5: Delete the old site**

```bash
git rm -r src/pages/sv/\[city\].astro src/pages/en/\[city\].astro src/pages/og src/components/PortfolioPage.astro src/layouts/Layout.astro src/data src/styles/global.css src/assets/background.svg src/assets/astro.svg public/og-image.svg
```

- [ ] **Step 6: Run everything**

Run: `npm run test:dist && npm test && npm run typecheck`
Expected: PASS. That is 34 page checks, 9 redirect checks and the 404 check, plus all unit tests.

- [ ] **Step 7: Look at one page of each type**

Screenshot `/sv/ai-kartlaggning/`, `/sv/case/sokhem/` and `/sv/partille/` at 1440 and 390 px. Fix anything that doesn't match the home page's quality before committing.

- [ ] **Step 8: Commit**

```bash
git add -A src test
git commit -m "feat: service, case, city and 404 pages; remove the old portfolio"
```

---

### Task 10: Sitemap, robots and llms.txt

**Files:**
- Modify: `src/pages/sitemap.xml.ts`, `src/pages/robots.txt.ts`
- Create: `src/pages/llms.txt.ts`, `test/dist/files.test.ts`
- Delete: `public/llms.txt`

**Interfaces:**
- Consumes: routes, content.
- Produces: `/sitemap.xml`, `/robots.txt`, `/llms.txt`.

- [ ] **Step 1: Write the failing test**

`test/dist/files.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { allPages, LOCALES, urlFor, SITE_URL } from '../../src/content/routes';
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
    expect(xml.match(/xhtml:link/g)!.length).toBe(34 * 3);
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
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm run test:dist -- files`
Expected: FAIL. The sitemap still lists `/sv/`, and `llms.txt` is the old static file.

- [ ] **Step 3: Implement the three endpoints**

`src/pages/sitemap.xml.ts`:

```ts
import { allPages, alternatesFor, LOCALES, urlFor } from '../content/routes';

const esc = (s: string) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

export function GET() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = allPages().flatMap((page) =>
    LOCALES.map((l) => {
      const alts = alternatesFor(page).map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${esc(a.href)}" />`).join('\n');
      const priority = page.kind === 'home' ? '1.0' : page.kind === 'service' ? '0.9' : '0.7';
      return `  <url>\n    <loc>${esc(urlFor(page, l))}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n${alts}\n  </url>`;
    }),
  );
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
```

`src/pages/robots.txt.ts`:

```ts
import { SITE_URL } from '../content/routes';

export function GET() {
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
```

`src/pages/llms.txt.ts`:

```ts
import { cases } from '../content/cases';
import { home } from '../content/home';
import { CASE_IDS, SERVICE_IDS, urlFor } from '../content/routes';
import { services } from '../content/services';
import { site } from '../content/site';

export function GET() {
  const lines = [
    '# Anton Wester',
    '',
    `> AI-konsult i Göteborg. ${home.sv.offer}`,
    '',
    `${site.company} is Anton Wester’s consultancy in Gothenburg, Sweden. ${home.en.offer} Work is done in Swedish and English, on site in western Sweden and remotely across Sweden.`,
    '',
    '## Services',
    '',
    ...SERVICE_IDS.map((id) => `- [${services[id].sv.name}](${urlFor({ kind: 'service', id }, 'sv')}) / [${services[id].en.name}](${urlFor({ kind: 'service', id }, 'en')}): ${services[id].en.seo.description}`),
    '',
    '## Own products',
    '',
    ...CASE_IDS.map((id) => `- [${cases[id].en.name}](${urlFor({ kind: 'case', id }, 'en')}): ${cases[id].en.tagline}`),
    '',
    '## Contact',
    '',
    `- Email: ${site.email}`,
    `- Book a call: ${site.booking}`,
    `- LinkedIn: ${site.linkedin}`,
    '',
    '## Pages',
    '',
    `- Swedish home: ${urlFor({ kind: 'home' }, 'sv')}`,
    `- English home: ${urlFor({ kind: 'home' }, 'en')}`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
```

Then run `git rm public/llms.txt`.

- [ ] **Step 4: Run tests**

Run: `npm run test:dist -- files`
Expected: PASS, 4 tests.

- [ ] **Step 5: Commit**

```bash
git add -A src/pages test/dist/files.test.ts public
git commit -m "feat: sitemap, robots and llms.txt generated from the route registry"
```

---

### Task 11: Client behaviour (load sequence, lens and ripple, crossfade, smooth scroll, scan, form)

**Files:**
- Create: `src/scripts/lib/springs.ts`, `src/scripts/lib/theme-index.ts`, `test/unit/springs.test.ts`, `test/unit/theme-index.test.ts`
- Modify (replace the stubs): `src/scripts/motion.ts`, `theme.ts`, `smooth.ts`, `scan.ts`, `form.ts`

**Interfaces:**
- Consumes: the scan maths from Task 3.
- Produces:
  - `lensAt(pointerX, centerX, width): number`, `createRipple(n): Ripple`, `kickRipple(r, centers, x, sigma, strength?)`, `stepRipple(r): number`, `approach(current, target, rate?): number`
  - `activeSection(tops: number[], line: number): number`

- [ ] **Step 1: Write the failing unit tests**

`test/unit/springs.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { approach, createRipple, kickRipple, lensAt, stepRipple } from '../../src/scripts/lib/springs';

describe('lens', () => {
  it('peaks at the pointer and fades within a fifth of the width', () => {
    expect(lensAt(500, 500, 1000)).toBeCloseTo(22, 5);
    expect(lensAt(700, 500, 1000)).toBeLessThan(0.01);
  });
  it('approaches a target smoothly', () => {
    expect(approach(0, 10)).toBeCloseTo(0.85, 5);
  });
});

describe('ripple', () => {
  const centers = Array.from({ length: 11 }, (_, i) => i * 100);
  it('travels from the clicked letter to the far end', () => {
    const r = createRipple(11);
    kickRipple(r, centers, 0, 35);
    let farthest = 0;
    for (let t = 0; t < 60; t++) { stepRipple(r); farthest = Math.max(farthest, Math.abs(r.r[10])); }
    expect(farthest).toBeGreaterThan(0.5);
  });
  it('settles and stays within the width axis', () => {
    const r = createRipple(11);
    kickRipple(r, centers, 300, 35);
    let energy = Infinity;
    for (let t = 0; t < 600; t++) {
      energy = stepRipple(r);
      for (const v of r.r) { expect(v).toBeLessThanOrEqual(25); expect(v).toBeGreaterThanOrEqual(-30); }
    }
    expect(energy).toBeLessThan(0.05);
  });
});
```

`test/unit/theme-index.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { activeSection } from '../../src/scripts/lib/theme-index';

describe('active section', () => {
  it('picks the last section whose top is above the line', () => {
    expect(activeSection([0, 900, 1800], 540)).toBe(0);
    expect(activeSection([0, 900, 1800], 900)).toBe(1);
    expect(activeSection([0, 900, 1800], 5000)).toBe(2);
  });
  it('falls back to the first section', () => {
    expect(activeSection([100, 900], 0)).toBe(0);
    expect(activeSection([], 0)).toBe(0);
  });
});
```

- [ ] **Step 2: Run them to verify they fail**

Run: `npm test -- springs theme-index`
Expected: FAIL, the modules don't exist.

- [ ] **Step 3: Implement the pure libraries**

`src/scripts/lib/springs.ts`:

```ts
export const LENS = { amplitude: 22, spread: 0.006 } as const;
export const RIPPLE = { stiffness: 0.045, damping: 0.07, coupling: 0.22, min: -30, max: 25, impulse: 26 } as const;

export function lensAt(pointerX: number, centerX: number, width: number): number {
  const d = (pointerX - centerX) / width;
  return LENS.amplitude * Math.exp(-(d * d) / LENS.spread);
}

export const approach = (current: number, target: number, rate = 0.085): number => current + (target - current) * rate;

export interface Ripple { r: Float64Array; v: Float64Array }
export const createRipple = (n: number): Ripple => ({ r: new Float64Array(n), v: new Float64Array(n) });

export function kickRipple(state: Ripple, centers: readonly number[], x: number, sigma: number, strength: number = RIPPLE.impulse): void {
  centers.forEach((c, i) => {
    const d = (x - c) / sigma;
    state.v[i] += strength * Math.exp(-d * d);
  });
}

/** Advances the wave one frame and returns its energy. */
export function stepRipple(state: Ripple): number {
  const { r, v } = state;
  const n = r.length;
  for (let i = 0; i < n; i++) {
    const left = i > 0 ? r[i - 1] : r[i];
    const right = i < n - 1 ? r[i + 1] : r[i];
    v[i] += -RIPPLE.stiffness * r[i] - RIPPLE.damping * v[i] + RIPPLE.coupling * (left + right - 2 * r[i]);
  }
  let energy = 0;
  for (let i = 0; i < n; i++) {
    r[i] = Math.min(RIPPLE.max, Math.max(RIPPLE.min, r[i] + v[i]));
    energy += Math.abs(r[i]) + Math.abs(v[i]);
  }
  return energy;
}
```

`src/scripts/lib/theme-index.ts`:

```ts
export function activeSection(tops: readonly number[], line: number): number {
  let index = 0;
  for (let i = 0; i < tops.length; i++) if (tops[i] <= line) index = i;
  return index;
}
```

- [ ] **Step 4: Run the unit tests**

Run: `npm test -- springs theme-index`
Expected: PASS, 6 tests.

- [ ] **Step 5: Implement the browser modules**

`src/scripts/motion.ts`:

```ts
import { approach, createRipple, kickRipple, lensAt, stepRipple } from './lib/springs';

const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (root.classList.contains('pre')) {
  const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
  Promise.race([fonts, new Promise((r) => setTimeout(r, 1200))]).then(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      root.classList.remove('pre');
      setTimeout(() => root.classList.add('intro-done'), 1900);
    }));
  });
}

function bind(monument: HTMLElement): void {
  const area = monument.closest<HTMLElement>('[data-monument-area]') ?? monument;
  const letters = [...monument.querySelectorAll<HTMLElement>('[data-letter]')];
  const n = letters.length;
  const ripple = createRipple(n);
  const lens = new Float64Array(n);
  let centers: number[] = [];
  let pointerX: number | null = null;
  let running = false;

  const measure = () => { centers = letters.map((l) => { const r = l.getBoundingClientRect(); return r.left + r.width / 2; }); };
  const armed = () => root.classList.contains('intro-done') && !reduce;
  const frame = () => {
    const width = area.clientWidth || 1;
    let energy = stepRipple(ripple);
    for (let i = 0; i < n; i++) {
      const target = pointerX === null ? 0 : lensAt(pointerX, centers[i], width);
      lens[i] = approach(lens[i], target);
      energy += Math.abs(target - lens[i]);
      const wd = Math.max(68, Math.min(125, 100 + lens[i] + ripple.r[i]));
      letters[i].style.fontVariationSettings = `'wdth' ${wd.toFixed(1)}`;
    }
    if (energy > 0.05 || pointerX !== null) requestAnimationFrame(frame);
    else { running = false; letters.forEach((l) => { l.style.fontVariationSettings = ''; }); }
  };
  const run = () => { if (!running) { running = true; requestAnimationFrame(frame); } };

  area.addEventListener('pointerenter', measure);
  area.addEventListener('pointermove', (e) => { if (!armed()) return; if (!centers.length) measure(); pointerX = e.clientX; run(); });
  const leave = () => { pointerX = null; };
  area.addEventListener('pointerleave', leave);
  area.addEventListener('pointercancel', leave);
  monument.addEventListener('pointerdown', (e) => { if (!armed()) return; measure(); kickRipple(ripple, centers, e.clientX, area.clientWidth * 0.035); run(); });
  addEventListener('resize', measure, { passive: true });
}

document.querySelectorAll<HTMLElement>('[data-monument]').forEach(bind);
```

`src/scripts/theme.ts`:

```ts
import { activeSection } from './lib/theme-index';

const root = document.documentElement;
const sections = [...document.querySelectorAll<HTMLElement>('[data-ground]')].filter((s) => s !== root);
let tops: number[] = [];
let current = root.dataset.ground ?? 'fog';
let queued = 0;

const measure = () => { tops = sections.map((s) => s.getBoundingClientRect().top + scrollY); };
const update = () => {
  queued = 0;
  if (!sections.length) return;
  const ground = sections[activeSection(tops, scrollY + innerHeight * 0.6)].dataset.ground ?? 'fog';
  if (ground !== current) { current = ground; root.dataset.ground = ground; }
};

measure();
update();
requestAnimationFrame(() => root.classList.add('ground-ready'));
addEventListener('scroll', () => { if (!queued) queued = requestAnimationFrame(update); }, { passive: true });
addEventListener('resize', () => { measure(); update(); }, { passive: true });
addEventListener('load', () => { measure(); update(); });
```

`src/scripts/smooth.ts`:

```ts
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  new Lenis({ autoRaf: true, lerp: 0.09, anchors: true });
}
```

`src/scripts/scan.ts`:

```ts
import type { Locale } from '../content/routes';
import type { Mode, ScanFunction } from '../content/types';
import { estimateMessage, fillTemplate, formatHours, fullTimeWeeks, hoursPerYear } from './lib/scan-math';

interface ScanData {
  functions: ScanFunction[];
  modes: Record<Mode, string>;
  yearBack: string;
  message: { head: string; line: string; total: string };
  locale: Locale;
}

for (const tool of document.querySelectorAll<HTMLElement>('[data-scan]')) {
  const dataEl = tool.parentElement?.querySelector('[data-scan-data]') ?? document.querySelector('[data-scan-data]');
  if (!dataEl) continue;
  const data = JSON.parse(dataEl.textContent ?? '{}') as ScanData;
  const list = tool.querySelector<HTMLOListElement>('.steps')!;
  const hours = tool.querySelector<HTMLInputElement>('input[type=range]')!;
  const hoursValue = tool.querySelector<HTMLElement>('[data-hours]');
  const out = tool.querySelector<HTMLElement>('[data-out]')!;
  const weeks = tool.querySelector<HTMLElement>('[data-weeks]')!;
  const send = tool.querySelector<HTMLAnchorElement>('[data-scan-send]')!;
  let fnIndex = 0;
  let steps = data.functions[0].steps.map((s) => ({ ...s }));
  let shown = hoursPerYear(Number(hours.value), steps);
  let anim = 0;

  const renderSteps = (stagger: boolean) => {
    list.innerHTML = steps.map((s, i) => `<li class="step${stagger ? ' out' : ''}" data-step><span>${s.label}</span><span class="seg" role="group">${(['you', 'assist', 'agent'] as Mode[])
      .map((m) => `<button type="button" data-i="${i}" data-mode="${m}" aria-pressed="${s.mode === m}">${data.modes[m]}</button>`).join('')}</span></li>`).join('');
    if (stagger) [...list.children].forEach((li, i) => setTimeout(() => li.classList.remove('out'), 30 + i * 55));
  };
  const update = () => {
    const h = Number(hours.value);
    if (hoursValue) hoursValue.textContent = String(h);
    const target = hoursPerYear(h, steps);
    weeks.textContent = fillTemplate(data.yearBack, { weeks: fullTimeWeeks(target) });
    cancelAnimationFrame(anim);
    const from = shown;
    const t0 = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / 600);
      shown = Math.round(from + (target - from) * (1 - Math.pow(1 - k, 3)));
      out.textContent = `≈ ${formatHours(shown, data.locale)}`;
      if (k < 1) anim = requestAnimationFrame(tick);
    };
    anim = requestAnimationFrame(tick);
  };

  tool.querySelectorAll<HTMLButtonElement>('[data-fn]').forEach((b, i) => b.addEventListener('click', () => {
    fnIndex = i;
    steps = data.functions[i].steps.map((s) => ({ ...s }));
    tool.querySelectorAll('[data-fn]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    renderSteps(true);
    update();
  }));
  list.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-mode]');
    if (!b) return;
    steps[Number(b.dataset.i)].mode = b.dataset.mode as Mode;
    b.parentElement!.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    update();
  });
  hours.addEventListener('input', update);

  send.setAttribute('href', '#contact');
  send.addEventListener('click', () => {
    const fn = data.functions[fnIndex];
    const total = hoursPerYear(Number(hours.value), steps);
    const message = estimateMessage({
      functionName: fn.name, steps, modeLabels: data.modes, hoursPerWeek: Number(hours.value),
      hoursPerYear: total, locale: data.locale, template: data.message,
    });
    const form = document.querySelector<HTMLFormElement>('form[data-contact]');
    if (!form) return;
    form.querySelector<HTMLTextAreaElement>('textarea[name=message]')!.value = message;
    form.querySelector<HTMLInputElement>('input[name=estimate]')!.value = message;
    const select = form.querySelector<HTMLSelectElement>('select[name=inquiry]');
    if (select) select.selectedIndex = 0;
  });
}
```

`src/scripts/form.ts`: port the submit handler from the old `PortfolioPage.astro`. It uses `site.formAjax` as the endpoint and the `data-*` messages, and puts the button back in a finally block. One change: on success, call `form.reset()` and clear `input[name=estimate]`.

- [ ] **Step 6: Check the JS budget**

```bash
npm run build && for f in dist/_astro/*.js; do printf '%s %s\n' "$(gzip -c "$f" | wc -c)" "$f"; done | sort -n
```

Expected: the gzip total of the files that `dist/index.html` references is ≤ 25 600 bytes. List the referenced files with `grep -o '/_astro/[^"]*\.js' dist/index.html | sort -u`.

- [ ] **Step 7: Check the behaviour in a browser**

Run `npm run preview`, then with the Playwright MCP tools on `http://localhost:4321/`:

1. Five seconds after load, `document.documentElement.className` contains `intro-done` and not `pre`.
2. Dispatch `pointermove` over the name. A letter's `style.fontVariationSettings` becomes non-empty within 100 ms.
3. Scroll to `#scan`. After 1 s, `document.documentElement.dataset.ground === 'ink'`.
4. Click the "Administration" function button. The result reads "≈ 600".
5. Click "Skicka uppskattningen till mig". The page lands on `#contact`, and the textarea starts with "Uppskattning från AI-verktyget: Administration".

- [ ] **Step 8: Commit**

```bash
git add src/scripts test/unit/springs.test.ts test/unit/theme-index.test.ts
git commit -m "feat: load sequence, lens and ripple, section crossfade, smooth scroll, scan and form behaviour"
```

---

### Task 12: Assets (logos, monogram and favicons, product screenshots, OG images)

**Files:**
- Create: `public/clients/*`, `public/monogram.svg`, `public/favicon.svg` (replace), `public/favicon.ico`, `public/apple-touch-icon.png`, `public/android-chrome-*.png` (replace), `scripts/shots.ts`, `scripts/og.ts`, `public/og/*.png`
- Create: `src/assets/shots/lingo.png`, `src/assets/shots/wez.png`
- Modify: `public/site.webmanifest`

**Interfaces:**
- Consumes: `CLIENTS` files list, `allPages`, `ogPath`, the heads.
- Produces: every file referenced by `CLIENTS[*].file` and every `/og/*.png` referenced by a head.

- [ ] **Step 1: Write the failing test**

Add to `test/dist/files.test.ts`:

```ts
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { CLIENTS } from '../../src/content/clients';
import { ogPath } from '../../src/content/routes';

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
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm run test:dist -- files`
Expected: FAIL, the files are missing.

- [ ] **Step 3: Copy and clean the logos**

```bash
mkdir -p public/clients
for f in evinova far futurememories ivcevidensia sejfa telia weapp; do cp docs/superpowers/specs/assets/direction-a/logo-$f.svg public/clients/$f.svg; done
cp docs/superpowers/specs/assets/direction-a/logo-tiimo.png public/clients/tiimo.png
node -e "const fs=require('fs');for(const f of fs.readdirSync('public/clients').filter(f=>f.endsWith('.svg'))){const p='public/clients/'+f;let s=fs.readFileSync(p,'utf8');s=s.replace(/<\?xml[^>]*>/g,'').replace(/<!--[\s\S]*?-->/g,'').replace(/<metadata[\s\S]*?<\/metadata>/g,'').replace(/<sodipodi:[^>]*\/>/g,'').replace(/\s(sodipodi|inkscape):[a-z-]+=\"[^\"]*\"/g,'').replace(/\sdata-wf[^=]*=\"[^\"]*\"/g,'').replace(/\sclass=\"logo[^\"]*\"/,'');if(!/viewBox=/.test(s))throw new Error(p+' has no viewBox');fs.writeFileSync(p,s.trim()+'\n')}"
```

Open each in the browser at `/clients/{file}` and confirm it renders.

- [ ] **Step 4: Draw the monogram and generate favicons**

- `public/monogram.svg`: copy `docs/superpowers/specs/assets/direction-a/monogram.svg`. It is "AW" set in Archivo (wdth 112, wght 800) and converted to outlines with fontkit, with an ink A and a signal W. It was made for the email signature, and the site uses the same mark.

  ```bash
  cp docs/superpowers/specs/assets/direction-a/monogram.svg public/monogram.svg
  ```

- `public/favicon.svg`: the monogram's two paths centred in a square viewBox on `#E7E9E4`, plus a `@media (prefers-color-scheme: dark)` style block that swaps the first fill to `#E7E9E4` and the background to `#0C1E22`.
- PNG sizes (32, 180, 192, 512) and the `.ico`: render the favicon SVG with playwright-core in `scripts/og.ts` (Step 6, function `renderIcons()`), then convert 32 px PNG → ICO with `sharp` (`.toFormat('png')` written as `favicon.ico` is accepted by every browser that matters).
- Update `site.webmanifest` with `name`/`short_name` "Anton Wester", `theme_color` `#E7E9E4` and `background_color` `#E7E9E4`.

- [ ] **Step 5: Capture the product screenshots**

`scripts/shots.ts`:

```ts
import { chromium } from 'playwright-core';

const targets = [
  { id: 'lingo', url: 'https://lingo.antonwester.se', wait: 2500 },
  { id: 'wez', url: process.env.WEZ_URL ?? 'http://localhost:5273', wait: 4000 },
];

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
for (const t of targets) {
  try {
    await page.goto(t.url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(t.wait);
    await page.screenshot({ path: `src/assets/shots/${t.id}.png` });
    console.log(`captured ${t.id}`);
  } catch (error) {
    console.error(`could not capture ${t.id} from ${t.url}:`, error);
  }
}
await browser.close();
```

For Wez, start its demo first in another terminal:

```bash
cd ../voidleap-deconstructed/wez && bun run demo
```

Use the URL it prints, and open a view with a busy board or thread before capturing. Then, in this repo:

```bash
npm run shots
```

If Wez cannot be started, leave `src/assets/shots/wez.png` absent. CaseRow and CasePage then show the placeholder block, and `og.ts` renders a text-only card. Add a line to the final report.

- [ ] **Step 6: Generate the OG images**

`scripts/og.ts` renders one 1200 × 630 card per page and locale with playwright-core and `page.setContent`:
- background `#E7E9E4`;
- the page title (the part before " | ") in Archivo 800 at a size fitted to 1040 px;
- "Anton Wester" at the bottom left, and the monogram at the bottom right.

Case pages instead put the screenshot (`src/assets/shots/{id}.png`) on the right half with the name on the left. The script loads the font with `@font-face { src: url(file://…/archivo-latin-wdth-normal.woff2) }` from `node_modules`, writes each image to `public${ogPath(page, l)}`, and also runs `renderIcons()` from Step 4.

```ts
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { chromium } from 'playwright-core';
import { allPages, LOCALES, ogPath, type PageRef } from '../src/content/routes';
import { headForCase, headForCity, headForHome, headForService } from '../src/lib/seo';

const require = createRequire(import.meta.url);
const font = require.resolve('@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2');
const monogram = readFileSync('public/monogram.svg', 'utf8');
const head = (p: PageRef, l: 'sv' | 'en') =>
  p.kind === 'home' ? headForHome(l) : p.kind === 'service' ? headForService(p.id, l) : p.kind === 'case' ? headForCase(p.id, l) : headForCity(p.id, l);

const card = (title: string, shot: string | null) => `<!doctype html><html><head><style>
@font-face{font-family:A;src:url(file://${font}) format('woff2');font-weight:100 900;font-stretch:62% 125%}
*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;background:#E7E9E4;color:#0C1E22;font-family:A;display:grid;grid-template-columns:${shot ? '1fr 1fr' : '1fr'};padding:64px;gap:48px}
h1{font-weight:800;font-stretch:108%;letter-spacing:-.03em;line-height:.95;font-size:88px;align-self:center}
.foot{position:absolute;left:64px;right:64px;bottom:48px;display:flex;justify-content:space-between;align-items:center;font-weight:700;font-size:28px}
.foot svg{width:72px}img{width:100%;height:100%;object-fit:cover;object-position:top left}
</style></head><body><h1>${title}</h1>${shot ? `<img src="file://${process.cwd()}/${shot}">` : ''}<div class="foot"><span>Anton Wester</span>${monogram}</div></body></html>`;

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const p of allPages()) {
  for (const l of LOCALES) {
    const title = head(p, l).title.split(' | ')[0];
    const shot = p.kind === 'case' && existsSync(`src/assets/shots/${p.id}.png`) ? `src/assets/shots/${p.id}.png` : null;
    await page.setContent(card(title, shot), { waitUntil: 'load' });
    await page.evaluate(async () => {
      await document.fonts.ready;
      const h = document.querySelector('h1')!;
      let size = 88;
      while ((h.scrollWidth > h.clientWidth || h.scrollHeight > 360) && size > 40) h.style.fontSize = `${(size -= 2)}px`;
    });
    await page.screenshot({ path: `public${ogPath(p, l)}` });
  }
}
await browser.close();
```

Run it with `mkdir -p public/og && npm run og`.

- [ ] **Step 7: Run tests and look at three OG images**

Run: `npm run test:dist -- files`. Expected: PASS.

Then read `public/og/home-sv.png`, `public/og/case-sokhem-en.png` and `public/og/city-kungalv-sv.png` with the Read tool. Check that nothing is cut off and that "Kungälv" renders with its "ä".

- [ ] **Step 8: Commit**

```bash
git add public scripts src/assets/shots test/dist/files.test.ts
git rm --cached -q public/social-preview.png 2>/dev/null || true
git commit -m "feat: client logos, monogram and favicons, product screenshots, OG images"
```

---

### Task 13: Phone composition and the taste-skill gates

**Files:**
- Modify: component styles as the gates require.

**Interfaces:**
- Consumes: the built site.
- Produces: a site that passes `lint.mjs` and `inspect.mjs`, apart from the documented exceptions.

- [ ] **Step 1: Run the lint gate**

```bash
node ~/.claude/skills/design-taste-frontend/scripts/lint.mjs src
```

Fix every finding except these two, which the client asked for:
- the gradient in `LogoBar.astro`;
- the logo row itself.

The step numbers in `ServicePage.astro` count as a real `<ol>` sequence.

- [ ] **Step 2: Run the inspector on four pages**

```bash
npm run build
for p in index.html sv/ai-kartlaggning/index.html sv/case/sokhem/index.html sv/partille/index.html; do node ~/.claude/skills/design-taste-frontend/scripts/inspect.mjs dist/$p; done
```

Fix every `FAIL`. For each `WARN`, either fix it or write one sentence in the commit message saying why it stays.

- [ ] **Step 3: Critique the screenshots**

Open the files listed by the inspector in `.taste-skill/inspect/` at 1440, 768 and 390 px with the Read tool. Score them with `~/.claude/skills/design-taste-frontend/references/critique.md`, fix the top three problems, and run Step 2 again. Do at most three rounds.

On the phone screenshots, check these specifically:
- the name stacks into two lines with the portrait between;
- the logo bar is readable;
- the scan functions scroll sideways;
- every touch target is ≥ 44 px.

- [ ] **Step 4: Commit**

```bash
git add -A src
git commit -m "fix: phone composition and taste-skill gate findings"
```

---

### Task 14: QA script (no-JS, reduced motion, extreme widths, form failure) and Lighthouse

**Files:**
- Create: `scripts/qa.ts`

**Interfaces:**
- Consumes: `npm run preview` on `http://localhost:4321`.
- Produces: a script that exits non-zero on any failure.

- [ ] **Step 1: Write `scripts/qa.ts`**

```ts
import { chromium, type Page } from 'playwright-core';

const BASE = process.env.BASE ?? 'http://localhost:4321';
const failures: string[] = [];
const check = (ok: boolean, what: string) => { if (!ok) failures.push(what); console.log(`${ok ? 'ok  ' : 'FAIL'} ${what}`); };
const visible = (page: Page, sel: string) => page.locator(sel).first().evaluate((el) => {
  const s = getComputedStyle(el);
  return s.opacity !== '0' && s.visibility !== 'hidden' && el.getBoundingClientRect().height > 0;
});

const browser = await chromium.launch({ channel: 'chrome' });

// 1. JS disabled: hero content visible, no pre class
{
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`);
  check(!(await page.evaluate(() => document.documentElement.className)).includes('pre'), 'no-JS: html has no pre class');
  for (const sel of ['h1', '.offer', '.hero .btn', '[data-client]']) check(await visible(page, sel), `no-JS: ${sel} visible`);
  await ctx.close();
}

// 2. Reduced motion: content visible at once, no Lenis, logo track not animating
{
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`);
  await page.waitForTimeout(200);
  check(await visible(page, '.offer'), 'reduced motion: offer visible within 200 ms');
  check(!(await page.evaluate(() => document.documentElement.classList.contains('lenis'))), 'reduced motion: Lenis off');
  check((await page.locator('.track').evaluate((el) => getComputedStyle(el).animationName)) === 'none', 'reduced motion: logo drift off');
  await ctx.close();
}

// 3. Extreme widths: no horizontal scroll, monument on one line on desktop
for (const width of [320, 390, 768, 1440, 2560]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await ctx.newPage();
  for (const path of ['/', '/en/case/openaudit/', '/sv/kungalv/']) {
    await page.goto(`${BASE}${path}`);
    await page.waitForTimeout(2500);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    check(overflow <= 0, `${width}px ${path}: no horizontal overflow (${overflow}px)`);
  }
  await ctx.close();
}

// 4. Form failure shows the error with the email fallback and re-enables the button
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.route('https://formsubmit.co/**', (r) => r.fulfill({ status: 500, body: '{}' }));
  await page.goto(`${BASE}/#contact`);
  await page.fill('input[name=name]', 'Test');
  await page.fill('input[name=email]', 'test@example.com');
  await page.fill('textarea[name=message]', 'Hej');
  await page.click('form[data-contact] button[type=submit]');
  await page.waitForTimeout(800);
  check((await page.textContent('[data-form-status]'))?.includes('contact@antonwester.se') ?? false, 'form failure: error mentions the email');
  check(await page.isEnabled('form[data-contact] button[type=submit]'), 'form failure: button enabled again');
  await ctx.close();
}

// 5. Language switch on a deep page
{
  const page = await browser.newPage();
  await page.goto(`${BASE}/sv/case/wez/`);
  await page.click('[data-lang-switch]');
  check(page.url().endsWith('/en/case/wez/'), 'language switch keeps the page');
  await page.close();
}

await browser.close();
if (failures.length) { console.error(`\n${failures.length} QA failure(s)`); process.exit(1); }
console.log('\nQA passed');
```

- [ ] **Step 2: Run it**

```bash
npm run build && (npm run preview -- --port 4321 &) && sleep 3 && npm run qa
```

Expected: "QA passed". Fix every FAIL in the component that owns it, and run again.

- [ ] **Step 3: Lighthouse on mobile**

```bash
npx unlighthouse-ci --site http://localhost:4321 --urls /,/sv/ai-kartlaggning/,/sv/case/sokhem/,/sv/partille/ --budget 95
```

Expected: Performance ≥ 95, and Accessibility, Best practices and SEO = 100, for all four. LCP < 2.0 s and CLS < 0.05. If LCP is the portrait or the monument, check that the font preload is in the head and that the portrait has `fetchpriority="high"`.

- [ ] **Step 4: Run every suite**

```bash
npm test && npm run test:dist && npm run typecheck
```

Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add scripts/qa.ts src
git commit -m "test: QA script for no-JS, reduced motion, widths, form failure and language switch"
```

---

## Before merging

- Push the branch and open a PR only when Anton asks. Its description lists the open items from spec section 16:
  - the portrait (`src/assets/portrait.jpg`);
  - permission for each logo;
  - FAQ answers 1–2;
  - Wez's independence from the Voidleap material;
  - whether the Wez screenshot was captured.
- After the merge deploys, submit the new sitemap in Google Search Console. Check two weeks later that `/sv/` shows as "Page with redirect" and `/` as indexed.
