import * as React from 'react'
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_IMAGE_URL } from '../../../../api/constants'
import { Product } from '../../../../app/types'
import { Link } from 'react-router-dom'

import AddToCartButton from '../../addToCartButton'
import Rating from '../../rating'
import LikeButton from '../../likeButton'

interface ProductCardProps {
  product: Product
}
const ProductCard: React.FC<ProductCardProps> = ({ product }): JSX.Element => {
  const images = product.images.length ? product.images : [
    `${BASE_IMAGE_URL}/placeholder_1.svg`,
    `${BASE_IMAGE_URL}/placeholder_2.svg`,
  ]
  const [ currentIndex, setCurrentIndex ] = useState(0)
  const [ toggledLikeButton, setToggleLikeButton ] = useState(false)
  
  const addToLikes = () => {
    /** once users have been created, I'll add the ability to add 
     * this product to a user's likes here. This will be an async action
     * that I will dispatch. Once the product is added, I'll need to
     * render the memoizedLikeButton with isFilled set to true. I'll do that
     * by passing in a value for user.likes to the dependency array
     * for now, it just changes local state so I can see the toggle
     */
    console.log('TO DO..implement this once users are created!!')
    setToggleLikeButton(!toggledLikeButton)
  }
  
  const memoizedRatings = useMemo(() => <Rating value={product.averageRating} productId={product.id}/>, [ product.averageRating ])
  const memoizedAddToCart = useMemo(() => <AddToCartButton classes={['small-button']} id={product.id}/>, [ product.id ])
  const memoizedLikeButton = useMemo(() => <LikeButton isFilled={toggledLikeButton} onClick={addToLikes}/>, [ toggledLikeButton ])

  return (
    <li className='product-card'>
      {memoizedLikeButton}
      <div className='product-card-images'>
        <Link to={`/products/${product.id}`}>
          <img 
            className='product-card-images__current'
            src={images[currentIndex]}
            alt={product.description}
            onMouseOver={() => setCurrentIndex(1)}
            onMouseLeave={() => setCurrentIndex(0)}
          />
        </Link>
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