import * as React from 'react'
import NavBar from '../shared/navBar'

interface HeaderProps {
  title: string
}

/** 
 * create an icon component with an image and label prop...the label will be based on
 * whether a user is logged in or not for the user
*/
const Header = ({ title }: HeaderProps  ) => {
  return (
    <header>
      <div>
        <h1>{title}</h1>
        <div className='header-icons'>
          <img alt='signin'/>
          <img alt='likes'/>
          <img alt='cart'/>
        </div>
      </div>
      <NavBar direction='horizontal' />
    </header>
  )
}

export default Header