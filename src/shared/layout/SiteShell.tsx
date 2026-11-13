import { Link } from '@tanstack/react-router'
import { SITE } from '#/shared/site'

type Props = {
  children: React.ReactNode
}

const NAV_LINKS = [
  { to: '/', label: 'Resume' },
  { to: '/blog', label: 'Blog' },
] as const

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
      <header>
        <nav aria-label="Primary">
          <Link to="/">{SITE.name}</Link>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} activeOptions={{ exact: link.to === '/' }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}
