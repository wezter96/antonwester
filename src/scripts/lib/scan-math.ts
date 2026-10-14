import type { Locale } from '../../content/routes';
import type { Mode } from '../../content/types';

export const MODE_WEIGHT: Record<Mode, number> = { you: 0, assist: 0.4, agent: 0.8 };
export const WORK_WEEKS = 46;

export function hoursPerYear(hoursPerWeek: number, steps: ReadonlyArray<{ mode: Mode; share: number }>): number {
  const h = Number.isFinite(hoursPerWeek) ? Math.max(0, hoursPerWeek) : 0;
  const share = steps.reduce((sum, s) => sum + s.share * MODE_WEIGHT[s.mode], 0);
  return Math.round((h * WORK_WEEKS * share) / 10) * 10;
}

export const fullTimeWeeks = (hours: number): number => Math.max(0, Math.round(hours / 40));

export const fillTemplate = (template: string, values: Record<string, string | number>): string =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));

export const formatHours = (n: number, locale: Locale): string =>
  new Intl.NumberFormat(locale === 'sv' ? 'sv-SE' : 'en-GB').format(n);

export interface EstimateInput {
  functionName: string;
  steps: ReadonlyArray<{ label: string; mode: Mode }>;
  modeLabels: Record<Mode, string>;
  hoursPerWeek: number;
  hoursPerYear: number;
  locale: Locale;
  template: { head: string; line: string; total: string };
}

export function estimateMessage(i: EstimateInput): string {
  return [
    fillTemplate(i.template.head, { fn: i.functionName, hours: i.hoursPerWeek }),
    ...i.steps.map((s) => fillTemplate(i.template.line, { step: s.label, mode: i.modeLabels[s.mode] })),
    fillTemplate(i.template.total, { year: formatHours(i.hoursPerYear, i.locale), weeks: fullTimeWeeks(i.hoursPerYear) }),
  ].join('\n');
}
