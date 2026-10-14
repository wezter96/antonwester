import type { CityId, Locale } from './routes';
import type { CityContent, L10n } from './types';

interface CityDef {
  name: L10n<string>;
  region: L10n<string>;
  nearby: L10n<string[]>;
  deliveryMode: L10n<string>;
  focus: L10n<string>;
  description: L10n<string>;
  /** Two paragraphs about the local business landscape and how I work there. */
  local: L10n<string[]>;
  /** Three concrete things AI does for the local industries. */
  uses: L10n<string[]>;
  /** The answer to 'which AI projects suit companies here'. */
  fit: L10n<string>;
  neighbours: [CityId, CityId];
}

const defs: Record<CityId, CityDef> = {
  stenungsund: {
    name: { sv: 'Stenungsund', en: 'Stenungsund' },
    region: { sv: 'Göteborgsregionen och Bohuslänskusten', en: 'the wider Gothenburg and Bohuslän corridor' },
    nearby: { sv: ['Tjörn', 'Orust', 'Kungälv', 'Göteborg'], en: ['Tjörn', 'Orust', 'Kungälv', 'Gothenburg'] },
    deliveryMode: {
      sv: 'på plats i Stenungsund, längs västkusten och på distans när teamet föredrar det',
      en: 'on site in Stenungsund, along the west coast, and remotely when the team prefers it',
    },
    focus: {
      sv: 'Stenungsund har ett av Sveriges största kemikluster, och där finns mycket arbete som handlar om dokumentation, rapportering och uppföljning. Där kan AI ta över rutinsteg medan kontrollen stannar hos människor.',
      en: 'Stenungsund is home to one of Sweden’s largest chemical clusters, with a lot of work in documentation, reporting and follow-up. That is where AI can take over routine steps while people keep control.',
    },
    description: {
      sv: 'AI-konsult i Stenungsund som hjälper företag i processindustrin och kemiklustret att automatisera dokumentation, rapportering och uppföljning med AI.',
      en: 'AI consultant in Stenungsund helping companies in the process industry and chemical cluster automate documentation, reporting and follow-up with AI.',
    },
    local: {
      sv: ["Kemiföretagen runt Stenungsund och deras underleverantörer lever med höga krav på spårbarhet. Driftloggar, skiftrapporter, avvikelser och miljörapporter skrivs och läses varje dag, ofta i flera system som inte pratar med varandra.", "Här börjar jag med att följa ett flöde från början till slut, till exempel hur en avvikelse blir en rapport. Sedan bygger jag det som tar bort det manuella mellanarbetet, och människor godkänner det som ska godkännas."],
      en: ["The chemical companies around Stenungsund and their suppliers live with strict traceability requirements. Operating logs, shift reports, deviations and environmental reports are written and read every day, often across systems that do not talk to each other.", "Here I start by following one flow from start to finish, for example how a deviation becomes a report. Then I build what removes the manual work in between, and people approve what needs approving."],
    },
    uses: {
      sv: ["Skiftrapporter och driftloggar som sammanfattas till en överlämning som nästa skift faktiskt läser.", "Utkast till avvikelse- och miljörapporter, skrivna från data som redan finns.", "Frågor till interna instruktioner och rutiner, med källa på varje svar."],
      en: ["Shift reports and operating logs summarised into a handover the next shift actually reads.", "Drafts of deviation and environmental reports, written from data that already exists.", "Questions answered from internal instructions and procedures, with a source on every answer."],
    },
    fit: {
      sv: "Ofta dokumentation och rapportering: skiftöverlämningar, avvikelser och sökning i instruktioner. Det är regelstyrt arbete med mycket text och höga krav på spårbarhet, och det passar AI med mänskligt godkännande.",
      en: "Often documentation and reporting: shift handovers, deviations and searching instructions. It is rule-bound, text-heavy work with high traceability demands, and it suits AI with human approval.",
    },
    neighbours: ['kungalv', 'ale'],
  },
  ale: {
    name: { sv: 'Ale', en: 'Ale' },
    region: { sv: 'Göteborgs pendlingsområde', en: 'the Gothenburg commuter belt' },
    nearby: { sv: ['Nödinge', 'Bohus', 'Kungälv', 'Göteborg'], en: ['Nödinge', 'Bohus', 'Kungälv', 'Gothenburg'] },
    deliveryMode: {
      sv: 'hybrid i Ale och Göteborg, med samarbete på distans som en naturlig del från start',
      en: 'hybrid in Ale and Gothenburg, with remote collaboration built in from day one',
    },
    focus: {
      sv: 'Längs E45 genom Ale finns många företag inom logistik och lager, där ordrar, leveranser och avvikelser hanteras för hand varje dag. Det är arbete som AI-agenter och bättre integrationer kan ta över.',
      en: 'Along the E45 through Ale there are many logistics and warehousing companies where orders, deliveries and exceptions are handled by hand every day. That work suits AI agents and better integrations.',
    },
    description: {
      sv: 'AI-konsult i Ale som hjälper logistik- och lagerföretag längs E45 att låta AI hantera ordrar, leveransbesked och avvikelser som i dag görs för hand.',
      en: 'AI consultant in Ale helping logistics and warehousing companies along the E45 let AI handle orders, delivery notices and exceptions done by hand.',
    },
    local: {
      sv: ["Ale ligger längs E45 och Norge/Vänerbanan, och i Nödinge, Älvängen och Surte finns flera företag inom logistik, lager och industri. Ordrar, fraktsedlar och leveransbesked kommer in via mejl, portaler och telefon, och någon för över dem för hand.", "Jag kopplar ihop det som redan finns: affärssystemet, transportörernas tjänster och inkorgen. Målet är att en order bara skrivs in en gång, och att en avvikelse hamnar hos rätt person direkt."],
      en: ["Ale lies along the E45 and the Norway/Vänern railway, and Nödinge, Älvängen and Surte have several logistics, warehousing and industrial companies. Orders, waybills and delivery notices arrive by email, portals and phone, and someone keys them in by hand.", "I connect what is already there: the business system, the carriers’ services and the inbox. The goal is that an order is entered once, and that an exception reaches the right person straight away."],
    },
    uses: {
      sv: ["Ordrar och fraktsedlar som läses ur mejl och PDF:er och läggs in i affärssystemet.", "Leveransbesked som går ut till kunden när statusen ändras, utan att någon behöver ringa.", "Avvikelser som sorteras med ett förslag på åtgärd, så att den som ska agera har allt på ett ställe."],
      en: ["Orders and waybills read from emails and PDFs and entered into the business system.", "Delivery notices sent to the customer when the status changes, without anyone having to call.", "Exceptions sorted with a suggested action, so whoever acts has everything in one place."],
    },
    fit: {
      sv: "Ofta orderflöden och avvikelser: allt som kommer in i fel format och måste skrivas om för hand. En AI-agent kan läsa, tolka och föra över, medan människor tar de fall som är oklara.",
      en: "Often order flows and exceptions: everything that arrives in the wrong format and has to be retyped. An AI agent can read, interpret and transfer it, while people handle the unclear cases.",
    },
    neighbours: ['kungalv', 'partille'],
  },
  kungalv: {
    name: { sv: 'Kungälv', en: 'Kungälv' },
    region: { sv: 'norra Göteborgsregionen', en: 'the northern Gothenburg region' },
    nearby: { sv: ['Ytterby', 'Ale', 'Stenungsund', 'Göteborg'], en: ['Ytterby', 'Ale', 'Stenungsund', 'Gothenburg'] },
    deliveryMode: {
      sv: 'på plats i Kungälv vid behov och i övrigt hybrid över hela Göteborgsområdet',
      en: 'on site in Kungälv when needed and otherwise hybrid across the greater Gothenburg area',
    },
    focus: {
      sv: 'I Kungälv finns växande produktbolag och tjänsteföretag som vill använda AI i sina produkter och i det dagliga arbetet, men som saknar någon som både kan bedöma vad som är värt att göra och bygga det.',
      en: 'Kungälv has growing product companies and service businesses that want to use AI in their products and daily work, but lack someone who can both judge what is worth doing and build it.',
    },
    description: {
      sv: 'AI-konsult i Kungälv för växande produktbolag och tjänsteföretag som vill använda AI i produkten och i vardagen, med någon som både bedömer och bygger.',
      en: 'AI consultant in Kungälv for growing product and service companies that want AI in the product and the daily work, with someone who judges and builds.',
    },
    local: {
      sv: ["Kungälv ligger strax norr om Göteborg, och här finns allt från konsultbolag och byråer till produktbolag med egna appar och tjänster. Många har idéer om AI i produkten, men ingen i teamet som har byggt det förut.", "Där brukar jag gå in som den som både bedömer och bygger: vilka AI-funktioner som är värda att lägga i produkten, hur de ska fungera säkert och hur ert team tar över dem efteråt."],
      en: ["Kungälv sits just north of Gothenburg, with everything from consultancies and agencies to product companies with their own apps and services. Many have ideas for AI in the product, but nobody on the team who has built it before.", "That is where I come in as the one who both judges and builds: which AI features are worth adding to the product, how they work safely, and how your team takes them over afterwards."],
    },
    uses: {
      sv: ["AI-funktioner i en befintlig app eller tjänst, till exempel sök, sammanfattningar eller en assistent.", "Intern administration som sköts automatiskt, som offerter, tidrapporter och fakturaunderlag.", "En granskning av en idé eller prototyp innan ni lägger budget på den."],
      en: ["AI features in an existing app or service, such as search, summaries or an assistant.", "Internal admin that runs itself, such as quotes, time reports and invoice data.", "A review of an idea or prototype before you put budget behind it."],
    },
    fit: {
      sv: "Ofta AI-funktioner i den egna produkten och automation av det dagliga arbetet. Kartläggningen visar vad som ger kunderna mest, och vad som bara är en fin demo.",
      en: "Often AI features in your own product and automation of daily work. The assessment shows what gives customers the most, and what is only a nice demo.",
    },
    neighbours: ['ale', 'stenungsund'],
  },
  partille: {
    name: { sv: 'Partille', en: 'Partille' },
    region: { sv: 'östra Göteborg och närliggande kommuner', en: 'eastern Gothenburg and nearby municipalities' },
    nearby: { sv: ['Öjersjö', 'Lerum', 'Mölndal', 'Göteborg'], en: ['Öjersjö', 'Lerum', 'Mölndal', 'Gothenburg'] },
    deliveryMode: {
      sv: 'hybrid i Partille och Göteborg, med stöd på distans för distribuerade team',
      en: 'hybrid in Partille and Gothenburg, with remote support for distributed teams',
    },
    focus: {
      sv: 'Partille och östra Göteborg har många tjänsteföretag där kundkontakt, bokningar och administration tar mycket tid. Där gör AI ofta störst skillnad, i kundtjänsten och i administrationen.',
      en: 'Partille and eastern Gothenburg have many service businesses where customer contact, bookings and admin take a lot of time. That is often where AI makes the biggest difference.',
    },
    description: {
      sv: 'AI-konsult i Partille som hjälper tjänsteföretag öster om Göteborg att låta AI ta över kundtjänst, bokningar och administration som tar tid i dag.',
      en: 'AI consultant in Partille helping service businesses east of Gothenburg let AI take over customer service, bookings and admin that take time today.',
    },
    local: {
      sv: ["Partille och östra Göteborg har många tjänsteföretag: kliniker, redovisningsbyråer, mäklare och hantverkare. Gemensamt är att samma frågor kommer in om och om igen, och att bokningar och administration tar tid från kärnverksamheten.", "Här gör AI ofta skillnad snabbast i kundtjänsten. En assistent som svarar på vanliga frågor, bokar och lämnar över till en människa när det behövs avlastar teamet utan att kunderna får sämre service."],
      en: ["Partille and eastern Gothenburg have many service businesses: clinics, accounting firms, estate agents and tradespeople. What they share is that the same questions come in again and again, and that bookings and admin take time from the core work.", "This is where AI often makes a difference fastest, in customer service. An assistant that answers common questions, books and hands over to a person when needed takes load off the team without worse service for customers."],
    },
    uses: {
      sv: ["En kundassistent på webben och i mejlen som svarar på vanliga frågor med era egna svar.", "Bokningar och ombokningar som sköts automatiskt mot er kalender.", "Underlag till fakturering och bokföring som sammanställs utan handpåläggning."],
      en: ["A customer assistant on the website and in email that answers common questions with your own answers.", "Bookings and rebookings handled automatically against your calendar.", "Billing and bookkeeping data compiled without manual work."],
    },
    fit: {
      sv: "Ofta kundtjänst, bokningar och administration. Det är arbete som upprepas varje dag och där svaren redan finns, så AI kan ta de vanliga fallen och lämna resten till er.",
      en: "Often customer service, bookings and admin. It is work that repeats every day and where the answers already exist, so AI can take the common cases and leave the rest to you.",
    },
    neighbours: ['ale', 'kungsbacka'],
  },
  trollhattan: {
    name: { sv: 'Trollhättan', en: 'Trollhättan' },
    region: { sv: 'norra Västra Götaland', en: 'the northern Västra Götaland region' },
    nearby: { sv: ['Vänersborg', 'Uddevalla', 'Kungälv', 'Göteborg'], en: ['Vänersborg', 'Uddevalla', 'Kungälv', 'Gothenburg'] },
    deliveryMode: {
      sv: 'på plats i Trollhättan vid behov och hybrid över Västra Götaland',
      en: 'on site in Trollhättan when needed and hybrid across Västra Götaland',
    },
    focus: {
      sv: 'Trollhättan har en lång historia inom fordon och tillverkning. Där finns mycket teknisk dokumentation, kvalitetsuppföljning och rapportering som AI kan göra snabbare och säkrare.',
      en: 'Trollhättan has a long history in automotive and manufacturing, with plenty of technical documentation, quality follow-up and reporting that AI can make faster and more reliable.',
    },
    description: {
      sv: 'AI-konsult i Trollhättan för fordons- och tillverkningsföretag som vill använda AI för teknisk dokumentation, kvalitetsuppföljning och rapportering.',
      en: 'AI consultant in Trollhättan for automotive and manufacturing companies that want AI for technical documentation, quality follow-up and reporting.',
    },
    local: {
      sv: ["Trollhättan har en lång historia inom fordon, flyg och tillverkning, och många företag i regionen arbetar fortfarande med avancerad produktion och teknisk utveckling. Där finns stora mängder ritningar, specifikationer, testprotokoll och kvalitetsrapporter.", "Jag hjälper till att göra den dokumentationen sökbar och användbar: att hitta rätt specifikation på sekunder, jämföra testresultat mot krav och skriva rapporter från data som redan finns."],
      en: ["Trollhättan has a long history in automotive, aerospace and manufacturing, and many companies in the region still work with advanced production and engineering. That means large amounts of drawings, specifications, test protocols and quality reports.", "I help make that documentation searchable and useful: finding the right specification in seconds, comparing test results against requirements and writing reports from data that already exists."],
    },
    uses: {
      sv: ["Sökning i ritningar, specifikationer och testprotokoll med vanliga frågor och källhänvisningar.", "Mätdata och testresultat som jämförs mot krav, med avvikelser flaggade.", "Utkast till kvalitetsrapporter och 8D-underlag."],
      en: ["Search across drawings, specifications and test protocols with plain questions and references.", "Measurement data and test results compared against requirements, with deviations flagged.", "Drafts of quality reports and 8D documentation."],
    },
    fit: {
      sv: "Ofta teknisk dokumentation, kvalitetsuppföljning och rapportering. Det är text- och datatungt arbete med höga krav på rätt svar, så jag bygger med källor, tester och mänsklig kontroll.",
      en: "Often technical documentation, quality follow-up and reporting. It is text- and data-heavy work where answers must be right, so I build with sources, tests and human review.",
    },
    neighbours: ['ale', 'stenungsund'],
  },
  kungsbacka: {
    name: { sv: 'Kungsbacka', en: 'Kungsbacka' },
    region: { sv: 'södra Göteborgsregionen', en: 'the southern Gothenburg region' },
    nearby: { sv: ['Varberg', 'Falkenberg', 'Mölndal', 'Göteborg'], en: ['Varberg', 'Falkenberg', 'Mölndal', 'Gothenburg'] },
    deliveryMode: {
      sv: 'hybrid i Kungsbacka och Göteborg, med möjlighet till arbete på distans',
      en: 'hybrid in Kungsbacka and Gothenburg, with remote options',
    },
    focus: {
      sv: 'I Kungsbacka finns många e-handlare och webbplattformar där produkttexter, kundfrågor och returer tar tid. Det är processer där AI snabbt kan göra nytta.',
      en: 'Kungsbacka has many online retailers and web platforms where product copy, customer questions and returns take time. Those are processes where AI quickly helps.',
    },
    description: {
      sv: 'AI-konsult i Kungsbacka som hjälper e-handlare och webbplattformar att låta AI sköta produkttexter, kundfrågor och returer, med människor som granskar.',
      en: 'AI consultant in Kungsbacka helping online retailers and web platforms let AI handle product copy, customer questions and returns, with people reviewing.',
    },
    local: {
      sv: ["Kungsbacka har många små och medelstora företag, från webbutiker till byråer och konsulter som arbetar mot hela Göteborgsregionen. Ofta är teamet litet, och samma person sköter produkter, kunder och ekonomi.", "För de bolagen handlar AI om att få tillbaka tid: produkttexter som skrivs på minuter, kundfrågor som besvaras direkt och returer som hanteras utan långa mejlväxlingar."],
      en: ["Kungsbacka has many small and mid-sized companies, from web shops to agencies and consultants working across the Gothenburg region. The team is often small, and the same person handles products, customers and finance.", "For those companies, AI is about getting time back: product copy written in minutes, customer questions answered at once and returns handled without long email threads."],
    },
    uses: {
      sv: ["Produkttexter i er ton för hela sortimentet på en gång.", "Svar på frågor om leverans, storlekar och returer direkt i chatten eller mejlen.", "Returer och reklamationer som sorteras och förbereds innan någon tittar på dem."],
      en: ["Product copy in your voice for the whole range at once.", "Answers to questions about delivery, sizes and returns right in the chat or email.", "Returns and complaints sorted and prepared before anyone looks at them."],
    },
    fit: {
      sv: "Ofta produkttexter, kundfrågor och returer. För ett litet team är det timmar varje vecka som kan gå till försäljning och utveckling i stället.",
      en: "Often product copy, customer questions and returns. For a small team that is hours every week that can go to sales and development instead.",
    },
    neighbours: ['varberg', 'partille'],
  },
  boras: {
    name: { sv: 'Borås', en: 'Borås' },
    region: { sv: 'Boråsregionen och västra Sverige', en: 'the Borås region and western Sweden' },
    nearby: { sv: ['Falkenberg', 'Varberg', 'Kungsbacka', 'Göteborg'], en: ['Falkenberg', 'Varberg', 'Kungsbacka', 'Gothenburg'] },
    deliveryMode: {
      sv: 'på plats i Borås vid behov och hybrid i västra Sverige',
      en: 'on site in Borås when needed and hybrid across western Sweden',
    },
    focus: {
      sv: 'Borås är navet för svensk textil och e-handel. Produktdata, översättningar, kundtjänst och returer är områden där AI kan spara många timmar i veckan.',
      en: 'Borås is the hub of Swedish textiles and e-commerce. Product data, translations, customer service and returns are areas where AI can save many hours a week.',
    },
    description: {
      sv: 'AI-konsult i Borås för textil- och e-handelsföretag som vill låta AI hantera produktdata, översättningar, kundtjänst och returer i stället för manuellt arbete.',
      en: 'AI consultant in Borås for textile and e-commerce companies that want AI to handle product data, translations, customer service and returns.',
    },
    local: {
      sv: ["Borås är centrum för svensk textil och har blivit en av landets viktigaste orter för e-handel och logistik. Här finns handlare med stora sortiment, flera marknader och lager som skickar till hela Norden.", "Med stora sortiment blir produktdata en flaskhals: attribut, storlekar, material och översättningar till varje marknad. Där kan AI fylla i, kontrollera och översätta, medan någon i teamet godkänner."],
      en: ["Borås is the centre of Swedish textiles and has become one of the country’s key places for e-commerce and logistics. Retailers here run large ranges, several markets and warehouses shipping across the Nordics.", "With large ranges, product data becomes a bottleneck: attributes, sizes, materials and translations for every market. AI can fill in, check and translate it, while someone on the team approves."],
    },
    uses: {
      sv: ["Produktdata som berikas och kontrolleras i stora sortiment, med attribut, material och storlekar.", "Produkttexter och kundtjänstsvar som översätts till de nordiska marknaderna i rätt ton.", "Returorsaker som sammanfattas per artikel, så att inköp och design ser vad som behöver ändras."],
      en: ["Product data enriched and checked across large ranges, with attributes, materials and sizes.", "Product copy and support replies translated for the Nordic markets in the right voice.", "Return reasons summarised per item, so buying and design see what needs to change."],
    },
    fit: {
      sv: "Ofta produktdata, översättningar, kundtjänst och returer. Med stora sortiment och flera marknader växer det manuella arbetet snabbt, och det är där AI sparar mest.",
      en: "Often product data, translations, customer service and returns. With large ranges and several markets the manual work grows fast, and that is where AI saves the most.",
    },
    neighbours: ['partille', 'kungsbacka'],
  },
  varberg: {
    name: { sv: 'Varberg', en: 'Varberg' },
    region: { sv: 'Hallandskusten nära Göteborg', en: 'the Halland coast near Gothenburg' },
    nearby: { sv: ['Falkenberg', 'Kungsbacka', 'Halmstad', 'Göteborg'], en: ['Falkenberg', 'Kungsbacka', 'Halmstad', 'Gothenburg'] },
    deliveryMode: {
      sv: 'hybrid i Varberg och längs Hallandskusten, med möjlighet till arbete på distans',
      en: 'hybrid in Varberg and along the Halland coast, with remote support',
    },
    focus: {
      sv: 'Varberg och Hallandskusten har många företag inom turism och besöksnäring, där bokningar, frågor från gäster och säsongsplanering tar mycket tid. AI kan svara snabbare och avlasta under högsäsong.',
      en: 'Varberg and the Halland coast have many tourism and hospitality businesses, where bookings, guest questions and seasonal planning take a lot of time. AI can answer faster and take load off in peak season.',
    },
    description: {
      sv: 'AI-konsult i Varberg för turism och besöksnäring längs Hallandskusten som vill låta AI hantera bokningar, gästfrågor och planering under högsäsong.',
      en: 'AI consultant in Varberg for tourism and hospitality on the Halland coast that want AI to handle bookings, guest questions and peak-season planning.',
    },
    local: {
      sv: ["Varberg och Hallandskusten lever mycket av besökare: hotell, restauranger, campingar, aktiviteter och evenemang. Trycket kommer i vågor, och under högsäsong hinner få svara på alla frågor och bokningar.", "Jag bygger det som tar toppen av belastningen: assistenter som svarar gäster dygnet runt, bokningsflöden som sköter sig själva och planering som utgår från hur säsongen brukar se ut."],
      en: ["Varberg and the Halland coast live largely on visitors: hotels, restaurants, campsites, activities and events. The pressure comes in waves, and in peak season few have time to answer every question and booking.", "I build what takes the top off the load: assistants that answer guests around the clock, booking flows that run themselves and planning based on how the season usually goes."],
    },
    uses: {
      sv: ["En gästassistent som svarar på frågor om öppettider, priser och lediga platser på flera språk.", "Bokningar, avbokningar och bekräftelser som hanteras automatiskt.", "Bemanningsplanering inför högsäsong utifrån tidigare års bokningar."],
      en: ["A guest assistant that answers questions about opening hours, prices and availability in several languages.", "Bookings, cancellations and confirmations handled automatically.", "Staffing plans for peak season based on earlier years’ bookings."],
    },
    fit: {
      sv: "Ofta bokningar, gästfrågor och säsongsplanering. Under högsäsong är det där tiden tar slut först, och där en AI-assistent avlastar mest.",
      en: "Often bookings, guest questions and seasonal planning. In peak season that is where time runs out first, and where an AI assistant takes the most load off.",
    },
    neighbours: ['kungsbacka', 'boras'],
  },
};

function build(id: CityId, l: Locale): CityContent {
  const d = defs[id];
  const name = d.name[l];
  const region = d.region[l];
  const sv = l === 'sv';
  return {
    id,
    name,
    region,
    nearby: d.nearby[l],
    seo: {
      title: sv ? `AI-konsult i ${name} | Anton Wester` : `AI Consultant in ${name} | Anton Wester`,
      description: d.description[l],
    },
    h1: sv ? `AI-konsult i ${name}` : `AI consultant in ${name}`,
    focus: d.focus[l],
    paragraphs: d.local[l],
    useCases: d.uses[l],
    deliveryMode: d.deliveryMode[l],
    neighbours: d.neighbours,
    faq: sv
      ? [
          { q: `Tar du uppdrag som AI-konsult i ${name}?`, a: `Ja. Jag arbetar med företag i ${name} och ${region}, på plats när det behövs och annars på distans. De flesta uppdrag börjar med en kartläggning av var AI lönar sig.` },
          { q: `Vilka AI-projekt passar företag i ${name}?`, a: d.fit.sv },
          { q: `Kan du jobba på plats i ${name}?`, a: `Ja. Jag jobbar ${d.deliveryMode.sv}. Kartläggningen gör jag gärna på plats, eftersom det är där arbetet syns bäst.` },
        ]
      : [
          { q: `Do you take on AI consulting work in ${name}?`, a: `Yes. I work with companies in ${name} and ${region}, on site when needed and otherwise remotely. Most engagements start with an assessment of where AI pays off.` },
          { q: `Which AI projects suit companies in ${name}?`, a: d.fit.en },
          { q: `Can you work on site in ${name}?`, a: `Yes. I work ${d.deliveryMode.en}. I like to do the assessment on site, because that is where the work is easiest to see.` },
        ],
  };
}

export const cities = Object.fromEntries(
  (Object.keys(defs) as CityId[]).map((id) => [id, { sv: build(id, 'sv'), en: build(id, 'en') }]),
) as Record<CityId, L10n<CityContent>>;

export const getCity = (id: CityId, locale: Locale): CityContent => cities[id][locale];
