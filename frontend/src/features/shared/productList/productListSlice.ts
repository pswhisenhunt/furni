import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Category, Product, Status } from '../../../app/types'
import { post } from '../../../api'
import { SEARCH_PRODUCTS_URL, FETCH_PRODUCTS_BY_CATEGORY_URL } from '../../../api/constants'

interface ProductListState {
  products: Product[],
  total: number,
  limit: number,
  page: number,
  sortBy: {
    field: string,
    direction: number
  },
  status: Status
}

const initialState: ProductListState = {
  products: [],
  total: 0,
  limit: 10,
  page: 0,
  sortBy: {
    field: 'averageRating',
    direction: -1
  },
  status: 'pending'
}

export const fetchSearchResults = createAsyncThunk('products/searchResults', async (searchTerm: string) => {
  return await post(SEARCH_PRODUCTS_URL, { searchTerm: searchTerm })
})

export const fetchProductsForCategory = createAsyncThunk('products/fetchByCategory', async ({ category, limit, page, sortBy }: { category: Category, limit: number, page: number, sortBy: { field: string, direction: number}}) => {
  return await post(`${FETCH_PRODUCTS_BY_CATEGORY_URL}/${category.id}`, { limit: limit, page: page, sort: sortBy })
})

const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    setLimit(state: ProductListState, action: PayloadAction<string | number>) {
      state.limit = Number(action.payload)
    },
    setSortBy: {
      reducer(state: ProductListState, action: PayloadAction<{field: string, direction: number}>) {
        state.sortBy = action.payload
      },
      prepare(value: string) {
        let splitValue = value.split('_')
        return {  
          payload: {
            field: splitValue[0],
            direction: Number(splitValue[1])
          }
        }
      }
    },
    setPage(state: ProductListState, action: PayloadAction<number>) {
      state.page = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchResults.pending, (state: ProductListState) => {
      state.status = 'pending'
    }),
    builder.addCase(fetchSearchResults.fulfilled, (state: ProductListState, action: PayloadAction<{products: Product[], count: number}>) => {
      state.status = 'fulfilled'
      state.products = [...state.products, ...action.payload.products]
      state.total = action.payload.count
    }),
    builder.addCase(fetchSearchResults.rejected, (state: ProductListState) => {
      state.status = 'rejected'
    }),
    builder.addCase(fetchProductsForCategory.pending, (state: ProductListState) => {
      state.status = 'pending'
    }),
    builder.addCase(fetchProductsForCategory.fulfilled, (state: ProductListState, action: PayloadAction<{products: Product[], count: number}>) => {
      state.status = 'fulfilled'
      state.products = action.payload.products
      state.total = action.payload.count
    }),
    builder.addCase(fetchProductsForCategory.rejected, (state: ProductListState) => {
      state.status = 'rejected'
    })
  }
})

export const { setLimit, setSortBy, setPage } = productListSlice.actions

export default productListSlice.reducer
