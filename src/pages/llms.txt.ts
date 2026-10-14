import { cases } from '../content/cases';
import { home } from '../content/home';
import { CASE_IDS, SERVICE_IDS, urlFor } from '../content/routes';
import { services } from '../content/services';
import { site } from '../content/site';

export function GET() {
  const lines = [
    '# Anton Wester',
    '',
    `> AI-konsult i Göteborg. ${home.sv.offer}`,
    '',
    `${site.company} is Anton Wester’s consultancy in Gothenburg, Sweden. ${home.en.offer} Work is done in Swedish and English, on site in western Sweden and remotely across Sweden.`,
    '',
    '## Services',
    '',
    ...SERVICE_IDS.map((id) => `- [${services[id].sv.name}](${urlFor({ kind: 'service', id }, 'sv')}) / [${services[id].en.name}](${urlFor({ kind: 'service', id }, 'en')}): ${services[id].en.seo.description}`),
    '',
    '## Own products',
    '',
    ...CASE_IDS.map((id) => `- [${cases[id].en.name}](${urlFor({ kind: 'case', id }, 'en')}): ${cases[id].en.tagline}`),
    '',
    '## Contact',
    '',
    `- Email: ${site.email}`,
    `- Book a call: ${site.booking}`,
    `- LinkedIn: ${site.linkedin}`,
    '',
    '## Pages',
    '',
    `- Swedish home: ${urlFor({ kind: 'home' }, 'sv')}`,
    `- English home: ${urlFor({ kind: 'home' }, 'en')}`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
