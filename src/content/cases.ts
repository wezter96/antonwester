import type { CaseId, Locale } from './routes';
import type { CaseContent, L10n } from './types';

export const cases: Record<CaseId, L10n<CaseContent>> = {
  sokhem: {
    sv: {
      id: 'sokhem',
      name: 'SökHem',
      tagline: 'en headhunter för bostäder',
      h1: 'SökHem: en headhunter för bostäder',
      seo: {
        title: 'SökHem: AI-driven bostadsmatchning | Anton Wester',
        description: 'SökHem matchar köpare med rätt bostad varje dag och låter säljare annonsera gratis. Startat, byggt och drivet av Anton Wester med hjälp av AI.',
      },
      url: 'https://sokhem.se',
      privateLabel: null,
      facts: [
        { value: '130 000+', label: 'bostäder till salu' },
        { value: '2,5 milj.', label: 'levererade matchningar' },
        { value: '750+', label: 'områdesguider' },
      ],
      what: [
        'Köpare berättar en gång vad de söker och ritar sina områden på en karta. Varje dag får de veta när en bostad som passar kommer ut. Säljare annonserar gratis, med eller utan mäklare.',
        'Det finns också gratis statistik, värderingar och guider till över 750 områden i Sverige.',
      ],
      how: [
        'Tre appar i ett kodförråd: en webb i React 19 och TanStack Start, ett API i Hono och bakgrundsjobb för matchning, notiser och inläsning av bostäder.',
        'Postgres med PostGIS, Redis och Stripe, på egna servrar med Docker. AI-agenter skriver mycket av koden, inom tydliga regler och kvalitetskontroller.',
      ],
      stack: ['React 19', 'TanStack Start', 'Hono', 'BullMQ', 'Postgres/PostGIS', 'Redis', 'Stripe', 'Cloudflare', 'Docker', 'Grafana'],
      sections: [
        {
          heading: 'Problemet',
          paragraphs: [
            'Den som letar bostad får i dag göra jobbet själv. Man sparar en sökning på en portal, får notiser som bara delvis passar och går igenom samma annonser igen nästa dag. En sparad sökning vet vilka filter man har valt, men inte vilka kvarter man vill bo i eller hur lång resan till jobbet får vara.',
            'SökHem vänder på det. Köpare berättar en gång vad de söker, och tjänsten letar åt dem. Säljarnas verktyg finns för att köparna ska hitta rätt, och därför är matchningen den viktigaste delen av produkten.',
          ],
        },
        {
          heading: 'Så fungerar matchningen',
          paragraphs: [
            'En bevakning är en köpares önskemål: pris, storlek, typ av bostad och de områden köparen har ritat på kartan. Områdena sparas som polygoner i Postgres med PostGIS, så frågan om en bostad ligger inom något av köparens områden blir en enda databasfråga. Restid till en viktig plats, som jobbet, kan också vara ett krav.',
            'Själva matchningen är ren kod utan databas. Den får en bostad och en bevakning och svarar om de passar och varför. Varje träff har koder som visar vilka krav som uppfylldes, så köparen ser varför bostaden dök upp. Eftersom kärnan inte pratar med databasen går den att testa fullt ut med vanliga enhetstester.',
            'När nya bostäder kommer in startar ett jobb som matchar dem mot bevakningarna. Matchningen körs också på schema för alla användare.',
          ],
        },
        {
          heading: 'Öppen data på varje bostad',
          paragraphs: [
            'Varje bostad får mer information än annonsen innehåller. Avstånd till vatten och till närmaste hållplats räknas fram med PostGIS och kollektivtrafikdata från Trafiklab. Områdesstatistik från SCB, skolresultat från Skolverket och polisens händelser per område läggs till. Samma data bygger områdesguiderna, statistiken och värderingarna.',
            'All text renderas på servern, så sökmotorer och AI-tjänster ser hela innehållet, och diagrammen är byggda i HTML i stället för att ritas som bilder. SökHem har en öppen MCP-server med läsverktyg för områden, öppen områdesdata och guider. Bostadsannonser och priser ingår inte där, eftersom de inte är SökHems att dela.',
          ],
        },
        {
          heading: 'Där AI används, och där den inte får bestämma',
          paragraphs: [
            'AI skriver texter som beskrivningar och områdesöversikter, beskriver bilder och svarar i chatten kring bevakningar. Anropen går genom ett gemensamt lager som provar nästa leverantör om den första inte svarar. En leverantör som ligger nere stoppar alltså inte tjänsten.',
            'Värderingen visar var gränsen går. Den bygger i första hand på statistik: jämförbara bostäder i närheten, viktade efter avstånd, där verkliga slutpriser väger tyngre än utropspriser. AI anropas bara när det finns för få jämförbara bostäder. Svaret kontrolleras mot ett schema, och värdet får inte hamna långt från det statistiska underlaget. Modellen får justera men inte hitta på.',
          ],
        },
        {
          heading: 'Notiser som kommer en gång',
          paragraphs: [
            'Köpare får notiser via mejl och webbpush, en och en eller samlade i ett sammandrag. Samma bostad kan finnas hos flera källor, så träffar slås ihop per fysisk bostad innan något skickas. En notis om samma bostad till samma köpare stoppas om den nyss har gått ut, och mejl skickas med en idempotensnyckel så att ett jobb som körs om inte ger två mejl.',
            'Jobb som misslyckas försöker igen några gånger. Ger de upp sparas de i en egen tabell i databasen. Då går det att se om en kö har haft problem hela veckan, långt efter att loggarna har roterats bort.',
          ],
        },
        {
          heading: 'Drift',
          paragraphs: [
            'SökHem körs med Docker Compose på en egen server bakom Cloudflare. Postgres har en läsreplik, och databasen säkerhetskopieras varje natt till lagring utanför servern. Containrar som slutar svara startas om automatiskt.',
            'En extern tjänst kontrollerar att sajten svarar, oberoende av servern. Grafana visar svarstider per API-anrop, fel och hur långa köerna är. När ny kod når huvudgrenen driftsätts den inom ett par minuter, efter att databasmigreringarna har körts och schemat har kontrollerats.',
          ],
        },
        {
          heading: 'Hur AI-agenterna skriver koden',
          paragraphs: [
            'Mycket av koden i SökHem skrivs av AI-agenter. Det fungerar för att reglerna står i kodförrådet och kontrolleras automatiskt. Agenterna gör fel ibland, och då är det kontrollerna som fångar felen.',
          ],
          list: [
            'Känsliga delar av koden får inte ändras utan en skriven plan.',
            'Vissa filer är skyddade och kan bara ändras medvetet.',
            'Efter varje ändring körs samma kontroller: lint, formatering, typer, importcykler och prestandagränser.',
            'Viktiga flöden testas i webbläsaren, liksom tillgänglighet och prestanda.',
            'Större ändringar granskas av en annan modell än den som skrev koden.',
          ],
        },
      ],
      proves: [
        'En person kan starta, bygga och driva en marknadsplats för hela Sverige, när AI gör mycket av jobbet och reglerna finns från start.',
        'För er som köper utveckling betyder det tre saker. AI fungerar bäst runt en kärna av vanlig, testad kod, som matchningen och värderingen. Där AI får svara behöver svaret gränser, som när värderingen hålls nära statistiken. Och driften behöver planeras från första dagen: köer, säkerhetskopior, larm och ett sätt att se vad som gick fel.',
        'Samma arbetssätt tar jag med mig när jag bygger åt kunder, från AI-kartläggningen till drift och förvaltning.',
      ],
      faq: [
        {
          q: 'Vem har byggt SökHem?',
          a: 'Anton Wester har startat, byggt och driver SökHem själv. AI-agenter skriver mycket av koden, inom tydliga regler och automatiska kontroller.',
        },
        {
          q: 'Hur används AI i SökHem?',
          a: 'Till texter, bildbeskrivningar, chatt och som stöd i värderingen när det finns för få jämförbara försäljningar. Matchningen och värderingen bygger i första hand på vanlig kod och statistik.',
        },
        {
          q: 'Kan du bygga något liknande åt oss?',
          a: 'Ja. Jag bygger AI-lösningar och plattformar åt företag, från första version till drift. AI-utveckling börjar på 60 000 kr utan moms, med fast pris per steg.',
        },
      ],
      service: 'development',
      schemaType: 'WebApplication',
      applicationCategory: 'LifestyleApplication',
      license: null,
    },
    en: {
      id: 'sokhem',
      name: 'SökHem',
      tagline: 'a headhunter for homes',
      h1: 'SökHem: a headhunter for homes',
      seo: {
        title: 'SökHem: AI-powered home matching | Anton Wester',
        description: 'SökHem matches buyers with the right home every day and lets sellers list for free. Started, built and run by Anton Wester with help from AI.',
      },
      url: 'https://sokhem.se',
      privateLabel: null,
      facts: [
        { value: '130,000+', label: 'homes for sale' },
        { value: '2.5 M', label: 'matches delivered' },
        { value: '750+', label: 'area guides' },
      ],
      what: [
        'Buyers say once what they want and draw their areas on a map. Every day they hear when a home that fits comes up. Sellers list for free, with or without an agent.',
        'There are also free statistics, valuations and guides to more than 750 areas in Sweden.',
      ],
      how: [
        'Three apps in one repo: a web app in React 19 and TanStack Start, an API in Hono, and background jobs for matching, notifications and loading listings.',
        'Postgres with PostGIS, Redis and Stripe, on its own servers with Docker. AI agents write much of the code, within clear rules and quality checks.',
      ],
      stack: ['React 19', 'TanStack Start', 'Hono', 'BullMQ', 'Postgres/PostGIS', 'Redis', 'Stripe', 'Cloudflare', 'Docker', 'Grafana'],
      sections: [
        {
          heading: 'The problem',
          paragraphs: [
            'Anyone looking for a home today has to do the work themselves. You save a search on a portal, get alerts that only partly fit and go through the same listings again the next day. A saved search knows which filters you picked, but not which neighbourhoods you want to live in or how long the trip to work may be.',
            'SökHem turns that around. Buyers say once what they want, and the service looks for them. The seller tools exist so buyers find the right home, which is why matching is the most important part of the product.',
          ],
        },
        {
          heading: 'How matching works',
          paragraphs: [
            'A watch is a buyer’s wishes: price, size, type of home and the areas the buyer has drawn on the map. The areas are stored as polygons in Postgres with PostGIS, so asking whether a home lies inside any of the buyer’s areas is a single database query. Travel time to an important place, such as work, can also be a requirement.',
            'The matching itself is plain code with no database. It gets a home and a watch and answers whether they fit and why. Each match carries codes that show which requirements were met, so the buyer sees why the home turned up. Because the core doesn’t talk to the database, it can be tested fully with ordinary unit tests.',
            'When new homes come in, a job matches them against the watches. Matching also runs on a schedule for all users.',
          ],
        },
        {
          heading: 'Open data on every home',
          paragraphs: [
            'Every home gets more information than the listing holds. Distance to water and to the nearest stop is calculated with PostGIS and public transport data from Trafiklab. Area statistics from Statistics Sweden, school results from the Swedish National Agency for Education and police events per area are added. The same data builds the area guides, the statistics and the valuations.',
            'All text is rendered on the server, so search engines and AI services see the whole content, and the charts are built in HTML rather than drawn as images. SökHem has a public MCP server with read tools for areas, open area data and guides. Listings and prices aren’t included, because they aren’t SökHem’s to share.',
          ],
        },
        {
          heading: 'Where AI is used, and where it doesn’t decide',
          paragraphs: [
            'AI writes text such as descriptions and area overviews, describes images and answers in the chat about watches. The calls go through a shared layer that tries the next provider if the first one doesn’t answer, so a provider that’s down doesn’t stop the service.',
            'The valuation shows where the line is. It rests first on statistics: comparable homes nearby, weighted by distance, where real sold prices count for more than asking prices. AI is only called when there are too few comparable homes. Its answer is checked against a schema, and the value may not land far from the statistical baseline. The model may adjust but not invent.',
          ],
        },
        {
          heading: 'Notifications that arrive once',
          paragraphs: [
            'Buyers get notifications by email and web push, one at a time or gathered in a digest. The same home can come from several sources, so matches are merged per physical home before anything is sent. A notification about the same home to the same buyer is stopped if it has just gone out, and emails are sent with an idempotency key so a job that runs again doesn’t send two emails.',
            'Jobs that fail try again a few times. If they give up, they’re saved in their own database table. That way you can see whether a queue has had trouble all week, long after the logs have rotated away.',
          ],
        },
        {
          heading: 'Operations',
          paragraphs: [
            'SökHem runs with Docker Compose on its own server behind Cloudflare. Postgres has a read replica, and the database is backed up every night to storage off the server. Containers that stop responding are restarted automatically.',
            'An external service checks that the site answers, independent of the server. Grafana shows response times per API call, errors and queue lengths. When new code reaches the main branch it’s deployed within a couple of minutes, after the database migrations have run and the schema has been checked.',
          ],
        },
        {
          heading: 'How the AI agents write the code',
          paragraphs: [
            'AI agents write much of the code in SökHem. That works because the rules are written down in the repository and checked automatically. The agents get things wrong sometimes, and the checks are what catch it.',
          ],
          list: [
            'Sensitive parts of the code may not change without a written plan.',
            'Some files are protected and can only be changed on purpose.',
            'Every change runs the same checks: lint, formatting, types, import cycles and performance limits.',
            'Key flows are tested in the browser, along with accessibility and performance.',
            'Larger changes are reviewed by a different model than the one that wrote the code.',
          ],
        },
      ],
      proves: [
        'One person can start, build and run a marketplace for all of Sweden when AI does much of the work and the rules are there from the start.',
        'If you buy development, that means three things. AI works best around a core of plain, tested code, like the matching and the valuation. Where AI does answer, the answer needs limits, as when the valuation is kept close to the statistics. And operations need planning from day one: queues, backups, alerts and a way to see what went wrong.',
        'I bring the same way of working when I build for clients, from the AI assessment to hosting and maintenance.',
      ],
      faq: [
        {
          q: 'Who built SökHem?',
          a: 'Anton Wester started, built and runs SökHem himself. AI agents write much of the code, within clear rules and automatic checks.',
        },
        {
          q: 'How is AI used in SökHem?',
          a: 'For text, image descriptions, chat, and as support in the valuation when there are too few comparable sales. Matching and valuation rest first on plain code and statistics.',
        },
        {
          q: 'Can you build something similar for us?',
          a: 'Yes. I build AI solutions and platforms for companies, from the first version to operations. AI development starts at SEK 60,000 excluding VAT, with a fixed price per step.',
        },
      ],
      service: 'development',
      schemaType: 'WebApplication',
      applicationCategory: 'LifestyleApplication',
      license: null,
    },
  },
  openaudit: {
    sv: {
      id: 'openaudit',
      name: 'OpenAudit',
      tagline: 'ett betyg på allt ni bygger',
      h1: 'OpenAudit: ett betyg på allt ni bygger',
      seo: {
        title: 'OpenAudit: en poängsatt granskning | Anton Wester',
        description: 'OpenAudit är ett gratis verktyg med öppen källkod. Det granskar kod, webbplatser, appar och servrar och ger allt ett betyg i en och samma rapport.',
      },
      url: 'https://openaudit.se',
      privateLabel: null,
      facts: [
        { value: '103', label: 'kontroller' },
        { value: '10', label: 'områden som granskas' },
        { value: 'A 100', label: 'eget betyg vid varje ändring' },
      ],
      what: [
        'Ett gratis verktyg som granskar det ni bygger: kod, webbplatser, appar och servrar. Ni får en rapport med ett betyg och en lista över vad som ska åtgärdas.',
        'Hittar flera verktyg samma fel visas det bara en gång. Verktyget kör aldrig något av det som granskas, så det är säkert att använda.',
      ],
      how: [
        'Byggt på Bun med 37 egna kontroller och kända fria verktyg som Semgrep, Trivy, gitleaks, Lighthouse och axe-core.',
        'Körs från terminalen, i CI via en GitHub Action, i Docker eller av en AI-agent via MCP. Rapporten kommer som HTML, JSON, SARIF, Markdown eller CSV.',
      ],
      stack: ['Bun', 'TypeScript', 'MCP', 'Docker', 'GitHub Actions', 'SARIF'],
      sections: [
        {
          heading: 'Problemet',
          paragraphs: [
            'Den som vill granska ett projekt ordentligt behöver många verktyg: ett för hemligheter i koden, ett för sårbara beroenden, ett för tillgänglighet och ett för prestanda. Varje verktyg har sitt eget format, och samma problem dyker upp i flera rapporter.',
            'OpenAudit kör dem tillsammans och ger en rapport med ett betyg. Betyget räknas likadant varje gång, så det syns när något blir bättre eller sämre.',
          ],
        },
        {
          heading: 'Vad den granskar',
          paragraphs: [
            'Målet kan vara en mapp med kod, en webbplats, en körande webbapp, en containerbild, infrastruktur som kod eller en mobilapp. OpenAudit känner av vad målet innehåller, som Node, Python, Docker, Terraform, Kubernetes, GitHub Actions, Android eller iOS, och kör de granskningar som passar.',
            'Områdena är bland annat säkerhet, tillgänglighet, prestanda, SEO, integritet, goda vanor och leveranskedjan, alltså de beroenden ni bygger på.',
          ],
        },
        {
          heading: 'Byggd för CI',
          paragraphs: [
            'I en pipeline kan OpenAudit stoppa en ändring när ett fynd når en viss allvarlighetsgrad. Kraschar en granskning som skulle ha hittat ett fel räknas det som ett misslyckande, så ett projekt kan inte passera för att ett verktyg gick sönder.',
            'Med en tidigare rapport som baslinje räknas bara nya fynd, och granskningen går att begränsa till filer som ändrats sedan en viss gren. Då går det att börja använda verktyget i ett gammalt projekt utan att först rätta allt. Resultatet kan sparas som SARIF, så att fynden syns direkt i GitHub.',
          ],
        },
        {
          heading: 'Byggd för AI-agenter',
          paragraphs: [
            'I JSON-läget får ett skript eller en agent bara rapporten, utan annan utskrift. Via MCP kan Claude Code, Cursor, Codex och andra agenter köra granskningar och kontrollera sina egna rättningar. En agent som har byggt något kan alltså granska resultatet innan en människa tittar.',
            'En AI-sammanfattning som prioriterar fynden kan läggas till. Misslyckas den skriver verktyget en varning och fortsätter, så rapporten är aldrig beroende av en AI-tjänst.',
          ],
        },
        {
          heading: 'Säker att köra',
          paragraphs: [
            'Saknas ett externt verktyg hoppas den granskningen över, och rapporten säger varför. I offlineläge görs inga anrop utom till själva målet. Verktyget har öppen källkod under MIT-licensen, så det går att läsa exakt vad varje kontroll gör.',
          ],
        },
      ],
      proves: [
        'Samma arbetssätt som jag använder hos kunder: mät, sätt betyg och åtgärda. AI-agenter är en del av arbetet från början.',
        'För er betyder det att ett uppdrag börjar med en mätning. En AI-kartläggning följer samma ordning: först en bild av hur det ser ut i dag, sedan en prioriterad lista över vad som är värt att göra.',
      ],
      faq: [
        {
          q: 'Kostar OpenAudit något?',
          a: 'Nej. Det är gratis och har öppen källkod under MIT-licensen.',
        },
        {
          q: 'Kan OpenAudit granska vår webbplats?',
          a: 'Ja. Den granskar både kod och webbplatser som är i drift, till exempel säkerhetsrubriker, tillgänglighet, prestanda och SEO.',
        },
        {
          q: 'Kan du granska vårt system åt oss?',
          a: 'Ja. Hör av er, så går vi igenom vad som ska granskas och vad det kostar. Ni får ett fast pris innan jag börjar.',
        },
      ],
      service: 'assessment',
      schemaType: 'SoftwareApplication',
      applicationCategory: 'DeveloperApplication',
      license: 'MIT',
    },
    en: {
      id: 'openaudit',
      name: 'OpenAudit',
      tagline: 'one score for everything you build',
      h1: 'OpenAudit: one score for everything you build',
      seo: {
        title: 'OpenAudit: one scored audit | Anton Wester',
        description: 'OpenAudit is a free, open-source tool. It checks code, websites, apps and servers, and gives it all one score in a single report.',
      },
      url: 'https://openaudit.se',
      privateLabel: null,
      facts: [
        { value: '103', label: 'checks' },
        { value: '10', label: 'areas checked' },
        { value: 'A 100', label: 'its own score on every change' },
      ],
      what: [
        'A free tool that checks what you build: code, websites, apps and servers. You get one report with a score and a list of what to fix.',
        'If several tools find the same problem, it shows only once. The tool never runs anything it checks, so it’s safe to use.',
      ],
      how: [
        'Built on Bun with 37 built-in checks and well-known free tools such as Semgrep, Trivy, gitleaks, Lighthouse and axe-core.',
        'Runs from the terminal, in CI through a GitHub Action, in Docker or from an AI agent over MCP. Reports come as HTML, JSON, SARIF, Markdown or CSV.',
      ],
      stack: ['Bun', 'TypeScript', 'MCP', 'Docker', 'GitHub Actions', 'SARIF'],
      sections: [
        {
          heading: 'The problem',
          paragraphs: [
            'Auditing a project properly takes many tools: one for secrets in the code, one for vulnerable dependencies, one for accessibility and one for performance. Each tool has its own format, and the same problem turns up in several reports.',
            'OpenAudit runs them together and gives one report with one score. The score is calculated the same way every time, so you can see when things get better or worse.',
          ],
        },
        {
          heading: 'What it checks',
          paragraphs: [
            'The target can be a folder of code, a website, a running web app, a container image, infrastructure as code or a mobile app. OpenAudit detects what the target contains, such as Node, Python, Docker, Terraform, Kubernetes, GitHub Actions, Android or iOS, and runs the audits that apply.',
            'The areas include security, accessibility, performance, SEO, privacy, best practices and the supply chain, meaning the dependencies you build on.',
          ],
        },
        {
          heading: 'Built for CI',
          paragraphs: [
            'In a pipeline, OpenAudit can stop a change when a finding reaches a given severity. If an audit that would have found a problem crashes, that counts as a failure, so a project can’t pass because a tool broke.',
            'With an earlier report as a baseline, only new findings count, and the audit can be limited to files changed since a given branch. That makes it possible to start using the tool in an old project without fixing everything first. Results can be saved as SARIF, so findings show up directly in GitHub.',
          ],
        },
        {
          heading: 'Built for AI agents',
          paragraphs: [
            'In JSON mode a script or an agent gets only the report, with no other output. Over MCP, Claude Code, Cursor, Codex and other agents can run audits and check their own fixes. An agent that has built something can audit the result before a person looks.',
            'An AI summary that prioritises the findings can be added. If it fails, the tool prints a warning and carries on, so the report never depends on an AI service.',
          ],
        },
        {
          heading: 'Safe to run',
          paragraphs: [
            'If an external tool is missing, that audit is skipped and the report says why. In offline mode no requests are made except to the target itself. The tool is open source under the MIT licence, so you can read exactly what each check does.',
          ],
        },
      ],
      proves: [
        'The same way I work for clients: measure, score and fix. AI agents are part of the work from the start.',
        'For you, that means an engagement starts with a measurement. An AI assessment follows the same order: first a picture of how things are today, then a prioritised list of what’s worth doing.',
      ],
      faq: [
        {
          q: 'Does OpenAudit cost anything?',
          a: 'No. It’s free and open source under the MIT licence.',
        },
        {
          q: 'Can OpenAudit check our website?',
          a: 'Yes. It checks both code and live websites, such as security headers, accessibility, performance and SEO.',
        },
        {
          q: 'Can you audit our system for us?',
          a: 'Yes. Get in touch and we’ll go through what to audit and what it costs. You get a fixed price before I start.',
        },
      ],
      service: 'assessment',
      schemaType: 'SoftwareApplication',
      applicationCategory: 'DeveloperApplication',
      license: 'MIT',
    },
  },
  webnu: {
    sv: {
      id: 'webnu',
      name: 'WebNu',
      tagline: 'hemsidor från en mjukvarufabrik',
      h1: 'WebNu: hemsidor från en mjukvarufabrik',
      seo: {
        title: 'WebNu: hemsidor för småföretag | Anton Wester',
        description: 'WebNu bygger hemsidor åt småföretag, och ni ser sidan innan ni betalar. Byggt av Anton Wester i en egen mjukvarufabrik där AI-agenter skriver koden.',
      },
      url: 'https://webnu.se',
      privateLabel: null,
      facts: [
        { value: '495 kr', label: 'i månaden, allt ingår' },
        { value: '100', label: 'i Lighthouse, i egna tester' },
        { value: '0', label: 'kakor och spårare' },
      ],
      what: [
        'WebNu bygger hemsidor åt småföretag, som trafikskolor, mäklare och hantverkare. Ni ser er nya sida innan ni betalar. Gillar ni den inte kostar den ingenting.',
        'Text, bilder och färger ändrar ni själva i en studio. Till sidan går det att lägga AI-chatt, bokning, betalning och en blogg som skrivs åt er.',
      ],
      how: [
        'WebNu byggs i min mjukvarufabrik: ett kodförråd med 65 domäner där AI-agenter skriver mycket av koden. Varje ändring går igenom automatiska kontroller innan den når produktion, och vart och ett av de 282 kraven är kopplat till testet som visar att det håller.',
        'Studion är skriven i React med Effect och Postgres i botten. Sidor sparas som versioner, och bara den version som någon har granskat kan publiceras. Agenter får skriva utkast men aldrig publicera.',
      ],
      stack: ['Bun', 'Effect', 'TypeScript', 'React', 'TanStack Start', 'Postgres', 'MCP', 'Docker'],
      sections: [
        {
          heading: 'Problemet',
          paragraphs: [
            'För ett litet företag blir en hemsida ofta antingen dyr att bygga eller svår att ändra själv, och ofta betalar man innan man har sett något. WebNu bygger sidan först. Ni ser den innan ni betalar, och sedan kostar den 495 kr i månaden med allt inkluderat.',
            'För att det ska gå ihop måste en sida gå snabbt att bygga, och den måste fortsätta fungera utan att någon sitter och passar den. Det är ett tekniskt problem lika mycket som ett affärsproblem. Därför är varje del av WebNu byggd för att en person ska kunna sköta många sidor, med samma byggblock, samma kontroller och samma drift för alla kunder.',
          ],
        },
        {
          heading: 'En sida är ett dokument med versioner',
          paragraphs: [
            'Varje sida är ett dokument av block, som rubrik, text, bild och bokning. En ändring sparas som en lista över vad som ändrades, och varje version sparas. Tidigare versioner kan aldrig skrivas över, och en gammal version går att återställa som ett nytt utkast.',
            'Sparar två personer samtidigt får den som sparar sist en konflikt i stället för att skriva över den andras ändring. Sidans titel och beskrivning för sökmotorer ligger i samma dokument, så de versioneras och publiceras tillsammans med sidan. Sajtkartan för sökmotorer byggs av de publicerade sidorna.',
          ],
        },
        {
          heading: 'Publicering kräver en människa',
          paragraphs: [
            'En sida publiceras bara i exakt den version någon har granskat. Servern jämför versionens hash och kontrollerar att alla block finns i den version av sajten som körs. Ett block som sajten inte känner till kan alltså inte publiceras och ge en trasig sida.',
            'Att publicera kräver ägarbehörighet och en inloggad människa. Agenter får skriva utkast men aldrig publicera, och det gäller oavsett vad agenten blir ombedd att göra.',
          ],
        },
        {
          heading: 'Mjukvarufabriken',
          paragraphs: [
            'WebNu byggs i min mjukvarufabrik, ett kodförråd där flera produkter delar samma grund. Koden ligger i sju lager, och varje lager får bara använda lagren under sig. Det kontrolleras vid varje ändring, så en grundläggande del kan aldrig börja bero på en app som bygger på den.',
            'Kraven står i klartext i egna filer, och vart och ett av de 282 kraven är kopplat till testet som visar att det håller. Vissa mått får bara bli bättre. Antalet lintvarningar är ett exempel: en ändring som lägger till fler stoppas.',
            'Ny kod går direkt till huvudgrenen genom samma kontroller varje gång: regler, lagergränser, krav, typer, lint, tester och databasens behörighetsregler. Det finns inga pull requests att vänta på, men inget kommer in innan kontrollerna är gröna.',
          ],
        },
        {
          heading: 'Agenter som ser vad en ändring påverkar',
          paragraphs: [
            'I fabriken finns en karta över hela kodbasen: kodförråd, domäner, krav och hur de hänger ihop. Innan en agent ändrar något kan den se vad ändringen påverkar. Nya produkter skapas från samma mall och får grunden som versionerade paket, så en förbättring av grunden når alla produkter.',
            'Fält med känsliga uppgifter är märkta i koden och lagras krypterade med en nyckel per företag. Kontrollerna vid varje ändring ser till att ett fält som är märkt som känsligt också lagras krypterat. Tas ett företag bort raderas nyckeln, och då går uppgifterna inte längre att läsa.',
          ],
        },
        {
          heading: 'En grund, flera produkter',
          paragraphs: [
            'WebNu delar grund med Copyset: samma inloggning, samma databas och samma sätt att låta agenter arbeta via MCP. Varje företag är en egen arbetsyta, och databasen ser till att ett företag bara ser sina egna rader.',
            'Händelser i systemet skrivs till en utkorg i databasen i samma transaktion som ändringen och skickas vidare av bakgrundsjobb. Är en mottagare nere en stund försvinner ingenting.',
          ],
        },
        {
          heading: 'Snabb och utan spårare',
          paragraphs: [
            'Sidorna får 100 i Lighthouse i mina egna tester och har inga kakor eller spårare. Besökarna slipper en kakruta, och ni slipper fundera på vilka uppgifter sidan samlar in.',
          ],
        },
      ],
      proves: [
        'Med en egen fabrik kan en person bygga och driva hemsidor åt många kunder. Samma regler och kontroller tar jag med in i kunders projekt.',
        'För er som köper utveckling visar WebNu varför reglerna behöver ligga i koden. Det är de automatiska kontrollerna som gör att AI-agenter kan skriva mycket av koden utan att kvaliteten sjunker, och de fortsätter att gälla när ingen tittar.',
      ],
      faq: [
        {
          q: 'Vad kostar en hemsida från WebNu?',
          a: '495 kr i månaden, allt ingår. Ni ser sidan innan ni betalar, och gillar ni den inte kostar den ingenting.',
        },
        {
          q: 'Kan vi ändra sidan själva?',
          a: 'Ja. Text, bilder och färger ändrar ni i studion. Varje ändring sparas som en ny version, och ni väljer när den publiceras.',
        },
        {
          q: 'Kan AI skriva på vår sida?',
          a: 'Agenter kan skriva utkast. En sida publiceras bara i en version som en människa har granskat, och att publicera kräver ägarbehörighet.',
        },
        {
          q: 'Vi behöver mer än en hemsida. Kan du hjälpa till?',
          a: 'Ja. Då är AI-utveckling rätt väg. Jag bygger AI-lösningar och integrationer med samma kontroller som i WebNu, från 60 000 kr utan moms.',
        },
      ],
      service: 'development',
      schemaType: 'WebApplication',
      applicationCategory: 'BusinessApplication',
      license: null,
    },
    en: {
      id: 'webnu',
      name: 'WebNu',
      tagline: 'websites from a software factory',
      h1: 'WebNu: websites from a software factory',
      seo: {
        title: 'WebNu: websites for small businesses | Anton Wester',
        description: 'WebNu builds websites for small businesses, and you see the site before you pay. Built by Anton Wester in his own software factory, where AI agents write the code.',
      },
      url: 'https://webnu.se',
      privateLabel: null,
      facts: [
        { value: 'SEK 495', label: 'a month, everything included' },
        { value: '100', label: 'in Lighthouse, in our own tests' },
        { value: '0', label: 'cookies and trackers' },
      ],
      what: [
        'WebNu builds websites for small businesses such as driving schools, estate agents and tradespeople. You see your new site before you pay. If you don’t like it, it costs nothing.',
        'You change text, images and colours yourself in a studio. The site can also get an AI chat, booking, payments and a blog that’s written for you.',
      ],
      how: [
        'WebNu is built in my software factory: one repo with 65 domains, where AI agents write much of the code. Every change goes through automatic checks before it reaches production, and each of the 282 requirements is linked to the test that shows it holds.',
        'The studio is written in React, with Effect and Postgres underneath. Pages are saved as versions, and only a version someone has reviewed can be published. Agents may write drafts but never publish.',
      ],
      stack: ['Bun', 'Effect', 'TypeScript', 'React', 'TanStack Start', 'Postgres', 'MCP', 'Docker'],
      sections: [
        {
          heading: 'The problem',
          paragraphs: [
            'For a small business, a website is often either expensive to build or hard to change yourself, and you often pay before you’ve seen anything. WebNu builds the site first. You see it before you pay, and then it costs SEK 495 a month with everything included.',
            'For that to add up, a site has to be quick to build and keep working without anyone looking after it. That’s a technical problem as much as a business one. So every part of WebNu is built for one person to look after many sites, with the same building blocks, the same checks and the same operations for every client.',
          ],
        },
        {
          heading: 'A page is a document with versions',
          paragraphs: [
            'Every page is a document made of blocks, such as heading, text, image and booking. A change is saved as a list of what changed, and every version is kept. Earlier versions can never be overwritten, and an old version can be restored as a new draft.',
            'If two people save at once, whoever saves last gets a conflict instead of overwriting the other’s change. The page’s title and description for search engines live in the same document, so they’re versioned and published along with the page. The sitemap for search engines is built from the published pages.',
          ],
        },
        {
          heading: 'Publishing takes a person',
          paragraphs: [
            'A page is only published in exactly the version someone reviewed. The server compares the version’s hash and checks that every block exists in the version of the site that’s running. A block the site doesn’t know can’t be published and break the page.',
            'Publishing takes owner rights and a signed-in person. Agents may write drafts but never publish, whatever the agent is asked to do.',
          ],
        },
        {
          heading: 'The software factory',
          paragraphs: [
            'WebNu is built in my software factory, one repository where several products share the same foundation. The code sits in seven layers, and each layer may only use the layers below it. That’s checked on every change, so a basic part can never start depending on an app built on top of it.',
            'The requirements are written in plain words in their own files, and each of the 282 requirements is linked to the test that shows it holds. Some measures may only get better. The number of lint warnings is one: a change that adds more is stopped.',
            'New code goes straight to the main branch through the same checks every time: rules, layer boundaries, requirements, types, lint, tests and the database’s access rules. There are no pull requests to wait for, but nothing gets in until the checks are green.',
          ],
        },
        {
          heading: 'Agents that see what a change affects',
          paragraphs: [
            'The factory holds a map of the whole codebase: repositories, domains, requirements and how they connect. Before an agent changes something, it can see what the change affects. New products are created from the same template and get the foundation as versioned packages, so an improvement to the foundation reaches every product.',
            'Fields with sensitive data are marked in the code and stored encrypted with a key per company. The checks on every change make sure a field marked as sensitive is also stored encrypted. When a company is deleted its key is deleted, and the data can no longer be read.',
          ],
        },
        {
          heading: 'One foundation, several products',
          paragraphs: [
            'WebNu shares its foundation with Copyset: the same sign-in, the same database and the same way of letting agents work over MCP. Each company is its own workspace, and the database makes sure a company only sees its own rows.',
            'Events in the system are written to an outbox in the database in the same transaction as the change, and background jobs pass them on. If a receiver is down for a while, nothing is lost.',
          ],
        },
        {
          heading: 'Fast and without trackers',
          paragraphs: [
            'The pages score 100 in Lighthouse in my own tests and have no cookies or trackers. Visitors don’t get a cookie banner, and you don’t have to worry about what data the site collects.',
          ],
        },
      ],
      proves: [
        'With a factory of my own, one person can build and run websites for many clients. I bring the same rules and checks into client projects.',
        'If you buy development, WebNu shows why the rules need to live in the code. The automatic checks are what let AI agents write much of the code without quality dropping, and they keep applying when nobody’s watching.',
      ],
      faq: [
        {
          q: 'What does a WebNu website cost?',
          a: 'SEK 495 a month, everything included. You see the site before you pay, and if you don’t like it, it costs nothing.',
        },
        {
          q: 'Can we change the site ourselves?',
          a: 'Yes. You change text, images and colours in the studio. Every change is saved as a new version, and you choose when it’s published.',
        },
        {
          q: 'Can AI write on our site?',
          a: 'Agents can write drafts. A page is only published in a version a person has reviewed, and publishing takes owner rights.',
        },
        {
          q: 'We need more than a website. Can you help?',
          a: 'Yes. Then AI development is the right path. I build AI solutions and integrations with the same checks as in WebNu, from SEK 60,000 excluding VAT.',
        },
      ],
      service: 'development',
      schemaType: 'WebApplication',
      applicationCategory: 'BusinessApplication',
      license: null,
    },
  },
  wez: {
    sv: {
      id: 'wez',
      name: 'Wez',
      tagline: 'mitt eget AI-team',
      h1: 'Wez: mitt eget AI-team',
      seo: {
        title: 'Wez: en agentmiljö med synligt maskineri | Anton Wester',
        description: 'Wez är Anton Westers eget AI-team. Varje steg, ändrad fil, kostnad och godkännande syns medan AI-agenterna arbetar i hans projekt.',
      },
      url: null,
      privateLabel: 'Privat projekt, i daglig drift',
      facts: [
        { value: '1 300+', label: 'kodändringar' },
        { value: '6', label: 'AI-agenter i teamet' },
        { value: '3', label: 'appar: dator, mobil och terminal' },
      ],
      what: [
        'Mitt eget verktyg där ett team av AI-agenter arbetar i mina projekt. Jag ser allt de gör medan det händer: varje steg, varje ändrad fil, vad det kostar och vem som godkände det.',
        'Agenterna har roller, som arkitekt, designer och testare. Här bygger jag både kunders lösningar och mina egna produkter.',
        'I röstläget pratar jag med agenterna i stället för att skriva, och de svarar med tal.',
      ],
      how: [
        'En motor på Bun, skriven med Effect, som sparar sitt tillstånd i SQLite. Appar för dator och mobil i React.',
        'Claude Code eller Codex kan styra teamet via MCP. Flera agenter kan arbeta samtidigt utan att krocka, och flera datorer kan dela på arbetet över Tailscale.',
      ],
      stack: ['Bun', 'Effect', 'TypeScript', 'React', 'SQLite', 'MCP', 'Tailscale'],
      sections: [
        {
          heading: 'Varför jag byggde det',
          paragraphs: [
            'När AI-agenter skriver kod är det svåra sällan att få dem att skriva. Det svåra är att veta vad de har gjort. Vilka filer ändrades, vilka kommandon kördes, vad kostade det och vem sa ja? Wez är byggt för att allt det ska gå att läsa medan det händer.',
            'Agenterna körs på min egen dator, mot de AI-leverantörer jag redan betalar för eller de abonnemang jag redan har. Inget går via en mellanhand.',
          ],
        },
        {
          heading: 'Allt sparas',
          paragraphs: [
            'Motorn sparar sitt tillstånd i SQLite: trådar, uppgifter på tavlan, godkännanden, behörigheter och en logg över varje anrop till en modell. Nycklarna till AI-leverantörerna ligger i operativsystemets nyckelring och aldrig i en inställningsfil.',
            'I efterhand går det därför att svara på varför något hände: vilken modell som fick vilken fråga, vilket verktyg som anropades och vad resultatet blev.',
          ],
        },
        {
          heading: 'Flera agenter utan krockar',
          paragraphs: [
            'Varje uppgift får en egen kopia av kodförrådet i en egen katalog. Två agenter kan inte skriva över varandras filer, och krockar syns först när en ändring ska in i huvudgrenen, där de går att lösa. Agenter som delar katalog turas om med lås på filnivå.',
            'En ny uppgift startar bara om datorn har kapacitet. Annars väntar den, så att inte allt blir långsamt. En katalog med osparat arbete tas aldrig bort automatiskt, eftersom den kan vara den enda kopian av en agents arbete.',
            'När en uppgift är klar läggs den ovanpå den senaste huvudgrenen, och kontrollerna körs igen innan den får komma in.',
          ],
        },
        {
          heading: 'Kostnaden syns och styrs',
          paragraphs: [
            'Varje anrop loggas med vad det kostade. Hur länge en konversation ligger kvar i modellens cache är ett eget designbeslut, uppmätt på riktiga konversationer, eftersom en förlorad cache gör nästa anrop dyrare.',
            'Gränserna för när en lång konversation ska kortas har jag provat mot mina egna trådar och räknat på vad de kostar. Det är samma sorts mätning jag gör hos kunder innan en AI-lösning tar över ett flöde.',
          ],
        },
        {
          heading: 'Fler datorer',
          paragraphs: [
            'Wez kan köras som tjänst på Linux- och Windowsdatorer som kopplas ihop över Tailscale. Flera datorer kan då dela på arbetet, och jag följer allt från datorn, mobilen eller terminalen.',
          ],
        },
      ],
      proves: [
        'I efterhand syns vad agenterna gjorde, vad det kostade och vem som godkände det. Samma insyn bygger jag in i det jag levererar.',
        'För den som köper AI-lösningar räcker det inte att agenterna klarar jobbet. Ni behöver också kunna se vad de gjorde. Lösningar jag bygger loggar vad AI:n gjorde, vad det kostade och vem som godkände, så att ni kan svara på det när någon frågar.',
      ],
      faq: [
        {
          q: 'Kan vi köpa Wez?',
          a: 'Nej. Wez är mitt eget verktyg och används i mitt arbete. Insynen det ger bygger jag in i det jag levererar till er.',
        },
        {
          q: 'Vilka AI-modeller använder Wez?',
          a: 'Modeller från flera leverantörer, via de API-nycklar och abonnemang jag redan har. Claude Code och Codex kan också styra teamet via MCP.',
        },
        {
          q: 'Vad betyder Wez för oss som kunder?',
          a: 'Att jag kan bygga snabbt utan att tappa kontrollen. Ni betalar ett fast pris per steg, så farten som agenterna ger kommer er till godo utan att ni betalar för timmar.',
        },
      ],
      service: 'development',
      schemaType: 'SoftwareApplication',
      applicationCategory: 'DeveloperApplication',
      license: null,
    },
    en: {
      id: 'wez',
      name: 'Wez',
      tagline: 'my own AI team',
      h1: 'Wez: my own AI team',
      seo: {
        title: 'Wez: an agent harness | Anton Wester',
        description: 'Wez is Anton Wester’s own AI team. Every step, changed file, cost and approval is visible while the AI agents work on his projects.',
      },
      url: null,
      privateLabel: 'Private project, in daily use',
      facts: [
        { value: '1,300+', label: 'code changes' },
        { value: '6', label: 'AI agents in the team' },
        { value: '3', label: 'apps: desktop, mobile and terminal' },
      ],
      what: [
        'My own tool where a team of AI agents works on my projects. I see everything they do as it happens: every step, every changed file, what it costs and who approved it.',
        'The agents have roles, such as architect, designer and tester. This is where I build both client solutions and my own products.',
        'In voice mode I talk to the agents instead of typing, and they answer in speech.',
      ],
      how: [
        'An engine on Bun, written with Effect, that keeps its state in SQLite. Desktop and mobile apps in React.',
        'Claude Code or Codex can steer the team over MCP. Several agents can work at once without clashing, and several computers can share the work over Tailscale.',
      ],
      stack: ['Bun', 'Effect', 'TypeScript', 'React', 'SQLite', 'MCP', 'Tailscale'],
      sections: [
        {
          heading: 'Why I built it',
          paragraphs: [
            'When AI agents write code, the hard part is rarely getting them to write. It’s knowing what they did. Which files changed, which commands ran, what did it cost and who said yes? Wez is built so all of that can be read as it happens.',
            'The agents run on my own computer, against the AI providers I already pay for or the subscriptions I already have. Nothing goes through a middleman.',
          ],
        },
        {
          heading: 'Everything is kept',
          paragraphs: [
            'The engine keeps its state in SQLite: threads, cards on the board, approvals, permissions and a log of every call to a model. The keys to the AI providers live in the operating system’s keychain, never in a settings file.',
            'So afterwards you can answer why something happened: which model got which question, which tool was called and what the result was.',
          ],
        },
        {
          heading: 'Several agents without clashes',
          paragraphs: [
            'Every task gets its own copy of the repository in its own folder. Two agents can’t overwrite each other’s files, and clashes only show when a change is about to enter the main branch, where they can be resolved. Agents that share a folder take turns with file-level locks.',
            'A new task only starts if the computer has capacity. Otherwise it waits, so everything doesn’t slow down. A folder with unsaved work is never removed automatically, because it may be the only copy of an agent’s work.',
            'When a task is done, it’s placed on top of the latest main branch and the checks run again before it gets in.',
          ],
        },
        {
          heading: 'Cost you can see and steer',
          paragraphs: [
            'Every call is logged with what it cost. How long a conversation stays in the model’s cache is a design decision of its own, measured on real conversations, because a lost cache makes the next call more expensive.',
            'I’ve tested the limits for when a long conversation should be shortened against my own threads and worked out what they cost. It’s the same kind of measuring I do for clients before an AI solution takes over a flow.',
          ],
        },
        {
          heading: 'More computers',
          paragraphs: [
            'Wez can run as a service on Linux and Windows machines joined over Tailscale. Several computers can then share the work, and I follow everything from the desktop, the phone or the terminal.',
          ],
        },
      ],
      proves: [
        'Afterwards you can see what the agents did, what it cost and who approved it. I build the same insight into what I deliver.',
        'If you’re buying AI solutions, it isn’t enough that the agents can do the job. You also need to see what they did. Solutions I build log what the AI did, what it cost and who approved it, so you can answer when someone asks.',
      ],
      faq: [
        {
          q: 'Can we buy Wez?',
          a: 'No. Wez is my own tool and is used in my work. I build the insight it gives into what I deliver to you.',
        },
        {
          q: 'Which AI models does Wez use?',
          a: 'Models from several providers, through the API keys and subscriptions I already have. Claude Code and Codex can also steer the team over MCP.',
        },
        {
          q: 'What does Wez mean for us as clients?',
          a: 'That I can build fast without losing control. You pay a fixed price per step, so the speed the agents bring works in your favour without you paying for hours.',
        },
      ],
      service: 'development',
      schemaType: 'SoftwareApplication',
      applicationCategory: 'DeveloperApplication',
      license: null,
    },
  },
  copyset: {
    sv: {
      id: 'copyset',
      name: 'Copyset',
      tagline: 'företagsstyrd lokalisering där AI gör första utkastet',
      h1: 'Copyset: företagsstyrd lokalisering där AI gör första utkastet',
      seo: {
        title: 'Copyset: Enterprise lokaliserings-CMS | Anton Wester',
        description: 'Copyset samlar produkttexter och översättningar på era egna servrar, med fyra-ögon-granskning, AI som rättar sina egna fel, paketdiffar, white-label Studio och en SHA-256-kedjad logg.',
      },
      url: 'https://copyset.antonwester.se',
      privateLabel: null,
      facts: [
        { value: 'AI + QA', label: 'utkast mot ordlistor och TM, alltid i granskning' },
        { value: 'Egen server', label: 'self-hosted, white-label och SHA-256-logg' },
        { value: 'S3, Git, npm, MCP', label: 'för produktteam, utvecklare och AI-agenter' },
      ],
      what: [
        'Ett självvärdat lokaliserings-CMS för produkt-, innehålls- och utvecklingsteam. AI skriver första utkastet mot godkänt översättningsminne och företagets ordlistor, och fyra-ögon-granskning säkerställer att en människa godkänner innan något går live.',
        'Inför varje release ser teamet en fullständig paketdiff per språk, QA-kontroller för ICU och platshållare samt förhandsvisning direkt i Storybook. Går något fel återställs förra versionen med ett klick.',
      ],
      how: [
        'Byggd i React och TypeScript med Bun, Hono och Postgres. Texter släpps atomiskt som versionerade paket till S3/CDN, npm, Git eller REST API, med genererade TypeScript-typer och kryptografiskt kedjad granskningslogg.',
        'AI-agenter som Claude Code kan arbeta med Copyset via MCP: granska, föreslå utkast och lägga till nycklar, medan styrningen i kärnan garanterar att AI-utkast aldrig självgodkänns.',
      ],
      stack: ['React', 'TypeScript', 'Bun', 'Hono', 'Postgres'],
      sections: [
        {
          heading: 'Problemet',
          paragraphs: [
            'I många produkter ligger texterna i filer i kodförrådet. Den som vill ändra en knapptext eller rätta en översättning behöver en utvecklare, och utvecklarna blir en flaskhals för något som inte är kod. Alternativet är ofta en molntjänst för översättning, och då ligger företagets texter hos någon annan.',
            'Copyset ger texterna ett eget hem på er egen server. Produktteamet skriver och granskar i en studio, utvecklarna hämtar färdiga paket och AI gör grovjobbet med första utkastet.',
          ],
        },
        {
          heading: 'En text har fyra lägen',
          paragraphs: [
            'Varje översättning är ett utkast, väntar på granskning, är godkänd eller är publicerad. Övergångarna står i en tabell i koden, och servern tillåter bara de övergångar som står där. Varje språk har också ett eget läge: öppet, där ändringar godkänns direkt, granskat eller låst.',
            'När källtexten ändras markeras översättningarna som inaktuella, så att ingen publicerar en översättning av en text som inte längre finns. Ändrar två personer samma text samtidigt får den ena en konflikt i stället för att skriva över den andra.',
          ],
        },
        {
          heading: 'AI skriver utkast, en människa godkänner',
          paragraphs: [
            'AI översätter med företagets godkända översättningsminne, ordlistor och stilguide. Klarar svaret inte kvalitetskontrollen får modellen en chans att rätta det. Det som kommer in är fortfarande ett utkast.',
            'Ändringar från AI-agenter och API-nycklar godkänns aldrig automatiskt, inte ens i ett öppet språk. Att godkänna är inget verktyg som AI kan anropa, och fyra-ögon-regeln gör att den som skrev en text inte kan godkänna den själv.',
            'Via MCP kan en agent som Claude Code lista nycklar, läsa översättningar, spara utkast och be om granskning. Publicera kan den inte.',
          ],
        },
        {
          heading: 'Kontroller innan något går ut',
          paragraphs: [
            'Samma kvalitetskontroll körs i studion, i kommandoraden, via MCP och på servern när en text sparas, godkänns eller publiceras. Den letar efter det här.',
          ],
          list: [
            'ICU-syntax som inte går att tolka.',
            'Platshållare som saknas eller tillkommer jämfört med källtexten.',
            'Texter som är längre än vad som får plats, till exempel i en knapp.',
            'Tomma texter och fel blanksteg.',
            'Ord från företagets ordlista och ord som inte får översättas.',
          ],
        },
        {
          heading: 'Inför varje release',
          paragraphs: [
            'Innan något publiceras ser teamet en förhandsvisning med nytt versionsnummer, en diff per språk och antalet fel. Publiceringen stoppas om tillgänglighetstestet med axe hittar fel i förhandsvisningen. Företaget kan också välja att stoppa den när en text har blockerande kvalitetsfel.',
            'En publicering är en ögonblicksbild av de godkända texterna, löst per språk längs en kedja av reserver: exakt språk, angivna reserver, region, språk och till sist standardspråket. Paketet sparas en gång, och databasen hindrar att det ändras. Att gå tillbaka är att flytta pekaren till ett tidigare paket i en enda transaktion.',
            'Appar hämtar paketen när de byggs eller medan de körs. Går Copyset inte att nå behåller appen det senast hämtade paketet.',
          ],
        },
        {
          heading: 'Byggt för utvecklare',
          paragraphs: [
            'Utvecklarna arbetar med Copyset från kommandoraden: hämta texter, skicka nya nycklar och källtexter till granskning, publicera och se status. Inställningarna ligger i en fil i projektet och nyckeln i en miljövariabel. När appen byggs skrivs en fil per språk, tillsammans med en låsfil som visar vilken version som används.',
            'En app kan också hämta det senaste paketet medan den körs, för att rätta en text utan att bygga om. Har inget ändrats svarar servern att paketet är detsamma, så anropet kostar nästan ingenting.',
            'För granskning finns en signerad länk som gäller i tio minuter. Den visar utkastet på plats i appen, så att granskaren ser texten där den ska stå innan den godkänns.',
          ],
        },
        {
          heading: 'Spårbarhet',
          paragraphs: [
            'Historiken för varje text kan bara fyllas på, aldrig skrivas om. Granskningsloggen är kedjad med SHA-256 per projekt: varje rad bär en hash av raden före, så en ändring i efterhand syns. Loggen kan exporteras för arkivering.',
            'Varje företag ser bara sina egna rader. Databasen filtrerar på företag med radnivåsäkerhet, och servern kontrollerar också projektet i varje anrop.',
          ],
        },
      ],
      proves: [
        'Hur en produktidé och starka utvecklarverktyg blir en plattform där AI gör grovjobbet och företaget behåller kontrollen, spårbarheten och sitt eget varumärke.',
        'För den som köper AI-lösningar visar Copyset hur ansvaret kan fördelas. AI gör det som går snabbt att kontrollera, en människa fattar beslutet, och regeln om vem som får godkänna ligger i koden.',
        'Samma uppdelning bygger jag in när AI ska skriva något åt er, vare sig det är svar till kunder, översättningar eller texter på en webbplats.',
      ],
      faq: [
        {
          q: 'Kan Copyset köras på vår egen server?',
          a: 'Ja. Copyset är byggt för att köras på er egen server, så att texterna stannar hos er.',
        },
        {
          q: 'Kan AI publicera texter i Copyset?',
          a: 'Nej. AI-agenter och API-nycklar kan skriva utkast och be om granskning. Att godkänna och publicera kräver en människa.',
        },
        {
          q: 'Hur får våra appar texterna?',
          a: 'Som versionerade paket som hämtas när appen byggs eller medan den körs, med genererade TypeScript-typer. Paketen kan levereras via npm, Git, S3 eller ett REST-API.',
        },
        {
          q: 'Vad skiljer Copyset från en översättningstjänst i molnet?',
          a: 'Copyset körs på er egen server, så texterna, historiken och granskningsloggen ligger hos er. Reglerna för vem som får godkänna och publicera bestämmer ni.',
        },
      ],
      service: 'development',
      schemaType: 'SoftwareApplication',
      applicationCategory: 'BusinessApplication',
      license: null,
    },
    en: {
      id: 'copyset',
      name: 'Copyset',
      tagline: 'enterprise copy governance where AI writes the first draft',
      h1: 'Copyset: enterprise copy governance where AI writes the first draft',
      seo: {
        title: 'Copyset: Enterprise Copy Governance & Localization | Anton Wester',
        description: 'Copyset keeps product copy and translations on your own servers, with four-eyes review, AI that repairs its own mistakes, package diffs, a white-label Studio and a SHA-256 audit chain.',
      },
      url: 'https://copyset.antonwester.se',
      privateLabel: null,
      facts: [
        { value: 'AI + QA', label: 'drafts with word lists & TM, locked in review' },
        { value: 'Your server', label: 'self-hosted, white-label & SHA-256 audit' },
        { value: 'S3, Git, npm, MCP', label: 'for product teams, developers & AI agents' },
      ],
      what: [
        'A self-hosted localization CMS for product, content and engineering teams. AI writes the first draft using approved translation memory and company word lists, while four-eyes review ensures a human approves before anything ships.',
        'Before every release, teams inspect a full versioned package diff per locale, automated ICU and placeholder QA gates, and live Storybook component previews. If something goes wrong, one click rolls back to the previous version.',
      ],
      how: [
        'Built in React and TypeScript with Bun, Hono and Postgres. Releases ship atomically to S3/CDN, npm, Git or REST API, complete with generated TypeScript types and a SHA-256 hash-chained audit ledger.',
        'AI agents such as Claude Code can work with Copyset over MCP to add keys and draft copy, while runtime governance guarantees AI output never self-approves.',
      ],
      stack: ['React', 'TypeScript', 'Bun', 'Hono', 'Postgres'],
      sections: [
        {
          heading: 'The problem',
          paragraphs: [
            'In many products the copy lives in files in the repository. Anyone who wants to change a button label or fix a translation needs a developer, and the developers become a bottleneck for something that isn’t code. The alternative is often a cloud translation service, and then the company’s copy lives with someone else.',
            'Copyset gives the copy a home of its own on your server. The product team writes and reviews in a studio, developers pull finished packages and AI does the heavy lifting of the first draft.',
          ],
        },
        {
          heading: 'A text has four states',
          paragraphs: [
            'Every translation is a draft, waiting for review, approved or published. The transitions are listed in a table in the code, and the server only allows the ones listed there. Each language also has its own mode: open, where changes are approved at once, reviewed, or locked.',
            'When the source text changes, its translations are marked as outdated, so nobody publishes a translation of text that no longer exists. If two people change the same text at once, one gets a conflict instead of overwriting the other.',
          ],
        },
        {
          heading: 'AI drafts, a person approves',
          paragraphs: [
            'AI translates with the company’s approved translation memory, word lists and style guide. If the answer fails the quality check, the model gets one chance to fix it. What comes in is still a draft.',
            'Changes from AI agents and API keys are never approved automatically, not even in an open language. Approving isn’t a tool AI can call, and the four-eyes rule means whoever wrote a text can’t approve it themselves.',
            'Over MCP, an agent such as Claude Code can list keys, read translations, save drafts and ask for review. It can’t publish.',
          ],
        },
        {
          heading: 'Checks before anything ships',
          paragraphs: [
            'The same quality check runs in the studio, in the command line, over MCP and on the server when a text is saved, approved or published. It looks for this.',
          ],
          list: [
            'ICU syntax that can’t be parsed.',
            'Placeholders that are missing or added compared with the source text.',
            'Text longer than fits, for example in a button.',
            'Empty text and stray whitespace.',
            'Words from the company glossary and words that must not be translated.',
          ],
        },
        {
          heading: 'Before every release',
          paragraphs: [
            'Before anything is published, the team sees a preview with the new version number, a diff per language and the number of errors. Publishing stops if the axe accessibility test finds problems in the preview. The company can also choose to stop it when a text has blocking quality errors.',
            'A publish is a snapshot of the approved texts, resolved per language along a fallback chain: exact language, declared fallbacks, region, language and finally the default language. The package is stored once, and the database prevents it from changing. Rolling back means moving the pointer to an earlier package in a single transaction.',
            'Apps pull the packages when they build or while they run. If Copyset can’t be reached, the app keeps the last package it pulled.',
          ],
        },
        {
          heading: 'Built for developers',
          paragraphs: [
            'Developers work with Copyset from the command line: pull copy, push new keys and source strings for review, publish and check status. Settings live in a file in the project and the key in an environment variable. When the app builds, it writes one file per language along with a lock file that shows which version is in use.',
            'An app can also fetch the latest package while it runs, to fix a text without rebuilding. If nothing has changed, the server answers that the package is the same, so the call costs almost nothing.',
            'For review there’s a signed link that’s valid for ten minutes. It shows the draft in place in the app, so the reviewer sees the text where it belongs before approving it.',
          ],
        },
        {
          heading: 'Traceability',
          paragraphs: [
            'The history of every text can only grow, never be rewritten. The audit log is chained with SHA-256 per project: each row carries a hash of the row before, so a change after the fact shows. The log can be exported for archiving.',
            'Each company sees only its own rows. The database filters by company with row-level security, and the server also checks the project in every call.',
          ],
        },
      ],
      proves: [
        'How a product idea and sharp developer tooling become a platform where AI does the heavy lifting while teams keep full governance, auditability and brand ownership.',
        'If you’re buying AI solutions, Copyset shows how responsibility can be split. AI does what’s quick to check, a person makes the decision, and the rule about who may approve lives in the code.',
        'I build the same split in whenever AI writes something for you, whether it’s replies to customers, translations or copy on a website.',
      ],
      faq: [
        {
          q: 'Can Copyset run on our own server?',
          a: 'Yes. Copyset is built to run on your own server, so your copy stays with you.',
        },
        {
          q: 'Can AI publish copy in Copyset?',
          a: 'No. AI agents and API keys can write drafts and ask for review. Approving and publishing takes a person.',
        },
        {
          q: 'How do our apps get the copy?',
          a: 'As versioned packages pulled when the app builds or while it runs, with generated TypeScript types. Packages can be delivered through npm, Git, S3 or a REST API.',
        },
        {
          q: 'How is Copyset different from a cloud translation service?',
          a: 'Copyset runs on your own server, so the copy, the history and the audit log stay with you. You decide the rules for who may approve and publish.',
        },
      ],
      service: 'development',
      schemaType: 'SoftwareApplication',
      applicationCategory: 'BusinessApplication',
      license: null,
    },
  },
};

export const getCase = (id: CaseId, locale: Locale): CaseContent => cases[id][locale];
