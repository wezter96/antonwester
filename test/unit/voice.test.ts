// The measurable half of .claude/skills/human-writing: dashes as punctuation, banned phrases and emoji in
// every text a visitor reads. Rhythm and staging still need someone to read the diff.
import { describe, expect, it } from 'vitest';
import { cases } from '../../src/content/cases';
import { cities } from '../../src/content/cities';
import { home } from '../../src/content/home';
import { scan } from '../../src/content/scan';
import { services } from '../../src/content/services';
import { ui } from '../../src/content/ui';
import { systemPrompt } from '../../worker/chat';

const BANNED = [
  // sv
  'dyka in i', 'dyka ner i', 'frigöra', 'banbrytande', 'revolutionerande', 'transformerande', 'utnyttja', 'låsa upp',
  'sömlös', 'möjliggör', 'holistisk', 'i dagens samhälle', 'i en värld där', 'spelar en avgörande roll',
  'spelar en central roll', 'en rad olika', 'ett brett utbud', 'det är viktigt att', 'det är värt att', 'det bör noteras',
  'nästa nivå',
  // en
  'furthermore', 'moreover', 'additionally', 'in conclusion', 'in summary', 'worth noting', 'needless to say',
  'first and foremost', 'at the end of the day', "in today's world", 'delve', 'dive into', 'unlock', 'tapestry',
  'myriad', 'plays a crucial role', 'sheds light', 'seamless', 'streamline', 'holistic', 'cutting-edge', 'game-changer',
  'transformative', 'unprecedented', 'leverage', 'utilize', 'facilitate', 'foster', 'empower', 'underscore', 'showcase',
  'meticulous',
];
/** Only as a sentence opener: "för det andra" mid-sentence can be fine, "Dessutom, …" never is. */
const OPENERS = ['dessutom', 'vidare', 'sammanfattningsvis', 'avslutningsvis', 'kort sagt', 'för det första', 'slutligen'];
/** Keys that hold addresses, ids or data, not prose. */
const SKIP = new Set(['id', 'slug', 'href', 'url', 'src', 'path', 'logo', 'schemaType', 'applicationCategory', 'license', 'service',
  // year spans in the experience table are data, as the skill allows for tables
  'years']);

function texts(value: unknown, path: string): Array<[string, string]> {
  if (typeof value === 'string') return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => texts(v, `${path}[${i}]`));
  if (!value || typeof value !== 'object') return [];
  return Object.entries(value).filter(([k]) => !SKIP.has(k)).flatMap(([k, v]) => texts(v, `${path}.${k}`));
}

function findings(path: string, text: string): string[] {
  const at = (i: number) => `${path}: …${text.slice(Math.max(0, i - 30), i + 30).replace(/\s+/g, ' ')}…`;
  const out: string[] = [];
  for (const m of text.matchAll(/[–—]/g)) out.push(`dash ${at(m.index)}`);
  for (const b of BANNED) for (const m of text.matchAll(new RegExp(`\\b${b}`, 'gi'))) out.push(`"${b}" ${at(m.index)}`);
  for (const o of OPENERS) for (const m of text.matchAll(new RegExp(`(?:^|[.!?:]\\s+)${o}\\b`, 'gi'))) out.push(`opener "${o}" ${at(m.index)}`);
  for (const m of text.matchAll(/\p{Extended_Pictographic}/gu)) out.push(`emoji ${at(m.index)}`);
  return out;
}

describe('house voice', () => {
  it('catches what it should', () => {
    expect(findings('x', 'Vi bygger — snabbt. Dessutom är det sömlöst.')).toHaveLength(3);
    expect(findings('x', 'Agenten går vidare till nästa steg.')).toHaveLength(0);
  });

  it.each([
    ['home', home], ['services', services], ['cases', cases], ['cities', cities], ['ui', ui], ['scan', scan],
    ['chat prompt', { sv: systemPrompt('sv'), en: systemPrompt('en') }],
  ])('%s has no dashes, banned phrases or emoji', (name, content) => {
    expect(texts(content, name).flatMap(([p, t]) => findings(p, t)).join('\n')).toBe('');
  });
});
