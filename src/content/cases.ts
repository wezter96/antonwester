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
      proves: [
        'Samma arbetssätt som jag använder hos kunder: mät, sätt betyg och åtgärda. AI-agenter är en del av arbetet från början.',
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
      proves: [
        'The same way I work for clients: measure, score and fix. AI agents are part of the work from the start.',
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
      proves: [
        'Med en egen fabrik kan en person bygga och driva hemsidor åt många kunder. Samma regler och kontroller tar jag med in i kunders projekt.',
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
      proves: [
        'With a factory of my own, one person can build and run websites for many clients. I bring the same rules and checks into client projects.',
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
      proves: [
        'I efterhand syns vad agenterna gjorde, vad det kostade och vem som godkände det. Samma insyn bygger jag in i det jag levererar.',
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
      proves: [
        'Afterwards you can see what the agents did, what it cost and who approved it. I build the same insight into what I deliver.',
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
        description: 'Copyset samlar alla produkttexter och översättningar på era egna servrar—med fyra-ögon-granskning, självreparerande AI, paketdiffar, white-label Studio och SHA-256-granskningskedja.',
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
        'Inför varje release ser teamet en fullständig paketdiff per språk, QA-kontroller för ICU och platshållare samt förhandsvisning direkt i Storybook—med omedelbar återställning i ett klick.',
      ],
      how: [
        'Byggd i React och TypeScript med Bun, Hono och Postgres. Texter släpps atomiskt som versionerade paket till S3/CDN, npm, Git eller REST API, med genererade TypeScript-typer och kryptografiskt kedjad granskningslogg.',
        'AI-agenter som Claude Code kan arbeta med Copyset via MCP: granska, föreslå utkast och lägga till nycklar, medan styrningen i kärnan garanterar att AI-utkast aldrig självgodkänns.',
      ],
      stack: ['React', 'TypeScript', 'Bun', 'Hono', 'Postgres'],
      proves: [
        'Hur en produktidé och starka utvecklarverktyg blir en enterprise-plattform där AI gör grovjobbet och företaget behåller full kontroll, spårbarhet och eget varumärke.',
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
        description: 'Copyset keeps product copy and translations on your own servers—with four-eyes review, self-repairing AI, package diffs, white-label Studio, and a SHA-256 audit chain.',
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
        'Before every release, teams inspect a full versioned package diff per locale, automated ICU and placeholder QA gates, and live Storybook component previews—with one-click rollback.',
      ],
      how: [
        'Built in React and TypeScript with Bun, Hono and Postgres. Releases ship atomically to S3/CDN, npm, Git or REST API, complete with generated TypeScript types and a SHA-256 hash-chained audit ledger.',
        'AI agents such as Claude Code can work with Copyset over MCP to add keys and draft copy, while runtime governance guarantees AI output never self-approves.',
      ],
      stack: ['React', 'TypeScript', 'Bun', 'Hono', 'Postgres'],
      proves: [
        'How a product idea and sharp developer tooling become an enterprise platform where AI does the heavy lifting while teams keep full governance, auditability and brand ownership.',
      ],
      service: 'development',
      schemaType: 'SoftwareApplication',
      applicationCategory: 'BusinessApplication',
      license: null,
    },
  },
};

export const getCase = (id: CaseId, locale: Locale): CaseContent => cases[id][locale];
