import * as React from 'react'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setActiveLink } from './navBarSlice'
import { fetchCategories } from '../categoryList/categorySlice'
import { Link } from 'react-router-dom'
import { Category } from '../../../app/types'

interface NavBarProps {
  direction: 'horizontal' | 'vertical',
  activeLink?: string
}

const NavBar = ({ direction }: NavBarProps ) => {
  const dispatch = useAppDispatch()
  const links = useAppSelector(state => state.categorySlice.categories)
  const loadingState = useAppSelector(state => state.categorySlice.status)
  const activeLink = useAppSelector(state => state.navBarSlice.activeLink)
  
  useEffect(() => {
    if (loadingState === 'pending') {
      dispatch(fetchCategories())
    }
  }, [links])

  const handleSetActiveLink = (link: Category) => {
    dispatch(setActiveLink(link))
  }

  return (
    <nav className='nav-bar'>
      <ul className='nav-link-list'>
        {links.map((link) => {
          const url = `/${link.name}`
          const classes = ['nav-link']

          if (link.name === 'clearance') classes.push('cta')
          if (link.id === activeLink.id) classes.push('active')
          
          return (
            <li key={link.id} className={classes.join(' ')} onClick={() => handleSetActiveLink(link)}>
              <Link to={url}>{link.name.toUpperCase()}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default NavBar

