import { readdirSync } from 'node:fs'
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
import { SITE } from './src/shared/site.ts'

const landingPages = readdirSync('content/landing')
  .filter((file) => file.endsWith('.mdx'))
  .map((file) => ({ path: `/l/${file.replace(/\.mdx$/, '')}` }))

const config = defineConfig({
  build: {
    rolldownOptions: {
      checks: { sourcemapBroken: false },
    },
  },
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
        failOnError: true,
        autoStaticPathsDiscovery: false,
      },
      pages: [
        { path: '/' },
        { path: '/rss.xml', sitemap: { exclude: true } },
        ...landingPages,
      ],
      sitemap: { enabled: true, host: SITE.url },
    }),
    rsc(),
    viteReact({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    babel({ presets: [reactCompilerPreset()] }),
  ],
})

export default config
