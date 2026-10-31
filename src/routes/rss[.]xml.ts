import { createFileRoute } from '@tanstack/react-router'
import { allPosts } from 'content-collections'
import { sortPostsByDateDesc } from '#/features/blog/posts'
import { buildRssFeed } from '#/features/blog/rss'
import { toAbsoluteUrl } from '#/shared/seo/page-head'
import { SITE } from '#/shared/site'

export const Route = createFileRoute('/rss.xml')({
  server: {
    handlers: {
      GET: () => {
        const feed = buildRssFeed({
          title: SITE.name,
          link: toAbsoluteUrl('/blog'),
          feedUrl: toAbsoluteUrl('/rss.xml'),
          description: SITE.description,
          language: SITE.language,
          items: sortPostsByDateDesc(allPosts).map((post) => ({
            title: post.title,
            link: toAbsoluteUrl(`/blog/${post.slug}`),
            description: post.summary,
            date: post.date,
          })),
        })
        return new Response(feed, {
          headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
        })
      },
    },
  },
})
