import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react'
import rsc from '@vitejs/plugin-rsc'
import babel from '@rolldown/plugin-babel'
import { cloudflare } from '@cloudflare/vite-plugin'
import contentCollections from '@content-collections/vite'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

const config = defineConfig({
  resolve: {
    tsconfigPaths: true,
    alias: {
      '@content': fileURLToPath(new URL('./content', import.meta.url)),
    },
  },
  plugins: [
    devtools(),
    {
      enforce: 'pre',
      ...mdx({ remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter] }),
    },
    contentCollections({ environment: 'ssr' }),
    cloudflare({
      viteEnvironment: { name: 'ssr', childEnvironments: ['rsc'] },
    }),
    tanstackStart({
      rsc: { enabled: true },
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
      sitemap: { host: 'https://evan-pearson.com' },
    }),
    rsc(),
    viteReact({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    babel({ presets: [reactCompilerPreset()] }),
  ],
})

export default config
