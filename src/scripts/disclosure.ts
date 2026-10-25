// every <details> opens and closes by animating its height; without JS, or with reduced motion, it toggles the way the browser does
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const tokens = getComputedStyle(document.documentElement);
const easeOut = tokens.getPropertyValue('--ease-out').trim() || 'ease-out';
const easeInOut = tokens.getPropertyValue('--ease-in-out').trim() || 'ease-in-out';

function bind(details: HTMLDetailsElement): void {
  const summary = details.querySelector<HTMLElement>(':scope > summary');
  if (!summary) return;
  const body = [...details.children].filter((el): el is HTMLElement => el !== summary && el instanceof HTMLElement);
  let running: Animation[] = [];
  let closing = false;

  const closedHeight = () => {
    const s = getComputedStyle(details);
    const frame = parseFloat(s.paddingTop) + parseFloat(s.paddingBottom) + parseFloat(s.borderTopWidth) + parseFloat(s.borderBottomWidth);
    return summary.getBoundingClientRect().height + frame;
  };

  summary.addEventListener('click', (e) => {
    if (reduce.matches) return;
    e.preventDefault();
    // a click mid-animation turns it around from wherever it is
    const opening = closing || !details.open;
    const from = details.getBoundingClientRect().height;
    // a closed body is not rendered, so it fades in from nothing rather than from its computed opacity
    const fades = body.map((el) => (details.open ? Number(getComputedStyle(el).opacity) : 0));
    running.forEach((a) => a.cancel());

    closing = !opening;
    details.toggleAttribute('data-closing', closing);
    details.open = true;
    const to = opening ? details.getBoundingClientRect().height : closedHeight();
    const timing = { duration: opening ? 520 : 400, easing: opening ? easeOut : easeInOut };

    details.style.overflow = 'hidden';
    const height = details.animate({ height: [`${from}px`, `${to}px`] }, timing);
    running = [height, ...body.map((el, i) => el.animate({ opacity: [fades[i], opening ? 1 : 0] }, timing))];
    height.onfinish = () => {
      if (closing) details.open = false;
      closing = false;
      running = [];
      details.removeAttribute('data-closing');
      details.style.overflow = '';
    };
  });
}

document.querySelectorAll('details').forEach(bind);
