# Implementation roadmap

Start: 2026-11-03. Owner: Anton. Time budget: about 4 hours a week.

## Phase 1: Foundation (weeks 1–4)

| # | Task | Where | Done when |
|---|---|---|---|
| 1 | Connect Google Search Console and Bing Webmaster Tools; submit sitemap | external | Baseline numbers in `SEO-STRATEGY.md` KPI table |
| 2 | ✅ 2026-11-03: dropped the fake sitemap `lastmod` (it was the build date) | `src/pages/sitemap.xml.ts` | No `lastmod` |
| 3 | ✅ Not needed: own-product cases already use SoftwareApplication (right type). Use `Article` only for future client cases | `src/lib/seo.ts` | — |
| 4 | Run Rich Results Test on one page per type; fix errors | external | No errors |
| 5 | ✅ 2026-11-03 (not deployed): about page `/sv/om/`, `/en/about/` with `ProfilePage` + portrait; portrait also on home. Swap `src/assets/portrait.jpg` for a sharper photo later | `routes.ts`, `AboutPage.astro` | Live, linked from footer |
| 6 | Price page (sv + en) | `routes.ts`, new page | Live, linked from every service page |
| 7 | Google Business Profile (service-area, no address shown) | external | Verified |
| 8 | Fix Ahrefs API key (optional) | `~/.claude` MCP config | `site-explorer-metrics` works |

Dependencies: 1 before any KPI work. 5 and 6 need copy (use `human-writing`).

## Phase 2: Expansion (weeks 5–12)

| # | Task | Done when |
|---|---|---|
| 9 | All 6 service pages at 800+ words, each with a case or quote | Word count check passes |
| 10 | `/sv/guide/` section + first 2 guides | Indexed in GSC |
| 11 | First client case study | Live with numbers |
| 12 | Citations: allabolag, hitta, eniro, Bing Places, Apple Business Connect | Same NAP everywhere |
| 13 | Profiles: Clutch, GoodFirms, Sortlist | Live, link to site |
| 14 | City pages batch 1 to 500+ words | 4 pages pass |
| 15 | Internal link rules from `SITE-STRUCTURE.md` | Every guide → service, every service → price + case |

## Phase 3: Scale (weeks 13–24)

| # | Task | Done when |
|---|---|---|
| 16 | City pages batch 2 to 500+, or merge weak ones with 301 | All 8 pass, or merged |
| 17 | First 2 industry pages | Live, linked from city pages |
| 18 | 4 more guides | Indexed |
| 19 | Outreach: list owners (Alice Labs, OSKI), Business Region Göteborg, AI Sweden, local business networks | 10+ new referring domains |
| 20 | GEO: answer-first rewrites of top 5 pages; update `llms.txt` | AI engines name the site in 1 of 3 checks |
| 21 | Performance check (PageSpeed / Unlighthouse) after new pages | All green |

## Phase 4: Authority (months 7–12)

| # | Task | Done when |
|---|---|---|
| 22 | Own survey of West Swedish small firms and AI | Published, 3+ sites cite it |
| 23 | Talks or guest posts (Business Region Göteborg, meetups, podcasts) | 2 done |
| 24 | Client cases #2 and #3 | Live |
| 25 | English versions of best 3 guides | Live with hreflang |
| 26 | Quarterly: prune or merge pages with no impressions after 6 months | Review log |
| 27 | Wikidata item for Anton Wester AB (when press exists to cite) | Item live, in `sameAs` |

## Resources

- Time: ~4 h/week writing and fixes. Code tasks (2–6) are small: one session each.
- Money: none needed. Optional: Ahrefs (already have a key), a photographer for the about page.
- Input from clients: permission for cases, quotes, reviews. Ask at project end.

## Checks per phase

| Phase | Gate to move on |
|---|---|
| 1 | GSC baseline recorded; about + price pages live; schema valid |
| 2 | 6 service pages ≥ 800 words; 1 client case; 2 guides indexed |
| 3 | No city page under 500 words; 10+ new referring domains |
| 4 | Organic intro calls ≥ 3 / month |
