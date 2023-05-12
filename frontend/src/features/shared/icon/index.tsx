import * as React from 'react'
import { Link } from 'react-router-dom'

interface IconProps {
  image: string,
  label?: string,
  link?: string,
}

const Icon = ({ image, label, link }: IconProps) => {
  return (
    <Link to={link} className='icon'>
      <img src={image} alt={label} className='icon--img'/>
    </Link>
  )
}

export default Icon