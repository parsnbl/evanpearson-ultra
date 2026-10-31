import { createDefaultImport, defineCollection } from '@content-collections/core'
import type { MDXContent } from 'mdx/types'
import { z } from 'zod'

export const posts = defineCollection({
  name: 'posts',
  directory: 'content/posts',
  include: '**/*.mdx',
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    date: z.iso.date(),
    content: z.string(),
  }),
  transform: ({ _meta, ...doc }) => ({
    ...doc,
    slug: _meta.path,
    mdx: createDefaultImport<MDXContent>(`@content/posts/${_meta.filePath}`),
  }),
})
