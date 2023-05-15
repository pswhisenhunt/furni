import * as React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { clearActiveLink } from '../shared/navBar/navBarSlice'
import { BASE_IMAGE_URL } from '../../api/constants'

import Icon from '../shared/icon'

interface HeaderProps {
  title: string
}

const Header = ({ title }: HeaderProps  ) => {
  const dispatch = useAppDispatch()
  
  const handleHomeLinkClick = () => {
    dispatch(clearActiveLink())
  }

  return (
    <header className='header'>
      <h1 className='header-title'>
        <Link to='/' onClick={handleHomeLinkClick}>{title}</Link>
      </h1>
      <div className='header-search'>
        <input className='header-search--bar' placeholder='Search'/>
        <img src={`${BASE_IMAGE_URL}/looking_glass.svg`} className='header-search--clickable-img'/>
      </div>
      <div className='header-icons'>
        <Icon image={`${BASE_IMAGE_URL}/user.svg`} link='/user' label='user' />
        <Icon image={`${BASE_IMAGE_URL}/likes.svg`} link='/user/likes' label='likes' />
        <Icon image={`${BASE_IMAGE_URL}/bag.svg`} link='/cart' label='bag' />
      </div>
    </header>
  )
}

export default Header