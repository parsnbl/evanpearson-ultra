import { Link } from '@tanstack/react-router'
import { css } from 'styled-system/css'
import { formatDisplayDate } from '#/shared/format-date'
import type { PostSummary } from './posts'

type Props = {
  posts: ReadonlyArray<PostSummary>
}

const styles = {
  title: css({ fontSize: '4xl', fontWeight: 'bold', mb: '8' }),
  list: css({ display: 'grid', gap: '6', listStyle: 'none' }),
  postTitle: css({ fontSize: 'xl', fontWeight: 'semibold', color: 'accent' }),
  date: css({ fontSize: 'sm', color: 'fg.muted' }),
  empty: css({ color: 'fg.muted' }),
  rss: css({ display: 'inline-block', mt: '10', color: 'accent' }),
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
      <h1 className={styles.title}>Blog</h1>
      {posts.length === 0 ? (
        <p className={styles.empty}>No posts yet.</p>
      ) : (
        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post.slug}>
              <article>
                <h2>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className={styles.postTitle}
                  >
                    {post.title}
                  </Link>
                </h2>
                <time dateTime={post.date} className={styles.date}>
                  {formatDisplayDate(post.date)}
                </time>
                <p>{post.summary}</p>
              </article>
            </li>
          ))}
        </ul>
      )}
      <a href="/rss.xml" className={styles.rss}>
        RSS feed
      </a>
    </>
  )
}
