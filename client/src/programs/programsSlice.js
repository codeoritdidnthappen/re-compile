import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import programsService from './programsService'

const initialState = {
  loading: false,
  programs: [],
  program: null
}

export const getPrograms = createAsyncThunk("programs/getPrograms", async ({ token, year }) => {
  const response = await programsService.getPrograms(token, year)
  return response.data
})

export const getProgram = createAsyncThunk("programs/getProgram", async ({ token, stateName }) => {
  const response = await programsService.getProgram(token, stateName)
  return response.data
})

const programsSlice = createSlice({
  name: "programs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPrograms.pending, (state) => {
        state.loading = true
      })
      .addCase(getPrograms.fulfilled, (state, action) => {
        state.programs = action.payload.programs
        state.loading = false
      })
      .addCase(getPrograms.rejected, (state, action) => {
        console.log("getPrograms.rejected", action.error)
        state.loading = false
      })

      .addCase(getProgram.pending, (state) => {
        state.loading = true
      })
      .addCase(getProgram.fulfilled, (state, action) => {
        state.program = action.payload.program
        state.loading = false
      })
      .addCase(getProgram.rejected, (state, action) => {
        console.log("getProgram.rejected", action.error)
        state.loading = false
      })
  },
})

export const { } = programsSlice.actions
export default programsSlice.reducer
