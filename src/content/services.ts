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
        description: 'En AI-kartläggning visar var AI sparar mest tid i ert företag, vad det kostar att bygga och var det är smartast att börja.',
      },
      h1: 'AI-kartläggning för företag',
      promise: 'Se var AI lönar sig innan ni bygger.',
      intro: 'Jag tittar på hur ni arbetar i dag och var timmarna går. Sedan får ni en lista över var AI sparar mest tid, och vad det kostar att bygga.',
      sections: [
        {
          heading: 'Vad ni får',
          paragraphs: ['Ett underlag ni kan fatta beslut på. Det är ert, oavsett om ni bygger med mig, med eget team eller inte alls.'],
          list: [
            'En bild av vilka uppgifter som tar mest tid varje vecka.',
            'En lista över var AI lönar sig, med tiden ni sparar och vad det kostar.',
            'Vad ni behöver tänka på kring data, säkerhet och regler.',
            'Ett första steg som går att bygga på några veckor.',
          ],
        },
        {
          heading: 'Vad jag letar efter',
          paragraphs: [
            'Det bästa stället att börja är sällan det mest spännande. Oftast är det jobb som görs varje dag: mejl som sorteras, siffror som skrivs över mellan program och rapporter som sätts ihop för hand.',
            'Uppgifter som tar tid och görs likadant varje gång passar AI bra. Där ett misstag kostar mycket fattar en människa fortfarande beslutet.',
          ],
        },
        {
          heading: 'Varför börja här',
          paragraphs: [
            'Många AI-projekt börjar med en lösning och letar sedan efter ett problem. Det blir dyrt. Jag börjar med var tiden går och bygger sedan bara det som är värt det. Eftersom jag också bygger själv vet jag vad saker brukar kosta.',
          ],
        },
      ],
      steps: [
        'Vi pratar om er verksamhet och vad som känns tyngst i dag.',
        'Jag pratar med dem som gör jobbet och ser hur det går till.',
        'Jag räknar på var AI kan spara tid och vad det kostar.',
        'Vi går igenom listan tillsammans med ledningen.',
      ],
      fitsWhen: [
        'Ni tror att AI kan hjälpa, men vet inte var ni ska börja.',
        'Flera personer lägger timmar varje vecka på samma sak.',
        'Ni har testat ChatGPT men inte fått in det i vardagen.',
        'Ledningen vill ha ett underlag innan pengar läggs.',
      ],
      firstEngagement: 'Oftast börjar vi med en eller två avdelningar. Det tar några veckor, och resultatet är ert.',
      relatedCases: ['openaudit', 'wez'],
      faq: [
        { q: 'Hur lång tid tar en AI-kartläggning?', a: 'Oftast några veckor för en avdelning. Fler avdelningar tar längre tid.' },
        { q: 'Måste vi bygga med dig efteråt?', a: 'Nej. Listan är er. Ni kan bygga med mig, med eget team eller med någon annan.' },
        { q: 'Måste vår data vara i ordning först?', a: 'Nej. Att se vilken data ni har och hur den kan användas säkert är en del av jobbet.' },
      ],
    },
    en: {
      id: 'assessment',
      stage: 'find',
      name: 'AI assessment',
      seo: {
        title: 'AI assessment for companies | Anton Wester',
        description: 'An AI assessment shows where AI saves the most time in your company, what it costs to build and where it makes sense to start.',
      },
      h1: 'AI assessment for companies',
      promise: 'See where AI pays before you build.',
      intro: 'I look at how you work today and where the hours go. Then you get a list of where AI saves the most time, and what it costs to build.',
      sections: [
        {
          heading: 'What you get',
          paragraphs: ['A basis you can make decisions on. It is yours, whether you build with me, with your own team or not at all.'],
          list: [
            'A picture of which tasks take the most time each week.',
            'A list of where AI pays off, with the time you save and what it costs.',
            'What to keep in mind about data, security and rules.',
            'A first step that can be built in a few weeks.',
          ],
        },
        {
          heading: 'What I look for',
          paragraphs: [
            'The best place to start is rarely the most exciting one. Usually it is work done every day: emails being sorted, numbers copied between programs and reports put together by hand.',
            'Tasks that take time and are done the same way every time suit AI well. Where a mistake is costly, a person still makes the call.',
          ],
        },
        {
          heading: 'Why start here',
          paragraphs: [
            'Many AI projects start with a solution and then look for a problem. That gets expensive. I start with where the time goes, and then build only what is worth it. Because I also build myself, I know what things tend to cost.',
          ],
        },
      ],
      steps: [
        'We talk about your business and what feels heaviest today.',
        'I talk to the people who do the work and see how it is done.',
        'I work out where AI can save time and what it costs.',
        'We go through the list together with leadership.',
      ],
      fitsWhen: [
        'You think AI can help, but do not know where to start.',
        'Several people spend hours every week on the same thing.',
        'You have tried ChatGPT but not made it part of daily work.',
        'Leadership wants a basis before money is spent.',
      ],
      firstEngagement: 'We usually start with one or two departments. It takes a few weeks, and the result is yours.',
      relatedCases: ['openaudit', 'wez'],
      faq: [
        { q: 'How long does an AI assessment take?', a: 'Usually a few weeks for one department. More departments take longer.' },
        { q: 'Do we have to build with you afterwards?', a: 'No. The list is yours. You can build with me, with your own team or with someone else.' },
        { q: 'Does our data need to be in order first?', a: 'No. Seeing what data you have and how it can be used safely is part of the job.' },
      ],
    },
  },
  development: {
    sv: {
      id: 'development',
      stage: 'build',
      name: 'AI-utveckling',
      seo: {
        title: 'AI-utveckling för företag | Anton Wester',
        description: 'AI-utveckling för företag: agenter, automation och integrationer som tar över rutinarbete, byggda med tester, loggar och mänskligt godkännande.',
      },
      h1: 'AI-utveckling för företag',
      promise: 'Skräddarsydda AI-lösningar i er stack.',
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
      relatedServices: ['agents', 'automation'],
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
        title: 'AI development for companies | Anton Wester',
        description: 'AI development for companies: agents, automation and integrations that take over routine work, built with tests, logs and human approval.',
      },
      h1: 'AI development for companies',
      promise: 'Custom AI solutions in your stack.',
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
      relatedServices: ['agents', 'automation'],
      faq: [
        { q: 'Which AI models do you use?', a: 'Whichever fits the task best in quality, cost and where your data may be processed. I use models from Anthropic, OpenAI and others, and open models that can run on your own server, and I build so the model can be swapped.' },
        { q: 'What happens when the agent gets something wrong?', a: 'Every agent has clear limits on what it may do alone. Risky steps need human approval, everything is logged, and we measure accuracy against real examples before it gets more responsibility.' },
        { q: 'Can you build in our existing technology?', a: 'Yes, in most cases. I have built in everything from large enterprise environments to new platforms, and I adapt to your stack, your code review routines and your security requirements.' },
      ],
    },
  },
  agents: {
    sv: {
      id: 'agents',
      stage: 'build',
      name: 'AI-agenter',
      seo: {
        title: 'AI-agenter för företag | Anton Wester',
        description: 'AI-agenter för företag som tar över rutinjobb, som att läsa mejl och svara kunder. Med tydliga gränser och en människa som godkänner.',
      },
      h1: 'AI-agenter för företag',
      promise: 'Agenter som gör ett jobb, inte en demo.',
      intro: 'En AI-agent är ett program som gör en uppgift från början till slut. Den läser ett mejl, letar upp kunden, skriver ett svar och lägger ärendet rätt. Ni bestämmer vad den får göra, och ni ser allt den gör.',
      sections: [
        {
          heading: 'Mer än en chatbot',
          paragraphs: [
            'En chatbot svarar på frågor. En agent gör jobbet. Den hämtar uppgifter i era system, följer era regler och lämnar över till en människa när något är oklart.',
          ],
        },
        {
          heading: 'Vad en agent kan göra',
          paragraphs: ['Jag använder själv agenter varje dag och ser allt de gör och vad det kostar. Samma insyn får ni.'],
          list: [
            'Läsa mejl och formulär som kommer in, hitta rätt kund och föreslå ett svar.',
            'Gå igenom avtal och offerter och flagga det som bryter mot era regler.',
            'Förbereda offerter och uppföljningar, så att säljaren bara läser och skickar.',
            'Svara på frågor om era rutiner och visa var svaret kommer ifrån.',
          ],
        },
        {
          heading: 'Ni har kontrollen',
          paragraphs: [
            'Agenten får bara göra det uppgiften kräver. Allt den gör sparas, så ni kan se vad den gjorde och varför. Steg som rör pengar, avtal eller kunder kan kräva att en människa säger ja först.',
            'Ni ser också vad varje ärende kostar och hur ofta agenten gör rätt. Data som måste stanna i EU stannar där.',
          ],
        },
      ],
      steps: [
        'Vi väljer en uppgift och samlar ett femtiotal riktiga exempel.',
        'Jag bygger agenten och ger den bara den åtkomst den behöver.',
        'Den testas bredvid teamet tills den gör rätt tillräckligt ofta.',
        'Sedan tar den över, steg för steg.',
      ],
      fitsWhen: [
        'Samma sorts ärende kommer in många gånger i veckan.',
        'Någon flyttar uppgifter mellan program för hand.',
        'En chatbot räcker inte, ni behöver något som gör jobbet.',
        'Ni måste kunna visa vad AI:n gjorde och varför.',
      ],
      firstEngagement: 'Oftast börjar vi med en enda sorts ärende, till exempel frågor om leveranser. Agenten kan testas inom ett par veckor och tar över när den gör rätt tillräckligt ofta.',
      relatedCases: ['wez', 'openaudit'],
      relatedServices: ['automation', 'development'],
      faq: [
        { q: 'Vad är skillnaden mellan en AI-agent och en chatbot?', a: 'En chatbot svarar på frågor. En agent kan också göra saker, som att slå upp en kund eller uppdatera ett system, inom de gränser ni sätter.' },
        { q: 'Är det säkert att låta en agent arbeta i våra system?', a: 'Ja, om den bara får göra det den behöver, allt sparas och viktiga steg kräver ett ja från en människa. Så bygger jag.' },
        { q: 'Vad kostar det att köra en AI-agent?', a: 'Det beror på hur mycket den gör. Jag mäter kostnaden per ärende under testet, så att ni vet innan den tar över.' },
        { q: 'Kan agenten använda de system vi redan har?', a: 'Ja. Den kopplas till de program ni redan använder, som e-post, kundregister och ekonomisystem.' },
      ],
    },
    en: {
      id: 'agents',
      stage: 'build',
      name: 'AI agents',
      seo: {
        title: 'AI agents for companies | Anton Wester',
        description: 'AI agents for companies that take over routine work, such as reading email and answering customers. With clear limits and a person who approves.',
      },
      h1: 'AI agents for companies',
      promise: 'Agents that do a job, not a demo.',
      intro: 'An AI agent is a program that does a task from start to finish. It reads an email, looks up the customer, writes a reply and files the case. You decide what it may do, and you see everything it does.',
      sections: [
        {
          heading: 'More than a chatbot',
          paragraphs: [
            'A chatbot answers questions. An agent does the work. It fetches information from your systems, follows your rules and hands over to a person when something is unclear.',
          ],
        },
        {
          heading: 'What an agent can do',
          paragraphs: ['I use agents every day myself and see everything they do and what it costs. You get the same view.'],
          list: [
            'Read incoming email and forms, find the right customer and suggest a reply.',
            'Go through contracts and quotes and flag anything that breaks your rules.',
            'Prepare quotes and follow-ups, so the seller only reads and sends.',
            'Answer questions about your routines and show where the answer comes from.',
          ],
        },
        {
          heading: 'You stay in control',
          paragraphs: [
            'The agent may only do what the task needs. Everything it does is saved, so you can see what it did and why. Steps that touch money, contracts or customers can require a person to say yes first.',
            'You also see what each case costs and how often the agent gets it right. Data that must stay in the EU stays there.',
          ],
        },
      ],
      steps: [
        'We pick one task and collect about fifty real examples.',
        'I build the agent and give it only the access it needs.',
        'It is tested next to the team until it gets it right often enough.',
        'Then it takes over, step by step.',
      ],
      fitsWhen: [
        'The same kind of case comes in many times a week.',
        'Someone moves information between programs by hand.',
        'A chatbot is not enough; you need something that does the work.',
        'You must be able to show what the AI did and why.',
      ],
      firstEngagement: 'We usually start with a single kind of case, such as questions about deliveries. The agent can be tested within a couple of weeks and takes over once it gets it right often enough.',
      relatedCases: ['wez', 'openaudit'],
      relatedServices: ['automation', 'development'],
      faq: [
        { q: 'What is the difference between an AI agent and a chatbot?', a: 'A chatbot answers questions. An agent can also do things, such as look up a customer or update a system, within the limits you set.' },
        { q: 'Is it safe to let an agent work in our systems?', a: 'Yes, if it may only do what it needs, everything is saved and important steps need a yes from a person. That is how I build.' },
        { q: 'What does it cost to run an AI agent?', a: 'It depends on how much it does. I measure the cost per case during the test, so you know before it takes over.' },
        { q: 'Can the agent use the systems we already have?', a: 'Yes. It connects to the programs you already use, such as email, your customer register and your finance system.' },
      ],
    },
  },
  automation: {
    sv: {
      id: 'automation',
      stage: 'build',
      name: 'AI-automation',
      seo: {
        title: 'AI-automation för företag | Anton Wester',
        description: 'AI-automation för företag: AI läser fakturor, mejl och PDF:er och för in rätt uppgifter i era system, så att rutinjobbet sköter sig självt.',
      },
      h1: 'AI-automation för företag',
      promise: 'Arbetsflöden som sköter sig själva.',
      intro: 'Mycket jobb handlar om att läsa något och föra det vidare: en faktura till ekonomin, en order till lagret, ett formulär till rätt person. Med AI-automation sköts det av sig självt, även när underlaget är ett mejl, en PDF eller en bild.',
      sections: [
        {
          heading: 'Vad som går att automatisera',
          paragraphs: ['Bra kandidater är jobb som följer samma regler varje gång, men där underlaget ser lite olika ut.'],
          list: [
            'Fakturor och kvitton som läses av och förs in i ekonomisystemet.',
            'Beställningar från mejl som blir ärenden med rätt kund och produkt.',
            'Rapporter som sätts ihop automatiskt varje vecka.',
            'Texter som översätts till flera språk.',
          ],
        },
        {
          heading: 'Allt behöver inte AI',
          paragraphs: [
            'När uppgifterna redan är ordnade räcker vanlig automation. Den är billigare och mer förutsägbar. Jag använder AI där det behövs, för text och bilder, och enkel kod för resten.',
          ],
        },
        {
          heading: 'Den gissar inte',
          paragraphs: [
            'Allt automationen gör sparas. Om något går fel får rätt person veta det direkt. Det som AI:n är osäker på hamnar hos en människa i stället för att gissas.',
            'Jag kan sköta automationen åt er, eller lämna över den till ert team.',
          ],
        },
      ],
      steps: [
        'Vi följer en process och ser hur lång tid varje steg tar.',
        'Jag automatiserar det steg som sparar mest tid.',
        'Den körs bredvid det vanliga arbetet en tid, så att vi kan jämföra.',
        'När den fungerar tar den över.',
      ],
      fitsWhen: [
        'Någon lägger timmar varje vecka på att skriva av eller flytta uppgifter.',
        'Underlaget kommer som mejl, PDF:er eller bilder.',
        'Era automationer går sönder så fort något ser annorlunda ut.',
        'Ni vill hinna mer utan att anställa.',
      ],
      firstEngagement: 'Oftast börjar vi med ett enda flöde, till exempel fakturor som kommer in. Det brukar vara igång inom några veckor.',
      relatedCases: ['sokhem', 'lingo'],
      relatedServices: ['agents', 'assessment'],
      faq: [
        { q: 'Vad är AI-automation?', a: 'Automation som klarar rörigt underlag, som mejl, PDF:er och fritext. AI:n läser och förstår, vanlig kod gör resten.' },
        { q: 'Vad passar bäst att automatisera först?', a: 'Jobb som görs ofta, på ungefär samma sätt, och som tar mycket tid. Fakturor, beställningar och rapporter brukar ligga högt.' },
        { q: 'Vad händer när automationen är osäker?', a: 'Då gissar den inte. Fallet går till en människa som bestämmer.' },
        { q: 'Behöver vi byta system?', a: 'Nej. Automationen kopplas till de program ni redan har.' },
      ],
    },
    en: {
      id: 'automation',
      stage: 'build',
      name: 'AI automation',
      seo: {
        title: 'AI automation for companies | Anton Wester',
        description: 'AI automation for companies: AI reads invoices, emails and PDFs and enters the right details into your systems, so routine work runs itself.',
      },
      h1: 'AI automation for companies',
      promise: 'Workflows that run themselves.',
      intro: 'A lot of work is reading something and passing it on: an invoice to finance, an order to the warehouse, a form to the right person. With AI automation this happens on its own, even when the input is an email, a PDF or an image.',
      sections: [
        {
          heading: 'What can be automated',
          paragraphs: ['Good candidates are jobs that follow the same rules every time, but where the input looks a little different.'],
          list: [
            'Invoices and receipts read and entered into the finance system.',
            'Orders from email turned into cases with the right customer and product.',
            'Reports put together automatically every week.',
            'Texts translated into several languages.',
          ],
        },
        {
          heading: 'Not everything needs AI',
          paragraphs: [
            'When the information is already in order, ordinary automation is enough. It is cheaper and more predictable. I use AI where it is needed, for text and images, and simple code for the rest.',
          ],
        },
        {
          heading: 'It does not guess',
          paragraphs: [
            'Everything the automation does is saved. If something goes wrong, the right person hears about it at once. Anything the AI is unsure about goes to a person instead of being guessed.',
            'I can run the automation for you, or hand it over to your team.',
          ],
        },
      ],
      steps: [
        'We follow one process and see how long each step takes.',
        'I automate the step that saves the most time.',
        'It runs next to the normal work for a while, so we can compare.',
        'Once it works, it takes over.',
      ],
      fitsWhen: [
        'Someone spends hours every week retyping or moving information.',
        'The input arrives as emails, PDFs or images.',
        'Your automations break as soon as something looks different.',
        'You want to get more done without hiring.',
      ],
      firstEngagement: 'We usually start with a single flow, such as incoming invoices. It is usually running within a few weeks.',
      relatedCases: ['sokhem', 'lingo'],
      relatedServices: ['agents', 'assessment'],
      faq: [
        { q: 'What is AI automation?', a: 'Automation that copes with messy input, such as emails, PDFs and free text. The AI reads and understands; ordinary code does the rest.' },
        { q: 'What is best to automate first?', a: 'Work that is done often, in roughly the same way, and takes a lot of time. Invoices, orders and reports usually rank high.' },
        { q: 'What happens when the automation is unsure?', a: 'Then it does not guess. The case goes to a person who decides.' },
        { q: 'Do we need to change systems?', a: 'No. The automation connects to the programs you already have.' },
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
        description: 'Drift och förvaltning av AI-lösningar: jag ser till att det jag bygger fungerar varje dag och blir bättre, eller lämnar över till ert team.',
      },
      h1: 'Drift och förvaltning',
      promise: 'För era AI-lösningar, varje dag.',
      intro: 'En AI-lösning är inte klar när den startar. AI-tjänsterna ändras, priserna ändras och er verksamhet ändras. Jag ser till att det jag har byggt fortsätter att fungera och blir bättre med tiden.',
      sections: [
        {
          heading: 'Vad som ingår',
          paragraphs: ['Ni behöver inte tänka på det tekniska. Det gör jag.'],
          list: [
            'Lösningen körs på servrar i EU eller hos er, beroende på var er data får finnas.',
            'Jag får en varning om något slutar fungera, ofta innan ni märker det.',
            'Säkerhetsuppdateringar, och tester när AI-tjänsterna ändras.',
            'Koll på vad varje lösning kostar och vad den sparar.',
            'En kort rapport varje månad.',
          ],
        },
        {
          heading: 'Någon som stannar kvar',
          paragraphs: [
            'Jag driver själv SökHem och OpenAudit, som är igång dygnet runt. Ni får inte en konsult som försvinner efter starten, utan någon som är van att ha ansvaret.',
            'Varje månad får ni veta hur många ärenden som har hanterats, hur ofta en människa behövde gå in, vad det kostade och vad nästa förbättring är.',
          ],
        },
        {
          heading: 'Eller ta över själva',
          paragraphs: [
            'Vill ni sköta det själva får ert team koden, instruktionerna och den utbildning som behövs. Ni är aldrig låsta till mig.',
          ],
        },
      ],
      steps: [
        'Vi går igenom era krav på säkerhet och var data får finnas.',
        'Jag sätter upp driften, varningarna och säkerhetskopiorna.',
        'Jag sköter uppdateringar och rättar fel när de uppstår.',
        'Varje månad går vi igenom resultat, kostnad och nästa steg.',
      ],
      fitsWhen: [
        'Ni vill använda AI utan att bygga upp en egen IT-avdelning för det.',
        'Ni har en lösning igång som ingen riktigt ansvarar för.',
        'Ni måste kunna visa vem som har ansvaret och hur det övervakas.',
      ],
      firstEngagement: 'Oftast sköter jag lösningen jag har byggt åt er och skickar en kort rapport varje månad.',
      relatedCases: ['sokhem', 'openaudit'],
      faq: [
        { q: 'Var körs lösningen?', a: 'Där er data får finnas. Oftast på servrar i EU, ibland hos er. Det bestämmer vi innan något byggs.' },
        { q: 'Vad händer när en AI-tjänst ändras?', a: 'Jag testar den nya versionen först. Vi byter bara när resultatet är minst lika bra.' },
        { q: 'Kan vi ta över driften senare?', a: 'Ja. Allt är ert från start, och vi planerar överlämningen tillsammans.' },
        { q: 'Vem äger datan?', a: 'Ni. Den används inte för att träna AI, och ni får med er allt när uppdraget slutar.' },
      ],
    },
    en: {
      id: 'operations',
      stage: 'run',
      name: 'Hosting and maintenance',
      seo: {
        title: 'AI hosting and maintenance | Anton Wester',
        description: 'Hosting and maintenance for AI solutions: I make sure what I build works every day and keeps getting better, or hand it over to your team.',
      },
      h1: 'Hosting and maintenance',
      promise: 'For your AI solutions, every day.',
      intro: 'An AI solution is not finished when it starts. AI services change, prices change and your business changes. I make sure what I have built keeps working and gets better over time.',
      sections: [
        {
          heading: 'What is included',
          paragraphs: ['You do not need to think about the technical side. I do.'],
          list: [
            'The solution runs on servers in the EU or at your site, depending on where your data may be kept.',
            'I get an alert if something stops working, often before you notice.',
            'Security updates, and tests when AI services change.',
            'A clear view of what each solution costs and what it saves.',
            'A short report every month.',
          ],
        },
        {
          heading: 'Someone who stays',
          paragraphs: [
            'I run SökHem and OpenAudit myself, and they are up around the clock. You do not get a consultant who disappears after launch, but someone used to carrying the responsibility.',
            'Every month you learn how many cases were handled, how often a person had to step in, what it cost and what the next improvement is.',
          ],
        },
        {
          heading: 'Or run it yourselves',
          paragraphs: [
            'If you would rather run it yourselves, your team gets the code, the instructions and the training it needs. You are never locked in to me.',
          ],
        },
      ],
      steps: [
        'We go through your needs for security and where data may be kept.',
        'I set up the hosting, the alerts and the backups.',
        'I handle updates and fix problems when they come up.',
        'Every month we go through results, cost and the next step.',
      ],
      fitsWhen: [
        'You want to use AI without building your own IT department for it.',
        'You have a solution running that nobody really owns.',
        'You must be able to show who is responsible and how it is watched.',
      ],
      firstEngagement: 'Usually I run the solution I built for you and send a short report every month.',
      relatedCases: ['sokhem', 'openaudit'],
      faq: [
        { q: 'Where does the solution run?', a: 'Wherever your data may be kept. Usually on servers in the EU, sometimes at your site. We decide that before anything is built.' },
        { q: 'What happens when an AI service changes?', a: 'I test the new version first. We only switch when the result is at least as good.' },
        { q: 'Can we take over later?', a: 'Yes. Everything is yours from the start, and we plan the handover together.' },
        { q: 'Who owns the data?', a: 'You do. It is not used to train AI, and you take everything with you when the work ends.' },
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
        description: 'Fractional CTO på deltid: någon som fattar de tekniska besluten med er, hjälper er att anställa rätt och visar var AI kan hjälpa bolaget.',
      },
      h1: 'Fractional CTO',
      promise: 'Teknisk ledning på deltid.',
      intro: 'En CTO är den som ansvarar för tekniken i ett bolag. Alla bolag behöver inte en på heltid, men nästan alla behöver någon som fattar bra tekniska beslut. Det gör jag, några dagar i månaden.',
      sections: [
        {
          heading: 'Vad jag hjälper till med',
          paragraphs: ['Det beror på var bolaget står, men oftast handlar det om det här.'],
          list: [
            'Att välja teknik som håller när bolaget växer.',
            'Att bestämma vad som ska byggas först.',
            'Att anställa rätt utvecklare och få dem igång snabbt.',
            'Att se var AI hjälper på riktigt, och inte bara låter bra.',
            'Att granska leverantörer och avtal när ni köper utveckling.',
          ],
        },
        {
          heading: 'Varför jag',
          paragraphs: [
            'Jag har programmerat i över tio år och byggt produkter i yrket sedan 2019. Som tech lead på weapp ledde jag ett team som byggde appar för webben, iPhone och Android.',
            'Jag förklarar teknik så att ledningen förstår, och affärsmål så att utvecklarna förstår. När det går snabbast skriver jag koden själv.',
          ],
        },
        {
          heading: 'Hur det brukar se ut',
          paragraphs: [
            'Oftast några dagar i månaden, med fasta möten och hjälp däremellan. När bolaget är redo hjälper jag er att anställa en CTO på heltid och lämnar över.',
          ],
        },
      ],
      steps: [
        'Vi pratar om var bolaget står och vad som behöver bestämmas.',
        'Jag går igenom koden, teamet och hur ni arbetar.',
        'Ni får en plan för de närmaste månaderna.',
        'Sedan arbetar vi vidare några dagar i månaden.',
      ],
      fitsWhen: [
        'Ni bygger en digital produkt men har ingen teknisk ledare.',
        'Grundarna är inte tekniska och behöver någon att fråga.',
        'Ni har utvecklare men ingen som håller i helheten.',
        'Ni vill använda AI men vet inte hur ni ska börja.',
      ],
      firstEngagement: 'Vi börjar med en genomgång och en plan för tre månader. Sedan fortsätter vi några dagar i månaden så länge det behövs.',
      relatedCases: ['sokhem', 'lingo'],
      faq: [
        { q: 'Hur mycket tid lägger en fractional CTO?', a: 'Oftast några dagar i månaden. Vi ändrar det när bolaget växer.' },
        { q: 'Skriver du kod också?', a: 'Ja, när det är bästa sättet att komma vidare. Men målet är att teamet ska klara sig utan mig.' },
        { q: 'Kan du hjälpa oss att anställa en CTO på heltid?', a: 'Ja. Jag hjälper till med intervjuer och med att välja rätt person, och lämnar sedan över.' },
        { q: 'Jobbar du med bolag utanför Göteborg?', a: 'Ja. Jag träffar er gärna på plats i början, men det mesta fungerar på distans i hela Sverige.' },
      ],
    },
    en: {
      id: 'cto',
      stage: null,
      name: 'Fractional CTO',
      seo: {
        title: 'Fractional CTO for startups and companies | Anton Wester',
        description: 'Fractional CTO, part time: someone who makes the technical decisions with you, helps you hire the right people and shows where AI can help.',
      },
      h1: 'Fractional CTO',
      promise: 'Technical leadership, part time.',
      intro: 'A CTO is the person in charge of a company’s technology. Not every company needs one full time, but almost every company needs someone who makes good technical decisions. I do that, a few days a month.',
      sections: [
        {
          heading: 'What I help with',
          paragraphs: ['It depends on where the company is, but it is usually this.'],
          list: [
            'Choosing technology that holds up as the company grows.',
            'Deciding what to build first.',
            'Hiring the right developers and getting them going fast.',
            'Seeing where AI really helps, not just where it sounds good.',
            'Reviewing suppliers and contracts when you buy development.',
          ],
        },
        {
          heading: 'Why me',
          paragraphs: [
            'I have been programming for more than ten years and building products professionally since 2019. As tech lead at weapp I led a team that built apps for the web, iPhone and Android.',
            'I explain technology so leadership understands it, and business goals so developers understand them. When it is the fastest way, I write the code myself.',
          ],
        },
        {
          heading: 'What it usually looks like',
          paragraphs: [
            'Usually a few days a month, with set meetings and help in between. When the company is ready, I help you hire a full-time CTO and hand over.',
          ],
        },
      ],
      steps: [
        'We talk about where the company is and what needs deciding.',
        'I go through the code, the team and how you work.',
        'You get a plan for the coming months.',
        'Then we keep working a few days a month.',
      ],
      fitsWhen: [
        'You are building a digital product but have no technical leader.',
        'The founders are not technical and need someone to ask.',
        'You have developers but nobody who sees the whole picture.',
        'You want to use AI but do not know how to start.',
      ],
      firstEngagement: 'We start with a review and a plan for three months. Then we continue a few days a month for as long as it is needed.',
      relatedCases: ['sokhem', 'lingo'],
      faq: [
        { q: 'How much time does a fractional CTO spend?', a: 'Usually a few days a month. We change that as the company grows.' },
        { q: 'Do you write code as well?', a: 'Yes, when that is the best way forward. But the goal is for the team to manage without me.' },
        { q: 'Can you help us hire a full-time CTO?', a: 'Yes. I help with interviews and with choosing the right person, and then hand over.' },
        { q: 'Do you work with companies outside Gothenburg?', a: 'Yes. I like to meet in person at the start, but most of the work runs just as well remotely across Sweden.' },
      ],
    },
  },
};

export const getService = (id: ServiceId, locale: Locale): ServiceContent => services[id][locale];
