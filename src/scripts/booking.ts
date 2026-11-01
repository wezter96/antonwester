import type { Locale } from '../content/routes';
import type { Ui } from '../content/types';
import { fillTemplate } from './lib/scan-math';
import { addWeeks, currentMonday, groupByDay, lastMonday, weekColumns, weekNumber } from './lib/booking';

interface Config { locale: Locale; siteKey: string; t: Ui['booking'] }
interface Turnstile {
  render(el: HTMLElement, options: Record<string, unknown>): string;
  reset(id: string): void;
  getResponse(id: string): string | undefined;
}
declare global { interface Window { turnstile?: Turnstile } }

const API = '/api/booking';
const TURNSTILE = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

const root = document.querySelector<HTMLElement>('[data-booking]');
if (root) start(root);

function start(root: HTMLElement): void {
  const { locale, siteKey, t } = JSON.parse(root.dataset.config!) as Config;
  const $ = <T extends HTMLElement>(name: string) => root.querySelector<T>(`[data-${name}]`)!;
  const app = $('app'), weekTitle = $('week'), days = $('days'), status = $('status'), down = $('down');
  const prev = $<HTMLButtonElement>('prev'), next = $<HTMLButtonElement>('next');
  const form = $<HTMLFormElement>('form'), chosen = $('chosen'), formStatus = $('form-status');
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const startField = form.querySelector<HTMLInputElement>('input[name="start"]')!;

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const now = new Date();
  const first = currentMonday(now);
  const last = lastMonday(now);
  let week = first;
  let widget: string | null = null;
  let latest = 0; // the newest week load; an older one drops its reply
  let booking = false; // a POST is out, so the chosen time must not change under it

  const say = (el: HTMLElement, text: string, state = '') => {
    el.textContent = text;
    el.dataset.state = state;
  };
  const showDown = () => { app.hidden = true; down.hidden = false; };

  function loadTurnstile(): void {
    if (document.querySelector(`script[src="${TURNSTILE}"]`)) return;
    const script = document.createElement('script');
    script.src = TURNSTILE;
    script.onload = () => {
      try {
        widget = window.turnstile!.render($('turnstile'), {
          sitekey: siteKey, language: locale, theme: document.documentElement.dataset.theme ?? 'auto', 'error-callback': showDown,
        });
      } catch (err) {
        console.error('Turnstile failed.', err);
        showDown();
      }
    };
    // without the check the server refuses every booking, so say it now and not after the form is filled in
    script.onerror = showDown;
    document.head.append(script);
  }

  function choose(button: HTMLButtonElement, iso: string, label: string): void {
    if (booking) return;
    for (const b of days.querySelectorAll('[aria-pressed]')) b.setAttribute('aria-pressed', String(b === button));
    startField.value = iso;
    say(chosen, fillTemplate(t.formHeading, { time: label }));
    say(formStatus, '');
    form.hidden = false;
    chosen.focus();
    loadTurnstile();
  }

  function render(slots: string[]): void {
    const columns = weekColumns(week, groupByDay(slots, timeZone, locale), locale);
    days.replaceChildren(...columns.map((day) => {
      const box = document.createElement('div');
      box.className = 'day';
      const [weekday, ...rest] = day.label.split(' ');
      const head = document.createElement('h3');
      const name = document.createElement('span');
      name.className = 'wd';
      name.textContent = weekday;
      const date = document.createElement('small');
      date.textContent = rest.join(' ');
      head.append(name, ' ', date);
      box.append(head);
      if (!day.times.length) {
        const none = document.createElement('p');
        none.className = 'none';
        none.textContent = t.noTimes;
        box.append(none);
      }
      for (const { iso, time } of day.times) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 't';
        button.textContent = time;
        button.setAttribute('aria-pressed', 'false');
        button.setAttribute('aria-label', `${day.label} ${time}`);
        button.addEventListener('click', () => choose(button, iso, `${day.label} ${time}`));
        box.append(button);
      }
      return box;
    }));
  }

  /** `message` stays in the status line after the load, for the visitor who just lost a time. */
  async function load(message = ''): Promise<void> {
    const asked = ++latest;
    form.hidden = true;
    down.hidden = true;
    weekTitle.textContent = fillTemplate(t.week, { week: weekNumber(week) });
    prev.setAttribute('aria-disabled', String(week <= first));
    next.setAttribute('aria-disabled', String(week >= last));
    days.replaceChildren();
    days.setAttribute('aria-busy', 'true');
    say(status, t.loading);
    try {
      const response = await fetch(`${API}/slots?week=${week}`);
      if (asked !== latest) return;
      days.setAttribute('aria-busy', 'false');
      if (response.status === 429) {
        // the week buttons still work, so the calendar stays and the address sits beside the retry message
        say(status, message || t.limited, 'error');
        down.hidden = false;
        return;
      }
      if (!response.ok) return showDown();
      const { slots } = (await response.json()) as { slots: string[] };
      if (asked !== latest) return;
      render(slots);
      say(status, message || (slots.length ? '' : t.empty), message ? 'error' : '');
    } catch (err) {
      console.error('Booking slots failed.', err);
      if (asked === latest) showDown();
    }
  }

  const go = (button: HTMLButtonElement, weeks: number) => button.addEventListener('click', () => {
    if (booking || button.getAttribute('aria-disabled') === 'true') return;
    week = addWeeks(week, weeks);
    void load();
  });
  go(prev, -1);
  go(next, 1);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!widget || !window.turnstile?.getResponse(widget)) return say(formStatus, t.verify, 'error');
    const label = submit.textContent!;
    const time = chosen.textContent!;
    booking = true;
    submit.disabled = true;
    submit.textContent = t.sending;
    say(formStatus, t.sending);
    let result = 'unavailable';
    try {
      const response = await fetch(API, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
      ({ result } = (await response.json()) as { result: string });
    } catch (err) {
      console.error('Booking failed.', err);
    }
    booking = false;
    submit.disabled = false;
    submit.textContent = label;
    // a token works once, so any answer that keeps the form needs a new one
    window.turnstile!.reset(widget);

    if (result === 'booked') {
      app.hidden = true;
      const done = $('booked');
      say($('booked-time'), time);
      done.hidden = false;
      done.focus();
    } else if (result === 'taken') {
      say(formStatus, '');
      await load(t.taken);
      weekTitle.focus();
    } else if (result === 'limited' || result === 'invalid') {
      say(formStatus, t[result], 'error');
    } else {
      showDown(); // full, unavailable, forbidden
    }
  });

  say($('zone'), fillTemplate(t.zone, { zone: timeZone.replaceAll('_', ' ') }));
  void load();
}
