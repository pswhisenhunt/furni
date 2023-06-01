import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Material, Status, Color } from '../../../app/types'
import { get } from '../../../api'
import { FETCH_MATERIALS, FETCH_COLORS } from '../../../api/constants'

interface FilterPanelProps {
  materials: Material[],
  colors: Color[],
  type: [],
  ratings: [],
  status: Status
}

export const fetchMaterials = createAsyncThunk('materials/fetch', async () => {
  return await get(FETCH_MATERIALS)
})

export const fetchColors = createAsyncThunk('colors/fetch', async () => {
  return await get(FETCH_COLORS)
})

// I need to create an endpoint for types because it is an enum on the product, not a model

const initialState: FilterPanelProps = {
  materials: [],
  colors: [],
  type: [],
  ratings: [],
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
    })
  }
})

export default filterPanelSlice.reducer