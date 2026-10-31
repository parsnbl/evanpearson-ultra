import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  presets: ['@pandacss/preset-base', '@pandacss/preset-panda'],
  preflight: true,
  include: ['./src/**/*.{ts,tsx}', './content/**/*.mdx'],
  exclude: [],
  theme: {
    extend: {},
  },
  outdir: 'styled-system',
})
