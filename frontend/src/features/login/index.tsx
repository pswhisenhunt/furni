import * as React from 'react'
import { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { userLogin } from '../user/userSlice'

const Login = () => {
  const dispatch = useAppDispatch()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const submitLogin = (e: React.MouseEvent<HTMLButtonElement>)  => {
    e.preventDefault()
    dispatch(userLogin({email, password}))
  }

  return (
    <div className='login'>
      <form className='login-form'>
        <div className='login-form-input'>
          <label htmlFor='email'>email:</label>
          <input
            id='email'
            type='email'
            value={email}
            name="email"
            onChange={({target}) => setEmail(target.value)}
          />
        </div>
        <div className='login-form-input'>
          <label htmlFor='password'>password:</label>
          <input
            id='password'
            type='password'
            value={password}
            name="password"
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button onClick={submitLogin}>login</button>
      </form>
    </div>
  )
}

export default Login