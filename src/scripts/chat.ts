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
  const quick = root.querySelector<HTMLElement>('[data-chat-quick]')!;
  const form = root.querySelector<HTMLFormElement>('[data-chat-form]')!;
  const input = form.querySelector('input')!;
  const send = form.querySelector('button')!;
  const asked: string[] = [];
  let last = '';
  let busy = false;

  const say = (text: string, who: 'bot' | 'me', extra?: { note?: string; links?: ChatAnswer['links'] }) => {
    const p = document.createElement('p');
    p.className = `msg ${who}`;
    p.textContent = text;
    for (const l of extra?.links ?? []) {
      p.append(document.createElement('br'), Object.assign(document.createElement('a'), { href: l.href, textContent: `${l.label} →`, className: 'lnk' }));
    }
    if (extra?.note) p.append(Object.assign(document.createElement('small'), { textContent: extra.note }));
    log.append(p);
    // a long answer is read from its start, not from where it ends
    log.scrollTop = who === 'bot' && p.offsetHeight > log.clientHeight - 16 ? p.offsetTop - 8 : log.scrollHeight;
    return p;
  };

  type Chip = [label: string, onClick: () => void, className?: string];
  const chips = (items: Chip[]) => quick.replaceChildren(...items.map(([label, onClick, className]) => {
    const b = Object.assign(document.createElement('button'), { type: 'button', textContent: label, className: className ?? '' });
    b.addEventListener('click', onClick);
    return b;
  }));

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

  const showTopics = () => chips(topics.map((topic) => [topic.label, () => showTopic(topic)]));
  const showTopic = (topic: ChatTopic) => {
    say(topic.intro, 'bot');
    chips([...topic.questions.map((q): Chip => [q.question, () => { say(q.question, 'me'); answer(q.id); }]), [t.otherTopics, showTopics]]);
  };
  const answer = (id: string) => {
    const topic = topics.find((x) => x.questions.some((q) => q.id === id));
    const q = topic?.questions.find((x) => x.id === id);
    if (!topic || !q) return;
    if (!asked.includes(id)) asked.push(id);
    last = q.question;
    say(q.answer, 'bot', { links: q.links });
    const next = topic.questions.filter((x) => x.id !== id && !asked.includes(x.id)).slice(0, 2);
    chips([...next.map((x): Chip => [x.question, () => { say(x.question, 'me'); answer(x.id); }]), contactChip, [t.otherTopics, showTopics]]);
  };

  const ask = async (text: string) => {
    if (busy || text.length < 2) return;
    busy = send.disabled = true;
    last = text;
    input.value = '';
    say(text, 'me');
    chips([]);
    const typing = say(t.typing, 'bot');
    typing.classList.add('typing');
    let turn: Turn = { kind: 'contact' };
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, locale, asked }),
      });
      turn = (await response.json()) as Turn;
    } catch {}
    typing.remove();
    if (turn.kind === 'tree') answer(turn.id);
    else if (turn.kind === 'topics') { say(t.greeting, 'bot'); showTopics(); }
    else if (turn.kind === 'ai') { say(turn.text, 'bot', { note: t.aiNote }); chips([contactChip, [t.otherTopics, showTopics]]); }
    else { say(t.fallback, 'bot'); chips([contactChip, [t.otherTopics, showTopics]]); }
    // a tree answer names its own question as the one to send; the visitor's words are better
    last = text;
    busy = send.disabled = false;
  };

  const open = () => {
    panel.hidden = false;
    launch.setAttribute('aria-expanded', 'true');
    if (!log.childElementCount) {
      say(t.greeting, 'bot');
      showTopics();
    }
    input.focus();
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
    void ask(input.value.trim());
  });
}
