import type { Locale } from '../content/routes';
import type { Ui } from '../content/types';
import type { ChatAnswer, ChatTopic } from '../lib/chat-tree';

interface ChatData { locale: Locale; topics: ChatTopic[]; email: string; t: Ui['chat'] }
type Turn = { kind: 'topics' } | { kind: 'tree'; id: string } | { kind: 'ai'; text: string } | { kind: 'contact' };

const root = document.querySelector<HTMLElement>('[data-chat]');
const dataEl = root?.querySelector('[data-chat-data]');
if (root && dataEl) {
  const { locale, topics, email, t } = JSON.parse(dataEl.textContent ?? '{}') as ChatData;
  const launch = root.querySelector<HTMLButtonElement>('[data-chat-open]')!;
  const panel = root.querySelector<HTMLElement>('.panel')!;
  const log = root.querySelector<HTMLElement>('[data-chat-log]')!;
  const form = root.querySelector<HTMLFormElement>('[data-chat-form]')!;
  const input = form.querySelector('input')!;
  const send = form.querySelector('button')!;
  const asked: string[] = [];
  const sleep = (ms: number) => new Promise((done) => setTimeout(done, ms));
  let last = '';
  let busy = false;
  // where the current turn starts: the view scrolls there, so a long answer is read from its top
  let turnStart: HTMLElement | null = null;

  const follow = () => {
    const bottom = log.scrollHeight - log.clientHeight;
    const top = turnStart ? Math.min(bottom, turnStart.offsetTop - 12) : bottom;
    log.scrollTo({ top, behavior: 'smooth' });
  };

  const say = (text: string, who: 'bot' | 'me', extra?: { note?: string; links?: ChatAnswer['links'] }) => {
    const p = document.createElement('p');
    p.className = `msg ${who}`;
    p.textContent = text;
    for (const l of extra?.links ?? []) {
      p.append(document.createElement('br'), Object.assign(document.createElement('a'), { href: l.href, textContent: `${l.label} →`, className: 'lnk' }));
    }
    if (extra?.note) p.append(Object.assign(document.createElement('small'), { textContent: extra.note }));
    log.append(p);
    if (who === 'me') turnStart = p;
    follow();
    return p;
  };

  const typing = () => {
    const dots = Object.assign(document.createElement('p'), { className: 'msg bot typing' });
    dots.setAttribute('aria-label', t.typing);
    dots.append(...[0, 1, 2].map(() => document.createElement('i')));
    log.append(dots);
    follow();
    return dots;
  };

  /** A bot message after the typing dots; a longer message takes a little longer to "write", from 0.9 to 1.8 s. */
  const reply = async (text: string, extra?: Parameters<typeof say>[2], wait = true) => {
    if (!wait) return say(text, 'bot', extra);
    const dots = typing();
    await sleep(Math.min(1800, 900 + text.length * 4));
    dots.remove();
    return say(text, 'bot', extra);
  };

  type Chip = [label: string, onClick: () => void, className?: string];
  /** Suggested replies sit in the log as bubbles on the visitor's side; picking one takes the set away. */
  const chips = (items: Chip[]) => {
    log.querySelector('.chips')?.remove();
    if (!items.length) return;
    const group = Object.assign(document.createElement('div'), { className: 'chips' });
    group.append(...items.map(([label, onClick, className], i) => {
      const b = Object.assign(document.createElement('button'), { type: 'button', textContent: label, className: className ?? '' });
      b.style.setProperty('--i', String(i));
      b.addEventListener('click', () => { if (!busy) onClick(); });
      return b;
    }));
    log.append(group);
    follow();
  };

  /** Runs one bot turn; the visitor cannot pick or send while the bot "writes". */
  const turn = async (run: () => Promise<void>) => {
    if (busy) return;
    busy = send.disabled = true;
    chips([]);
    try { await run(); } finally { busy = send.disabled = false; }
  };

  // the visitor's question goes into the page's contact form; pages without one get a mail
  const handoff = () => {
    const contact = document.querySelector<HTMLFormElement>('form[data-contact]');
    if (!contact) {
      location.href = `mailto:${email}?body=${encodeURIComponent(last)}`;
      return;
    }
    contact.querySelector<HTMLTextAreaElement>('textarea[name=message]')!.value = last;
    close();
    contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
    contact.querySelector<HTMLInputElement>('input[name=name]')?.focus({ preventScroll: true });
  };
  const contactChip: Chip = [t.contact, handoff, 'contact'];

  const showTopics = () => chips(topics.map((topic) => [topic.label, () => void turn(() => openTopic(topic))]));
  const pick = (q: ChatAnswer): Chip => [q.question, () => void turn(async () => { say(q.question, 'me'); await answer(q.id); })];
  const otherTopics: Chip = [t.otherTopics, () => void turn(async () => { say(t.otherTopics.replace(/^‹\s*/, ''), 'me'); await reply(t.greeting); showTopics(); })];

  const openTopic = async (topic: ChatTopic) => {
    say(topic.label, 'me');
    await reply(topic.intro);
    chips([...topic.questions.filter((q) => !asked.includes(q.id)).map(pick), otherTopics]);
  };
  const answer = async (id: string, wait = true) => {
    const topic = topics.find((x) => x.questions.some((q) => q.id === id));
    const q = topic?.questions.find((x) => x.id === id);
    if (!topic || !q) return;
    if (!asked.includes(id)) asked.push(id);
    last = q.question;
    await reply(q.answer, { links: q.links }, wait);
    const next = topic.questions.filter((x) => !asked.includes(x.id)).slice(0, 2);
    chips([...next.map(pick), contactChip, otherTopics]);
  };

  const ask = (text: string) => turn(async () => {
    last = text;
    input.value = '';
    say(text, 'me');
    const dots = typing();
    let result: Turn = { kind: 'contact' };
    // the dots show for a second at least, so even a fast answer reads as written
    const [response] = await Promise.allSettled([
      fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text, locale, asked }) })
        .then((r) => r.json() as Promise<Turn>),
      sleep(1000),
    ]);
    if (response.status === 'fulfilled') result = response.value;
    dots.remove();
    if (result.kind === 'tree') await answer(result.id, false);
    else if (result.kind === 'topics') { say(t.greeting, 'bot'); showTopics(); }
    else if (result.kind === 'ai') { say(result.text, 'bot', { note: t.aiNote }); chips([contactChip, otherTopics]); }
    else { say(t.fallback, 'bot'); chips([contactChip, otherTopics]); }
    // a tree answer names its own question as the one to send; the visitor's words are better
    last = text;
  });

  const open = () => {
    panel.hidden = false;
    launch.setAttribute('aria-expanded', 'true');
    if (!log.childElementCount) void turn(async () => { await reply(t.greeting); showTopics(); });
    // a phone keyboard would cover the suggested questions, so only a mouse or trackpad gets the field focused
    if (matchMedia('(pointer: fine)').matches) input.focus();
    else panel.focus();
  };
  const close = () => {
    panel.hidden = true;
    launch.setAttribute('aria-expanded', 'false');
    launch.focus({ preventScroll: true });
  };

  launch.addEventListener('click', open);
  root.querySelector('[data-chat-close]')!.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) close(); });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text.length >= 2) void ask(text);
  });
}
