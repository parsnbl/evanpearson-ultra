import { describe, expect, it } from 'vitest'
import {
  buildBlogPostingJsonLd,
  buildPersonJsonLd,
  serializeJsonLd,
} from './json-ld'

describe('buildPersonJsonLd', () => {
  it('builds a schema.org Person', () => {
    expect(
      buildPersonJsonLd({
        name: 'Evan Pearson',
        url: 'https://evan-pearson.com',
        jobTitle: 'Senior Mobile Engineer',
        description: 'Builds apps.',
      }),
    ).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Evan Pearson',
      url: 'https://evan-pearson.com',
      jobTitle: 'Senior Mobile Engineer',
      description: 'Builds apps.',
    })
  })
})

describe('buildBlogPostingJsonLd', () => {
  const posting = buildBlogPostingJsonLd({
    title: 'Hello',
    summary: 'A first post.',
    date: '2026-10-30',
    url: 'https://evan-pearson.com/blog/hello',
    language: 'en',
    author: { name: 'Evan Pearson', url: 'https://evan-pearson.com' },
  })

  it('maps post fields onto BlogPosting properties', () => {
    expect(posting).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Hello',
      description: 'A first post.',
      datePublished: '2026-10-30',
      dateModified: '2026-10-30',
      inLanguage: 'en',
    })
  })

  it('points the main entity at the canonical post URL', () => {
    expect(posting.url).toBe('https://evan-pearson.com/blog/hello')
    expect(posting.mainEntityOfPage).toEqual({
      '@type': 'WebPage',
      '@id': 'https://evan-pearson.com/blog/hello',
    })
  })

  it('uses the author as publisher', () => {
    const person = {
      '@type': 'Person',
      name: 'Evan Pearson',
      url: 'https://evan-pearson.com',
    }
    expect(posting.author).toEqual(person)
    expect(posting.publisher).toEqual(person)
  })

  it('serializes to JSON without loss', () => {
    expect(JSON.parse(JSON.stringify(posting))).toEqual(posting)
  })
})

describe('serializeJsonLd', () => {
  it('escapes < so content cannot close the script tag', () => {
    const json = serializeJsonLd(
      buildPersonJsonLd({
        name: '</script><script>alert(1)</script>',
        url: 'https://evan-pearson.com',
        jobTitle: 'Engineer',
        description: 'x',
      }),
    )
    expect(json).not.toContain('</script>')
    expect(JSON.parse(json)).toMatchObject({
      name: '</script><script>alert(1)</script>',
    })
  })
})
