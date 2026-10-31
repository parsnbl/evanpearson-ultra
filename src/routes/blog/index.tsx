import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/')({ component: BlogIndexPage })

/**
 * Placeholder blog index until the posts collection exists.
 * @returns A heading
 * @throws Never
 */
function BlogIndexPage() {
  return <h1>Blog</h1>
}
