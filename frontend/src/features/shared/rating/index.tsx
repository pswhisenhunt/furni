import * as React from 'react'
import { BASE_IMAGE_URL } from '../../../api/constants'

import Icon from '../icon'

interface RatingProps {
  value: number
}

const Rating: React.FC<RatingProps> = ({ value }): JSX.Element => {
  const max = 5
  const numberOfStarsToFill = Math.ceil(value)
  
  const fillStars = () => {
    const stars = []
    let i = 0
    while (i < max) {
      if (i <= numberOfStarsToFill) {
        stars.push(<Icon image={`${BASE_IMAGE_URL}/star.svg`} classes={['filled-in-star']}/>)
      } else {
        stars.push(<Icon image={`${BASE_IMAGE_URL}/star.svg`}/>)
      }
      i++
    }
    return stars.join(' ')
  }

  return (
    <div>
      {fillStars()}
    </div>
  )
}

export default Rating