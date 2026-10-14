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
  /** Bold run-in that opens the hero intro. */
  promise: string;
  intro: string;
  sections: Section[];
  steps: string[];
  fitsWhen: string[];
  firstEngagement: string;
  relatedCases: CaseId[];
  /** Neighbouring services the page links to, so overlapping intents point at their own page. */
  relatedServices?: ServiceId[];
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
  useCases: string[];
  deliveryMode: string;
  neighbours: [CityId, CityId];
  faq: Faq[];
}

export type Client =
  | { id: string; name: string; kind: 'mask'; file: string; ratio: number; height: number }
  | { id: string; name: string; kind: 'symbol-text'; file: string; text: string }
  | { id: string; name: string; kind: 'text'; text: string; dot: boolean };

export interface Stage { word: string; lead: string; body: string; service: ServiceId; linkLabel: string; wdth: number; more?: Array<{ service: ServiceId; label: string }> }
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
  expertise: { heading: string; items: Array<{ name: string; detail: string }> };
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
  serviceLabels: { what: string; steps: string; fits: string; first: string; cases: string; faq: string; homeLead: string; homeLink: string; related: string };
  cityLabels: { nearby: string; delivery: string; services: string; neighbours: string; useCases: string; products: string };
  notFound: { title: string; body: string; home: string };
}
