import type { Locale, ServiceId } from './routes';
import type { Faq } from './types';

export interface PriceRow {
  /** links the row to its service page; a row without one has no page */
  service?: ServiceId;
  name: string;
  price: string;
  /** lowest price in SEK excl. VAT, for the structured data */
  min: number;
  unit?: 'month' | 'hour';
  detail: string;
}

export interface PricesContent {
  seo: { title: string; description: string };
  h1: string;
  intro: string;
  rows: PriceRow[];
  sections: Array<{ heading: string; paragraphs: string[]; list?: string[] }>;
  webnu: { heading: string; text: string; link: string };
  faq: Faq[];
}

export const WEBNU_URL = 'https://webnu.se/';

export const prices: Record<Locale, PricesContent> = {
  sv: {
    seo: {
      title: 'Priser för AI-konsult i Göteborg | Anton Wester',
      description: 'Vad kostar en AI-konsult? AI-kartläggning från 25 000 kr, AI-utveckling från 60 000 kr och fractional CTO från 40 000 kr i månaden. Fasta priser.',
    },
    h1: 'Priser',
    intro: 'Alla priser är utan moms. Innan vi börjar får ni ett fast pris för varje steg, så att ni vet vad det kostar.',
    rows: [
      { service: 'assessment', name: 'AI-kartläggning', price: 'från 25 000 kr', min: 25000,
        detail: 'Fast pris. Jag sitter med dem som gör jobbet och ger er en lista över var AI sparar mest tid, vad det kostar att bygga och var ni ska börja.' },
      { service: 'development', name: 'AI-utveckling, agenter och automation', price: 'från 60 000 kr', min: 60000,
        detail: 'Fast pris per steg. Ett första steg kan vara AI som sorterar och svarar på mejl, kopplad till era system och testad på riktiga exempel.' },
      { service: 'operations', name: 'Drift och förvaltning', price: 'från 5 000 kr i månaden', min: 5000, unit: 'month',
        detail: 'Jag håller lösningen igång, säker och uppdaterad. Varje månad går vi igenom vad den kostar, vad den sparar och vad som ska bli bättre.' },
      { service: 'cto', name: 'Fractional CTO', price: 'från 40 000 kr i månaden', min: 40000, unit: 'month',
        detail: 'En dag i veckan. Jag fattar de tekniska besluten med er, hjälper er att anställa rätt och visar var AI kan hjälpa bolaget.' },
      { name: 'Längre uppdrag i ert team', price: 'från 1 100 kr i timmen', min: 1100, unit: 'hour',
        detail: 'När ni behöver en utvecklare eller tech lead i teamet under en längre tid.' },
    ],
    sections: [
      {
        heading: 'Vad som styr priset',
        paragraphs: [
          'Mest hur många system lösningen ska kopplas till och hur mycket en människa ska godkänna. Ett flöde i ett system kostar mindre än ett som går genom fem.',
          'AI-tjänsterna kostar också pengar att köra, och den kostnaden ingår inte ovan. Jag mäter den under testet, så att ni vet den innan lösningen tar över.',
        ],
      },
      {
        heading: 'Så går ett uppdrag till',
        paragraphs: [],
        list: [
          'Ett gratis introsamtal på 30 minuter.',
          'Ni får ett fast pris för första steget.',
          'Jag bygger, testar och visar resultatet.',
          'Ni bestämmer om vi går vidare.',
        ],
      },
    ],
    webnu: {
      heading: 'Behöver ni bara en hemsida?',
      text: 'Då passar WebNu bättre. Det är min tjänst för färdiga hemsidor till småföretag, och ni ser sidan innan ni betalar.',
      link: 'Till WebNu',
    },
    faq: [
      { q: 'Varför fast pris och inte timpris?', a: 'Med fast pris vet ni kostnaden innan vi börjar. Tar jobbet längre tid än jag räknat med är det min sak.' },
      { q: 'Vad ingår inte i priset?', a: 'Kostnaden för AI-tjänsterna och för servrar, om lösningen behöver egna. Den får ni veta innan vi bygger.' },
      { q: 'Kostar introsamtalet något?', a: 'Nej. Samtalet är gratis och ni lovar inget genom att boka det.' },
    ],
  },
  en: {
    seo: {
      title: 'Prices for an AI consultant in Gothenburg | Anton Wester',
      description: 'What does an AI consultant cost? AI assessment from SEK 25,000, AI development from SEK 60,000 and fractional CTO from SEK 40,000 a month. Fixed prices.',
    },
    h1: 'Prices',
    intro: 'All prices exclude VAT. Before we start you get a fixed price for each step, so you know what it costs.',
    rows: [
      { service: 'assessment', name: 'AI assessment', price: 'from SEK 25,000', min: 25000,
        detail: 'Fixed price. I sit with the people who do the work and give you a list of where AI saves the most time, what it costs to build and where to start.' },
      { service: 'development', name: 'AI development, agents and automation', price: 'from SEK 60,000', min: 60000,
        detail: 'Fixed price per step. A first step can be AI that sorts and answers email, connected to your systems and tested on real examples.' },
      { service: 'operations', name: 'Hosting and maintenance', price: 'from SEK 5,000 a month', min: 5000, unit: 'month',
        detail: 'I keep the solution up, safe and up to date. Every month we go through what it costs, what it saves and what to improve next.' },
      { service: 'cto', name: 'Fractional CTO', price: 'from SEK 40,000 a month', min: 40000, unit: 'month',
        detail: 'One day a week. I make the technical decisions with you, help you hire the right people and show where AI can help the company.' },
      { name: 'Longer work in your team', price: 'from SEK 1,100 an hour', min: 1100, unit: 'hour',
        detail: 'When you need a developer or tech lead in the team for a longer time.' },
    ],
    sections: [
      {
        heading: 'What sets the price',
        paragraphs: [
          'Mostly how many systems the solution connects to and how much a person needs to approve. A flow in one system costs less than one that runs through five.',
          'AI services also cost money to run, and that cost isn’t included above. I measure it during the test, so you know it before the solution takes over.',
        ],
      },
      {
        heading: 'How an engagement runs',
        paragraphs: [],
        list: [
          'A free 30-minute intro call.',
          'You get a fixed price for the first step.',
          'I build, test and show you the result.',
          'You decide whether we go on.',
        ],
      },
    ],
    webnu: {
      heading: 'Just need a website?',
      text: 'Then WebNu is a better fit. It’s my service for ready-made websites for small businesses, and you see the site before you pay.',
      link: 'Go to WebNu',
    },
    faq: [
      { q: 'Why a fixed price and not an hourly rate?', a: 'With a fixed price you know the cost before we start. If the work takes longer than I planned, that’s on me.' },
      { q: 'What isn’t included?', a: 'The cost of the AI services, and of servers if the solution needs its own. You’ll know it before I build.' },
      { q: 'Does the intro call cost anything?', a: 'No. The call is free and booking it doesn’t commit you to anything.' },
    ],
  },
};
