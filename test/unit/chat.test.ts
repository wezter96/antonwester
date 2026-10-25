import { describe, expect, it } from 'vitest';
import { home } from '../../src/content/home';
import { isSmallTalk, matchQuestion } from '../../src/lib/chat-match';
import { chatTopics } from '../../src/lib/chat-tree';
import { complete, plainText, providers, respond, sanitize, systemPrompt } from '../../worker/chat.js';

const ok = (content: string) => new Response(JSON.stringify({ choices: [{ message: { content } }] }));
const msgs = [{ role: 'user', content: 'Hej' }];

describe('chat tree', () => {
  it('is built from the site FAQs, with unique ids', () => {
    const ids = chatTopics('sv').flatMap((t) => t.questions.map((q) => q.id));
    expect(new Set(ids).size).toBe(ids.length);
    expect(chatTopics('sv')[0].questions[0].answer).toBe(home.sv.faq[0].a);
  });
  it('matches a reworded FAQ question and leaves the rest to the AI', () => {
    expect(matchQuestion('vad kostar en kartläggning', 'sv')?.id).toBe('faq-0');
    expect(matchQuestion('vad kostar en kartläggning', 'sv', ['faq-0'])).toBeNull();
    expect(matchQuestion('kan ni laga min cykel', 'sv')).toBeNull();
    expect(matchQuestion('Vad är en AI-agent?', 'sv')).toBeNull();
    expect(matchQuestion('Kan AI hjälpa vår lagerhantering?', 'sv')).toBeNull();
    expect(matchQuestion('Do you work remotely?', 'en')?.question).toBe('Do you work on site or remotely?');
    expect(isSmallTalk('Hej!')).toBe(true);
  });
});

describe('chat worker', () => {
  it('cleans input and output', () => {
    expect(sanitize('  hej\n\tdär\u0000 ')).toBe('hej där');
    expect(sanitize(42)).toBe('');
    expect(plainText('**Ja**, Anton kan.\n- en sak')).toBe('Ja, Anton kan. en sak');
  });
  it('grounds the prompt in the site content', () => {
    expect(systemPrompt('sv')).toContain('contact@antonwester.se');
    expect(systemPrompt('sv')).toContain('lokala AI-modeller');
  });
  it('tries Gemini, then Groq, then Vercel, and skips providers without a key', () => {
    expect(providers({ GROQ_API_KEY: 'g', AI_GATEWAY_API_KEY: 'v' }).map((p) => p.id)).toEqual(['groq', 'vercel']);
    expect(providers({ GEMINI_API_KEY: 'x', GROQ_API_KEY: 'g' }).map((p) => p.id)).toEqual(['gemini', 'groq']);
  });
  it('falls through a failing provider, then to Workers AI, then to null', async () => {
    const env = { GROQ_API_KEY: 'g', AI_GATEWAY_API_KEY: 'v' };
    const seq = async (url: RequestInfo | URL) => (String(url).includes('groq') ? new Response('', { status: 429 }) : ok('**Svar**'));
    expect(await complete(env, msgs, { fetchImpl: seq })).toEqual({ text: 'Svar', provider: 'vercel' });
    const down = async () => { throw new Error('down'); };
    expect(await complete({ ...env, AI: { run: async () => ({ response: 'Från CF' }) } }, msgs, { fetchImpl: down })).toEqual({ text: 'Från CF', provider: 'workers-ai' });
    expect(await complete(env, msgs, { fetchImpl: down })).toBeNull();
  });
  it('answers from the tree first, and only calls a model when the tree has nothing', async () => {
    let calls = 0;
    const env = { GROQ_API_KEY: 'g' };
    const fetchImpl = async () => { calls++; return ok('AI-svar'); };
    expect(await respond({ message: 'hej', locale: 'sv' }, env, { fetchImpl })).toEqual({ kind: 'topics' });
    expect(await respond({ message: 'Vad kostar en AI-kartläggning?', locale: 'sv' }, env, { fetchImpl })).toEqual({ kind: 'tree', id: 'faq-0' });
    expect(calls).toBe(0);
    expect(await respond({ message: 'Kan AI hjälpa vår lagerhantering?', locale: 'sv' }, env, { fetchImpl })).toMatchObject({ kind: 'ai', text: 'AI-svar' });
    expect(await respond({ message: 'Kan AI hjälpa vår lagerhantering?', locale: 'sv' }, {}, { fetchImpl })).toEqual({ kind: 'contact' });
  });
});
