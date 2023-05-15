import * as React from 'react'
import { useAppSelector } from '../../../app/hooks'

import Header from '../../header'
import Footer from '../../footer'
import NavBar from '../navBar'

interface LayoutProps {
  children: JSX.Element
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='layout'>
      <Header title='FURNI'/>
      <NavBar direction='horizontal'/>
      <main className='layout-main'>
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout