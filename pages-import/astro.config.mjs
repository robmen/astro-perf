import { defineConfig } from 'astro/config';
import { fileFrontmatterRemarkPlugin } from './file-frontmatter-remark-plugin.mjs';

// https://astro.build/config
export default defineConfig({
  experimental: {
    contentCollections: true,
  },
  markdown: {
    remarkPlugins: [ fileFrontmatterRemarkPlugin ],
    extendDefaultPlugins: true,
  },
  site: 'https://www.example.com'
});
