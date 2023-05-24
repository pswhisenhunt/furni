import * as React from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { Category } from '../../../app/types'
import { fetchSearchResults, fetchProductsForCategory } from '../productList/productListSlice'
import * as product from '../../../../../backend/models/product';

interface ProductListProps {
  category?: Category
}

const ProductList: React.FC<ProductListProps> = ({ category }): JSX.Element => {
  const products = useAppSelector(state => state.productListSlice.products)
  const [ page, setPage ] = useState(0)
  const dispatch = useAppDispatch()
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('query')
    if (query) {
      dispatch(fetchSearchResults(query))
    } else {
      dispatch(fetchProductsForCategory(({ category, page: page })))
    }
  }, [ page ])
  
  return (
    <ul>
      {products.map(product => <li key={product.id}>{product.description}</li>)}
      { page > 0 &&
        <button onClick={() => setPage(page - 1) }>get previous page</button>
      }
      <button onClick={() => setPage(page + 1) }>get next page</button>
    </ul>
  )
}

export default ProductList