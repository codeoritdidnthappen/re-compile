import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import grantService from "./grantService"

const initialState = {
  loading: false,
  grants: [],
  currentGrant: null
}

export const getAllGrants = createAsyncThunk("grants/getAllGrants", async (token) => {
  const response = await grantService.getAllGrants(token)
  return response.data
})

export const getGrantById = createAsyncThunk("grants/getGrantById", async ({ token, id }) => {
  const response = await grantService.getGrantById(token, id)
  return response.data
})

const grantSlice = createSlice({
  name: "grants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllGrants.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllGrants.fulfilled, (state, action) => {
        state.grants = action.payload.grants
        state.loading = false
      })
      .addCase(getAllGrants.rejected, (state, action) => {
        console.log("getAllGrants.rejected", action.error)
        state.loading = false
      })

      .addCase(getGrantById.pending, (state) => {
        state.loading = true
      })
      .addCase(getGrantById.fulfilled, (state, action) => {
        state.currentGrant = action.payload.grant
        state.loading = false
      })
      .addCase(getGrantById.rejected, (state, action) => {
        console.log("getGrantById.rejected", action.error)
        state.loading = false
      })
  },
})

export const { } = grantSlice.actions
export default grantSlice.reducer
