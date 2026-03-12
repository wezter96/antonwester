import {
  cityIds,
  createPortfolioContent,
  siteConfig,
  type CityId,
  type Locale,
} from '../../../data/portfolio';

interface Props {
  locale: Locale;
  cityId: CityId;
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function renderOgImage(locale: Locale, cityId: CityId): string {
  const content = createPortfolioContent(locale, cityId);
  const serviceLabel = locale === 'sv' ? 'Mjukvarukonsult' : 'Software Consultant';
  const capabilityLabel =
    locale === 'sv'
      ? 'React · TypeScript · Mobil · Tech lead'
      : 'React · TypeScript · Mobile · Tech Lead';
  const locationLabel =
    locale === 'sv' ? `I ${content.cityName}` : `In ${content.cityName}`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(content.seo.title)}</title>
  <desc id="desc">${escapeXml(content.seo.description)}</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0E1A13"/>
      <stop offset="1" stop-color="#162B20"/>
    </linearGradient>
    <radialGradient id="orb1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(980 120) rotate(130) scale(300 260)">
      <stop stop-color="#C49A50" stop-opacity="0.36"/>
      <stop offset="1" stop-color="#C49A50" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="orb2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(180 520) rotate(12) scale(340 220)">
      <stop stop-color="#3A6652" stop-opacity="0.8"/>
      <stop offset="1" stop-color="#3A6652" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#orb1)"/>
  <rect width="1200" height="630" fill="url(#orb2)"/>
  <rect x="70" y="70" width="1060" height="490" rx="28" fill="rgba(255,255,255,0.03)" stroke="rgba(196,154,80,0.16)"/>
  <text x="110" y="150" fill="#C49A50" font-family="Inter, Arial, sans-serif" font-size="24" letter-spacing="4">ANTON WESTER AB</text>
  <text x="110" y="260" fill="#F0ECE3" font-family="Georgia, serif" font-size="74">${escapeXml(serviceLabel)}</text>
  <text x="110" y="338" fill="#E8D0A0" font-family="Georgia, serif" font-size="56">${escapeXml(locationLabel)}</text>
  <text x="110" y="418" fill="rgba(240,236,227,0.8)" font-family="Inter, Arial, sans-serif" font-size="28">${escapeXml(capabilityLabel)}</text>
  <text x="110" y="510" fill="rgba(240,236,227,0.64)" font-family="Inter, Arial, sans-serif" font-size="24">${escapeXml(siteConfig.siteUrl.replace('https://', ''))}</text>
</svg>`;
}

export async function getStaticPaths() {
  return (['en', 'sv'] as const).flatMap((locale) =>
    cityIds.map((cityId) => ({
      params: { locale, city: cityId },
      props: { locale, cityId },
    })),
  );
}

export function GET({ props }: { props: Props }) {
  const { locale, cityId } = props;

  return new Response(renderOgImage(locale, cityId), {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
