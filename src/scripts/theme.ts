const root = document.documentElement;
const system = matchMedia('(prefers-color-scheme: dark)');
const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : system.matches;
const sync = () => {
  const dark = isDark();
  document.querySelectorAll('[data-theme-toggle]').forEach((b) => b.setAttribute('aria-pressed', String(dark)));
  document.querySelector('meta[name=theme-color]')?.setAttribute('content', dark ? '#0C1E22' : '#E7E9E4');
};

sync();
// the colours only crossfade after the first paint, so a stored theme does not fade in on load
requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('ground-ready')));
system.addEventListener('change', sync);
document.addEventListener('click', (e) => {
  if (!(e.target as Element).closest('[data-theme-toggle]')) return;
  const next = isDark() ? 'light' : 'dark';
  // a choice that matches the system is no choice; the page follows the system again
  if ((next === 'dark') === system.matches) delete root.dataset.theme;
  else root.dataset.theme = next;
  try {
    if (root.dataset.theme) localStorage.setItem('theme', root.dataset.theme);
    else localStorage.removeItem('theme');
  } catch {}
  sync();
});
