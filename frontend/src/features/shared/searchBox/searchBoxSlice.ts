import { PayloadAction, createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit"
import { post } from '../../../api'
import { FETCH_SUGGESTIONS_URL } from "../../../api/constants"
import { Status } from "../../../app/types"

interface SearchBoxState {
  suggestions: string[]
  query: string,
  status: Status
}

const initialState: SearchBoxState = {
  suggestions: [],
  query: '',
  status: 'pending'
}

export const fetchSuggestions = createAsyncThunk('search/fetchSuggestions', async (searchTerm: string) => {
  return await post(`${FETCH_SUGGESTIONS_URL}?search=${searchTerm}`)
})

const searchBoxSlice = createSlice({
  name: 'searchBox',
  initialState,
  reducers: {
    setQuery(state: SearchBoxState, action: PayloadAction<string>) {
      state.query = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSuggestions.pending, (state: SearchBoxState) => {
      state.status = 'pending'
    }),
    builder.addCase(fetchSuggestions.fulfilled, (state: SearchBoxState, action: PayloadAction<string[]>) => {
      state.status = 'fulfilled'
      state.suggestions = action.payload
    }),
    builder.addCase(fetchSuggestions.rejected, (state: SearchBoxState) => {
      state.status = 'rejected'
    })
  }
})

export const { setQuery } = searchBoxSlice.actions

export default searchBoxSlice.reducer