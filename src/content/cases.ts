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
        description: 'SökHem matchar köpare med rätt bostad varje dag och låter säljare annonsera gratis. Grundat, byggt och drivet av Anton Wester med AI-agenter.',
      },
      url: 'https://sokhem.se',
      privateLabel: null,
      facts: [
        { value: '130 000+', label: 'bostäder till salu' },
        { value: '2,5 milj.', label: 'levererade matchningar' },
        { value: '750+', label: 'områdesguider' },
      ],
      what: [
        'Köpare beskriver vad de söker en gång, ritar sina områden på en karta och matchas varje dag när rätt bostad kommer ut. Säljare annonserar gratis, med eller utan mäklare.',
        'Runt matchningen finns gratis statistik och värderingar och guider till över 750 områden i Sverige.',
      ],
      how: [
        'En monorepo med tre appar: en serverrenderad webb i React 19 och TanStack Start, ett API i Hono med oRPC och Better Auth, och bakgrundsjobb i BullMQ för matchning, notiser och inläsning av bostäder.',
        'Postgres med PostGIS och en läsreplik, Redis, Stripe och Cloudflare R2. Allt körs på egna servrar med Docker Compose, Traefik och Dokploy, med Prometheus och Grafana för mätvärden och larm. Byggt med ett arbetsflöde där AI-agenter gör mycket av utvecklingen inom tydliga ramar: agentguider, kvalitetsgrindar och låsta filer.',
      ],
      stack: ['React 19', 'TanStack Start', 'Hono', 'oRPC', 'Better Auth', 'BullMQ', 'Postgres/PostGIS', 'Redis', 'Stripe', 'Cloudflare', 'Docker', 'Traefik', 'Prometheus', 'Grafana'],
      proves: [
        'En person kan grunda, bygga och driva en nationell marknadsplats från början till slut, när AI-agenter står för volymen och skyddsräckena är designade från start.',
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
        description: 'SökHem matches buyers with the right home every day and lets sellers list for free. Founded, built and run by Anton Wester with AI agents.',
      },
      url: 'https://sokhem.se',
      privateLabel: null,
      facts: [
        { value: '130,000+', label: 'homes for sale' },
        { value: '2.5 M', label: 'matches delivered' },
        { value: '750+', label: 'area guides' },
      ],
      what: [
        'Buyers describe what they want once, draw their areas on a map and get matched every day when the right home is listed. Sellers list for free, with or without an agent.',
        'Around the matching there are free statistics and valuations, and guides to more than 750 areas in Sweden.',
      ],
      how: [
        'A monorepo with three apps: server-rendered web in React 19 and TanStack Start, an API in Hono with oRPC and Better Auth, and background workers in BullMQ for matching, notifications and listing ingestion.',
        'Postgres with PostGIS and a read replica, Redis, Stripe and Cloudflare R2. Everything runs on its own servers with Docker Compose, Traefik and Dokploy, with Prometheus and Grafana for metrics and alerting. Built with a workflow where AI agents do much of the development within clear limits: agent guides, quality gates and locked files.',
      ],
      stack: ['React 19', 'TanStack Start', 'Hono', 'oRPC', 'Better Auth', 'BullMQ', 'Postgres/PostGIS', 'Redis', 'Stripe', 'Cloudflare', 'Docker', 'Traefik', 'Prometheus', 'Grafana'],
      proves: [
        'One person can found, build and run a national marketplace end to end when AI agents carry the volume and the guardrails are designed in from the start.',
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
      tagline: 'en poängsatt granskning av allt ni levererar',
      h1: 'OpenAudit: en poängsatt granskning av allt ni levererar',
      seo: {
        title: 'OpenAudit: en poängsatt granskning | Anton Wester',
        description: 'OpenAudit är ett gratis verktyg med öppen källkod som granskar kod, webbplatser, appar, containrar och moln i en och samma poängsatta rapport.',
      },
      url: 'https://openaudit.se',
      privateLabel: null,
      facts: [
        { value: '103', label: 'granskare' },
        { value: '10', label: 'granskningsområden' },
        { value: 'A 100', label: 'eget betyg vid varje push' },
      ],
      what: [
        'En poängsatt granskning av allt ni levererar: kod, webbplatser, appar, API:er, containrar, infrastruktur, moln och mobilbyggen. Den körs från terminalen, i CI eller av en AI-agent via MCP.',
        'Överlappande fynd från flera verktyg slås ihop till ett, resultatet kommer som HTML, JSON, SARIF, Markdown eller CSV, och varje mål behandlas som opålitligt: inget byggs eller installeras i det som granskas.',
      ],
      how: [
        'Byggt på Bun med 37 egna granskare och ett antal fria skannrar inkopplade, bland andra Semgrep, Trivy, gitleaks, osv-scanner, Lighthouse och axe-core.',
        'Det finns en GitHub Action, Docker-avbildningar för flera arkitekturer med SBOM, och färdiga instruktioner för agenter som gör de bedömningar som verktyg inte klarar, till exempel behörighetsgranskning och tangentbordsnavigering.',
      ],
      stack: ['Bun', 'TypeScript', 'MCP', 'Docker', 'GitHub Actions', 'SARIF'],
      proves: [
        'Samma disciplin som jag använder i kunders system: mät, betygsätt och åtgärda, med agenter som en naturlig del av arbetet i stället för en eftertanke.',
      ],
      service: 'assessment',
      schemaType: 'SoftwareApplication',
      applicationCategory: 'DeveloperApplication',
      license: 'MIT',
    },
    en: {
      id: 'openaudit',
      name: 'OpenAudit',
      tagline: 'one scored audit of everything you ship',
      h1: 'OpenAudit: one scored audit of everything you ship',
      seo: {
        title: 'OpenAudit: one scored audit | Anton Wester',
        description: 'OpenAudit is a free, open-source tool that audits code, sites, apps, containers and cloud in one scored report, from a terminal, CI or AI agent.',
      },
      url: 'https://openaudit.se',
      privateLabel: null,
      facts: [
        { value: '103', label: 'auditors' },
        { value: '10', label: 'audit areas' },
        { value: 'A 100', label: 'its own score on every push' },
      ],
      what: [
        'One scored audit of everything you ship: code, sites, apps, APIs, containers, infrastructure, cloud and mobile builds. It runs from the terminal, in CI or from an AI agent over MCP.',
        'Overlapping findings from several tools are merged into one, results come out as HTML, JSON, SARIF, Markdown or CSV, and every target is treated as hostile: nothing in it is built or installed.',
      ],
      how: [
        'Built on Bun with 37 built-in auditors and a set of free scanners wired in, including Semgrep, Trivy, gitleaks, osv-scanner, Lighthouse and axe-core.',
        'There is a GitHub Action, multi-architecture Docker images with an SBOM, and ready-made playbooks for agents that make the judgement calls tools cannot, such as authorisation review and keyboard navigation.',
      ],
      stack: ['Bun', 'TypeScript', 'MCP', 'Docker', 'GitHub Actions', 'SARIF'],
      proves: [
        'The same discipline I bring to client systems: measure, score and fix, with agents as a natural part of the work rather than an afterthought.',
      ],
      service: 'assessment',
      schemaType: 'SoftwareApplication',
      applicationCategory: 'DeveloperApplication',
      license: 'MIT',
    },
  },
  wez: {
    sv: {
      id: 'wez',
      name: 'Wez',
      tagline: 'min egen agentmiljö',
      h1: 'Wez: min egen agentmiljö',
      seo: {
        title: 'Wez: en agentmiljö med synligt maskineri | Anton Wester',
        description: 'Wez är Anton Westers egen agentmiljö, där varje anrop, verktygsanrop, filändring, kostnad och godkännande syns medan AI-agenterna arbetar.',
      },
      url: null,
      privateLabel: 'Privat projekt, i daglig drift',
      facts: [
        { value: '1 300+', label: 'commits' },
        { value: '6', label: 'agenter i teamet' },
        { value: '3', label: 'klienter: desktop, mobil och CLI' },
      ],
      what: [
        'Min egen agentmiljö, där ett team av AI-agenter arbetar i mina projekt. Varje anrop, verktygsanrop, filändring, kostnad och godkännande syns medan det händer. Det är så jag bygger, och samma insyn får ni i det jag bygger åt er.',
        'Agenterna har roller som arkitekt, designer och QA, och miljön körs lokalt. Det är där jag bygger både kunders lösningar och mina egna produkter.',
      ],
      how: [
        'En motor på Bun med agentloop, leverantörer, verktyg och tillstånd i SQLite, skriven med Effect. Klienten är byggd i React, med en desktopapp i Electrobun och mobilklienter i Capacitor.',
        'En MCP-server låter Claude Code eller Codex styra teamet. Worktrees och fillås gör att flera agenter kan arbeta parallellt, maskiner kopplas ihop till en flotta över Tailscale, och promptcachning är en del av designen.',
      ],
      stack: ['Bun', 'Effect', 'TypeScript', 'React', 'SQLite', 'Electrobun', 'Capacitor', 'MCP', 'Tailscale'],
      proves: [
        'I efterhand går det att se vad agenterna gjorde, vad det kostade och vem som godkände det. Den spårbarheten bygger jag in i det jag levererar.',
      ],
      service: 'development',
      schemaType: 'SoftwareApplication',
      applicationCategory: 'DeveloperApplication',
      license: null,
    },
    en: {
      id: 'wez',
      name: 'Wez',
      tagline: 'my own agent harness',
      h1: 'Wez: my own agent harness',
      seo: {
        title: 'Wez: an agent harness | Anton Wester',
        description: 'Wez is Anton Wester’s own agent harness, where every request, tool call, file change, cost and approval is visible while the AI agents work.',
      },
      url: null,
      privateLabel: 'Private project, in daily use',
      facts: [
        { value: '1,300+', label: 'commits' },
        { value: '6', label: 'agents in the crew' },
        { value: '3', label: 'clients: desktop, mobile and CLI' },
      ],
      what: [
        'My own agent harness, where a crew of AI agents works in my projects. Every request, tool call, file change, cost and approval is visible while it happens. It is how I build, and you get the same visibility in what I build for you.',
        'The agents have roles such as architect, designer and QA, and the harness runs locally. It is where I build both client solutions and my own products.',
      ],
      how: [
        'An engine on Bun with the agent loop, providers, tools and SQLite state, written with Effect. The client is React, with a desktop app in Electrobun and mobile clients in Capacitor.',
        'An MCP server lets Claude Code or Codex drive the crew. Worktrees and file leases let several agents work in parallel, machines join a fleet over Tailscale, and prompt caching is part of the design.',
      ],
      stack: ['Bun', 'Effect', 'TypeScript', 'React', 'SQLite', 'Electrobun', 'Capacitor', 'MCP', 'Tailscale'],
      proves: [
        'Afterwards you can see what the agents did, what it cost and who approved it. I build that traceability into what I deliver.',
      ],
      service: 'development',
      schemaType: 'SoftwareApplication',
      applicationCategory: 'DeveloperApplication',
      license: null,
    },
  },
  lingo: {
    sv: {
      id: 'lingo',
      name: 'Lingo',
      tagline: 'AI-native lokalisering',
      h1: 'Lingo: AI-native lokalisering',
      seo: {
        title: 'Lingo: AI-native lokaliseringsplattform | Anton Wester',
        description: 'Lingo samlar översättningar, granskning, releaser och leverans för produkt-, innehålls- och utvecklingsteam, med AI som gör första versionen.',
      },
      url: 'https://lingo.antonwester.se',
      privateLabel: null,
      facts: [
        { value: 'AI-native', label: 'AI gör första översättningen' },
        { value: 'Self-hosted', label: 'körs i er egen miljö' },
        { value: 'SDK, API, CLI', label: 'för utvecklare' },
      ],
      what: [
        'En plattform där produkt-, innehålls- och utvecklingsteam hanterar översättningar, granskning, releaser och leverans på ett ställe. AI gör första versionen av varje översättning, och människor granskar och godkänner.',
      ],
      how: [
        'Byggd i React och TypeScript med Bun och Hono, med en SDK, ett API och ett CLI så att översättningarna kan hämtas direkt in i byggprocessen.',
      ],
      stack: ['React', 'TypeScript', 'Bun', 'Hono'],
      proves: [
        'Hur produktidé, systemdesign och utvecklarverktyg kan mötas i en plattform, med AI som gör grovjobbet och människor som behåller kontrollen.',
      ],
      service: 'development',
      schemaType: 'SoftwareApplication',
      applicationCategory: 'BusinessApplication',
      license: null,
    },
    en: {
      id: 'lingo',
      name: 'Lingo',
      tagline: 'AI-native localization',
      h1: 'Lingo: AI-native localization',
      seo: {
        title: 'Lingo: AI-native localization platform | Anton Wester',
        description: 'Lingo brings translations, reviews, releases and delivery together for product, content and engineering teams, with AI writing the first draft.',
      },
      url: 'https://lingo.antonwester.se',
      privateLabel: null,
      facts: [
        { value: 'AI-native', label: 'AI writes the first translation' },
        { value: 'Self-hosted', label: 'runs in your own environment' },
        { value: 'SDK, API, CLI', label: 'for developers' },
      ],
      what: [
        'A platform where product, content and engineering teams manage translations, reviews, releases and delivery in one place. AI writes the first version of every translation, and people review and approve.',
      ],
      how: [
        'Built in React and TypeScript with Bun and Hono, with an SDK, an API and a CLI so translations can be pulled straight into the build.',
      ],
      stack: ['React', 'TypeScript', 'Bun', 'Hono'],
      proves: [
        'How a product idea, systems design and developer tooling can meet in one platform, with AI doing the heavy lifting and people keeping control.',
      ],
      service: 'development',
      schemaType: 'SoftwareApplication',
      applicationCategory: 'BusinessApplication',
      license: null,
    },
  },
};

export const getCase = (id: CaseId, locale: Locale): CaseContent => cases[id][locale];
