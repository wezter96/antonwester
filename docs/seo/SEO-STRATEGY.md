# SEO strategy: antonwester.se

Date: 2026-11-03. Template: agency (main) + local-service (city pages).

## 1. Where we stand

**Business.** One-person AI consultancy (Anton Wester AB) in Gothenburg. Sells three steps: find (AI assessment), build (development, agents, automation), run (hosting and maintenance). Plus fractional CTO. Buyers: owners and managers of small and mid-size companies in West Sweden. Long sales cycle, high value per deal. One booked intro call is the conversion.

**Site today** (from `dist/`, 48 HTML pages, sv + en):

| Page type | Count (per language) | Main-content words | Gate (template) | Status |
|---|---|---|---|---|
| Home | 1 | ~790 | — | OK |
| Service | 6 | 450–740 | 800 | Short |
| City | 8 | 236–256 | 500 | Thin, risk |
| Case (own products) | 4 | ~160 | 1,000 | Very thin |
| Book, privacy | 2 | — | — | OK |
| Blog / insights | 0 | — | — | Missing |

**Technical base is strong.** Static Astro on Cloudflare, canonical + hreflang (sv, en, x-default), sitemap with alternates, `robots.txt`, `llms.txt`, JSON-LD for Organization, Person (with Chalmers), WebSite, WebPage, BreadcrumbList, ProfessionalService with address. Little to fix here.

**Small technical issues**
1. `src/pages/sitemap.xml.ts` sets `lastmod` to the build date on every URL. Google learns to ignore it. Use the real change date per page, or drop `lastmod`.
2. Schema already covers ProfessionalService (with all towns in `areaServed`), Service and FAQPage (`src/lib/seo.ts`). Missing: `ProfilePage` (needs the about page) and `Article` on case pages.

**No baseline numbers.** The Ahrefs API returned 401 on 2026-11-03. Before Phase 1 ends, connect Google Search Console and Bing Webmaster Tools and record the baseline (clicks, impressions, indexed pages, top queries). Umami already tracks visits.

## 2. Goal and KPIs

**One goal:** more booked intro calls from people who found the site in search or AI chat.

| Metric | Baseline | 3 months | 6 months | 12 months |
|---|---|---|---|---|
| Organic clicks / month (GSC) | measure in week 1 | 2× baseline | 4× | 10× |
| Queries in top 10 (GSC) | measure | 15 | 40 | 100 |
| Top 3 for "AI-konsult Göteborg" | measure | top 10 | top 5 | top 3 |
| Referring domains | measure (Bing WMT / Ahrefs) | +10 | +25 | +50 |
| Indexed pages | ~48 | 55 | 70 | 100 |
| Core Web Vitals (field) | measure (CrUX may lack data) | all green | all green | all green |
| Intro calls booked from organic | measure (Umami + booking source) | 1 / month | 3 / month | 6 / month |
| Named in AI answers (ChatGPT, Perplexity, AI Overviews) for "AI-konsult Göteborg" | check by hand | 1 of 3 | 2 of 3 | 3 of 3 |

Targets are estimates. Reset them after the GSC baseline.

## 3. Positioning for search

Big firms (Capgemini, Sigma, Infotiv, Combine, Solita) win broad terms with domain strength. Alice Labs wins with many templated city pages and "best of" listicles. Do not copy that. Win on what they cannot claim:

1. **The person who builds it.** One named engineer (Chalmers, tech lead, ten years of code). Every page is first-hand. This is the E-E-A-T edge.
2. **Real systems in production.** SökHem, OpenAudit, Wez, Lingo are live. Few rivals show their own running products.
3. **Local AI on own hardware.** Data never leaves the company. Strong for GDPR and the EU AI Act. Almost no Swedish competitor writes about this.
4. **Clear prices.** Alice Labs shows "from 25,000 kr". Buyers search "vad kostar AI-konsult". Show a price range.
5. **Specific to West Swedish industry.** Chemistry (Stenungsund), logistics (Ale), textile/e-commerce (Borås), etc. Already in the city pages; make it deeper.

## 4. Keyword themes (Swedish first, English second)

Confirm volumes in GSC / Ahrefs when access works. Priority is by buying intent.

| Theme | Example queries | Target page | Priority |
|---|---|---|---|
| Local commercial | AI-konsult Göteborg, AI-byrå Göteborg, AI-konsult Västsverige | Home | 1 |
| Service commercial | AI-agenter för företag, AI-automation, AI-kartläggning, AI-utveckling, fractional CTO | Service pages | 1 |
| Price | vad kostar AI-konsult, pris AI-agent, kostnad AI-projekt | New price page + FAQ | 1 |
| Town + AI | AI-konsult Borås / Kungsbacka / Trollhättan / Varberg | City pages | 2 |
| Industry | AI för logistik, AI i tillverkning, AI för kemiindustri, AI för e-handel | New industry pages | 2 |
| Rules | EU:s AI-förordning företag, AI-förordningen krav, GDPR AI | Guides | 2 |
| How-to / problem | automatisera fakturor, AI som svarar på mejl, AI kundtjänst, lokala AI-modeller företag | Guides | 3 |
| English | AI consultant Gothenburg, AI consultant Sweden | `/en/` pages | 3 |

## 5. Content strategy (short)

Details in `CONTENT-CALENDAR.md` and `SITE-STRUCTURE.md`.

1. **Deepen what exists before adding new pages.** Service pages to 800+ words; city pages to 500+ words with 40%+ unique text; case pages to 1,000 words (problem, build, numbers, what went wrong).
2. **Add client proof.** At least two client case studies (named or by industry) and three quotes. Without these the site has no third-party trust.
3. **Start a small guides section** (`/sv/guide/`). Two posts a month. Each one answers one buyer question in full, with first-hand detail.
4. **Add three industry pages** where Anton has a real story. No industry page without one example.
5. **No more city pages** until the eight are 500+ words. Hard stop at 30 (template gate: warn at 30, stop at 50).

## 6. E-E-A-T plan

- **About page** (`/sv/om/`, `/en/about/`): photo, full bio, Chalmers, weapp, Telia, links to LinkedIn and GitHub, the hardware lab. `Person` + `ProfilePage` schema with `sameAs`.
- **Byline** on every guide and case: "Skriven av Anton Wester", date, last updated.
- **Proof on service pages**: one case or quote per service.
- **Reviews**: Google Business Profile reviews from clients (see local SEO below).
- **Show the work**: GitHub repos, talks, T4 Stack contribution. Link them.

## 7. Local SEO

- **Google Business Profile** as a service-area business (hide the home address), category "Konsult" / "Datakonsult", service area: Göteborg + the eight towns. Same name, email and URL as the site.
- **Citations**: allabolag.se, hitta.se, eniro.se, merinfo, Bing Places, Apple Business Connect. Same NAP everywhere.
- **Reviews**: ask every finished client. Goal: 5 by month 6, 10 by month 12.
- **Local links**: Business Region Göteborg, Västsvenska Handelskammaren, AI Sweden partner network, local business networks in each town.

## 8. AI search (GEO)

- `llms.txt` exists. Add the guides and the price page as they ship.
- Write answer-first paragraphs: the first 40–60 words under each heading answer the question in full.
- Put real numbers in text (hours saved, cost, time to live). AI engines quote numbers.
- Keep the entity the same everywhere: "Anton Wester AB, AI-konsult i Göteborg". Consider a Wikidata item for the company when there is press to cite.
- Each month, ask ChatGPT, Perplexity and Google AI Mode "Vilka AI-konsulter finns i Göteborg?" and log if the site is named.
- Get into the third-party lists AI engines read: Alice Labs and OSKI "best of" lists, Clutch, GoodFirms, Sortlist.

## 9. Risks

| Risk | What we do |
|---|---|
| City pages read as doorway pages | Grow each to 500+ unique words with a real local example, or merge the weakest into one "Västsverige" page |
| One person, little time to write | Two posts a month max. Repurpose client work and Wez/Jarvis lab notes |
| No client permission for names | Use industry + numbers ("logistikföretag i Ale, 40 anställda") |
| AI Overviews take clicks on how-to terms | Focus on commercial and local terms; guides aim at citations, not clicks |
| No paid SEO tool access | GSC + Bing WMT are free and enough; fix Ahrefs key if wanted |
