import { defineConfig } from 'astro/config';
import { astroRedirects, SITE_URL } from './src/content/routes';

export default defineConfig({
  site: SITE_URL,
  redirects: astroRedirects(),
  build: { inlineStylesheets: 'auto' },
});
