import { home } from '../content/home';
import { pathFor, type Locale, type ServiceId } from '../content/routes';
import { services } from '../content/services';
import { ui } from '../content/ui';

export interface ChatLink { label: string; href: string }
export interface ChatAnswer { id: string; question: string; answer: string; links: ChatLink[] }
export interface ChatTopic { id: string; label: string; intro: string; questions: ChatAnswer[] }

/** The chat's question tree is the site's own FAQs, so it never says anything the pages do not. */
export function chatTopics(locale: Locale): ChatTopic[] {
  const t = ui[locale].chat;
  const general: ChatTopic = {
    id: 'faq', label: t.faqTopic, intro: t.faqIntro,
    questions: home[locale].faq.map((f, i) => ({ id: `faq-${i}`, question: f.q, answer: f.a, links: [] })),
  };
  const perService = (Object.keys(services) as ServiceId[]).map((id): ChatTopic => {
    const s = services[id][locale];
    const links = [{ label: `${t.readMore} ${s.name}`, href: pathFor({ kind: 'service', id }, locale) }];
    return { id, label: s.name, intro: s.promise, questions: s.faq.map((f, i) => ({ id: `${id}-${i}`, question: f.q, answer: f.a, links })) };
  });
  return [general, ...perService];
}
