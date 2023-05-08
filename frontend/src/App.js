import React from 'react'
import { useEffect } from 'react'
import { useAppDispatch } from './app/hooks'
import { setItems } from './features/shared/productList/productListSlice'
import { getAll } from './api/products'

import ProductListContainer from './features/shared/productList'

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    (async () => {
      const items = await getAll()
      dispatch(setItems(items))
    })()
  }, [])

  return (
    <div>
      <h1>Furni</h1>
      <ProductListContainer/>
    </div>
  )
}

export default App