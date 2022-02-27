import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
  section: string
}

const Layout = ({ children, title = 'This is the default title', section }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <h1>{section}</h1>
    </header>
    {children}
    <footer>
      <hr />
      <span>made with ❤️ by @thiagoenge</span>
    </footer>
  </div>
)

export default Layout
