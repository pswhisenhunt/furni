import * as React from 'react'
import { Link } from 'react-router-dom'

/*
 the links will be replaced with the categories from the server that will be stored
 in state
*/

interface NavBarProps {
  direction: string
}

const NavBar = ({ direction }: NavBarProps ) => {
  const links = [
    {
      id: 1,
      name: 'bedroom'
    },
    {
      id: 2,
      name: 'living'
    },
    {
      id: 3,
      name: 'dining'
    },
    {
      id: 4,
      name: 'decor'
    }
  ]

  return (
    <div>
      <ul>
        {links.map((link) => {
          const url = `/${link.name}`
          return (
            <Link key={link.id} to={url}>{link.name.toUpperCase()}</Link>
          )
        })}
      </ul>
    </div>
  )
}

export default NavBar

