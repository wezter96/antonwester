import { chromium, type Page } from 'playwright-core';
import sharp from 'sharp';

const targets: { id: string; url: string; wait: number; storage?: Record<string, string>; prepare?: (page: Page) => Promise<void> }[] = [
  {
    id: 'lingo',
    // the public landing page, signed out
    url: process.env.LINGO_URL ?? 'https://lingo.antonwester.se',
    wait: 2500,
  },
  {
    id: 'sokhem',
    url: 'https://sokhem.se',
    wait: 2500,
    prepare: async (page) => {
      await page.getByRole('button', { name: 'Endast nödvändiga' }).click();
      await page.waitForTimeout(800);
    },
  },
  {
    id: 'wez',
    url: process.env.WEZ_URL ?? 'http://localhost:5273',
    wait: 4000,
    // `bun run demo` in the Wez repo; its threads speak as a mock provider, so the board is the view to show
    prepare: async (page) => {
      await page.locator('button.view-tab[aria-label="Board"]').click();
      await page.waitForTimeout(1500);
    },
  },
];

// `npm run shots -- wez` retakes only the named ones
const only = process.argv.slice(2);
const browser = await chromium.launch({ channel: 'chrome' });
for (const t of targets.filter((t) => only.length === 0 || only.includes(t.id))) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  if (t.storage) {
    await page.addInitScript((entries) => {
      for (const [key, value] of Object.entries(entries)) localStorage.setItem(key, value);
    }, t.storage);
  }
  try {
    await page.goto(t.url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(t.wait);
    await t.prepare?.(page);
    await sharp(await page.screenshot()).webp({ quality: 90, effort: 6 }).toFile(`src/assets/shots/${t.id}.webp`);
    console.log(`captured ${t.id}`);
  } catch (error) {
    console.error(`could not capture ${t.id} from ${t.url}:`, error);
  } finally {
    await page.close();
  }
}
await browser.close();
