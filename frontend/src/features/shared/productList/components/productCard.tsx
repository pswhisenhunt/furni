import * as React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_IMAGE_URL } from '../../../../api/constants'
import { Product } from '../../../../app/types'

import AddToCartButton from '../../addToCartButton'

interface ProductCardProps {
  product: Product
}
const ProductCard: React.FC<ProductCardProps> = ({ product }): JSX.Element => {
  const images = product.images.length ? product.images : [
    `${BASE_IMAGE_URL}/placeholder_1.svg`,
    `${BASE_IMAGE_URL}/placeholder_2.svg`,
  ]
  const [ currentIndex, setCurrentIndex ] = useState(0)
  
  return (
    <li className='product-card'>
      <div className='product-card-images'>
        <img 
          className='product-card-images__current'
          src={images[currentIndex]}
          alt={product.description}
          onMouseOver={() => setCurrentIndex(1)}
          onMouseLeave={() => setCurrentIndex(0)}
        />
      </div>
      <div className='product-card-details'>
        <p className='product-card-details__description'>{product.description}</p>
        <p className='product-card-details__price'>{`$${ (Math.round(product.price)/100).toFixed(2) }`}</p>
      </div>
      <AddToCartButton classes={['small-button']}/>
    </li> 
  )
}

export default ProductCard