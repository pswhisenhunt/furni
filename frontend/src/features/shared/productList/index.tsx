import * as React from 'react'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { fetchProductsForCategory } from './productListSlice';

import ProductCard from './components/productCard';

interface ProductListProps {
  title: string
}

const ProductList: React.FC<ProductListProps> = ({ title }): JSX.Element => {
  const dispatch = useAppDispatch()
  const category = useAppSelector(state => state.navBarSlice.activeLink)
  const products = useAppSelector(state => state.productListSlice.products)
  const total = useAppSelector(state => state.productListSlice.total)
  const limit = useAppSelector(state => state.productListSlice.limit)
  const page = useAppSelector(state => state.productListSlice.page)
  
  useEffect(() => {
    dispatch(fetchProductsForCategory({
      category: category,
      limit: limit,
      page: page
    }))
  }, [ page, limit, category ])
  
  return (
    <div className='product-list'>
      <div className='product-list-header'>
        <div className='product-list-header__title'>
          <h1>{title}</h1>
          <h4 className='product-list-header__title-subtitle'>
            Showing {limit} of {total} products
          </h4>
        </div>
      </div>
      <ul className='product-list-cards'>
        { products.map((p) => {
          return <ProductCard key={p.id} product={p}/>
        })}
      </ul>
    </div>
  )
}

export default ProductList