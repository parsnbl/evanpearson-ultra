import { createFileRoute } from '@tanstack/react-router'
import { getPost } from '#/features/blog/blog.functions'
import { BlogPostPage } from '#/features/blog/BlogPostPage'
import { buildBlogPostingJsonLd } from '#/shared/seo/json-ld'
import { OgType, buildPageHead, toAbsoluteUrl } from '#/shared/seo/page-head'
import { SITE } from '#/shared/site'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => getPost({ data: { slug: params.slug } }),
  head: ({ loaderData, params }) => {
    const path = `/blog/${params.slug}`
    if (!loaderData) {
      return {}
    }
    return buildPageHead({
      title: `${loaderData.title} | ${SITE.name}`,
      description: loaderData.summary,
      path,
      ogType: OgType.ARTICLE,
      publishedTime: loaderData.date,
      jsonLd: buildBlogPostingJsonLd({
        title: loaderData.title,
        summary: loaderData.summary,
        date: loaderData.date,
        url: toAbsoluteUrl(path),
        language: SITE.language,
        author: { name: SITE.author.name, url: SITE.url },
      }),
    })
  },
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
