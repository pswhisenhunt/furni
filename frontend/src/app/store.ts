import { configureStore } from "@reduxjs/toolkit"

import productList from '../features/shared/productList/productListSlice'

export const store = configureStore({
  reducer: {
    productList
  }
})