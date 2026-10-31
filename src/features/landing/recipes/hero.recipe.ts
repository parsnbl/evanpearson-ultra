import { defineRecipe } from '@pandacss/dev'

export const heroRecipe = defineRecipe({
  className: 'hero',
  description: 'Landing page hero banner',
  base: {
    display: 'grid',
    gap: '4',
    py: 'section',
    '& h1': { fontSize: '4xl', fontWeight: 'bold' },
  },
  variants: {
    align: {
      start: { textAlign: 'start' },
      center: { textAlign: 'center' },
    },
  },
  defaultVariants: { align: 'center' },
  staticCss: ['*'],
})
