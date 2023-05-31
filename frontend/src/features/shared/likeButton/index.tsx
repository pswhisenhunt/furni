import * as React from 'react'
import { BASE_IMAGE_URL } from '../../../api/constants'
import { useNavigate } from 'react-router-dom'

interface LikeButtonProps {
  isFilled?: boolean,
  classes?: string[],
  onClick: () => void
}

const LikeButton: React.FC<LikeButtonProps>= ({ isFilled = false, classes = [], onClick }):JSX.Element => {
  let classNames = [ 'like-button', ...classes ]
  // this is temporary and will eventually come from state
  const user = { loggedIn: true }
  const navigate = useNavigate()
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    /* user sessions and login doesn't exist yet. Eventually, I'll check to see if the user is logged in
      if they are, I will add the product to the user's likes by calling the onClick passed in.
      if not, I will navigate to use log in page.
     */
    user.loggedIn ? onClick() : navigate('/login')
  }

  return (
    <button className={classNames.join(' ')} onClick={(e) => handleClick(e)}>
      <img 
        className='like-button-image'
        src={ isFilled ? `${BASE_IMAGE_URL}/filled-heart.svg` : `${BASE_IMAGE_URL}/empty-heart.svg`}
      />
    </button>
  )
}

export default LikeButton