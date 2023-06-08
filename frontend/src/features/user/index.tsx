import * as React from 'react'
import { useAppSelector } from '../../app/hooks'

import Login from '../login'

const User:React.FC = ():JSX.Element => {
  const user = useAppSelector(state => state.userSlice.user)
  return (
    <React.Fragment>
      { !user.token
        ? <Login/>
        : (
          <div>USER PAGEEE</div>
        )
    }
    </React.Fragment>
  )
}

export default User