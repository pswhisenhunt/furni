import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category, Product } from '../../../app/types'

interface ProductState {
  selected: Product
}

const initialState: ProductState = {
  selected: {
    id: '',
    description: '',
    price: 0,
    materials: [],
    categories: [],
    colors: [],
    number: '',
    type: '',
    images: [],
    averageRating: 0
  }
}

const productSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    setSelectedProduct(state: ProductState, action: PayloadAction<Product>) {
      state.selected = action.payload
    }
  },
})

export const { setSelectedProduct } = productSlice.actions

export default productSlice.reducer
