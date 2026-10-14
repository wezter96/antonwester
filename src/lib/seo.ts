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
// a service-area business: the locality is public, a street address is not needed
const ADDRESS = { '@type': 'PostalAddress', addressLocality: 'Göteborg', addressRegion: 'Västra Götalands län', addressCountry: 'SE' } as const;

export const organizationLd = (): Ld => ({
  '@context': CTX, '@type': 'Organization', '@id': ORG, name: site.company, url: SITE_URL,
  email: site.email, logo: `${SITE_URL}/monogram.svg`, address: ADDRESS, founder: { '@id': PERSON }, sameAs: [site.linkedin, site.github],
});

export const personLd = (l: Locale): Ld => ({
  '@context': CTX, '@type': 'Person', '@id': PERSON, name: site.name, url: SITE_URL,
  jobTitle: l === 'sv' ? 'AI-konsult och systemarkitekt' : 'AI consultant and software architect',
  worksFor: { '@id': ORG },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Chalmers University of Technology' },
  knowsAbout: [
    'AI agents', 'LLM integration', 'Process automation', 'Workflow automation', 'Model Context Protocol', 'TypeScript', 'React', 'React Native',
    'Full-stack web development', 'Mobile app development', 'Software architecture', 'DevOps', 'Test automation', 'Search engine optimization',
  ],
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
  description: home[l].seo.description, image: `${SITE_URL}${ogPath({ kind: 'home' }, l)}`, email: site.email, address: ADDRESS,
  areaServed: [{ '@type': 'City', name: l === 'sv' ? 'Göteborg' : 'Gothenburg' }, ...CITY_IDS.map((id) => ({ '@type': 'City', name: cities[id][l].name }))],
  provider: { '@id': ORG }, founder: { '@id': PERSON },
  hasOfferCatalog: {
    '@type': 'OfferCatalog', name: l === 'sv' ? 'Tjänster' : 'Services',
    itemListElement: SERVICE_IDS.map((id) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: services[id][l].name, url: urlFor({ kind: 'service', id }, l) } })),
  },
});

export const serviceLd = (o: { url: string; name: string; description: string; locale: Locale }): Ld => ({
  '@context': CTX, '@type': 'Service', '@id': `${o.url}#service`, name: o.name, serviceType: o.name, description: o.description, url: o.url,
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
