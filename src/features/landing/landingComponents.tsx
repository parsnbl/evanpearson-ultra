import type { MDXComponents } from 'mdx/types'
import { hero } from 'styled-system/recipes/hero'
import type { HeroVariant } from 'styled-system/recipes/hero'
import { mdxComponents } from '#/shared/mdx/mdxComponents'

type HeroProps = HeroVariant & {
  title: string
  children?: React.ReactNode
}

/**
 * Landing page hero with a headline and supporting copy.
 * @param props - Hero props
 * @param props.title - Main headline
 * @param props.align - Text alignment variant
 * @param props.children - Supporting copy
 * @returns The hero section
 * @throws Never
 */
export function Hero({ title, align, children }: HeroProps) {
  return (
    <section className={hero({ align })}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

export const landingComponents = {
  ...mdxComponents,
  Hero,
} satisfies MDXComponents
