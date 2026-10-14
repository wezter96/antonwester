import { describe, expect, it } from 'vitest';
import { readDist } from './helpers';

// The narrower AI intents get their own pages, and the pages that cover them broadly link to them.
const hrefs = (path: string) => readDist(path).querySelectorAll('main a').map((a) => a.getAttribute('href'));

describe('AI service pages', () => {
  for (const [path, links] of [
    ['/', ['/sv/ai-agenter/', '/sv/ai-automation/']],
    ['/en/', ['/en/ai-agents/', '/en/ai-automation/']],
    ['/sv/ai-utveckling/', ['/sv/ai-agenter/', '/sv/ai-automation/']],
    ['/en/ai-development/', ['/en/ai-agents/', '/en/ai-automation/']],
  ] as const) {
    it(`${path} links to the agent and automation pages`, () => {
      for (const l of links) expect(hrefs(path)).toContain(l);
    });
  }
  it('gives AI-utveckling its own title instead of competing for AI-agenter', () => {
    expect(readDist('/sv/ai-utveckling/').querySelector('title')!.textContent).not.toContain('AI-agenter');
  });
});
