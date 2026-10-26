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
      sv: 'på plats i Stenungsund och längs västkusten, eller på distans',
      en: 'on site in Stenungsund and along the west coast, or remotely',
    },
    focus: {
      sv: 'Stenungsund har ett av Sveriges största kemikluster. Där går mycket tid till rapporter och dokumentation. AI kan ta rutinstegen, och människor behåller kontrollen.',
      en: 'Stenungsund has one of Sweden’s largest chemical clusters. A lot of time goes to reports and paperwork. AI can take the routine steps, and people stay in control.',
    },
    description: {
      sv: 'AI-konsult i Stenungsund. Jag hjälper kemiföretag och deras leverantörer att låta AI sköta rapporter och dokumentation, så att tid blir över till annat.',
      en: 'AI consultant in Stenungsund. I help chemical companies and their suppliers let AI handle reports and paperwork, so time is freed for other work.',
    },
    local: {
      sv: ['Kemiföretagen runt Stenungsund måste kunna spåra allt. Skiftrapporter, avvikelser och miljörapporter skrivs varje dag, ofta i flera olika system.', 'Jag börjar med att följa ett flöde, till exempel hur en avvikelse blir en rapport. Sedan tar jag bort handarbetet. Människor godkänner det som ska godkännas.'],
      en: ['The chemical companies around Stenungsund must be able to trace everything. Shift reports, deviations and environmental reports are written every day, often in several systems.', 'I start by following one flow, such as how a deviation becomes a report. Then I remove the manual work. People approve what needs approving.'],
    },
    uses: {
      sv: ['En kort skiftöverlämning som nästa skift faktiskt läser.', 'Första utkast till avvikelse- och miljörapporter.', 'Svar ur era instruktioner och rutiner, med källa.'],
      en: ['A short shift handover the next shift actually reads.', 'First drafts of deviation and environmental reports.', 'Answers from your instructions and procedures, with the source.'],
    },
    fit: {
      sv: 'Ofta rapporter och dokumentation, som skiftöverlämningar och avvikelser. Det är mycket text och strikta regler. AI gör jobbet, och en människa godkänner.',
      en: 'Often reports and paperwork, such as shift handovers and deviations. It’s a lot of text and strict rules. AI does the work, and a person approves it.',
    },
    neighbours: ['kungalv', 'ale'],
  },
  ale: {
    name: { sv: 'Ale', en: 'Ale' },
    region: { sv: 'Göteborgs pendlingsområde', en: 'the Gothenburg commuter belt' },
    nearby: { sv: ['Nödinge', 'Bohus', 'Kungälv', 'Göteborg'], en: ['Nödinge', 'Bohus', 'Kungälv', 'Gothenburg'] },
    deliveryMode: {
      sv: 'i Ale och Göteborg, på plats eller på distans',
      en: 'in Ale and Gothenburg, on site or remotely',
    },
    focus: {
      sv: 'Längs E45 genom Ale finns många logistik- och lagerföretag. Där skrivs ordrar och leveranser in för hand varje dag. Det arbetet kan AI ta över.',
      en: 'Along the E45 through Ale there are many logistics and warehouse companies. Orders and deliveries are typed in by hand every day. AI can take over that work.',
    },
    description: {
      sv: 'AI-konsult i Ale. Jag hjälper logistik- och lagerföretag längs E45 att låta AI sköta ordrar, leveransbesked och avvikelser som i dag görs för hand.',
      en: 'AI consultant in Ale. I help logistics and warehouse companies along the E45 let AI handle orders, delivery notices and problems now done by hand.',
    },
    local: {
      sv: ['I Nödinge, Älvängen och Surte finns många företag inom logistik, lager och industri. Ordrar och fraktsedlar kommer via mejl, portaler och telefon. Sedan skriver någon in dem för hand.', 'Jag kopplar ihop det ni redan har: affärssystemet, transportörerna och inkorgen. En order ska bara skrivas in en gång, och ett problem ska nå rätt person direkt.'],
      en: ['Nödinge, Älvängen and Surte have many logistics, warehouse and industrial companies. Orders and waybills arrive by email, portals and phone. Then someone types them in by hand.', 'I connect what you already have: the business system, the carriers and the inbox. An order should be typed in only once, and a problem should reach the right person at once.'],
    },
    uses: {
      sv: ['Ordrar från mejl och PDF:er som hamnar i affärssystemet av sig själva.', 'Kunden får besked när leveransen ändras, utan att någon ringer.', 'Problem som sorteras, med ett förslag på vad ni ska göra.'],
      en: ['Orders from emails and PDFs that land in the business system on their own.', 'Customers hear when a delivery changes, without anyone calling.', 'Problems sorted, with a suggestion for what to do.'],
    },
    fit: {
      sv: 'Ofta ordrar och avvikelser: allt som måste skrivas om för hand. AI läser och för över det. Människor tar de oklara fallen.',
      en: 'Often orders and problems: everything that has to be retyped by hand. AI reads it and moves it over. People take the unclear cases.',
    },
    neighbours: ['kungalv', 'partille'],
  },
  kungalv: {
    name: { sv: 'Kungälv', en: 'Kungälv' },
    region: { sv: 'norra Göteborgsregionen', en: 'the northern Gothenburg region' },
    nearby: { sv: ['Ytterby', 'Ale', 'Stenungsund', 'Göteborg'], en: ['Ytterby', 'Ale', 'Stenungsund', 'Gothenburg'] },
    deliveryMode: {
      sv: 'på plats i Kungälv när det behövs, och annars på distans',
      en: 'on site in Kungälv when needed, and remotely otherwise',
    },
    focus: {
      sv: 'I Kungälv finns växande företag som vill använda AI i sina produkter och i vardagen. Ofta saknas någon som vet vad som är värt att göra och som kan bygga det.',
      en: 'Kungälv has growing companies that want to use AI in their products and daily work. Often nobody knows what’s worth doing, or can build it.',
    },
    description: {
      sv: 'AI-konsult i Kungälv för växande företag som vill ha AI i sin produkt och i vardagen. Jag bedömer vad som är värt att göra och bygger det.',
      en: 'AI consultant in Kungälv for growing companies that want AI in their product and daily work. I judge what’s worth doing, then build it.',
    },
    local: {
      sv: ['Kungälv ligger strax norr om Göteborg. Här finns byråer, konsultbolag och företag med egna appar. Många har idéer om AI, men ingen i teamet har byggt det förut.', 'Där hjälper jag till. Jag väljer ut de AI-funktioner som är värda att bygga, ser till att de är säkra och lär ert team att ta över dem.'],
      en: ['Kungälv lies just north of Gothenburg. It has agencies, consultancies and companies with their own apps. Many have ideas for AI, but nobody on the team has built it before.', 'That’s where I help. I pick the AI features worth building, make sure they are safe, and teach your team to take them over.'],
    },
    uses: {
      sv: ['AI i en app ni redan har, till exempel sök, sammanfattningar eller en assistent.', 'Offerter, tidrapporter och fakturaunderlag som sköter sig själva.', 'En ärlig bedömning av en idé innan ni lägger pengar på den.'],
      en: ['AI in an app you already have, such as search, summaries or an assistant.', 'Quotes, time reports and invoice data that take care of themselves.', 'An honest review of an idea before you spend money on it.'],
    },
    fit: {
      sv: 'Ofta AI i den egna produkten och mindre handarbete i vardagen. Kartläggningen visar vad som hjälper era kunder på riktigt, och vad som bara ser bra ut i en demo.',
      en: 'Often AI in your own product and less manual work day to day. The assessment shows what really helps your customers, and what only looks good in a demo.',
    },
    neighbours: ['ale', 'stenungsund'],
  },
  partille: {
    name: { sv: 'Partille', en: 'Partille' },
    region: { sv: 'östra Göteborg och närliggande kommuner', en: 'eastern Gothenburg and nearby municipalities' },
    nearby: { sv: ['Öjersjö', 'Lerum', 'Mölndal', 'Göteborg'], en: ['Öjersjö', 'Lerum', 'Mölndal', 'Gothenburg'] },
    deliveryMode: {
      sv: 'i Partille och Göteborg, på plats eller på distans',
      en: 'in Partille and Gothenburg, on site or remotely',
    },
    focus: {
      sv: 'Partille och östra Göteborg har många tjänsteföretag. Kundfrågor, bokningar och administration tar mycket tid. Där gör AI ofta störst skillnad.',
      en: 'Partille and eastern Gothenburg have many service businesses. Customer questions, bookings and admin take a lot of time. That’s often where AI helps most.',
    },
    description: {
      sv: 'AI-konsult i Partille. Jag hjälper tjänsteföretag öster om Göteborg att låta AI sköta kundfrågor, bokningar och administration som tar tid i dag.',
      en: 'AI consultant in Partille. I help service businesses east of Gothenburg let AI handle customer questions, bookings and admin that eat time today.',
    },
    local: {
      sv: ['Här finns kliniker, redovisningsbyråer, mäklare och hantverkare. Samma frågor kommer in om och om igen, och bokningar tar tid från det riktiga jobbet.', 'AI hjälper oftast snabbast i kundtjänsten. En assistent svarar på vanliga frågor, bokar tider och lämnar över till en människa när det behövs.'],
      en: ['There are clinics, accounting firms, estate agents and tradespeople here. The same questions come in again and again, and bookings take time from the real work.', 'AI often helps fastest in customer service. An assistant answers common questions, books appointments and hands over to a person when needed.'],
    },
    uses: {
      sv: ['En assistent på webben och i mejlen som svarar med era egna svar.', 'Bokningar och ombokningar direkt i er kalender.', 'Underlag till fakturor och bokföring, klart utan handarbete.'],
      en: ['An assistant on your website and in email that replies with your own answers.', 'Bookings and rebookings straight into your calendar.', 'Data for invoices and bookkeeping, ready without manual work.'],
    },
    fit: {
      sv: 'Ofta kundfrågor, bokningar och administration. Svaren finns redan, så AI kan ta de vanliga fallen och lämna resten till er.',
      en: 'Often customer questions, bookings and admin. The answers already exist, so AI can take the common cases and leave the rest to you.',
    },
    neighbours: ['ale', 'kungsbacka'],
  },
  trollhattan: {
    name: { sv: 'Trollhättan', en: 'Trollhättan' },
    region: { sv: 'norra Västra Götaland', en: 'the northern Västra Götaland region' },
    nearby: { sv: ['Vänersborg', 'Uddevalla', 'Kungälv', 'Göteborg'], en: ['Vänersborg', 'Uddevalla', 'Kungälv', 'Gothenburg'] },
    deliveryMode: {
      sv: 'på plats i Trollhättan när det behövs, och annars på distans',
      en: 'on site in Trollhättan when needed, and remotely otherwise',
    },
    focus: {
      sv: 'Trollhättan har en lång historia inom fordon och tillverkning. Det betyder mycket teknisk dokumentation och många rapporter. AI kan göra det arbetet snabbare och säkrare.',
      en: 'Trollhättan has a long history in cars and manufacturing. That means a lot of technical documents and reports. AI can make that work faster and more reliable.',
    },
    description: {
      sv: 'AI-konsult i Trollhättan för fordons- och tillverkningsföretag. AI hittar rätt i ritningar och specifikationer och skriver utkast till kvalitetsrapporter.',
      en: 'AI consultant in Trollhättan for car and manufacturing companies. AI finds the right drawing or spec in seconds and drafts quality reports.',
    },
    local: {
      sv: ['Fordon, flyg och tillverkning präglar Trollhättan. Företagen här har stora mängder ritningar, specifikationer, testprotokoll och kvalitetsrapporter.', 'Jag gör de dokumenten lätta att söka i. Ni hittar rätt specifikation på sekunder, ser direkt om ett testresultat inte når kraven och får rapporter skrivna åt er.'],
      en: ['Cars, aircraft and manufacturing shape Trollhättan. Companies here have large amounts of drawings, specifications, test protocols and quality reports.', 'I make those documents easy to search. You find the right specification in seconds, see at once if a test result misses the requirements, and get reports written for you.'],
    },
    uses: {
      sv: ['Ställ en vanlig fråga och få svar ur ritningar och testprotokoll, med källa.', 'Testresultat som jämförs med kraven, med avvikelser markerade.', 'Första utkast till kvalitetsrapporter.'],
      en: ['Ask a plain question and get answers from drawings and test protocols, with the source.', 'Test results compared with the requirements, with deviations marked.', 'First drafts of quality reports.'],
    },
    fit: {
      sv: 'Ofta teknisk dokumentation och kvalitetsrapporter. Svaren måste vara rätt, så varje svar visar sin källa och en människa granskar.',
      en: 'Often technical documents and quality reports. The answers must be right, so every answer shows its source and a person checks it.',
    },
    neighbours: ['ale', 'stenungsund'],
  },
  kungsbacka: {
    name: { sv: 'Kungsbacka', en: 'Kungsbacka' },
    region: { sv: 'södra Göteborgsregionen', en: 'the southern Gothenburg region' },
    nearby: { sv: ['Varberg', 'Falkenberg', 'Mölndal', 'Göteborg'], en: ['Varberg', 'Falkenberg', 'Mölndal', 'Gothenburg'] },
    deliveryMode: {
      sv: 'i Kungsbacka och Göteborg, på plats eller på distans',
      en: 'in Kungsbacka and Gothenburg, on site or remotely',
    },
    focus: {
      sv: 'I Kungsbacka finns många webbutiker. Produkttexter, kundfrågor och returer tar mycket tid. Där kan AI snabbt hjälpa till.',
      en: 'Kungsbacka has many online shops. Product texts, customer questions and returns take a lot of time. That’s where AI can help quickly.',
    },
    description: {
      sv: 'AI-konsult i Kungsbacka. Jag hjälper webbutiker att låta AI skriva produkttexter, svara på kundfrågor och sortera returer, med en människa som granskar.',
      en: 'AI consultant in Kungsbacka. I help online shops let AI write product texts, answer customer questions and sort returns, with a person checking the work.',
    },
    local: {
      sv: ['Kungsbacka har många små och medelstora företag, från webbutiker till byråer. Teamen är ofta små, och samma person sköter produkter, kunder och ekonomi.', 'Där handlar AI om att få tillbaka tid. Produkttexter skrivs på minuter, kundfrågor får svar direkt och returer kräver inga långa mejl.'],
      en: ['Kungsbacka has many small and mid-sized companies, from online shops to agencies. Teams are often small, and one person handles products, customers and money.', 'There, AI is about getting time back. Product texts are written in minutes, customer questions get answers at once, and returns need no long emails.'],
    },
    uses: {
      sv: ['Produkttexter i er egen ton för hela sortimentet.', 'Direkta svar om leverans, storlekar och returer i chatten eller mejlen.', 'Returer och reklamationer som sorteras innan någon tittar på dem.'],
      en: ['Product texts in your own voice for the whole range.', 'Instant answers about delivery, sizes and returns in chat or email.', 'Returns and complaints sorted before anyone looks at them.'],
    },
    fit: {
      sv: 'Ofta produkttexter, kundfrågor och returer. För ett litet team blir det timmar varje vecka som kan gå till försäljning i stället.',
      en: 'Often product texts, customer questions and returns. For a small team that frees hours every week for selling instead.',
    },
    neighbours: ['varberg', 'partille'],
  },
  boras: {
    name: { sv: 'Borås', en: 'Borås' },
    region: { sv: 'Boråsregionen och västra Sverige', en: 'the Borås region and western Sweden' },
    nearby: { sv: ['Falkenberg', 'Varberg', 'Kungsbacka', 'Göteborg'], en: ['Falkenberg', 'Varberg', 'Kungsbacka', 'Gothenburg'] },
    deliveryMode: {
      sv: 'på plats i Borås när det behövs, och annars på distans',
      en: 'on site in Borås when needed, and remotely otherwise',
    },
    focus: {
      sv: 'Borås är centrum för svensk textil och e-handel. Produktinfo, översättningar, kundtjänst och returer tar många timmar. Där kan AI spara tid varje vecka.',
      en: 'Borås is the centre of Swedish textiles and online retail. Product info, translations, customer service and returns take many hours. AI can save time there every week.',
    },
    description: {
      sv: 'AI-konsult i Borås för textil- och e-handelsföretag. AI fyller i produktinfo, översätter, svarar kunder och sorterar returer, så att teamet slipper det.',
      en: 'AI consultant in Borås for textile and online retail companies. AI fills in product info, translates, answers customers and sorts returns for your team.',
    },
    local: {
      sv: ['Borås är en av Sveriges viktigaste orter för e-handel och lager. Handlarna här har stora sortiment, säljer i flera länder och skickar till hela Norden.', 'Med så många produkter blir produktinfon en flaskhals: storlekar, material och översättningar till varje land. AI kan fylla i, kontrollera och översätta. Någon i teamet godkänner.'],
      en: ['Borås is one of Sweden’s key places for online retail and warehousing. Retailers here have large ranges, sell in several countries and ship across the Nordics.', 'With so many products, product info becomes a bottleneck: sizes, materials and translations for every country. AI can fill it in, check it and translate it. Someone on the team approves.'],
    },
    uses: {
      sv: ['Produktinfo som fylls i och kontrolleras för hela sortimentet.', 'Produkttexter och kundsvar översatta för de nordiska länderna, i rätt ton.', 'Varför kunder returnerar, sammanfattat per produkt, så att inköp och design ser vad som ska ändras.'],
      en: ['Product info filled in and checked for the whole range.', 'Product texts and customer replies translated for the Nordic countries, in the right voice.', 'Why customers return items, summed up per product, so buying and design see what to change.'],
    },
    fit: {
      sv: 'Ofta produktinfo, översättningar, kundtjänst och returer. Med många produkter och flera länder växer handarbetet snabbt. Där sparar AI mest.',
      en: 'Often product info, translations, customer service and returns. With many products and several countries the manual work grows fast. That’s where AI saves the most.',
    },
    neighbours: ['partille', 'kungsbacka'],
  },
  varberg: {
    name: { sv: 'Varberg', en: 'Varberg' },
    region: { sv: 'Hallandskusten nära Göteborg', en: 'the Halland coast near Gothenburg' },
    nearby: { sv: ['Falkenberg', 'Kungsbacka', 'Halmstad', 'Göteborg'], en: ['Falkenberg', 'Kungsbacka', 'Halmstad', 'Gothenburg'] },
    deliveryMode: {
      sv: 'i Varberg och längs Hallandskusten, på plats eller på distans',
      en: 'in Varberg and along the Halland coast, on site or remotely',
    },
    focus: {
      sv: 'Varberg och Hallandskusten har många företag inom turism. Bokningar och frågor från gäster tar mycket tid, mest under högsäsong. AI kan svara snabbare och avlasta.',
      en: 'Varberg and the Halland coast have many tourism businesses. Bookings and guest questions take a lot of time, most of all in peak season. AI can answer faster and lighten the load.',
    },
    description: {
      sv: 'AI-konsult i Varberg för hotell, campingar och andra besöksföretag längs Hallandskusten. AI svarar gäster, sköter bokningar och hjälper inför högsäsong.',
      en: 'AI consultant in Varberg for hotels, campsites and other tourist businesses on the Halland coast. AI answers guests, takes bookings and helps plan peak season.',
    },
    local: {
      sv: ['Varberg och Hallandskusten lever mycket på besökare: hotell, restauranger, campingar och evenemang. Under högsäsong hinner få svara på alla frågor och bokningar.', 'Jag bygger det som tar toppen av trycket: en assistent som svarar gäster dygnet runt, bokningar som sköter sig själva och planering utifrån hur säsongen brukar bli.'],
      en: ['Varberg and the Halland coast live largely on visitors: hotels, restaurants, campsites and events. In peak season few have time to answer every question and booking.', 'I build what eases the peak-season load: an assistant that answers guests around the clock, bookings that run themselves, and planning based on how the season usually goes.'],
    },
    uses: {
      sv: ['En assistent som svarar gäster om öppettider, priser och lediga platser, på flera språk.', 'Bokningar, avbokningar och bekräftelser som sköts automatiskt.', 'Bemanning inför högsäsong, planerad utifrån tidigare års bokningar.'],
      en: ['An assistant that answers guests about opening hours, prices and free places, in several languages.', 'Bookings, cancellations and confirmations handled automatically.', 'Staffing for peak season, planned from earlier years’ bookings.'],
    },
    fit: {
      sv: 'Ofta bokningar, gästfrågor och planering. Under högsäsong tar tiden slut först där, och där hjälper en AI-assistent mest.',
      en: 'Often bookings, guest questions and planning. In peak season that’s where time runs out first, and where an AI assistant helps most.',
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
          { q: `Tar du uppdrag som AI-konsult i ${name}?`, a: `Ja. Jag jobbar med företag i ${name} och ${region}, på plats eller på distans. Vi börjar oftast med att ta reda på var AI sparar mest tid.` },
          { q: `Vilka AI-projekt passar företag i ${name}?`, a: d.fit.sv },
          { q: `Kan du jobba på plats i ${name}?`, a: `Ja. Jag jobbar ${d.deliveryMode.sv}. Kartläggningen gör jag gärna på plats, för där syns arbetet bäst.` },
        ]
      : [
          { q: `Do you take on AI consulting work in ${name}?`, a: `Yes. I work with companies in ${name} and ${region}, on site or remotely. We usually start by finding where AI saves the most time.` },
          { q: `Which AI projects suit companies in ${name}?`, a: d.fit.en },
          { q: `Can you work on site in ${name}?`, a: `Yes. I work ${d.deliveryMode.en}. I like to do the assessment on site, because that’s where the work is easiest to see.` },
        ],
  };
}

export const cities = Object.fromEntries(
  (Object.keys(defs) as CityId[]).map((id) => [id, { sv: build(id, 'sv'), en: build(id, 'en') }]),
) as Record<CityId, L10n<CityContent>>;

export const getCity = (id: CityId, locale: Locale): CityContent => cities[id][locale];
