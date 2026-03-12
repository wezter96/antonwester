export type Locale = 'en' | 'sv';
export type CityId = 'gothenburg' | 'stenungsund' | 'ale' | 'kungalv' | 'partille' | 'trollhattan' | 'kungsbacka' | 'boras' | 'varberg';

export interface NavItem {
  href: string;
  label: string;
}

export interface ActionLink {
  href: string;
  label: string;
}

export interface ServiceItem {
  title: string;
  body: string;
  outcomes: string[];
}

export interface ProjectItem {
  name: string;
  label: string;
  summary: string;
  impact: string;
  tags: string[];
  href: string;
  linkLabel: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  summary: string;
  tags: string[];
}

export interface ContactOption {
  label: string;
  value: string;
  href: string;
  note: string;
}

export interface ContactFormOption {
  value: string;
  label: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface RouteAlternate {
  hreflang: string;
  href: string;
}

export interface LocationLink {
  href: string;
  label: string;
  isCurrent: boolean;
}

export interface PortfolioContent {
  seo: {
    title: string;
    description: string;
  };
  cityName: string;
  regionName: string;
  skipToContentLabel: string;
  localeSwitchLabel: string;
  availability: {
    label: string;
    context: string;
  };
  tickerItems: string[];
  nav: NavItem[];
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: ActionLink;
    tertiaryCta: ActionLink;
    metrics: Metric[];
  };
  localLanding: {
    eyebrow: string;
    title: string;
    intro: string;
    body: string[];
    highlightsTitle: string;
    highlights: string[];
    nearbyAreasLabel: string;
    nearbyAreas: string[];
    locationLinksLabel: string;
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    items: ServiceItem[];
  };
  projects: {
    eyebrow: string;
    title: string;
    description: string;
    items: ProjectItem[];
  };
  experience: {
    eyebrow: string;
    title: string;
    description: string;
    items: ExperienceItem[];
  };
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    items: FaqItem[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    directOptions: ContactOption[];
    formTitle: string;
    formDescription: string;
    fields: {
      name: string;
      email: string;
      company: string;
      inquiry: string;
      message: string;
    };
    placeholders: {
      name: string;
      email: string;
      company: string;
      message: string;
    };
    inquiryOptions: ContactFormOption[];
    submitLabel: string;
    sendingLabel: string;
    successMessage: string;
    errorMessage: string;
  };
  footer: {
    availability: string;
  };
}

export interface PortfolioPageData {
  locale: Locale;
  cityId: CityId;
  path: string;
  switchHref: string;
  ogImageUrl: string;
  alternates: RouteAlternate[];
  locationLinks: LocationLink[];
  content: PortfolioContent;
  structuredData: Array<Record<string, unknown>>;
}

interface CityDefinition {
  slug: string | null;
  names: Record<Locale, string>;
  region: Record<Locale, string>;
  nearbyAreas: Record<Locale, string[]>;
  localFocus: Record<Locale, string>;
  deliveryMode: Record<Locale, string>;
}

export const siteConfig = {
  siteUrl: 'https://antonwester.se',
  companyName: 'Anton Wester AB',
  email: 'contact@antonwester.se',
  bookingLink: 'https://calendar.app.google/Gm6vcBEkrQZT5xB57',
  githubLink: 'https://github.com/wezter96',
  linkedinLink: 'https://www.linkedin.com/in/anton-wester-93a26011b',
  lingoLink: 'https://lingo.antonwester.se',
  socialImagePath: '/social-preview.png',
  socialImageAlt: 'Anton Wester brand mark and wordmark on a dark background',
} as const;

const cityDefinitions: Record<CityId, CityDefinition> = {
  gothenburg: {
    slug: null,
    names: { en: 'Gothenburg', sv: 'Göteborg' },
    region: { en: 'the Gothenburg region', sv: 'Göteborgsregionen' },
    nearbyAreas: {
      en: ['Mölndal', 'Partille', 'Kungälv', 'Stenungsund'],
      sv: ['Mölndal', 'Partille', 'Kungälv', 'Stenungsund'],
    },
    localFocus: {
      en: 'Best fit for Gothenburg product teams that need a local senior engineer who can move between architecture, delivery planning, and hands-on implementation.',
      sv: 'Passar bäst för produktteam i Göteborg som behöver en lokal senior utvecklare som kan växla mellan arkitektur, leveransplanering och hands-on implementation.',
    },
    deliveryMode: {
      en: 'on-site in Gothenburg and hybrid across western Sweden',
      sv: 'på plats i Göteborg och hybrid i Västsverige',
    },
  },
  stenungsund: {
    slug: 'stenungsund',
    names: { en: 'Stenungsund', sv: 'Stenungsund' },
    region: { en: 'the wider Gothenburg and Bohuslän corridor', sv: 'Göteborgsregionen och Bohuslänskusten' },
    nearbyAreas: {
      en: ['Tjörn', 'Orust', 'Kungälv', 'Gothenburg'],
      sv: ['Tjörn', 'Orust', 'Kungälv', 'Göteborg'],
    },
    localFocus: {
      en: 'Useful for companies in Stenungsund that want senior product engineering close by, especially when local stakeholders and remote contributors need the same technical direction.',
      sv: 'Relevant för bolag i Stenungsund som vill ha senior produktutveckling nära till hands, särskilt när lokala intressenter och distribuerade team behöver samma tekniska riktning.',
    },
    deliveryMode: {
      en: 'on-site in Stenungsund, along the west coast, and remotely when the team prefers it',
      sv: 'på plats i Stenungsund, längs västkusten och remote när teamet föredrar det',
    },
  },
  ale: {
    slug: 'ale',
    names: { en: 'Ale', sv: 'Ale' },
    region: { en: 'the Gothenburg commuter belt', sv: 'Göteborgs pendlingsområde' },
    nearbyAreas: {
      en: ['Nödinge', 'Bohus', 'Kungälv', 'Gothenburg'],
      sv: ['Nödinge', 'Bohus', 'Kungälv', 'Göteborg'],
    },
    localFocus: {
      en: 'A good fit for businesses in Ale that need a consultant close to Gothenburg but flexible enough to support both internal delivery work and customer-facing product development.',
      sv: 'Passar bolag i Ale som behöver en konsult nära Göteborg men med flexibilitet nog att stötta både interna leveransflöden och kundnära produktutveckling.',
    },
    deliveryMode: {
      en: 'hybrid in Ale and Gothenburg, with remote collaboration built in from day one',
      sv: 'hybrid i Ale och Göteborg, med remote-samarbete som en naturlig del från start',
    },
  },
  kungalv: {
    slug: 'kungalv',
    names: { en: 'Kungälv', sv: 'Kungälv' },
    region: { en: 'the northern Gothenburg region', sv: 'norra Göteborgsregionen' },
    nearbyAreas: {
      en: ['Ytterby', 'Ale', 'Stenungsund', 'Gothenburg'],
      sv: ['Ytterby', 'Ale', 'Stenungsund', 'Göteborg'],
    },
    localFocus: {
      en: 'Often a strong fit for teams in Kungälv that need polished digital products, stronger frontend foundations, or a senior engineer who can simplify technical decisions while delivery continues.',
      sv: 'Ofta rätt för team i Kungälv som behöver mer genomarbetade digitala produkter, starkare frontend-grunder eller en senior utvecklare som kan förenkla tekniska beslut utan att stoppa leveransen.',
    },
    deliveryMode: {
      en: 'on-site in Kungälv when needed and otherwise hybrid across the greater Gothenburg area',
      sv: 'på plats i Kungälv vid behov och i övrigt hybrid över hela Göteborgsområdet',
    },
  },
  partille: {
    slug: 'partille',
    names: { en: 'Partille', sv: 'Partille' },
    region: { en: 'eastern Gothenburg and nearby municipalities', sv: 'östra Göteborg och närliggande kommuner' },
    nearbyAreas: {
      en: ['Öjersjö', 'Lerum', 'Mölndal', 'Gothenburg'],
      sv: ['Öjersjö', 'Lerum', 'Mölndal', 'Göteborg'],
    },
    localFocus: {
      en: 'Useful for teams in Partille that need senior delivery support across web, mobile, and product architecture while moving quickly between planning and execution.',
      sv: 'Relevant för team i Partille som behöver senior leveranshjälp inom webb, mobil och produktarkitektur samtidigt som de rör sig snabbt mellan planering och genomförande.',
    },
    deliveryMode: {
      en: 'hybrid in Partille and Gothenburg, with remote support for distributed teams',
      sv: 'hybrid i Partille och Göteborg, med remote-stöd för distribuerade team',
    },
  },
  trollhattan: {
    slug: 'trollhattan',
    names: { en: 'Trollhättan', sv: 'Trollhättan' },
    region: { en: 'the northern Västra Götaland region', sv: 'norra Västra Götaland' },
    nearbyAreas: {
      en: ['Vänersborg', 'Uddevalla', 'Kungälv', 'Gothenburg'],
      sv: ['Vänersborg', 'Uddevalla', 'Kungälv', 'Göteborg'],
    },
    localFocus: {
      en: 'A strong fit for teams in Trollhättan that need senior engineering support, especially for product teams working on web and mobile experiences in the automotive or manufacturing space.',
      sv: 'Passar bra för team i Trollhättan som behöver senior teknisk hjälp, särskilt för produktteam som arbetar med webb- och mobilupplevelser inom bilindustrin eller tillverkningsindustrin.',
    },
    deliveryMode: {
      en: 'on-site in Trollhättan when needed and hybrid across Västra Götaland',
      sv: 'på plats i Trollhättan vid behov och hybrid över Västra Götaland',
    },
  },
  kungsbacka: {
    slug: 'kungsbacka',
    names: { en: 'Kungsbacka', sv: 'Kungsbacka' },
    region: { en: 'southern Gothenburg region', sv: 'södra Göteborgsregionen' },
    nearbyAreas: {
      en: ['Varberg', 'Falkenberg', 'Mölndal', 'Gothenburg'],
      sv: ['Varberg', 'Falkenberg', 'Mölndal', 'Göteborg'],
    },
    localFocus: {
      en: 'Useful for teams in Kungsbacka that need senior delivery support, particularly for e-commerce, web platforms, or product teams looking for a consultant who can balance strategy with hands-on implementation.',
      sv: 'Relevant för team i Kungsbacka som behöver senior leveranshjälp, särskilt för e-handel, webbplattformar eller produktteam som letar efter en konsult som kan balansera strategi med hands-on implementation.',
    },
    deliveryMode: {
      en: 'hybrid in Kungsbacka and Gothenburg, with remote options',
      sv: 'hybrid i Kungsbacka och Göteborg, med möjlighet till remote',
    },
  },
  boras: {
    slug: 'boras',
    names: { en: 'Borås', sv: 'Borås' },
    region: { en: 'the Borås region and western Sweden', sv: 'Boråsregionen och västra Sverige' },
    nearbyAreas: {
      en: ['Falkenberg', 'Varberg', 'Kungsbacka', 'Gothenburg'],
      sv: ['Falkenberg', 'Varberg', 'Kungsbacka', 'Göteborg'],
    },
    localFocus: {
      en: 'Often a strong fit for teams in Borås working in textile, e-commerce, or manufacturing sectors that need senior product engineering and architecture support.',
      sv: 'Ofta rätt för team i Borås inom textil-, e-handel- eller tillverkningsindustrin som behöver senior produktutveckling och arkitekturstöd.',
    },
    deliveryMode: {
      en: 'on-site in Borås when needed and hybrid across western Sweden',
      sv: 'på plats i Borås vid behov och hybrid i västra Sverige',
    },
  },
  varberg: {
    slug: 'varberg',
    names: { en: 'Varberg', sv: 'Varberg' },
    region: { en: 'the Halland coast near Gothenburg', sv: 'Hallandskusten nära Göteborg' },
    nearbyAreas: {
      en: ['Falkenberg', 'Kungsbacka', 'Halmstad', 'Gothenburg'],
      sv: ['Falkenberg', 'Kungsbacka', 'Halmstad', 'Göteborg'],
    },
    localFocus: {
      en: 'Useful for teams in Varberg that need senior delivery support, particularly for tourism, wellness, or coastal businesses looking for web and mobile product expertise.',
      sv: 'Relevat för team i Varberg som behöver senior leveranshjälp, särskilt för turism, hälsa eller kustnära företag som letar efter webb- och mobilproduktexpertis.',
    },
    deliveryMode: {
      en: 'hybrid in Varberg and along the Halland coast, with remote support',
      sv: 'hybrid i Varberg och längs Hallandskusten, med möjlighet till remote',
    },
  },
};

export const cityIds = Object.keys(cityDefinitions) as CityId[];

export function getDynamicCityIds(): CityId[] {
  return cityIds.filter((cityId) => cityId !== 'gothenburg');
}

export function getCityIdBySlug(slug: string | undefined): CityId | undefined {
  return cityIds.find((cityId) => cityDefinitions[cityId].slug === slug);
}

export function getCitySlug(cityId: CityId): string {
  const slug = cityDefinitions[cityId].slug;

  if (!slug) {
    throw new Error(`City ${cityId} does not have a slug route.`);
  }

  return slug;
}

export function getLocalizedCityName(locale: Locale, cityId: CityId): string {
  return cityDefinitions[cityId].names[locale];
}

export function buildPath(locale: Locale, cityId: CityId): string {
  const city = cityDefinitions[cityId];
  if (city.slug === null) {
    return locale === 'sv' ? '/sv/' : '/en/';
  }

  return locale === 'sv' ? `/sv/${city.slug}/` : `/en/${city.slug}/`;
}

export function buildOgImagePath(locale: Locale, cityId: CityId): string {
  void locale;
  void cityId;
  return siteConfig.socialImagePath;
}

export function buildOgImageUrl(locale: Locale, cityId: CityId): string {
  return `${siteConfig.siteUrl}${buildOgImagePath(locale, cityId)}`;
}

export function getRouteAlternates(cityId: CityId): RouteAlternate[] {
  return [
    { hreflang: 'en', href: `${siteConfig.siteUrl}${buildPath('en', cityId)}` },
    { hreflang: 'sv', href: `${siteConfig.siteUrl}${buildPath('sv', cityId)}` },
    { hreflang: 'x-default', href: `${siteConfig.siteUrl}${buildPath('en', cityId)}` },
  ];
}

export function getLocationLinks(locale: Locale, currentCityId: CityId): LocationLink[] {
  return cityIds.map((cityId) => ({
    href: buildPath(locale, cityId),
    label: getLocalizedCityName(locale, cityId),
    isCurrent: cityId === currentCityId,
  }));
}

function getSharedNearbyRegion(locale: Locale, cityId: CityId): string {
  if (cityId === 'gothenburg') {
    return locale === 'sv' ? 'Göteborg och Västsverige' : 'Gothenburg and western Sweden';
  }

  return cityDefinitions[cityId].region[locale];
}

function getServiceAreaLead(locale: Locale, cityId: CityId): string {
  const cityName = cityDefinitions[cityId].names[locale];

  if (cityId === 'gothenburg') {
    return locale === 'sv' ? 'Göteborg och Västsverige' : 'Gothenburg and western Sweden';
  }

  return locale === 'sv'
    ? `${cityName} och ${cityDefinitions[cityId].region.sv}`
    : `${cityName} and ${cityDefinitions[cityId].region.en}`;
}

function getSharedHeroDescription(locale: Locale, cityId: CityId): string {
  const city = cityDefinitions[cityId];
  const cityName = city.names[locale];

  if (locale === 'sv') {
    return cityId === 'gothenburg'
      ? 'Jag hjälper startups, byråer och produktbolag i Göteborg att forma arkitektur, bygga polerade webb- och mobilupplevelser och förvandla ambitiösa idéer till stabila produkter.'
      : `Jag hjälper startups, byråer och produktbolag i ${cityName} och ${city.region.sv} att forma arkitektur, bygga polerade webb- och mobilupplevelser och förvandla ambitiösa idéer till stabila produkter.`;
  }

  return cityId === 'gothenburg'
    ? 'I help startups, agencies, and product companies in Gothenburg shape architecture, build polished web and mobile experiences, and turn ambitious ideas into reliable products.'
    : `I help startups, agencies, and product companies in ${cityName} and ${city.region.en} shape architecture, build polished web and mobile experiences, and turn ambitious ideas into reliable products.`;
}

function getEnglishServices(): PortfolioContent['services'] {
  return {
    eyebrow: 'Services',
    title: 'Hands-on help where product, engineering, and delivery meet.',
    description: 'I am most useful when a team needs someone who can both think clearly about the system and build the thing that matters now.',
    items: [
      {
        title: 'Fractional tech lead',
        body: 'Guide architecture, reduce delivery risk, and create momentum for teams that need senior technical leadership without a full-time hire yet.',
        outcomes: ['Technical direction', 'Decision support', 'Delivery clarity'],
      },
      {
        title: 'Senior product engineering',
        body: 'Design and build refined product experiences across web and mobile with strong attention to usability, reliability, and iteration speed.',
        outcomes: ['React / Next.js', 'React Native', 'TypeScript systems'],
      },
      {
        title: 'Architecture and performance',
        body: 'Untangle complexity, improve foundations, and make products feel fast both in the codebase and in the user experience.',
        outcomes: ['Performance tuning', 'Platform design', 'Developer experience'],
      },
      {
        title: 'Localization and platform workflows',
        body: 'Build the internal tooling and delivery pipelines that help teams scale content, internationalization, and product operations with confidence.',
        outcomes: ['Localization strategy', 'Publishing flows', 'Internal product tooling'],
      },
    ],
  };
}

function getSwedishServices(): PortfolioContent['services'] {
  return {
    eyebrow: 'Tjänster',
    title: 'Hands-on hjälp där produkt, teknik och leverans möts.',
    description: 'Jag är som mest värdefull när ett team behöver någon som både kan tänka klart om systemet och bygga det som är viktigast just nu.',
    items: [
      {
        title: 'Fractional tech lead',
        body: 'Hjälper team att fatta bättre tekniska beslut, minska leveransrisk och skapa momentum utan att behöva göra en full rekrytering direkt.',
        outcomes: ['Teknisk riktning', 'Beslutsstöd', 'Tydligare leverans'],
      },
      {
        title: 'Senior produktutveckling',
        body: 'Designar och bygger genomarbetade produktupplevelser för webb och mobil med fokus på användbarhet, tillförlitlighet och hög iterationstakt.',
        outcomes: ['React / Next.js', 'React Native', 'TypeScript-system'],
      },
      {
        title: 'Arkitektur och prestanda',
        body: 'Reder ut komplexitet, stärker grunden och ser till att produkter känns snabba både i kodbasen och i upplevelsen för användaren.',
        outcomes: ['Prestandaoptimering', 'Plattformsdesign', 'Developer experience'],
      },
      {
        title: 'Lokalisering och interna plattformar',
        body: 'Bygger verktyg och leveransflöden som hjälper team att skala innehåll, internationalisering och interna produktprocesser med kontroll.',
        outcomes: ['Lokaliseringsstrategi', 'Publiceringsflöden', 'Interna verktyg'],
      },
    ],
  };
}

function getEnglishProjects(): PortfolioContent['projects'] {
  return {
    eyebrow: 'Selected work',
    title: 'A few things that show how I think, build, and lead.',
    description: 'From product-facing apps to internal platforms and open source, I care about useful software, clean architecture, and experiences that feel considered.',
    items: [
      {
        name: 'Lingo',
        label: 'Founder project',
        summary: 'An AI-native, self-hosted localization platform that gives product, content, and engineering teams one place to manage translation work, reviews, releases, and delivery.',
        impact: 'A strong example of product thinking, systems design, and developer tooling coming together in one platform.',
        tags: ['TypeScript', 'Bun', 'Hono', 'SDK / API'],
        href: 'https://lingo.antonwester.se',
        linkLabel: 'Explore Lingo',
      },
      {
        name: 'Sejfa',
        label: 'Product delivery',
        summary: 'Built both the mobile app and the website together with a small team for a modern digital home insurance product.',
        impact: 'Clear, friendly product UX in a category where trust, simplicity, and polish matter a lot.',
        tags: ['React Native', 'Next.js', 'TypeScript'],
        href: 'https://sejfa.nu/',
        linkLabel: 'Visit Sejfa',
      },
      {
        name: 'T4 Stack',
        label: 'Open source',
        summary: 'Contributed to a performance-focused starter stack for type-safe native, web, and server applications.',
        impact: 'Reflects the kind of performance, DX, and architecture mindset I also bring into consulting engagements.',
        tags: ['Next.js', 'tRPC', 'Expo'],
        href: 'https://t4stack.com/',
        linkLabel: 'Visit T4 Stack',
      },
      {
        name: 'Sqillz',
        label: 'Learning platform',
        summary: 'Helped build a platform for onboarding and education with chat, course management, and a full product experience for end users.',
        impact: 'Good proof of hands-on product engineering across rich flows, collaboration features, and mobile delivery.',
        tags: ['React Native', 'TypeScript', 'Redux'],
        href: 'https://apps.apple.com/com/app/sqillz/id6443986742',
        linkLabel: 'View Sqillz',
      },
    ],
  };
}

function getSwedishProjects(): PortfolioContent['projects'] {
  return {
    eyebrow: 'Utvalda case',
    title: 'Några projekt som visar hur jag tänker, bygger och leder.',
    description: 'Från produktnära appar till interna plattformar och open source bryr jag mig om användbar mjukvara, ren arkitektur och upplevelser som känns genomtänkta.',
    items: [
      {
        name: 'Lingo',
        label: 'Eget produktprojekt',
        summary: 'En AI-native, self-hosted lokaliseringsplattform som ger produkt-, innehålls- och utvecklingsteam ett gemensamt ställe för översättningar, review, releaser och leverans.',
        impact: 'Ett tydligt exempel på hur produktidé, systemdesign och developer tooling kan mötas i en och samma plattform.',
        tags: ['TypeScript', 'Bun', 'Hono', 'SDK / API'],
        href: 'https://lingo.antonwester.se',
        linkLabel: 'Utforska Lingo',
      },
      {
        name: 'Sejfa',
        label: 'Produktleverans',
        summary: 'Byggde både mobilappen och webbplatsen tillsammans med ett litet team för en modern digital hemförsäkring.',
        impact: 'Tydlig och vänlig produktupplevelse i en kategori där förtroende, enkelhet och polish betyder mycket.',
        tags: ['React Native', 'Next.js', 'TypeScript'],
        href: 'https://sejfa.nu/',
        linkLabel: 'Besök Sejfa',
      },
      {
        name: 'T4 Stack',
        label: 'Open source',
        summary: 'Bidrog till ett prestandafokuserat startpaket för typsäkra native-, webb- och serverapplikationer.',
        impact: 'Speglar den typ av prestandatänk, DX och arkitekturresonemang som jag också tar med in i konsultuppdrag.',
        tags: ['Next.js', 'tRPC', 'Expo'],
        href: 'https://t4stack.com/',
        linkLabel: 'Besök T4 Stack',
      },
      {
        name: 'Sqillz',
        label: 'Lärplattform',
        summary: 'Var med och byggde en plattform för onboarding och utbildning med chat, kurshantering och en komplett produktupplevelse för slutanvändaren.',
        impact: 'Bra bevis på hands-on produktutveckling över rika flöden, samarbetsfunktioner och mobil leverans.',
        tags: ['React Native', 'TypeScript', 'Redux'],
        href: 'https://apps.apple.com/com/app/sqillz/id6443986742',
        linkLabel: 'Se Sqillz',
      },
    ],
  };
}

function getEnglishExperience(): PortfolioContent['experience'] {
  return {
    eyebrow: 'Experience',
    title: 'Built through consulting, product teams, and cross-platform leadership.',
    description: 'My background spans product development, architecture, cross-platform delivery, and the kind of close collaboration that helps teams keep shipping.',
    items: [
      {
        role: 'Independent Software Consultant',
        company: 'Anton Wester AB',
        period: 'Jul 2024 – Present',
        summary: 'Running my own company and helping teams with software architecture, product delivery, and hands-on engineering across web services and product experiences.',
        tags: ['Consulting', 'Architecture', 'Web services'],
      },
      {
        role: 'Tech Lead',
        company: 'Weapp',
        period: 'Oct 2022 – Oct 2024',
        summary: 'Led cross-platform initiatives with a focus on web and mobile, helping teams make better technical decisions while still delivering product value.',
        tags: ['Leadership', 'Cross-platform', 'Product delivery'],
      },
      {
        role: 'Software Developer',
        company: 'Weapp',
        period: 'May 2021 – Dec 2022',
        summary: 'Built product features and technical foundations with a strong focus on interfaces, architecture, and maintainable frontend systems.',
        tags: ['Frontend', 'Architecture', 'TypeScript'],
      },
      {
        role: 'Software Developer',
        company: 'Telia / Sigma Group',
        period: 'Aug 2019 – May 2021',
        summary: 'Worked with Java and interface-heavy product development, building practical software in a larger organisational setting.',
        tags: ['Java', 'Interfaces', 'Enterprise delivery'],
      },
      {
        role: 'B.Sc. in Computer Engineering',
        company: 'Chalmers University of Technology',
        period: '2016 – 2019',
        summary: 'Formal foundation in computer engineering with an education that strengthened both the technical depth and product mindset I use in client work today.',
        tags: ['Computer engineering', 'Mobile', 'Systems thinking'],
      },
    ],
  };
}

function getSwedishExperience(): PortfolioContent['experience'] {
  return {
    eyebrow: 'Erfarenhet',
    title: 'Formad av konsulting, produktteam och cross-platform-ledarskap.',
    description: 'Min bakgrund spänner över produktutveckling, arkitektur, cross-platform-leverans och det nära samarbetet som hjälper team att fortsätta skeppa.',
    items: [
      {
        role: 'Oberoende mjukvarukonsult',
        company: 'Anton Wester AB',
        period: 'juli 2024 – nu',
        summary: 'Driver eget bolag och hjälper team med mjukvaruarkitektur, produktleverans och hands-on utveckling inom webbtjänster och produktupplevelser.',
        tags: ['Konsulting', 'Arkitektur', 'Webbtjänster'],
      },
      {
        role: 'Tech Lead',
        company: 'Weapp',
        period: 'okt 2022 – okt 2024',
        summary: 'Ledde initiativ inom cross-platform-utveckling med fokus på webb och mobil, och hjälpte team att fatta bättre tekniska beslut samtidigt som produktvärde levererades.',
        tags: ['Ledarskap', 'Cross-platform', 'Produktleverans'],
      },
      {
        role: 'Mjukvaruutvecklare',
        company: 'Weapp',
        period: 'maj 2021 – dec 2022',
        summary: 'Byggde produktfunktioner och tekniska grunder med starkt fokus på gränssnitt, arkitektur och hållbara frontend-system.',
        tags: ['Frontend', 'Arkitektur', 'TypeScript'],
      },
      {
        role: 'Mjukvaruutvecklare',
        company: 'Telia / Sigma Group',
        period: 'aug 2019 – maj 2021',
        summary: 'Arbetade med Java och gränssnittstunga produkter, och byggde praktisk mjukvara i en större organisationskontext.',
        tags: ['Java', 'Gränssnitt', 'Enterprise'],
      },
      {
        role: 'Högskoleingenjör i data',
        company: 'Chalmers tekniska högskola',
        period: '2016 – 2019',
        summary: 'En teknisk grund som stärkte både djupet i min ingenjörsroll och det produktfokus jag använder i kunduppdrag idag.',
        tags: ['Datateknik', 'Mobil', 'Systemtänk'],
      },
    ],
  };
}

function getEnglishContact(cityId: CityId): PortfolioContent['contact'] {
  const city = cityDefinitions[cityId];
  const cityName = city.names.en;

  return {
    eyebrow: 'Contact',
    title: `Need a software consultant in ${cityName}? Let’s talk.`,
    description: `If you need senior help in ${getServiceAreaLead('en', cityId)}, or remotely, I am happy to start with a short intro call. I usually work ${city.deliveryMode.en}.`,
    directOptions: [
      {
        label: 'Email',
        value: 'contact@antonwester.se',
        href: 'mailto:contact@antonwester.se',
        note: 'Best for project inquiries, intros, and recruiter outreach.',
      },
      {
        label: 'Book a call',
        value: 'Google Calendar booking',
        href: 'https://calendar.app.google/Gm6vcBEkrQZT5xB57',
        note: 'Useful if you want to talk through a project or role quickly.',
      },
      {
        label: 'LinkedIn',
        value: 'anton-wester-93a26011b',
        href: 'https://www.linkedin.com/in/anton-wester-93a26011b',
        note: 'A good option for professional introductions and longer context.',
      },
    ],
    formTitle: 'Tell me what you need help with',
    formDescription: 'Use the form if you want a straightforward way to reach me about a product, platform, or leadership need.',
    fields: {
      name: 'Name',
      email: 'Email',
      company: 'Company',
      inquiry: 'What is this about?',
      message: 'Project or role',
    },
    placeholders: {
      name: 'Your name',
      email: 'name@company.com',
      company: 'Company or team',
      message: 'A few lines about the product, challenge, timing, or role you want to discuss.',
    },
    inquiryOptions: [
      { value: 'Product build', label: 'Product build' },
      { value: 'Fractional tech lead', label: 'Fractional tech lead' },
      { value: 'Architecture review', label: 'Architecture review' },
      { value: 'Hiring / recruiting', label: 'Hiring / recruiting' },
      { value: 'Other', label: 'Other' },
    ],
    submitLabel: 'Send inquiry',
    sendingLabel: 'Sending...',
    successMessage: 'Thanks — your message is on its way. I will get back to you soon.',
    errorMessage: 'Something went wrong. Please email contact@antonwester.se directly instead.',
  };
}

function getSwedishContact(cityId: CityId): PortfolioContent['contact'] {
  const city = cityDefinitions[cityId];
  const cityName = city.names.sv;

  return {
    eyebrow: 'Kontakt',
    title: `Behöver ni en mjukvarukonsult i ${cityName}? Låt oss prata.`,
    description: `Om ni behöver senior hjälp i ${getServiceAreaLead('sv', cityId)}, eller helt remote tar jag gärna ett första samtal. Jag jobbar ofta ${city.deliveryMode.sv}.`,
    directOptions: [
      {
        label: 'E-post',
        value: 'contact@antonwester.se',
        href: 'mailto:contact@antonwester.se',
        note: 'Bäst för projektförfrågningar, introduktioner och kontakt från rekryterare.',
      },
      {
        label: 'Boka möte',
        value: 'Google Calendar-bokning',
        href: 'https://calendar.app.google/Gm6vcBEkrQZT5xB57',
        note: 'Perfekt om du snabbt vill prata igenom ett uppdrag eller en roll.',
      },
      {
        label: 'LinkedIn',
        value: 'anton-wester-93a26011b',
        href: 'https://www.linkedin.com/in/anton-wester-93a26011b',
        note: 'Bra för professionella introduktioner och längre kontext.',
      },
    ],
    formTitle: 'Berätta vad du behöver hjälp med',
    formDescription: 'Använd formuläret om du vill nå mig på ett enkelt sätt kring en produkt, plattform eller ledarskapsutmaning.',
    fields: {
      name: 'Namn',
      email: 'E-post',
      company: 'Bolag',
      inquiry: 'Vad gäller det?',
      message: 'Projekt eller roll',
    },
    placeholders: {
      name: 'Ditt namn',
      email: 'namn@bolag.se',
      company: 'Bolag eller team',
      message: 'Några rader om produkten, utmaningen, tidplanen eller rollen du vill diskutera.',
    },
    inquiryOptions: [
      { value: 'Produktbygge', label: 'Produktbygge' },
      { value: 'Fractional tech lead', label: 'Fractional tech lead' },
      { value: 'Arkitekturöversyn', label: 'Arkitekturöversyn' },
      { value: 'Rekrytering', label: 'Rekrytering' },
      { value: 'Övrigt', label: 'Övrigt' },
    ],
    submitLabel: 'Skicka förfrågan',
    sendingLabel: 'Skickar...',
    successMessage: 'Tack — ditt meddelande är på väg. Jag återkommer så snart jag kan.',
    errorMessage: 'Något gick fel. Maila gärna direkt till contact@antonwester.se i stället.',
  };
}

function getEnglishFaq(cityId: CityId): PortfolioContent['faq'] {
  const city = cityDefinitions[cityId];
  const cityName = city.names.en;

  return {
    eyebrow: 'FAQ',
    title: `Questions about software consulting in ${cityName}`,
    description: `A few quick answers for teams evaluating a consultant in ${cityName} or nearby.`,
    items: [
      {
        question: `Do you take on software consulting projects in ${cityName}?`,
        answer: `Yes. I work with teams in ${getServiceAreaLead('en', cityId)} on product development, architecture, performance work, localization systems, and fractional tech lead support.`,
      },
      {
        question: `What kinds of projects are a good fit in ${cityName}?`,
        answer: `The best fit is when a team needs senior help across React, Next.js, React Native, TypeScript systems, delivery planning, or product architecture without adding unnecessary process.`,
      },
      {
        question: `Can you work on-site in ${cityName} as well as remotely?`,
        answer: `Yes. I usually work ${city.deliveryMode.en}, and I also support fully remote teams across Sweden when that is the better setup.`,
      },
    ],
  };
}

function getSwedishFaq(cityId: CityId): PortfolioContent['faq'] {
  const city = cityDefinitions[cityId];
  const cityName = city.names.sv;

  return {
    eyebrow: 'Vanliga frågor',
    title: `Vanliga frågor om mjukvarukonsulting i ${cityName}`,
    description: `Snabba svar för team som utvärderar en konsult i ${cityName} eller i närliggande områden.`,
    items: [
      {
        question: `Tar du uppdrag som mjukvarukonsult i ${cityName}?`,
        answer: `Ja. Jag jobbar med team i ${getServiceAreaLead('sv', cityId)} inom produktutveckling, arkitektur, prestanda, lokaliseringssystem och fractional tech lead-stöd.`,
      },
      {
        question: `Vilka typer av projekt passar bäst i ${cityName}?`,
        answer: `Bäst passar uppdrag där ett team behöver senior hjälp inom React, Next.js, React Native, TypeScript-system, leveransplanering eller produktarkitektur utan att bygga upp onödig process.`,
      },
      {
        question: `Kan du jobba på plats i ${cityName} och remote?`,
        answer: `Ja. Jag jobbar ofta ${city.deliveryMode.sv}, och jag hjälper också helt distribuerade team runt om i Sverige när det är rätt upplägg.`,
      },
    ],
  };
}

export function createPortfolioContent(locale: Locale, cityId: CityId): PortfolioContent {
  const city = cityDefinitions[cityId];
  const cityName = city.names[locale];
  const regionName = city.region[locale];

  if (locale === 'sv') {
    return {
      seo: {
        title: `Mjukvarukonsult i ${cityName} | ${siteConfig.companyName}`,
        description:
          cityId === 'gothenburg'
            ? 'Anton Wester är en oberoende mjukvarukonsult i Göteborg som hjälper team med React, TypeScript, mobilappar, arkitektur, lokalisering och tech lead-stöd via Anton Wester AB.'
            : `Anton Wester är en oberoende mjukvarukonsult som hjälper team i ${cityName} och ${regionName} med React, TypeScript, mobilappar, arkitektur, lokalisering och tech lead-stöd via Anton Wester AB.`,
      },
      cityName,
      regionName,
      skipToContentLabel: 'Hoppa till innehållet',
      localeSwitchLabel: 'In English',
      availability: {
        label: 'Tillgänglig',
        context: cityId === 'gothenburg' ? 'Göteborg / Remote' : `${cityName} / Hybrid`,
      },
      tickerItems: ['React', 'Next.js', 'React Native', 'TypeScript', 'Fractional tech lead', 'Arkitektur', 'Lokalisering', 'Prestanda', 'Produktutveckling'],
      nav: [
        { href: '#services', label: 'Tjänster' },
        { href: '#work', label: 'Utvalda case' },
        { href: '#experience', label: 'Erfarenhet' },
        { href: '#faq', label: 'Vanliga frågor' },
        { href: '#contact', label: 'Kontakt' },
      ],
      hero: {
        eyebrow: `Oberoende mjukvarukonsult · ${siteConfig.companyName} · ${cityName} / Remote`,
        title:
          cityId === 'gothenburg'
            ? 'Mjukvarukonsult och tech lead-stöd för produktteam i Göteborg som vill röra sig snabbt utan onödig komplexitet.'
            : `Mjukvarukonsult för team i ${cityName} som vill röra sig snabbt utan onödig komplexitet.`,
        description: getSharedHeroDescription('sv', cityId),
        primaryCta: { href: siteConfig.bookingLink, label: 'Boka ett intro-samtal' },
        tertiaryCta: { href: '#work', label: 'Se utvalda case' },
        metrics: [
          { value: '6+', label: 'år av produktutveckling' },
          { value: '2x', label: 'roller: strategisk och hands-on' },
          { value: 'EN / SV', label: 'arbetsspråk' },
        ],
      },
      localLanding: {
        eyebrow: 'Lokalt i Västsverige',
        title:
          cityId === 'gothenburg'
            ? 'Senior utvecklingshjälp nära Göteborgs produktteam.'
            : `Senior utvecklingshjälp för team i ${cityName} och närliggande orter.`,
        intro: city.localFocus.sv,
        body: [
          `Jag går oftast in när ett team i ${cityName} behöver en senior utvecklare eller tech lead som kan växla mellan strategi, implementation och uppföljning utan att tempot faller.`,
          'Det kan handla om att stabilisera en roadmap, få loss en release eller höja kvaliteten i en webb- eller mobilprodukt samtidigt som teamet fortsätter leverera.',
        ],
        highlightsTitle: 'Vanligt stöd',
        highlights: [
          'Senior React-, Next.js- och TypeScript-leverans',
          'Tech lead-stöd för arkitektur, prioritering och leverans',
          'Webb- och mobilproduktutveckling för växande team',
        ],
        nearbyAreasLabel: 'Närliggande områden',
        nearbyAreas: city.nearbyAreas.sv,
        locationLinksLabel: 'Lokala landningssidor',
      },
      services: getSwedishServices(),
      projects: getSwedishProjects(),
      experience: getSwedishExperience(),
      faq: getSwedishFaq(cityId),
      contact: getSwedishContact(cityId),
      footer: {
        availability:
          cityId === 'gothenburg'
            ? 'Tillgänglig för utvalda konsultuppdrag i Göteborg och Västsverige.'
            : `Tillgänglig för utvalda konsultuppdrag i ${cityName} och ${regionName}.`,
      },
    };
  }

  return {
    seo: {
      title: `Software Consultant in ${cityName} | ${siteConfig.companyName}`,
      description:
        cityId === 'gothenburg'
          ? 'Anton Wester is an independent software consultant in Gothenburg helping teams with React, TypeScript, mobile apps, architecture, localization, and tech lead support through Anton Wester AB.'
          : `Anton Wester is an independent software consultant helping teams in ${cityName} and ${regionName} with React, TypeScript, mobile apps, architecture, localization, and tech lead support through Anton Wester AB.`,
    },
    cityName,
    regionName,
    skipToContentLabel: 'Skip to content',
    localeSwitchLabel: 'På svenska',
    availability: {
      label: 'Available',
      context: cityId === 'gothenburg' ? 'Gothenburg / Remote' : `${cityName} / Hybrid`,
    },
    tickerItems: ['React', 'Next.js', 'React Native', 'TypeScript', 'Fractional Tech Lead', 'Architecture', 'Localization', 'Performance', 'Product Engineering'],
    nav: [
      { href: '#services', label: 'Services' },
      { href: '#work', label: 'Selected work' },
      { href: '#experience', label: 'Experience' },
      { href: '#faq', label: 'FAQ' },
      { href: '#contact', label: 'Contact' },
    ],
    hero: {
      eyebrow: `Independent software consultant · ${siteConfig.companyName} · ${cityName} / Remote`,
      title:
        cityId === 'gothenburg'
          ? 'Software consulting and tech leadership for product teams in Gothenburg that want to move fast without making a mess.'
          : `Software consulting for teams in ${cityName} that want to move fast without making a mess.`,
      description: getSharedHeroDescription('en', cityId),
      primaryCta: { href: siteConfig.bookingLink, label: 'Book an intro call' },
      tertiaryCta: { href: '#work', label: 'See selected work' },
      metrics: [
        { value: '6+', label: 'years shipping software' },
        { value: '2x', label: 'roles: strategic and hands-on' },
        { value: 'EN / SV', label: 'working languages' },
      ],
    },
    localLanding: {
      eyebrow: 'Local delivery in western Sweden',
      title:
        cityId === 'gothenburg'
          ? 'Senior product engineering for teams in and around Gothenburg.'
          : `Senior product engineering for teams in ${cityName} and nearby areas.`,
      intro: city.localFocus.en,
      body: [
        `I am usually most useful when a team in ${cityName} needs a senior engineer or fractional tech lead who can move between strategy, implementation, and follow-through without slowing delivery down.`,
        'That often means stabilising a roadmap, unblocking a release, improving a codebase, or making a web or mobile product feel far more considered.',
      ],
      highlightsTitle: 'Typical support',
      highlights: [
        'Senior React, Next.js, and TypeScript delivery',
        'Fractional tech lead support for architecture and planning',
        'Web and mobile product development for growing teams',
      ],
      nearbyAreasLabel: 'Nearby areas',
      nearbyAreas: city.nearbyAreas.en,
      locationLinksLabel: 'Nearby landing pages',
    },
    services: getEnglishServices(),
    projects: getEnglishProjects(),
    experience: getEnglishExperience(),
    faq: getEnglishFaq(cityId),
    contact: getEnglishContact(cityId),
    footer: {
      availability:
        cityId === 'gothenburg'
          ? 'Available for selected consulting engagements in Gothenburg and western Sweden.'
          : `Available for selected consulting engagements in ${cityName} and ${regionName}.`,
    },
  };
}

export function buildStructuredData({
  locale,
  cityId,
  path,
  content,
  ogImageUrl,
}: {
  locale: Locale;
  cityId: CityId;
  path: string;
  content: PortfolioContent;
  ogImageUrl: string;
}): Array<Record<string, unknown>> {
  const city = cityDefinitions[cityId];
  const pageUrl = `${siteConfig.siteUrl}${path}`;
  const websiteId = `${siteConfig.siteUrl}#website`;
  const organizationId = `${siteConfig.siteUrl}#organization`;
  const webPageId = `${pageUrl}#webpage`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const homePageUrl =
    cityId === 'gothenburg'
      ? pageUrl
      : `${siteConfig.siteUrl}${buildPath(locale, 'gothenburg')}`;
  const faqId = `${pageUrl}#faq`;
  const availableLanguage = locale === 'sv' ? ['sv-SE', 'en'] : ['en', 'sv-SE'];
  const pageLanguage = locale === 'sv' ? 'sv-SE' : 'en';
  const serviceType =
    locale === 'sv'
      ? ['Mjukvarukonsult', 'Tech lead-stöd', 'React-utveckling', 'Produktutveckling']
      : ['Software consultant', 'Fractional tech lead', 'React development', 'Product engineering'];

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': organizationId,
      name: siteConfig.companyName,
      url: siteConfig.siteUrl,
      email: siteConfig.email,
      image: `${siteConfig.siteUrl}${siteConfig.socialImagePath}`,
      sameAs: [siteConfig.linkedinLink, siteConfig.githubLink, siteConfig.lingoLink],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': websiteId,
      url: siteConfig.siteUrl,
      name: siteConfig.companyName,
      inLanguage: ['en', 'sv-SE'],
      publisher: { '@id': organizationId },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': webPageId,
      url: pageUrl,
      name: content.seo.title,
      description: content.seo.description,
      inLanguage: pageLanguage,
      isPartOf: { '@id': websiteId },
      about: { '@id': `${pageUrl}#professional-service` },
      breadcrumb: { '@id': breadcrumbId },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: ogImageUrl,
        width: 1200,
        height: 630,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${siteConfig.siteUrl}#anton-wester`,
      name: 'Anton Wester',
      url: siteConfig.siteUrl,
      image: ogImageUrl,
      jobTitle: locale === 'sv' ? 'Mjukvarukonsult och tech lead' : 'Software consultant and fractional tech lead',
      sameAs: [siteConfig.linkedinLink, siteConfig.githubLink, siteConfig.lingoLink],
      knowsAbout: ['React', 'Next.js', 'React Native', 'TypeScript', 'Localization', 'Software Architecture'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${pageUrl}#professional-service`,
      name: siteConfig.companyName,
      url: pageUrl,
      description: content.seo.description,
      image: ogImageUrl,
      serviceType,
      areaServed: cityIds.map((id) => ({ '@type': 'City', name: cityDefinitions[id].names[locale] })),
      availableLanguage,
      provider: { '@id': organizationId },
      founder: { '@id': `${siteConfig.siteUrl}#anton-wester` },
      sameAs: [siteConfig.linkedinLink, siteConfig.githubLink, siteConfig.lingoLink],
      email: siteConfig.email,
      contactPoint: {
        '@type': 'ContactPoint',
        email: siteConfig.email,
        contactType: locale === 'sv' ? 'kunddialog' : 'sales',
        availableLanguage,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': faqId,
      mainEntity: content.faq.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: locale === 'sv' ? 'Start' : 'Home',
          item: homePageUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: city.names[locale],
          item: pageUrl,
        },
      ],
    },
  ];
}
