import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true
    }),
    vitePreprocess(),
    mdsvex(mdsvexConfig)
  ],

  kit: {
    adapter: adapter({ strict: true }),
    prerender: {
      entries: ['*']
    }
  }
};

export default config;
