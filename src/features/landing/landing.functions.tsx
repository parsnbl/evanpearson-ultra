import { notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { renderServerComponent } from '@tanstack/react-start/rsc'
import { allLandingPages } from 'content-collections'
import { z } from 'zod'
import { landingComponents } from './landingComponents'

export const getLandingPage = createServerFn({ method: 'GET' })
  .validator(z.object({ slug: z.string().min(1) }))
  .handler(async ({ data }) => {
    const page = allLandingPages.find((entry) => entry.slug === data.slug)
    if (!page) {
      throw notFound()
    }
    const Body = page.mdx
    return {
      slug: page.slug,
      title: page.title,
      description: page.description,
      body: await renderServerComponent(
        <Body components={landingComponents} />,
      ),
    }
  })
