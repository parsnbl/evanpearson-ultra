import { css } from 'styled-system/css'
import { ContactForm } from './ContactForm'

const styles = {
  title: css({ fontSize: '4xl', fontWeight: 'bold', mb: '2' }),
  intro: css({ color: 'fg.muted', mb: '8' }),
}

/**
 * Contact page with a short intro and the contact form.
 * @returns The contact page
 * @throws Never
 */
export function ContactPage() {
  return (
    <>
      <h1 className={styles.title}>Contact</h1>
      <p className={styles.intro}>
        Have a project or role in mind? Send me a note.
      </p>
      <ContactForm />
    </>
  )
}
