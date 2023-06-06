import * as React from 'react'
import { Link } from 'react-router-dom'

interface IconProps {
  image: string,
  label?: string,
  link?: string,
  classes?: string[]
}

const Icon: React.FC<IconProps> = ({ image, label, link, classes = []}): JSX.Element => {
  let classNames = ['icon--img']
  classNames = classes.length > 0 ? [...classNames, ...classes] : classNames
  return (
    <Link to={link} className='icon'>
      <img src={image} alt={label} className={classNames.join(' ')}/>
    </Link>
  )
}

export default Icon