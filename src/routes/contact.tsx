import { createFileRoute } from '@tanstack/react-router'
import { ContactPage } from '#/features/contact/ContactPage'
import { OgType, buildPageHead } from '#/shared/seo/page-head'
import { SITE } from '#/shared/site'

export const Route = createFileRoute('/contact')({
  head: () =>
    buildPageHead({
      title: `Contact | ${SITE.name}`,
      description: `Get in touch with ${SITE.author.name}.`,
      path: '/contact',
      ogType: OgType.WEBSITE,
    }),
  component: ContactPage,
})
