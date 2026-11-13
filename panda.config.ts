import {
  defineConfig,
  defineTokens,
  defineSemanticTokens,
  defineTextStyles,
} from '@pandacss/dev'

/**
 * Evan / "Twops" — personal site theme
 * Direction: cool HUD core, pops of hot. Dark by default, light = "paper spec sheet".
 * Professional core, sci-fi as accent. Chamfers on buttons + one featured card only;
 * square hairline frames elsewhere. Snappy motion.
 *
 * v0.4 anti-slop rules: no italic+highlight emphasis, no ticker bar, no decorative
 * separators/grids/glow/blinking, no numbered section labels or eyebrows,
 * sentence-case labels, 12px text floor. Status dot = still, and it means something.
 *
 * Fonts (load via next/font or @fontsource and expose as CSS vars):
 *   --font-display  Chakra Petch      (wordmark, section numbers, big numerals only) — the sci-fi accent
 *   --font-serif    Newsreader        (big headlines only — the writerly undertone)
 *   --font-sans     IBM Plex Sans     (body + long-form reading)
 *   --font-mono     Berkeley Mono     (UI chrome, metadata, code) — fallback JetBrains Mono
 */

// ───────────────────────────── Core tokens ─────────────────────────────

const tokens = defineTokens({
  colors: {
    // Keywords preset-panda used to provide
    transparent: { value: 'transparent' },
    current: { value: 'currentColor' },
    white: { value: '#FFFFFF' },
    black: { value: '#000000' },
    // Cool base: blue-leaning near-black → fog
    ink: {
      950: { value: '#07090C' },
      900: { value: '#0B0E13' },
      850: { value: '#10141A' },
      800: { value: '#161B23' },
      700: { value: '#212833' },
      600: { value: '#2E3744' },
      500: { value: '#4A5566' },
      400: { value: '#6B7687' },
      300: { value: '#97A1B0' },
      200: { value: '#C3CAD4' },
      100: { value: '#E3E7EC' },
      50: { value: '#F3F5F7' },
    },
    // Primary — brand + interactive
    lime: {
      300: { value: '#D9FF7A' },
      400: { value: '#C6FF3D' },
      500: { value: '#A8E81A' },
      600: { value: '#7FB80A' },
      700: { value: '#5C8A05' },
      800: { value: '#3F6106' },
      900: { value: '#1E2E05' },
    },
    // Secondary — highlight bands, signature moments (sparingly)
    magenta: {
      300: { value: '#FF8AE6' },
      400: { value: '#FF4FD8' },
      500: { value: '#F01FC0' },
      600: { value: '#C40E9C' },
      700: { value: '#8F0A72' },
      900: { value: '#2A0622' },
    },
    // Local flourish (Encinitas sunset) + danger
    coral: {
      400: { value: '#FF7A66' },
      500: { value: '#FF5A47' },
      600: { value: '#D93A2B' },
      700: { value: '#A82A1E' },
    },
    // Warning only
    orange: {
      400: { value: '#FFA53D' },
      500: { value: '#FF8A00' },
      600: { value: '#CC6A00' },
      700: { value: '#8F4A00' },
    },
    // Info / data / secondary HUD glyphs (the Macro cyan)
    cyan: {
      300: { value: '#8FD6CF' }, // Octagon mint — the on-dark default
      400: { value: '#4FE3E0' },
      500: { value: '#19C2C6' },
      600: { value: '#0E8F93' },
      700: { value: '#0A6A6D' },
    },
  },

  fonts: {
    display: {
      value:
        'var(--font-display), "Chakra Petch", "Oxanium", system-ui, sans-serif',
    },
    serif: {
      value:
        'var(--font-serif), "Newsreader", "Source Serif 4", Georgia, serif',
    },
    sans: {
      value:
        'var(--font-sans), "IBM Plex Sans", "Source Sans 3", system-ui, sans-serif',
    },
    mono: {
      value:
        'var(--font-mono), "Berkeley Mono", "JetBrains Mono", ui-monospace, monospace',
    },
  },

  // Major-third-ish scale; display sizes jump harder for the signature moments
  fontSizes: {
    '2xs': { value: '0.6875rem' }, // 11 — avoid for text; legal fine print only
    xs: { value: '0.75rem' }, // 12 — meta floor
    ui: { value: '0.8125rem' }, // 13 — labels
    sm: { value: '0.875rem' }, // 14
    md: { value: '1rem' }, // 16
    lg: { value: '1.1875rem' }, // 19 — blog body
    xl: { value: '1.5rem' }, // 24
    '2xl': { value: '2rem' }, // 32
    '3xl': { value: '2.75rem' }, // 44
    '4xl': { value: '3.75rem' }, // 60
    '5xl': { value: '5rem' }, // 80
    '6xl': { value: '7rem' }, // 112 — hero
  },

  fontWeights: {
    regular: { value: '400' },
    medium: { value: '500' },
    semibold: { value: '600' },
    bold: { value: '700' },
  },

  lineHeights: {
    none: { value: '1' },
    tight: { value: '1.05' },
    snug: { value: '1.2' },
    normal: { value: '1.45' },
    relaxed: { value: '1.65' }, // long-form reading
  },

  letterSpacings: {
    tighter: { value: '-0.03em' }, // serif headlines
    tight: { value: '-0.015em' },
    normal: { value: '0' },
    wide: { value: '0.04em' },
    hud: { value: '0.04em' }, // labels; caps only for nav + tags (labelCaps)
  },

  // Sharp everywhere; chamfers are done with clip-path (see utilities.chamfer)
  radii: {
    none: { value: '0' },
    xs: { value: '2px' }, // focus rings, checkboxes only
    full: { value: '9999px' }, // status dots
  },

  borderWidths: {
    none: { value: '0' },
    hairline: { value: '1px' },
    rule: { value: '2px' },
    band: { value: '4px' }, // accent bar on highlight bands
  },

  sizes: {
    full: { value: '100%' },
    screen: { value: '100vw' },
    dvh: { value: '100dvh' },
    min: { value: 'min-content' },
    max: { value: 'max-content' },
    fit: { value: 'fit-content' },
    measure: { value: '68ch' }, // blog column
    content: { value: '72rem' },
    chrome: { value: '90rem' },
  },

  // 4px grid. Same keys as preset-panda, so p: '4' = 1rem keeps working.
  spacing: {
    0: { value: '0' },
    px: { value: '1px' },
    0.5: { value: '0.125rem' }, // 2
    1: { value: '0.25rem' }, // 4
    1.5: { value: '0.375rem' }, // 6
    2: { value: '0.5rem' }, // 8
    2.5: { value: '0.625rem' }, // 10
    3: { value: '0.75rem' }, // 12
    4: { value: '1rem' }, // 16
    5: { value: '1.25rem' }, // 20 — page gutter
    6: { value: '1.5rem' }, // 24
    7: { value: '1.75rem' }, // 28
    8: { value: '2rem' }, // 32
    10: { value: '2.5rem' }, // 40
    12: { value: '3rem' }, // 48
    14: { value: '3.5rem' }, // 56 — section rhythm
    16: { value: '4rem' }, // 64
    20: { value: '5rem' }, // 80
    24: { value: '6rem' }, // 96
    32: { value: '8rem' }, // 128
    // Chamfer cut sizes
    'chamfer.sm': { value: '6px' },
    'chamfer.md': { value: '10px' },
    'chamfer.lg': { value: '16px' },
  },

  zIndex: {
    base: { value: 0 },
    raised: { value: 1 },
    sticky: { value: 10 }, // top bar
    overlay: { value: 50 },
    toast: { value: 60 },
  },

  opacity: {
    0: { value: '0' },
    60: { value: '0.6' }, // line numbers
    100: { value: '1' },
  },

  durations: {
    instant: { value: '60ms' },
    fast: { value: '120ms' },
    base: { value: '180ms' },
    slow: { value: '280ms' },
  },

  easings: {
    // Snappy & mechanical: quick out, no float
    snap: { value: 'cubic-bezier(0.2, 0, 0, 1)' },
    click: { value: 'cubic-bezier(0.5, 0, 0.1, 1)' },
    linear: { value: 'linear' },
    // Stepped — for counters, the live clock, text-scramble reveals
    steps4: { value: 'steps(4, end)' },
    steps8: { value: 'steps(8, end)' },
  },
})

// ─────────────────────────── Semantic tokens ───────────────────────────
// `base` = dark (default). `_light` = paper spec-sheet mode.

const semanticTokens = defineSemanticTokens({
  colors: {
    bg: {
      canvas: {
        value: { base: '{colors.ink.950}', _light: '{colors.ink.50}' },
      },
      surface: { value: { base: '{colors.ink.900}', _light: '#FFFFFF' } },
      raised: {
        value: { base: '{colors.ink.850}', _light: '{colors.ink.100}' },
      },
      inset: {
        value: { base: '{colors.ink.800}', _light: '{colors.ink.100}' },
      },
    },
    fg: {
      default: {
        value: { base: '{colors.ink.100}', _light: '{colors.ink.900}' },
      },
      muted: {
        value: { base: '{colors.ink.300}', _light: '{colors.ink.600}' },
      },
      subtle: { value: { base: '#7C8798', _light: '{colors.ink.500}' } }, // metadata; AA at all sizes
      inverted: {
        value: { base: '{colors.ink.950}', _light: '{colors.ink.50}' },
      },
    },
    line: {
      grid: { value: { base: '{colors.ink.800}', _light: '{colors.ink.200}' } }, // structural hairlines
      default: {
        value: { base: '{colors.ink.700}', _light: '{colors.ink.200}' },
      },
      strong: {
        value: { base: '{colors.ink.500}', _light: '{colors.ink.400}' },
      },
    },

    // Primary: lime. On light, lime can't carry text — it darkens to olive.
    accent: {
      DEFAULT: {
        value: { base: '{colors.lime.400}', _light: '{colors.lime.800}' },
      }, // text, icons, links
      fill: {
        value: { base: '{colors.lime.400}', _light: '{colors.lime.400}' },
      }, // buttons, bands
      fillHover: {
        value: { base: '{colors.lime.300}', _light: '{colors.lime.500}' },
      },
      onFill: {
        value: { base: '{colors.ink.950}', _light: '{colors.ink.950}' },
      },
      wash: { value: { base: '{colors.lime.900}', _light: '#EEFFC2' } },
    },

    // Highlights (marks, hero underline band) stay in the lime family → accent.wash

    // Signature: magenta, reserved. Off by default — at most one small moment per page.
    signature: {
      value: { base: '{colors.magenta.400}', _light: '{colors.magenta.600}' },
    },

    // Local flourish — the Encinitas coral, for live metadata / footer only
    local: {
      value: { base: '{colors.coral.400}', _light: '{colors.coral.700}' },
    },

    // Data / HUD glyphs
    data: { value: { base: '{colors.cyan.300}', _light: '{colors.cyan.700}' } },

    status: {
      success: {
        value: { base: '{colors.lime.500}', _light: '{colors.lime.800}' },
      },
      info: {
        value: { base: '{colors.cyan.300}', _light: '{colors.cyan.700}' },
      },
      warning: {
        value: { base: '{colors.orange.400}', _light: '{colors.orange.700}' },
      },
      danger: {
        value: { base: '{colors.coral.500}', _light: '{colors.coral.700}' },
      },
    },

    // Status dot (footer). Still, never animated. off = hollow ring using presence.away as border.
    presence: {
      on: { value: { base: '{colors.lime.400}', _light: '{colors.lime.700}' } },
      away: { value: { base: '#7C8798', _light: '{colors.ink.500}' } },
    },

    focus: {
      value: { base: '{colors.lime.400}', _light: '{colors.magenta.600}' },
    },

    // Code blocks — "Twops Octagon" (Monokai Pro Octagon roles, retuned to ink + lime)
    // Matches themes/twops-octagon-{dark,light}.json for Shiki / VS Code.
    code: {
      bg: { value: { base: '#10141A', _light: '#F6F8FA' } },
      bar: { value: { base: '#0B0E13', _light: '#EDF0F3' } },
      line: { value: { base: '#1A1F28', _light: '#E3E7EC' } },
      sel: { value: { base: '#2A3A0E', _light: '#E4F7B8' } },
      lineHl: { value: { base: '#161B23', _light: '#EEF1F4' } },
      DEFAULT: { value: { base: '#E3E7EC', _light: '#161B23' } },
      comment: { value: { base: '#7D8697', _light: '#6B7280' } },
      punct: { value: { base: '#97A1B0', _light: '#4A5566' } },
      keyword: { value: { base: '#FF6E7F', _light: '#C8243F' } },
      func: { value: { base: '#B9E35A', _light: '#4A6E05' } },
      string: { value: { base: '#FFD76D', _light: '#8A6400' } },
      number: { value: { base: '#C39AC9', _light: '#7D3F8C' } },
      type: { value: { base: '#8FD6CF', _light: '#0A6A6D' } },
      param: { value: { base: '#FF9B5E', _light: '#B04A0E' } },
      cursor: { value: { base: '#C6FF3D', _light: '#3F6106' } },
    },
  },

  shadows: {
    // No soft or glowing shadows. Featured items get a crisp 1px accent outline.
    featured: {
      value: {
        base: '0 0 0 1px {colors.lime.400}',
        _light: '0 0 0 1px {colors.lime.800}',
      },
    },
  },
})

// ───────────────────────────── Text styles ─────────────────────────────

const textStyles = defineTextStyles({
  // Big serif headlines. Emphasis = color: 'accent' + fontWeight: 'semibold', upright.
  // Never italic + highlight band (reads as AI default).
  hero: {
    value: {
      fontFamily: 'serif',
      fontWeight: 'medium',
      fontSize: { base: '4xl', md: '6xl' },
      lineHeight: 'tight',
      letterSpacing: 'tighter',
    },
  },
  headline: {
    value: {
      fontFamily: 'serif',
      fontWeight: 'medium',
      fontSize: { base: '2xl', md: '4xl' },
      lineHeight: 'snug',
      letterSpacing: 'tight',
    },
  },
  // Section headings — professional, sentence case
  section: {
    value: {
      fontFamily: 'sans',
      fontWeight: 'semibold',
      fontSize: { base: 'xl', md: '2xl' },
      lineHeight: 'snug',
      letterSpacing: 'tight',
    },
  },
  // Sci-fi accent — wordmark, section numbers, big numerals ONLY (never running text)
  display: {
    value: {
      fontFamily: 'display',
      fontWeight: 'semibold',
      fontSize: { base: 'xl', md: '3xl' },
      lineHeight: 'none',
      letterSpacing: 'wide',
      textTransform: 'uppercase',
    },
  },
  title: {
    value: {
      fontFamily: 'sans',
      fontWeight: 'semibold',
      fontSize: 'xl',
      lineHeight: 'snug',
    },
  },
  body: {
    value: {
      fontFamily: 'sans',
      fontWeight: 'regular',
      fontSize: 'md',
      lineHeight: 'normal',
    },
  },
  prose: {
    value: {
      fontFamily: 'sans',
      fontWeight: 'regular',
      fontSize: 'lg',
      lineHeight: 'relaxed',
    },
  },
  // Mono UI chrome
  label: {
    value: {
      fontFamily: 'mono',
      fontWeight: 'medium',
      fontSize: 'ui',
      lineHeight: 'none',
      letterSpacing: 'hud',
    },
  },
  // Uppercase only for nav + tags
  labelCaps: {
    value: {
      fontFamily: 'mono',
      fontWeight: 'medium',
      fontSize: 'ui',
      lineHeight: 'none',
      letterSpacing: 'hud',
      textTransform: 'uppercase',
    },
  },
  meta: {
    value: {
      fontFamily: 'mono',
      fontWeight: 'regular',
      fontSize: 'xs',
      lineHeight: 'none',
      letterSpacing: 'normal',
    },
  },
  code: {
    value: { fontFamily: 'mono', fontSize: 'sm', lineHeight: 'normal' },
  },
})

// ───────────────────────────── Config ─────────────────────────────

export default defineConfig({
  // preset-base = shorthands, conditions, utilities. No preset-panda: this theme replaces its tokens.
  presets: ['@pandacss/preset-base'],
  strictTokens: true,
  preflight: true,
  include: [
    './src/**/*.{ts,tsx,js,jsx,astro,mdx}',
    './content/**/*.mdx', // only matters if css() ever appears in MDX
  ],
  exclude: [],
  outdir: 'styled-system',

  // Dark is the default; light is opt-in via data-theme="light".
  conditions: {
    extend: {
      light: '[data-theme=light] &',
      dark: '[data-theme=dark] &',
    },
  },

  globalCss: {
    html: {
      bg: 'bg.canvas',
      color: 'fg.default',
      fontFamily: 'sans',
      colorScheme: 'dark',
    },
    '[data-theme=light]': { colorScheme: 'light' },
    '::selection': { bg: 'accent.fill', color: 'accent.onFill' },
    ':focus-visible': {
      outline: '2px solid',
      outlineColor: 'focus',
      outlineOffset: '2px',
    },
    '@media (prefers-reduced-motion: reduce)': {
      '*, *::before, *::after': {
        animationDuration: '0.01ms !important',
        transitionDuration: '0.01ms !important',
      },
    },
  },

  theme: {
    extend: {
      // preset-panda's breakpoints, needed for the { base, md } text styles
      breakpoints: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' },
      tokens,
      semanticTokens,
      textStyles,
    },
  },

  utilities: {
    extend: {
      // css({ chamfer: 'md' }) → clipped top-left + bottom-right corners
      chamfer: {
        values: { sm: '6px', md: '10px', lg: '16px' },
        transform(value: string) {
          return {
            clipPath: `polygon(${value} 0, 100% 0, 100% calc(100% - ${value}), calc(100% - ${value}) 100%, 0 100%, 0 ${value})`,
          }
        },
      },
      // css({ hudGrid: 'md' }) → hairline grid. ONLY behind real grid content
      // (timelines, diagrams, measurement) — never as a decorative background.
      hudGrid: {
        values: { sm: '16px', md: '32px', lg: '64px' },
        transform(value: string) {
          return {
            backgroundImage:
              'linear-gradient(var(--colors-line-grid) 1px, transparent 1px), linear-gradient(90deg, var(--colors-line-grid) 1px, transparent 1px)',
            backgroundSize: `${value} ${value}`,
          }
        },
      },
    },
  },
})
