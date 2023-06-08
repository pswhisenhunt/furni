import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Status, User, Order, Favorite } from '../../app/types'
import { post } from '../../api'
import { USER_LOGIN } from '../../api/constants'

interface UserState {
  user: User,
  status: Status
}

const initialState = {
 user: {
  id: '',
  token: '',
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  orders: [] as Order[],
  favorites: [] as Favorite[],
  streetName: '',
  unitNumber: '',
  city: '',
  state: '',
  zipcode: ''
 },
 status: 'pending'
}

export const userLogin = createAsyncThunk('user/login', async ({ email, password }: { email: string, password: string}) => {
  return await post(USER_LOGIN, {
    email: email,
    password: password
  })
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state: UserState) => {
      state.status = 'pending'
    }),
    builder.addCase(userLogin.fulfilled, (state: UserState, action: PayloadAction<User>) => {
      state.user = {...action.payload}
      state.status = 'fulfilled'
    }),
    builder.addCase(userLogin.rejected, (state: UserState) => {
      state.status = 'rejected'
    })
  }
})

export default userSlice.reducer