import { formatDisplayDate } from '#/shared/format-date'
import type { PostSummary } from './posts'

type Props = {
  post: PostSummary
  body: React.ReactNode
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
        <h1>{post.title}</h1>
        <time dateTime={post.date}>{formatDisplayDate(post.date)}</time>
      </header>
      {body}
    </article>
  )
}
