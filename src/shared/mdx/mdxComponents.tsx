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
  h1: (props) => <h1 {...props} className={styles.h1} />,
  h2: (props) => <h2 {...props} className={styles.h2} />,
  h3: (props) => <h3 {...props} className={styles.h3} />,
  p: (props) => <p {...props} className={styles.p} />,
  a: (props) => <a {...props} className={styles.a} />,
  ul: (props) => <ul {...props} className={styles.ul} />,
  ol: (props) => <ol {...props} className={styles.ol} />,
  li: (props) => <li {...props} className={styles.li} />,
  blockquote: (props) => (
    <blockquote {...props} className={styles.blockquote} />
  ),
  code: (props) => <code {...props} className={styles.code} />,
  pre: (props) => <pre {...props} className={styles.pre} />,
} satisfies MDXComponents
