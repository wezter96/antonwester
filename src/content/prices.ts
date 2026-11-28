import type { Locale, ServiceId } from './routes';
import type { Faq } from './types';

export interface PriceRow {
  /** links the row to its service page; a row without one has no page */
  service?: ServiceId;
  name: string;
  price: string;
  /** lowest price in SEK excl. VAT, for the structured data */
  min: number;
  unit?: 'month';
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
      title: 'Vad kostar en AI-konsult? Priser i Göteborg | Anton Wester',
      description: 'Vad kostar en AI-konsult? Ofta 1 200 till 2 500 kr i timmen. Jag tar fast pris per steg: AI-kartläggning från 25 000 kr, AI-utveckling från 60 000 kr.',
    },
    h1: 'Vad kostar en AI-konsult?',
    intro: 'En AI-konsult i Sverige tar ofta mellan 1 200 och 2 500 kr i timmen. Jag säljer inte timmar. Ni får ett fast pris per steg, satt efter vad lösningen sparar eller tjänar åt er: AI-kartläggning från 25 000 kr, AI-utveckling från 60 000 kr och fractional CTO från 40 000 kr i månaden. Alla priser är utan moms.',
    rows: [
      { service: 'assessment', name: 'AI-kartläggning', price: 'från 25 000 kr', min: 25000,
        detail: 'Fast pris. Jag sitter med dem som gör jobbet och ger er en lista över var AI sparar mest tid, vad det kostar att bygga och var ni ska börja.' },
      { service: 'development', name: 'AI-utveckling, agenter och automation', price: 'från 60 000 kr', min: 60000,
        detail: 'Pris efter värde, fast per steg. Ett första steg kan vara AI som sorterar och svarar på mejl, kopplad till era system och testad på riktiga exempel.' },
      { service: 'operations', name: 'Drift och förvaltning', price: 'från 5 000 kr i månaden', min: 5000, unit: 'month',
        detail: 'Jag håller lösningen igång, säker och uppdaterad. Varje månad går vi igenom vad den kostar, vad den sparar och vad som ska bli bättre.' },
      { service: 'cto', name: 'Fractional CTO', price: 'från 40 000 kr i månaden', min: 40000, unit: 'month',
        detail: 'En dag i veckan. Jag fattar de tekniska besluten med er, hjälper er att anställa rätt och visar var AI kan hjälpa bolaget.' },
    ],
    sections: [
      {
        heading: 'Vad som styr priset',
        paragraphs: [
          'Vad lösningen är värd för er. Lägger en person två timmar om dagen på ett flöde är det ungefär 440 timmar om året. Med 600 kr i timmen är flödet värt 264 000 kr om året.',
          'Priset är en mindre del av det värdet, och skillnaden är er vinst. Antalet timmar jag lägger påverkar inte priset.',
          'AI-tjänsterna kostar också pengar att köra, och den kostnaden ingår inte ovan. Jag mäter den under testet, så att ni vet den innan lösningen tar över.',
        ],
      },
      {
        heading: 'Jämfört med timpris',
        paragraphs: [
          'En senior konsult i Sverige kostar ofta mellan 1 200 och 2 500 kr i timmen, och AI-specialister ligger oftast i den övre halvan. Med ett timpris vet ni vad en timme kostar, men inte vad hela jobbet kommer att kosta.',
          'Räknat i timmar motsvarar en AI-kartläggning från 25 000 kr ungefär 10 till 20 konsulttimmar. Skillnaden är att mitt pris är fast. Tar jobbet längre tid än jag räknat med betalar ni inte mer.',
          'Jämför ni offerter från flera konsulter: be om totalpriset för ett avgränsat steg och om en beskrivning av vad som ska vara klart när steget är slut. Det är lättare att jämföra än timpriser.',
        ],
      },
      {
        heading: 'Vad som ingår i ett steg',
        paragraphs: ['Det fasta priset gäller ett avgränsat steg med ett tydligt resultat. I ett byggsteg ingår det här.'],
        list: [
          'Koden, i ert kodförråd och er från första dagen.',
          'Tester mot riktiga exempel från er verksamhet.',
          'Loggar över vad lösningen gör, och gränser för vad den får göra själv.',
          'En mätning av vad AI-tjänsten kostar att köra vid er volym.',
          'Dokumentation, så att ert team eller en annan leverantör kan ta över.',
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
      { q: 'Vad kostar en AI-konsult i timmen?', a: 'I Sverige oftast mellan 1 200 och 2 500 kr i timmen för en senior konsult. Jag tar inte timpris. Ni får ett fast pris per steg, från 25 000 kr för en AI-kartläggning.' },
      { q: 'Varför inte timpris?', a: 'Ett timpris belönar den som är långsam. Med pris efter värde vet ni kostnaden innan vi börjar, och tar jobbet längre tid än jag räknat med är det min sak.' },
      { q: 'Kan vi få en tech lead i teamet under lång tid?', a: 'Ja. Då sätter vi ett månadspris utifrån vad teamet ska leverera.' },
      { q: 'Vad ingår inte i priset?', a: 'Kostnaden för AI-tjänsterna och för servrar, om lösningen behöver egna. Den får ni veta innan vi bygger.' },
      { q: 'Kostar introsamtalet något?', a: 'Nej. Samtalet är gratis och ni lovar inget genom att boka det.' },
    ],
  },
  en: {
    seo: {
      title: 'What does an AI consultant cost? Prices | Anton Wester',
      description: 'What does an AI consultant cost? In Sweden often SEK 1,200 to 2,500 an hour. I charge a fixed price per step: AI assessment from SEK 25,000.',
    },
    h1: 'What does an AI consultant cost?',
    intro: 'An AI consultant in Sweden often charges between SEK 1,200 and 2,500 an hour. I don’t sell hours. You get a fixed price per step, set by what the solution saves or earns you: AI assessment from SEK 25,000, AI development from SEK 60,000 and fractional CTO from SEK 40,000 a month. All prices exclude VAT.',
    rows: [
      { service: 'assessment', name: 'AI assessment', price: 'from SEK 25,000', min: 25000,
        detail: 'Fixed price. I sit with the people who do the work and give you a list of where AI saves the most time, what it costs to build and where to start.' },
      { service: 'development', name: 'AI development, agents and automation', price: 'from SEK 60,000', min: 60000,
        detail: 'Priced on value, fixed per step. A first step can be AI that sorts and answers email, connected to your systems and tested on real examples.' },
      { service: 'operations', name: 'Hosting and maintenance', price: 'from SEK 5,000 a month', min: 5000, unit: 'month',
        detail: 'I keep the solution up, safe and up to date. Every month we go through what it costs, what it saves and what to improve next.' },
      { service: 'cto', name: 'Fractional CTO', price: 'from SEK 40,000 a month', min: 40000, unit: 'month',
        detail: 'One day a week. I make the technical decisions with you, help you hire the right people and show where AI can help the company.' },
    ],
    sections: [
      {
        heading: 'What sets the price',
        paragraphs: [
          'What the solution is worth to you. If a person spends two hours a day on a flow, that’s about 440 hours a year. At SEK 600 an hour the flow is worth SEK 264,000 a year.',
          'The price is a smaller share of that value, and the difference is your gain. The hours I spend don’t affect the price.',
          'AI services also cost money to run, and that cost isn’t included above. I measure it during the test, so you know it before the solution takes over.',
        ],
      },
      {
        heading: 'Compared with an hourly rate',
        paragraphs: [
          'A senior consultant in Sweden often costs between SEK 1,200 and 2,500 an hour, and AI specialists are usually in the upper half. With an hourly rate you know what an hour costs, but not what the whole job will cost.',
          'Counted in hours, an AI assessment from SEK 25,000 is roughly 10 to 20 consultant hours. The difference is that my price is fixed. If the work takes longer than I planned, you don’t pay more.',
          'If you’re comparing quotes from several consultants, ask for the total price of a defined step and a description of what will be done when the step ends. That’s easier to compare than hourly rates.',
        ],
      },
      {
        heading: 'What a step includes',
        paragraphs: ['The fixed price covers a defined step with a clear result. A build step includes this.'],
        list: [
          'The code, in your repository and yours from day one.',
          'Tests against real examples from your business.',
          'Logs of what the solution does, and limits on what it may do on its own.',
          'A measurement of what the AI service costs to run at your volume.',
          'Documentation, so your team or another supplier can take over.',
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
      { q: 'What does an AI consultant cost per hour?', a: 'In Sweden usually between SEK 1,200 and 2,500 an hour for a senior consultant. I don’t charge by the hour. You get a fixed price per step, from SEK 25,000 for an AI assessment.' },
      { q: 'Why not an hourly rate?', a: 'An hourly rate rewards being slow. With value-based pricing you know the cost before we start, and if the work takes longer than I planned, that’s on me.' },
      { q: 'Can I get a tech lead in the team for a long time?', a: 'Yes. Then we set a monthly price based on what the team will deliver.' },
      { q: 'What isn’t included?', a: 'The cost of the AI services, and of servers if the solution needs its own. You’ll know it before I build.' },
      { q: 'Does the intro call cost anything?', a: 'No. The call is free and booking it doesn’t commit you to anything.' },
    ],
  },
};
