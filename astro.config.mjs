import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
// import sitemap from '@astrojs/sitemap'; // Temporarily disabled for i18n compatibility

export default defineConfig({
  site: 'https://your-site-name.netlify.app',  // ← 部署到 Netlify 后，会自动生成这个域名
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
