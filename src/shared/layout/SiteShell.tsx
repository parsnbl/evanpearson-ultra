import { Link } from '@tanstack/react-router'
import { css } from 'styled-system/css'
import { SITE } from '#/shared/site'

type Props = {
  children: React.ReactNode
}

const NAV_LINKS = [
  { to: '/', label: 'Resume' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
] as const

const styles = {
  header: css({
    borderBottomWidth: '1px',
    borderColor: 'border',
    bg: 'surface',
  }),
  nav: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '4',
    maxW: 'content',
    mx: 'auto',
    px: 'gutter',
    py: '4',
  }),
  brand: css({ fontWeight: 'bold', fontFamily: 'heading' }),
  links: css({ display: 'flex', gap: '4', listStyle: 'none' }),
  link: css({
    color: 'fg.muted',
    _hover: { color: 'fg' },
    '&[data-status="active"]': { color: 'accent' },
  }),
  main: css({ maxW: 'content', mx: 'auto', px: 'gutter', py: 'section' }),
}

/**
 * Site-wide layout shell with the primary navigation.
 * @param props - Component props
 * @param props.children - Page content rendered inside `<main>`
 * @returns The header, nav and main content area
 * @throws Never
 */
export function SiteShell({ children }: Props) {
  return (
    <>
      <header className={styles.header}>
        <nav aria-label="Primary" className={styles.nav}>
          <Link to="/" className={styles.brand}>
            {SITE.name}
          </Link>
          <ul className={styles.links}>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={styles.link}
                  activeOptions={{ exact: link.to === '/' }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
    </>
  )
}
