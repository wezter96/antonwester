# antonwester.se redesign — design spec

Date: 2026-10-14
Status: draft for review
Reference mockup: `.superpowers/brainstorm/9288-1791999451/content/direction-a-v6.html` (direction A, "Westerly")

## 1. Goal

Rebuild antonwester.se from the ground up so that it:

1. Positions Anton Wester as an **AI-konsult** who finds where AI and automation pay off in a business, builds it, and maintains it.
2. Looks and moves like a senior motion designer and a software architect made it together: premium, distinctive, calm.
3. Ranks better than today: fixes the existing duplicate-home bug, keeps every URL that exists, and adds pages that target real searches.
4. Exists fully in Swedish (default, at `/`) and English (at `/en/`).

### Success criteria

- Every URL in today's sitemap still resolves and keeps its canonical, except `/sv/`, which consolidates into `/` (section 6.1).
- Lighthouse on mobile, for the home, one service, one case and one city page: Performance ≥ 95, Accessibility 100, Best practices 100, SEO 100.
- Core Web Vitals in the lab: LCP < 2.0 s, CLS < 0.05, INP not blocked by our scripts (all motion work runs off the main input path).
- Total JavaScript shipped on the home page ≤ 25 KB gzip, Lenis included.
- No content depends on JavaScript to be visible. With JS off, every page reads completely and the scan tool shows its steps as a static list with a mailto action.
- The site passes the taste-skill `lint.mjs` and `inspect.mjs` gates, except for the deviations listed in section 9 that the client asked for.

## 2. Positioning and voice

- **Primary title:** "AI-konsult i Göteborg" / "AI consultant in Gothenburg". This is the term buyers search for. "Fullstack-arkitekt" does not appear in titles; the architect credential lives in structured data (`jobTitle`) and the about section.
- **The offer in one sentence:** "Jag hittar var AI och automation lönar sig i er verksamhet, bygger det och underhåller det." / "I find where AI and automation pay off in your business, build it, and maintain it."
- **The three stages:** Hitta. Bygg. Förvalta. / Find. Build. Run. Running it (hosting, monitoring, security, updates, improvements) is the default; handing over to the client's team is an option.
- **Supporting offer:** Fractional CTO, on its own page.
- **Voice:** plain, concrete, first person singular. No hype words. Swedish copy is written as Swedish, not translated.
- **Proof rules:** client names appear without metrics or engagement details. Numbers appear only for Anton's own products, and only numbers those products publish themselves.

## 3. Information architecture

All paths end with `/`. Each Swedish page has an English twin and vice versa.

| Page | Swedish | English | Primary search target |
| --- | --- | --- | --- |
| Home | `/` | `/en/` | AI-konsult Göteborg / AI consultant Gothenburg |
| AI assessment (Find) | `/sv/ai-kartlaggning/` | `/en/ai-assessment/` | AI-kartläggning, AI-analys av verksamheten |
| AI development (Build) | `/sv/ai-utveckling/` | `/en/ai-development/` | AI-utveckling, AI-agenter, AI-automation för företag |
| Hosting and maintenance (Run) | `/sv/drift-och-forvaltning/` | `/en/hosting-and-maintenance/` | drift och förvaltning av AI-lösningar |
| Fractional CTO | `/sv/fractional-cto/` | `/en/fractional-cto/` | fractional CTO |
| Case: SökHem | `/sv/case/sokhem/` | `/en/case/sokhem/` | brand + "AI bostadsplattform" |
| Case: OpenAudit | `/sv/case/openaudit/` | `/en/case/openaudit/` | brand + "open source audit" |
| Case: Wez | `/sv/case/wez/` | `/en/case/wez/` | brand + "agent harness" |
| Case: Lingo | `/sv/case/lingo/` | `/en/case/lingo/` | brand + "AI localization" |
| City × 8 | `/sv/{city}/` | `/en/{city}/` | AI-konsult {stad} |
| 404 | `/404.html` | | |

Cities (unchanged slugs): stenungsund, ale, kungalv, partille, trollhattan, kungsbacka, boras, varberg. Gothenburg is the home page.

Legacy URLs kept working:

- `/sv/` becomes a redirect page to `/` (meta refresh 0, `rel=canonical` to `/`, excluded from the sitemap).
- `/{city}/` (the old Swedish duplicates) keep their canonical to `/sv/{city}/` and gain a meta refresh to it.

Why the home page owns "AI-konsult" and there is no separate AI-konsult service page: two pages targeting the same term would compete with each other. The service pages each target a different, narrower intent, and link back to the home page with "AI-konsult" anchor text.

Canonical page count: 2 home + 8 service + 8 case + 16 city = 34.

## 4. The home page, section by section

Composition, type, colour and motion follow the v6 mockup. Swedish copy shown; English mirrors it (section 10 has both).

1. **Hero.**
   - Navigation in the top bar: AW monogram + "Anton Wester", then Arbeten, Arbetssätt, Om mig, Kontakt, and the language switch. No button in the bar.
   - The name "ANTON WESTER" is set as a monument across about 82 % of the viewport width, with the portrait inside the word space.
   - Bottom left: the H1 continuation plus the offer sentence. Bottom right: "Räkna på era timmar" (a link to the scan) and "Boka ett introsamtal" (the orange button, to the Google Calendar booking link).
   - H1 markup: `<h1><span class="monument">Anton Wester</span><span class="sr-only">, </span><span class="h1-tail">AI-konsult i Göteborg.</span></h1>`. Its accessible text is "Anton Wester, AI-konsult i Göteborg." The tail is positioned as the bold start of the offer sentence. The offer sentence that follows is a `<p>`.
2. **Logo bar ("Arbetat med" / "Worked with").** Runs along the bottom edge of the first screen and drifts slowly. The order is IVC Evidensia, Evinova, Telia, FAR, Sejfa, Tiimo, Future Memories, zodiapps, weapp. Logos are monochrome. Future Memories is its symbol plus the name set in Archivo. zodiapps is its name set in Archivo with its dot. The label has a solid ground that fades into the moving logos through a gradient. A second fade sits at the right edge.
3. **The scan ("Var lönar sig AI hos er?").** The working tool from the mockup (section 7).
4. **Approach ("Hitta. Bygg. Förvalta.").** Three large words at increasing width (wdth 62, 96, 125), each with a run-in paragraph. Each paragraph ends with a link to its service page.
5. **Work ("Jag bygger egna produkter också.").**
   - OpenAudit, SökHem and Wez as alternating rows: a real screenshot on one side, then the name, a description, three facts and a link.
   - Wez is labelled "Privat projekt, i daglig drift" and links to its case page, not to an external site.
   - Below the rows, a "Dessutom:" line names Lingo (case page) and T4 Stack (external link).
6. **About ("Om mig").**
   - A large portrait and a short bio: Chalmers computer engineering, more than seven years building products for web, iOS and Android, Tech Lead at weapp, earlier Telia, now AI products and his own platforms.
   - The bio is followed by the experience history as a real `<table>` with years, role and company. Rows are separated by a tone step, not lines. Entries: Anton Wester AB, weapp (Tech Lead, Software Engineer), Telia, Chalmers.
   - The stack is one plain sentence (TypeScript, React, React Native, Node, Bun, Postgres, Docker, LLM integration, agents, MCP), which also carries those search terms.
   - Links to LinkedIn, GitHub and the CV PDF.
   - No client metrics.
7. **FAQ.** Six questions, as native `<details>` elements. The questions are listed in section 10; Anton supplies the answers marked "needs input".
8. **Contact ("Låt oss hitta era timmar.").**
   - Booking button, email, and the form (Formsubmit, as today).
   - The inquiry options are AI-kartläggning, AI-utveckling, Drift och förvaltning, Fractional CTO and Annat.
   - Hidden fields receive the scan estimate when the visitor uses "Skicka uppskattningen till mig".
9. **Footer.**
   - The name returns at full width.
   - Below it: Anton Wester AB, Göteborg; the email; LinkedIn, GitHub and the CV; the language switch.
   - A row of city links ("AI-konsult i Partille" and the rest) and service links, for internal linking.

## 5. Other page types

All share the nav, the footer, the contact block and the section crossfade.

- **Service page.**
  - A short hero: H1 = the service name with its search term, plus one sentence and the orange button.
  - Then: what you get, how it runs (steps as a real `<ol>`), who it suits, typical first engagement, related case(s), FAQ (3–4 questions, FAQPage schema) and contact.
  - At least 600 words of real copy per language. The Find page embeds the scan tool. The Run page explains hosting, monitoring, security and updates, plus the handover option.
- **Case page.**
  - Hero: product name as a monument (the same fit and load sequence as the home name, without the portrait) and a one-line description.
  - Then: a large screenshot, "Vad det är", "Hur det är byggt" (stack and architecture in plain words), "Vad det visar" (what it proves about how Anton works), public numbers where they exist, a link to the product, and the next case.
  - Wez and Lingo have no external link if they are private.
- **City page.**
  - H1 "AI-konsult i {stad}". The current local content is rewritten toward AI: local focus, delivery mode, nearby areas, highlights.
  - It reuses the home page's scan, approach and work sections, with a city-specific FAQ.
  - Each city keeps its unique paragraphs so the pages are not thin duplicates.

## 6. SEO

### 6.1 Fixes to what exists

- One Swedish home. `/` is canonical. `/sv/` redirects to it, and every hreflang `sv` reference to the home points to `/`. The sitemap lists `/`, not `/sv/`.
- hreflang clusters are reciprocal on every page: `sv`, `en`, and `x-default` pointing to the English page. A build-time test checks reciprocity (section 12).

### 6.2 Head tags per page

| | Pattern (sv) | Pattern (en) | Rule |
| --- | --- | --- | --- |
| Title, home | AI-konsult i Göteborg \| Anton Wester | AI Consultant in Gothenburg \| Anton Wester | ≤ 60 characters |
| Title, service | {Tjänst} \| AI-konsult Anton Wester | {Service} \| AI consultant Anton Wester | ≤ 60 characters |
| Title, case | {Produkt}: {vad det är} \| Anton Wester | {Product}: {what it is} \| Anton Wester | ≤ 60 characters |
| Title, city | AI-konsult i {stad} \| Anton Wester | AI Consultant in {city} \| Anton Wester | ≤ 60 characters |
| Description | | | 120–160 characters, unique, includes the page's search term |
| H1 | | | exactly one per page, contains the search term |

Open Graph and Twitter tags as today, with new images (section 11).

### 6.3 Structured data (JSON-LD)

- `Organization` (Anton Wester AB), `WebSite`, `WebPage` and `BreadcrumbList` on every page.
- `Person`:
  - `jobTitle`: "AI-konsult och systemarkitekt" / "AI consultant and software architect".
  - `alumniOf`: Chalmers.
  - `knowsAbout`: AI agents, LLM integration, process automation, MCP, TypeScript, React, React Native, software architecture, DevOps.
  - `sameAs`: LinkedIn, GitHub, openaudit.se, sokhem.se.
- `ProfessionalService` on home and city pages, with `areaServed` (the cities) and a `hasOfferCatalog` that lists the four services.
- `Service` on each service page.
- `FAQPage` wherever a FAQ is rendered.
- On case pages:
  - OpenAudit: `SoftwareApplication` (license MIT, `applicationCategory` DeveloperApplication).
  - SökHem: `WebApplication`.
  - Wez and Lingo: `SoftwareApplication`.

### 6.4 Files

- `sitemap.xml`: generated from the route registry, canonical pages only, with `xhtml:link` alternates.
- `robots.txt`: allows everything, points to the sitemap, and does not block AI crawlers.
- `llms.txt`: rewritten for the AI-konsult positioning, then generated from the same content modules so it never drifts. It lists the services, cases, contact details and both language homes.

### 6.5 Internal linking

- Home links to the 4 service pages (approach), the cases (work) and the cities (footer).
- Each service page links to its related cases and back home with "AI-konsult i Göteborg".
- Each case links to the next case and to the matching service.
- Each city page links to home, the services and two nearby cities.

## 7. The scan tool

**Data.** Five business functions per locale: Kundtjänst, Ekonomi, Försäljning, Administration, Rapportering (en: Customer service, Finance, Sales, Administration, Reporting). Each has 4–5 steps, and each step has:

- a label;
- a default mode: `you`, `assist` or `agent`;
- a share of the function's time. The shares in a function sum to 1.

The data is defined once in a typed content module and rendered on the server.

**Interaction.**

- Choosing a function widens its name (the wdth effect) and swaps in its steps with a short stagger.
- Each step has a three-way segmented control: Ni, Assisterat, Agent.
- A range input sets hours per week, from 2 to 120.
- The result tweens over 600 ms.

**Calculation.** hours per year = hours/week × 46 × Σ(share × weight), where agent = 0.8, assist = 0.4 and you = 0. The result is rounded to 10. Below it: about N full-time weeks (hours ÷ 40). The method is printed under the result in plain words.

**Handoff.** "Skicka uppskattningen till mig" glides to the contact form. It prefills the message with the function, each step's mode, the hours and the estimate, and sets hidden fields so the email to Anton carries the same data.

**Without JS.** The default function's steps render as a static list with their default modes and a short explanation. The button becomes a `mailto:` link with a written subject.

**Accessibility.**

- Functions are `<button aria-pressed>`.
- Each step's control is a labelled group of `aria-pressed` buttons.
- The result is in an `aria-live="polite"` region.
- Everything is keyboard-operable with visible focus.

## 8. Design system

**Colour.**

| Token | Value | Use |
| --- | --- | --- |
| `--fog` | `#E7E9E4` | light ground |
| `--fog-2` | `#DADED7` | light tone step (logo bar, work section) |
| `--ink` | `#0C1E22` | dark ground; text on light |
| `--ink-2` | `#13292E` | dark tone step (scan rows) |
| `--ink-3` | `#1B363C` | second dark step |
| `--muted` | `#4C5A5B` | secondary text on light (≈ 5.9:1 on fog) |
| `--muted-ink` | `#93A6A8` | secondary text on dark (≈ 6.8:1 on ink) |
| `--signal` | `#FF5A1F` | buttons, the scan result, Agent selections (ink on signal ≈ 6:1) |

**Type.**

- Archivo variable (wdth 62–125, wght 100–900), self-hosted as a Latin subset woff2 with å, ä, ö, é and ü, and preloaded.
- The fallback face uses `size-adjust` and ascent/descent overrides to match Archivo, so the swap causes no layout shift.
- Five sizes:

| Step | Size |
| --- | --- |
| body | `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)` |
| lead | `clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)` |
| sub | `clamp(1.5rem, 1.1rem + 1.4vw, 2.1rem)` |
| head | `clamp(2.5rem, 1.2rem + 4.4vw, 5rem)` |
| monument | sized so the name fills about 82 % of the viewport width |

- The monument size is a CSS `vw` value computed from Archivo's measured advance widths at build time, so it is correct before any script runs. Script only refines it after the fonts load.

**Layout.** One 12-column grid with margins of `clamp(16px, 2.2vw, 32px)`. Section padding is 120–200 px on desktop. Left-aligned throughout.

**Components.**

- Button: orange fill, square corners, ink fill slides up on hover.
- Text link: underline that wipes out on hover.
- The logo bar, the scan tool, case rows, the approach stages, the FAQ and the form.

**Phone composition (390 px).**

- The name stacks on two lines, ANTON and WESTER, with the portrait between them at full width in 3:2.
- The logo bar sits under the offer sentence.
- The scan's functions become a horizontally scrolling row.
- Steps stack, with the segmented control under each label.
- The result and the button follow the steps.
- Case rows stack with the screenshot first.

## 9. Motion

| Moment | Behaviour | Budget |
| --- | --- | --- |
| Load sequence | Once per page view, never on scroll. Letters widen from 62 to 100 with a 55 ms stagger. The portrait opens from the centre at 0.45 s. The nav fades at 0.2 s, the offer sentence at 0.95 s, the actions at 1.08 s, and the logo bar slides up at 1.2 s. | ≈ 1.9 s total |
| Name: lens + ripple | When the pointer moves over the hero, the letters near it widen smoothly. A click or tap on a letter sends a spring wave through all 11 letters. A horizontal touch drag acts as the lens. The script runs only while something is moving. | about 11 springs; idle at 0 % CPU |
| Logo bar | A linear drift on a 52 s loop. It pauses on hover and when it holds focus. | CSS only |
| Section crossfade | When a section crosses 60 % of the viewport, the ground fades to that section's colour over 0.8 s and the text over 0.45 s, using registered `@property` colours. Scrolling back reverses it. Browsers without `@property` switch instantly. | 1 scroll listener, rAF-throttled |
| Smooth scroll | Lenis for the mouse wheel and trackpad. Keyboard and touch scrolling stay native. Anchor links glide. | ≈ 4 KB gzip |
| Micro-interactions | Button fill, link wipe, scan function width, step stagger, result tween. | CSS + a few lines |

Rules:

- Motion uses only `transform`, `opacity` and font variation.
- There are no scroll-triggered reveals.
- `prefers-reduced-motion: reduce` turns off the load sequence (content shows immediately), the lens and ripple, the drift (the logos wrap statically), the crossfade (instant), Lenis and the tweens.
- The `pre` state that hides content before the load sequence is set by an inline script in the head, only when JS runs and motion is allowed, so no-JS visitors and crawlers never see hidden content.

**Deviations from the taste-skill house rules, at the client's request:**

- A gradient on the logo bar.
- A logo row.

Both are documented here so the inspector exceptions are deliberate.

## 10. Copy deck (home page)

Swedish first, English second. Copy from the v6 mockup carries over unless listed here.

- **Nav:**
  - sv: Arbeten, Arbetssätt, Om mig, Kontakt, English
  - en: Work, Approach, About, Contact, Svenska
- **Hero:**
  - sv: H1 "Anton Wester, AI-konsult i Göteborg". Offer sentence: "Jag hittar var AI och automation lönar sig i er verksamhet, bygger det och underhåller det." Actions: "Räkna på era timmar" and "Boka ett introsamtal".
  - en: "AI consultant in Gothenburg. I find where AI and automation pay off in your business, build it, and maintain it." Actions: "Estimate your hours" and "Book an intro call".
- **Logo bar:** "Arbetat med" / "Worked with".
- **Scan:**
  - sv: "Var lönar sig AI hos er?" and "Välj en del av verksamheten. Justera stegen efter hur det ser ut hos er, ange teamets timmar och ta med siffran till vårt första samtal."
  - en: "Where does AI pay off for you?" and "Pick a part of the business. Adjust the steps to match how you work, set your team's hours, and bring the number to our first call."
- **Approach, Förvalta / Run:**
  - sv: "**Jag driftar och förvaltar det åt er:** hosting, övervakning, säkerhet, uppdateringar och löpande förbättringar. Vill ni hellre driva det själva får teamet koden, dokumentationen och utbildningen. Ni väljer, och det finns ingen inlåsning."
  - en: "**I host and run it for you:** monitoring, security, updates and steady improvements. If you would rather run it yourselves, your team gets the code, the docs and the training. Your choice, and no lock-in."
- **Wez:**
  - sv: "Min egen agentmiljö, där ett team av AI-agenter arbetar i mina projekt. Varje anrop, verktygsanrop, filändring, kostnad och godkännande syns medan det händer. Det är så jag bygger, och samma insyn får ni i det jag bygger åt er."
  - en: "My own agent harness, where a crew of AI agents works in my projects. Every request, tool call, file change, cost and approval is visible while it happens. It is how I build, and you get the same visibility in what I build for you."
  - Facts: 1 300+ commits; 6 agents; desktop, mobile and CLI.
- **FAQ questions.** Answers are drafted by Anton or confirmed by him:
  1. Vad kostar en AI-kartläggning? (needs input: price model)
  2. Hur snabbt kan vi ha något i drift? (needs input)
  3. Hur hanterar ni säkerhet, GDPR och EU:s AI-förordning?
  4. Vilka AI-modeller och verktyg använder du?
  5. Kan du drifta lösningen åt oss, eller tar vårt team över?
  6. Jobbar du på plats eller på distans?
- **Contact:** "Låt oss hitta era timmar." / "Let's find your hours."

The service, case and city page copy is written during implementation from the outlines in section 5, and then reviewed by Anton.

## 11. Assets

| Asset | Source | Status |
| --- | --- | --- |
| Client logos | Official files: IVC Evidensia, Evinova and FAR from their sites; Telia from Wikimedia Commons; Sejfa (inline SVG) and weapp from their sites; Tiimo as a PNG wordmark; Future Memories symbol. Stored in `public/clients/`, stripped of metadata, rendered monochrome through CSS masks. | downloaded; Anton confirms permission to show each |
| zodiapps | Name set in Archivo with its dot (they publish no logo file) | done in mockup |
| Product screenshots | openaudit.se and sokhem.se (captured), Lingo (lingo.antonwester.se), Wez (from `bun run demo`) | Wez and Lingo to capture |
| Portrait | Anton supplies `portrait.jpg`, at least 2000 px wide, light and neutral background | needs input |
| AW monogram | Flat vector redraw of the current mark, ink and signal | to draw |
| Favicons | Regenerated from the monogram | to make |
| OG images | One per language for home, services and cities (name monument on fog), one per case (screenshot + name). PNG, 1200 × 630, generated by a build script with Playwright and committed. | to make |
| Fonts | Archivo variable, self-hosted subset | to prepare |

## 12. Architecture

Astro 6 static output, deployed by the existing GitHub Pages workflow. No UI framework. There is no Effect code: Effect is installed but unused in `src/`, and the redesign does not need it.

```
src/
  content/            typed content modules, the single source of truth
    site.ts           siteConfig, contact, links
    routes.ts         route registry: page id × locale → path, alternates, sitemap entry
    clients.ts        logo bar entries
    services.ts       four services, both locales
    cases.ts          four cases, both locales
    cities.ts         eight cities, both locales (rewritten from portfolio-shared.ts)
    scan.ts           scan functions and steps, both locales
    faq.ts            FAQs per page type
    ui.ts             interface strings per locale
  layouts/Base.astro  head, SEO, JSON-LD, fonts, theme boot script
  components/         Nav, Hero, LogoBar, Scan, Approach, Work, CaseRow, About, Faq, Contact, Footer, Monument, ServiceHero, CaseHero
  scripts/            motion.ts (load sequence, lens + ripple), theme.ts (section crossfade), smooth.ts (Lenis), scan.ts, form.ts
  styles/             tokens.css, base.css
  pages/              index, en/index, sv/index (redirect), [city] (legacy), sv/[city], en/[city],
                      sv/{service}, en/{service}, sv/case/[slug], en/case/[slug], sitemap.xml.ts, robots.txt.ts, llms.txt.ts, 404
```

- The route registry generates paths, canonical URLs, hreflang alternates, sitemap entries, nav links and footer links, so they cannot disagree.
- Scripts are Astro-processed `<script>` modules: bundled, hashed and deferred. Only the home, case and city pages load `motion.ts`.
- The existing data files (`portfolio.ts`, `portfolio-shared.ts`, `portfolio-content/*`) are replaced by `content/`. Their city data moves over and is rewritten.

## 13. Verification

- `npm run build` and `npm run typecheck` pass.
- A route test (a Node script run after the build) checks every built page for:
  - one canonical;
  - reciprocal hreflang;
  - a title of 60 characters or fewer;
  - a description of 120–160 characters;
  - exactly one H1;
  - valid JSON-LD (it parses, and has `@type`);
  - a sitemap that lists exactly the canonical set.
- The taste-skill `lint.mjs` and `inspect.mjs` run at 1440, 768 and 390 px, followed by a screenshot critique.
- Playwright checks: reduced motion, JS disabled (all content visible), keyboard path through the scan and the form.
- Unlighthouse on the deployed preview of the home, one service, one case and one city page, against the success criteria.

## 14. What carries over from today's site

Nothing carries over from today's design: not its layout, palette, type, cards or motion. Only some sections' content carries over, and each of those sections is redesigned from scratch to the rules in sections 8 and 9.

| Today's section | What happens to it |
| --- | --- |
| Hero with headline, stats and ticker | Replaced by the name monument hero. The "7+ years" and language stats move into the about section's prose. The skills ticker is dropped; the stack becomes one sentence in About. |
| Local landing ("Lokalt i Västsverige") | Its content (local focus, delivery mode, nearby areas, location links) moves to the city pages. There it is redesigned as one composition: the city name large, nearby areas set as a single typographic line, and the local paragraphs in a reading column. On the home page it survives only as the footer's city links. |
| Services (four cards) | Replaced by the approach section (Hitta, Bygg, Förvalta) and the four service pages. Fractional CTO keeps its own page. |
| Selected work (five cards) | Replaced by the work section: three full rows with real screenshots, plus a "Dessutom" line. Sejfa and Sqillz leave the project list, because they were client work and the logo bar now carries the clients. |
| Experience timeline | Redesigned as the experience table in About. |
| FAQ | Kept as content, rewritten for AI-konsult, rebuilt as `<details>`. |
| Contact (direct options and form) | Rebuilt as the closing section: booking button, email, the form with new inquiry options and the scan handoff. |
| CV download | Kept, in About. |
| Footer availability line | Becomes one line in the contact section ("Tar nya uppdrag", or whatever Anton prefers). |

## 15. Out of scope

- A blog or articles section. The route registry makes adding one easy later.
- A CMS.
- Dark/light theme toggling. Today's theme boot script is removed; the section crossfade replaces it.
- Wezacitor (the Capacitor fork). It could become a case page later.

## 16. Open items for Anton

1. Portrait photo.
2. Permission to show each client logo.
3. FAQ answers 1 and 2 (price model, time to first delivery).
4. Confirm that Wez is independent of the extracted Voidleap material it sits next to on disk, since the site presents it as your own.
5. Whether Wez and Lingo case pages link anywhere public.
