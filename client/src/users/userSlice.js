import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
  loading: false,
  registerSuccess: false,
  user: {
    userId: 0,
    firstName: "",
    LastName: "",
    email: "",
    roles: []
  },
  users: [
    {
      userId: 0,
      firstName: "",
      LastName: "",
      email: "",
      roles: []
    }
  ]
}

export const getAllUsers = createAsyncThunk("user/getAllUsers", async ({ token }) => {
  const response = await userService.getAllUsers(token)
  return response.data
})

export const createUser = createAsyncThunk("user/createUser", async (userData) => {
  const response = await userService.createUser(userData)
  return response.data
})

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all users
      .addCase(getAllUsers.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload.users
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false
      })

      // Create user
      .addCase(createUser.pending, (state) => {
        state.loading = true
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false
        state.registerSuccess = true
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = false
      })
  },
})

export const { increment, decrement, incrementByAmount } = userSlice.actions
export default userSlice.reducer