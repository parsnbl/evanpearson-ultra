import { createFileRoute } from '@tanstack/react-router'
import { css } from 'styled-system/css'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return <h1 className={css({ color: 'accent', p: 'gutter' })}>Evan Pearson</h1>
}
