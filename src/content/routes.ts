export type Locale = 'sv' | 'en';
export const LOCALES: readonly Locale[] = ['sv', 'en'];
export const SITE_URL = 'https://antonwester.se';

export const SERVICE_IDS = ['assessment', 'development', 'agents', 'automation', 'operations', 'cto'] as const;
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
  agents: { sv: 'ai-agenter', en: 'ai-agents' },
  automation: { sv: 'ai-automation', en: 'ai-automation' },
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
