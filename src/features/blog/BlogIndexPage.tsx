import { Link } from '@tanstack/react-router'
import { formatDisplayDate } from '#/shared/format-date'
import type { PostSummary } from './posts'

type Props = {
  posts: ReadonlyArray<PostSummary>
}

/**
 * Lists every blog post newest first.
 * @param props - Component props
 * @param props.posts - Post summaries, already sorted
 * @returns The blog index
 * @throws Never
 */
export function BlogIndexPage({ posts }: Props) {
  return (
    <>
      <h1>Blog</h1>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <article>
                <h2>
                  <Link to="/blog/$slug" params={{ slug: post.slug }}>
                    {post.title}
                  </Link>
                </h2>
                <time dateTime={post.date}>{formatDisplayDate(post.date)}</time>
                <p>{post.summary}</p>
              </article>
            </li>
          ))}
        </ul>
      )}
      <a href="/rss.xml">RSS feed</a>
    </>
  )
}
