import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
// import sitemap from '@astrojs/sitemap'; // Temporarily disabled for i18n compatibility

export default defineConfig({
  site: 'https://eclectic-zuccutto-65eed7.netlify.app',
  integrations: [
    react(),
    tailwind(),
    // sitemap(), // Temporarily disabled for i18n compatibility
  ],
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
