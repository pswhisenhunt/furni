import * as React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { clearActiveLink } from '../shared/navBar/navBarSlice'
import { BASE_IMAGE_URL } from '../../api/constants'

import SearchBox from '../shared/searchBox'
import Icon from '../shared/icon'

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }): JSX.Element => {
  const dispatch = useAppDispatch()

  const handleHomeLinkClick = () => {
    dispatch(clearActiveLink())
  }

  return (
    <header className='header'>
      <h1 className='header-title'>
        <Link to='/' onClick={handleHomeLinkClick}>{title}</Link>
      </h1>
      <SearchBox/>
      <div className='header-icons'>
        <Icon image={`${BASE_IMAGE_URL}/user.svg`} link='/user' label='user' />
        <Icon image={`${BASE_IMAGE_URL}/likes.svg`} link='/user/likes' label='likes' />
        <Icon image={`${BASE_IMAGE_URL}/bag.svg`} link='/cart' label='bag' />
      </div>
    </header>
  )
}

export default Header