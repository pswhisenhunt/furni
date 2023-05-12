import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Category } from '../../../app/types'

interface NavBarState {
  activeLink: Category
}

const initialState: NavBarState = {
  activeLink: {
    id: '',
    name: ''
  }
}

const navBarSlice = createSlice({
  name: 'navBar',
  initialState,
  reducers: {
    setActiveLink(state: NavBarState, action: PayloadAction<Category>) {
      state.activeLink = action.payload
    }
  }
})

export const { setActiveLink } = navBarSlice.actions

export default navBarSlice.reducer