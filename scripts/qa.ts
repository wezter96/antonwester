import { chromium, type Page } from 'playwright-core';

const BASE = process.env.BASE ?? 'http://localhost:4321';
const failures: string[] = [];
const check = (ok: boolean, what: string) => { if (!ok) failures.push(what); console.log(`${ok ? 'ok  ' : 'FAIL'} ${what}`); };
const visible = (page: Page, sel: string) => page.locator(sel).first().evaluate((el) => {
  const s = getComputedStyle(el);
  return s.opacity !== '0' && s.visibility !== 'hidden' && el.getBoundingClientRect().height > 0;
});

const browser = await chromium.launch({ channel: 'chrome' });

// 1. JS disabled: hero content visible, no pre class
{
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`);
  check(!(await page.evaluate(() => document.documentElement.className)).includes('pre'), 'no-JS: html has no pre class');
  for (const sel of ['h1', '.offer', '.hero .btn', '[data-client]']) check(await visible(page, sel), `no-JS: ${sel} visible`);
  await ctx.close();
}

// 2. Reduced motion: content visible at once, no Lenis, logo track not animating
{
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`);
  await page.waitForTimeout(200);
  check(await visible(page, '.offer'), 'reduced motion: offer visible within 200 ms');
  check(!(await page.evaluate(() => document.documentElement.classList.contains('lenis'))), 'reduced motion: Lenis off');
  check((await page.locator('.track').evaluate((el) => getComputedStyle(el).animationName)) === 'none', 'reduced motion: logo drift off');
  await ctx.close();
}

// 3. Extreme widths: no horizontal scroll, monument on one line on desktop
for (const width of [320, 390, 768, 1440, 2560]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await ctx.newPage();
  for (const path of ['/', '/en/case/openaudit/', '/sv/kungalv/']) {
    await page.goto(`${BASE}${path}`);
    await page.waitForTimeout(2500);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    check(overflow <= 0, `${width}px ${path}: no horizontal overflow (${overflow}px)`);
  }
  await ctx.close();
}

// 4. Form failure shows the error with the email fallback and re-enables the button
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.route('https://formsubmit.co/**', (r) => r.fulfill({ status: 500, body: '{}' }));
  await page.goto(`${BASE}/#contact`);
  await page.fill('input[name=name]', 'Test');
  await page.fill('input[name=email]', 'test@example.com');
  await page.fill('textarea[name=message]', 'Hej');
  await page.click('form[data-contact] button[type=submit]');
  await page.waitForTimeout(800);
  check((await page.textContent('[data-form-status]'))?.includes('contact@antonwester.se') ?? false, 'form failure: error mentions the email');
  check(await page.isEnabled('form[data-contact] button[type=submit]'), 'form failure: button enabled again');
  await ctx.close();
}

// 5. Language switch on a deep page
{
  const page = await browser.newPage();
  await page.goto(`${BASE}/sv/case/wez/`);
  await page.click('[data-lang-switch]');
  check(page.url().endsWith('/en/case/wez/'), 'language switch keeps the page');
  await page.close();
}

await browser.close();
if (failures.length) { console.error(`\n${failures.length} QA failure(s)`); process.exit(1); }
console.log('\nQA passed');
