// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import astroI18next from "astro-i18next";
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(), 
    astroI18next(), 
    tailwind({
      applyBaseStyles: false,
    }), 
    sitemap({
      i18n: {
        defaultLocale: "es",
        locales: {
          en: "en",
          es: "es"
        }
      }
      })
    ],
  
});