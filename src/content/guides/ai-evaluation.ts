import type { GuideContent, L10n } from '../types';

export const aiEvaluation: L10n<GuideContent> = {
  sv: {
    id: 'ai-evaluation',
    seo: {
      title: 'Hur testar man AI innan den möter kunder? | Anton Wester',
      description:
        'Så testar du AI-system med riktiga fall, tydliga kriterier och regressionstester. En praktisk guide om utvärdering av AI från Anton Wester.',
    },
    h1: 'Hur testar man AI innan den möter kunder?',
    promise: 'En demo är inte ett test.',
    intro:
      'Samla 30 till 50 riktiga fall från verksamheten och skriv ner vad ett bra svar måste innehålla. Kör samma fall varje gång ni byter modell, prompt eller verktyg, och jämför med förra versionen. Mät mer än om svaret stämmer: källor, beteende, kostnad och tid. Släpp sedan till en liten grupp först.',
    published: '2026-11-12',
    updated: '2026-11-28',
    readingMinutes: 9,
    sections: [
      {
        heading: 'Samla riktiga fall först',
        paragraphs: [
          'Börja med frågor och uppgifter som redan finns i verksamheten. Ta mejl, ärenden, dokument och samtal som en erfaren person har löst. Skriv ner vad ett bra svar måste innehålla.',
          '30–50 fall är en bra start. De behöver inte vara perfekt formulerade. Det viktiga är att de liknar det systemet ska möta, inte att de är enkla att få igenom.',
        ],
      },
      {
        heading: 'Mät mer än ett svar',
        paragraphs: [
          'Ett svar kan vara rätt men bygga på fel källa, eller fel men ändå användbart. Dela upp bedömningen i det som faktiskt betyder något för uppgiften: korrekthet, källor, format, ton, kostnad och tid.',
          'För en agent tillkommer val av verktyg, antal steg och om den bad om hjälp när den borde. För ett RAG-system tillkommer om rätt dokument hittades och om citatet pekade rätt.',
        ],
        list: [
          'Korrekthet: stämmer svaret med underlaget?',
          'Källor: pekar de på rätt dokument och stycke?',
          'Beteende: frågar systemet när det är osäkert?',
          'Kostnad och tid: klarar vi volymen?',
          'Säkerhet: läcker känsliga uppgifter eller fel behörighet?',
        ],
      },
      {
        heading: 'Gör bedömningen repeterbar',
        paragraphs: [
          'Skriv en kort rubric för varje fall. “Rätt svar ska nämna tre saker, citera avsnitt 4 och inte ge en rekommendation.” Då kan två personer bedöma ungefär likadant, och ni kan jämföra över tid.',
          'Låt gärna en person som inte byggde systemet bedöma en del av fallen. Den som har byggt vet varför svaret borde vara rätt. Det gör det lättare att se det som en användare ser.',
        ],
      },
      {
        heading: 'Kör samma tester vid varje ändring',
        paragraphs: [
          'Varje gång ni byter modell, prompt, verktyg eller sökning ska samma uppsättning köras. Jämför resultatet med förra versionen. En förbättring på ett område är inte värd något om den försämrar tre andra.',
          'Spara resultaten med datum och version. Då går det att svara på varför kvaliteten ändrades, och ni slipper gissa när något blir sämre.',
        ],
      },
      {
        heading: 'Släpp gradvis',
        paragraphs: [
          'Börja med en liten grupp användare eller en liten del av trafiken. Låt en människa granska svaren under en period. Öka när kvaliteten håller, och ha en enkel väg att stänga av.',
          'Logga det som behövs för att följa upp, men undvik känsliga uppgifter. Ett system som går att stänga av och en person som läser loggen är viktigare än en imponerande demo.',
        ],
      },
      {
        heading: 'Koppla varje krav till ett test',
        paragraphs: [
          'I WebNu, min tjänst för hemsidor åt småföretag, finns 282 skrivna krav. Vart och ett är kopplat till testet som visar att det håller, och varje ändring går igenom de automatiska kontrollerna innan den når produktion. Det gäller även kod som AI-agenter har skrivit.',
          'Samma idé fungerar för ett AI-system. Skriv kravet i klartext, till exempel ”svaret får aldrig lova ett leveransdatum”, och koppla det till de fall som prövar det. När ett test inte går igenom ser ni vilket krav som bröts, och inte bara att något blev sämre.',
        ],
      },
      {
        heading: 'Ett betyg vid varje ändring',
        paragraphs: [
          'OpenAudit, mitt granskningsverktyg med öppen källkod, kör 103 kontroller inom tio områden och ger resultatet ett betyg. Verktyget granskar sig självt vid varje ändring och ska hålla A 100. Ett betyg som räknas likadant varje gång gör det lätt att se när något går bakåt.',
          'För ett AI-system kan betyget vara andelen fall som går igenom, uppdelat på korrekthet, källor och beteende. Bestäm en gräns som en ändring måste klara för att få gå ut, och låt den gälla även när ändringen ser liten ut.',
        ],
      },
      {
        heading: 'Vad ni inte kan testa er till',
        paragraphs: [
          'Tester säger inte allt om hur systemet känns i vardagen. De säger inte heller om människor litar på det eller om det sparar tid. Det behöver ni mäta med riktiga användare.',
          'Men utan tester blir den frågan omöjlig att svara på. Först när kvaliteten är mätbar går det att se om tiden som sparas är värd något.',
        ],
      },
      {
        heading: 'Vad det kostar',
        paragraphs: [
          'Testfallen och mätningen är en del av allt jag bygger och ingår i priset för AI-utveckling, från 60 000 kr utan moms. Har ni redan ett AI-system i drift kan vi börja med att bygga testfallen för det och mäta var det står i dag. Då vet ni vad som behöver bli bättre innan någon bygger mer.',
        ],
      },
    ],
    faq: [
      {
        q: 'Hur många testfall behöver vi?',
        a: 'Börja med 30–50 riktiga fall. Fler är bättre om de täcker olika typer av frågor, men ett litet set som faktiskt körs är bättre än ett stort som ingen underhåller.',
      },
      {
        q: 'Kan vi låta en AI bedöma svaren?',
        a: 'Det kan vara ett stöd vid stora volymer, men en människa bör kalibrera bedömningen och granska urvalet. Annars mäter ni mest hur väl bedömaren håller med sig själv.',
      },
      {
        q: 'Måste vi testa varje gång vi byter modell?',
        a: 'Ja, åtminstone mot samma fasta set. Modeller och prompts påverkar varandra, och en ändring som ser liten ut kan ändra beteendet i kanten.',
      },
    ],
    relatedServices: ['assessment', 'operations'],
    relatedCases: ['webnu', 'openaudit'],
    relatedGuides: ['ai-agents', 'rag'],
  },
  en: {
    id: 'ai-evaluation',
    seo: {
      title: 'How do you test AI before it meets customers? | Anton Wester',
      description:
        'How to test AI systems with real cases, clear criteria and regression tests. A practical guide to AI evaluation by Anton Wester.',
    },
    h1: 'How do you test AI before it meets customers?',
    promise: 'A demo is not a test.',
    intro:
      'Collect 30 to 50 real cases from the business and write down what a good answer must contain. Run the same cases every time you change model, prompt or tool, and compare with the previous version. Measure more than whether the answer is right: sources, behaviour, cost and time. Then release to a small group first.',
    published: '2026-11-12',
    updated: '2026-11-28',
    readingMinutes: 9,
    sections: [
      {
        heading: 'Collect real cases first',
        paragraphs: [
          'Start with questions and tasks that already exist in the business. Take emails, tickets, documents and conversations an experienced person has solved. Write down what a good answer must contain.',
          '30–50 cases is a good start. They do not need to be perfectly phrased. What matters is that they resemble what the system will meet, not that they are easy to pass.',
        ],
      },
      {
        heading: 'Measure more than an answer',
        paragraphs: [
          'An answer can be correct but built on the wrong source, or wrong but still useful. Split the assessment into what actually matters for the task: correctness, sources, format, tone, cost and time.',
          'For an agent, add tool choice, number of steps and whether it asked for help when it should. For a RAG system, add whether the right document was found and whether the citation pointed to the right place.',
        ],
        list: [
          'Correctness: does the answer match the evidence?',
          'Sources: do they point to the right document and passage?',
          'Behaviour: does the system ask when it is unsure?',
          'Cost and time: can we handle the volume?',
          'Safety: does sensitive data or the wrong permission leak?',
        ],
      },
      {
        heading: 'Make the assessment repeatable',
        paragraphs: [
          'Write a short rubric for each case. “A correct answer should mention three things, quote section 4 and not give a recommendation.” Then two people can judge roughly the same way, and you can compare over time.',
          'Have someone who did not build the system judge some of the cases. The builder knows why an answer should be right. That makes it easier to miss what a user sees.',
        ],
      },
      {
        heading: 'Run the same tests on every change',
        paragraphs: [
          'Every time you change model, prompt, tool or search, run the same set. Compare the result with the previous version. An improvement in one area is not worth much if it makes three others worse.',
          'Store the results with date and version. Then you can answer why quality changed, and you do not have to guess when something gets worse.',
        ],
      },
      {
        heading: 'Release gradually',
        paragraphs: [
          'Start with a small group of users or a small share of traffic. Have a person review the answers for a period. Increase when quality holds, and keep a simple way to turn it off.',
          'Log what you need to follow up, but avoid sensitive information. A system you can switch off and a person who reads the log matter more than an impressive demo.',
        ],
      },
      {
        heading: 'Link every requirement to a test',
        paragraphs: [
          'In WebNu, my website service for small businesses, there are 282 written requirements. Each one is linked to the test that shows it holds, and every change goes through the automatic checks before it reaches production. That applies to code written by AI agents too.',
          'The same idea works for an AI system. Write the requirement in plain words, such as “the answer must never promise a delivery date”, and link it to the cases that test it. When a test fails you see which requirement broke, not just that something got worse.',
        ],
      },
      {
        heading: 'A score on every change',
        paragraphs: [
          'OpenAudit, my open-source audit tool, runs 103 checks across ten areas and gives the result a score. The tool audits itself on every change and has to stay at A 100. A score that’s calculated the same way every time makes it easy to see when something slips.',
          'For an AI system the score can be the share of cases that pass, split into correctness, sources and behaviour. Decide on a threshold a change must clear before it ships, and keep it even when the change looks small.',
        ],
      },
      {
        heading: 'What tests cannot tell you',
        paragraphs: [
          'Tests do not say everything about how the system feels in daily work. They do not say whether people trust it or whether it saves time. You need real users to measure that.',
          'But without tests, that question becomes impossible to answer. Only when quality is measurable can you see whether the time saved is worth anything.',
        ],
      },
      {
        heading: 'What it costs',
        paragraphs: [
          'The test cases and the measuring are part of everything I build and are included in the price of AI development, from SEK 60,000 excluding VAT. If you already have an AI system running, we can start by building the test cases for it and measuring where it stands today. Then you know what needs to improve before anyone builds more.',
        ],
      },
    ],
    faq: [
      {
        q: 'How many test cases do we need?',
        a: 'Start with 30–50 real cases. More is better if they cover different kinds of questions, but a small set that is actually run beats a large one nobody maintains.',
      },
      {
        q: 'Can we let an AI judge the answers?',
        a: 'It can help at large volumes, but a person should calibrate the assessment and review a sample. Otherwise you are mostly measuring how well the judge agrees with itself.',
      },
      {
        q: 'Do we have to test every time we change model?',
        a: 'Yes, at least against the same fixed set. Models and prompts affect each other, and a change that looks small can alter behaviour at the edges.',
      },
    ],
    relatedServices: ['assessment', 'operations'],
    relatedCases: ['webnu', 'openaudit'],
    relatedGuides: ['ai-agents', 'rag'],
  },
};
