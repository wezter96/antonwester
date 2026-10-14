import type { CityId, Locale } from './routes';
import type { CityContent, L10n } from './types';

interface CityDef {
  name: L10n<string>;
  region: L10n<string>;
  nearby: L10n<string[]>;
  deliveryMode: L10n<string>;
  focus: L10n<string>;
  angle: L10n<string>;
  description: L10n<string>;
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
    angle: {
      sv: 'dokumentation, rapportering och uppföljning i processindustrin',
      en: 'documentation, reporting and follow-up in the process industry',
    },
    description: {
      sv: 'AI-konsult i Stenungsund som hjälper företag i processindustrin och kemiklustret att automatisera dokumentation, rapportering och uppföljning med AI.',
      en: 'AI consultant in Stenungsund helping companies in the process industry and chemical cluster automate documentation, reporting and follow-up with AI.',
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
    angle: { sv: 'ordrar, leveransbesked och avvikelser i logistik och lager', en: 'orders, delivery notices and exceptions in logistics and warehousing' },
    description: {
      sv: 'AI-konsult i Ale som hjälper logistik- och lagerföretag längs E45 att låta AI hantera ordrar, leveransbesked och avvikelser som i dag görs för hand.',
      en: 'AI consultant in Ale helping logistics and warehousing companies along the E45 let AI handle orders, delivery notices and exceptions done by hand.',
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
    angle: { sv: 'AI-funktioner i produkten och automation av det dagliga arbetet', en: 'AI features in the product and automation of the daily work' },
    description: {
      sv: 'AI-konsult i Kungälv för växande produktbolag och tjänsteföretag som vill använda AI i produkten och i vardagen, med någon som både bedömer och bygger.',
      en: 'AI consultant in Kungälv for growing product and service companies that want AI in the product and the daily work, with someone who judges and builds.',
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
    angle: { sv: 'kundtjänst, bokningar och administration i tjänsteföretag', en: 'customer service, bookings and admin in service businesses' },
    description: {
      sv: 'AI-konsult i Partille som hjälper tjänsteföretag öster om Göteborg att låta AI ta över kundtjänst, bokningar och administration som tar tid i dag.',
      en: 'AI consultant in Partille helping service businesses east of Gothenburg let AI take over customer service, bookings and admin that take time today.',
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
    angle: { sv: 'teknisk dokumentation, kvalitetsuppföljning och rapportering i tillverkning', en: 'technical documentation, quality follow-up and reporting in manufacturing' },
    description: {
      sv: 'AI-konsult i Trollhättan för fordons- och tillverkningsföretag som vill använda AI för teknisk dokumentation, kvalitetsuppföljning och rapportering.',
      en: 'AI consultant in Trollhättan for automotive and manufacturing companies that want AI for technical documentation, quality follow-up and reporting.',
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
    angle: { sv: 'produkttexter, kundfrågor och returer i e-handel', en: 'product copy, customer questions and returns in e-commerce' },
    description: {
      sv: 'AI-konsult i Kungsbacka som hjälper e-handlare och webbplattformar att låta AI sköta produkttexter, kundfrågor och returer, med människor som granskar.',
      en: 'AI consultant in Kungsbacka helping online retailers and web platforms let AI handle product copy, customer questions and returns, with people reviewing.',
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
    angle: { sv: 'produktdata, översättningar, kundtjänst och returer i textil och e-handel', en: 'product data, translations, customer service and returns in textiles and e-commerce' },
    description: {
      sv: 'AI-konsult i Borås för textil- och e-handelsföretag som vill låta AI hantera produktdata, översättningar, kundtjänst och returer i stället för manuellt arbete.',
      en: 'AI consultant in Borås for textile and e-commerce companies that want AI to handle product data, translations, customer service and returns.',
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
    angle: { sv: 'bokningar, gästfrågor och säsongsplanering i besöksnäringen', en: 'bookings, guest questions and seasonal planning in hospitality' },
    description: {
      sv: 'AI-konsult i Varberg för turism och besöksnäring längs Hallandskusten som vill låta AI hantera bokningar, gästfrågor och planering under högsäsong.',
      en: 'AI consultant in Varberg for tourism and hospitality on the Halland coast that want AI to handle bookings, guest questions and peak-season planning.',
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
    paragraphs: sv
      ? [
          `Jag hjälper företag i ${name} och ${region} att hitta var AI och automation lönar sig, bygga lösningarna och underhålla dem.`,
          `De flesta uppdrag börjar med en kartläggning på plats och fortsätter sedan på distans, med möten i ${name} när det behövs.`,
        ]
      : [
          `I help companies in ${name} and ${region} find where AI and automation pay off, build the solutions and maintain them.`,
          `Most engagements start with an on-site assessment and then continue remotely, with meetings in ${name} when needed.`,
        ],
    deliveryMode: d.deliveryMode[l],
    neighbours: d.neighbours,
    faq: sv
      ? [
          { q: `Tar du uppdrag som AI-konsult i ${name}?`, a: `Ja. Jag arbetar med företag i ${name} och ${region}, på plats när det behövs och annars på distans. De flesta uppdrag börjar med en kartläggning av var AI lönar sig.` },
          { q: `Vilka AI-projekt passar företag i ${name}?`, a: `Det beror på verksamheten, men ofta handlar det om ${d.angle.sv}. Kartläggningen visar var timmarna går och vad som är värt att automatisera först.` },
          { q: `Kan du jobba på plats i ${name}?`, a: `Ja. Jag jobbar ${d.deliveryMode.sv}. Kartläggningen gör jag gärna på plats, eftersom det är där arbetet syns bäst.` },
        ]
      : [
          { q: `Do you take on AI consulting work in ${name}?`, a: `Yes. I work with companies in ${name} and ${region}, on site when needed and otherwise remotely. Most engagements start with an assessment of where AI pays off.` },
          { q: `Which AI projects suit companies in ${name}?`, a: `It depends on the business, but it is often about ${d.angle.en}. The assessment shows where the hours go and what is worth automating first.` },
          { q: `Can you work on site in ${name}?`, a: `Yes. I work ${d.deliveryMode.en}. I like to do the assessment on site, because that is where the work is easiest to see.` },
        ],
  };
}

export const cities = Object.fromEntries(
  (Object.keys(defs) as CityId[]).map((id) => [id, { sv: build(id, 'sv'), en: build(id, 'en') }]),
) as Record<CityId, L10n<CityContent>>;

export const getCity = (id: CityId, locale: Locale): CityContent => cities[id][locale];
