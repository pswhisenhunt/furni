import axios from 'axios'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category, Status } from '../../../app/types'
import { BASE_API_URL } from '../../../api/constants'

interface CategoryListState {
  categories: Category[],
  status: Status
}

const initialState: CategoryListState = {
  categories: [],
  status: 'pending'
}

export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
  const resposne = await axios.get(`${BASE_API_URL}/categories`)
  return resposne.data
})

const categoryListSlice = createSlice({
  name: 'categoryList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state: CategoryListState) => {
      state.status = 'pending'
    }),
    builder.addCase(fetchCategories.fulfilled, (state: CategoryListState, action: PayloadAction<Category[]>) => {
      state.status = 'fulfilled'
      state.categories = action.payload
    }),
    builder.addCase(fetchCategories.rejected, (state: CategoryListState) => {
      state.status = 'rejected'
    })
  }
})


export default categoryListSlice.reducer
