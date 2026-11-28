import type { GuideContent, L10n } from '../types';

export const aiAutomation: L10n<GuideContent> = {
  sv: {
    id: 'ai-automation',
    seo: {
      title: 'Hur automatiserar man rutiner med AI? | Anton Wester',
      description:
        'Så automatiserar du fakturor, mejl och rutiner med AI: deterministiska steg, godkännanden, idempotens och mätning. Praktisk guide av Anton Wester.',
    },
    h1: 'Hur automatiserar man rutiner med AI utan att tappa kontrollen?',
    promise: 'Automatisera flödet, inte bara texten.',
    intro:
      'Låt AI göra det som kräver tolkning, som att läsa en faktura eller ett mejl, och låt vanlig kod göra resten: kontrollera belopp, stoppa dubbletter och skriva till era system. Det AI:n är osäker på går till en människa. Börja med ett flöde, mät hur mycket som går rakt igenom och bygg vidare därifrån.',
    published: '2026-11-12',
    updated: '2026-11-28',
    readingMinutes: 9,
    sections: [
      {
        heading: 'Börja med flödet, inte verktyget',
        paragraphs: [
          'Innan jag väljer modell ritar jag flödet: vad kommer in, vilka beslut fattas, vilka system skrivs det till och vem ansvarar när något är fel. Först då går det att se var AI behövs.',
          'Ofta är det bara ett eller två steg som kräver tolkning. Resten är kontroller, uppslagningar och skrivningar som ska göras likadant varje gång. De ska inte lämnas till en modell.',
        ],
      },
      {
        heading: 'Ett exempel: inkommande fakturor',
        paragraphs: [
          'En faktura kommer som PDF eller i mejlet. AI läser av leverantör, belopp, förfallodatum och referens. Koden kontrollerar att summan stämmer, att leverantören finns och att ingen dubblett skapas. Sedan skapas ett utkast i ekonomisystemet.',
          'Om något är oklart hamnar fakturan i en kö för en människa. Modellen får inte skapa betalningen. Den får föreslå, och systemet får avgöra om förslaget är tillräckligt säkert.',
        ],
        steps: [
          'Läs in dokumentet och spara originalfilen.',
          'Låt AI extrahera fält och returnera även osäkerhet.',
          'Kontrollera belopp, leverantör och dubbletter i kod.',
          'Skapa ett utkast, inte en betalning.',
          'Skicka oklara fall till en människa med originalet som underlag.',
        ],
      },
      {
        heading: 'Ett exempel till: beställningar i mejlen',
        paragraphs: [
          'En kund mejlar en beställning med fritext och en bifogad lista. AI läser ut kund, artiklar och antal. Koden slår upp kunden i kundregistret och artiklarna i artikelregistret. Finns allt och antalen ser rimliga ut skapas ett orderutkast.',
          'Saknas en artikel eller är kunden okänd går mejlet till säljaren, med det som gick att tolka redan ifyllt. Säljaren gör då bara den del som kräver en människa. Även ett flöde som inte går helt rakt igenom sparar tid på det sättet.',
        ],
      },
      {
        heading: 'Gör skrivningarna idempotenta',
        paragraphs: [
          'Ett automatiskt flöde kommer förr eller senare att köras två gånger. Nätverket kan tappa svaret, kön kan starta om och någon kan trycka igen. Varje skrivning behöver en unik nyckel så att samma faktura inte blir två fakturor.',
          'Spara också vilket steg som är klart. Då kan flödet återupptas utan att börja om från början, och ni slipper dubbletter i affärssystemet.',
        ],
      },
      {
        heading: 'Köer och omförsök',
        paragraphs: [
          'Ett flöde som läser mejl och skriver till ett affärssystem beror på flera system, och vart och ett kan vara nere en stund. Lägg därför varje steg som ett jobb i en kö, med ett begränsat antal omförsök och längre väntan mellan försöken. Ett jobb som fortfarande misslyckas efter sista försöket ska sparas där en människa ser det. Det får inte bara försvinna.',
          'Så är bakgrundsjobben byggda i SökHem, min bostadstjänst. Matchning, notiser och inläsning av bostäder körs som jobb i BullMQ med Redis som kö. Mejl skickas med en idempotensnyckel, och samma notis om samma bostad stoppas om den nyss har gått ut. Jobb som ger upp sparas i en egen tabell i databasen, så att det går att se i efterhand vilka köer som har haft problem.',
        ],
      },
      {
        heading: 'Låt osäkerhet få ett eget flöde',
        paragraphs: [
          'En modell som alltid svarar något är farlig i automation. Be den returnera ett fält för osäkerhet eller ett explicit “kan inte tolka”. Sätt en gräns: över den går ärendet till en människa.',
          'Det är bättre att 15 procent hamnar i en granskningskö än att 100 procent ser automatiska ut men några är fel. Mät hur stor andel som går rakt igenom, och förbättra det som fastnar.',
        ],
      },
      {
        heading: 'Logga och granska',
        paragraphs: [
          'Logga varje körning med ärendenummer, modellversion, vilka fält som extraherades och vilka kontroller som passerade. Spara inte hela dokumentet i loggen om det innehåller känsliga uppgifter.',
          'Granska ett urval varje vecka i början. När flödet är stabilt kan urvalet bli mindre, men det ska aldrig bli noll. Automation utan uppföljning är bara ett snabbare sätt att göra fel.',
        ],
      },
      {
        heading: 'Mät det som betyder något',
        paragraphs: [
          'Räkna hur många ärenden som går igenom utan mänsklig hand, hur lång tid de tar och hur många som blir fel. Jämför med hur det såg ut innan. Det är siffrorna som avgör om nästa steg är värt att bygga.',
          'Börja med ett flöde och en avdelning. När det fungerar går det att återanvända kontrollerna, loggningen och granskningskön i nästa flöde.',
        ],
      },
      {
        heading: 'Vad det kostar',
        paragraphs: [
          'AI-automation ingår i AI-utveckling, som börjar på 60 000 kr utan moms. Priset sätts efter vad flödet är värt för er och är fast för varje steg. Lägger en person två timmar om dagen på att läsa och föra in fakturor är det ungefär 440 timmar om året, och det är där vi börjar räkna.',
          'Till det kommer kostnaden för AI-tjänsten, som beror på hur många dokument som läses och hur långa de är. Jag mäter den på era egna dokument under testet, så att ni vet vad ett dokument kostar att läsa innan flödet tar över. Vet ni inte vilket flöde ni ska börja med är en AI-kartläggning, från 25 000 kr, ett bättre första steg.',
        ],
      },
    ],
    faq: [
      {
        q: 'Kan AI läsa fakturor och mejl tillräckligt bra?',
        a: 'Ofta ja, men inte alltid. Därför behöver flödet kontrollera belopp och dubbletter och skicka osäkra fall till en människa. Kvaliteten mäts på era egna dokument.',
      },
      {
        q: 'Måste vi byta affärssystem?',
        a: 'Nej. Automatiserad läsning kan ligga framför det system ni har. Det som krävs är ett API eller ett importerbart format.',
      },
      {
        q: 'Hur lång tid tar en första automation?',
        a: 'Ett smalt flöde med ett system kan ofta vara igång på några veckor. Fler system och fler undantag tar längre tid.',
      },
      {
        q: 'Vad kostar AI-automation?',
        a: 'Ett första flöde ingår i AI-utveckling, från 60 000 kr utan moms och med fast pris per steg. Kostnaden för AI-tjänsten kommer utöver det, och jag mäter den under testet.',
      },
    ],
    relatedServices: ['automation', 'agents'],
    relatedCases: ['sokhem', 'webnu'],
    relatedGuides: ['ai-agents', 'mcp-server'],
  },
  en: {
    id: 'ai-automation',
    seo: {
      title: 'How do you automate routine work with AI? | Anton Wester',
      description:
        'How to automate invoices, email and routines with AI: deterministic steps, approvals, idempotency and measurement. A practical guide by Anton Wester.',
    },
    h1: 'How do you automate routine work with AI without losing control?',
    promise: 'Automate the flow, not just the text.',
    intro:
      'Let AI do the parts that need interpretation, such as reading an invoice or an email, and let ordinary code do the rest: check amounts, stop duplicates and write to your systems. Anything the AI is unsure about goes to a person. Start with one flow, measure how much goes straight through and build from there.',
    published: '2026-11-12',
    updated: '2026-11-28',
    readingMinutes: 9,
    sections: [
      {
        heading: 'Start with the flow, not the tool',
        paragraphs: [
          'Before choosing a model I draw the flow: what comes in, which decisions are made, which systems are written to and who is responsible when something is wrong. Only then is it possible to see where AI is needed.',
          'Often only one or two steps require interpretation. The rest are checks, lookups and writes that should happen the same way every time. Those should not be handed to a model.',
        ],
      },
      {
        heading: 'An example: incoming invoices',
        paragraphs: [
          'An invoice arrives as a PDF or in email. AI reads the supplier, amount, due date and reference. Code checks that the total adds up, that the supplier exists and that no duplicate is created. Then a draft is created in the finance system.',
          'If something is unclear, the invoice goes into a queue for a person. The model may not create the payment. It may suggest, and the system decides whether the suggestion is safe enough.',
        ],
        steps: [
          'Read the document and store the original file.',
          'Have AI extract fields and return uncertainty too.',
          'Check amount, supplier and duplicates in code.',
          'Create a draft, not a payment.',
          'Send unclear cases to a person with the original as evidence.',
        ],
      },
      {
        heading: 'Another example: orders in the inbox',
        paragraphs: [
          'A customer emails an order with free text and an attached list. AI reads out the customer, items and quantities. Code looks the customer up in the customer register and the items in the product register. If everything exists and the quantities look reasonable, an order draft is created.',
          'If an item is missing or the customer is unknown, the email goes to the seller with whatever could be read already filled in. The seller then does only the part that needs a person. Even a flow that doesn’t go all the way through saves time like that.',
        ],
      },
      {
        heading: 'Make writes idempotent',
        paragraphs: [
          'An automated flow will eventually run twice. The network can drop the response, the queue can restart and someone can press the button again. Every write needs a unique key so the same invoice does not become two invoices.',
          'Store which step is complete as well. Then the flow can resume without starting over, and you avoid duplicates in the business system.',
        ],
      },
      {
        heading: 'Queues and retries',
        paragraphs: [
          'A flow that reads email and writes to a business system depends on several systems, and any of them can be down for a while. So put each step in a queue as a job, with a limited number of retries and a longer wait between attempts. A job that still fails after the last attempt should be kept where a person can see it. It mustn’t just disappear.',
          'That’s how the background jobs in SökHem, my home-search service, are built. Matching, notifications and loading listings run as jobs in BullMQ with Redis as the queue. Emails are sent with an idempotency key, and the same notification about the same home is stopped if it has just gone out. Jobs that give up are saved in their own database table, so you can see afterwards which queues have had trouble.',
        ],
      },
      {
        heading: 'Give uncertainty its own path',
        paragraphs: [
          'A model that always answers something is dangerous in automation. Ask it to return an uncertainty field or an explicit “cannot interpret”. Set a threshold: above it, the case goes to a person.',
          'It is better for 15 percent to land in a review queue than for 100 percent to look automatic while some are wrong. Measure the share that goes straight through, and improve what gets stuck.',
        ],
      },
      {
        heading: 'Log and review',
        paragraphs: [
          'Log each run with case id, model version, extracted fields and which checks passed. Do not store the whole document in the log if it contains sensitive information.',
          'Review a sample every week at the start. When the flow is stable the sample can shrink, but it should never be zero. Automation without follow-up is just a faster way to do the wrong thing.',
        ],
      },
      {
        heading: 'Measure what matters',
        paragraphs: [
          'Count how many cases go through without human handling, how long they take and how many are wrong. Compare with how it looked before. Those numbers decide whether the next step is worth building.',
          'Start with one flow and one department. When it works, the checks, logging and review queue can be reused in the next flow.',
        ],
      },
      {
        heading: 'What it costs',
        paragraphs: [
          'AI automation is part of AI development, which starts at SEK 60,000 excluding VAT. The price is set by what the flow is worth to you and is fixed for each step. If a person spends two hours a day reading and entering invoices, that’s about 440 hours a year, and that’s where we start counting.',
          'On top of that comes the cost of the AI service, which depends on how many documents are read and how long they are. I measure it on your own documents during the test, so you know what one document costs to read before the flow takes over. If you don’t know which flow to start with, an AI assessment from SEK 25,000 is a better first step.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can AI read invoices and email well enough?',
        a: 'Often yes, but not always. That is why the flow must check amounts and duplicates and send uncertain cases to a person. Quality is measured on your own documents.',
      },
      {
        q: 'Do we have to replace our business system?',
        a: 'No. Automated reading can sit in front of the system you already have. What you need is an API or an importable format.',
      },
      {
        q: 'How long does a first automation take?',
        a: 'A narrow flow with one system can often be live in a few weeks. More systems and more exceptions take longer.',
      },
      {
        q: 'What does AI automation cost?',
        a: 'A first flow is part of AI development, from SEK 60,000 excluding VAT with a fixed price per step. The cost of the AI service comes on top, and I measure it during the test.',
      },
    ],
    relatedServices: ['automation', 'agents'],
    relatedCases: ['sokhem', 'webnu'],
    relatedGuides: ['ai-agents', 'mcp-server'],
  },
};
