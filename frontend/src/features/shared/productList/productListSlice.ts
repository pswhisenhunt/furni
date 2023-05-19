import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Product, Status } from '../../../app/types'
import { post } from '../../../api'
import { SEARCH_PRODUCTS_URL } from '../../../api/constants'

interface ProductListState {
  items: Product[],
  status: Status
}

const initialState: ProductListState = {
  items: [],
  status: 'pending'
}

export const fetchSearchResults = createAsyncThunk('products/searchResults', async (searchTerm: string) => {
  return await post(SEARCH_PRODUCTS_URL, { searchTerm: searchTerm })
})

const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    setItems(state: ProductListState, action: PayloadAction<Product[]>) {
      state.items = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchResults.pending, (state: ProductListState) => {
      state.status = 'pending'
    }),
    builder.addCase(fetchSearchResults.fulfilled, (state: ProductListState, action: PayloadAction<Product[]>) => {
      state.status = 'fulfilled'
      state.items = action.payload
    }),
    builder.addCase(fetchSearchResults.rejected, (state: ProductListState) => {
      state.status = 'rejected'
    })
  }
})

export const { setItems } = productListSlice.actions

export default productListSlice.reducer
