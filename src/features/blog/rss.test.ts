import { describe, expect, it } from 'vitest'
import { buildRssFeed, escapeXml, toRfc822 } from './rss'

const channel = {
  title: 'Evan Pearson',
  link: 'https://evan-pearson.com/blog',
  feedUrl: 'https://evan-pearson.com/rss.xml',
  description: 'Writing.',
  language: 'en',
}

describe('escapeXml', () => {
  it('escapes XML special characters', () => {
    expect(escapeXml(`<a href="x">Tom & Jerry's</a>`)).toBe(
      '&lt;a href=&quot;x&quot;&gt;Tom &amp; Jerry&apos;s&lt;/a&gt;',
    )
  })
})

describe('toRfc822', () => {
  it('formats an ISO date as RFC 822 in UTC', () => {
    expect(toRfc822('2026-10-30')).toBe('Fri, 30 Oct 2026 00:00:00 GMT')
  })

  it('throws on an invalid date', () => {
    expect(() => toRfc822('not-a-date')).toThrow(RangeError)
  })
})

describe('buildRssFeed', () => {
  const feed = buildRssFeed({
    ...channel,
    items: [
      {
        title: 'Second & newest',
        link: 'https://evan-pearson.com/blog/second',
        description: 'Newer <post>',
        date: '2026-11-02',
      },
      {
        title: 'First',
        link: 'https://evan-pearson.com/blog/first',
        description: 'Older post',
        date: '2026-10-30',
      },
    ],
  })

  it('produces an RSS 2.0 document with channel metadata', () => {
    expect(feed.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true)
    expect(feed).toContain('<rss version="2.0"')
    expect(feed).toContain('<title>Evan Pearson</title>')
    expect(feed).toContain(
      '<atom:link href="https://evan-pearson.com/rss.xml" rel="self" type="application/rss+xml"/>',
    )
  })

  it('emits one escaped item per post in the given order', () => {
    expect(feed.match(/<item>/g)).toHaveLength(2)
    expect(feed.indexOf('Second &amp; newest')).toBeLessThan(
      feed.indexOf('<title>First</title>'),
    )
    expect(feed).toContain('<description>Newer &lt;post&gt;</description>')
    expect(feed).toContain('<pubDate>Mon, 02 Nov 2026 00:00:00 GMT</pubDate>')
  })

  it('uses the newest item for lastBuildDate', () => {
    expect(feed).toContain(
      '<lastBuildDate>Mon, 02 Nov 2026 00:00:00 GMT</lastBuildDate>',
    )
  })

  it('handles an empty feed', () => {
    const empty = buildRssFeed({ ...channel, items: [] })
    expect(empty).not.toContain('<item>')
    expect(empty).not.toContain('lastBuildDate')
  })
})
