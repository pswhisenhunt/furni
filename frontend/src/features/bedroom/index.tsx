import * as React from 'react'
import { useAppSelector } from '../../app/hooks'

import ProductList from '../shared/productList'

const bedroom = () => {
  const categories = useAppSelector(state => state.categorySlice.categories)
  const category = categories.filter(c => c.name === 'bedroom')[0]
  return (
    <main>
      <h1>Bedroom</h1>
      <ProductList category={category}/>
    </main>
  )
}

export default bedroom