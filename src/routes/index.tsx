import { createFileRoute } from '@tanstack/react-router'
import { ResumePage } from '#/features/resume/ResumePage'
import { resumeSearchSchema } from '#/features/resume/resume.search'

export const Route = createFileRoute('/')({
  validateSearch: resumeSearchSchema,
  component: ResumePage,
})
