import type { Locale } from '../content/routes';
import type { Mode, ScanFunction } from '../content/types';
import { estimateMessage, fillTemplate, formatHours, fullTimeWeeks, hoursPerYear } from './lib/scan-math';

interface ScanData {
  functions: ScanFunction[];
  modes: Record<Mode, string>;
  stepModeLabel: string;
  yearBack: string;
  message: { head: string; line: string; total: string };
  locale: Locale;
}

const MODES: Mode[] = ['you', 'assist', 'agent'];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = (s: string) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');

for (const tool of document.querySelectorAll<HTMLElement>('[data-scan]')) {
  const dataEl = tool.parentElement?.querySelector('[data-scan-data]') ?? document.querySelector('[data-scan-data]');
  if (!dataEl) continue;
  const data = JSON.parse(dataEl.textContent ?? '{}') as ScanData;
  const list = tool.querySelector<HTMLOListElement>('.steps')!;
  const hours = tool.querySelector<HTMLInputElement>('input[type=range]')!;
  const hoursValue = tool.querySelector<HTMLElement>('[data-hours]');
  const out = tool.querySelector<HTMLElement>('[data-out]')!;
  const live = out.closest<HTMLElement>('[aria-live]');
  const weeks = tool.querySelector<HTMLElement>('[data-weeks]')!;
  const send = tool.querySelector<HTMLAnchorElement>('[data-scan-send]')!;
  let fnIndex = 0;
  let steps = data.functions[0].steps.map((s) => ({ ...s }));
  let shown = hoursPerYear(Number(hours.value), steps);
  let anim = 0;

  const renderSteps = (animate: boolean) => {
    const stagger = animate && !reduce;
    list.innerHTML = steps.map((s, i) => `<li class="step${stagger ? ' out' : ''}" data-step><span>${esc(s.label)}</span><span class="seg" role="group" aria-label="${esc(data.stepModeLabel)}: ${esc(s.label)}">${MODES
      .map((m) => `<button type="button" data-i="${i}" data-mode="${m}" aria-pressed="${s.mode === m}">${esc(data.modes[m])}</button>`).join('')}</span></li>`).join('');
    if (stagger) [...list.children].forEach((li, i) => setTimeout(() => li.classList.remove('out'), 30 + i * 55));
  };
  const update = () => {
    const h = Number(hours.value);
    if (hoursValue) hoursValue.textContent = String(h);
    const target = hoursPerYear(h, steps);
    weeks.textContent = fillTemplate(data.yearBack, { weeks: fullTimeWeeks(target) });
    cancelAnimationFrame(anim);
    if (reduce) {
      shown = target;
      out.textContent = `≈ ${formatHours(shown, data.locale)}`;
      return;
    }
    const from = shown;
    const t0 = performance.now();
    // screen readers wait for aria-busy to clear, so they announce the final number, not the tween
    live?.setAttribute('aria-busy', 'true');
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / 600);
      shown = Math.round(from + (target - from) * (1 - Math.pow(1 - k, 3)));
      out.textContent = `≈ ${formatHours(shown, data.locale)}`;
      if (k < 1) anim = requestAnimationFrame(tick);
      else live?.setAttribute('aria-busy', 'false');
    };
    anim = requestAnimationFrame(tick);
  };

  tool.querySelectorAll<HTMLButtonElement>('[data-fn]').forEach((b, i) => b.addEventListener('click', () => {
    fnIndex = i;
    steps = data.functions[i].steps.map((s) => ({ ...s }));
    tool.querySelectorAll('[data-fn]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    renderSteps(true);
    update();
  }));
  list.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-mode]');
    if (!b) return;
    steps[Number(b.dataset.i)].mode = b.dataset.mode as Mode;
    b.parentElement!.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    update();
  });
  hours.addEventListener('input', update);

  send.setAttribute('href', '#contact');
  send.addEventListener('click', () => {
    const fn = data.functions[fnIndex];
    const total = hoursPerYear(Number(hours.value), steps);
    const message = estimateMessage({
      functionName: fn.name, steps, modeLabels: data.modes, hoursPerWeek: Number(hours.value),
      hoursPerYear: total, locale: data.locale, template: data.message,
    });
    const form = document.querySelector<HTMLFormElement>('form[data-contact]');
    if (!form) return;
    form.querySelector<HTMLTextAreaElement>('textarea[name=message]')!.value = message;
    form.querySelector<HTMLInputElement>('input[name=estimate]')!.value = message;
    const select = form.querySelector<HTMLSelectElement>('select[name=inquiry]');
    if (select) select.selectedIndex = 0;
  });
}
