import { createSlice, PayloadAction, createAsyncThunk, current } from '@reduxjs/toolkit'
import { Category, Product, Status } from '../../../app/types'
import { post } from '../../../api'
import { SEARCH_PRODUCTS_URL, FETCH_PRODUCTS_BY_CATEGORY_URL } from '../../../api/constants'

interface ProductListState {
  products: Product[],
  total: number,
  limit: number,
  page: number,
  status: Status
}

const initialState: ProductListState = {
  products: [],
  total: 0,
  limit: 10,
  page: 0,
  status: 'pending'
}

export const fetchSearchResults = createAsyncThunk('products/searchResults', async (searchTerm: string) => {
  return await post(SEARCH_PRODUCTS_URL, { searchTerm: searchTerm })
})

export const fetchProductsForCategory = createAsyncThunk('products/fetchByCategory', async ({ category, limit, page }: { category: Category, limit: number, page: number }) => {
  return await post(`${FETCH_PRODUCTS_BY_CATEGORY_URL}/${category.id}`, { limit: limit, page: page })
})

const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSearchResults.pending, (state: ProductListState) => {
      state.status = 'pending'
    }),
    builder.addCase(fetchSearchResults.fulfilled, (state: ProductListState, action: PayloadAction<{products: Product[], count: number}>) => {
      state.status = 'fulfilled'
      console.log(action.payload)
      state.products = action.payload.products
      state.total = action.payload.count
    }),
    builder.addCase(fetchSearchResults.rejected, (state: ProductListState) => {
      state.status = 'rejected'
    })
    builder.addCase(fetchProductsForCategory.fulfilled, (state: ProductListState, action: PayloadAction<{products: Product[], count: number}>) => {
      state.status = 'fulfilled'
      state.products = action.payload.products
      state.total = action.payload.count
    })
  }
})

export default productListSlice.reducer
