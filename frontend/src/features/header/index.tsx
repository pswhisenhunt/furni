import * as React from 'react'
import Icon from '../shared/icon'

import { BASE_IMAGE_URL } from '../../api/constants'

interface HeaderProps {
  title: string
}

const Header = ({ title }: HeaderProps  ) => {
  return (
    <header className='header'>
      <h1 className='header-title'>{title}</h1>
      <div className='header-search'>
        <input className='header-search--bar' placeholder='Search'/>
        <img src={`${BASE_IMAGE_URL}/images/looking_glass.svg`} className='header-search--clickable-img'/>
      </div>
      <div className='header-icons'>
        <Icon image={`${BASE_IMAGE_URL}/images/user.svg`} link='#' label='user' />
        <Icon image={`${BASE_IMAGE_URL}/images/likes.svg`} link='#' label='likes' />
        <Icon image={`${BASE_IMAGE_URL}/images/bag.svg`} link='#' label='bag' />
      </div>
    </header>
  )
}

export default Header