import { notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { renderServerComponent } from '@tanstack/react-start/rsc'
import { allPosts } from 'content-collections'
import { z } from 'zod'
import { mdxComponents } from './mdxComponents'
import { findPostBySlug, sortPostsByDateDesc, toPostSummary } from './posts'

export const getPostSummaries = createServerFn({ method: 'GET' }).handler(() =>
  sortPostsByDateDesc(allPosts).map(toPostSummary),
)

export const getPost = createServerFn({ method: 'GET' })
  .validator(z.object({ slug: z.string().min(1) }))
  .handler(async ({ data }) => {
    const post = findPostBySlug(allPosts, data.slug)
    if (!post) {
      throw notFound()
    }
    const Body = post.mdx
    return {
      ...toPostSummary(post),
      body: await renderServerComponent(<Body components={mdxComponents} />),
    }
  })
