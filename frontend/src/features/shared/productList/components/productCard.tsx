import * as React from 'react'
import { useState, useMemo } from 'react'
import { BASE_IMAGE_URL } from '../../../../api/constants'
import { Product } from '../../../../app/types'

import AddToCartButton from '../../addToCartButton'
import Rating from '../../rating'

interface ProductCardProps {
  product: Product
}
const ProductCard: React.FC<ProductCardProps> = ({ product }): JSX.Element => {
  const images = product.images.length ? product.images : [
    `${BASE_IMAGE_URL}/placeholder_1.svg`,
    `${BASE_IMAGE_URL}/placeholder_2.svg`,
  ]
  const [ currentIndex, setCurrentIndex ] = useState(0)
  const memoizedRatings = useMemo(() => <Rating value={product.averageRating} productId={product.id}/>, [product.averageRating])
  const memoizedAddToCart = useMemo(() => <AddToCartButton classes={['small-button']} id={product.id}/>, [ product.id ])
  
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
        <ul className='product-card-details-list'>
          <li className='product-card-details__description'>{product.description}</li>
          <li className='product-card-details__price'>{`$${(product.price).toFixed(2)}`}</li>
        </ul>
        {memoizedRatings}
      </div>
      {memoizedAddToCart}
    </li> 
  )
}

export default ProductCard