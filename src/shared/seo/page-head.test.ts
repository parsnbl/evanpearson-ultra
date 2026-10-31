import { describe, expect, it } from 'vitest'
import { OgType, buildPageHead, toAbsoluteUrl } from './page-head'

describe('toAbsoluteUrl', () => {
  it('resolves a path against the production host', () => {
    expect(toAbsoluteUrl('/blog/hello')).toBe(
      'https://evan-pearson.com/blog/hello',
    )
  })

  it('accepts a custom origin', () => {
    expect(toAbsoluteUrl('/a', 'http://localhost:3000')).toBe(
      'http://localhost:3000/a',
    )
  })
})

describe('buildPageHead', () => {
  const base = {
    title: 'Blog | Evan Pearson',
    description: 'Writing.',
    path: '/blog',
    ogType: OgType.WEBSITE,
  }

  it('emits title, description, Open Graph and Twitter tags', () => {
    const { meta } = buildPageHead(base)
    expect(meta).toEqual(
      expect.arrayContaining([
        { title: 'Blog | Evan Pearson' },
        { name: 'description', content: 'Writing.' },
        { property: 'og:title', content: 'Blog | Evan Pearson' },
        { property: 'og:url', content: 'https://evan-pearson.com/blog' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:title', content: 'Blog | Evan Pearson' },
      ]),
    )
  })

  it('adds a canonical link', () => {
    expect(buildPageHead(base).links).toEqual([
      { rel: 'canonical', href: 'https://evan-pearson.com/blog' },
    ])
  })

  it('omits optional tags when not provided', () => {
    const { meta, scripts } = buildPageHead(base)
    expect(scripts).toEqual([])
    expect(
      meta.some(
        (tag) =>
          'property' in tag && tag.property === 'article:published_time',
      ),
    ).toBe(false)
  })

  it('includes JSON-LD and published time for articles', () => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Evan',
      url: 'https://evan-pearson.com',
      jobTitle: 'Engineer',
      description: 'Hi',
    } as const
    const { meta, scripts } = buildPageHead({
      ...base,
      ogType: OgType.ARTICLE,
      publishedTime: '2026-10-30',
      jsonLd,
    })
    expect(scripts).toEqual([
      { type: 'application/ld+json', children: JSON.stringify(jsonLd) },
    ])
    expect(meta).toContainEqual({
      property: 'article:published_time',
      content: '2026-10-30',
    })
  })
})
