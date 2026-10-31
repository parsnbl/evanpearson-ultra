import { defineConfig } from '@content-collections/core'
import type { WriterHook } from '@content-collections/core'
import { posts } from './src/features/blog/posts.collection'
import { landingPages } from './src/features/landing/landing.collection'

/**
 * Marks generated collection modules as server-only so content never reaches the client bundle.
 * @param file - The generated file about to be written
 * @param file.fileType - Kind of generated file
 * @param file.content - Generated source
 * @returns The (possibly prefixed) file content
 * @throws Never
 */
const serverOnlyHook: WriterHook = ({ fileType, content }) =>
  fileType === 'typeDefinition'
    ? { content }
    : { content: `import '@tanstack/react-start/server-only';\n\n${content}` }

export default defineConfig({
  content: [posts, landingPages],
  hooks: { writer: [serverOnlyHook] },
})
