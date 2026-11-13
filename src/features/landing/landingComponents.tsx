import type { MDXComponents } from 'mdx/types'
import { mdxComponents } from '#/shared/mdx/mdxComponents'

type HeroProps = {
  title: string
  children?: React.ReactNode
}

/**
 * Landing page hero with a headline and supporting copy.
 * @param props - Hero props
 * @param props.title - Main headline
 * @param props.children - Supporting copy
 * @returns The hero section
 * @throws Never
 */
export function Hero({ title, children }: HeroProps) {
  return (
    <section>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

export const landingComponents = {
  ...mdxComponents,
  Hero,
} satisfies MDXComponents
