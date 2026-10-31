import { defineCollection, defineConfig} from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import * as z from 'zod'

export const posts = defineCollection({
  name: 'posts',
  directory: 'content/posts',
  include: '**/*.mdx',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.string(),
    content: z.string(),
  }),
  transform: async (doc, ctx) => ({
    ...doc,
    slug: doc._meta.path,
    mdx: await compileMDX(ctx, doc),
  }),
})

export default defineConfig({
  content: [posts],
})