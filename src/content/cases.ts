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
      proves: [
        'En person kan starta, bygga och driva en marknadsplats för hela Sverige, när AI gör mycket av jobbet och reglerna finns från start.',
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
      proves: [
        'One person can start, build and run a marketplace for all of Sweden when AI does much of the work and the rules are there from the start.',
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
  lingo: {
    sv: {
      id: 'lingo',
      name: 'Lingo',
      tagline: 'översättning där AI gör första versionen',
      h1: 'Lingo: översättning där AI gör första versionen',
      seo: {
        title: 'Lingo: AI-native lokaliseringsplattform | Anton Wester',
        description: 'Lingo samlar alla översättningar på ett ställe för produkt-, innehålls- och utvecklingsteam. AI skriver första versionen och människor godkänner.',
      },
      url: 'https://lingo.antonwester.se',
      privateLabel: null,
      facts: [
        { value: 'AI', label: 'gör första översättningen' },
        { value: 'Egen server', label: 'körs hos er' },
        { value: 'SDK, API, CLI', label: 'för utvecklare' },
      ],
      what: [
        'En plattform där team sköter alla översättningar på ett ställe. AI skriver första versionen, och människor läser och godkänner innan något publiceras.',
      ],
      how: [
        'Byggd i React och TypeScript med Bun och Hono. Utvecklare hämtar översättningarna direkt in i koden via en SDK, ett API eller ett CLI.',
      ],
      stack: ['React', 'TypeScript', 'Bun', 'Hono'],
      proves: [
        'Hur en produktidé och bra verktyg för utvecklare kan bli en plattform, där AI gör grovjobbet och människor behåller kontrollen.',
      ],
      service: 'development',
      schemaType: 'SoftwareApplication',
      applicationCategory: 'BusinessApplication',
      license: null,
    },
    en: {
      id: 'lingo',
      name: 'Lingo',
      tagline: 'translation where AI writes the first draft',
      h1: 'Lingo: translation where AI writes the first draft',
      seo: {
        title: 'Lingo: AI-native localization platform | Anton Wester',
        description: 'Lingo keeps all translations in one place for product, content and engineering teams. AI writes the first version, and people review and approve.',
      },
      url: 'https://lingo.antonwester.se',
      privateLabel: null,
      facts: [
        { value: 'AI', label: 'writes the first translation' },
        { value: 'Your server', label: 'runs on your own systems' },
        { value: 'SDK, API, CLI', label: 'for developers' },
      ],
      what: [
        'A platform where teams handle all their translations in one place. AI writes the first version, and people read and approve it before anything goes live.',
      ],
      how: [
        'Built in React and TypeScript with Bun and Hono. Developers pull translations straight into their code through an SDK, an API or a CLI.',
      ],
      stack: ['React', 'TypeScript', 'Bun', 'Hono'],
      proves: [
        'How a product idea and good developer tools can become one platform, where AI does the heavy lifting and people keep control.',
      ],
      service: 'development',
      schemaType: 'SoftwareApplication',
      applicationCategory: 'BusinessApplication',
      license: null,
    },
  },
};

export const getCase = (id: CaseId, locale: Locale): CaseContent => cases[id][locale];
