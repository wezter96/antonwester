import type { GuideContent, L10n } from '../types';

export const localAi: L10n<GuideContent> = {
  sv: {
    id: 'local-ai',
    seo: {
      title: 'Ska företaget köra AI på egen server? | Anton Wester',
      description:
        'När ska företaget köra AI på egen server? Hårdvara, modeller, kostnad, kvalitet och hybrid drift. En praktisk genomgång av Anton Wester.',
    },
    h1: 'Ska företaget köra AI på egen server?',
    promise: 'Lokal AI är ett driftbeslut, inte ett ideologiskt.',
    intro:
      'Kör AI på egen server när data inte får lämna huset, när arbetet måste fungera utan internet eller när volymen är så hög och jämn att ett API blir dyrt. Annars är en extern modell oftast billigare och bättre. Ofta blir det en blandning: känsliga delar lokalt, resten via ett API.',
    published: '2026-11-12',
    updated: '2026-11-28',
    readingMinutes: 9,
    sections: [
      {
        heading: 'När lokal AI är rätt',
        paragraphs: [
          'Lokal AI betyder att modellen körs på hårdvara ni kontrollerar. Det är rätt när data inte får lämna byggnaden, när nätverket inte är pålitligt eller när volymen är så stor att ett API blir dyrt.',
          'Det är inte automatiskt billigare. En server kostar pengar, någon ska driva den och modellerna blir snabbt äldre. Räkna på tre år, inte på tre månader.',
        ],
        list: [
          'Känsliga personuppgifter eller affärshemligheter som inte får skickas ut.',
          'Arbete som måste fungera utan internet.',
          'Hög och jämn volym där API-kostnaden blir stor.',
          'Krav på att kunna byta modell utan att byta leverantör.',
        ],
      },
      {
        heading: 'Hårdvaran sätter taket',
        paragraphs: [
          'Det som avgör vilka modeller ni kan köra är minne och bandbredd, inte bara grafikprocessorn. En modell som inte får plats måste kvantiseras eller delas upp, och då ändras kvaliteten.',
          'För en första installation brukar en maskin med 64–128 GB delat minne räcka för mindre modeller och embeddings. Ska ni köra stora modeller med lång kontext behöver ni mer. Mät på den egna datan innan ni köper.',
        ],
      },
      {
        heading: 'Välj modell efter uppgift',
        paragraphs: [
          'En stor modell är inte alltid bäst. För klassificering, extrahering och korta svar kan en mindre modell göra jobbet snabbare och billigare. För resonemang och långa dokument behöver ni ofta mer kapacitet.',
          'Tänk på hela stacken: språkmodell, embeddings för sökning och en omrangordnare. En bra embeddingmodell kan göra mer för svarskvaliteten än att byta till en större språkmodell.',
        ],
      },
      {
        heading: 'Hybrid är ofta det pragmatiska valet',
        paragraphs: [
          'Ni behöver inte välja allt eller inget. En vanlig lösning är att köra känsliga delar lokalt och skicka svårare frågor till en extern modell, men bara efter att känsliga fält maskerats.',
          'Routing kan styras av dokumentets känslighet, uppgiftens typ eller en enkel kvalitetsgräns. Det viktiga är att regeln är synlig och att ingen råkar skicka fel data till fel plats.',
        ],
      },
      {
        heading: 'Drift och uppdateringar',
        paragraphs: [
          'En lokal modell är en tjänst som alla andra. Den behöver övervakning, loggning, reservdelar och en plan för vad som händer när disken går sönder. Den behöver också uppdateras när en bättre modell kommer.',
          'Sätt en fallback till en extern modell om den lokala går ner, och testa att fallbacken fungerar. Annars upptäcker ni det först när någon står utan svar.',
        ],
      },
      {
        heading: 'Bygg så att modellen går att byta',
        paragraphs: [
          'Det viktigaste beslutet är inte vilken modell ni börjar med. Det är att koden inte ska bero på den. Lägg anropen till modellen bakom ett eget gränssnitt och använd ett format som flera modeller förstår. Många servrar för öppna modeller svarar i samma format som OpenAI:s API, och det gör bytet mycket enklare.',
          'Chatten på den här webbplatsen är byggd så. Den pratar med tre leverantörer genom samma OpenAI-kompatibla anrop och går vidare till nästa om en inte svarar. Att lägga till en lokal modell i kedjan är samma sak: en adress, ett modellnamn och en nyckel till.',
          'Har ni testfallen sparade går det sedan att jämföra en ny modell med den gamla på er egen data innan ni byter.',
        ],
      },
      {
        heading: 'Räkna på helheten',
        paragraphs: [
          'Jämför inte bara priset per token. Ta med hårdvara, el, plats, backup, uppdateringar och tiden för någon som håller det igång. Jämför med API-kostnaden för samma volym och samma kvalitetskrav.',
          'Om volymen är låg och kraven måttliga vinner ofta API:t. Om datan inte får lämna huset vinner det lokala även när det kostar mer, men då ska ni veta att ni betalar för kontroll.',
        ],
      },
      {
        heading: 'Vad det kostar att komma igång',
        paragraphs: [
          'Servern ingår inte i mitt pris. Den köper eller hyr ni, så att den är er. Själva bygget ingår i AI-utveckling, från 60 000 kr utan moms, och driften av en lokal modell ingår i drift och förvaltning, från 5 000 kr i månaden. Där ingår övervakning, uppdateringar och tester innan en ny modell ersätter den gamla.',
          'Jag kör själv öppna modeller på egen hårdvara varje dag. Innan ni köper något kör jag gärna era testfall på en lokal modell och på en extern, så att ni ser skillnaden i kvalitet och svarstid på er egen data. Då fattar ni beslutet på riktiga siffror.',
        ],
      },
    ],
    faq: [
      {
        q: 'Kan vi köra AI helt utan internet?',
        a: 'Ja, med en lokal modell på egen hårdvara. Då ansvarar ni också för uppdateringar, säkerhet och drift.',
      },
      {
        q: 'Blir det billigare än ChatGPT?',
        a: 'Ibland, vid hög och jämn volym. Vid låg volym är API oftast billigare när hårdvara och drift räknas in.',
      },
      {
        q: 'Hur känslig data kan vi skicka till en extern modell?',
        a: 'Det beror på avtal, data och ändamål. Ofta kan känsliga fält maskeras och bara nödvändig kontext skickas. Det ska dokumenteras innan lösningen tas i bruk.',
      },
    ],
    relatedServices: ['operations', 'development'],
    relatedGuides: ['rag', 'ai-evaluation'],
  },
  en: {
    id: 'local-ai',
    seo: {
      title: 'Should your company run AI on its own server? | Anton Wester',
      description:
        'When should a company run AI on its own server? Hardware, models, cost, quality and hybrid operations. A practical guide by Anton Wester.',
    },
    h1: 'Should your company run AI on its own server?',
    promise: 'Local AI is an operations decision, not an ideology.',
    intro:
      'Run AI on your own server when data may not leave the building, when the work has to function without internet, or when the volume is so high and steady that an API gets expensive. Otherwise an external model is usually cheaper and better. Often it ends up a mix: sensitive parts local, the rest through an API.',
    published: '2026-11-12',
    updated: '2026-11-28',
    readingMinutes: 9,
    sections: [
      {
        heading: 'When local AI is right',
        paragraphs: [
          'Local AI means the model runs on hardware you control. It is right when data may not leave the building, when the network is unreliable or when volume is so high that an API becomes expensive.',
          'It is not automatically cheaper. A server costs money, someone has to run it and models age quickly. Do the maths over three years, not three months.',
        ],
        list: [
          'Sensitive personal data or trade secrets that may not be sent out.',
          'Work that must function without the internet.',
          'High, steady volume where API cost becomes significant.',
          'A requirement to change model without changing vendor.',
        ],
      },
      {
        heading: 'Hardware sets the ceiling',
        paragraphs: [
          'Memory and bandwidth decide which models you can run, not just the graphics processor. A model that does not fit must be quantised or split, and that changes quality.',
          'For a first installation, a machine with 64–128 GB of shared memory is often enough for smaller models and embeddings. Large models with long context need more. Measure on your own data before buying.',
        ],
      },
      {
        heading: 'Choose the model for the task',
        paragraphs: [
          'A large model is not always best. For classification, extraction and short answers, a smaller model can do the job faster and cheaper. For reasoning and long documents you often need more capacity.',
          'Think about the whole stack: language model, embeddings for search and a reranker. A good embedding model can do more for answer quality than switching to a larger language model.',
        ],
      },
      {
        heading: 'Hybrid is often the pragmatic choice',
        paragraphs: [
          'You do not have to choose all or nothing. A common setup runs sensitive parts locally and sends harder questions to an external model, but only after sensitive fields are masked.',
          'Routing can be based on document sensitivity, task type or a simple quality threshold. What matters is that the rule is visible and that nobody accidentally sends the wrong data to the wrong place.',
        ],
      },
      {
        heading: 'Operations and updates',
        paragraphs: [
          'A local model is a service like any other. It needs monitoring, logging, spare parts and a plan for what happens when a disk fails. It also needs updating when a better model arrives.',
          'Set a fallback to an external model if the local one goes down, and test that the fallback works. Otherwise you find out when someone is left without an answer.',
        ],
      },
      {
        heading: 'Build so the model can be swapped',
        paragraphs: [
          'The most important decision isn’t which model you start with. It’s that the code doesn’t depend on it. Put the calls to the model behind an interface of your own and use a format several models understand. Many servers for open models answer in the same format as OpenAI’s API, which makes switching much easier.',
          'The chat on this site is built that way. It talks to three providers through the same OpenAI-compatible call and moves on to the next if one doesn’t answer. Adding a local model to the chain is the same thing: one more address, model name and key.',
          'With your test cases saved, you can then compare a new model with the old one on your own data before you switch.',
        ],
      },
      {
        heading: 'Do the full maths',
        paragraphs: [
          'Do not compare only price per token. Include hardware, electricity, space, backup, updates and the time of someone keeping it running. Compare with API cost for the same volume and the same quality requirement.',
          'If volume is low and requirements are moderate, the API usually wins. If data may not leave the building, local wins even when it costs more, but then you should know you are paying for control.',
        ],
      },
      {
        heading: 'What it costs to get started',
        paragraphs: [
          'The server isn’t included in my price. You buy or rent it, so it’s yours. The build itself is part of AI development, from SEK 60,000 excluding VAT, and running a local model is part of hosting and maintenance, from SEK 5,000 a month. That covers monitoring, updates and tests before a new model replaces the old one.',
          'I run open models on my own hardware every day. Before you buy anything, I’m happy to run your test cases on a local model and an external one, so you see the difference in quality and response time on your own data. Then you make the decision on real numbers.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can we run AI completely without the internet?',
        a: 'Yes, with a local model on your own hardware. You are then also responsible for updates, security and operations.',
      },
      {
        q: 'Is it cheaper than ChatGPT?',
        a: 'Sometimes, at high and steady volume. At low volume an API is usually cheaper once hardware and operations are included.',
      },
      {
        q: 'How sensitive data can we send to an external model?',
        a: 'It depends on the contract, the data and the purpose. Sensitive fields can often be masked and only necessary context sent. That should be documented before the solution goes live.',
      },
    ],
    relatedServices: ['operations', 'development'],
    relatedGuides: ['rag', 'ai-evaluation'],
  },
};
