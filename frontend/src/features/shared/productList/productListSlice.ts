import { createSlice, PayloadAction, createAsyncThunk, current } from '@reduxjs/toolkit'
import { Category, Product, Status } from '../../../app/types'
import { post, get } from '../../../api'
import { SEARCH_PRODUCTS_URL, FETCH_PRODUCTS_BY_CATEGORY_URL } from '../../../api/constants'

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

export const fetchProductsForCategory = createAsyncThunk('products/fetchByCategory', async ({ 
  category, 
  page,
}: { 
  category: Category, 
  page: number
}) => {
  const searchParams = new URLSearchParams();
  searchParams.append('page', String(page));
  return await get(`${FETCH_PRODUCTS_BY_CATEGORY_URL}/${category.id}?${searchParams.toString()}`)
})

const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {},
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
    builder.addCase(fetchProductsForCategory.fulfilled, (state: ProductListState, action: PayloadAction<Product[]>) => {
      state.status = 'fulfilled'
      state.items = action.payload
    })
  }
})

export default productListSlice.reducer
