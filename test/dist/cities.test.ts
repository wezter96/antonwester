import { describe, expect, it } from 'vitest';
import { CITY_IDS, LOCALES, pathFor } from '../../src/content/routes';
import { readDist } from './helpers';

// Eight city pages must not read as near-duplicates of each other (doorway pages).
// Measured on the <main> text with 5-word shingles, the usual near-duplicate signal.
const shingles = (path: string): Set<string> => {
  const main = readDist(path).querySelector('main')!;
  for (const s of main.querySelectorAll('script, style')) s.remove();
  const w = main.textContent.toLowerCase().match(/[\p{L}\p{N}-]+/gu) ?? [];
  return new Set(w.slice(4).map((_, i) => w.slice(i, i + 5).join(' ')));
};

describe('city pages are distinct', () => {
  for (const l of LOCALES) {
    const sets = new Map(CITY_IDS.map((id) => [id, shingles(pathFor({ kind: 'city', id }, l))]));
    for (const id of CITY_IDS) {
      it(`${l} ${id}: at least half its text is its own`, () => {
        const own = sets.get(id)!;
        const others = new Set(CITY_IDS.filter((o) => o !== id).flatMap((o) => [...sets.get(o)!]));
        const unique = [...own].filter((s) => !others.has(s)).length;
        expect(unique / own.size).toBeGreaterThanOrEqual(0.5);
      });
    }
    it(`${l}: no two cities share more than a third of their text`, () => {
      for (const a of CITY_IDS) for (const b of CITY_IDS) {
        if (a >= b) continue;
        const A = sets.get(a)!, B = sets.get(b)!;
        const inter = [...A].filter((s) => B.has(s)).length;
        expect(inter / (A.size + B.size - inter), `${a} vs ${b}`).toBeLessThan(0.33);
      }
    });
  }
});
