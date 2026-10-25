for (const form of document.querySelectorAll<HTMLFormElement>('form[data-contact]')) {
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const { ajax, sending = '', success = '', error = '', submit = button?.textContent ?? '' } = form.dataset;
  if (!ajax || !window.fetch || !window.FormData) continue;

  const say = (text: string, state: string) => {
    if (!status) return;
    status.textContent = text;
    status.dataset.state = state;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    say(sending, 'sending');
    if (button) { button.disabled = true; button.textContent = sending; }
    try {
      const response = await fetch(ajax, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
      const result = (await response.json()) as { success?: string | boolean };
      if (!response.ok || String(result.success) === 'false') throw new Error('Contact request failed.');
      form.reset();
      const estimate = form.querySelector<HTMLInputElement>('input[name=estimate]');
      if (estimate) estimate.value = '';
      say(success, 'success');
    } catch (err) {
      console.error('Contact form submission failed.', err);
      say(error, 'error');
    } finally {
      if (button) { button.disabled = false; button.textContent = submit; }
    }
  });
}
