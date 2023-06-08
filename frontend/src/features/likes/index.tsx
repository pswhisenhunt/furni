import * as React from 'react'
import { useAppSelector } from '../../app/hooks'

import Login from '../login'

const Likes = () => {
  const user = useAppSelector(state => state.userSlice.user)
  const favorites = user.favorites || []
  
  return (
    <>
      { !user.token 
        ? <Login/>
        : (
          <div className='likes-page'>
            {favorites.map((f) => {
             return (<p key={f.id}>{f.name}</p>)
            })}
          </div> 
        )
      }
    </>
  )
}

export default Likes
