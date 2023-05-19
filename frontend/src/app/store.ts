import { configureStore } from "@reduxjs/toolkit"

import categorySlice from "../features/shared/categoryList/categorySlice"
import productList from '../features/shared/productList/productListSlice'
import navBarSlice from "../features/shared/navBar/navBarSlice"
import searchBoxSlice from "../features/shared/searchBox/searchBoxSlice"

export const store = configureStore({
  reducer: {
    categorySlice,
    productList,
    navBarSlice,
    searchBoxSlice
  }
})