import { createFileRoute } from '@tanstack/react-router'
import { getPost } from '#/features/blog/blog.functions'
import { BlogPostPage } from '#/features/blog/BlogPostPage'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => getPost({ data: { slug: params.slug } }),
  component: BlogPostRoute,
})

/**
 * Connects the blog post loader data to the feature page.
 * @returns The blog post page
 * @throws Never
 */
function BlogPostRoute() {
  const { body, ...post } = Route.useLoaderData()
  return <BlogPostPage post={post} body={body} />
}
