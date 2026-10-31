import { SITE } from '#/shared/site'
import { serializeJsonLd } from './json-ld'
import type { BlogPostingJsonLd, PersonJsonLd } from './json-ld'

export const OgType = { WEBSITE: 'website', ARTICLE: 'article' } as const
type OgTypeValue = (typeof OgType)[keyof typeof OgType]

type MetaTag =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string }

type LinkTag = { rel: string; href: string }

type ScriptTag = { type: 'application/ld+json'; children: string }

export type PageHead = {
  meta: Array<MetaTag>
  links: Array<LinkTag>
  scripts: Array<ScriptTag>
}

export type PageHeadInput = {
  title: string
  description: string
  path: string
  ogType: OgTypeValue
  jsonLd?: PersonJsonLd | BlogPostingJsonLd
  publishedTime?: string
}

/**
 * Resolves a site-relative path to an absolute URL on the production host.
 * @param path - Path beginning with `/`
 * @param origin - Site origin, defaults to the production host
 * @returns The absolute URL as a string
 * @throws {TypeError} If `origin` is not a valid URL
 */
export function toAbsoluteUrl(path: string, origin: string = SITE.url): string {
  return new URL(path, origin).toString()
}

/**
 * Builds the per-route `head()` tags: title, description, canonical, Open Graph, Twitter and JSON-LD.
 * @param input - Page-specific SEO values
 * @returns Meta, link and script tags for a TanStack route `head()`
 * @throws {TypeError} If `input.path` cannot form a valid URL
 */
export function buildPageHead(input: PageHeadInput): PageHead {
  const url = toAbsoluteUrl(input.path)
  const meta: Array<MetaTag> = [
    { title: input.title },
    { name: 'description', content: input.description },
    { property: 'og:title', content: input.title },
    { property: 'og:description', content: input.description },
    { property: 'og:url', content: url },
    { property: 'og:type', content: input.ogType },
    { name: 'twitter:title', content: input.title },
    { name: 'twitter:description', content: input.description },
  ]
  if (input.publishedTime !== undefined) {
    meta.push({
      property: 'article:published_time',
      content: input.publishedTime,
    })
  }
  const scripts: Array<ScriptTag> =
    input.jsonLd === undefined
      ? []
      : [{ type: 'application/ld+json', children: serializeJsonLd(input.jsonLd) }]
  return { meta, links: [{ rel: 'canonical', href: url }], scripts }
}
