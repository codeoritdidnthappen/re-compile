import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import programsService from './programsService'

const initialState = {
  loading: false,
  programs: [],
  currentProgram: null,
  program: null,
  completedCount: null,
  acceptedCount: null,
  jobsCount: null,
}

export const getPrograms = createAsyncThunk("programs/getPrograms", async ({ token, year }) => {
  const response = await programsService.getPrograms(token, year)
  return response.data
})

export const getProgram = createAsyncThunk("programs/getProgram", async ({ token, stateName }) => {
  const response = await programsService.getProgram(token, stateName)
  return response.data
})

export const getProgramById = createAsyncThunk("programs/getProgramById", async ({ token, id }) => {
  const response = await programsService.getProgramById(token, id)
  return response.data
})

export const createProgram = createAsyncThunk("programs/createProgram", async ({ token, programData }) => {
  const response = await programsService.createProgram(token, programData)
  return response.data
})

export const updateProgram = createAsyncThunk("programs/updateProgram", async ({ token, id, programData }) => {
  const response = await programsService.updateProgram(token, id, programData)
  return response.data
})

export const archiveProgram = createAsyncThunk("programs/archiveProgram", async ({ token, id }) => {
  const response = await programsService.archiveProgram(token, id)
  return response.data
})

export const getCompletedCount = createAsyncThunk("programs/getCompletedCount", async ({ token, state, site } = {}) => {
  const response = await programsService.getCompletedCount(token, { state, site })
  return response.data
})

export const getAcceptedCount = createAsyncThunk("programs/getAcceptedCount", async ({ token, state, site } = {}) => {
  const response = await programsService.getAcceptedCount(token, { state, site })
  return response.data
})

export const getJobsCount = createAsyncThunk("programs/getJobsCount", async ({ token, state, site } = {}) => {
  const response = await programsService.getJobsCount(token, { state, site })
  return response.data
})

const programsSlice = createSlice({
  name: "programs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPrograms.pending, (state) => { state.loading = true })
      .addCase(getPrograms.fulfilled, (state, action) => {
        state.programs = action.payload.programs
        state.loading = false
      })
      .addCase(getPrograms.rejected, (state, action) => {
        state.loading = false
      })

      .addCase(getProgram.pending, (state) => { state.loading = true })
      .addCase(getProgram.fulfilled, (state, action) => {
        state.program = action.payload.program
        state.loading = false
      })
      .addCase(getProgram.rejected, (state, action) => {
        state.loading = false
      })

      .addCase(getProgramById.pending, (state) => { state.loading = true })
      .addCase(getProgramById.fulfilled, (state, action) => {
        state.currentProgram = action.payload.program
        state.loading = false
      })
      .addCase(getProgramById.rejected, (state, action) => {
        state.loading = false
      })

      .addCase(createProgram.pending, (state) => { state.loading = true })
      .addCase(createProgram.fulfilled, (state, action) => {
        state.currentProgram = action.payload.program
        state.loading = false
      })
      .addCase(createProgram.rejected, (state, action) => {
        state.loading = false
      })

      .addCase(updateProgram.pending, (state) => { state.loading = true })
      .addCase(updateProgram.fulfilled, (state, action) => {
        state.currentProgram = action.payload.program
        state.loading = false
      })
      .addCase(updateProgram.rejected, (state, action) => {
        state.loading = false
      })

      .addCase(archiveProgram.pending, (state) => { state.loading = true })
      .addCase(archiveProgram.fulfilled, (state, action) => {
        state.currentProgram = action.payload.program
        state.loading = false
      })
      .addCase(archiveProgram.rejected, (state, action) => {
        state.loading = false
      })

      .addCase(getCompletedCount.pending, (state) => { state.loading = true })
      .addCase(getCompletedCount.fulfilled, (state, action) => {
        state.completedCount = action.payload.count[0].count
        state.loading = false
      })
      .addCase(getCompletedCount.rejected, (state, action) => {
        state.loading = false
      })

      .addCase(getAcceptedCount.pending, (state) => { state.loading = true })
      .addCase(getAcceptedCount.fulfilled, (state, action) => {
        state.acceptedCount = action.payload.count[0].count
        state.loading = false
      })
      .addCase(getAcceptedCount.rejected, (state, action) => {
        state.loading = false
      })

      .addCase(getJobsCount.pending, (state) => { state.loading = true })
      .addCase(getJobsCount.fulfilled, (state, action) => {
        state.jobsCount = action.payload.count[0]?.count ?? 0
        state.loading = false
      })
      .addCase(getJobsCount.rejected, (state, action) => {
        state.loading = false
      })
  },
})

export const { } = programsSlice.actions
export default programsSlice.reducer
