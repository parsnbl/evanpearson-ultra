export type PersonJsonLd = {
  '@context': 'https://schema.org'
  '@type': 'Person'
  name: string
  url: string
  jobTitle: string
  description: string
}

type PersonReference = {
  '@type': 'Person'
  name: string
  url: string
}

export type BlogPostingJsonLd = {
  '@context': 'https://schema.org'
  '@type': 'BlogPosting'
  headline: string
  description: string
  datePublished: string
  dateModified: string
  url: string
  mainEntityOfPage: { '@type': 'WebPage'; '@id': string }
  author: PersonReference
  publisher: PersonReference
  inLanguage: string
}

export type PersonInput = {
  name: string
  url: string
  jobTitle: string
  description: string
}

export type BlogPostingInput = {
  title: string
  summary: string
  date: string
  url: string
  language: string
  author: { name: string; url: string }
}

/**
 * Builds schema.org `Person` structured data for the home page.
 * @param person - Who the site is about
 * @returns A JSON-LD `Person` object
 * @throws Never
 */
export function buildPersonJsonLd(person: PersonInput): PersonJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    url: person.url,
    jobTitle: person.jobTitle,
    description: person.description,
  }
}

/**
 * Builds schema.org `BlogPosting` structured data for a blog post.
 * @param post - Post metadata plus its absolute URL and author
 * @returns A JSON-LD `BlogPosting` object
 * @throws Never
 */
export function buildBlogPostingJsonLd(
  post: BlogPostingInput,
): BlogPostingJsonLd {
  const author: PersonReference = {
    '@type': 'Person',
    name: post.author.name,
    url: post.author.url,
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    url: post.url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': post.url },
    author,
    publisher: author,
    inLanguage: post.language,
  }
}

/**
 * Serializes JSON-LD for an inline `<script>`, escaping `<` so content cannot close the tag.
 * @param data - JSON-LD object
 * @returns A JSON string safe to embed in HTML
 * @throws {TypeError} If `data` contains a circular reference or BigInt
 */
export function serializeJsonLd(data: PersonJsonLd | BlogPostingJsonLd): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
