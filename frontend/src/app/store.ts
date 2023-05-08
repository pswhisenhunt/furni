import { configureStore } from "@reduxjs/toolkit"

import productList from '../features/productList/productListSlice'

export const store = configureStore({
  reducer: {
    productList
  }
})