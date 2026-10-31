import { Link } from '@tanstack/react-router'
import { css } from 'styled-system/css'

const styles = {
  title: css({ fontSize: '3xl', fontWeight: 'bold', mb: '4' }),
  link: css({ color: 'accent', textDecoration: 'underline' }),
}

/**
 * Fallback page for unmatched routes and missing content.
 * @returns A not-found message with a link home
 * @throws Never
 */
export function NotFound() {
  return (
    <>
      <h1 className={styles.title}>Page not found</h1>
      <Link to="/" className={styles.link}>
        Back to the resume
      </Link>
    </>
  )
}
