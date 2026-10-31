import { createDefaultImport, defineCollection } from '@content-collections/core'
import type { MDXContent } from 'mdx/types'
import { z } from 'zod'

export const landingPages = defineCollection({
  name: 'landingPages',
  directory: 'content/landing',
  include: '**/*.mdx',
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    content: z.string(),
  }),
  transform: ({ _meta, ...doc }) => ({
    ...doc,
    slug: _meta.path,
    mdx: createDefaultImport<MDXContent>(`@content/landing/${_meta.filePath}`),
  }),
})
