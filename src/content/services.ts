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
        {
          heading: 'Så räknar vi på varje förslag',
          paragraphs: [
            'Varje punkt på listan har en uppskattning av tiden den sparar, räknad på era egna siffror. Lägger en person två timmar om dagen på ett flöde är det ungefär 440 timmar om året. Bredvid står vad det kostar att bygga, ungefär vad AI-tjänsten kostar att köra och vad som kan gå fel.',
            'Det gör listan lätt att prioritera. Ett flöde som sparar mycket tid och är enkelt att bygga hamnar högst. Ett som kräver stora ändringar i era system hamnar längre ner, även om det är det mest spännande.',
          ],
        },
        {
          heading: 'Vad jag behöver från er',
          paragraphs: ['Kartläggningen går fort när underlaget finns. Det här brukar räcka.'],
          list: [
            'Ett par timmar med dem som gör jobbet i varje flöde.',
            'Exempel på det som kommer in, som mejl, fakturor, ärenden eller dokument. Gärna avidentifierade.',
            'Någon som vet vilka system ni har och vilka av dem som har ett API.',
            'En person i ledningen som tar emot resultatet och bestämmer nästa steg.',
          ],
        },
        {
          heading: 'Vad det kostar',
          paragraphs: [
            'En AI-kartläggning kostar från 25 000 kr utan moms, och priset är fast. Det beror på hur många avdelningar och flöden vi tittar på. Efter ett första samtal får ni ett pris för just er kartläggning, så ni vet kostnaden innan vi börjar.',
            'Räknat i timmar motsvarar det ungefär 10 till 20 timmar för en senior konsult. Skillnaden är att priset står fast även om jobbet tar längre tid.',
          ],
        },
        {
          heading: 'Samma ordning som i OpenAudit',
          paragraphs: ['OpenAudit, mitt gratisverktyg för granskning av kod och webbplatser, bygger på samma ordning: mät först, sätt betyg och åtgärda sedan det som spelar störst roll. En kartläggning gör samma sak för era arbetsflöden.'],
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
      relatedServices: ['development', 'automation'],
      faq: [
        { q: 'Hur lång tid tar en AI-kartläggning?', a: 'Oftast några veckor för en avdelning. Fler avdelningar tar längre tid.' },
        { q: 'Måste vi bygga med dig efteråt?', a: 'Nej. Listan är er. Ni kan bygga med mig, med eget team eller med någon annan.' },
        { q: 'Måste vår data vara i ordning först?', a: 'Nej. Att se vilken data ni har och hur den kan användas säkert är en del av jobbet.' },
        { q: 'Vad kostar en AI-kartläggning?', a: 'Från 25 000 kr utan moms, och priset är fast. Ni får priset efter ett första samtal, så ni vet kostnaden innan vi börjar.' },
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
          paragraphs: ['A basis you can make decisions on. It’s yours, whether you build with me, with your own team or not at all.'],
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
            'The best place to start is rarely the most exciting one. Usually it’s work done every day: emails being sorted, numbers copied between programs and reports put together by hand.',
            'Tasks that take time and are done the same way every time suit AI well. Where a mistake is costly, a person still makes the call.',
          ],
        },
        {
          heading: 'Why start here',
          paragraphs: [
            'Many AI projects start with a solution and then look for a problem. That gets expensive. I start with where the time goes, and then build only what’s worth it. Because I also build myself, I know what things tend to cost.',
          ],
        },
        {
          heading: 'How each suggestion is worked out',
          paragraphs: [
            'Every item on the list has an estimate of the time it saves, based on your own numbers. If a person spends two hours a day on a flow, that’s about 440 hours a year. Next to it is what it costs to build, roughly what the AI service costs to run and what can go wrong.',
            'That makes the list easy to prioritise. A flow that saves a lot of time and is simple to build goes to the top. One that needs big changes to your systems goes further down, even if it’s the most exciting one.',
          ],
        },
        {
          heading: 'What I need from you',
          paragraphs: ['The assessment moves fast when the material is there. This is usually enough.'],
          list: [
            'A couple of hours with the people who do the work in each flow.',
            'Examples of what comes in, such as emails, invoices, tickets or documents. Anonymised is fine.',
            'Someone who knows which systems you have and which of them have an API.',
            'A person in leadership who receives the result and decides the next step.',
          ],
        },
        {
          heading: 'What it costs',
          paragraphs: [
            'An AI assessment costs from SEK 25,000 excluding VAT, and the price is fixed. It depends on how many departments and flows we look at. After a first call you get a price for your assessment, so you know the cost before we start.',
            'Counted in hours, that’s roughly 10 to 20 hours of a senior consultant’s time. The difference is that the price stays fixed even if the work takes longer.',
          ],
        },
        {
          heading: 'The same order as OpenAudit',
          paragraphs: ['OpenAudit, my free tool for auditing code and websites, follows the same order: measure first, score, then fix what matters most. An assessment does the same for your workflows.'],
        },
      ],
      steps: [
        'We talk about your business and what feels heaviest today.',
        'I talk to the people who do the work and see how it’s done.',
        'I work out where AI can save time and what it costs.',
        'We go through the list together with leadership.',
      ],
      fitsWhen: [
        'You think AI can help, but don’t know where to start.',
        'Several people spend hours every week on the same thing.',
        'You’ve tried ChatGPT but not made it part of daily work.',
        'Leadership wants a basis before money is spent.',
      ],
      firstEngagement: 'We usually start with one or two departments. It takes a few weeks, and the result is yours.',
      relatedCases: ['openaudit', 'wez'],
      relatedServices: ['development', 'automation'],
      faq: [
        { q: 'How long does an AI assessment take?', a: 'Usually a few weeks for one department. More departments take longer.' },
        { q: 'Do we have to build with you afterwards?', a: 'No. The list is yours. You can build with me, with your own team or with someone else.' },
        { q: 'Does our data need to be in order first?', a: 'No. Seeing what data you have and how it can be used safely is part of the job.' },
        { q: 'What does an AI assessment cost?', a: 'From SEK 25,000 excluding VAT, and the price is fixed. You get the price after a first call, so you know the cost before we start.' },
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
            'Svar ur era egna manualer, avtal och rutiner, med en länk till källan så att den som frågar kan kontrollera.',
            'En AI-chatt på er webbplats som svarar besökare utifrån er egen text. Chatten på den här sidan är ett exempel.',
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
          heading: 'I er stack',
          paragraphs: [
            'Jag bygger i den teknik ni redan har när det är rimligt, eller i en lätt och modern stack med TypeScript, Node eller Bun och Postgres när ni börjar från noll. Språkmodellerna väljs efter uppgiften: ibland en stor modell från Anthropic eller OpenAI, ibland en mindre öppen modell som kan köras på er egen server. Räcker inte en färdig modell kan jag träna och finjustera en öppen modell med er egen data.',
            'Koden är er från första dagen. Den ligger i ert repo, är dokumenterad och går att ta över av ert team eller av en annan leverantör om ni vill.',
          ],
        },
        {
          heading: 'AI på er egen server',
          paragraphs: [
            'Viss data får inte lämna företaget, som patientuppgifter, avtal eller ritningar. Då kan AI-modellen köras på en server hos er. Inget skickas till OpenAI eller någon annan molntjänst.',
            'Jag kör själv öppna modeller på egen hårdvara varje dag och vet vad de klarar. En lokal modell räcker ofta för att sortera, sammanfatta och söka i dokument. För svårare uppgifter jämför jag den mot en stor modell innan vi väljer.',
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
            'Answers from your own manuals, contracts and routines, with a link to the source so whoever asked can check.',
            'An AI chat on your website that answers visitors from your own text. The chat on this site is one example.',
          ],
        },
        {
          heading: 'Built to last',
          paragraphs: [
            'An agent that works in a demo is easy to build. An agent that works every day for a year takes more. So I build with tests against real examples, logs of every request and tool call, cost tracking per process and clear limits on what the agent may do on its own.',
            'Steps where a mistake is expensive go through human approval. The agent prepares, a person decides, and everything is kept so you can see afterwards who did what. These are the same principles regulated environments require, and I’ve built software in such environments, including medical technology.',
          ],
        },
        {
          heading: 'In your stack',
          paragraphs: [
            'I build in the technology you already have when that makes sense, or in a light, modern stack with TypeScript, Node or Bun and Postgres when you start from scratch. Models are chosen per task: sometimes a large model from Anthropic or OpenAI, sometimes a smaller open model that runs on your own server. When a ready-made model isn’t enough, I can train and fine-tune an open model with your own data.',
            'The code is yours from day one. It lives in your repository, is documented, and can be taken over by your team or another supplier whenever you like.',
          ],
        },
        {
          heading: 'AI on your own server',
          paragraphs: [
            'Some data may not leave the company, such as patient records, contracts or drawings. Then the AI model can run on a server at your place. Nothing is sent to OpenAI or any other cloud service.',
            'I run open models on my own hardware every day and know what they can do. A local model is often enough to sort, summarise and search documents. For harder tasks I compare it with a large model before we choose.',
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
        { q: 'Can you build in our existing technology?', a: 'Yes, in most cases. I’ve built in everything from large enterprise environments to new platforms, and I adapt to your stack, your code review routines and your security requirements.' },
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
      promise: 'Agenter som gör riktigt jobb.',
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
            'Ta emot frågor med rösten och svara med tal, så att ingen behöver skriva.',
          ],
        },
        {
          heading: 'Ni har kontrollen',
          paragraphs: [
            'Agenten får bara göra det uppgiften kräver. Allt den gör sparas, så ni kan se vad den gjorde och varför. Steg som rör pengar, avtal eller kunder kan kräva att en människa säger ja först.',
            'Ni ser också vad varje ärende kostar och hur ofta agenten gör rätt. Data som måste stanna i EU stannar där, och får den inte lämna huset kan agenten köra på en AI-modell på er egen server.',
          ],
        },
        {
          heading: 'Vad ni får när agenten är klar',
          paragraphs: ['Agenten är er, och allt runt den följer med.'],
          list: [
            'Agenten, i ert kodförråd och er från första dagen.',
            'Riktiga testfall från er verksamhet som körs vid varje ändring.',
            'En logg över varje steg agenten tar och vad det kostade.',
            'En lista över vad agenten får göra själv och vad som kräver ett ja från en människa.',
            'Ett sätt att stänga av den direkt.',
          ],
        },
        {
          heading: 'Så ser det ut i mina egna produkter',
          paragraphs: [
            'I Wez, mitt eget AI-team, syns varje steg, ändrad fil, kostnad och godkännande medan agenterna arbetar. I WebNu får agenter skriva utkast men aldrig publicera. I Copyset kan ett utkast från AI aldrig godkänna sig självt, och att godkänna är inte ens ett verktyg som AI kan anropa.',
            'Gränserna ligger i koden. En instruktion i prompten går att prata bort, men en regel i koden gäller vad agenten än blir ombedd att göra.',
          ],
        },
        {
          heading: 'Vad det kostar',
          paragraphs: [
            'Att bygga en första agent ingår i AI-utveckling, från 60 000 kr utan moms, med fast pris per steg. Priset sätts efter vad agenten är värd för er. Till det kommer kostnaden för AI-tjänsten, som beror på hur många ärenden agenten hanterar. Den mäter jag per ärende under testet.',
            'Ska jag sköta agenten efteråt ingår det i drift och förvaltning, från 5 000 kr i månaden.',
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
        { q: 'Hur lång tid tar det att bygga en AI-agent?', a: 'En agent för en enda sorts ärende kan oftast testas inom ett par veckor. Den tar över när den gör rätt tillräckligt ofta på riktiga fall.' },
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
      promise: 'Agents that do real work.',
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
            'Take questions by voice and answer in speech, so nobody has to type.',
          ],
        },
        {
          heading: 'You stay in control',
          paragraphs: [
            'The agent may only do what the task needs. Everything it does is saved, so you can see what it did and why. Steps that touch money, contracts or customers can require a person to say yes first.',
            'You also see what each case costs and how often the agent gets it right. Data that must stay in the EU stays there, and if it may not leave the building, the agent can run on an AI model on your own server.',
          ],
        },
        {
          heading: 'What you get when the agent is done',
          paragraphs: ['The agent is yours, and everything around it comes with it.'],
          list: [
            'The agent, in your repository and yours from day one.',
            'Real test cases from your business that run on every change.',
            'A log of every step the agent takes and what it cost.',
            'A list of what the agent may do on its own and what needs a yes from a person.',
            'A way to switch it off at once.',
          ],
        },
        {
          heading: 'What it looks like in my own products',
          paragraphs: [
            'In Wez, my own AI team, every step, changed file, cost and approval is visible while the agents work. In WebNu, agents may write drafts but never publish. In Copyset, an AI draft can never approve itself, and approving isn’t even a tool AI can call.',
            'The limits live in the code. An instruction in a prompt can be talked around, but a rule in the code holds whatever the agent is asked to do.',
          ],
        },
        {
          heading: 'What it costs',
          paragraphs: [
            'Building a first agent is part of AI development, from SEK 60,000 excluding VAT, with a fixed price per step. The price is set by what the agent is worth to you. On top comes the cost of the AI service, which depends on how many cases the agent handles. I measure it per case during the test.',
            'If I run the agent afterwards, that’s part of hosting and maintenance, from SEK 5,000 a month.',
          ],
        },
      ],
      steps: [
        'We pick one task and collect about fifty real examples.',
        'I build the agent and give it only the access it needs.',
        'It’s tested next to the team until it gets it right often enough.',
        'Then it takes over, step by step.',
      ],
      fitsWhen: [
        'The same kind of case comes in many times a week.',
        'Someone moves information between programs by hand.',
        'A chatbot isn’t enough; you need something that does the work.',
        'You must be able to show what the AI did and why.',
      ],
      firstEngagement: 'We usually start with a single kind of case, such as questions about deliveries. The agent can be tested within a couple of weeks and takes over once it gets it right often enough.',
      relatedCases: ['wez', 'openaudit'],
      relatedServices: ['automation', 'development'],
      faq: [
        { q: 'What is the difference between an AI agent and a chatbot?', a: 'A chatbot answers questions. An agent can also do things, such as look up a customer or update a system, within the limits you set.' },
        { q: 'Is it safe to let an agent work in our systems?', a: 'Yes, if it may only do what it needs, everything is saved and important steps need a yes from a person. That’s how I build.' },
        { q: 'What does it cost to run an AI agent?', a: 'It depends on how much it does. I measure the cost per case during the test, so you know before it takes over.' },
        { q: 'Can the agent use the systems we already have?', a: 'Yes. It connects to the programs you already use, such as email, your customer register and your finance system.' },
        { q: 'How long does it take to build an AI agent?', a: 'An agent for a single kind of case can usually be tested within a couple of weeks. It takes over once it gets real cases right often enough.' },
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
            'Ett bra test är att fråga om en ny medarbetare skulle behöva tolka något för att göra steget. Behövs ingen tolkning räcker vanlig kod, och den är både billigare att köra och lättare att felsöka.',
          ],
        },
        {
          heading: 'Den gissar inte',
          paragraphs: [
            'Allt automationen gör sparas. Om något går fel får rätt person veta det direkt. Det som AI:n är osäker på hamnar hos en människa i stället för att gissas.',
            'Jag kan sköta automationen åt er, eller lämna över den till ert team.',
          ],
        },
        {
          heading: 'Ett exempel: fakturor som kommer in',
          paragraphs: [
            'En faktura kommer som PDF i mejlen. AI läser av leverantör, belopp, förfallodatum och referens. Koden kontrollerar att summan stämmer, att leverantören finns och att fakturan inte redan är inlagd. Sedan skapas ett utkast i ekonomisystemet. Är något oklart går fakturan till en människa, med originalet bredvid.',
            'AI:n skapar aldrig betalningen. Den föreslår, och systemet avgör om förslaget är säkert nog att gå vidare.',
          ],
        },
        {
          heading: 'Byggt för att köras två gånger',
          paragraphs: [
            'Ett automatiskt flöde kommer förr eller senare att köras två gånger, för att nätverket tappade ett svar eller någon tryckte igen. Varje skrivning har därför en unik nyckel, så att samma faktura inte blir två. Steg som misslyckas försöker igen, och det som ger upp sparas där en människa ser det.',
            'Så är bakgrundsjobben byggda i SökHem, där matchning, notiser och inläsning av bostäder körs i köer dygnet runt.',
          ],
        },
        {
          heading: 'Vad det kostar',
          paragraphs: [
            'AI-automation ingår i AI-utveckling, från 60 000 kr utan moms och med fast pris per steg. Priset utgår från vad flödet är värt för er. Två timmar om dagen är ungefär 440 timmar om året, och det är där vi börjar räkna.',
            'Kostnaden för AI-tjänsten kommer till och mäts på era egna dokument under testet. Ska jag sköta flödet efteråt ingår det i drift och förvaltning, från 5 000 kr i månaden.',
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
      relatedCases: ['sokhem', 'copyset'],
      relatedServices: ['agents', 'assessment'],
      faq: [
        { q: 'Vad är AI-automation?', a: 'Automation som klarar rörigt underlag, som mejl, PDF:er och fritext. AI:n läser och förstår, vanlig kod gör resten.' },
        { q: 'Vad passar bäst att automatisera först?', a: 'Jobb som görs ofta, på ungefär samma sätt, och som tar mycket tid. Fakturor, beställningar och rapporter brukar ligga högt.' },
        { q: 'Vad händer när automationen är osäker?', a: 'Då gissar den inte. Fallet går till en människa som bestämmer.' },
        { q: 'Behöver vi byta system?', a: 'Nej. Automationen kopplas till de program ni redan har.' },
        { q: 'Vad kostar AI-automation?', a: 'Ett första flöde ingår i AI-utveckling, från 60 000 kr utan moms och med fast pris per steg. Kostnaden för AI-tjänsten kommer till, och jag mäter den under testet.' },
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
            'When the information is already in order, ordinary automation is enough. It’s cheaper and more predictable. I use AI where it’s needed, for text and images, and simple code for the rest.',
            'A good test is to ask whether a new employee would need to interpret anything to do the step. If no interpretation is needed, ordinary code is enough, and it’s both cheaper to run and easier to debug.',
          ],
        },
        {
          heading: 'It doesn’t guess',
          paragraphs: [
            'Everything the automation does is saved. If something goes wrong, the right person hears about it at once. Anything the AI is unsure about goes to a person instead of being guessed.',
            'I can run the automation for you, or hand it over to your team.',
          ],
        },
        {
          heading: 'An example: incoming invoices',
          paragraphs: [
            'An invoice arrives as a PDF by email. AI reads the supplier, amount, due date and reference. Code checks that the total adds up, that the supplier exists and that the invoice isn’t already entered. Then a draft is created in the finance system. If something is unclear, the invoice goes to a person, with the original alongside.',
            'The AI never creates the payment. It suggests, and the system decides whether the suggestion is safe enough to go on.',
          ],
        },
        {
          heading: 'Built to run twice',
          paragraphs: [
            'An automated flow will sooner or later run twice, because the network dropped a response or someone pressed the button again. So every write has a unique key, and the same invoice doesn’t become two. Steps that fail try again, and anything that gives up is kept where a person can see it.',
            'That’s how the background jobs in SökHem are built, where matching, notifications and loading listings run in queues around the clock.',
          ],
        },
        {
          heading: 'What it costs',
          paragraphs: [
            'AI automation is part of AI development, from SEK 60,000 excluding VAT with a fixed price per step. The price starts from what the flow is worth to you. Two hours a day is about 440 hours a year, and that’s where we start counting.',
            'The cost of the AI service comes on top and is measured on your own documents during the test. If I run the flow afterwards, that’s part of hosting and maintenance, from SEK 5,000 a month.',
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
      firstEngagement: 'We usually start with a single flow, such as incoming invoices. It’s usually running within a few weeks.',
      relatedCases: ['sokhem', 'copyset'],
      relatedServices: ['agents', 'assessment'],
      faq: [
        { q: 'What is AI automation?', a: 'Automation that copes with messy input, such as emails, PDFs and free text. The AI reads and understands; ordinary code does the rest.' },
        { q: 'What is best to automate first?', a: 'Work that is done often, in roughly the same way, and takes a lot of time. Invoices, orders and reports usually rank high.' },
        { q: 'What happens when the automation is unsure?', a: 'Then it doesn’t guess. The case goes to a person who decides.' },
        { q: 'Do we need to change systems?', a: 'No. The automation connects to the programs you already have.' },
        { q: 'What does AI automation cost?', a: 'A first flow is part of AI development, from SEK 60,000 excluding VAT with a fixed price per step. The cost of the AI service comes on top, and I measure it during the test.' },
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
            'Jag driver själv SökHem och OpenAudit, som är igång dygnet runt. Jag är van att ha ansvaret och stannar kvar efter starten.',
            'Varje månad får ni veta hur många ärenden som har hanterats, hur ofta en människa behövde gå in, vad det kostade och vad nästa förbättring är.',
          ],
        },
        {
          heading: 'Eller ta över själva',
          paragraphs: [
            'Vill ni sköta det själva får ert team koden, instruktionerna och den utbildning som behövs. Ni är aldrig låsta till mig.',
          ],
        },
        {
          heading: 'Så sköter jag mina egna tjänster',
          paragraphs: [
            'SökHem körs dygnet runt med en läsreplik av databasen, nattliga säkerhetskopior som sparas utanför servern, containrar som startas om automatiskt och en extern tjänst som larmar om sajten slutar svara. Grafana visar svarstider, fel och hur långa köerna är.',
            'Det är samma uppsättning ni får, anpassad efter vad ni har och var er data får finnas.',
          ],
        },
        {
          heading: 'När en AI-modell byts',
          paragraphs: [
            'AI-leverantörerna släpper nya modeller och slutar med gamla. Innan vi byter kör jag era testfall på den nya modellen och jämför med den gamla. Vi byter bara när resultatet är minst lika bra, och kostnaden per ärende räknas om.',
            'Lösningar jag bygger kan också prova nästa leverantör om den första inte svarar. Chatten på den här sidan gör så, med tre leverantörer i rad innan frågan går vidare till mig.',
          ],
        },
        {
          heading: 'Vad det kostar',
          paragraphs: ['Drift och förvaltning kostar från 5 000 kr i månaden utan moms. Priset beror på hur mycket som ska skötas. Kostnaden för servrar och AI-tjänster kommer till, och den ser ni i månadsrapporten.'],
        },
        {
          heading: 'Säkerhet och data',
          paragraphs: [
            'API-nycklar och lösenord ligger i en separat hemlighetshantering och aldrig i koden. Lösningen får bara åtkomst till de system och den data den behöver, och åtkomsten går att dra tillbaka på ett ställe.',
            'Beroenden uppdateras löpande, och koden granskas med OpenAudit för kända sårbarheter och läckta hemligheter. När något går fel rättar jag det och berättar i nästa rapport vad som hände och vad som är ändrat.',
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
      relatedServices: ['development', 'agents'],
      faq: [
        { q: 'Var körs lösningen?', a: 'Där er data får finnas. Oftast på servrar i EU, ibland hos er. Det bestämmer vi innan något byggs.' },
        { q: 'Vad händer när en AI-tjänst ändras?', a: 'Jag testar den nya versionen först. Vi byter bara när resultatet är minst lika bra.' },
        { q: 'Kan vi ta över driften senare?', a: 'Ja. Allt är ert från start, och vi planerar överlämningen tillsammans.' },
        { q: 'Vem äger datan?', a: 'Ni. Den används inte för att träna AI, och ni får med er allt när uppdraget slutar.' },
        { q: 'Vad kostar drift och förvaltning?', a: 'Från 5 000 kr i månaden utan moms. Kostnaden för servrar och AI-tjänster kommer till och syns i månadsrapporten.' },
        { q: 'Vad står i månadsrapporten?', a: 'Hur många ärenden lösningen har hanterat, hur ofta en människa behövde gå in, vad det kostade och vad nästa förbättring är. Har något gått fel står det också vad som hände och vad som är ändrat.' },
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
      intro: 'An AI solution isn’t finished when it starts. AI services change, prices change and your business changes. I make sure what I’ve built keeps working and gets better over time.',
      sections: [
        {
          heading: 'What’s included',
          paragraphs: ['You don’t need to think about the technical side. I do.'],
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
            'I run SökHem and OpenAudit myself, and they’re up around the clock. I’m used to carrying the responsibility, and I stay on after launch.',
            'Every month you learn how many cases were handled, how often a person had to step in, what it cost and what the next improvement is.',
          ],
        },
        {
          heading: 'Or run it yourselves',
          paragraphs: [
            'If you’d rather run it yourselves, your team gets the code, the instructions and the training it needs. You’re never locked in to me.',
          ],
        },
        {
          heading: 'How I run my own services',
          paragraphs: [
            'SökHem runs around the clock with a read replica of the database, nightly backups kept off the server, containers that restart automatically and an external service that alerts if the site stops answering. Grafana shows response times, errors and queue lengths.',
            'That’s the setup you get, adapted to what you have and where your data may be kept.',
          ],
        },
        {
          heading: 'When an AI model changes',
          paragraphs: [
            'AI providers release new models and retire old ones. Before we switch, I run your test cases on the new model and compare with the old one. We only switch when the result is at least as good, and the cost per case is worked out again.',
            'Solutions I build can also try the next provider if the first one doesn’t answer. The chat on this site does that, with three providers in turn before the question goes on to me.',
          ],
        },
        {
          heading: 'What it costs',
          paragraphs: ['Hosting and maintenance costs from SEK 5,000 a month excluding VAT. The price depends on how much there is to look after. Servers and AI services come on top, and you see that cost in the monthly report.'],
        },
        {
          heading: 'Security and data',
          paragraphs: [
            'API keys and passwords live in a separate secrets store, never in the code. The solution only gets access to the systems and data it needs, and that access can be withdrawn in one place.',
            'Dependencies are kept up to date, and the code is checked with OpenAudit for known vulnerabilities and leaked secrets. When something goes wrong, I fix it and tell you in the next report what happened and what has changed.',
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
      relatedServices: ['development', 'agents'],
      faq: [
        { q: 'Where does the solution run?', a: 'Wherever your data may be kept. Usually on servers in the EU, sometimes at your site. We decide that before anything is built.' },
        { q: 'What happens when an AI service changes?', a: 'I test the new version first. We only switch when the result is at least as good.' },
        { q: 'Can we take over later?', a: 'Yes. Everything is yours from the start, and we plan the handover together.' },
        { q: 'Who owns the data?', a: 'You do. It isn’t used to train AI, and you take everything with you when the work ends.' },
        { q: 'What does hosting and maintenance cost?', a: 'From SEK 5,000 a month excluding VAT. Servers and AI services come on top and show in the monthly report.' },
        { q: 'What’s in the monthly report?', a: 'How many cases the solution handled, how often a person had to step in, what it cost and what the next improvement is. If something went wrong, it also says what happened and what has changed.' },
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
            'Att se var AI hjälper på riktigt.',
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
            'Mellan mötena svarar jag på frågor från teamet och ledningen, granskar större ändringar och är med när något viktigt ska bestämmas.',
          ],
        },
        {
          heading: 'Vad ni får',
          paragraphs: ['Det konkreta resultatet av de första månaderna brukar vara det här.'],
          list: [
            'En plan för de närmaste tre månaderna, med vad som ska byggas och i vilken ordning.',
            'Tekniska beslut som är nedskrivna, så att teamet vet varför.',
            'Hjälp att skriva annonser, intervjua och välja utvecklare.',
            'Granskning av kod, arkitektur och leverantörers offerter.',
            'En bild av var AI kan spara tid i bolaget, och vad det kostar.',
          ],
        },
        {
          heading: 'Erfarenhet från egna produkter',
          paragraphs: [
            'Jag bygger och driver egna produkter, som SökHem och WebNu. Jag har alltså själv fattat de beslut ni står inför: vilken teknik som håller, vad som ska byggas först, hur driften ska se ut och hur AI-agenter kan skriva kod utan att kvaliteten sjunker.',
            'Innan dess var jag tech lead på weapp och utvecklare på Telia. Den erfarenheten tar jag med in i ert team, oavsett om ni har två utvecklare eller ingen alls.',
          ],
        },
        {
          heading: 'Vad det kostar',
          paragraphs: [
            'Fractional CTO kostar från 40 000 kr i månaden utan moms för en dag i veckan. Ett månadspris gör det lätt att budgetera, och behöver ni mer tid en period ändrar vi det.',
            'Som jämförelse kostar en senior konsult ofta 1 200 till 2 500 kr i timmen. Med ett månadspris vet ni vad ledningen kostar, och ni betalar inte för varje fråga mellan mötena.',
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
      relatedCases: ['sokhem', 'copyset'],
      relatedServices: ['assessment', 'development'],
      faq: [
        { q: 'Hur mycket tid lägger en fractional CTO?', a: 'Oftast några dagar i månaden. Vi ändrar det när bolaget växer.' },
        { q: 'Skriver du kod också?', a: 'Ja, när det är bästa sättet att komma vidare. Men målet är att teamet ska klara sig utan mig.' },
        { q: 'Kan du hjälpa oss att anställa en CTO på heltid?', a: 'Ja. Jag hjälper till med intervjuer och med att välja rätt person, och lämnar sedan över.' },
        { q: 'Jobbar du med bolag utanför Göteborg?', a: 'Ja. Jag träffar er gärna på plats i början, men det mesta fungerar på distans i hela Sverige.' },
        { q: 'Vad kostar en fractional CTO?', a: 'Från 40 000 kr i månaden utan moms för en dag i veckan. Behöver ni mer eller mindre tid ändrar vi det.' },
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
          paragraphs: ['It depends on where the company is, but it’s usually this.'],
          list: [
            'Choosing technology that holds up as the company grows.',
            'Deciding what to build first.',
            'Hiring the right developers and getting them going fast.',
            'Seeing where AI really helps.',
            'Reviewing suppliers and contracts when you buy development.',
          ],
        },
        {
          heading: 'Why me',
          paragraphs: [
            'I’ve been programming for more than ten years and building products professionally since 2019. As tech lead at weapp I led a team that built apps for the web, iPhone and Android.',
            'I explain technology so leadership understands it, and business goals so developers understand them. When it’s the fastest way, I write the code myself.',
          ],
        },
        {
          heading: 'What it usually looks like',
          paragraphs: [
            'Usually a few days a month, with set meetings and help in between. When the company is ready, I help you hire a full-time CTO and hand over.',
            'Between meetings I answer questions from the team and leadership, review larger changes and take part when something important is decided.',
          ],
        },
        {
          heading: 'What you get',
          paragraphs: ['The concrete result of the first months is usually this.'],
          list: [
            'A plan for the next three months, with what to build and in which order.',
            'Technical decisions written down, so the team knows why.',
            'Help writing job ads, interviewing and choosing developers.',
            'Reviews of code, architecture and suppliers’ quotes.',
            'A picture of where AI can save time in the company, and what it costs.',
          ],
        },
        {
          heading: 'Experience from my own products',
          paragraphs: [
            'I build and run my own products, such as SökHem and WebNu. So I’ve made the decisions you’re facing myself: which technology holds up, what to build first, how operations should look and how AI agents can write code without quality dropping.',
            'Before that I was a tech lead at weapp and a developer at Telia. I bring that experience into your team, whether you have two developers or none at all.',
          ],
        },
        {
          heading: 'What it costs',
          paragraphs: [
            'Fractional CTO costs from SEK 40,000 a month excluding VAT for one day a week. A monthly price is easy to budget, and if you need more time for a period, we change it.',
            'For comparison, a senior consultant often costs SEK 1,200 to 2,500 an hour. With a monthly price you know what the leadership costs, and you don’t pay for every question between meetings.',
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
        'You’re building a digital product but have no technical leader.',
        'The founders aren’t technical and need someone to ask.',
        'You have developers but nobody who sees the whole picture.',
        'You want to use AI but don’t know how to start.',
      ],
      firstEngagement: 'We start with a review and a plan for three months. Then we continue a few days a month for as long as it’s needed.',
      relatedCases: ['sokhem', 'copyset'],
      relatedServices: ['assessment', 'development'],
      faq: [
        { q: 'How much time does a fractional CTO spend?', a: 'Usually a few days a month. We change that as the company grows.' },
        { q: 'Do you write code as well?', a: 'Yes, when that’s the best way forward. But the goal is for the team to manage without me.' },
        { q: 'Can you help us hire a full-time CTO?', a: 'Yes. I help with interviews and with choosing the right person, and then hand over.' },
        { q: 'Do you work with companies outside Gothenburg?', a: 'Yes. I like to meet in person at the start, but most of the work runs just as well remotely across Sweden.' },
        { q: 'What does a fractional CTO cost?', a: 'From SEK 40,000 a month excluding VAT for one day a week. If you need more or less time, we change it.' },
      ],
    },
  },
};

export const getService = (id: ServiceId, locale: Locale): ServiceContent => services[id][locale];
