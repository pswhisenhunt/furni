import * as React from 'react'
import { useAppSelector } from '../../../app/hooks'
import { Product } from '../../../app/types'

interface ProductListProps {
  items: Product[]
}

const ProductListContainer = (props: ProductListProps) => {
  const items = useAppSelector(state => state.productList.items)
  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.description}</li>)}
    </ul>
  )
}

export default ProductListContainer