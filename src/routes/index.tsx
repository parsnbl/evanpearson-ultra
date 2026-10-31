import { createFileRoute } from '@tanstack/react-router'
import { ResumePage } from '#/features/resume/ResumePage'
import { resumeSearchSchema } from '#/features/resume/resume.search'
import { buildPersonJsonLd } from '#/shared/seo/json-ld'
import { OgType, buildPageHead } from '#/shared/seo/page-head'
import { SITE } from '#/shared/site'

export const Route = createFileRoute('/')({
  validateSearch: resumeSearchSchema,
  head: () =>
    buildPageHead({
      title: SITE.title,
      description: SITE.description,
      path: '/',
      ogType: OgType.WEBSITE,
      jsonLd: buildPersonJsonLd({
        name: SITE.author.name,
        url: SITE.url,
        jobTitle: SITE.author.jobTitle,
        description: SITE.description,
      }),
    }),
  component: ResumePage,
})
