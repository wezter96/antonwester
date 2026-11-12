import type { GuideContent, L10n } from '../types';

export const aiAutomation: L10n<GuideContent> = {
  sv: {
    id: 'ai-automation',
    seo: {
      title: 'Automatisera rutiner med AI utan att tappa kontrollen | Anton Wester',
      description:
        'Så automatiserar du fakturor, mejl och rutiner med AI: deterministiska steg, godkännanden, idempotens och mätning. Praktisk guide av Anton Wester.',
    },
    h1: 'Automatisera rutiner med AI utan att tappa kontrollen',
    promise: 'Automatisera flödet, inte bara texten.',
    intro:
      'AI gör mest nytta i kanten av ett flöde: läsa, tolka och föreslå. Resten bör vara vanlig, förutsägbar kod med tydliga kontroller.',
    published: '2026-09-16',
    readingMinutes: 7,
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
        heading: 'Gör skrivningarna idempotenta',
        paragraphs: [
          'Ett automatiskt flöde kommer förr eller senare att köras två gånger. Nätverket kan tappa svaret, kön kan starta om och någon kan trycka igen. Varje skrivning behöver en unik nyckel så att samma faktura inte blir två fakturor.',
          'Spara också vilket steg som är klart. Då kan flödet återupptas utan att börja om från början, och ni slipper dubbletter i affärssystemet.',
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
    ],
    relatedServices: ['automation', 'agents'],
    relatedGuides: ['ai-agents', 'mcp-server'],
  },
  en: {
    id: 'ai-automation',
    seo: {
      title: 'Automate routine work with AI without losing control | Anton Wester',
      description:
        'How to automate invoices, email and routines with AI: deterministic steps, approvals, idempotency and measurement. A practical guide by Anton Wester.',
    },
    h1: 'Automate routine work with AI without losing control',
    promise: 'Automate the flow, not just the text.',
    intro:
      'AI is most useful at the edge of a flow: reading, interpreting and suggesting. The rest should be ordinary, predictable code with clear checks.',
    published: '2026-09-16',
    readingMinutes: 7,
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
        heading: 'Make writes idempotent',
        paragraphs: [
          'An automated flow will eventually run twice. The network can drop the response, the queue can restart and someone can press the button again. Every write needs a unique key so the same invoice does not become two invoices.',
          'Store which step is complete as well. Then the flow can resume without starting over, and you avoid duplicates in the business system.',
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
    ],
    relatedServices: ['automation', 'agents'],
    relatedGuides: ['ai-agents', 'mcp-server'],
  },
};
