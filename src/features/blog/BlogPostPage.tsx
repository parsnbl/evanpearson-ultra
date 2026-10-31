import { css } from 'styled-system/css'
import { formatDisplayDate } from '#/shared/format-date'
import type { PostSummary } from './posts'

type Props = {
  post: PostSummary
  body: React.ReactNode
}

const styles = {
  title: css({ fontSize: '4xl', fontWeight: 'bold', lineHeight: '1.2' }),
  date: css({ display: 'block', color: 'fg.muted', mt: '2', mb: '8' }),
}

/**
 * Renders a single blog post.
 * @param props - Component props
 * @param props.post - The post's metadata
 * @param props.body - The post body, rendered on the server
 * @returns The post article
 * @throws Never
 */
export function BlogPostPage({ post, body }: Props) {
  return (
    <article>
      <header>
        <h1 className={styles.title}>{post.title}</h1>
        <time dateTime={post.date} className={styles.date}>
          {formatDisplayDate(post.date)}
        </time>
      </header>
      {body}
    </article>
  )
}
