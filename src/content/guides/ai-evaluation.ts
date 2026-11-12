import type { GuideContent, L10n } from '../types';

export const aiEvaluation: L10n<GuideContent> = {
  sv: {
    id: 'ai-evaluation',
    seo: {
      title: 'Testa AI innan den får kunder | Anton Wester',
      description:
        'Så testar du AI-system med riktiga fall, tydliga kriterier och regressionstester. En praktisk guide om utvärdering av AI från Anton Wester.',
    },
    h1: 'Testa AI innan den får kunder',
    promise: 'En demo är inte ett test.',
    intro:
      'Ett bra AI-system har en uppsättning fall som går att köra om och om igen. Utan den vet ni bara att det fungerade den dagen någon råkade titta.',
    published: '2026-09-02',
    readingMinutes: 7,
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
        heading: 'Vad ni inte kan testa er till',
        paragraphs: [
          'Tester säger inte allt om hur systemet känns i vardagen. De säger inte heller om människor litar på det eller om det sparar tid. Det behöver ni mäta med riktiga användare.',
          'Men utan tester blir den frågan omöjlig att svara på. Först när kvaliteten är mätbar går det att se om tiden som sparas är värd något.',
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
    relatedGuides: ['ai-agents', 'rag'],
  },
  en: {
    id: 'ai-evaluation',
    seo: {
      title: 'Test AI before it meets customers | Anton Wester',
      description:
        'How to test AI systems with real cases, clear criteria and regression tests. A practical guide to AI evaluation by Anton Wester.',
    },
    h1: 'Test AI before it meets customers',
    promise: 'A demo is not a test.',
    intro:
      'A good AI system has a set of cases you can run again and again. Without it, you only know it worked on the day someone happened to look.',
    published: '2026-09-02',
    readingMinutes: 7,
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
        heading: 'What tests cannot tell you',
        paragraphs: [
          'Tests do not say everything about how the system feels in daily work. They do not say whether people trust it or whether it saves time. You need real users to measure that.',
          'But without tests, that question becomes impossible to answer. Only when quality is measurable can you see whether the time saved is worth anything.',
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
    relatedGuides: ['ai-agents', 'rag'],
  },
};
