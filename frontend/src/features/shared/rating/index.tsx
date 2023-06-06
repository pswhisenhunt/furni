import * as React from 'react'
import { BASE_IMAGE_URL } from '../../../api/constants'

import Icon from '../icon'

interface RatingProps {
  value: number,
  productId: string
}

/** Ratings Number below will be replaced once the reviews feature is implemented. It is for display onlt
 * right now.
 */
const Rating: React.FC<RatingProps> = ({ value, productId }): JSX.Element => {
  const max = 5

  const fillStars = () => {
    const stars = []
    const int = Math.floor(value)
    let decimal = Number((value % 1).toFixed(2))
    
    for (let i = 0; i < int; i++) {
      stars.push(<Icon key={`${productId}_${i}`} image={`${BASE_IMAGE_URL}/filled-star.svg`} classes={['star-icon']}/>)
    }

    if (decimal) {
      stars.push(<Icon key={`${productId}_${decimal}`}image={`${BASE_IMAGE_URL}/half-filled-star.svg`} classes={['star-icon']}/>)
    }

    for (let i = stars.length; i < max; i++) {
      stars.push(<Icon key={`${productId}_${i}`} image={`${BASE_IMAGE_URL}/empty-star.svg`} classes={['star-icon']}/>) 
    }

    return stars
  }

  return (
    <div className='product-card-details-ratings'>
      <div>
        {fillStars()}
      </div>
      <div className='ratings-number'>
        {`(${Math.floor(Math.random() * 150)})`}
      </div>
    </div>
  )
}

export default Rating