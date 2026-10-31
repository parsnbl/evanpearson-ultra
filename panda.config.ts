import { defineConfig } from '@pandacss/dev'
import { heroRecipe } from './src/features/landing/recipes/hero.recipe'

export default defineConfig({
  presets: ['@pandacss/preset-base', '@pandacss/preset-panda'],
  preflight: true,
  include: ['./src/**/*.{ts,tsx}', './content/**/*.mdx'],
  exclude: [],
  outdir: 'styled-system',
  globalCss: {
    body: {
      bg: 'bg',
      color: 'fg',
      fontFamily: 'body',
      lineHeight: '1.6',
    },
  },
  theme: {
    extend: {
      recipes: {
        hero: heroRecipe,
      },
      tokens: {
        colors: {
          ink: {
            50: { value: '#f7f7f8' },
            100: { value: '#ececef' },
            300: { value: '#b4b4bd' },
            500: { value: '#6e6e7a' },
            700: { value: '#3a3a42' },
            900: { value: '#16161a' },
            950: { value: '#0c0c0e' },
          },
          brand: {
            400: { value: '#6ea8ff' },
            600: { value: '#2f6fe0' },
          },
        },
        fonts: {
          body: {
            value:
              'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
          },
          heading: { value: '{fonts.body}' },
          mono: { value: 'ui-monospace, SFMono-Regular, Menlo, monospace' },
        },
        spacing: {
          gutter: { value: '1.5rem' },
          section: { value: '4rem' },
        },
        sizes: {
          content: { value: '48rem' },
        },
      },
      semanticTokens: {
        colors: {
          bg: {
            value: { base: '{colors.ink.50}', _osDark: '{colors.ink.950}' },
          },
          surface: {
            value: { base: 'white', _osDark: '{colors.ink.900}' },
          },
          fg: {
            DEFAULT: {
              value: { base: '{colors.ink.900}', _osDark: '{colors.ink.50}' },
            },
            muted: {
              value: { base: '{colors.ink.500}', _osDark: '{colors.ink.300}' },
            },
          },
          border: {
            value: { base: '{colors.ink.100}', _osDark: '{colors.ink.700}' },
          },
          accent: {
            value: {
              base: '{colors.brand.600}',
              _osDark: '{colors.brand.400}',
            },
          },
        },
      },
    },
  },
})
