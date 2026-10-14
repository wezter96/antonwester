import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse, type HTMLElement } from 'node-html-parser';

export const DIST = join(process.cwd(), 'dist');
export const distPath = (path: string) => join(DIST, path.replace(/^\//, ''), path.endsWith('.xml') || path.endsWith('.txt') ? '' : 'index.html');
export function readDist(path: string): HTMLElement {
  const file = distPath(path);
  if (!existsSync(file)) throw new Error(`missing ${file}`);
  return parse(readFileSync(file, 'utf8'));
}
export const readText = (file: string) => readFileSync(join(DIST, file), 'utf8');
