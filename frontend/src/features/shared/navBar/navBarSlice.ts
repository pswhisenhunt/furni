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
    },
    clearActiveLink(state: NavBarState) {
      state.activeLink = { 
        id: '', 
        name : ''
      }
    }
  }
})

export const { setActiveLink, clearActiveLink } = navBarSlice.actions

export default navBarSlice.reducer