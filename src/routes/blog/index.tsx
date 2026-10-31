import { createFileRoute } from '@tanstack/react-router'
import { getPostSummaries } from '#/features/blog/blog.functions'
import { BlogIndexPage } from '#/features/blog/BlogIndexPage'
import { OgType, buildPageHead } from '#/shared/seo/page-head'
import { SITE } from '#/shared/site'

export const Route = createFileRoute('/blog/')({
  loader: () => getPostSummaries(),
  head: () =>
    buildPageHead({
      title: `Blog | ${SITE.name}`,
      description: `Writing by ${SITE.author.name} on React Native, TypeScript and building for the web.`,
      path: '/blog',
      ogType: OgType.WEBSITE,
    }),
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
