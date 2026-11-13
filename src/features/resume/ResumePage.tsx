import { MotionConfig, motion } from 'motion/react'
import { SITE } from '#/shared/site'

const PLACEHOLDER_SECTIONS = [
  { id: 'summary', title: 'Summary' },
  { id: 'experience', title: 'Experience' },
  { id: 'skills', title: 'Skills' },
  { id: 'education', title: 'Education' },
] as const

const INTRO_INITIAL = { opacity: 0, y: 12 } as const
const INTRO_ANIMATE = { opacity: 1, y: 0 } as const
const INTRO_TRANSITION = { duration: 0.4, ease: 'easeOut' } as const

/**
 * Interactive resume page with placeholder sections.
 * @returns The resume intro and section list
 * @throws Never
 */
export function ResumePage() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.header
        initial={INTRO_INITIAL}
        animate={INTRO_ANIMATE}
        transition={INTRO_TRANSITION}
      >
        <h1>{SITE.author.name}</h1>
        <p>{SITE.author.jobTitle}</p>
      </motion.header>
      {PLACEHOLDER_SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-title`}
        >
          <h2 id={`${section.id}-title`}>{section.title}</h2>
          <p>Content coming soon.</p>
        </section>
      ))}
    </MotionConfig>
  )
}
