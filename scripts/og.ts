import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { chromium, type Page } from 'playwright-core';
import { home } from '../src/content/home';
import { allPages, LOCALES, ogPath, type Locale, type PageRef } from '../src/content/routes';
import { headForCase, headForCity, headForHome, headForService } from '../src/lib/seo';

const require = createRequire(import.meta.url);
const dataUrl = (file: string, type: string) => `data:${type};base64,${readFileSync(file).toString('base64')}`;
const font = dataUrl(require.resolve('@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2'), 'font/woff2');
const monogram = readFileSync('public/monogram.svg', 'utf8');
const favicon = readFileSync('public/favicon.svg', 'utf8');
const head = (p: PageRef, l: Locale) =>
  p.kind === 'home' ? headForHome(l) : p.kind === 'service' ? headForService(p.id, l) : p.kind === 'case' ? headForCase(p.id, l) : headForCity(p.id, l);

const CSS = `@font-face{font-family:A;src:url(${font}) format('woff2');font-weight:100 900}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#E7E9E4;color:#0C1E22;font-family:A;padding:64px 64px 52px;display:grid;column-gap:48px}
h1,.name{font-weight:800;font-variation-settings:'wdth' 108;letter-spacing:-.03em;line-height:.95;align-self:center;overflow-wrap:break-word}
.name{text-transform:uppercase;font-variation-settings:'wdth' 100;letter-spacing:-.02em;line-height:.8;white-space:nowrap}
.tail{font-size:34px;line-height:1.3;max-width:30ch;margin-top:28px;font-weight:430}.tail b{font-weight:700}
.foot{grid-area:foot;display:flex;justify-content:space-between;align-items:flex-end;font-weight:700;font-size:26px;padding-top:28px}
.foot svg{width:84px;height:auto}
.shot{grid-area:shot;width:100%;height:100%;object-fit:cover;object-position:top left;min-height:0}`;

const page = (body: string, areas: string) => `<!doctype html><html><head><style>${CSS}body{grid-template:${areas}}</style></head><body>${body}</body></html>`;
const foot = `<div class="foot"><span>Anton Wester</span>${monogram}</div>`;

function card(p: PageRef, l: Locale): string {
  if (p.kind === 'home') {
    const c = home[l];
    return page(`<div style="grid-area:main;align-self:center"><p class="name fit">Anton Wester</p><p class="tail"><b>${c.h1Tail}</b> ${c.offer}</p></div><div class="foot"><span>antonwester.se</span>${monogram}</div>`, `"main" 1fr "foot" auto / minmax(0, 1fr)`);
  }
  const title = head(p, l).title.split(' | ')[0];
  const shot = p.kind === 'case' && existsSync(`src/assets/shots/${p.id}.png`) ? `src/assets/shots/${p.id}.png` : null;
  if (shot) return page(`<h1 class="fit" style="grid-area:title">${title}</h1><img class="shot" src="${dataUrl(shot, 'image/png')}">${foot}`, `"title shot" minmax(0, 1fr) "foot foot" auto / minmax(0, 1fr) minmax(0, 1fr)`);
  return page(`<h1 class="fit" style="grid-area:title">${title}</h1>${foot}`, `"title" 1fr "foot" auto / minmax(0, 1fr)`);
}

/** Shrinks each .fit element until it fits its grid cell, at most 330 px tall when it wraps. */
async function fit(pg: Page): Promise<void> {
  await pg.evaluate(async () => {
    await document.fonts.ready;
    for (const el of document.querySelectorAll<HTMLElement>('.fit')) {
      const nowrap = el.classList.contains('name');
      let size = nowrap ? 200 : 96;
      el.style.fontSize = `${size}px`;
      // no local helper functions here: tsx wraps them in __name, which the page doesn't have
      while ((el.scrollWidth > el.clientWidth || (!nowrap && el.scrollHeight > 330)) && size > 36) el.style.fontSize = `${(size -= 2)}px`;
    }
  });
}

/** An .ico that holds PNG images, which every current browser reads. */
function ico(pngs: Array<{ size: number; data: Buffer }>): Buffer {
  const header = Buffer.alloc(6 + 16 * pngs.length);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(pngs.length, 4);
  let offset = header.length;
  pngs.forEach(({ size, data }, i) => {
    const e = 6 + 16 * i;
    header.writeUInt8(size >= 256 ? 0 : size, e); header.writeUInt8(size >= 256 ? 0 : size, e + 1);
    header.writeUInt16LE(1, e + 4); header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(data.length, e + 8); header.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...pngs.map((p) => p.data)]);
}

async function renderIcons(pg: Page): Promise<void> {
  const out: Record<number, Buffer> = {};
  for (const size of [16, 32, 48, 180, 192, 512]) {
    await pg.setViewportSize({ width: size, height: size });
    await pg.setContent(`<style>html,body{margin:0}svg{display:block;width:${size}px;height:${size}px}</style>${favicon}`);
    out[size] = await pg.screenshot();
  }
  writeFileSync('public/favicon-16x16.png', out[16]);
  writeFileSync('public/favicon-32x32.png', out[32]);
  writeFileSync('public/apple-touch-icon.png', out[180]);
  writeFileSync('public/android-chrome-192x192.png', out[192]);
  writeFileSync('public/android-chrome-512x512.png', out[512]);
  writeFileSync('public/favicon.ico', ico([16, 32, 48].map((size) => ({ size, data: out[size] }))));
}

mkdirSync('public/og', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const pg = await browser.newPage();
await renderIcons(pg);
await pg.setViewportSize({ width: 1200, height: 630 });
for (const p of allPages()) {
  for (const l of LOCALES) {
    await pg.setContent(card(p, l), { waitUntil: 'load' });
    await fit(pg);
    await pg.screenshot({ path: `public${ogPath(p, l)}` });
  }
}
await browser.close();
console.log('icons and og images written');
