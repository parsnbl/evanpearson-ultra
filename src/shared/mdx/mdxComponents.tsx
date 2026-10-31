import type { MDXComponents } from 'mdx/types'
import { css } from 'styled-system/css'

const styles = {
  h1: css({ fontSize: '3xl', fontWeight: 'bold', mt: '10', mb: '4' }),
  h2: css({ fontSize: '2xl', fontWeight: 'semibold', mt: '10', mb: '3' }),
  h3: css({ fontSize: 'xl', fontWeight: 'semibold', mt: '8', mb: '2' }),
  p: css({ my: '4' }),
  a: css({ color: 'accent', textDecoration: 'underline' }),
  ul: css({ listStyle: 'disc', pl: '6', my: '4' }),
  ol: css({ listStyle: 'decimal', pl: '6', my: '4' }),
  li: css({ my: '1' }),
  blockquote: css({
    borderLeftWidth: '4px',
    borderColor: 'accent',
    pl: '4',
    my: '6',
    color: 'fg.muted',
    fontStyle: 'italic',
  }),
  code: css({
    fontFamily: 'mono',
    fontSize: '0.9em',
    bg: 'surface',
    px: '1',
    borderRadius: 'sm',
  }),
  pre: css({
    fontFamily: 'mono',
    fontSize: 'sm',
    bg: 'surface',
    borderWidth: '1px',
    borderColor: 'border',
    borderRadius: 'md',
    p: '4',
    my: '6',
    overflowX: 'auto',
    '& code': { bg: 'transparent', p: '0' },
  }),
}

export const mdxComponents = {
  h1: ({ children, ...props }) => (
    <h1 {...props} className={styles.h1}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 {...props} className={styles.h2}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 {...props} className={styles.h3}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p {...props} className={styles.p}>
      {children}
    </p>
  ),
  a: ({ children, ...props }) => (
    <a {...props} className={styles.a}>
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul {...props} className={styles.ul}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol {...props} className={styles.ol}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li {...props} className={styles.li}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote {...props} className={styles.blockquote}>
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code {...props} className={styles.code}>
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre {...props} className={styles.pre}>
      {children}
    </pre>
  ),
} satisfies MDXComponents
