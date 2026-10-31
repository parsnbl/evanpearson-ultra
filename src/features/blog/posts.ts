import type { Post } from 'content-collections'

export type PostSummary = Pick<Post, 'slug' | 'title' | 'summary' | 'date'>

/**
 * Sorts posts newest first by their ISO `date`.
 * @param posts - Posts to sort
 * @returns A new array sorted by date descending
 * @throws Never
 */
export function sortPostsByDateDesc<T extends Pick<Post, 'date'>>(
  posts: ReadonlyArray<T>,
): Array<T> {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date))
}

/**
 * Strips a post down to the fields needed for listings.
 * @param post - Full post including compiled MDX
 * @returns The post's listing fields
 * @throws Never
 */
export function toPostSummary(post: Post): PostSummary {
  return {
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    date: post.date,
  }
}

/**
 * Finds a post by slug.
 * @param posts - Posts to search
 * @param slug - Slug derived from the post's file path
 * @returns The matching post, or `undefined` when none matches
 * @throws Never
 */
export function findPostBySlug(
  posts: ReadonlyArray<Post>,
  slug: string,
): Post | undefined {
  return posts.find((post) => post.slug === slug)
}
