import * as React from 'react'
import { Link } from 'react-router-dom'

interface ImageLinkProps {
  src: string,
  linkUrl: string,
  description: string,
  size?: string,
  label?: string
}

const ImageLink: React.FC<ImageLinkProps> = ({ src = '', linkUrl = '', description= '', size = '5em', label = '' }): JSX.Element => {
  const imgStyles = {
    width: size,
    height: size
  }
  return (
    <Link to={linkUrl}>
      <img src={src} alt={description} style={imgStyles}/>
      { label && 
        <figcaption className='image-link-label'>{label.toUpperCase()}</figcaption>
      }
    </Link>
  )
}

export default ImageLink