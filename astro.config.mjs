import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  // Swap to the real domain once it's registered (see ENG-PLAN founder tasks).
  site: 'https://hannahshands.netlify.app',
  // Netlify adapter enables the on-demand routes Keystatic's admin needs.
  adapter: netlify(),
  integrations: [react(), keystatic(), sitemap()],
});
