import * as React from 'react'
import { useAppSelector } from '../../../app/hooks'

const ProductPage = () => {
  const product = useAppSelector(state => state.productSlice.selected)
  return (
    <div>{product.description}</div>
  )
}

export default ProductPage
