import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  // Custom domain (added to Netlify). Drives canonical URLs, OG image + sitemap.
  site: 'https://hannahshandseventsco.com',
  // Netlify adapter enables the on-demand routes Keystatic's admin needs.
  adapter: netlify(),
  integrations: [react(), keystatic(), sitemap()],
});
