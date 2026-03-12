import {
  buildPath,
  buildOgImageUrl,
  buildStructuredData,
  cityIds,
  getLocationLinks,
  getRouteAlternates,
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
  },
  sv: {
    gothenburg: () => import('./portfolio-content/sv/gothenburg'),
    stenungsund: () => import('./portfolio-content/sv/stenungsund'),
    ale: () => import('./portfolio-content/sv/ale'),
    kungalv: () => import('./portfolio-content/sv/kungalv'),
    partille: () => import('./portfolio-content/sv/partille'),
  },
} satisfies Record<Locale, Record<CityId, () => Promise<ContentModule>>>;

export * from './portfolio-shared';

export async function getPortfolioPage(locale: Locale, cityId: CityId): Promise<PortfolioPageData> {
  const { default: content } = await contentLoaders[locale][cityId]();
  const path = buildPath(locale, cityId);

  return {
    locale,
    cityId,
    path,
    switchHref: buildPath(locale === 'en' ? 'sv' : 'en', cityId),
    ogImageUrl: buildOgImageUrl(locale, cityId),
    alternates: getRouteAlternates(cityId),
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
