import { PayloadAction, createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit"
import { post } from '../../../api'
import { PRODUCT_SEARCH_TERMS_URL } from "../../../api/constants"
import { SearchTerm, Status } from "../../../app/types"

interface SearchBoxState {
  suggestedSearchTerms: SearchTerm[],
  status: Status
}

const initialState: SearchBoxState = {
  suggestedSearchTerms: [],
  status: 'pending'
}

export const fetchsuggestedSearchTerms = createAsyncThunk('searchTerms/fetch', async (attribute: string) => {
  return await post(PRODUCT_SEARCH_TERMS_URL, { attribute: attribute, limit: 100 })
})

const searchBoxSlice = createSlice({
  name: 'searchBox',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchsuggestedSearchTerms.pending, (state: SearchBoxState) => {
      state.status = 'pending'
    }),
    builder.addCase(fetchsuggestedSearchTerms.fulfilled, (state: SearchBoxState, action: PayloadAction<SearchTerm[]>) => {
      state.status = 'fulfilled'
      state.suggestedSearchTerms = action.payload
    }),
    builder.addCase(fetchsuggestedSearchTerms.rejected, (state: SearchBoxState) => {
      state.status = 'rejected'
    })
  }
})


export default searchBoxSlice.reducer