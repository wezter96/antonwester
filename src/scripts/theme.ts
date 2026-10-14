import { activeSection } from './lib/theme-index';

const root = document.documentElement;
const sections = [...document.querySelectorAll<HTMLElement>('[data-ground]')].filter((s) => s !== root);
let tops: number[] = [];
let current = root.dataset.ground ?? 'fog';
let queued = 0;
let lastY = scrollY;

const measure = () => { tops = sections.map((s) => s.getBoundingClientRect().top + scrollY); };
const update = () => {
  queued = 0;
  if (!sections.length) return;
  const ground = sections[activeSection(tops, scrollY + innerHeight * 0.6)].dataset.ground ?? 'fog';
  // a jump (Home, End, a link without Lenis) cuts to the new ground; only scrolling fades through
  const jump = Math.abs(scrollY - lastY) > innerHeight * 1.5;
  lastY = scrollY;
  if (ground === current) return;
  current = ground;
  if (jump) {
    root.classList.remove('ground-ready');
    root.dataset.ground = ground;
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('ground-ready')));
  } else root.dataset.ground = ground;
};

measure();
update();
requestAnimationFrame(() => root.classList.add('ground-ready'));
addEventListener('scroll', () => { if (!queued) queued = requestAnimationFrame(update); }, { passive: true });
addEventListener('resize', () => { measure(); update(); }, { passive: true });
addEventListener('load', () => { measure(); update(); });
