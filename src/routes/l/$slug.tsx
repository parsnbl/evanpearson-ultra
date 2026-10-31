import { createFileRoute } from '@tanstack/react-router'
import { getLandingPage } from '#/features/landing/landing.functions'
import { buildWebPageJsonLd } from '#/shared/seo/json-ld'
import { OgType, buildPageHead, toAbsoluteUrl } from '#/shared/seo/page-head'
import { SITE } from '#/shared/site'

export const Route = createFileRoute('/l/$slug')({
  loader: ({ params }) => getLandingPage({ data: { slug: params.slug } }),
  head: ({ loaderData, params }) => {
    const path = `/l/${params.slug}`
    if (!loaderData) {
      return {}
    }
    return buildPageHead({
      title: `${loaderData.title} | ${SITE.name}`,
      description: loaderData.description,
      path,
      ogType: OgType.WEBSITE,
      jsonLd: buildWebPageJsonLd({
        title: loaderData.title,
        description: loaderData.description,
        url: toAbsoluteUrl(path),
        language: SITE.language,
        author: { name: SITE.author.name, url: SITE.url },
      }),
    })
  },
  component: LandingRoute,
})

/**
 * Renders a landing page's server-rendered MDX body.
 * @returns The landing page body
 * @throws Never
 */
function LandingRoute() {
  const { body } = Route.useLoaderData()
  return <>{body}</>
}
