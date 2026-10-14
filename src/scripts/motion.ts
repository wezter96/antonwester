import { approach, createRipple, kickRipple, lensAt, stepRipple } from './lib/springs';

const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (root.classList.contains('pre')) {
  const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
  Promise.race([fonts, new Promise((r) => setTimeout(r, 1200))]).then(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      root.classList.remove('pre');
      setTimeout(() => root.classList.add('intro-done'), 1900);
    }));
  });
}

function bind(monument: HTMLElement): void {
  const area = monument.closest<HTMLElement>('[data-monument-area]') ?? monument;
  const letters = [...monument.querySelectorAll<HTMLElement>('[data-letter]')];
  const n = letters.length;
  // the footer name sits at wdth 125, the hero at 100; the lens and ripple move around that rest width
  const rest = Number(getComputedStyle(area).getPropertyValue('--mono-wdth')) || 100;
  const ripple = createRipple(n);
  const lens = new Float64Array(n);
  let centers: number[] = [];
  let pointerX: number | null = null;
  let running = false;

  const measure = () => { centers = letters.map((l) => { const r = l.getBoundingClientRect(); return r.left + r.width / 2; }); };
  const armed = () => root.classList.contains('intro-done') && !reduce;
  const frame = () => {
    const width = area.clientWidth || 1;
    let energy = stepRipple(ripple);
    for (let i = 0; i < n; i++) {
      const target = pointerX === null ? 0 : lensAt(pointerX, centers[i], width);
      lens[i] = approach(lens[i], target);
      energy += Math.abs(target - lens[i]);
      const wd = Math.max(68, Math.min(125, rest + lens[i] + ripple.r[i]));
      letters[i].style.fontVariationSettings = `'wdth' ${wd.toFixed(1)}`;
    }
    // stop as soon as everything has settled, even under a resting pointer; the next pointermove restarts it
    if (energy > 0.05) requestAnimationFrame(frame);
    else {
      running = false;
      if (pointerX === null) letters.forEach((l) => { l.style.fontVariationSettings = ''; });
    }
  };
  const run = () => { if (!running) { running = true; requestAnimationFrame(frame); } };

  area.addEventListener('pointerenter', measure);
  area.addEventListener('pointermove', (e) => { if (!armed()) return; if (!centers.length) measure(); pointerX = e.clientX; run(); });
  const leave = () => { pointerX = null; run(); };
  area.addEventListener('pointerleave', leave);
  area.addEventListener('pointercancel', leave);
  monument.addEventListener('pointerdown', (e) => { if (!armed()) return; measure(); kickRipple(ripple, centers, e.clientX, area.clientWidth * 0.035); run(); });
  addEventListener('resize', measure, { passive: true });
}

document.querySelectorAll<HTMLElement>('[data-monument]').forEach(bind);
