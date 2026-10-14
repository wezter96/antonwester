export function activeSection(tops: readonly number[], line: number): number {
  let index = 0;
  for (let i = 0; i < tops.length; i++) if (tops[i] <= line) index = i;
  return index;
}
