import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  site: "https://serviestiba.pe",
  integrations: [tailwind(), react()],
  output: "hybrid",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    isr: {
      // caches all pages on first request and saves for 1 day
      expiration: 60 * 60 * 24,
    },
  }),
});
