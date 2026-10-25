import { chromium, type Page } from 'playwright-core';
import sharp from 'sharp';

const targets: { id: string; url: string; wait: number; storage?: Record<string, string>; prepare?: (page: Page) => Promise<void> }[] = [
  {
    id: 'lingo',
    // a local Lingo with its seeded demo data; the signed-in app shows more than the public login page
    url: `${process.env.LINGO_URL ?? 'http://localhost:3101'}/login`,
    wait: 1500,
    prepare: async (page) => {
      await page.getByLabel(/e-?mail/i).fill('admin@lingo.dev');
      await page.getByLabel(/password/i).fill('password');
      await page.getByRole('button', { name: /sign in/i }).click();
      await page.waitForURL(/dashboard/);
      await page.getByRole('dialog').getByRole('button', { name: /close/i }).click();
      await page.getByRole('link', { name: 'Projects' }).first().click();
      await page.getByText('Lingo Web', { exact: true }).first().click();
      await page.getByText('Translation Queue', { exact: true }).first().click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1500);
    },
  },
  {
    id: 'wez',
    url: process.env.WEZ_URL ?? 'http://localhost:5273',
    wait: 4000,
    // the crew is the point of the case; fold the projects so it shows in the sidebar
    storage: { 'wez:sidebarSections': JSON.stringify({ projects: false, crew: true }) },
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
