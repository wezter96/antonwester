import { getAllRouteEntries, siteConfig } from '../data/portfolio';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function GET() {
  const generatedAt = new Date().toISOString();
  const urls = getAllRouteEntries()
    .map(
      ({ path, alternates, cityId }) => `  <url>\n    <loc>${escapeXml(`${siteConfig.siteUrl}${path}`)}</loc>\n    <lastmod>${generatedAt}</lastmod>\n    <changefreq>${cityId === 'gothenburg' ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${cityId === 'gothenburg' ? '1.0' : '0.8'}</priority>\n${alternates
        .map(
          (alternate) =>
            `    <xhtml:link rel="alternate" hreflang="${escapeXml(alternate.hreflang)}" href="${escapeXml(alternate.href)}" />`,
        )
        .join('\n')}\n  </url>`,
    )
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
