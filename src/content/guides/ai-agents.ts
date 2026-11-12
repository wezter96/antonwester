import type { GuideContent, L10n } from '../types';

export const aiAgents: L10n<GuideContent> = {
  sv: {
    id: 'ai-agents',
    seo: {
      title: 'AI-agenter som fungerar i produktion | Anton Wester',
      description:
        'Så bygger du AI-agenter som går att lita på: smala uppgifter, tydliga verktyg, gränser, godkännanden och loggning. Praktiska råd från AI-konsulten Anton Wester.',
    },
    h1: 'AI-agenter som fungerar i produktion',
    promise: 'En agent är ett program med en loop, inte en anställd.',
    intro:
      'Den svåra delen är inte att få modellen att anropa ett verktyg. Det är att få den att sluta i tid, göra rätt när något går fel och lämna spår efter sig.',
    published: '2026-10-28',
    readingMinutes: 8,
    sections: [
      {
        heading: 'Vad en agent faktiskt är',
        paragraphs: [
          'En agent är ett program som får ett mål, väljer ett verktyg, läser svaret och fortsätter tills målet är nått eller en gräns slår till. Modellen är en del av programmet. Den är inte programmet.',
          'Det betyder att vanlig mjukvaruutveckling gäller. Du behöver en tydlig uppgift, en ägare, ett sätt att se vad som hände och ett sätt att stoppa den. En agent som inte går att stoppa är inte en produkt.',
        ],
      },
      {
        heading: 'Börja med ett smalt jobb',
        paragraphs: [
          'Jag börjar hellre med ett jobb som en person gör i tio minuter varje dag än med en agent som ska sköta hela kundtjänsten. Ett smalt jobb går att mäta, testa och förbättra. Ett brett jobb går bara att prata om.',
          'Ett bra första jobb har ett tydligt svar, ett litet antal system och ett naturligt slut. Exempel: sortera inkommande mejl i tre kategorier, hämta orderstatus och föreslå ett svar, eller sammanställa en veckorapport från två system.',
        ],
      },
      {
        heading: 'Sätt gränser innan du sätter fart',
        paragraphs: [
          'En agent behöver gränser som är enkla att förklara för en människa. Hur många steg får den ta? Vilka verktyg får den använda? Vilka handlingar kräver godkännande? Vad händer om ett verktyg svarar med fel?',
          'Jag sätter alltid ett max antal steg, en tidsgräns och en lista över tillåtna verktyg. Skrivande steg kräver godkännande eller en idempotensnyckel. Om agenten inte kan lösa uppgiften ska den lämna över, inte försöka igen i evighet.',
        ],
        list: [
          'Max antal steg och en hård tidsgräns.',
          'En lista över verktyg, med läs- och skrivverktyg åtskilda.',
          'Godkännande för betalningar, mejl, bokningar och raderingar.',
          'Ett tydligt läge för “jag vet inte” som går till en människa.',
        ],
      },
      {
        heading: 'Logga varje steg, inte bara slutet',
        paragraphs: [
          'När en agent gör fel är det sällan sista svaret som är problemet. Det är steget innan: fel verktyg, fel parameter eller ett verktygssvar som missförstods. Logga därför varje steg med ett spårnings-id, verktygets namn, en maskad indata och resultatets status.',
          'Logga också kostnaden och tiden per steg. En agent som tar tolv anrop där tre räcker är dyr även om svaret är rätt. Siffrorna gör det lättare att välja mellan en bättre prompt, ett bättre verktyg och en enklare lösning.',
        ],
      },
      {
        heading: 'Utvärdera med riktiga fall',
        paragraphs: [
          'En demo med tre exempel säger nästan ingenting. Samla i stället 30–50 riktiga fall från verksamheten, med det svar en erfaren person skulle ge. Kör agenten på dem varje gång du byter modell, prompt eller verktyg.',
          'Mät inte bara om svaret är rätt. Mät om agenten valde rätt verktyg, om den frågade när den borde och om den slutade i tid. De sakerna avgör om den går att lita på i vardagen.',
        ],
      },
      {
        heading: 'När du inte ska bygga en agent',
        paragraphs: [
          'Om flödet är känt och görs likadant varje gång är vanlig automation bättre. Om svaret måste vara exakt är en databasfråga bättre. Om en människa ändå ska granska varje steg är det ofta gränssnittet, inte agenten, som behöver bli bättre.',
          'En agent är rätt när uppgiften kräver omdöme, när antalet vägar är stort och när ett fel går att upptäcka eller ångra. Annars bygger du något dyrare än problemet.',
        ],
      },
    ],
    faq: [
      {
        q: 'Vad kostar en AI-agent att bygga?',
        a: 'Det beror på antalet system och hur mycket som ska godkännas av en människa. Ett smalt första flöde brukar gå att bygga på några veckor. Ett brett system med många integrationer tar längre tid och kräver mer test.',
      },
      {
        q: 'Kan agenten använda våra befintliga system?',
        a: 'Ja, om systemen har ett API eller en export som går att läsa. Saknas det bygger vi en kontrollerad väg in, hellre än att agenten får fri tillgång till databasen.',
      },
      {
        q: 'Hur vet vi att agenten inte gör något dumt?',
        a: 'Genom att begränsa verktygen, kräva godkännande för skrivande steg och logga varje anrop. Vi testar också mot riktiga fall och har en enkel väg att stänga av flödet.',
      },
    ],
    relatedServices: ['agents', 'automation'],
    relatedGuides: ['mcp-server', 'ai-evaluation'],
  },
  en: {
    id: 'ai-agents',
    seo: {
      title: 'AI agents that work in production | Anton Wester',
      description:
        'How to build AI agents you can trust: narrow tasks, clear tools, limits, approvals and logging. Practical advice from AI consultant Anton Wester.',
    },
    h1: 'AI agents that work in production',
    promise: 'An agent is a program with a loop, not an employee.',
    intro:
      'The hard part is not getting the model to call a tool. It is getting it to stop in time, do the right thing when something fails and leave a trail behind.',
    published: '2026-10-28',
    readingMinutes: 8,
    sections: [
      {
        heading: 'What an agent actually is',
        paragraphs: [
          'An agent is a program that gets a goal, chooses a tool, reads the result and continues until the goal is reached or a limit stops it. The model is part of the program. It is not the program.',
          'That means normal software engineering applies. You need a clear task, an owner, a way to see what happened and a way to stop it. An agent you cannot stop is not a product.',
        ],
      },
      {
        heading: 'Start with a narrow job',
        paragraphs: [
          'I would rather start with a job a person does for ten minutes every day than with an agent that runs the whole support desk. A narrow job can be measured, tested and improved. A broad job can only be discussed.',
          'A good first job has a clear answer, a small number of systems and a natural end. Examples: sort incoming email into three categories, fetch order status and suggest a reply, or compile a weekly report from two systems.',
        ],
      },
      {
        heading: 'Set limits before speed',
        paragraphs: [
          'An agent needs limits a person can explain. How many steps may it take? Which tools may it use? Which actions need approval? What happens when a tool returns an error?',
          'I always set a maximum number of steps, a timeout and a list of allowed tools. Write steps require approval or an idempotency key. If the agent cannot solve the task, it should hand over, not retry forever.',
        ],
        list: [
          'A maximum number of steps and a hard timeout.',
          'A tool list, with read and write tools kept apart.',
          'Approval for payments, email, bookings and deletions.',
          'A clear “I don’t know” path that reaches a person.',
        ],
      },
      {
        heading: 'Log every step, not just the end',
        paragraphs: [
          'When an agent goes wrong, the final answer is rarely the problem. It is the step before: the wrong tool, the wrong parameter or a tool response that was misunderstood. So log every step with a trace id, the tool name, masked input and result status.',
          'Log cost and time per step too. An agent that takes twelve calls where three would do is expensive even when the answer is right. The numbers make it easier to choose between a better prompt, a better tool and a simpler solution.',
        ],
      },
      {
        heading: 'Evaluate with real cases',
        paragraphs: [
          'A demo with three examples says almost nothing. Collect 30–50 real cases from the business, with the answer an experienced person would give. Run the agent on them every time you change model, prompt or tool.',
          'Measure more than whether the answer is correct. Measure whether the agent chose the right tool, asked when it should and stopped in time. Those things decide whether it can be trusted in daily work.',
        ],
      },
      {
        heading: 'When not to build an agent',
        paragraphs: [
          'If the flow is known and does the same thing every time, ordinary automation is better. If the answer must be exact, a database query is better. If a person will review every step anyway, it is often the interface, not the agent, that needs improving.',
          'An agent is right when the task needs judgement, when the number of paths is large and when a mistake can be detected or undone. Otherwise you are building something more expensive than the problem.',
        ],
      },
    ],
    faq: [
      {
        q: 'What does an AI agent cost to build?',
        a: 'It depends on the number of systems and how much a person needs to approve. A narrow first flow can often be built in a few weeks. A broad system with many integrations takes longer and needs more testing.',
      },
      {
        q: 'Can the agent use our existing systems?',
        a: 'Yes, if the systems have an API or an export we can read. If not, we build a controlled path in rather than giving the agent free access to the database.',
      },
      {
        q: 'How do we know the agent will not do something stupid?',
        a: 'By limiting the tools, requiring approval for write steps and logging every call. We also test against real cases and keep a simple way to turn the flow off.',
      },
    ],
    relatedServices: ['agents', 'automation'],
    relatedGuides: ['mcp-server', 'ai-evaluation'],
  },
};
