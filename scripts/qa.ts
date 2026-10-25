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

// 2. Reduced motion: content visible at once, no Lenis, no drift, no tweens, every logo readable
{
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`);
  await page.waitForTimeout(200);
  for (const sel of ['.offer', '.nav', '.hero .actions', '[data-letter]']) check(await visible(page, sel), `reduced motion: ${sel} visible within 200 ms`);
  check(!(await page.evaluate(() => document.documentElement.classList.contains('lenis'))), 'reduced motion: Lenis off');
  check((await page.locator('.track').evaluate((el) => getComputedStyle(el).animationName)) === 'none', 'reduced motion: logo drift off');
  const hidden = await page.evaluate(() => [...document.querySelectorAll<HTMLElement>('[data-client]')].filter((el) => {
    const r = el.getBoundingClientRect();
    const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return r.width === 0 || r.left < 0 || r.right > innerWidth || !(hit && (el === hit || el.contains(hit)));
  }).map((el) => el.dataset.client));
  check(hidden.length === 0, `reduced motion: every client logo visible (${hidden.join(', ') || 'all'})`);
  await page.locator('#scan').scrollIntoViewIfNeeded();
  await page.locator('#scan input[type=range]').evaluate((el: HTMLInputElement) => { el.value = '80'; el.dispatchEvent(new Event('input', { bubbles: true })); });
  const early = await page.evaluate(() => new Promise<string>((r) => setTimeout(() => r(document.querySelector('[data-out]')!.textContent!), 50)));
  await page.waitForTimeout(900);
  const late = await page.textContent('[data-out]');
  check(early === late, `reduced motion: scan result lands at once (${early} → ${late})`);
  await page.getByRole('button', { name: 'Ekonomi', exact: true }).click();
  await page.waitForTimeout(30);
  check((await page.locator('#scan .step.out').count()) === 0, 'reduced motion: steps appear without stagger');
  await ctx.close();
}

// 3. Widths: no horizontal scroll, and every name's letters stay inside the viewport
for (const width of [320, 390, 768, 805, 820, 834, 1024, 1440, 2560]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await ctx.newPage();
  for (const path of ['/', '/en/', '/en/case/openaudit/', '/sv/kungalv/', '/sv/ai-kartlaggning/']) {
    await page.goto(`${BASE}${path}`);
    await page.waitForTimeout(2500);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    check(overflow <= 0, `${width}px ${path}: no horizontal overflow (${overflow}px)`);
    const outside = await page.evaluate(() => [...document.querySelectorAll('[data-letter]')].filter((l) => {
      const r = l.getBoundingClientRect();
      return r.left < -1 || r.right > document.documentElement.clientWidth + 1;
    }).length);
    check(outside === 0, `${width}px ${path}: name letters inside the viewport (${outside} outside)`);
  }
  await ctx.close();
}

// 4. Form failure shows the error with the email fallback and re-enables the button
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.route('**/api/contact', (r) => r.fulfill({ status: 500, body: '{}' }));
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

// 6. The name effect goes idle while the pointer rests on it
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => {
    const raf = window.requestAnimationFrame.bind(window);
    (window as unknown as { __raf: number }).__raf = 0;
    window.requestAnimationFrame = (cb) => { (window as unknown as { __raf: number }).__raf++; return raf(cb); };
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`);
  await page.waitForTimeout(4500);
  const rate = async () => {
    const a = await page.evaluate(() => (window as unknown as { __raf: number }).__raf);
    await page.waitForTimeout(1000);
    return (await page.evaluate(() => (window as unknown as { __raf: number }).__raf)) - a;
  };
  await page.mouse.move(5, 890);
  const baseline = await rate();
  const box = (await page.locator('.hero [data-monument]').boundingBox())!;
  await page.mouse.move(box.x + box.width * 0.4, box.y + box.height / 2, { steps: 5 });
  await page.waitForTimeout(3000);
  const resting = await rate();
  check(resting <= baseline * 1.3 + 5, `name effect idles under a resting pointer (${resting}/s vs ${baseline}/s)`);
  await ctx.close();
}

// 7. The ground follows the sections after the layout changes (FAQ items opened)
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`);
  await page.waitForTimeout(1500);
  await page.evaluate(() => document.querySelectorAll('#faq details').forEach((d) => d.setAttribute('open', '')));
  await page.waitForTimeout(300);
  await page.evaluate(() => {
    const faq = document.querySelector<HTMLElement>('#faq')!;
    window.scrollTo({ top: faq.getBoundingClientRect().top + scrollY + faq.offsetHeight * 0.75 - innerHeight * 0.6, behavior: 'instant' });
  });
  await page.waitForTimeout(1200);
  const [ground, faqGround] = await page.evaluate(() => [document.documentElement.dataset.ground, document.querySelector<HTMLElement>('#faq')!.dataset.ground]);
  check(ground === faqGround, `ground follows the FAQ after it grows (${ground} vs ${faqGround})`);
  await ctx.close();
}

await browser.close();
if (failures.length) { console.error(`\n${failures.length} QA failure(s)`); process.exit(1); }
console.log('\nQA passed');
