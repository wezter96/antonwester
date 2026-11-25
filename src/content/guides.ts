import { GUIDE_IDS, GUIDE_SLUGS, type GuideId, type Locale } from './routes';
import type { GuideContent, GuideUi, L10n } from './types';
import { aiAgents } from './guides/ai-agents';
import { aiAutomation } from './guides/ai-automation';
import { aiEvaluation } from './guides/ai-evaluation';
import { localAi } from './guides/local-ai';
import { mcpServer } from './guides/mcp-server';
import { rag } from './guides/rag';
import { valuePricing } from './guides/value-pricing';

export const guideUi: L10n<GuideUi> = {
  sv: {
    indexTitle: 'AI som fungerar i vardagen.',
    indexIntro:
      'Praktiska guider om MCP, agenter, dokument, lokala modeller och hur man testar AI innan den möter kunder. Inga genvägar och inga löften om magi.',
    indexSeo: {
      title: 'Guider om AI för företag | Anton Wester',
      description:
        'Praktiska guider om MCP-servrar, AI-agenter, RAG, lokala modeller och AI-automation. Skrivna av Anton Wester, AI-konsult i Göteborg.',
    },
    by: 'Av Anton Wester',
    published: 'Publicerad',
    updated: 'Uppdaterad',
    minRead: 'min läsning',
    contents: 'I guiden',
    related: 'Läs vidare',
    relatedServices: 'Tjänster som hör hit',
    allGuides: 'Alla guider',
    backToGuides: 'Till alla guider',
    faq: 'Frågor och svar',
    code: 'Kod',
  },
  en: {
    indexTitle: 'AI that works in everyday life.',
    indexIntro:
      'Practical guides to MCP, agents, documents, local models and how to test AI before it meets customers. No shortcuts and no promises of magic.',
    indexSeo: {
      title: 'Guides to AI for companies | Anton Wester',
      description:
        'Practical guides to MCP servers, AI agents, RAG, local models and AI automation. Written by Anton Wester, AI consultant in Gothenburg.',
    },
    by: 'By Anton Wester',
    published: 'Published',
    updated: 'Updated',
    minRead: 'min read',
    contents: 'In this guide',
    related: 'Read next',
    relatedServices: 'Related services',
    allGuides: 'All guides',
    backToGuides: 'Back to all guides',
    faq: 'Questions and answers',
    code: 'Code',
  },
};

export const guides: Record<GuideId, L10n<GuideContent>> = {
  'mcp-server': mcpServer,
  'ai-agents': aiAgents,
  rag,
  'local-ai': localAi,
  'ai-automation': aiAutomation,
  'ai-evaluation': aiEvaluation,
  'value-pricing': valuePricing,
};

export function guidePages(locale: Locale): Array<{ slug: string; guide: GuideContent }> {
  return GUIDE_IDS.map((id) => ({ slug: GUIDE_SLUGS[id][locale], guide: guides[id][locale] }));
}
