import { guides, guideUi } from '../content/guides';
import { GUIDE_IDS, SITE_URL, pathFor, type Locale } from '../content/routes';

const esc = (s: string) =>
  s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');

export function guideRss(locale: Locale): Response {
  const indexUrl = `${SITE_URL}${pathFor({ kind: 'guideIndex' }, locale)}`;
  const items = GUIDE_IDS.map((id) => guides[id][locale])
    .sort((a, b) => b.published.localeCompare(a.published))
    .map((g) => {
      const url = `${SITE_URL}${pathFor({ kind: 'guide', id: g.id }, locale)}`;
      return `    <item>\n      <title>${esc(g.h1)}</title>\n      <link>${esc(url)}</link>\n      <guid isPermaLink="true">${esc(url)}</guid>\n      <pubDate>${new Date(`${g.published}T08:00:00Z`).toUTCString()}</pubDate>\n      <description>${esc(g.seo.description)}</description>\n    </item>`;
    });

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xml:lang="${locale}">\n  <channel>\n    <title>${esc(guideUi[locale].indexTitle)} | Anton Wester</title>\n    <link>${esc(indexUrl)}</link>\n    <description>${esc(guideUi[locale].indexSeo.description)}</description>\n    <language>${locale}</language>\n    <atom:link href="${esc(indexUrl)}rss.xml" rel="self" type="application/rss+xml" />\n${items.join('\n')}\n  </channel>\n</rss>\n`;

  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
