import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../../app/types'

interface ProductListState {
  items: Product[]
}

const initialState: ProductListState = {
  items: []
}

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Product[]>) {
      state.items = action.payload
    }
  }
})

export const { setItems } = productListSlice.actions

export default productListSlice.reducer
