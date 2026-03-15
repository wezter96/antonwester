import {
  buildPath,
  buildOgImageUrl,
  buildStructuredData,
  cityIds,
  getLocationLinks,
  getRouteAlternates,
  siteConfig,
  type CityId,
  type Locale,
  type PortfolioContent,
  type PortfolioPageData,
} from './portfolio-shared';

type ContentModule = { default: PortfolioContent };

const contentLoaders = {
  en: {
    gothenburg: () => import('./portfolio-content/en/gothenburg'),
    stenungsund: () => import('./portfolio-content/en/stenungsund'),
    ale: () => import('./portfolio-content/en/ale'),
    kungalv: () => import('./portfolio-content/en/kungalv'),
    partille: () => import('./portfolio-content/en/partille'),
    trollhattan: () => import('./portfolio-content/en/trollhattan'),
    kungsbacka: () => import('./portfolio-content/en/kungsbacka'),
    boras: () => import('./portfolio-content/en/boras'),
    varberg: () => import('./portfolio-content/en/varberg'),
  },
  sv: {
    gothenburg: () => import('./portfolio-content/sv/gothenburg'),
    stenungsund: () => import('./portfolio-content/sv/stenungsund'),
    ale: () => import('./portfolio-content/sv/ale'),
    kungalv: () => import('./portfolio-content/sv/kungalv'),
    partille: () => import('./portfolio-content/sv/partille'),
    trollhattan: () => import('./portfolio-content/sv/trollhattan'),
    kungsbacka: () => import('./portfolio-content/sv/kungsbacka'),
    boras: () => import('./portfolio-content/sv/boras'),
    varberg: () => import('./portfolio-content/sv/varberg'),
  },
} satisfies Record<Locale, Record<CityId, () => Promise<ContentModule>>>;

export * from './portfolio-shared';

export async function getPortfolioPage(locale: Locale, cityId: CityId, pathOverride?: string): Promise<PortfolioPageData> {
  const { default: content } = await contentLoaders[locale][cityId]();
  const path = pathOverride ?? buildPath(locale, cityId);

  let alternates = getRouteAlternates(cityId);
  if (pathOverride) {
    alternates = alternates.map((alt) =>
      alt.hreflang === locale ? { ...alt, href: `${siteConfig.siteUrl}${pathOverride}` } : alt,
    );
  }

  return {
    locale,
    cityId,
    path,
    switchHref: buildPath(locale === 'en' ? 'sv' : 'en', cityId),
    ogImageUrl: buildOgImageUrl(locale, cityId),
    alternates,
    locationLinks: getLocationLinks(locale, cityId),
    content,
    structuredData: buildStructuredData({
      locale,
      cityId,
      path,
      content,
      ogImageUrl: buildOgImageUrl(locale, cityId),
    }),
  };
}

export function getAllRouteEntries(): Array<{
  locale: Locale;
  cityId: CityId;
  path: string;
  alternates: ReturnType<typeof getRouteAlternates>;
}> {
  return cityIds.flatMap((cityId) =>
    (['en', 'sv'] as const).map((locale) => ({
      locale,
      cityId,
      path: buildPath(locale, cityId),
      alternates: getRouteAlternates(cityId),
    })),
  );
}
