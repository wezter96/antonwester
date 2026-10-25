// Matches free text against the chat's question tree, ported from htig. It answers the questions the site
// already answers well, for free; when in doubt it returns null and the language model takes over.
import type { Locale } from '../content/routes';
import { chatTopics, type ChatAnswer } from './chat-tree';

const STOPWORDS = new Set([
  'att', 'av', 'blir', 'de', 'den', 'det', 'din', 'du', 'där', 'eller', 'en', 'er', 'ert', 'era', 'ett', 'från', 'för', 'ha', 'har', 'hej',
  'hur', 'här', 'i', 'jag', 'kan', 'man', 'med', 'mycket', 'men', 'mig', 'min', 'ni', 'nu', 'när', 'och', 'också', 'om', 'oss', 'på', 'som', 'ska',
  'så', 'till', 'vad', 'var', 'vara', 'vi', 'vid', 'vilka', 'vilken', 'vilket', 'är', 'åt',
  'a', 'an', 'and', 'are', 'can', 'do', 'does', 'for', 'hello', 'hi', 'how', 'i', 'in', 'is', 'it', 'me', 'my', 'of', 'on', 'or', 'our',
  'the', 'to', 'us', 'we', 'what', 'when', 'which', 'who', 'with', 'you', 'your',
]);

const fold = (s: string) => s.toLowerCase().replaceAll('å', 'a').replaceAll('ä', 'a').replaceAll('ö', 'o').replaceAll('é', 'e').replaceAll('ü', 'u');
const FOLDED = new Set([...STOPWORDS].map(fold));

export const tokenize = (input: string): string[] =>
  fold(input).replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w.length > 1 && !FOLDED.has(w));

/** Two words match when they are equal or share a stem of four letters or more. */
const same = (a: string, b: string) => a === b || (Math.min(a.length, b.length) >= 4 && (a.startsWith(b) || b.startsWith(a)));

interface Index { entries: Array<{ answer: ChatAnswer; tokens: string[] }>; df: Map<string, number> }
const indexes = new Map<Locale, Index>();

function indexFor(locale: Locale): Index {
  let index = indexes.get(locale);
  if (index) return index;
  const entries = chatTopics(locale).flatMap((t) => t.questions).map((answer) => ({
    answer, tokens: [...new Set(tokenize(`${answer.question} ${answer.answer}`))],
  }));
  const df = new Map<string, number>();
  for (const e of entries) for (const t of e.tokens) df.set(t, (df.get(t) ?? 0) + 1);
  index = { entries, df };
  indexes.set(locale, index);
  return index;
}

/** Rare words weigh more. A word the tree lacks weighs as much as its rarest one: it usually names what the
 *  question is really about ("lagerhantering"), so a tree answer that misses it is the wrong answer. */
const weight = (token: string, index: Index) => Math.log((index.entries.length + 1) / ((index.df.get(token) ?? 0) + 0.5));

/** The closest answer, or null when none is close enough or it was already given in this chat. */
export function matchQuestion(message: string, locale: Locale, asked: string[] = [], threshold = 0.55): ChatAnswer | null {
  const index = indexFor(locale);
  const query = [...new Set(tokenize(message))];
  const total = query.reduce((sum, t) => sum + weight(t, index), 0);
  if (total <= 0) return null;

  let best: { answer: ChatAnswer; score: number; similarity: number } | null = null;
  for (const entry of index.entries) {
    const matched = query.reduce((sum, q) => sum + (entry.tokens.some((t) => same(q, t)) ? weight(q, index) : 0), 0);
    if (!matched) continue;
    const score = matched / total;
    const own = tokenize(entry.answer.question);
    // a tie goes to the answer whose own question reads most like the visitor's
    const similarity = query.filter((q) => own.some((t) => same(q, t))).length / Math.max(query.length, own.length);
    if (!best || score > best.score + 1e-9 || (Math.abs(score - best.score) <= 1e-9 && similarity > best.similarity)) {
      best = { answer: entry.answer, score, similarity };
    }
  }
  // the tree question must also read like the visitor's: "Vad är en AI-agent?" is not "Vad kostar det att köra en AI-agent?"
  if (!best || best.score < threshold || best.similarity < 0.6 || asked.includes(best.answer.id)) return null;
  return best.answer;
}

/** True when the message carries nothing to match, such as only "hej". */
export const isSmallTalk = (message: string) => tokenize(message).length === 0;
