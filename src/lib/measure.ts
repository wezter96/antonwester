import { resolve } from 'node:path';
import * as fontkit from 'fontkit';

// Build-time only. Vitest and astro build both run from the repo root.
const FONT_FILE = resolve(process.cwd(), 'src/lib/fonts/Archivo-wdth-wght.ttf');

export interface Setting { wdth: number; wght: number; tracking: number }
export const MONUMENT: Setting = { wdth: 100, wght: 800, tracking: -0.02 };

let font: fontkit.Font | null = null;
const load = (): fontkit.Font => (font ??= fontkit.openSync(FONT_FILE));

/** Advance width of `text` in em, uppercased like the monument CSS. */
export function widthEm(text: string, s: Setting = MONUMENT): number {
  const f = load().getVariation({ wdth: s.wdth, wght: s.wght });
  const upper = text.toLocaleUpperCase('sv-SE');
  return f.layout(upper).advanceWidth / f.unitsPerEm + s.tracking * [...upper].length;
}

/** Font size in vw so that the parts (words, or em-widths given as numbers) span `targetVw`. */
export function lineSizeVw(parts: Array<string | number>, targetVw: number, gapEm: number, s: Setting = MONUMENT): number {
  const em = parts.reduce<number>((sum, p) => sum + (typeof p === 'number' ? p : widthEm(p, s)), 0) + gapEm * (parts.length - 1);
  return Math.round((targetVw / em) * 1000) / 1000;
}
