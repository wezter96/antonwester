import { chromium } from 'playwright-core';
import sharp from 'sharp';

const targets = [
  { id: 'lingo', url: 'https://lingo.antonwester.se', wait: 2500 },
  { id: 'wez', url: process.env.WEZ_URL ?? 'http://localhost:5273', wait: 4000 },
];

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
for (const t of targets) {
  try {
    await page.goto(t.url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(t.wait);
    await sharp(await page.screenshot()).webp({ quality: 90, effort: 6 }).toFile(`src/assets/shots/${t.id}.webp`);
    console.log(`captured ${t.id}`);
  } catch (error) {
    console.error(`could not capture ${t.id} from ${t.url}:`, error);
  }
}
await browser.close();
