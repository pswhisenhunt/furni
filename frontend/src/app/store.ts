import { configureStore } from "@reduxjs/toolkit"

import categorySlice from "../features/shared/categoryList/categorySlice"
import productListSlice from '../features/shared/productList/productListSlice'
import productSlice from "../features/shared/productPage/productSlice"
import navBarSlice from "../features/shared/navBar/navBarSlice"
import searchBoxSlice from "../features/shared/searchBox/searchBoxSlice"
import filterPanelSlice from "../features/shared/filterPanel/filterPanelSlice"

export const store = configureStore({
  reducer: {
    categorySlice,
    productListSlice,
    productSlice,
    navBarSlice,
    searchBoxSlice,
    filterPanelSlice
  }
})