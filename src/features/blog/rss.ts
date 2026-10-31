export type RssItem = {
  title: string
  link: string
  description: string
  date: string
}

export type RssChannel = {
  title: string
  link: string
  feedUrl: string
  description: string
  language: string
  items: ReadonlyArray<RssItem>
}

const XML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
}

/**
 * Escapes the five XML special characters.
 * @param value - Raw text
 * @returns Text safe to place inside XML elements and attributes
 * @throws Never
 */
export function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => XML_ESCAPES[char] ?? char)
}

/**
 * Converts an ISO calendar date (YYYY-MM-DD) to the RFC 822 format RSS requires.
 * @param isoDate - Date string in YYYY-MM-DD form
 * @returns A UTC date string such as "Fri, 30 Oct 2026 00:00:00 GMT"
 * @throws {RangeError} If `isoDate` is not a valid date
 */
export function toRfc822(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00Z`)
  if (Number.isNaN(date.getTime())) {
    throw new RangeError(`Invalid date: ${isoDate}`)
  }
  return date.toUTCString()
}

/**
 * Builds an RSS 2.0 feed document.
 * @param channel - Channel metadata and items, in the order they should appear
 * @returns The feed as an XML string
 * @throws {RangeError} If any item has an invalid date
 */
export function buildRssFeed(channel: RssChannel): string {
  const items = channel.items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid isPermaLink="true">${escapeXml(item.link)}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${toRfc822(item.date)}</pubDate>
    </item>`,
    )
    .join('\n')
  const lastBuildDate = channel.items[0]
    ? `\n    <lastBuildDate>${toRfc822(channel.items[0].date)}</lastBuildDate>`
    : ''

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channel.title)}</title>
    <link>${escapeXml(channel.link)}</link>
    <description>${escapeXml(channel.description)}</description>
    <language>${escapeXml(channel.language)}</language>
    <atom:link href="${escapeXml(channel.feedUrl)}" rel="self" type="application/rss+xml"/>${lastBuildDate}
${items}
  </channel>
</rss>
`
}
