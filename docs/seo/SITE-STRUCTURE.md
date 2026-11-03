# Site structure

Routes live in `src/content/routes.ts` (`PageRef`, `pathFor`). New page kinds go there, so sitemap, hreflang and `llms.txt` pick them up.

## URL tree (sv shown; en mirrors it)

```
/                                 Home: "AI-konsult i Göteborg"           exists
├── /sv/ai-kartlaggning/          Service                                 exists, grow to 800+
├── /sv/ai-utveckling/            Service (hub for agents + automation)   exists
│   ├── /sv/ai-agenter/           Service                                 exists, grow to 800+
│   └── /sv/ai-automation/        Service                                 exists, grow to 800+
├── /sv/drift-och-forvaltning/    Service                                 exists, grow to 800+
├── /sv/fractional-cto/           Service                                 exists, grow to 800+
├── /sv/priser/                   Prices and how a project runs           NEW (Phase 1)
├── /sv/om/                       About Anton (Person, ProfilePage)       NEW (Phase 1)
├── /sv/case/<id>/                Cases                                   exists (4 own products)
│   └── + 2–3 client cases                                                NEW (Phase 2)
├── /sv/bransch/<id>/             Industry pages                          NEW (Phase 2–3)
│   ├── logistik
│   ├── tillverkning
│   └── kemi-och-processindustri
├── /sv/guide/                    Guides index                            NEW (Phase 2)
│   └── /sv/guide/<slug>/
├── /sv/<city>/                   8 city pages                            exists, grow to 500+
├── /sv/boka/                     Book a call                             exists
└── /sv/integritet/               Privacy                                 exists
```

English slugs: `/en/prices/`, `/en/about/`, `/en/industry/<id>/`, `/en/guide/<slug>/`.

**Language rule.** Write Swedish first. Ship the English page only when it is a real translation, not a stub. Until then, no hreflang pair for that page.

## Page types: content and schema

| Page type | Min words | Must have | Schema |
|---|---|---|---|
| Home | 800 | H1 with "AI-konsult i Göteborg", 3 steps, cases, FAQ, about short | ProfessionalService, Organization, Person, WebSite, FAQPage |
| Service | 800 | What it is, who it suits, steps, deliverables, price range, one case or quote, FAQ, CTA to book | Service (provider → Organization), BreadcrumbList, FAQPage |
| Price | 600 | Ranges per service, what drives cost, example projects | WebPage, FAQPage |
| About | 600 | Photo, bio, education, roles, links, lab | ProfilePage + Person (`sameAs`: LinkedIn, GitHub) |
| Case | 1,000 | Problem, approach, build, numbers, timeline, quote, related service | Article (author → Person), BreadcrumbList |
| Industry | 800 | Typical problems, 3 uses, one example, related services and towns | Service with `audience`, BreadcrumbList |
| Guide | 1,200 | Answer first, steps, own experience, byline, updated date | BlogPosting (author, dateModified), BreadcrumbList |
| City | 500, 40%+ unique | Local industry, a local example, nearby towns, how we meet | ProfessionalService with `areaServed` = city, BreadcrumbList |

## City page quality gate

- 8 pages now. Warn at 30, stop at 50 (template rule). Plan: stay at 8–10.
- Each page needs one fact only true for that town (an industry, a named employer type, a real client).
- If a page cannot reach 500 unique words in Phase 2, fold it into its neighbour (`neighbours` field in `src/content/cities.ts`) with a 301.

## Internal links

```
Home ──► each service ──► its cases, its industries, price page, book
  │           ▲
  │           └── guides link up to 1–2 services (commercial anchor)
  ├──► cities ──► home + 2 neighbours + 2 services
  └──► about ◄── every guide byline and case
```

Rules:
1. Every guide links to one service page with a descriptive anchor ("AI-agenter för kundtjänst"), not "läs mer".
2. Every service page links to the price page and at least one case.
3. Every case links to the service it used.
4. City pages link to the nearest industry page.
5. Footer: services, about, prices, guides, book.

## Sitemap

- Keep the current generator (`src/pages/sitemap.xml.ts`). It already reads `allPages()`.
- Fix `lastmod`: use a real per-page date (from content or git), not the build date.
- Do not list the 404 or redirect targets.
