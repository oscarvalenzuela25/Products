// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({
      include: /src[\\/].*\.[jt]sx?$/,
      babel: {
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              displayName: true,
              ssr: true,
              pure: true,
            },
          ],
        ],
      },
    }),
  ],
});
