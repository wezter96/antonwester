import type { GuideContent, L10n } from '../types';

export const mcpServer: L10n<GuideContent> = {
  sv: {
    id: 'mcp-server',
    seo: {
      title: 'Hur bygger man en MCP-server som används? | Anton Wester',
      description:
        'Så bygger du en MCP-server i TypeScript: verktyg, beskrivningar, behörigheter, godkännanden och tester. Praktiska råd från en som bygger AI-system.',
    },
    h1: 'Hur bygger man en MCP-server som faktiskt används?',
    promise: 'MCP är ett gränssnitt, inte en produkt.',
    intro:
      'Bygg en MCP-server när samma förmåga ska användas från flera AI-klienter, som Claude, en IDE eller en egen agent. Håll verktygen få och smala, beskriv dem så att modellen förstår när de ska användas, kontrollera behörigheter på servern och kräv godkännande för allt som skriver. Börja med läsverktyg.',
    published: '2026-11-12',
    updated: '2026-11-28',
    readingMinutes: 10,
    sections: [
      {
        heading: 'Vad MCP löser',
        paragraphs: [
          'Model Context Protocol är ett sätt att beskriva verktyg och data för en AI-klient. Servern säger vilka verktyg som finns, vilka indata de tar och vad de svarar. Klienten, till exempel Claude Desktop, en IDE eller en egen agent, väljer sedan när verktyget ska användas.',
          'Det låter som ett API, och det är det: ett API med en gemensam beskrivning som AI-klienten förstår. Värdet kommer inte från protokollet i sig. Det kommer från att samma verktyg kan användas från flera klienter utan att någon skriver en ny integration varje gång.',
        ],
      },
      {
        heading: 'När det är värt att bygga',
        paragraphs: [
          'Bygg en MCP-server när en förmåga ska återanvändas. Det kan vara att läsa ordrar, söka i interna dokument, slå upp en kund eller skapa ett ärende. Om bara en enda app ska anropa en enda endpoint är en vanlig funktion enklare.',
          'Det passar också när behörigheter och spårbarhet måste ligga på ett ställe. Då kan servern avgöra vad användaren får göra, oavsett vilken AI-klient som frågar.',
        ],
        list: [
          'Samma verktyg behövs i flera AI-klienter eller team.',
          'Data ligger i interna system som saknar ett bra AI-gränssnitt.',
          'Du vill styra behörigheter, loggning och godkännanden centralt.',
          'Du vill kunna byta modell eller klient utan att bygga om integrationen.',
        ],
      },
      {
        heading: 'En server med tre delar',
        paragraphs: [
          'Jag börjar alltid med en liten yta: ett läsverktyg, en tydlig beskrivning och ett felmeddelande som går att förstå. Skrivverktyg kommer först när läsflödet fungerar och någon faktiskt använder det.',
          'Här är en minimal server i TypeScript. Den exponerar ett verktyg för att läsa en order. SDK-versionen kan skilja sig, så kontrollera alltid mot dokumentationen för den version du installerar.',
        ],
        code: {
          title: 'server.ts',
          language: 'ts',
          code: `import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
  name: 'orders',
  version: '1.0.0',
});

server.registerTool(
  'get_order',
  {
    description: 'Read one order by id. Returns status, customer and lines.',
    inputSchema: {
      orderId: z.string().describe('Order id, for example ORD-1042'),
    },
  },
  async ({ orderId }) => {
    const order = await orders.find(orderId);

    if (!order) {
      return {
        isError: true,
        content: [{ type: 'text', text: 'No order with id ' + orderId }],
      };
    }

    return {
      content: [{ type: 'text', text: JSON.stringify(order) }],
    };
  },
);

await server.connect(new StdioServerTransport());`,
        },
      },
      {
        heading: 'Beskriv verktyget för modellen',
        paragraphs: [
          'Modellen ser inte din databas. Den ser namn, beskrivning och schema. Ett verktyg som heter `get_data` och tar en fri sträng är nästan omöjligt att använda rätt. Ett verktyg som heter `get_order` och tar `orderId` med ett exempel är lättare.',
          'Skriv beskrivningen som en instruktion till en ny kollega: vad verktyget gör, när det ska användas och vad det inte gör. Returnera hellre ett tydligt fel än en tom sträng. Då kan modellen backa och fråga användaren i stället för att hitta på.',
        ],
      },
      {
        heading: 'Behörighet, godkännande och logg',
        paragraphs: [
          'En MCP-server är en ny väg in i systemen. Behandla den som vilken integration som helst. Autentisera anropet, kontrollera behörigheten på servern och logga vem som gjorde vad. Lita aldrig på att klienten skickar rätt användar-id.',
          'För skrivande verktyg brukar jag kräva ett explicit godkännande innan något skickas, bokas eller betalas. Det kan vara en bekräftelse i klienten eller ett separat steg i servern. Ett verktyg som skickar ett mejl är inte ett läsverktyg med ett annat namn.',
        ],
        list: [
          'Läsverktyg får vara friare än skrivverktyg.',
          'Skrivverktyg ska vara idempotenta eller kräva en unik nyckel.',
          'Logga verktygets namn, parametrar utan känsliga värden och resultatets status.',
          'Sätt gränser för storlek, tidsgräns och antal anrop.',
        ],
      },
      {
        heading: 'Testa och driftsätt',
        paragraphs: [
          'Testa servern med riktiga frågor, inte bara med ett anrop som ger 200. Be en klient lösa samma uppgift som en användare skulle göra. Fråga sedan vad som hände när verktyget saknade data eller svarade långsamt.',
          'För lokal utveckling är stdio enklast. För en server som flera ska nå använder jag HTTP med autentisering och en tydlig gräns för vilka verktyg som är publika. Logga versionen av servern tillsammans med varje anrop, så går det att förstå vad som förändrades.',
        ],
        steps: [
          'Kör servern lokalt och anslut en klient.',
          'Testa ett lyckat anrop, ett tomt svar och ett fel.',
          'Testa med en användare som inte har behörighet.',
          'Sätt upp loggning och en enkel larmgräns innan fler börjar använda servern.',
        ],
      },
      {
        heading: 'MCP i mina egna produkter',
        paragraphs: [
          'SökHem har en öppen MCP-server med bara läsverktyg. En AI-klient kan söka bland områden, hämta öppna fakta om ett område och läsa SökHems guider. Bostadsannonser och priser finns inte där, eftersom de inte är SökHems att dela. Gränsen för vad servern visar är ett beslut om data, och den sattes innan första verktyget skrevs.',
          'OpenAudit kan köras av en AI-agent via MCP, så att agenten kan granska det den just har byggt. I Copyset kan en agent som Claude Code lägga till nycklar och föreslå texter via MCP, men aldrig godkänna dem. I Wez styr Claude Code eller Codex mitt agentteam via MCP. Det är tre olika sorters verktyg bakom samma protokoll.',
        ],
      },
      {
        heading: 'Vad jag skulle bygga först',
        paragraphs: [
          'Börja med det tråkigaste verktyget som sparar mest tid: läs en order, slå upp en artikel eller hämta en kunds senaste ärende. Mät hur ofta det används och var det går fel. Bygg ut när någon saknar en förmåga, inte för att protokollet gör det möjligt.',
          'En liten MCP-server som löser ett verkligt problem är mer värd än tio verktyg som bara finns för att demonstrationen ska se stor ut.',
        ],
      },
    ],
    faq: [
      {
        q: 'Måste jag bygga en MCP-server för att använda AI i mitt system?',
        a: 'Nej. Om bara en app ska anropa en endpoint räcker en vanlig funktion. MCP är värt det när samma förmåga ska användas från flera AI-klienter eller när behörigheter och loggning behöver samlas på ett ställe.',
      },
      {
        q: 'Ska servern köra lokalt eller i molnet?',
        a: 'Börja lokalt med stdio om du utvecklar själv. Om flera personer eller klienter ska nå servern behöver du en driftmiljö med autentisering, loggning och en tydlig gräns för vilka verktyg som får anropas.',
      },
      {
        q: 'Hur hindrar jag att AI:n gör fel saker?',
        a: 'Begränsa verktygen, kontrollera behörigheter på servern och kräv godkännande för skrivande steg. Logga anropen och testa både lyckade och misslyckade flöden innan servern får fler användare.',
      },
    ],
    relatedServices: ['agents', 'development'],
    relatedCases: ['sokhem', 'openaudit', 'copyset'],
    relatedGuides: ['ai-agents', 'ai-evaluation'],
  },
  en: {
    id: 'mcp-server',
    seo: {
      title: 'How do you build an MCP server people use? | Anton Wester',
      description:
        'How to build an MCP server in TypeScript: tools, descriptions, permissions, approvals and tests. Practical advice from someone who builds AI systems.',
    },
    h1: 'How do you build an MCP server people actually use?',
    promise: 'MCP is an interface, not a product.',
    intro:
      'Build an MCP server when the same capability will be used from several AI clients, such as Claude, an IDE or your own agent. Keep the tools few and narrow, describe them so the model knows when to use them, check permissions on the server and require approval for anything that writes. Start with read tools.',
    published: '2026-11-12',
    updated: '2026-11-28',
    readingMinutes: 10,
    sections: [
      {
        heading: 'What MCP solves',
        paragraphs: [
          'Model Context Protocol is a way to describe tools and data to an AI client. The server says which tools exist, what input they take and what they return. The client, such as Claude Desktop, an IDE or your own agent, then decides when to use the tool.',
          'That sounds like an API, and it is: an API with a shared description that an AI client understands. The value does not come from the protocol itself. It comes from the same tools being usable from several clients without someone writing a new integration every time.',
        ],
      },
      {
        heading: 'When it is worth building',
        paragraphs: [
          'Build an MCP server when a capability will be reused. It might be reading orders, searching internal documents, looking up a customer or creating a ticket. If one app will call one endpoint, a normal function is simpler.',
          'It also helps when permissions and traceability need to sit in one place. The server can then decide what the user may do, whichever AI client is asking.',
        ],
        list: [
          'The same tools are needed in several AI clients or teams.',
          'Data sits in internal systems without a good AI interface.',
          'You want permissions, logging and approvals controlled centrally.',
          'You want to change model or client without rebuilding the integration.',
        ],
      },
      {
        heading: 'A server in three parts',
        paragraphs: [
          'I always start with a small surface: one read tool, a clear description and an error message a person can understand. Write tools come only after the read flow works and someone actually uses it.',
          'Here is a minimal TypeScript server. It exposes one tool for reading an order. The SDK version may differ, so always check the documentation for the version you install.',
        ],
        code: {
          title: 'server.ts',
          language: 'ts',
          code: `import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
  name: 'orders',
  version: '1.0.0',
});

server.registerTool(
  'get_order',
  {
    description: 'Read one order by id. Returns status, customer and lines.',
    inputSchema: {
      orderId: z.string().describe('Order id, for example ORD-1042'),
    },
  },
  async ({ orderId }) => {
    const order = await orders.find(orderId);

    if (!order) {
      return {
        isError: true,
        content: [{ type: 'text', text: 'No order with id ' + orderId }],
      };
    }

    return {
      content: [{ type: 'text', text: JSON.stringify(order) }],
    };
  },
);

await server.connect(new StdioServerTransport());`,
        },
      },
      {
        heading: 'Describe the tool for the model',
        paragraphs: [
          'The model does not see your database. It sees a name, a description and a schema. A tool called `get_data` that takes a free string is almost impossible to use correctly. A tool called `get_order` that takes `orderId` with an example is easier.',
          'Write the description like an instruction to a new colleague: what the tool does, when to use it and what it does not do. Return a clear error rather than an empty string. Then the model can back off and ask the user instead of making something up.',
        ],
      },
      {
        heading: 'Permissions, approval and logs',
        paragraphs: [
          'An MCP server is a new path into your systems. Treat it like any other integration. Authenticate the call, check permission on the server and log who did what. Never trust the client to send the right user id.',
          'For write tools I usually require explicit approval before anything is sent, booked or paid. It can be a confirmation in the client or a separate step in the server. A tool that sends an email is not a read tool with a different name.',
        ],
        list: [
          'Read tools can be more open than write tools.',
          'Write tools should be idempotent or require a unique key.',
          'Log the tool name, parameters without sensitive values and result status.',
          'Set limits for size, timeout and number of calls.',
        ],
      },
      {
        heading: 'Test and deploy',
        paragraphs: [
          'Test the server with real questions, not just a call that returns 200. Ask a client to solve the same task a user would. Then ask what happened when the tool had no data or responded slowly.',
          'For local development, stdio is simplest. For a server several people need to reach, I use HTTP with authentication and a clear limit on which tools are public. Log the server version with every call, so it is possible to understand what changed.',
        ],
        steps: [
          'Run the server locally and connect a client.',
          'Test a successful call, an empty response and an error.',
          'Test with a user who lacks permission.',
          'Set up logging and a basic alert before more people start using it.',
        ],
      },
      {
        heading: 'MCP in my own products',
        paragraphs: [
          'SökHem has a public MCP server with read tools only. An AI client can search areas, fetch open facts about an area and read SökHem’s guides. Listings and prices aren’t there, because they aren’t SökHem’s to share. The line for what the server shows is a decision about data, and it was drawn before the first tool was written.',
          'OpenAudit can be run by an AI agent over MCP, so the agent can audit what it has just built. In Copyset an agent such as Claude Code can add keys and suggest copy over MCP, but never approve it. In Wez, Claude Code or Codex steer my agent team over MCP. That’s three different kinds of tools behind the same protocol.',
        ],
      },
      {
        heading: 'What I would build first',
        paragraphs: [
          'Start with the most boring tool that saves the most time: read an order, look up an article or fetch a customer’s latest ticket. Measure how often it is used and where it fails. Expand when someone is missing a capability, not because the protocol makes it possible.',
          'A small MCP server that solves a real problem is worth more than ten tools that exist only to make the demo look big.',
        ],
      },
    ],
    faq: [
      {
        q: 'Do I need an MCP server to use AI in my system?',
        a: 'No. If one app will call one endpoint, a normal function is enough. MCP is worth it when the same capability will be used from several AI clients, or when permissions and logging need to live in one place.',
      },
      {
        q: 'Should the server run locally or in the cloud?',
        a: 'Start locally with stdio if you are developing alone. If several people or clients need to reach it, you need a hosting environment with authentication, logging and a clear limit on which tools can be called.',
      },
      {
        q: 'How do I stop the AI from doing the wrong thing?',
        a: 'Limit the tools, check permissions on the server and require approval for write steps. Log the calls and test both successful and failed flows before more people use the server.',
      },
    ],
    relatedServices: ['agents', 'development'],
    relatedCases: ['sokhem', 'openaudit', 'copyset'],
    relatedGuides: ['ai-agents', 'ai-evaluation'],
  },
};
