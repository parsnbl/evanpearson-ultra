import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { SiteShell } from '#/shared/layout/SiteShell'
import { SITE } from '#/shared/site'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: SITE.title },
      { name: 'description', content: SITE.description },
      { name: 'author', content: SITE.author.name },
      { name: 'color-scheme', content: 'light dark' },
      { property: 'og:site_name', content: SITE.name },
      { property: 'og:locale', content: SITE.locale },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
})

/**
 * HTML document shell rendered once on the server.
 * @param props - Component props
 * @param props.children - The matched route tree
 * @returns The full `<html>` document
 * @throws Never
 */
function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE.language}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

/**
 * Root layout that wraps every page in the site shell.
 * @returns The site shell with the active child route
 * @throws Never
 */
function RootLayout() {
  return (
    <SiteShell>
      <Outlet />
    </SiteShell>
  )
}
