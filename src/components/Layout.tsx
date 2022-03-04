import React, { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
  section: string
}

const Layout = ({ children, title = 'This is the default title', section }: Props) => (
  <div className='content'>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header className='headerWrapper'>
      <div className='container'>
        <h1 className='sectionTitle'>{section}</h1>
      </div>
    </header>
    <main className='main container'>
      {children}
    </main>
    <footer className='footerWrapper'>
      <div className="container">
        <span>made with ❤️ by <a href="https://me.ahazou.com/frontenge">@thiagoenge</a></span>
      </div>
    </footer>
  </div>
)

export default Layout
