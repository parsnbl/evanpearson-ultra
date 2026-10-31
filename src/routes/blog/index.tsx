import { createFileRoute } from '@tanstack/react-router'
import { getPostSummaries } from '#/features/blog/blog.functions'
import { BlogIndexPage } from '#/features/blog/BlogIndexPage'

export const Route = createFileRoute('/blog/')({
  loader: () => getPostSummaries(),
  component: BlogIndexRoute,
})

/**
 * Connects the blog index loader data to the feature page.
 * @returns The blog index page
 * @throws Never
 */
function BlogIndexRoute() {
  const posts = Route.useLoaderData()
  return <BlogIndexPage posts={posts} />
}
