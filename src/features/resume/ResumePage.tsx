import { css } from 'styled-system/css'
import { SITE } from '#/shared/site'

const PLACEHOLDER_SECTIONS = [
  { id: 'summary', title: 'Summary' },
  { id: 'experience', title: 'Experience' },
  { id: 'skills', title: 'Skills' },
  { id: 'education', title: 'Education' },
] as const

const styles = {
  intro: css({ mb: 'section' }),
  name: css({ fontSize: '4xl', fontWeight: 'bold', fontFamily: 'heading' }),
  role: css({ fontSize: 'xl', color: 'fg.muted' }),
  section: css({
    mb: '8',
    p: 'gutter',
    bg: 'surface',
    borderWidth: '1px',
    borderColor: 'border',
    borderRadius: 'lg',
  }),
  sectionTitle: css({ fontSize: '2xl', fontWeight: 'semibold', mb: '2' }),
  placeholder: css({ color: 'fg.muted' }),
}

/**
 * Interactive resume page with placeholder sections.
 * @returns The resume intro and section list
 * @throws Never
 */
export function ResumePage() {
  return (
    <>
      <header className={styles.intro}>
        <h1 className={styles.name}>{SITE.author.name}</h1>
        <p className={styles.role}>{SITE.author.jobTitle}</p>
      </header>
      {PLACEHOLDER_SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-title`}
          className={styles.section}
        >
          <h2 id={`${section.id}-title`} className={styles.sectionTitle}>
            {section.title}
          </h2>
          <p className={styles.placeholder}>Content coming soon.</p>
        </section>
      ))}
    </>
  )
}
