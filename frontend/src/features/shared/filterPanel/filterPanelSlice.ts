import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Material, Status, Color } from '../../../app/types'
import { get, post } from '../../../api'
import { FETCH_MATERIALS_URL, FETCH_COLORS_URL, FETCH_PRODUCT_ATTRIBUTE_URL } from '../../../api/constants'

interface FilterPanelProps {
  materials: Material[],
  colors: Color[],
  productTypes: string[],
  status: Status
}

export const fetchMaterials = createAsyncThunk('materials/fetch', async () => {
  return await get(FETCH_MATERIALS_URL)
})

export const fetchColors = createAsyncThunk('colors/fetch', async () => {
  return await get(FETCH_COLORS_URL)
})

export const fetchProductTypes = createAsyncThunk('productTypes/fetch', async () => {
  return await post(`${FETCH_PRODUCT_ATTRIBUTE_URL}`, { attribute: 'type' })
})

const initialState: FilterPanelProps = {
  materials: [],
  colors: [],
  productTypes: [],
  status: 'pending'
}

const filterPanelSlice = createSlice({
  name: 'filterPanel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMaterials.pending, (state: FilterPanelProps) => {
      state.status = 'pending'
    }),
    builder.addCase(fetchMaterials.fulfilled, (state: FilterPanelProps, action: PayloadAction<Material[]>) => {
      state.status = 'fulfilled'
      state.materials = action.payload
    }),
    builder.addCase(fetchMaterials.rejected, (state: FilterPanelProps) => {
      state.status = 'rejected'
    }),
    builder.addCase(fetchColors.pending, (state: FilterPanelProps) => {
      state.status = 'pending'
    }),
    builder.addCase(fetchColors.fulfilled, (state: FilterPanelProps, action: PayloadAction<Color[]>) => {
      state.status = 'fulfilled'
      state.colors = action.payload
    }),
    builder.addCase(fetchColors.rejected, (state: FilterPanelProps) => {
      state.status = 'rejected'
    }),
    builder.addCase(fetchProductTypes.pending, (state: FilterPanelProps) => {
      state.status = 'pending'
    }),
    builder.addCase(fetchProductTypes.fulfilled, (state: FilterPanelProps, action: PayloadAction<string[]>) => {
      state.status = 'fulfilled'
      state.productTypes = action.payload
    }),
    builder.addCase(fetchProductTypes.rejected, (state: FilterPanelProps) => {
      state.status = 'rejected'
    })
  }
})

export default filterPanelSlice.reducer