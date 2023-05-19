import * as React from 'react'
import { useEffect} from 'react'
import { useSearchParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { Product } from '../../../app/types'
import { fetchSearchResults } from '../productList/productListSlice'

interface ProductListProps {
  items: Product[]
}

const ProductListContainer = (props: ProductListProps) => {
  const items = useAppSelector(state => state.productList.items)
  const dispatch = useAppDispatch()
  let [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query')
  
  useEffect(() => {
    if (!query) return
    dispatch(fetchSearchResults(query))
  }, [items])
  
  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.description}</li>)}
    </ul>
  )
}

export default ProductListContainer