import type { Locale, ServiceId } from './routes';
import type { L10n, ServiceContent } from './types';

export const services: Record<ServiceId, L10n<ServiceContent>> = {
  assessment: {
    sv: {
      id: 'assessment',
      stage: 'find',
      name: 'AI-kartläggning',
      seo: {
        title: 'AI-kartläggning för företag | Anton Wester',
        description: 'En AI-kartläggning visar var AI och automation lönar sig i er verksamhet: vilka processer, vad det kostar att bygga och vad det sparar.',
      },
      h1: 'AI-kartläggning för företag',
      promise: 'Se var AI lönar sig innan ni bygger.',
      intro: 'Innan något byggs vill ni veta var AI faktiskt gör skillnad. I en AI-kartläggning går jag igenom hur arbetet görs i dag, uppskattar var timmarna går och rankar möjligheterna efter vad de sparar och vad de kostar att bygga.',
      sections: [
        {
          heading: 'Vad ni får',
          paragraphs: ['Kartläggningen slutar i ett konkret underlag som ni kan fatta beslut på, oavsett om ni bygger med mig, med ert eget team eller inte alls.'],
          list: [
            'En karta över de processer som tar mest tid, med uppskattade timmar per vecka och vem som gör jobbet i dag.',
            'En prioriterad lista över var AI och automation lönar sig, med uppskattad tidsbesparing och byggkostnad för varje punkt.',
            'En bedömning av riskerna: vilken data som berörs, säkerhet, GDPR och var EU:s AI-förordning påverkar.',
            'Ett förslag på ett första steg som går att bygga på några veckor och mäta.',
          ],
        },
        {
          heading: 'Vad jag tittar efter',
          paragraphs: [
            'De bästa möjligheterna är sällan de mest omtalade. Ofta handlar det om arbete som upprepas varje dag: mejl som sorteras, data som förs över mellan system, dokument som sammanfattas och rapporter som byggs av siffror från flera ställen.',
            'Jag bedömer varje steg utifrån tre frågor: hur mycket tid det tar, hur förutsägbart det är och vad som händer om det blir fel. Steg som är tidskrävande, förutsägbara och lätta att kontrollera passar bra för en agent. Steg där ett fel kostar mycket behåller en människa, ibland med AI som stöd.',
            'Resultatet är inte en rapport som hamnar i en låda. Varje punkt på listan har en ägare, en uppskattad effekt och ett förslag på hur ni mäter att den fungerar efter att den är byggd.',
          ],
        },
        {
          heading: 'Varför börja med en kartläggning',
          paragraphs: [
            'Många AI-projekt börjar med en lösning och letar sedan efter ett problem. Det blir dyrt, och det är anledningen till att så många piloter aldrig når drift. En kartläggning vänder på ordningen: först var tiden går, sedan vad som är värt att bygga.',
            'Eftersom jag också bygger och driftar lösningarna blir bedömningarna praktiska. Jag vet vad en integration mot ett affärssystem brukar kosta, hur lång tid en agent tar att få stabil och vad som krävs för att den ska fungera även om ett år, när modellerna och verktygen har bytts ut.',
          ],
        },
      ],
      steps: [
        'Ett första samtal där vi går igenom verksamheten, målen och vilka delar som känns tyngst i dag.',
        'Intervjuer och genomgångar med dem som gör jobbet. Jag tittar på verktyg, flöden och var information flyttas för hand.',
        'Jag uppskattar tiden per steg och bedömer vad en agent, en automation eller en bättre integration kan ta över.',
        'Ni får kartan och den prioriterade listan, och vi går igenom den tillsammans med ledningen.',
      ],
      fitsWhen: [
        'Ni vet att AI kan hjälpa men inte var ni ska börja.',
        'Flera personer lägger timmar varje vecka på samma manuella moment.',
        'Ni har testat ChatGPT eller Copilot men inte fått in det i det riktiga arbetet.',
        'Ledningen vill ha ett beslutsunderlag innan budgeten läggs.',
      ],
      firstEngagement: 'Ett typiskt första uppdrag är en avgränsad kartläggning av en eller två avdelningar. Den tar några veckor, och resultatet är ert att använda hur ni vill.',
      relatedCases: ['openaudit', 'wez'],
      faq: [
        { q: 'Hur lång tid tar en AI-kartläggning?', a: 'Det beror på hur många avdelningar och processer som ingår. En avgränsad kartläggning av en avdelning brukar ta några veckor från första samtal till genomgång med ledningen.' },
        { q: 'Måste vi bygga med dig efteråt?', a: 'Nej. Kartan och den prioriterade listan är er. Många väljer att bygga första steget tillsammans med mig, men underlaget fungerar lika bra för ert eget team eller en annan leverantör.' },
        { q: 'Behöver vi ha ordning på vår data först?', a: 'Nej. En del av kartläggningen är att se vilken data som finns, var den finns och vad som behöver göras för att AI ska kunna använda den säkert.' },
      ],
    },
    en: {
      id: 'assessment',
      stage: 'find',
      name: 'AI assessment',
      seo: {
        title: 'AI assessment for companies | Anton Wester',
        description: 'An AI assessment shows where AI and automation pay off in your business: which processes, what they cost to build and what they save.',
      },
      h1: 'AI assessment for companies',
      promise: 'See where AI pays before you build.',
      intro: 'Before anything is built, you want to know where AI actually makes a difference. In an AI assessment I go through how the work is done today, estimate where the hours go, and rank the opportunities by what they save and what they cost to build.',
      sections: [
        {
          heading: 'What you get',
          paragraphs: ['The assessment ends in concrete material you can decide on, whether you build with me, with your own team or not at all.'],
          list: [
            'A map of the processes that take the most time, with estimated hours per week and who does the work today.',
            'A ranked list of where AI and automation pay off, with the estimated time saved and the cost to build for each item.',
            'A view of the risks: which data is involved, security, GDPR and where the EU AI Act applies.',
            'A proposed first step that can be built in a few weeks and measured.',
          ],
        },
        {
          heading: 'What I look for',
          paragraphs: [
            'The best opportunities are rarely the most talked about. They are usually work that repeats every day: email being sorted, data being moved between systems, documents being summarised, and reports being assembled from numbers in several places.',
            'I judge each step by three questions: how much time it takes, how predictable it is and what happens if it goes wrong. Steps that are time-consuming, predictable and easy to check suit an agent. Steps where a mistake is expensive keep a person, sometimes with AI as support.',
            'The result is not a report that ends up in a drawer. Every item on the list has an owner, an estimated effect and a way to measure that it works once it is built.',
          ],
        },
        {
          heading: 'Why start with an assessment',
          paragraphs: [
            'Many AI projects start with a solution and then look for a problem. That gets expensive, and it is why so many pilots never reach production. An assessment turns the order around: first where the time goes, then what is worth building.',
            'Because I also build and run these solutions, the judgements stay practical. I know what an integration with a business system tends to cost, how long an agent takes to become stable and what it takes for it to still work in a year, after the models and tools have changed.',
          ],
        },
      ],
      steps: [
        'A first call where we go through the business, the goals and the parts that feel heaviest today.',
        'Interviews and walk-throughs with the people who do the work. I look at tools, flows and where information is moved by hand.',
        'I estimate the time per step and judge what an agent, an automation or a better integration can take over.',
        'You get the map and the ranked list, and we go through it together with leadership.',
      ],
      fitsWhen: [
        'You know AI can help but not where to start.',
        'Several people spend hours every week on the same manual task.',
        'You have tried ChatGPT or Copilot but not fitted it into the real work.',
        'Leadership wants a basis for decisions before the budget is set.',
      ],
      firstEngagement: 'A typical first engagement is a contained assessment of one or two departments. It takes a few weeks, and the result is yours to use however you like.',
      relatedCases: ['openaudit', 'wez'],
      faq: [
        { q: 'How long does an AI assessment take?', a: 'It depends on how many departments and processes are included. A contained assessment of one department usually takes a few weeks from the first call to the walk-through with leadership.' },
        { q: 'Do we have to build with you afterwards?', a: 'No. The map and the ranked list are yours. Many choose to build the first step with me, but the material works just as well for your own team or another supplier.' },
        { q: 'Does our data need to be in order first?', a: 'No. Part of the assessment is seeing which data exists, where it lives and what needs to happen for AI to use it safely.' },
      ],
    },
  },
  development: {
    sv: {
      id: 'development',
      stage: 'build',
      name: 'AI-utveckling',
      seo: {
        title: 'AI-utveckling och AI-agenter | Anton Wester',
        description: 'AI-utveckling för företag: agenter, automation och integrationer som tar över rutinarbete, byggda med tester, loggar och mänskligt godkännande.',
      },
      h1: 'AI-utveckling och AI-agenter',
      promise: 'Agenter och automation som gör jobbet.',
      intro: 'När ni vet var AI lönar sig är nästa steg att bygga det på riktigt. Jag utvecklar agenter, automationer och integrationer som tar över avgränsade steg i ert arbete, i er stack och med samma krav på kvalitet som resten av era system.',
      sections: [
        {
          heading: 'Vad jag bygger',
          paragraphs: [
            'Det mesta jag bygger handlar om att flytta rutinarbete från människor till system, utan att människorna tappar kontrollen.',
            'Varje lösning börjar smalt. Hellre en agent som klarar ett steg helt och hållet än en som klarar tio steg till hälften.',
          ],
          list: [
            'Agenter som läser, sorterar och besvarar inkommande mejl och ärenden utifrån era egna hjälpartiklar och rutiner.',
            'Automation av ekonomiflöden: matchning av fakturor, påminnelser om kvitton och förslag på kontering.',
            'Agenter som sammanfattar, översätter och jämför långa dokument och flaggar det som behöver en människas bedömning.',
            'Rapporter som byggs automatiskt av siffror från flera system, med en sammanfattning av vad som har ändrats.',
            'Integrationer mot CRM, affärssystem och dokumentarkiv via API:er och MCP, så att agenterna arbetar i de verktyg ni redan har.',
          ],
        },
        {
          heading: 'Byggt för att hålla',
          paragraphs: [
            'En agent som fungerar i en demo är lätt att bygga. En agent som fungerar varje dag i ett år kräver mer. Därför bygger jag med tester mot riktiga exempel, loggar över varje anrop och verktygsanrop, kostnadsuppföljning per process och tydliga gränser för vad agenten får göra på egen hand.',
            'Steg där ett misstag kostar mycket går via ett mänskligt godkännande. Agenten förbereder, en människa beslutar, och allt sparas så att ni i efterhand kan se vem som gjorde vad. Det är samma principer som krävs i reglerade miljöer, och jag har byggt mjukvara i sådana miljöer, bland annat inom medicinteknik.',
          ],
        },
        {
          heading: 'I er stack, inte i min',
          paragraphs: [
            'Jag bygger i den teknik ni redan har när det är rimligt, eller i en lätt och modern stack med TypeScript, Node eller Bun och Postgres när ni börjar från noll. Språkmodellerna väljs efter uppgiften: ibland en stor modell från Anthropic eller OpenAI, ibland en mindre öppen modell som kan köras på er egen server.',
            'Koden är er från första dagen. Den ligger i ert repo, är dokumenterad och går att ta över av ert team eller av en annan leverantör om ni vill.',
          ],
        },
      ],
      steps: [
        'Vi utgår från kartläggningen, eller gör en kort genomgång av processen om ni redan vet vad som ska byggas.',
        'Jag bygger en första version mot riktiga exempel från er verksamhet och mäter hur ofta agenten gör rätt.',
        'Ett fåtal personer i teamet använder den i det vanliga arbetet, och vi justerar tills den håller måttet.',
        'Lösningen går i drift med övervakning, och jag driftar den åt er eller lämnar över till ert team.',
      ],
      fitsWhen: [
        'Ni vet vilken process ni vill automatisera men saknar någon som kan bygga det.',
        'Ni har en pilot som fungerade i en demo men aldrig kom i drift.',
        'Era system behöver prata med varandra innan AI kan göra nytta.',
        'Ni arbetar i en bransch där spårbarhet och godkännanden är ett krav.',
      ],
      firstEngagement: 'Ett typiskt första bygge är en agent för en enda process, till exempel inkommande kundmejl. Den brukar gå att ha i drift inom några veckor, och sedan bygger vi vidare utifrån vad den faktiskt sparar.',
      relatedCases: ['sokhem', 'wez'],
      faq: [
        { q: 'Vilka AI-modeller använder du?', a: 'Den som passar uppgiften bäst sett till kvalitet, kostnad och var er data får behandlas. Jag använder modeller från bland andra Anthropic och OpenAI och öppna modeller som kan köras på egen server, och bygger så att modellen går att byta.' },
        { q: 'Vad händer om agenten gör fel?', a: 'Varje agent har tydliga gränser för vad den får göra själv. Riskfyllda steg kräver ett mänskligt godkännande, allt loggas, och vi mäter träffsäkerheten mot riktiga exempel innan den får mer ansvar.' },
        { q: 'Kan du bygga i vår befintliga teknik?', a: 'Ja, i de flesta fall. Jag har byggt i allt från stora företagsmiljöer till nya plattformar och anpassar mig efter er stack, era rutiner för kodgranskning och era krav på säkerhet.' },
      ],
    },
    en: {
      id: 'development',
      stage: 'build',
      name: 'AI development',
      seo: {
        title: 'AI development and AI agents | Anton Wester',
        description: 'AI development for companies: agents, automation and integrations that take over routine work, built with tests, logs and human approval.',
      },
      h1: 'AI development and AI agents',
      promise: 'Agents and automation that do the work.',
      intro: 'Once you know where AI pays off, the next step is to build it for real. I develop agents, automations and integrations that take over contained steps of your work, in your stack and to the same quality bar as the rest of your systems.',
      sections: [
        {
          heading: 'What I build',
          paragraphs: [
            'Most of what I build moves routine work from people to systems, without the people losing control.',
            'Every solution starts narrow. One agent that fully handles one step beats one that half handles ten.',
          ],
          list: [
            'Agents that read, sort and answer incoming email and tickets based on your own help articles and routines.',
            'Automated finance flows: matching invoices, chasing receipts and suggesting how transactions should be coded.',
            'Agents that summarise, translate and compare long documents and flag what needs a person’s judgement.',
            'Reports built automatically from numbers in several systems, with a summary of what has changed.',
            'Integrations with your CRM, business system and document stores through APIs and MCP, so agents work in the tools you already have.',
          ],
        },
        {
          heading: 'Built to last',
          paragraphs: [
            'An agent that works in a demo is easy to build. An agent that works every day for a year takes more. So I build with tests against real examples, logs of every request and tool call, cost tracking per process and clear limits on what the agent may do on its own.',
            'Steps where a mistake is expensive go through human approval. The agent prepares, a person decides, and everything is kept so you can see afterwards who did what. These are the same principles regulated environments require, and I have built software in such environments, including medical technology.',
          ],
        },
        {
          heading: 'In your stack, not mine',
          paragraphs: [
            'I build in the technology you already have when that makes sense, or in a light, modern stack with TypeScript, Node or Bun and Postgres when you start from scratch. Models are chosen per task: sometimes a large model from Anthropic or OpenAI, sometimes a smaller open model that runs on your own server.',
            'The code is yours from day one. It lives in your repository, is documented, and can be taken over by your team or another supplier whenever you like.',
          ],
        },
      ],
      steps: [
        'We start from the assessment, or a short walk-through of the process if you already know what to build.',
        'I build a first version against real examples from your business and measure how often the agent gets it right.',
        'A few people on the team use it in their normal work, and we adjust until it meets the bar.',
        'It goes into production with monitoring, and I run it for you or hand it over to your team.',
      ],
      fitsWhen: [
        'You know which process to automate but have nobody to build it.',
        'You have a pilot that worked in a demo but never reached production.',
        'Your systems need to talk to each other before AI can help.',
        'You work in an industry where traceability and approvals are required.',
      ],
      firstEngagement: 'A typical first build is one agent for one process, such as incoming customer email. It can usually be running within a few weeks, and then we build on what it actually saves.',
      relatedCases: ['sokhem', 'wez'],
      faq: [
        { q: 'Which AI models do you use?', a: 'Whichever fits the task best in quality, cost and where your data may be processed. I use models from Anthropic, OpenAI and others, and open models that can run on your own server, and I build so the model can be swapped.' },
        { q: 'What happens when the agent gets something wrong?', a: 'Every agent has clear limits on what it may do alone. Risky steps need human approval, everything is logged, and we measure accuracy against real examples before it gets more responsibility.' },
        { q: 'Can you build in our existing technology?', a: 'Yes, in most cases. I have built in everything from large enterprise environments to new platforms, and I adapt to your stack, your code review routines and your security requirements.' },
      ],
    },
  },
  operations: {
    sv: {
      id: 'operations',
      stage: 'run',
      name: 'Drift och förvaltning',
      seo: {
        title: 'Drift och förvaltning av AI-lösningar | Anton Wester',
        description: 'Drift och förvaltning av AI-lösningar: hosting, övervakning, säkerhet och löpande förbättringar, eller en överlämning till ert team utan inlåsning.',
      },
      h1: 'Drift och förvaltning',
      promise: 'För era AI-lösningar, varje dag.',
      intro: 'En AI-lösning är inte klar när den går i drift. Modeller byts ut, priser ändras, data växer och verksamheten förändras. Jag driftar och förvaltar det jag bygger, så att det fortsätter att fungera och blir bättre med tiden.',
      sections: [
        {
          heading: 'Vad som ingår',
          paragraphs: ['Förvaltningen anpassas efter hur viktig lösningen är för er, men grunden är densamma.'],
          list: [
            'Hosting i EU-regioner eller på era egna servrar, beroende på var er data får behandlas.',
            'Övervakning och larm, så att fel upptäcks innan era kunder eller medarbetare märker dem.',
            'Säkerhetsuppdateringar och uppdatering av beroenden.',
            'Uppdatering av modeller och instruktioner när leverantörerna ändrar något, med tester som visar att resultatet håller.',
            'Kostnadskontroll per process, så att ni ser vad varje agent kostar och vad den sparar.',
            'En månatlig genomgång av vad agenterna har gjort och var de kan ta över mer.',
          ],
        },
        {
          heading: 'Samma drift som för mina egna produkter',
          paragraphs: [
            'Jag driver själv SökHem och OpenAudit i produktion. SökHem körs på egna servrar med Docker, Traefik och Dokploy, med Prometheus och Grafana för mätvärden och larm. Det är samma verktyg och rutiner som jag använder för kunders lösningar.',
            'Det betyder att ni inte får en konsult som försvinner efter lanseringen, utan någon som själv har stått med ansvaret för system som ska vara uppe dygnet runt.',
          ],
        },
        {
          heading: 'Eller ta över själva',
          paragraphs: [
            'Vill ni hellre driva lösningen själva får ert team koden, dokumentationen och den utbildning som behövs. Allt ligger i ert repo från start och bygger på öppna och vanliga verktyg.',
            'Ni kan också börja med att jag driftar och ta över längre fram. Det finns ingen inlåsning, och överlämningen är planerad från första dagen.',
          ],
        },
        {
          heading: 'Vad ni kan förvänta er',
          paragraphs: [
            'Förvaltning handlar mest om det som inte syns. När allt fungerar märks den inte, och det är målet. Men när något händer, som att en leverantör har en driftstörning, att en modell börjar svara annorlunda eller att en integration slutar fungera efter en uppdatering i ert affärssystem, är det jag som får larmet och åtgärdar det.',
            'Varje månad får ni en kort sammanfattning: hur många ärenden agenterna har hanterat, hur ofta en människa behövde gå in, vad det har kostat och vilken förbättring som är nästa steg. Det gör det enkelt för ledningen att se vad investeringen ger och att prioritera nästa process.',
          ],
        },
      ],
      steps: [
        'Vi går igenom kraven på tillgänglighet, säkerhet och var data får behandlas.',
        'Jag sätter upp hosting, övervakning, larm och säkerhetskopiering.',
        'Löpande drift med uppdateringar och åtgärder när något avviker.',
        'En månatlig genomgång av resultat, kostnader och nästa förbättring.',
      ],
      fitsWhen: [
        'Ni vill ha AI i verksamheten men inte bygga upp en egen driftorganisation för det.',
        'Ni har en lösning i drift som ingen riktigt äger.',
        'Ni behöver kunna visa hur systemet övervakas och vem som ansvarar för det.',
      ],
      firstEngagement: 'Ett typiskt upplägg är att jag driftar lösningen jag har byggt åt er, med övervakning, uppdateringar och en månatlig genomgång av vad den har gjort och vad den kostar.',
      relatedCases: ['sokhem', 'openaudit'],
      faq: [
        { q: 'Var körs lösningen?', a: 'Där er data får behandlas. Oftast i en EU-region hos en molnleverantör, ibland på era egna servrar. Det bestämmer vi utifrån era krav på säkerhet och dataskydd innan något byggs.' },
        { q: 'Vad händer när en AI-leverantör ändrar sin modell?', a: 'Det händer regelbundet. Jag kör testerna mot den nya modellen innan något byts, justerar instruktionerna vid behov och byter bara när resultatet är minst lika bra som tidigare.' },
        { q: 'Kan vi ta över driften senare?', a: 'Ja. Koden, dokumentationen och driftmiljön är era från start. När ni vill ta över planerar vi en överlämning med utbildning för ert team.' },
        { q: 'Vem äger datan?', a: 'Ni. All data stannar i er miljö eller hos de leverantörer ni har godkänt, och den används inte för att träna några modeller. När uppdraget avslutas får ni med er allt.' },
      ],
    },
    en: {
      id: 'operations',
      stage: 'run',
      name: 'Hosting and maintenance',
      seo: {
        title: 'AI hosting and maintenance | Anton Wester',
        description: 'Hosting and maintenance for AI solutions: monitoring, security, updates and steady improvements, or a handover to your team with no lock-in.',
      },
      h1: 'Hosting and maintenance',
      promise: 'For your AI solutions, every day.',
      intro: 'An AI solution is not finished when it goes live. Models get replaced, prices change, data grows and the business moves on. I host and maintain what I build, so it keeps working and gets better over time.',
      sections: [
        {
          heading: 'What is included',
          paragraphs: ['The setup follows how critical the solution is to you, but the foundation is the same.'],
          list: [
            'Hosting in EU regions or on your own servers, depending on where your data may be processed.',
            'Monitoring and alerts, so problems are caught before your customers or staff notice them.',
            'Security updates and dependency updates.',
            'Model and instruction updates when providers change something, with tests that show the results still hold.',
            'Cost control per process, so you can see what each agent costs and what it saves.',
            'A monthly review of what the agents have done and where they can take on more.',
          ],
        },
        {
          heading: 'The same operations as my own products',
          paragraphs: [
            'I run SökHem and OpenAudit in production myself. SökHem runs on its own servers with Docker, Traefik and Dokploy, with Prometheus and Grafana for metrics and alerting. Those are the same tools and routines I use for client solutions.',
            'So you do not get a consultant who disappears after launch, but someone who has carried the responsibility for systems that need to be up around the clock.',
          ],
        },
        {
          heading: 'Or run it yourselves',
          paragraphs: [
            'If you would rather run the solution yourselves, your team gets the code, the documentation and the training it needs. Everything lives in your repository from the start and builds on open, common tools.',
            'You can also start with me running it and take over later. There is no lock-in, and the handover is planned from day one.',
          ],
        },
        {
          heading: 'What you can expect',
          paragraphs: [
            'Maintenance is mostly about what you never see. When everything works it goes unnoticed, and that is the point. But when something happens, such as a provider outage, a model that starts answering differently or an integration that breaks after an update to your business system, I get the alert and fix it.',
            'Every month you get a short summary: how many cases the agents handled, how often a person had to step in, what it cost and which improvement comes next. That makes it easy for leadership to see what the investment returns and to prioritise the next process.',
          ],
        },
      ],
      steps: [
        'We go through the requirements for availability, security and where data may be processed.',
        'I set up hosting, monitoring, alerts and backups.',
        'Ongoing operations with updates and fixes whenever something drifts.',
        'A monthly review of results, costs and the next improvement.',
      ],
      fitsWhen: [
        'You want AI in the business without building your own operations team for it.',
        'You have a solution in production that nobody really owns.',
        'You need to show how the system is monitored and who is responsible for it.',
      ],
      firstEngagement: 'A typical setup is that I run the solution I built for you, with monitoring, updates and a monthly review of what it has done and what it costs.',
      relatedCases: ['sokhem', 'openaudit'],
      faq: [
        { q: 'Where does the solution run?', a: 'Wherever your data may be processed. Usually in an EU region with a cloud provider, sometimes on your own servers. We decide that from your security and data protection requirements before anything is built.' },
        { q: 'What happens when an AI provider changes its model?', a: 'It happens regularly. I run the tests against the new model before anything is switched, adjust the instructions if needed, and only switch when the results are at least as good as before.' },
        { q: 'Can we take over operations later?', a: 'Yes. The code, the documentation and the hosting environment are yours from the start. When you want to take over, we plan a handover with training for your team.' },
        { q: 'Who owns the data?', a: 'You do. All data stays in your environment or with suppliers you have approved, and it is not used to train any models. When the engagement ends, you take everything with you.' },
      ],
    },
  },
  cto: {
    sv: {
      id: 'cto',
      stage: null,
      name: 'Fractional CTO',
      seo: {
        title: 'Fractional CTO för startups och bolag | Anton Wester',
        description: 'Fractional CTO på deltid: teknisk ledning, arkitekturbeslut, stöd vid rekrytering och en AI-strategi som håller sig nära det som går att bygga.',
      },
      h1: 'Fractional CTO',
      promise: 'Teknisk ledning på deltid.',
      intro: 'Alla bolag behöver inte en heltidsanställd CTO, men nästan alla behöver någon som fattar bra tekniska beslut. Som fractional CTO tar jag det ansvaret på deltid: arkitektur, prioriteringar, rekrytering och hur AI ska användas i produkten och verksamheten.',
      sections: [
        {
          heading: 'Vad jag tar ansvar för',
          paragraphs: ['Uppdraget formas efter var bolaget står, men det brukar handla om några av de här områdena.'],
          list: [
            'Arkitektur och tekniska vägval, så att det ni bygger i dag inte blir ett hinder om ett år.',
            'Leveransplanering och prioritering tillsammans med produkt och ledning.',
            'Rekrytering: kravprofiler, tekniska intervjuer och att få nya utvecklare produktiva snabbt.',
            'En AI-strategi som utgår från vad som faktiskt går att bygga och drifta, inte från vad som låter bra.',
            'Val av leverantörer och granskning av kod och avtal när ni köper utveckling utifrån.',
          ],
        },
        {
          heading: 'Erfarenhet från båda sidor',
          paragraphs: [
            'Jag har programmerat i över tio år, byggt produkter i yrket sedan 2019 och lett cross-platform-utveckling som tech lead på weapp, med ansvar för arkitektur och ett team som levererade appar för webb, iOS och Android. I dag bygger och driver jag mina egna plattformar, så jag har stått med både det tekniska och det affärsmässiga ansvaret.',
            'Det gör att jag kan översätta mellan ledning och utvecklare. Jag förklarar tekniska risker i affärstermer och affärsmål i tekniska termer, och jag skriver kod själv när det är det snabbaste sättet att komma vidare.',
          ],
        },
        {
          heading: 'Hur ett uppdrag brukar se ut',
          paragraphs: [
            'De flesta uppdrag omfattar några dagar i månaden, med fasta avstämningar med ledningen och utvecklarna och tillgänglighet däremellan. När bolaget växer hjälper jag till att rekrytera en heltidsanställd teknisk ledare och lämnar över på ett ordnat sätt.',
          ],
        },
        {
          heading: 'Typiska lägen',
          paragraphs: [
            'Ofta kommer jag in i ett av tre lägen. Ett nystartat bolag som ska bygga sin första produkt och behöver rätt grund från början. Ett bolag som har vuxit snabbt och där koden, teamet och processerna inte längre hänger med. Eller ett etablerat bolag som vill använda AI men saknar någon som kan bedöma vad som är realistiskt.',
            'I alla tre fallen är jobbet detsamma: att skapa tydlighet kring vad som ska byggas, i vilken ordning och av vem, och att se till att besluten håller även när bolaget har vuxit.',
          ],
        },
      ],
      steps: [
        'Ett första samtal om var bolaget står, vad som skaver och vad som behöver beslutas.',
        'En genomgång av kod, arkitektur, team och leveransprocess.',
        'En plan för de närmaste månaderna som vi går igenom med ledningen.',
        'Löpande arbete några dagar i månaden, med fasta avstämningar.',
      ],
      fitsWhen: [
        'Ni bygger en digital produkt men saknar teknisk ledning.',
        'Grundarna är inte tekniska och behöver någon att fatta tekniska beslut med.',
        'Ni har utvecklare men ingen som äger arkitekturen och prioriteringarna.',
        'Ni vill använda AI i produkten men vet inte hur ni ska ta er an det.',
      ],
      firstEngagement: 'Ett typiskt första uppdrag börjar med en genomgång av kod, team och arkitektur och en plan för de närmaste tre månaderna. Därefter fortsätter vi några dagar i månaden så länge det behövs.',
      relatedCases: ['sokhem', 'lingo'],
      faq: [
        { q: 'Hur mycket tid lägger en fractional CTO?', a: 'Det beror på bolagets behov, men oftast några dagar i månaden. Vi bestämmer omfattningen tillsammans och justerar den när bolaget växer eller när en heltidsanställd tar över.' },
        { q: 'Skriver du kod också?', a: 'Ja, när det är rätt prioritering. Ofta handlar det om att lägga en grund, bygga en prototyp eller lösa ett svårt tekniskt problem, men målet är att teamet ska kunna leverera utan mig.' },
        { q: 'Kan du hjälpa till att rekrytera en CTO på heltid?', a: 'Ja. Jag hjälper till med kravprofil, intervjuer och bedömning av kandidater, och lämnar sedan över ansvaret på ett ordnat sätt.' },
        { q: 'Jobbar du med bolag utanför Göteborg?', a: 'Ja. Jag utgår från Göteborg och träffar gärna ledningen på plats i början av ett uppdrag, men det mesta av arbetet fungerar lika bra på distans för bolag i hela Sverige.' },
      ],
    },
    en: {
      id: 'cto',
      stage: null,
      name: 'Fractional CTO',
      seo: {
        title: 'Fractional CTO for startups and companies | Anton Wester',
        description: 'Fractional CTO, part time: technical leadership, architecture decisions, help with hiring and an AI strategy that stays close to what can be built.',
      },
      h1: 'Fractional CTO',
      promise: 'Technical leadership, part time.',
      intro: 'Not every company needs a full-time CTO, but almost every company needs someone who makes good technical decisions. As a fractional CTO I take on that responsibility part time: architecture, priorities, hiring and how AI should be used in the product and the business.',
      sections: [
        {
          heading: 'What I take responsibility for',
          paragraphs: ['The engagement follows where the company is, but it usually covers some of these areas.'],
          list: [
            'Architecture and technical choices, so what you build today does not get in the way a year from now.',
            'Delivery planning and prioritisation together with product and leadership.',
            'Hiring: role profiles, technical interviews and getting new developers productive quickly.',
            'An AI strategy that starts from what can actually be built and run, not from what sounds good.',
            'Choosing suppliers and reviewing code and contracts when you buy development from outside.',
          ],
        },
        {
          heading: 'Experience from both sides',
          paragraphs: [
            'I have been programming for more than ten years, building products professionally since 2019, and led cross-platform development as tech lead at weapp, responsible for architecture and a team shipping apps for web, iOS and Android. Today I build and run my own platforms, so I have carried both the technical and the business responsibility.',
            'That lets me translate between leadership and developers. I explain technical risks in business terms and business goals in technical terms, and I write code myself when that is the fastest way forward.',
          ],
        },
        {
          heading: 'What an engagement usually looks like',
          paragraphs: [
            'Most engagements are a few days a month, with regular check-ins with leadership and the developers and availability in between. As the company grows, I help hire a full-time technical leader and hand over in an orderly way.',
          ],
        },
        {
          heading: 'Typical situations',
          paragraphs: [
            'I usually come in at one of three moments. A new company about to build its first product that needs the right foundation from the start. A company that has grown fast, where the code, the team and the processes no longer keep up. Or an established company that wants to use AI but has nobody who can judge what is realistic.',
            'In all three cases the job is the same: create clarity about what to build, in which order and by whom, and make sure the decisions hold as the company grows.',
          ],
        },
      ],
      steps: [
        'A first call about where the company is, what is causing friction and what needs deciding.',
        'A review of the code, architecture, team and delivery process.',
        'A plan for the coming months that we go through with leadership.',
        'Ongoing work a few days a month, with regular check-ins.',
      ],
      fitsWhen: [
        'You are building a digital product without technical leadership.',
        'The founders are not technical and need someone to make technical decisions with.',
        'You have developers but nobody who owns the architecture and the priorities.',
        'You want to use AI in the product but do not know how to approach it.',
      ],
      firstEngagement: 'A typical first engagement starts with a review of the code, team and architecture and a plan for the next three months. After that we continue a few days a month for as long as it is needed.',
      relatedCases: ['sokhem', 'lingo'],
      faq: [
        { q: 'How much time does a fractional CTO spend?', a: 'It depends on what the company needs, but usually a few days a month. We agree the scope together and adjust it as the company grows or when a full-time hire takes over.' },
        { q: 'Do you write code as well?', a: 'Yes, when that is the right priority. Often that means laying a foundation, building a prototype or solving a hard technical problem, but the goal is for the team to deliver without me.' },
        { q: 'Can you help us hire a full-time CTO?', a: 'Yes. I help with the role profile, interviews and assessing candidates, and then hand over the responsibility in an orderly way.' },
        { q: 'Do you work with companies outside Gothenburg?', a: 'Yes. I am based in Gothenburg and like to meet leadership in person early in an engagement, but most of the work runs just as well remotely for companies across Sweden.' },
      ],
    },
  },
};

export const getService = (id: ServiceId, locale: Locale): ServiceContent => services[id][locale];
