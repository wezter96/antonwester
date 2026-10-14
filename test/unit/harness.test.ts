import { describe, expect, it } from 'vitest';

describe('test harness', () => {
  it('runs TypeScript tests through Astro’s Vite config', () => {
    expect(import.meta.env).toBeDefined();
  });
});
