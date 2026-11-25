import type { GuideContent, L10n } from '../types';

export const valuePricing: L10n<GuideContent> = {
  sv: {
    id: 'value-pricing',
    seo: {
      title: 'Värdebaserat pris för AI-utveckling | Anton Wester',
      description:
        'Därför tar jag betalt för vad en AI-lösning ger er och inte per timme. Så räknar vi värdet, så sätts priset och när modellen inte passar.',
    },
    h1: 'Värdebaserat pris: därför säljer jag inte timmar',
    promise: 'Ni betalar för vad lösningen gör för er. Hur länge jag sitter vid datorn är min sak.',
    intro:
      'Timpris var rimligt när en utvecklare skrev varje rad själv. Med AI-agenter bygger jag på dagar det som förr tog ett team flera månader. Då säger timmarna nästan ingenting om vad ni får.',
    published: '2026-11-25',
    readingMinutes: 5,
    sections: [
      {
        heading: 'Timmar mäter fel sak',
        paragraphs: [
          'Ett timpris belönar den som är långsam. Blir jag snabbare tjänar jag mindre, och lär jag mig något nytt på ert uppdrag är det ni som betalar för det. Ingen av oss vill ha det så.',
          'Det ni vill ha är ett resultat. Mejlen ska vara sorterade, rapporten ska bli klar av sig själv och ordern ska gå igenom utan att någon kopierar siffror mellan två system. Det är det resultatet priset ska handla om.',
        ],
      },
      {
        heading: 'Vad agenterna ändrade',
        paragraphs: [
          'Idag kör jag flera AI-agenter samtidigt. En skriver kod, en testar och en granskar. Mitt jobb är att välja vad som ska byggas, sätta gränserna och kontrollera resultatet innan det når er.',
          'Ett jobb som tog 40 timmar kan nu ta 4. Med timpris skulle ni få hela den vinsten, och det låter bra. Men då har ingen skäl att lägga tid på verktygen, testerna och vanorna som gör farten möjlig. Värdebaserat pris delar vinsten: ni får en lösning som är värd mer än den kostar, och jag får betalt för att bli bättre.',
        ],
      },
      {
        heading: 'Som en fotbollsspelare eller en låtskrivare',
        paragraphs: [
          'En klubb betalar inte sin bästa anfallare per träningstimme. Den betalar för målen och för vad målen betyder: vunna matcher, sålda biljetter, en plats i nästa serie.',
          'En låtskrivare kan skriva en låt på en eftermiddag. Låten kan spelas i trettio år. Ingen frågar hur många timmar den tog, för det som räknas är vad den gör för dem som lyssnar.',
          'Mjukvara byggd med agenter fungerar på samma sätt. Över tio års erfarenhet av vad som ska byggas, och vad som ska lämnas bort, syns som några dagars arbete. Ni betalar för åren, inte för dagarna.',
          'Liknelsen har en gräns. Priset följer värdet, så ett litet problem får ett litet pris. Ni ska aldrig betala stjärnpris för något som sparar en timme i månaden.',
        ],
      },
      {
        heading: 'Så räknar vi',
        paragraphs: [
          'Vi börjar med era egna siffror. Säg att en person lägger två timmar om dagen på att sortera och besvara mejl. Det blir ungefär 440 timmar om året. Kostar en timme er 600 kr med lön och avgifter är flödet värt 264 000 kr om året.',
          'Priset hamnar klart under det värdet, så att lösningen har betalat sig inom det första året. Allt efter det är er vinst.',
        ],
        list: [
          'Tid som går fri för annat arbete.',
          'Snabbare svar som ger fler affärer.',
          'Färre fel och mindre dubbelarbete.',
          'Saker ni inte kunde göra alls förut.',
        ],
      },
      {
        heading: 'Vad ni får',
        paragraphs: [
          'Ni får ett fast pris innan vi börjar. Tar jobbet längre tid än jag räknat med står priset kvar. Efter varje steg ser ni resultatet och bestämmer om vi går vidare.',
          'AI-tjänsterna kostar också pengar att köra. Den kostnaden mäter jag under testet, så att ni vet den innan lösningen tar över.',
        ],
      },
      {
        heading: 'När modellen inte passar',
        paragraphs: [
          'Ibland går värdet inte att räkna ut i förväg, för att ingen vet var tiden går. Då börjar vi med en AI-kartläggning till fast pris. Den ger siffrorna vi behöver.',
          'Vill ni ha en tech lead i teamet under lång tid sätter vi ett månadspris utifrån vad teamet ska leverera. Timmarna räknar jag fortfarande inte.',
        ],
      },
    ],
    faq: [
      {
        q: 'Blir värdebaserat pris dyrare än timpris?',
        a: 'Inte för små problem. Priset följer värdet, och ni ser det innan vi börjar. Är det för högt säger ni nej och har inte betalat något.',
      },
      {
        q: 'Hur vet vi vad lösningen är värd?',
        a: 'Vi räknar tillsammans med era siffror: tid, lönekostnad och volymer. Har ni inte siffrorna tar AI-kartläggningen fram dem.',
      },
      {
        q: 'Vad händer om jobbet tar längre tid än planerat?',
        a: 'Då är det min sak. Priset står fast.',
      },
    ],
    relatedServices: ['assessment', 'development'],
    relatedGuides: ['ai-agents', 'ai-automation'],
  },
  en: {
    id: 'value-pricing',
    seo: {
      title: 'Value-based pricing for AI development | Anton Wester',
      description:
        'Why I charge for what an AI solution does for you and not by the hour. How we work out the value, how the price is set and when the model doesn’t fit.',
    },
    h1: 'Value-based pricing: why I don’t sell hours',
    promise: 'You pay for what the solution does for you. How long I sit at the computer is my business.',
    intro:
      'An hourly rate made sense when a developer wrote every line by hand. With AI agents I build in days what used to take a team months. The hours tell you almost nothing about what you get.',
    published: '2026-11-25',
    readingMinutes: 5,
    sections: [
      {
        heading: 'Hours measure the wrong thing',
        paragraphs: [
          'An hourly rate rewards being slow. If I get faster I earn less, and if I learn something new on your project, you pay for it. Neither of us wants that.',
          'What you want is a result. The email gets sorted, the report writes itself and the order goes through without anyone copying numbers between two systems. That result is what the price should be about.',
        ],
      },
      {
        heading: 'What the agents changed',
        paragraphs: [
          'Today I run several AI agents at once. One writes code, one tests and one reviews. My job is to choose what to build, set the limits and check the result before it reaches you.',
          'A job that took 40 hours can now take 4. With an hourly rate you’d get all of that gain, and that sounds good. But then nobody has a reason to spend time on the tools, tests and habits that make the speed possible. Value-based pricing shares the gain: you get a solution worth more than it costs, and I get paid for getting better.',
        ],
      },
      {
        heading: 'Like a footballer or a songwriter',
        paragraphs: [
          'A club doesn’t pay its best striker per hour of training. It pays for the goals and what they mean: games won, tickets sold, a place in the next league.',
          'A songwriter can write a song in an afternoon. The song can play for thirty years. Nobody asks how many hours it took, because what counts is what it does for the people listening.',
          'Software built with agents works the same way. More than ten years of knowing what to build, and what to leave out, show up as a few days of work. You pay for the years, not for the days.',
          'The comparison has a limit. The price follows the value, so a small problem gets a small price. You should never pay a star’s fee for something that saves an hour a month.',
        ],
      },
      {
        heading: 'How we work it out',
        paragraphs: [
          'We start with your own numbers. Say a person spends two hours a day sorting and answering email. That’s about 440 hours a year. If an hour costs you SEK 600 with salary and fees, the flow is worth SEK 264,000 a year.',
          'The price lands well below that value, so the solution has paid for itself within the first year. Everything after that is your gain.',
        ],
        list: [
          'Time freed up for other work.',
          'Faster replies that win more business.',
          'Fewer errors and less double work.',
          'Things you couldn’t do at all before.',
        ],
      },
      {
        heading: 'What you get',
        paragraphs: [
          'You get a fixed price before we start. If the work takes longer than I planned, the price stays. After each step you see the result and decide whether we go on.',
          'AI services also cost money to run. I measure that cost during the test, so you know it before the solution takes over.',
        ],
      },
      {
        heading: 'When the model doesn’t fit',
        paragraphs: [
          'Sometimes the value can’t be worked out up front, because nobody knows where the time goes. Then we start with an AI assessment at a fixed price. It gives us the numbers we need.',
          'If you want a tech lead in the team for a long time, we set a monthly price based on what the team will deliver. I still don’t count the hours.',
        ],
      },
    ],
    faq: [
      {
        q: 'Is value-based pricing more expensive than an hourly rate?',
        a: 'Not for small problems. The price follows the value, and you see it before we start. If it’s too high you say no and haven’t paid anything.',
      },
      {
        q: 'How do we know what the solution is worth?',
        a: 'We work it out together with your numbers: time, salary cost and volumes. If you don’t have the numbers, the AI assessment finds them.',
      },
      {
        q: 'What happens if the work takes longer than planned?',
        a: 'That’s on me. The price stays.',
      },
    ],
    relatedServices: ['assessment', 'development'],
    relatedGuides: ['ai-agents', 'ai-automation'],
  },
};
