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
