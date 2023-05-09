import * as React from 'react'

import Header from '../../header'
import Footer from '../../footer'

interface LayoutProps {
  children: JSX.Element
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='layout'>
      <Header title='FURNI'/>
      {children}
      <Footer/>
    </div>
  )
}

export default Layout